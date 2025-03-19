// Bluetooth Low Energy Connection Management for Infinity Learning Space
class BLEManager {
    constructor() {
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;
        this.isConnected = false;
        this.lastConnectedDeviceId = localStorage.getItem('lastConnectedDeviceId');
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

    // Show device selection modal
    showDeviceSelectionModal() {
        const modal = document.getElementById('ble-modal');
        modal.style.display = 'block';

        // Close modal when clicking on X
        const closeBtn = document.querySelector('.close-modal');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        // Close modal when clicking outside
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        // Set up scan button
        const scanBtn = document.getElementById('scan-btn');
        scanBtn.onclick = () => this.scanForDevices();
    }

    // Scan for available BLE devices
    async scanForDevices() {
        const deviceList = document.getElementById('device-list');
        deviceList.innerHTML = '<p>Scanning for devices...</p>';

        try {
            const device = await navigator.bluetooth.requestDevice({
                // Accept all devices that can connect
                acceptAllDevices: true,
            });

            if (device) {
                this.connectToDevice(device);
                document.getElementById('ble-modal').style.display = 'none';
            }
        } catch (error) {
            console.error('Error scanning for devices:', error);
            deviceList.innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
            this.notifyListeners({
                type: 'error',
                message: `Scanning failed: ${error.message}`
            });
        }
    }

    // Try to reconnect to last connected device
    async tryReconnect() {
        if (!this.lastConnectedDeviceId) {
            return false;
        }

        try {
            const devices = await navigator.bluetooth.getDevices();
            const lastDevice = devices.find(device => device.id === this.lastConnectedDeviceId);
            
            if (lastDevice) {
                await this.connectToDevice(lastDevice);
                return true;
            }
        } catch (error) {
            console.error('Error reconnecting:', error);
            this.notifyListeners({
                type: 'error',
                message: `Reconnection failed: ${error.message}`
            });
        }
        
        return false;
	}
		
		// Connect to a selected BLE device
    async connectToDevice(device) {
        try {
            this.notifyListeners({
                type: 'status',
                message: `Connecting to ${device.name || 'device'}...`
            });

            this.device = device;
            this.server = await device.gatt.connect();
            
            // You'll need to replace this with your specific service UUID
            const serviceUUID = 0xFFE0;
            this.service = await this.server.getPrimaryService(serviceUUID);
            
            // Replace with your characteristic UUID
            const characteristicUUID = 0xFFE1;
            this.characteristic = await this.service.getCharacteristic(characteristicUUID);
            
            // Enable notifications to receive data from the device
            await this.characteristic.startNotifications();
            this.characteristic.addEventListener('characteristicvaluechanged', 
                this.handleCharacteristicValueChanged.bind(this));
            
            this.isConnected = true;
            this.lastConnectedDeviceId = device.id;
            localStorage.setItem('lastConnectedDeviceId', device.id);
            
            this.notifyListeners({
                type: 'connected',
                message: `Connected to ${device.name || 'device'}`
            });

            // Add disconnect event listener
            device.addEventListener('gattserverdisconnected', this.handleDisconnection.bind(this));

            return true;
        } catch (error) {
            console.error('Connection error:', error);
            this.notifyListeners({
                type: 'error',
                message: `Connection failed: ${error.message}`
            });
            
            return false;
        }
    }

    // Handle incoming data from device
    handleCharacteristicValueChanged(event) {
        const value = event.target.value;
        const decoder = new TextDecoder();
        const message = decoder.decode(value);
        
        this.notifyListeners({
            type: 'message',
            message: message
        });
    }

    // Handle device disconnection
    handleDisconnection() {
        this.isConnected = false;
        this.notifyListeners({
            type: 'disconnected',
            message: 'Device disconnected'
        });
    }

    // Manually disconnect from device
    async disconnect() {
        if (this.device && this.isConnected) {
            await this.device.gatt.disconnect();
            this.isConnected = false;
            this.notifyListeners({
                type: 'disconnected',
                message: 'Disconnected from device'
            });
            return true;
        }
        return false;
    }

    // Send command to the device
    async sendCommand(command) {
        if (!this.isConnected || !this.characteristic) {
            this.notifyListeners({
                type: 'error',
                message: 'Not connected to any device'
            });
            return false;
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(command);
            await this.characteristic.writeValue(data);
            
            this.notifyListeners({
                type: 'sent',
                message: `Sent: ${command}`
            });
            
            return true;
        } catch (error) {
            console.error('Send error:', error);
            this.notifyListeners({
                type: 'error',
                message: `Failed to send command: ${error.message}`
            });
            
            return false;
        }
    }
}

// Create a global instance of BLEManager
const bleManager = new BLEManager();