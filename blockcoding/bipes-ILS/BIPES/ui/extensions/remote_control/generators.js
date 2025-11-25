// ILS ESP-NOW Remote Control - Python Code Generators

// ============= SETUP BLOCK =============
Blockly.Python['remote_receiver_init'] = function(block) {
  var beacon_time = Blockly.Python.valueToCode(block, 'BEACON_TIME', Blockly.Python.ORDER_ATOMIC) || '10';
  
  // Add imports (only in setup block)
  Blockly.Python.definitions_['import_uasyncio'] = 'import uasyncio';
  Blockly.Python.definitions_['import_remote'] = 'from ils import espnow_remote';
  

  // Setup receiver with beacon time in milliseconds
  var code = 'espnow_remote.setup_receiver(' + beacon_time + ' * 1000)\n';
  
  return code;
};

// ============= CONTROL BLOCKS =============
Blockly.Python['remote_update'] = function(block) {
  var code = 'espnow_remote.update_remote()\n';
  return code;
};

// ============= JOYSTICK BLOCKS =============
Blockly.Python['remote_on_joystick_move'] = function(block) {
  var x_var = Blockly.Python.variableDB_.getName(block.getFieldValue('X_VAR'), Blockly.Variables.NAME_TYPE);
  var y_var = Blockly.Python.variableDB_.getName(block.getFieldValue('Y_VAR'), Blockly.Variables.NAME_TYPE);
  var dir_var = Blockly.Python.variableDB_.getName(block.getFieldValue('DIR_VAR'), Blockly.Variables.NAME_TYPE);
  var statements = Blockly.Python.statementToCode(block, 'DO');
  
  // Generate unique function name
  var funcName = Blockly.Python.provideFunction_(
    'on_joystick_callback',
    ['#@no_async',
     'def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(' + x_var + ', ' + y_var + ', ' + dir_var + '):',
     statements || Blockly.Python.PASS]);
  
  var code = 'espnow_remote.on_joystick_move(' + funcName + ')\n';
  return code;
};

Blockly.Python['remote_on_direction'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var statements = Blockly.Python.statementToCode(block, 'DO');
  
  // Generate unique function name based on direction
  var funcName = Blockly.Python.provideFunction_(
    'on_direction_' + direction,
    ['#@no_async',
     'def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
     statements || Blockly.Python.PASS]);
  
  var code = 'espnow_remote.on_direction("' + direction + '", ' + funcName + ')\n';
  return code;
};

Blockly.Python['remote_get_joystick'] = function(block) {
  var axis = block.getFieldValue('AXIS');
  
  var code;
  if (axis === 'x') {
    code = 'espnow_remote.get_joystick_x()';
  } else {
    code = 'espnow_remote.get_joystick_y()';
  }
  
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['remote_get_direction'] = function(block) {
  var code = 'espnow_remote.get_direction()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ============= BUTTON BLOCKS =============
Blockly.Python['remote_on_button'] = function(block) {
  var button = block.getFieldValue('BUTTON');
  var event = block.getFieldValue('EVENT');
  var statements = Blockly.Python.statementToCode(block, 'DO');
  
  // Generate unique function name based on button and event
  var funcName = Blockly.Python.provideFunction_(
    'on_button_' + button + '_' + event,
    ['#@no_async',
     'def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
     statements || Blockly.Python.PASS]);
  
  var code = 'espnow_remote.on_button("' + button + '", "' + event + '", ' + funcName + ')\n';
  return code;
};

Blockly.Python['remote_on_any_button'] = function(block) {
  var btn_var = Blockly.Python.variableDB_.getName(block.getFieldValue('BTN_VAR'), Blockly.Variables.NAME_TYPE);
  var event_var = Blockly.Python.variableDB_.getName(block.getFieldValue('EVENT_VAR'), Blockly.Variables.NAME_TYPE);
  var statements = Blockly.Python.statementToCode(block, 'DO');
  
  // Generate unique function name
  var funcName = Blockly.Python.provideFunction_(
    'on_any_button_callback',
    ['#@no_async',
     'def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(' + btn_var + ', ' + event_var + '):',
     statements || Blockly.Python.PASS]);
  
  var code = 'espnow_remote.on_any_button(' + funcName + ')\n';
  return code;
};

// ============= ADVANCED BLOCKS =============
Blockly.Python['remote_is_connected'] = function(block) {
  var code = 'espnow_remote.is_connected()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['remote_stop'] = function(block) {
  var code = 'espnow_remote.stop_receiver()\n';
  return code;
};

Blockly.Python['remote_start'] = function(block) {
  var code = 'espnow_remote.start_receiver()\n';
  return code;
};