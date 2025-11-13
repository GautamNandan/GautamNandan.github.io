Blockly.Python['pushbutton_init'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';

  // Add import for PushButton class
  Blockly.Python.definitions_['import_pushbutton'] = 'from ils.pushbutton import PushButton';
  
  // Create button instance
  var button_var = 'button_' + button_id;
  Blockly.Python.definitions_['button_' + button_id] = 
    button_var + ' = PushButton(' + pin + ')';
  
  var code = '# Push button ' + button_id + ' initialized\n';
  return code;
};

Blockly.Python['pushbutton_init_advanced'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var long_press_time = Blockly.Python.valueToCode(block, 'LONG_PRESS_TIME', Blockly.Python.ORDER_ATOMIC) || '1000';

  // Add import for PushButton class
  Blockly.Python.definitions_['import_pushbutton'] = 'from ils.pushbutton import PushButton';
  
  // Create button instance with custom timing
  var button_var = 'button_' + button_id;
  Blockly.Python.definitions_['button_' + button_id] = 
    button_var + ' = PushButton(' + pin + ', ' + long_press_time + ')';
  
  var code = '# Push button ' + button_id + ' initialized with custom timing\n';
  return code;
};

Blockly.Python['pushbutton_is_pressed'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.is_pressed()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_was_short_pressed'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.was_short_pressed()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_was_long_pressed'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.was_long_pressed()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_is_long_pressing'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.is_long_pressing()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_press_count'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.get_press_count()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_press_duration'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.get_press_duration()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_update'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.update()\n';
  return code;
};

Blockly.Python['pushbutton_reset_count'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.reset_count()\n';
  return code;
};