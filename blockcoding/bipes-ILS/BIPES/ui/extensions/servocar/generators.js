// ILS Servo Car Code Generators - Supports PCA9685 and Direct GPIO

// Direct GPIO mode - 4 wheel
Blockly.Python['ils_car_set_pins_4wheel'] = function(block) {
  var fl = Blockly.Python.valueToCode(block, 'FL_PIN', Blockly.Python.ORDER_ATOMIC) || '12';
  var fr = Blockly.Python.valueToCode(block, 'FR_PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var rl = Blockly.Python.valueToCode(block, 'RL_PIN', Blockly.Python.ORDER_ATOMIC) || '14';
  var rr = Blockly.Python.valueToCode(block, 'RR_PIN', Blockly.Python.ORDER_ATOMIC) || '27';

  Blockly.Python.definitions_['import_servo_car'] = 'from ils.servo_car import ServoCar';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  Blockly.Python.definitions_['ils_car_init'] = 'ils_car = ServoCar(config=ServoCar.CONFIG_4_WHEEL, mode=ServoCar.MODE_DIRECT)';
  
  var code = 'ils_car.set_servo_pins(' + fl + ', ' + fr + ', ' + rl + ', ' + rr + ')\n';
  return code;
};

// Direct GPIO mode - 2 wheel
Blockly.Python['ils_car_set_pins_2wheel'] = function(block) {
  var left = Blockly.Python.valueToCode(block, 'LEFT_PIN', Blockly.Python.ORDER_ATOMIC) || '12';
  var right = Blockly.Python.valueToCode(block, 'RIGHT_PIN', Blockly.Python.ORDER_ATOMIC) || '13';

  Blockly.Python.definitions_['import_servo_car'] = 'from ils.servo_car import ServoCar';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  Blockly.Python.definitions_['ils_car_init'] = 'ils_car = ServoCar(config=ServoCar.CONFIG_2_WHEEL, mode=ServoCar.MODE_DIRECT)';
  
  var code = 'ils_car.set_servo_pins(' + left + ', ' + right + ')\n';
  return code;
};

// PCA9685 mode - 4 wheel
Blockly.Python['ils_car_set_channels_4wheel'] = function(block) {
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA_PIN', Blockly.Python.ORDER_ATOMIC) || '21';
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL_PIN', Blockly.Python.ORDER_ATOMIC) || '22';
  var address = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC) || '0x40';
  var fl = Blockly.Python.valueToCode(block, 'FL_CHANNEL', Blockly.Python.ORDER_ATOMIC) || '0';
  var fr = Blockly.Python.valueToCode(block, 'FR_CHANNEL', Blockly.Python.ORDER_ATOMIC) || '1';
  var rl = Blockly.Python.valueToCode(block, 'RL_CHANNEL', Blockly.Python.ORDER_ATOMIC) || '2';
  var rr = Blockly.Python.valueToCode(block, 'RR_CHANNEL', Blockly.Python.ORDER_ATOMIC) || '3';

  Blockly.Python.definitions_['import_servo_car'] = 'from ils.servo_car import ServoCar';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  Blockly.Python.definitions_['ils_car_init'] = 'ils_car = ServoCar(config=ServoCar.CONFIG_4_WHEEL, mode=ServoCar.MODE_PCA9685, sda_pin=' + sda_pin + ', scl_pin=' + scl_pin + ', address=' + address + ')';
  
  var code = 'ils_car.set_servo_channels(' + fl + ', ' + fr + ', ' + rl + ', ' + rr + ')\n';
  return code;
};

// PCA9685 mode - 2 wheel
Blockly.Python['ils_car_set_channels_2wheel'] = function(block) {
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA_PIN', Blockly.Python.ORDER_ATOMIC) || '21';
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL_PIN', Blockly.Python.ORDER_ATOMIC) || '22';
  var address = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC) || '0x40';
  var left = Blockly.Python.valueToCode(block, 'LEFT_CHANNEL', Blockly.Python.ORDER_ATOMIC) || '0';
  var right = Blockly.Python.valueToCode(block, 'RIGHT_CHANNEL', Blockly.Python.ORDER_ATOMIC) || '1';

  Blockly.Python.definitions_['import_servo_car'] = 'from ils.servo_car import ServoCar';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  Blockly.Python.definitions_['ils_car_init'] = 'ils_car = ServoCar(config=ServoCar.CONFIG_2_WHEEL, mode=ServoCar.MODE_PCA9685, sda_pin=' + sda_pin + ', scl_pin=' + scl_pin + ', address=' + address + ')';
  
  var code = 'ils_car.set_servo_channels(' + left + ', ' + right + ')\n';
  return code;
};

// Basic Movement Generators

Blockly.Python['ils_car_forward'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.move_forward(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_car_backward'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.move_backward(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_car_turn_left'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.turn_left(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_car_turn_right'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.turn_right(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_car_stop'] = function(block) {
  var code = 'ils_car.stop()\n';
  return code;
};

// Advanced Movement Generators

Blockly.Python['ils_car_curve_left'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var turn_ratio = Blockly.Python.valueToCode(block, 'TURN_RATIO', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.curve_left(' + speed + ', ' + turn_ratio + ')\n';
  return code;
};

Blockly.Python['ils_car_curve_right'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var turn_ratio = Blockly.Python.valueToCode(block, 'TURN_RATIO', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.curve_right(' + speed + ', ' + turn_ratio + ')\n';
  return code;
};

Blockly.Python['ils_car_drift_left'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.drift_left(' + speed + ')\n';
  return code;
};

Blockly.Python['ils_car_drift_right'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  var code = 'ils_car.drift_right(' + speed + ')\n';
  return code;
};

// Individual Wheel Control Generators

Blockly.Python['ils_car_wheel_speed_4wheel'] = function(block) {
  var wheel = block.getFieldValue('WHEEL');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'ils_car.set_wheel_speed(' + wheel + ', ' + speed + ')\n';
  return code;
};

Blockly.Python['ils_car_wheel_speed_2wheel'] = function(block) {
  var wheel = block.getFieldValue('WHEEL');
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'ils_car.set_wheel_speed(' + wheel + ', ' + speed + ')\n';
  return code;
};

// Configuration Generator

Blockly.Python['ils_car_set_servo_range'] = function(block) {
  var min_us = Blockly.Python.valueToCode(block, 'MIN_US', Blockly.Python.ORDER_ATOMIC) || '500';
  var max_us = Blockly.Python.valueToCode(block, 'MAX_US', Blockly.Python.ORDER_ATOMIC) || '2500';
  var code = 'ils_car.set_servo_range(' + min_us + ', ' + max_us + ')\n';
  return code;
};