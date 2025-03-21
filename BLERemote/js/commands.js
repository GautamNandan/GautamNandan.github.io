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
            curvedtrajectoryRight: 'c:curvedtr',
            lateralarcRight: 'c:lateralr',
            curvedtrajectoryLeft: 'c:curvedtl',
            lateralarcLeft: 'c:laterall',			
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
            curvedtrajectoryRight: 'c:curvedtr',
            lateralarcRight: 'c:lateralr',
            curvedtrajectoryLeft: 'c:curvedtl',
            lateralarcLeft: 'c:laterall',			
            stop: 'c:stop'
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
            curvedtrajectoryRight: 'p:curvedtr',
            lateralarcRight: 'p:lateralr',
            curvedtrajectoryLeft: 'p:curvedtl',
            lateralarcLeft: 'p:laterall',
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
            SitHome: 'p:SitHome',
            Stand1: 'p:Stand1',
            Stand2: 'p:Stand2',
            Stand3: 'p:Stand3',
            RotateNeck: 'p:RotateNeck',
            Twist: 'p:Twist',
            Down: 'p:Down',
            Wink: 'p:Wink',
			stop: 'p:Stop'
        },

        // Voice command mappings
        voiceCommands: {
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
            curvedtrajectoryRight: 'p:curvedtr',
            lateralarcRight: 'p:lateralr',
            curvedtrajectoryLeft: 'p:curvedtl',
            lateralarcLeft: 'p:laterall',			
            stop: 'p:stop'
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
