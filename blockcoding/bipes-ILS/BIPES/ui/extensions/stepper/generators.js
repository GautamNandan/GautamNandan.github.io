// ILS Stepper Motor Python Code Generators for Blockly
// Generates MicroPython code for ESP32

// ==================== SETUP GENERATOR ====================
Blockly.Python['stepper_init'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var in1_pin = Blockly.Python.valueToCode(block, 'IN1_PIN', Blockly.Python.ORDER_ATOMIC) || '12';
  var in2_pin = Blockly.Python.valueToCode(block, 'IN2_PIN', Blockly.Python.ORDER_ATOMIC) || '14';
  var in3_pin = Blockly.Python.valueToCode(block, 'IN3_PIN', Blockly.Python.ORDER_ATOMIC) || '27';
  var in4_pin = Blockly.Python.valueToCode(block, 'IN4_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var steps_per_rev = block.getFieldValue('STEPS_PER_REV');
  
  // Add imports
  Blockly.Python.definitions_['import_uasyncio'] = 'import uasyncio';
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import utime';
  Blockly.Python.definitions_['import_stepper'] = 'from ils.stepper_motor import StepperMotor';
  
  // Initialize stepper motors dictionary if not exists
  if (!Blockly.Python.definitions_['stepper_motors_dict']) {
    Blockly.Python.definitions_['stepper_motors_dict'] = 'stepper_motors = {}';
  }
  
  // Create stepper motor instance
  var code = 'stepper_motors[' + motor_id + '] = StepperMotor(' + 
             in1_pin + ', ' + in2_pin + ', ' + in3_pin + ', ' + in4_pin + 
             ', ' + steps_per_rev + ')\n';
  
  return code;
};

// ==================== BASIC MOVEMENT GENERATORS ====================
Blockly.Python['stepper_rotate_degrees'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_ATOMIC) || '90';
  var direction = block.getFieldValue('DIRECTION');
  
  var code = 'stepper_motors[' + motor_id + '].rotate_degrees(' + 
             degrees + ', \'' + direction + '\')\n';
  return code;
};

Blockly.Python['stepper_move_steps'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var steps = Blockly.Python.valueToCode(block, 'STEPS', Blockly.Python.ORDER_ATOMIC) || '100';
  var direction = block.getFieldValue('DIRECTION');
  
  var code = 'stepper_motors[' + motor_id + '].move_steps(' + 
             steps + ', \'' + direction + '\')\n';
  return code;
};

Blockly.Python['stepper_move_to_position'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var position = Blockly.Python.valueToCode(block, 'POSITION', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'stepper_motors[' + motor_id + '].move_to_position(' + 
             position + ')\n';
  return code;
};

// ==================== SPEED CONTROL GENERATORS ====================
Blockly.Python['stepper_set_speed_preset'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var speed = block.getFieldValue('SPEED');
  
  var code = 'stepper_motors[' + motor_id + '].set_speed(\'' + 
             speed + '\')\n';
  return code;
};

Blockly.Python['stepper_set_speed_rpm'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var rpm = Blockly.Python.valueToCode(block, 'RPM', Blockly.Python.ORDER_ATOMIC) || '10';
  
  var code = 'stepper_motors[' + motor_id + '].set_speed(' + 
             rpm + ')\n';
  return code;
};

// ==================== ADVANCED MOVEMENT GENERATORS ====================
Blockly.Python['stepper_rotate_smooth'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_ATOMIC) || '90';
  var direction = block.getFieldValue('DIRECTION');
  var acceleration = block.getFieldValue('ACCELERATION');
  
  var code = 'stepper_motors[' + motor_id + '].rotate_smooth(' + 
             degrees + ', \'' + direction + '\', \'' + acceleration + '\')\n';
  return code;
};

Blockly.Python['stepper_spin_continuous'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var direction = block.getFieldValue('DIRECTION');
  
  var code = 'stepper_motors[' + motor_id + '].spin_forever(\'' + 
             direction + '\')\n';
  return code;
};

Blockly.Python['stepper_stop'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  
  var code = 'stepper_motors[' + motor_id + '].stop()\n';
  return code;
};

// ==================== FUN PATTERN GENERATOR ====================
Blockly.Python['stepper_dance'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  var repetitions = Blockly.Python.valueToCode(block, 'REPETITIONS', Blockly.Python.ORDER_ATOMIC) || '3';
  
  var code = 'stepper_motors[' + motor_id + '].dance_pattern(' + 
             repetitions + ')\n';
  return code;
};

// ==================== SENSOR/STATUS GENERATORS ====================
Blockly.Python['stepper_get_position'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  
  var code = 'stepper_motors[' + motor_id + '].get_position_degrees()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['stepper_is_moving'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  
  var code = 'stepper_motors[' + motor_id + '].is_motor_moving()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['stepper_reset_position'] = function(block) {
  var motor_id = block.getFieldValue('MOTOR_ID');
  
  var code = 'stepper_motors[' + motor_id + '].reset_position()\n';
  return code;
};