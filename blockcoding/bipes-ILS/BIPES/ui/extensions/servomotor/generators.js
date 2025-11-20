// Servo Motor Code Generators
Blockly.Python['servo_pinout'] = function(block) {
	return '';
}
Blockly.Python['servo_init_standard'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '18';
  var servo_id = block.getFieldValue('SERVO_ID');

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_pwm'] = 'from machine import PWM';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_servo'] = 'from ils.servomotor import Servo';
  
  // Create servo instance
  var servo_var = 'servo_' + servo_id;
  Blockly.Python.definitions_[servo_var] = servo_var + ' = Servo(' + pin + ', servo_type="standard")';
  
  var code = '# ILS Servo ' + servo_id + ' (180°) initialized\n';
  return code;
};

Blockly.Python['servo_init_continuous'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '19';
  var servo_id = block.getFieldValue('SERVO_ID');

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_pwm'] = 'from machine import PWM';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_servo'] = 'from ils.servomotor import Servo';
  
  // Create servo instance
  var servo_var = 'servo_' + servo_id;
  Blockly.Python.definitions_[servo_var] = servo_var + ' = Servo(' + pin + ', servo_type="continuous")';
  
  var code = '# ILS Servo ' + servo_id + ' (360°) initialized\n';
  return code;
};

Blockly.Python['servo_angle'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC) || '90';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.angle(' + angle + ')\n';
  return code;
};

Blockly.Python['servo_preset_position'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var position = block.getFieldValue('POSITION');
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.angle(' + position + ')\n';
  return code;
};

Blockly.Python['servo_sweep'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var start_angle = Blockly.Python.valueToCode(block, 'START_ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
  var end_angle = Blockly.Python.valueToCode(block, 'END_ANGLE', Blockly.Python.ORDER_ATOMIC) || '180';
  var step = Blockly.Python.valueToCode(block, 'STEP', Blockly.Python.ORDER_ATOMIC) || '10';
  var delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.sweep(' + start_angle + ', ' + end_angle + ', ' + step + ', ' + delay + ')\n';
  return code;
};

Blockly.Python['servo_smooth_move'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var target_angle = Blockly.Python.valueToCode(block, 'TARGET_ANGLE', Blockly.Python.ORDER_ATOMIC) || '90';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '5';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.smooth_move(' + target_angle + ', ' + speed + ')\n';
  return code;
};

Blockly.Python['servo_continuous_forward'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '2';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.continuous_forward(' + speed + ')\n';
  return code;
};

Blockly.Python['servo_continuous_backward'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '2';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.continuous_backward(' + speed + ')\n';
  return code;
};

Blockly.Python['servo_continuous_stop'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '2';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.continuous_stop()\n';
  return code;
};

Blockly.Python['servo_detach'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.detach()\n';
  return code;
};

Blockly.Python['servo_attach'] = function(block) {
  var servo_id = Blockly.Python.valueToCode(block, 'SERVO_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var servo_var = 'servo_' + servo_id;
  var code = servo_var + '.attach()\n';
  return code;
};