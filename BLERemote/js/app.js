// Main App Script for Infinity Learning Space
document.addEventListener('DOMContentLoaded', () => {

    // Set up connect button
    const connectBtn = document.getElementById('connect-btn');
    connectBtn.addEventListener('click', () => {
				  // Update UUIDs first
			bluetoothHandler.DEFAULT_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';//serviceUUIDInput.value;
			bluetoothHandler.DEFAULT_UART_TX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';//txUUIDInput.value;
			bluetoothHandler.DEFAULT_UART_RX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';//rxUUIDInput.value;
			//bluetoothHandler.addListener(handleBLEEvent)
			bluetoothHandler.connect();
    });

    // Set up disconnect button
    const disconnectBtn = document.getElementById('disconnect-btn');
    disconnectBtn.addEventListener('click', async () => {
        await bluetoothHandler.disconnect();
    });

    // Set up navigation back buttons
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showScreen('home-screen');
        });
    });

    // Set up robot selection
    const robotCards = document.querySelectorAll('.robot-card');
    robotCards.forEach(card => {
        card.addEventListener('click', () => {
            const robotType = card.getAttribute('data-robot');
            showScreen(`${robotType}-screen`);
        });
    });


    // Try to reconnect to last device
    tryReconnect();
});


bluetoothHandler.onStatusUpdate = (message) => {
	statusDisplay.textContent = `Status: ${message}`;
	connectButton = document.getElementById('connect-btn');
	disConnectButton = document.getElementById('disconnect-btn');
	if (message.includes('Connected')) {
		statusDisplay.className = 'status connected';
		connectButton.disabled = true;
		disConnectButton.disabled = false;
	} else if (message.includes('Disconnected')) {
		statusDisplay.className = 'status disconnected';
		connectButton.disabled = false;
		disConnectButton.disabled = true;
	} else {
		statusDisplay.className = 'status connecting';
	}
};

// Connected handler
bluetoothHandler.onConnected = (deviceName) => {
	// Load device-specific UUIDs if available
	const uuidSettings = JSON.parse(localStorage.getItem('bleUuidSettings') || '{}');
	if (deviceName && uuidSettings[deviceName]) {
		serviceUUIDInput.value = uuidSettings[deviceName].serviceUUID;
		txUUIDInput.value = uuidSettings[deviceName].txUUID;
		rxUUIDInput.value = uuidSettings[deviceName].rxUUID;
	}
};

// Disconnected handler
bluetoothHandler.onDisconnected = () => {
	// No additional handling needed beyond onStatusUpdate
};

// Data received handler
bluetoothHandler.onDataReceived = (data) => {
	const timestamp = new Date().toLocaleTimeString();
	console.log("data:" + data);
	//receiveData.innerHTML += `<div><strong>${timestamp}:</strong> ${data}</div>`;
	//receiveData.scrollTop = receiveData.scrollHeight;
	logToAllConsoles(data)
};
			
// Handle BLE events
function handleBLEEvent(event) {
    const connectionIndicator = document.getElementById('connection-indicator');
    const connectBtn = document.getElementById('connect-btn');
    const disconnectBtn = document.getElementById('disconnect-btn');
    
    switch(event.type) {
        case 'connected':
            connectionIndicator.textContent = 'Connected';
            connectionIndicator.className = 'connected';
            connectBtn.style.display = 'none';
            disconnectBtn.style.display = 'inline-block';
            logToAllConsoles(`Connected to device`);
            break;
            
        case 'disconnected':
            connectionIndicator.textContent = 'Disconnected';
            connectionIndicator.className = 'disconnected';
            connectBtn.style.display = 'inline-block';
            disconnectBtn.style.display = 'none';
            logToAllConsoles(`Disconnected from device`);
            break;
            
        case 'error':
            showNotification(event.message);
            logToAllConsoles(`Error: ${event.message}`);
            break;
            
        case 'message':
			statusDisplay.textContent = `Status: Connected`;
            logToAllConsoles(`Received: ${event.message}`);
            break;
            
        case 'sent':
            // Handled by individual controllers
            break;
            
        case 'status':
            logToAllConsoles(event.message);
            break;
    }
}

// Try to reconnect to last connected device
async function tryReconnect() {
    const success = await bluetoothHandler.tryReconnect();
    if (!success) {
        console.log('No previously connected device found or reconnection failed');
    }
}

// Show a specific screen
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });
}

// Show notification to user
function showNotification(message) {
    // For now, we'll use console.log and alert, but this could be replaced with a more elegant notification system
    console.log(message);
    alert(message);
}

function logToSpecificConsole(consoleId, message, timestamp) {
    const consoleElement = document.getElementById(consoleId);
    if (consoleElement) {
        const entry = document.createElement('div');
        entry.textContent = `[${timestamp}] ${message}`;
        consoleElement.appendChild(entry);
        consoleElement.scrollTop = consoleElement.scrollHeight;
    }
}

// Log messages to all console elements
function logToAllConsoles(message) {
    const timestamp = new Date().toLocaleTimeString();
    
    // Determine which console to log to based on message prefix
    if (message.startsWith('car:')) {
        logToSpecificConsole('car-console', message.substring(4), timestamp);
    } else if (message.startsWith('pod:')) {
        logToSpecificConsole('pod-console', message.substring(4), timestamp);
    } else {
        // No specific prefix, log to all consoles
		logToSpecificConsole('generic-console', message, timestamp);
		console.log(message);
    }
}

