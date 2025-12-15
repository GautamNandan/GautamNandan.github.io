// ILS DC Motor Car Code Generators (Consolidated)

Blockly.Python['ils_dc_car_init'] = function(block) {
  var config = block.getFieldValue('CONFIG');
  var driver = block.getFieldValue('DRIVER');

  Blockly.Python.definitions_['import_dc_car'] = 'from ils.dc_car import DCMotorCar';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  Blockly.Python.definitions_['ils_dc_car_init'] = 'ils_dc_car = DCMotorCar(config=' + config + ', driver=' + driver + ')';
  
  var code = '# ILS DC Motor Car initialized\n';
  return code;
};

// L298N - 4 Wheel Setup
Blockly.Python['ils_dc_car_set_pins_l298n_4wheel'] = function(block) {
  var fl_pin1 = Blockly.Python.valueToCode(block, 'FL_PIN1', Blockly.Python.ORDER_ATOMIC) || '12';
  var fl_pin2 = Blockly.Python.valueToCode(block, 'FL_PIN2', Blockly.Python.ORDER_ATOMIC) || '13';
  var fl_pin3 = Blockly.Python.valueToCode(block, 'FL_PIN3', Blockly.Python.ORDER_ATOMIC) || '14';
  
  var fr_pin1 = Blockly.Python.valueToCode(block, 'FR_PIN1', Blockly.Python.ORDER_ATOMIC) || '27';
  var fr_pin2 = Blockly.Python.valueToCode(block, 'FR_PIN2', Blockly.Python.ORDER_ATOMIC) || '26';
  var fr_pin3 = Blockly.Python.valueToCode(block, 'FR_PIN3', Blockly.Python.ORDER_ATOMIC) || '25';
  
  var rl_pin1 = Blockly.Python.valueToCode(block, 'RL_PIN1', Blockly.Python.ORDER_ATOMIC) || '33';
  var rl_pin2 = Blockly.Python.valueToCode(block, 'RL_PIN2', Blockly.Python.ORDER_ATOMIC) || '32';
  var rl_pin3 = Blockly.Python.valueToCode(block, 'RL_PIN3', Blockly.Python.ORDER_ATOMIC) || '35';
  
  var rr_pin1 = Blockly.Python.valueToCode(block, 'RR_PIN1', Blockly.Python.ORDER_ATOMIC) || '4';
  var rr_pin2 = Blockly.Python.valueToCode(block, 'RR_PIN2', Blockly.Python.ORDER_ATOMIC) || '16';
  var rr_pin3 = Blockly.Python.valueToCode(block, 'RR_PIN3', Blockly.Python.ORDER_ATOMIC) || '17';
  
  var code = 'ils_dc_car.set_motor_pins_4wheel(';
  code += '(' + fl_pin1 + ', ' + fl_pin2 + ', ' + fl_pin3 + '), ';
  code += '(' + fr_pin1 + ', ' + fr_pin2 + ', ' + fr_pin3 + '), ';
  code += '(' + rl_pin1 + ', ' + rl_pin2 + ', ' + rl_pin3 + '), ';
  code += '(' + rr_pin1 + ', ' + rr_pin2 + ', ' + rr_pin3 + '))\n';
  
  return code;
};

// L298N - 2 Wheel Setup
Blockly.Python['ils_dc_car_set_pins_l298n_2wheel'] = function(block) {
  function stripParens(value) {
    value = value.trim();
    if (value.startsWith('(') && value.endsWith(')')) {
      return value.slice(1, -1);
    }
    return value;
  }
  
  var left_pin1 = stripParens(Blockly.Python.valueToCode(block, 'LEFT_PIN1', Blockly.Python.ORDER_ATOMIC) || '12');
  var left_pin2 = stripParens(Blockly.Python.valueToCode(block, 'LEFT_PIN2', Blockly.Python.ORDER_ATOMIC) || '13');
  var left_pin3 = stripParens(Blockly.Python.valueToCode(block, 'LEFT_PIN3', Blockly.Python.ORDER_ATOMIC) || '14');
  
  var right_pin1 = stripParens(Blockly.Python.valueToCode(block, 'RIGHT_PIN1', Blockly.Python.ORDER_ATOMIC) || '27');
  var right_pin2 = stripParens(Blockly.Python.valueToCode(block, 'RIGHT_PIN2', Blockly.Python.ORDER_ATOMIC) || '26');
  var right_pin3 = stripParens(Blockly.Python.valueToCode(block, 'RIGHT_PIN3', Blockly.Python.ORDER_ATOMIC) || '25');
  
  var code = 'ils_dc_car.set_motor_pins_2wheel(';
  code += '(' + left_pin1 + ', ' + left_pin2 + ', ' + left_pin3 + '), ';
  code += '(' + right_pin1 + ', ' + right_pin2 + ', ' + right_pin3 + '))\n';
  
  return code;
};

