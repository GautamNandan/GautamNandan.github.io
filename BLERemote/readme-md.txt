# Infinity Learning Space - Robot Control App

## Overview

Infinity Learning Space is a child-friendly web application for controlling robots via Bluetooth Low Energy (BLE). The app provides intuitive interfaces for different types of robots, starting with a 4-wheeled Mecanum car and a generic control interface.

## Features

- **Simple, Child-Friendly UI**: Large buttons, clear icons, and intuitive controls designed for children aged 8-14
- **Multiple Control Modes**:
  - Remote Control: Manual directional controls
  - Voice Control: Control robots using voice commands
  - Tilt Control: Use device orientation to control robot movement
  - Auto Modes: Activate pre-programmed autonomous behaviors
- **Bluetooth Connectivity**: Connect to robots using Web Bluetooth API
- **Responsive Design**: Works on both desktop and mobile devices
- **Expandable Framework**: Easily add new robot types and features

## Installation & Setup

1. Clone this repository to your local machine or web server
2. No build steps required - this is a pure HTML/CSS/JavaScript application
3. Open `index.html` in a compatible browser

## Browser Compatibility

This app requires a browser that supports the Web Bluetooth API. Compatible browsers include:
- Chrome (desktop and Android)
- Edge (Chromium-based)
- Opera

**Note**: Safari (iOS/macOS) does not currently support Web Bluetooth API.

## Usage Instructions

### Connecting to a Robot

1. Click the "Connect" button in the header
2. Click "Scan for Devices" in the modal dialog
3. Select your robot from the list of available Bluetooth devices
4. Once connected, the status indicator will turn green

### Controlling the 4-Wheeled Mecanum Car

#### Remote Control
- Use direction buttons to control car movement
- Use speed buttons to adjust car speed

#### Voice Control
- Click the microphone button
- Speak a command (e.g., "forward", "turn right", "stop")
- The app will interpret your command and send it to the car

#### Tilt Control
- Enable tilt control using the toggle switch
- Tilt your device in the direction you want the car to move
- The active direction will be highlighted in the grid

#### Auto Modes
- Click on an auto mode button to activate it:
  - Obstacle Avoidance
  - Follow Me
  - Line Follower
  - Light Seeker
  - Edge Detector
- Click "Stop Auto Mode" to return to manual control

### Using Generic Controls

- Enter a custom command in the format: `DeviceName:Command:data-data`
- Click "Send" to transmit the command to the connected robot

## Command Format

All commands follow this format: `DeviceName:Command:data-data`

Examples:
- `4wheeledcar:forward`
- `4wheeledcar:setspeed:60`
- `hexapod:walk:10-20`
- `quadpod:run:10-20-30`

## Extending the App

### Adding a New Robot Type

1. Create a new robot card in `index.html` within the `robot-selection` div
2. Create a new screen for the robot in `index.html`
3. Add robot-specific commands in `commands.js`
4. Create a new controller JavaScript file for your robot
5. Add necessary styles in `styles.css`

### Adding New Auto Modes

1. Add the new mode to the `auto-buttons` div in `index.html`
2. Add a corresponding command in the `autoModes` section of `commands.js`

## Project Structure

```
infinity-learning-space/
├── index.html            # Main HTML file
├── css/
│   └── styles.css        # All CSS styles
├── js/
│   ├── bluetooth.js      # BLE connectivity
│   ├── commands.js       # Robot commands
│   ├── car-controller.js # Car-specific controller
│   ├── generic-controller.js # Generic robot controller
│   └── app.js           # Main application logic
├── images/              # Robot and UI images
└── README.md            # This file
```

## License

This project is open-source and free to use for educational purposes.

## Credits

Developed by Infinity Learning Space
