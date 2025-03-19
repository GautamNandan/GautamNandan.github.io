// Generic Controller for Infinity Learning Space
class GenericController {
    constructor() {
        this.consoleElement = document.getElementById('generic-console');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Set up custom command button
        const sendCommandBtn = document.getElementById('send-command');
        if (sendCommandBtn) {
            sendCommandBtn.addEventListener('click', () => {
                this.sendCustomCommand();
            });
        }

        // Allow Enter key to send command
        const commandInput = document.getElementById('custom-command');
        if (commandInput) {
            commandInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    this.sendCustomCommand();
                }
            });
        }
    }

    // Send custom command
    sendCustomCommand() {
        const commandInput = document.getElementById('custom-command');
        if (!commandInput) return;

        const command = commandInput.value.trim();
        if (command) {
            bluetoothHandler.sendData(command);
            this.logToConsole(`Sent custom command: ${command}`);
            commandInput.value = ''; // Clear input field
        } else {
            this.logToConsole('Please enter a command');
        }
    }

    // Log messages to the console
	logToConsole(message) {
		const consoles = [
			document.getElementById('generic-console')
		];
		
		const timestamp = new Date().toLocaleTimeString();		
		consoles.forEach(console => {
			if (console) {
				const entry = document.createElement('div');
				entry.textContent = `[${timestamp}] ${message}`;
				console.appendChild(entry);
				console.scrollTop = console.scrollHeight;
			}
		});
	}
}

// Create generic controller when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.genericController = new GenericController();
});