// DRV8833 - 4 Wheel Setup
Blockly.Python['ils_dc_car_set_pins_drv8833_4wheel'] = function(block) {
  var fl_pin1 = Blockly.Python.valueToCode(block, 'FL_PIN1', Blockly.Python.ORDER_ATOMIC) || '12';
  var fl_pin2 = Blockly.Python.valueToCode(block, 'FL_PIN2', Blockly.Python.ORDER_ATOMIC) || '13';
  
  var fr_pin1 = Blockly.Python.valueToCode(block, 'FR_PIN1', Blockly.Python.ORDER_ATOMIC) || '27';
  var fr_pin2 = Blockly.Python.valueToCode(block, 'FR_PIN2', Blockly.Python.ORDER_ATOMIC) || '26';
  
  var rl_pin1 = Blockly.Python.valueToCode(block, 'RL_PIN1', Blockly.Python.ORDER_ATOMIC) || '33';
  var rl_pin2 = Blockly.Python.valueToCode(block, 'RL_PIN2', Blockly.Python.ORDER_ATOMIC) || '32';
  
  var rr_pin1 = Blockly.Python.valueToCode(block, 'RR_PIN1', Blockly.Python.ORDER_ATOMIC) || '4';
  var rr_pin2 = Blockly.Python.valueToCode(block, 'RR_PIN2', Blockly.Python.ORDER_ATOMIC) || '16';
  
  var code = 'ils_dc_car.set_motor_pins_4wheel(';
  code += '(' + fl_pin1 + ', ' + fl_pin2 + '), ';
  code += '(' + fr_pin1 + ', ' + fr_pin2 + '), ';
  code += '(' + rl_pin1 + ', ' + rl_pin2 + '), ';
  code += '(' + rr_pin1 + ', ' + rr_pin2 + '))\n';
  
  return code;
};

// DRV8833 - 2 Wheel Setup
Blockly.Python['ils_dc_car_set_pins_drv8833_2wheel'] = function(block) {
  function stripParens(value) {
    value = value.trim();
    if (value.startsWith('(') && value.endsWith(')')) {
      return value.slice(1, -1);
    }
    return value;
  }
  
  var left_pin1 = stripParens(Blockly.Python.valueToCode(block, 'LEFT_PIN1', Blockly.Python.ORDER_ATOMIC) || '12');
  var left_pin2 = stripParens(Blockly.Python.valueToCode(block, 'LEFT_PIN2', Blockly.Python.ORDER_ATOMIC) || '13');
  
  var right_pin1 = stripParens(Blockly.Python.valueToCode(block, 'RIGHT_PIN1', Blockly.Python.ORDER_ATOMIC) || '27');
  var right_pin2 = stripParens(Blockly.Python.valueToCode(block, 'RIGHT_PIN2', Blockly.Python.ORDER_ATOMIC) || '26');
  
  var code = 'ils_dc_car.set_motor_pins_2wheel(';
  code += '(' + left_pin1 + ', ' + left_pin2 + '), ';
  code += '(' + right_pin1 + ', ' + right_pin2 + '))\n';
  
  return code;
};

// Combined Basic Movement Generator
Blockly.Python['ils_dc_car_move'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var code = '';
  switch(direction) {
    case 'FORWARD':
      code = 'ils_dc_car.move_forward(' + speed + ')\n';
      break;
    case 'BACKWARD':
      code = 'ils_dc_car.move_backward(' + speed + ')\n';
      break;
    case 'LEFT':
      code = 'ils_dc_car.turn_left(' + speed + ')\n';
      break;
    case 'RIGHT':
      code = 'ils_dc_car.turn_right(' + speed + ')\n';
      break;
    case 'STOP':
      code = 'ils_dc_car.stop()\n';
      break;
  }
  
  return code;
};

// Combined Curve Generator
Blockly.Python['ils_dc_car_curve'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var turn_ratio = Blockly.Python.valueToCode(block, 'TURN_RATIO', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var code = '';
  if (direction === 'LEFT') {
    code = 'ils_dc_car.curve_left(' + speed + ', ' + turn_ratio + ')\n';
  } else {
    code = 'ils_dc_car.curve_right(' + speed + ', ' + turn_ratio + ')\n';
  }
  
  return code;
};

// Combined Drift Generator
Blockly.Python['ils_dc_car_drift'] = function(block) {
  var direction = block.getFieldValue('DIRECTION');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var code = '';
  if (direction === 'LEFT') {
    code = 'ils_dc_car.drift_left(' + speed + ')\n';
  } else {
    code = 'ils_dc_car.drift_right(' + speed + ')\n';
  }
  
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