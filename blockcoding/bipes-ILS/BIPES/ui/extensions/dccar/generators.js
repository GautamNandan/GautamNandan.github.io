// ILS DC Motor Car Code Generators

Blockly.Python['ils_dc_car_init'] = function(block) {
  var config = block.getFieldValue('CONFIG');

  Blockly.Python.definitions_['import_dc_car'] = 'from ils.dccar import DCMotorCar';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  Blockly.Python.definitions_['ils_dc_car_init'] = 'ils_dc_car = DCMotorCar(config=' + config + ')';
  
  var code = '# ILS DC Motor Car initialized\n';
  return code;
};

Blockly.Python['ils_dc_car_set_pins_4wheel'] = function(block) {
  var fl_ena = Blockly.Python.valueToCode(block, 'FL_ENA', Blockly.Python.ORDER_ATOMIC) || '12';
  var fl_in1 = Blockly.Python.valueToCode(block, 'FL_IN1', Blockly.Python.ORDER_ATOMIC) || '13';
  var fl_in2 = Blockly.Python.valueToCode(block, 'FL_IN2', Blockly.Python.ORDER_ATOMIC) || '14';
  
  var fr_enb = Blockly.Python.valueToCode(block, 'FR_ENB', Blockly.Python.ORDER_ATOMIC) || '27';
  var fr_in3 = Blockly.Python.valueToCode(block, 'FR_IN3', Blockly.Python.ORDER_ATOMIC) || '26';
  var fr_in4 = Blockly.Python.valueToCode(block, 'FR_IN4', Blockly.Python.ORDER_ATOMIC) || '25';
  
  var rl_ena = Blockly.Python.valueToCode(block, 'RL_ENA', Blockly.Python.ORDER_ATOMIC) || '33';
  var rl_in1 = Blockly.Python.valueToCode(block, 'RL_IN1', Blockly.Python.ORDER_ATOMIC) || '32';
  var rl_in2 = Blockly.Python.valueToCode(block, 'RL_IN2', Blockly.Python.ORDER_ATOMIC) || '35';
  
  var rr_enb = Blockly.Python.valueToCode(block, 'RR_ENB', Blockly.Python.ORDER_ATOMIC) || '4';
  var rr_in3 = Blockly.Python.valueToCode(block, 'RR_IN3', Blockly.Python.ORDER_ATOMIC) || '16';
  var rr_in4 = Blockly.Python.valueToCode(block, 'RR_IN4', Blockly.Python.ORDER_ATOMIC) || '17';
  
  var code = 'ils_dc_car.set_motor_pins_4wheel(';
  code += '(' + fl_ena + ', ' + fl_in1 + ', ' + fl_in2 + '), ';
  code += '(' + fr_enb + ', ' + fr_in3 + ', ' + fr_in4 + '), ';
  code += '(' + rl_ena + ', ' + rl_in1 + ', ' + rl_in2 + '), ';
  code += '(' + rr_enb + ', ' + rr_in3 + ', ' + rr_in4 + '))\n';
  
  return code;
};

Blockly.Python['ils_dc_car_set_pins_2wheel'] = function(block) {
  var left_ena = Blockly.Python.valueToCode(block, 'LEFT_ENA', Blockly.Python.ORDER_ATOMIC) || '12';
  var left_in1 = Blockly.Python.valueToCode(block, 'LEFT_IN1', Blockly.Python.ORDER_ATOMIC) || '13';
  var left_in2 = Blockly.Python.valueToCode(block, 'LEFT_IN2', Blockly.Python.ORDER_ATOMIC) || '14';
  
  var right_enb = Blockly.Python.valueToCode(block, 'RIGHT_ENB', Blockly.Python.ORDER_ATOMIC) || '27';
  var right_in3 = Blockly.Python.valueToCode(block, 'RIGHT_IN3', Blockly.Python.ORDER_ATOMIC) || '26';
  var right_in4 = Blockly.Python.valueToCode(block, 'RIGHT_IN4', Blockly.Python.ORDER_ATOMIC) || '25';
  
  var code = 'ils_dc_car.set_motor_pins_2wheel(';
  code += '(' + left_ena + ', ' + left_in1 + ', ' + left_in2 + '), ';
  code += '(' + right_enb + ', ' + right_in3 + ', ' + right_in4 + '))\n';
  
  return code;
};

// Basic Movement Generators

Blockly.Python['ils_dc_car_forward'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.move_forward(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_backward'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.move_backward(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_turn_left'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.turn_left(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_turn_right'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.turn_right(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_stop'] = function(block) {
  var code = 'ils_dc_car.stop()\n';
  return code;
};

// Advanced Movement Generators

Blockly.Python['ils_dc_car_curve_left'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var turn_ratio = Blockly.Python.valueToCode(block, 'TURN_RATIO', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.curve_left(' + speed + ', ' + turn_ratio + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_curve_right'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var turn_ratio = Blockly.Python.valueToCode(block, 'TURN_RATIO', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.curve_right(' + speed + ', ' + turn_ratio + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_drift_left'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.drift_left(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_drift_right'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_dc_car.drift_right(' + speed + ')\n';
  return code;
};

// Individual Wheel Control Generators

Blockly.Python['ils_dc_car_wheel_speed_4wheel'] = function(block) {
  var wheel = block.getFieldValue('WHEEL');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'ils_dc_car.set_wheel_speed(' + wheel + ', ' + speed + ')\n';
  return code;
};

Blockly.Python['ils_dc_car_wheel_speed_2wheel'] = function(block) {
  var wheel = block.getFieldValue('WHEEL');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'ils_dc_car.set_wheel_speed(' + wheel + ', ' + speed + ')\n';
  return code;
};

// Configuration Generator

Blockly.Python['ils_dc_car_set_mirror'] = function(block) {
  var mirror_left = block.getFieldValue('MIRROR_LEFT') == 'TRUE' ? 'True' : 'False';
  var mirror_right = block.getFieldValue('MIRROR_RIGHT') == 'TRUE' ? 'True' : 'False';
  var code = 'ils_dc_car.set_mirror_mode(' + mirror_left + ', ' + mirror_right + ')\n';
  return code;
};