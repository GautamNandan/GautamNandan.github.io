// Command definitions for all robot types in Infinity Learning Space

// Commands structure - organized by robot type
const COMMANDS = {
    // 4-wheeled Mecanum Car commands
    'smartcar': {
        // Manual control commands
        movement: {
            forward: 'c:forw',
            backward: 'c:back',
            left: 'c:left',
            right: 'c:right',
            frontleft: 'c:frontl',
            frontright: 'c:frontr',
            backleft: 'c:backl',
            backright: 'c:backr',
            turnleft: 'c:turnl',
            turnright: 'c:turnr',
            curvedtrajectory: 'c:curvedt',
            lateralarc: 'c:laterala',
            stop: 'c:stop'
        },
        
        // Speed control commands
        speed: {
            low: 'c:sets:70',
            medium: 'c:sets:80',
            high: 'c:sets:95'
        },
        
        // Auto mode commands
        autoModes: {
            obstacle: 'c:auto:obstacle',
            follow: 'c:auto:follow',
            line: 'c:auto:line',
            light: 'c:auto:light',
            edge: 'c:auto:edge',
            stop: 'c:auto:stop'
        },
        
        // Voice command mappings
        voiceCommands: {
            'forward': 'c:forward',
            'backward': 'c:backward',
            'backwards': 'c:backward',
            'left': 'c:left',
            'right': 'c:right',
            'front left': 'c:frontleft',
            'front right': 'c:frontright',
            'back left': 'c:backleft',
            'back right': 'c:backright',
            'turn left': 'c:turnleft',
            'turn right': 'c:turnright',
            'curve': 'c:curvedtrajectory',
            'lateral': 'c:lateralarc',
            'stop': 'c:stop',
            'halt': 'c:stop',
            'slow': 'c:setspeed:30',
            'medium': 'c:setspeed:60',
            'fast': 'c:setspeed:90'
        }
    },
    
    // Hexapod commands (for future expansion)
    'pod': {
        // Basic movement examples
        movement: {
            forward: 'p:forw',
            backward: 'p:back',
            left: 'p:left',
            right: 'p:right',
            frontleft: 'p:frontl',
            frontright: 'p:frontr',
            backleft: 'p:backl',
            backright: 'p:backr',
            turnleft: 'p:turnl',
            turnright: 'p:turnr',
            curvedtrajectory: 'p:curvedt',
            lateralarc: 'p:laterala',
            stop: 'p:stop'
        },
		        // Speed control commands
        speed: {
            low: 'p:sets:70',
            medium: 'p:sets:80',
            high: 'p:sets:95'
        },
            // Auto mode commands
        autoModes: {
            SitHome: 'p:automode:SitHome',
            Stand1: 'p:automode:Stand1',
            Stand2: 'p:automode:Stand2',
            Stand3: 'p:automode:Stand3',
            RotateNeck: 'p:automode:RotateNeck',
            Twist: 'p:automode:Twist',
            Down: 'p:automode:Down',
            Wink: 'p:automode:Wink',
			stop: 'p:automode:Stop'
        },

        // Voice command mappings
        voiceCommands: {
            'forward': 'p:forward',
            'backward': 'p:backward',
            'backwards': 'p:backward',
            'left': 'p:left',
            'right': 'p:right',
            'front left': 'p:frontleft',
            'front right': 'p:frontright',
            'back left': 'p:backleft',
            'back right': 'p:backright',
            'turn left': 'p:turnleft',
            'turn right': 'p:turnright',
            'curve': 'p:curvedtrajectory',
            'lateral': 'p:lateralarc',
            'stop': 'p:stop',
            'halt': 'p:stop',
            'slow': 'p:setspeed:30',
            'medium': 'p:setspeed:60',
            'fast': 'p:setspeed:90'
        }    
    },
	 // Generic commands (for future expansion)
    'generic': {
        // Basic movement examples
        smartlock: {
			'lock': 'g:lock',
			'unlock': 'g:unlock'
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
