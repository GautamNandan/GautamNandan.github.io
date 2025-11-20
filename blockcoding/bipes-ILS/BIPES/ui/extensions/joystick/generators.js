// Joystick Controller Code Generators

Blockly.Python['joystick_pinout'] = function(block) {
	return '';
}

Blockly.Python['joystick_init'] = function(block) {
  var x_pin = Blockly.Python.valueToCode(block, 'X_PIN', Blockly.Python.ORDER_ATOMIC) || '34';
  var y_pin = Blockly.Python.valueToCode(block, 'Y_PIN', Blockly.Python.ORDER_ATOMIC) || '35';
  var button_pin = Blockly.Python.valueToCode(block, 'BUTTON_PIN', Blockly.Python.ORDER_ATOMIC) || '32';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_adc'] = 'from machine import ADC';
  Blockly.Python.definitions_['import_joystick'] = 'from ils import joystick';
  
  Blockly.Python.definitions_['joystick_obj'] = 'joy = joystick.Joystick(' + x_pin + ', ' + y_pin + ', ' + button_pin + ')';
  
  var code = '';
  return code;
};

Blockly.Python['joystick_read_x'] = function(block) {
  var code = 'joy.read_x()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_read_y'] = function(block) {
  var code = 'joy.read_y()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_read_button'] = function(block) {
  var code = 'joy.read_button()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_get_x_normalized'] = function(block) {
  var code = 'joy.get_x_normalized()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_get_y_normalized'] = function(block) {
  var code = 'joy.get_y_normalized()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_is_direction'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_ATOMIC) || '30';
  
  var code = 'joy.is_direction("' + direction + '", ' + threshold + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_get_direction'] = function(block) {
  var threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_ATOMIC) || '30';
  
  var code = 'joy.get_direction(' + threshold + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_is_centered'] = function(block) {
  var deadzone = Blockly.Python.valueToCode(block, 'DEADZONE', Blockly.Python.ORDER_ATOMIC) || '20';
  
  var code = 'joy.is_centered(' + deadzone + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['joystick_calibrate'] = function(block) {
  var code = 'joy.calibrate()\n';
  return code;
};

Blockly.Python['joystick_set_center'] = function(block) {
  var x_center = Blockly.Python.valueToCode(block, 'X_CENTER', Blockly.Python.ORDER_ATOMIC) || '2048';
  var y_center = Blockly.Python.valueToCode(block, 'Y_CENTER', Blockly.Python.ORDER_ATOMIC) || '2048';
  
  var code = 'joy.set_center(' + x_center + ', ' + y_center + ')\n';
  return code;
};