// Command definitions for all robot types in Infinity Learning Space

// Commands structure - organized by robot type
const COMMANDS = {
    // 4-wheeled Mecanum Car commands
    'smartcar': {
        // Manual control commands
        movement: {
            forward: 'car:forward',
            backward: 'car:backward',
            left: 'car:left',
            right: 'car:right',
            frontleft: 'car:frontleft',
            frontright: 'car:frontright',
            backleft: 'car:backleft',
            backright: 'car:backright',
            turnleft: 'car:turnleft',
            turnright: 'car:turnright',
            curvedtrajectory: 'car:curvedtrajectory',
            lateralarc: 'car:lateralarc',
            stop: 'car:stop'
        },
        
        // Speed control commands
        speed: {
            low: 'car:setspeed:30',
            medium: 'car:setspeed:60',
            high: 'car:setspeed:90'
        },
        
        // Auto mode commands
        autoModes: {
            obstacle: 'car:automode:obstacle',
            follow: 'car:automode:follow',
            line: 'car:automode:line',
            light: 'car:automode:light',
            edge: 'car:automode:edge',
            stop: 'car:automode:stop'
        },
        
        // Voice command mappings
        voiceCommands: {
            'forward': 'car:forward',
            'backward': 'car:backward',
            'backwards': 'car:backward',
            'left': 'car:left',
            'right': 'car:right',
            'front left': 'car:frontleft',
            'front right': 'car:frontright',
            'back left': 'car:backleft',
            'back right': 'car:backright',
            'turn left': 'car:turnleft',
            'turn right': 'car:turnright',
            'curve': 'car:curvedtrajectory',
            'lateral': 'car:lateralarc',
            'stop': 'car:stop',
            'halt': 'car:stop',
            'slow': 'car:setspeed:30',
            'medium': 'car:setspeed:60',
            'fast': 'car:setspeed:90'
        }
    },
    
    // Hexapod commands (for future expansion)
    'pod': {
        // Basic movement examples
        movement: {
            forward: 'pod:forward',
            backward: 'pod:backward',
            left: 'pod:left',
            right: 'pod:right',
            frontleft: 'pod:frontleft',
            frontright: 'pod:frontright',
            backleft: 'pod:backleft',
            backright: 'pod:backright',
            turnleft: 'pod:turnleft',
            turnright: 'pod:turnright',
            curvedtrajectory: 'pod:curvedtrajectory',
            lateralarc: 'pod:lateralarc',
            stop: 'pod:stop'
        },
		        // Speed control commands
        speed: {
            low: 'pod:setspeed:30',
            medium: 'pod:setspeed:60',
            high: 'pod:setspeed:90'
        },
            // Auto mode commands
        autoModes: {
            SitHome: 'pod:automode:SitHome',
            Stand1: 'pod:automode:Stand1',
            Stand2: 'pod:automode:Stand2',
            Stand3: 'pod:automode:Stand3',
            RotateNeck: 'pod:automode:RotateNeck',
            Twist: 'pod:automode:Twist',
            Down: 'pod:automode:Down',
            Wink: 'pod:automode:Wink',
			stop: 'pod:automode:Stop'
        },

        // Voice command mappings
        voiceCommands: {
            'forward': 'pod:forward',
            'backward': 'pod:backward',
            'backwards': 'pod:backward',
            'left': 'pod:left',
            'right': 'pod:right',
            'front left': 'pod:frontleft',
            'front right': 'pod:frontright',
            'back left': 'pod:backleft',
            'back right': 'pod:backright',
            'turn left': 'pod:turnleft',
            'turn right': 'pod:turnright',
            'curve': 'pod:curvedtrajectory',
            'lateral': 'pod:lateralarc',
            'stop': 'pod:stop',
            'halt': 'pod:stop',
            'slow': 'pod:setspeed:30',
            'medium': 'pod:setspeed:60',
            'fast': 'pod:setspeed:90'
        }    
    }

};

// Helper function to get command for a specific robot action
function getCommand(robotType, category, action, ...params) {
    if (!COMMANDS[robotType] || !COMMANDS[robotType][category] || !COMMANDS[robotType][category][action]) {
        console.error(`Command not found: ${robotType}:${category}:${action}`);
        return null;
    }
    
    let command = COMMANDS[robotType][category][action];
    
    // Add parameters if provided
    if (params && params.length > 0) {
        // For commands that don't already have parameters
        if (!command.includes(':')) {
            command += ':';
        } else if (!command.endsWith(':')) {
            command += '-';
        }
        
        command += params.join('-');
    }
    
    return command;
}

// Helper function to parse voice input and find matching commands
function parseVoiceCommand(robotType, voiceInput) {
    if (!COMMANDS[robotType] || !COMMANDS[robotType].voiceCommands) {
        return null;
    }
    
    const input = voiceInput.toLowerCase().trim();
    
    // Try direct match first
    if (COMMANDS[robotType].voiceCommands[input]) {
        return COMMANDS[robotType].voiceCommands[input];
    }
    
    // Try to find partial matches
    for (const [phrase, command] of Object.entries(COMMANDS[robotType].voiceCommands)) {
        if (input.includes(phrase)) {
            return command;
        }
    }
    
    return null;
}
