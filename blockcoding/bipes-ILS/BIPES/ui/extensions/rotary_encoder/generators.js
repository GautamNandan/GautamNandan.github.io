// Rotary Encoder Code Generators

Blockly.Python['rotary_encoder_init'] = function(block) {
  var clk_pin = Blockly.Python.valueToCode(block, 'CLK_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var dt_pin = Blockly.Python.valueToCode(block, 'DT_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var sw_pin = Blockly.Python.valueToCode(block, 'SW_PIN', Blockly.Python.ORDER_ATOMIC) || '27';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_rotary'] = 'from ils import rotary_encoder';
  
  Blockly.Python.definitions_['encoder_obj'] = 'encoder = rotary_encoder.RotaryEncoder(' + clk_pin + ', ' + dt_pin + ', ' + sw_pin + ')';
  
  var code = '';
  return code;
};

Blockly.Python['rotary_encoder_init_no_button'] = function(block) {
  var clk_pin = Blockly.Python.valueToCode(block, 'CLK_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var dt_pin = Blockly.Python.valueToCode(block, 'DT_PIN', Blockly.Python.ORDER_ATOMIC) || '26';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_rotary'] = 'from ils import rotary_encoder';
  
  Blockly.Python.definitions_['encoder_obj'] = 'encoder = rotary_encoder.RotaryEncoder(' + clk_pin + ', ' + dt_pin + ')';
  
  var code = '';
  return code;
};

Blockly.Python['rotary_encoder_get_value'] = function(block) {
  var code = 'encoder.value()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_get_delta'] = function(block) {
  var code = 'encoder.get_delta()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_get_direction'] = function(block) {
  var code = 'encoder.get_direction()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_button_pressed'] = function(block) {
  var code = 'encoder.button_pressed()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_wait_for_button'] = function(block) {
  var timeout = Blockly.Python.valueToCode(block, 'TIMEOUT', Blockly.Python.ORDER_ATOMIC) || '5';
  
  var code = 'encoder.wait_for_button(' + timeout + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_rotated_cw'] = function(block) {
  var code = 'encoder.rotated_cw()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_rotated_ccw'] = function(block) {
  var code = 'encoder.rotated_ccw()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_has_moved'] = function(block) {
  var code = 'encoder.has_moved()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rotary_encoder_set_value'] = function(block) {
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'encoder.set_value(' + value + ')\n';
  return code;
};

Blockly.Python['rotary_encoder_reset'] = function(block) {
  var code = 'encoder.reset()\n';
  return code;
};

Blockly.Python['rotary_encoder_set_limits'] = function(block) {
  var min_val = Blockly.Python.valueToCode(block, 'MIN', Blockly.Python.ORDER_ATOMIC) || '0';
  var max_val = Blockly.Python.valueToCode(block, 'MAX', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var code = 'encoder.set_limits(' + min_val + ', ' + max_val + ')\n';
  return code;
};

Blockly.Python['rotary_encoder_clear_limits'] = function(block) {
  var code = 'encoder.clear_limits()\n';
  return code;
};

Blockly.Python['rotary_encoder_set_scale'] = function(block) {
  var scale = Blockly.Python.valueToCode(block, 'SCALE', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var code = 'encoder.set_scale(' + scale + ')\n';
  return code;
};

Blockly.Python['rotary_encoder_set_reverse'] = function(block) {
  var reverse = block.getFieldValue('REVERSE');
  
  var code = 'encoder.set_reverse(' + reverse + ')\n';
  return code;
};