// Pod Controller for Infinity Learning Space
class PodController {
    constructor() {
        this.currentSpeed = 'medium'; // Default speed
        this.tiltEnabled = false;
        this.activeAutoMode = null;
        this.consoleElement = document.getElementById('car-console');
        this.deviceOrientation = { beta: 0, gamma: 0 }; // For tilt control
        this.lastTiltDirection = 'stop';
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Set up remote control buttons
        const controlButtons = document.querySelectorAll('#pod-screen .control-btn');
        controlButtons.forEach(button => {
            button.addEventListener('click', () => {
                const command = button.getAttribute('data-command');
                this.sendMovementCommand(command);
                this.addVisualFeedback(button);
            });
        });

        // Set up speed control buttons
        const speedButtons = document.querySelectorAll('#pod-screen .speed-btn');
        speedButtons.forEach(button => {
            button.addEventListener('click', () => {
                const speed = button.getAttribute('data-speed');
                this.setSpeed(speed);
                
                // Update active button
                speedButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Set up voice control
        const voiceButton = document.querySelector('#pod-screen #voice-btn');
        if (voiceButton) {
            voiceButton.addEventListener('click', () => {
                this.startVoiceRecognition();
            });
        }

        // Set up tilt control toggle
        const tiltToggle = document.querySelector('#pod-screen #tilt-toggle');
        if (tiltToggle) {
            tiltToggle.addEventListener('change', () => {
                this.toggleTiltControl(tiltToggle.checked);
            });
        }

        // Set up auto mode buttons
        //const autoButtons = document.querySelectorAll('.auto-btn');

		const autoButtons = document.querySelectorAll('#pod-screen .auto-btn');
        autoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.getAttribute('data-mode');
                this.activateAutoMode(mode);
                
                // Update active button
                autoButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Set up stop auto mode button
        const stopAutoButton = document.querySelector('#pod-screen #stop-auto')
        if (stopAutoButton) {
            stopAutoButton.addEventListener('click', () => {
                this.stopAutoMode();
                
                // Remove active class from all auto buttons
                autoButtons.forEach(btn => btn.classList.remove('active'));
            });
        }

        // Set up tab switching
        const tabButtons = document.querySelectorAll('#pod-screen .tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    // Switch between tabs
    switchTab(tabId) {
        // Update tab buttons
        const tabButtons = document.querySelectorAll('#pod-screen .control-tabs .tab-buttons .tab-btn');
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update tab content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            if (content.id === tabId + '-tab') {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // If switching away from tilt tab, make sure to disable tilt control
        if (tabId !== 'tilt' && this.tiltEnabled) {
            document.getElementById('tilt-toggle').checked = false;
            this.toggleTiltControl(false);
        }
    }

    // Send movement command to the pod
    sendMovementCommand(direction) {
        const command = getCommand('pod', 'movement', direction);
        if (command) {
            bluetoothHandler.sendData(command);
            this.logToConsole(`Sent: ${command}`);
        }
    }

    // Set pod speed
    setSpeed(speed) {
        this.currentSpeed = speed;
        const command = getCommand('pod', 'speed', speed);
        if (command) {
            bluetoothHandler.sendData(command);
            this.logToConsole(`Set speed to ${speed}: ${command}`);
        }
    }

    // Activate an auto mode
    activateAutoMode(mode) {
        this.activeAutoMode = mode;
        const command = getCommand('pod', 'autoModes', mode);
        if (command) {
            bluetoothHandler.sendData(command);
            this.logToConsole(`Activated auto mode: ${mode}`);
        }
    }

    // Stop the current auto mode
    stopAutoMode() {
        if (this.activeAutoMode) {
            const command = getCommand('pod', 'autoModes', 'stop');
            if (command) {
                bluetoothHandler.sendData(command);
                this.logToConsole('Stopped auto mode');
                this.activeAutoMode = null;
            }
        }
    }

    // Toggle tilt control
    toggleTiltControl(enabled) {
        this.tiltEnabled = enabled;
        
        if (enabled) {
            // Request permission for device orientation
            if (typeof DeviceOrientationEvent !== 'undefined' && 
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                // iOS 13+ requires permission
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            this.startTiltControl();
                        } else {
                            this.logToConsole('Permission for device orientation was denied');
                            document.getElementById('tilt-toggle').checked = false;
                            this.tiltEnabled = false;
                        }
                    })
                    .catch(console.error);
            } else {
                // Other devices
                this.startTiltControl();
            }
        } else {
            this.stopTiltControl();
        }
    }

    // Start tilt control
    startTiltControl() {
        window.addEventListener('deviceorientation', this.handleTilt.bind(this));
        this.logToConsole('Tilt control activated');
    }

    // Stop tilt control
    stopTiltControl() {
        window.removeEventListener('deviceorientation', this.handleTilt.bind(this));
        this.logToConsole('Tilt control deactivated');

        // Reset tilt indicators
        const tiltCells = document.querySelectorAll('.tilt-cell');
        tiltCells.forEach(cell => cell.classList.remove('active'));
    }

    // Handle device orientation for tilt control
    handleTilt(event) {
        if (!this.tiltEnabled) return;

        // Get tilt values
        const beta = event.beta;  // Front-to-back tilt in degrees (-180 to 180)
        const gamma = event.gamma; // Left-to-right tilt in degrees (-90 to 90)

        // Store current orientation
        this.deviceOrientation = { beta, gamma };

        // Determine direction based on tilt
        let direction = 'stop';

        if (beta < -15) {
            if (gamma < -15) direction = 'frontleft';
            else if (gamma > 15) direction = 'frontright';
            else direction = 'forward';
        } else if (beta > 15) {
            if (gamma < -15) direction = 'backleft';
            else if (gamma > 15) direction = 'backright';
            else direction = 'backward';
        } else {
            if (gamma < -15) direction = 'left';
            else if (gamma > 15) direction = 'right';
            else direction = 'stop';
        }

        // Update the UI
        this.updateTiltIndicator(direction);

        // Only send command if direction changed
        if (direction !== this.lastTiltDirection) {
            this.lastTiltDirection = direction;
            this.sendMovementCommand(direction);
        }
    }

    // Update tilt indicator in the UI
    updateTiltIndicator(direction) {
        // Reset all indicators
        const tiltCells = document.querySelectorAll('.tilt-cell');
        tiltCells.forEach(cell => cell.classList.remove('active'));

        // Activate the current direction
        const activeCell = document.querySelector(`.tilt-cell[data-direction="${direction}"]`);
        if (activeCell) {
            activeCell.classList.add('active');
        }
    }

    // Start voice recognition
    startVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            this.logToConsole('Voice recognition not supported in this browser');
            document.getElementById('voice-status-text').textContent = 'Voice recognition not supported';
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            document.getElementById('voice-status-text').textContent = 'Listening...';
            document.getElementById('voice-btn').classList.add('active');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            document.getElementById('voice-command-text').textContent = `"${transcript}"`;
            
            // Parse voice command
            const command = parseVoiceCommand('pod', transcript);
            if (command) {
                bluetoothHandler.sendData(command);
                this.logToConsole(`Voice command: "${transcript}" → ${command}`);
            } else {
                this.logToConsole(`Voice command not recognized: "${transcript}"`);
            }
        };

        recognition.onerror = (event) => {
            this.logToConsole(`Voice recognition error: ${event.error}`);
            document.getElementById('voice-status-text').textContent = 'Error: ' + event.error;
            document.getElementById('voice-btn').classList.remove('active');
        };

        recognition.onend = () => {
            document.getElementById('voice-status-text').textContent = 'Ready for voice command...';
            document.getElementById('voice-btn').classList.remove('active');
        };

        recognition.start();
    }

    // Add visual feedback when a button is pressed
    addVisualFeedback(button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 200);
    }

	
	// Log messages to console
	logToConsole(message) {
		const consoles = [
			document.getElementById('pod-console')
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

// Create pod controller when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.PodController = new PodController();
});
