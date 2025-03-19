// bluetooth.js - Handles all BLE connectivity

class BluetoothHandler {
  constructor() {
    // Default UUIDs
    this.DEFAULT_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    this.DEFAULT_UART_TX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // to send data
    this.DEFAULT_UART_RX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // to receive data
    
    // State
    this.device = null;
    this.server = null;
    this.service = null;
    this.txCharacteristic = null;
    this.rxCharacteristic = null;
    this.isConnected = false;
    
    // Event callbacks
    this.onConnected = null;
    this.onDisconnected = null;
    this.onDataReceived = null;
    this.onStatusUpdate = null;
	
	this.listeners = new Set();
  }

	initialize() {
        // Check if Web Bluetooth API is supported
        if (!navigator.bluetooth) {
            this.notifyListeners({
                type: 'error',
                message: 'Web Bluetooth API is not supported in this browser. Please use Chrome, Edge, or Opera.'
            });
            return false;
        }
        return true;		
	}

    // Add event listener
    addListener(callback) {
        this.listeners.add(callback);
    }

    // Remove event listener
    removeListener(callback) {
        this.listeners.delete(callback);
    }

    // Notify all listeners of events
    notifyListeners(event) {
        this.listeners.forEach(callback => callback(event));
    }
  updateStatus(message) {
    console.log(message);
    if (this.onStatusUpdate) {
      this.onStatusUpdate(message);
    }
  }
  getServiceUUID(deviceName) {
    const uuidSettings = JSON.parse(localStorage.getItem('bleUuidSettings') || '{}');
    if (deviceName && uuidSettings[deviceName]) {
      return uuidSettings[deviceName].serviceUUID || this.DEFAULT_UART_SERVICE_UUID;
    }
    return this.DEFAULT_UART_SERVICE_UUID;
  }

  getTxCharacteristicUUID(deviceName) {
    const uuidSettings = JSON.parse(localStorage.getItem('bleUuidSettings') || '{}');
    if (deviceName && uuidSettings[deviceName]) {
      return uuidSettings[deviceName].txUUID || this.DEFAULT_UART_TX_CHARACTERISTIC_UUID;
    }
    return this.DEFAULT_UART_TX_CHARACTERISTIC_UUID;
  }

  getRxCharacteristicUUID(deviceName) {
    const uuidSettings = JSON.parse(localStorage.getItem('bleUuidSettings') || '{}');
    if (deviceName && uuidSettings[deviceName]) {
      return uuidSettings[deviceName].rxUUID || this.DEFAULT_UART_RX_CHARACTERISTIC_UUID;
    }
    return this.DEFAULT_UART_RX_CHARACTERISTIC_UUID;
  }

  saveUUIDs(deviceName, serviceUUID, txUUID, rxUUID) {
    if (!deviceName) return;
    
    const uuidSettings = JSON.parse(localStorage.getItem('bleUuidSettings') || '{}');
    uuidSettings[deviceName] = {
      serviceUUID: serviceUUID || this.DEFAULT_UART_SERVICE_UUID,
      txUUID: txUUID || this.DEFAULT_UART_TX_CHARACTERISTIC_UUID,
      rxUUID: rxUUID || this.DEFAULT_UART_RX_CHARACTERISTIC_UUID
    };
    
    localStorage.setItem('bleUuidSettings', JSON.stringify(uuidSettings));
  }

  async connect() {
    if (!navigator.bluetooth) {
      this.updateStatus('Web Bluetooth API is not available in this browser.');
      return false;
    }

    try {
      this.updateStatus('Requesting Bluetooth device...');
      
      // Request the device
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [this.getServiceUUID()] }],
        optionalServices: []
      });
      
      if (!this.device) {
        this.updateStatus('No device selected.');
        return false;
      }
      
      const deviceName = this.device.name;
      this.updateStatus(`Device selected: ${deviceName}`);
      
      // Add disconnect listener
      this.device.addEventListener('gattserverdisconnected', this.onDeviceDisconnected.bind(this));
      
      // Connect to GATT server
      this.updateStatus('Connecting to GATT server...');
      this.server = await this.device.gatt.connect();
      
      // Get service
      const serviceUUID = this.getServiceUUID(deviceName);
      this.updateStatus(`Getting service (${serviceUUID})...`);
      this.service = await this.server.getPrimaryService(serviceUUID);
      
      // Get characteristics
      const txUUID = this.getTxCharacteristicUUID(deviceName);
      const rxUUID = this.getRxCharacteristicUUID(deviceName);
      
      this.updateStatus(`Getting TX characteristic (${txUUID})...`);
      this.txCharacteristic = await this.service.getCharacteristic(txUUID);
      
      this.updateStatus(`Getting RX characteristic (${rxUUID})...`);
      this.rxCharacteristic = await this.service.getCharacteristic(rxUUID);
      
      // Start notifications
      this.updateStatus('Starting notifications...');
      await this.rxCharacteristic.startNotifications();
      this.rxCharacteristic.addEventListener('characteristicvaluechanged', this.onCharacteristicValueChanged.bind(this));
      
      this.isConnected = true;
      this.updateStatus('Connected!');
      
      // Call connected callback
      if (this.onConnected) {
        this.onConnected(deviceName);		
      }
      
	  this.notifyListeners({
		type: 'connected',
		message: `Connected to ${this.device.name || 'device'}`
		});
      return true;
    } catch (error) {
      this.updateStatus(`Connection error: ${error}`);
      return false;
    }
  }



   async tryReconnect() {
   }

   async disconnect() {
    if (!this.device || !this.isConnected) {
      this.updateStatus('No device connected.');
      return;
    }
    
    try {
      // Stop notifications
      if (this.rxCharacteristic) {
        await this.rxCharacteristic.stopNotifications();
        this.rxCharacteristic.removeEventListener('characteristicvaluechanged', this.onCharacteristicValueChanged.bind(this));
      }
      
      // Disconnect
      if (this.device.gatt.connected) {
        this.device.gatt.disconnect();
      } else {
        this.updateStatus('Already disconnected');
        this.handleDisconnect();
      }
	  this.device.disconnect();
    } catch (error) {
      this.updateStatus(`Disconnect error: ${error}`);
      this.handleDisconnect();
    }
  }

  handleDisconnect() {
    this.isConnected = false;
    this.server = null;
    this.service = null;
    this.txCharacteristic = null;
    this.rxCharacteristic = null;
    this.updateStatus('Disconnected');
    
    // Call disconnected callback
    if (this.onDisconnected) {
      this.onDisconnected();
    }
  }

  onDeviceDisconnected() {
    this.handleDisconnect();
  }

  onCharacteristicValueChanged(event) {
    const value = event.target.value;
    const decoder = new TextDecoder('utf-8');
    const data = decoder.decode(value);
    
    if (this.onDataReceived) {
      this.onDataReceived(data);
    }
  }

  async sendData(data) {
    if (!this.txCharacteristic || !this.isConnected) {
      this.updateStatus('Not connected or TX characteristic not available');
      return false;
    }
    
    try {
      const encoder = new TextEncoder();
      const dataArrayBuffer = encoder.encode(data);
      await this.txCharacteristic.writeValue(dataArrayBuffer);
      return true;
    } catch (error) {
      this.updateStatus(`Send error: ${error}`);
      return false;
    }
  }
}

// Export the handler
// window.BluetoothHandler = BluetoothHandler;
const bluetoothHandler = new BluetoothHandler();
