'use strict';

/**
 * ILS (Interactive Learning System) - Application Namespace
 * Manages workspace state and block validation for visual programming environment
 */
var ILS = {
  codeIndent: '  ',
  sketchBlockExists: true
};

/**
 * Ensures only one 'start' block exists in the workspace
 * Automatically disables excess start blocks and re-enables them when needed
 * 
 * @param {Blockly.Events.Abstract} event - The Blockly event triggered
 */
var enforceUniqueStartBlock = function(event) {
  if (!event || !workspace) {
    console.error('ILS: Invalid event or workspace not initialized');
    return;
  }

  const MAX_START_BLOCKS = 1;

  try {
    if (event instanceof Blockly.Events.Create) {
      handleStartBlockCreation(MAX_START_BLOCKS);
    } else if (event instanceof Blockly.Events.Delete) {
      handleStartBlockDeletion(MAX_START_BLOCKS);
    }
  } catch (error) {
    console.error('ILS: Error enforcing unique start block:', error);
  }
};

/**
 * Handles creation events - disables excess start blocks
 * 
 * @param {number} maxAllowed - Maximum number of start blocks allowed
 */
function handleStartBlockCreation(maxAllowed) {
  const startBlocks = getBlocksByType('start', false);
  
  if (startBlocks.length <= maxAllowed) {
    return;
  }

  // Disable newly created start blocks that exceed the limit
  const excessBlocks = startBlocks.slice(maxAllowed);
  excessBlocks.forEach(block => {
    if (block && typeof block.setDisabled === 'function') {
      block.setDisabled(true);
    }
  });

  console.warn(`ILS: Disabled ${excessBlocks.length} excess start block(s)`);
}

/**
 * Handles deletion events - re-enables disabled start blocks if needed
 * 
 * @param {number} maxAllowed - Maximum number of start blocks allowed
 */
function handleStartBlockDeletion(maxAllowed) {
  const allStartBlocks = getBlocksByType('start', true);
  
  const enabledBlocks = allStartBlocks.filter(block => !block.disabled);
  const disabledBlocks = allStartBlocks.filter(block => block.disabled);

  // Re-enable disabled blocks if we're below the limit
  while (enabledBlocks.length < maxAllowed && disabledBlocks.length > 0) {
    const blockToEnable = disabledBlocks.shift();
    
    if (blockToEnable && typeof blockToEnable.setDisabled === 'function') {
      blockToEnable.setDisabled(false);
      enabledBlocks.push(blockToEnable);
      console.info('ILS: Re-enabled a start block');
    }
  }
}

/**
 * Retrieves all blocks of a specific type from the workspace
 * 
 * @param {string} blockType - The type of block to retrieve
 * @param {boolean} includeDisabled - Whether to include disabled blocks
 * @returns {Array<Blockly.Block>} Array of matching blocks
 */
function getBlocksByType(blockType, includeDisabled) {
  if (!workspace || typeof workspace.getTopBlocks !== 'function') {
    console.error('ILS: Workspace not properly initialized');
    return [];
  }

  try {
    const allBlocks = workspace.getTopBlocks(includeDisabled);
    return allBlocks.filter(block => block && block.type === blockType);
  } catch (error) {
    console.error('ILS: Error retrieving blocks by type:', error);
    return [];
  }
}

/**
 * Clears all ILS state variables
 */
ILS.clear = function() {
  try {
    ILS.sketchBlockExists = true;
    console.info('ILS: State cleared successfully');
  } catch (error) {
    console.error('ILS: Error clearing state:', error);
  }
};

/**
 * Handles block lifecycle events in the workspace
 * 
 * @param {Blockly.Events.Abstract} event - The Blockly event
 */
function onWorkspaceChange(event) {
  // Ignore UI-only events (viewport changes, selection, etc.)
  if (!event || event.isUiEvent) {
    return;
  }

  try {
    if (event.type === Blockly.Events.DELETE) {
      handleBlockDeletion(event);
    }
  } catch (error) {
    console.error('ILS: Error handling workspace change:', error);
  }
}

/**
 * Processes block deletion events
 * 
 * @param {Blockly.Events.Delete} event - The deletion event
 */
function handleBlockDeletion(event) {
  if (!event.blockId || !Code || !Code.workspace) {
    return;
  }

  const deletedBlock = Code.workspace.getBlockById(event.blockId);
  
  // Log deletion for debugging purposes
  if (deletedBlock) {
    console.info(`ILS: Block deleted - Type: ${deletedBlock.type}, ID: ${event.blockId}`);
  }

  // Additional deletion handling logic can be added here
}

/**
 * Initializes ILS event listeners
 */
ILS.initialize = function() {
  if (!Code || !Code.workspace) {
    console.error('ILS: Cannot initialize - Code.workspace not found');
    return false;
  }

  try {
    // Add workspace change listener
    Code.workspace.addChangeListener(onWorkspaceChange);
    
    // Add orphan block handler (disables blocks not connected to valid parents)
    if (Blockly.Events && typeof Blockly.Events.disableOrphans === 'function') {
      Code.workspace.addChangeListener(Blockly.Events.disableOrphans);
    }
    
    // Optionally add start block enforcement (currently commented out in original)
    // Code.workspace.addChangeListener(enforceUniqueStartBlock);
    
    console.info('ILS: Initialized successfully');
    return true;
  } catch (error) {
    console.error('ILS: Initialization failed:', error);
    return false;
  }
};

// Auto-initialize if Code.workspace is available
if (typeof Code !== 'undefined' && Code.workspace) {
  ILS.initialize();
}