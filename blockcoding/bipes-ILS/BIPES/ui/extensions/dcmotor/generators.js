// DC Motor L298N Code Generators

Blockly.Python['l298n_motor_init'] = function(block) {
  var in1_pin = Blockly.Python.valueToCode(block, 'IN1_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var in2_pin = Blockly.Python.valueToCode(block, 'IN2_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var en_pin = Blockly.Python.valueToCode(block, 'EN_PIN', Blockly.Python.ORDER_ATOMIC) || '27';
  var motor_id = block.getFieldValue('MOTOR_ID');

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_pwm'] = 'from machine import PWM';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_l298n_motor'] = 'from ils.dcmotor import DCMotor';
  
  // Create motor instance
  var motor_var = 'motor_' + motor_id;
  Blockly.Python.definitions_[motor_var] = motor_var + ' = DCMotor(' + 
    in1_pin + ', ' + in2_pin + ', ' + en_pin + ')';
  
  var code = '# ILS Motor ' + motor_id + ' initialized\n';
  return code;
};

Blockly.Python['l298n_motor_forward'] = function(block) {
  var motor_id = Blockly.Python.valueToCode(block, 'MOTOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var motor_var = 'motor_' + motor_id;
  var code = motor_var + '.forward(' + speed + ')\n';
  return code;
};

Blockly.Python['l298n_motor_backward'] = function(block) {
  var motor_id = Blockly.Python.valueToCode(block, 'MOTOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var motor_var = 'motor_' + motor_id;
  var code = motor_var + '.backward(' + speed + ')\n';
  return code;
};

Blockly.Python['l298n_motor_stop'] = function(block) {
  var motor_id = Blockly.Python.valueToCode(block, 'MOTOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var motor_var = 'motor_' + motor_id;
  var code = motor_var + '.stop()\n';
  return code;
};

Blockly.Python['l298n_motor_set_direction'] = function(block) {
  var motor_id = Blockly.Python.valueToCode(block, 'MOTOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var direction = block.getFieldValue('DIRECTION');
  
  var motor_var = 'motor_' + motor_id;
  var code = motor_var + '.set_direction("' + direction.toLowerCase() + '")\n';
  return code;
};

Blockly.Python['l298n_motor_set_speed'] = function(block) {
  var motor_id = Blockly.Python.valueToCode(block, 'MOTOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '75';
  
  var motor_var = 'motor_' + motor_id;
  var code = motor_var + '.set_speed(' + speed + ')\n';
  return code;
};

Blockly.Python['l298n_motor_run_time'] = function(block) {
  var motor_id = Blockly.Python.valueToCode(block, 'MOTOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '100';
  var time_val = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || '2';
  
  var motor_var = 'motor_' + motor_id;
  var code = motor_var + '.run_time("' + direction.toLowerCase() + '", ' + speed + ', ' + time_val + ')\n';
  return code;
};

Blockly.Python['l298n_motor_brake'] = function(block) {
  var motor_id = Blockly.Python.valueToCode(block, 'MOTOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var motor_var = 'motor_' + motor_id;
  var code = motor_var + '.brake()\n';
  return code;
};