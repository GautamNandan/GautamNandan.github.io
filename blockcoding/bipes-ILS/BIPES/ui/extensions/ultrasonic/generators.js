// Ultrasonic Sensor Code Generators
Blockly.Python['ultrasonic_pinout'] = function(block) {
	return '';
}

Blockly.Python['ultrasonic_init_simple'] = function(block) {
  var trig_pin = Blockly.Python.valueToCode(block, 'TRIG_PIN', Blockly.Python.ORDER_ATOMIC) || '5';
  var echo_pin = Blockly.Python.valueToCode(block, 'ECHO_PIN', Blockly.Python.ORDER_ATOMIC) || '18';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ultrasonic'] = 'from ils import ultrasonic';
  
  Blockly.Python.definitions_['ultrasonic_obj'] = 'us = ultrasonic.Ultrasonic(' + trig_pin + ', ' + echo_pin + ')';
  
  var code = '';
  return code;
};

Blockly.Python['ultrasonic_init_rgb'] = function(block) {
  var trig_pin = Blockly.Python.valueToCode(block, 'TRIG_PIN', Blockly.Python.ORDER_ATOMIC) || '5';
  var echo_pin = Blockly.Python.valueToCode(block, 'ECHO_PIN', Blockly.Python.ORDER_ATOMIC) || '18';
  var rgb_pin = Blockly.Python.valueToCode(block, 'RGB_PIN', Blockly.Python.ORDER_ATOMIC) || '23';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ultrasonic'] = 'from ils import ultrasonic';
  Blockly.Python.definitions_['import_neopixel'] = 'from neopixel import NeoPixel';
  
  Blockly.Python.definitions_['ultrasonic_obj'] = 'us = ultrasonic.UltrasonicRGB(' + trig_pin + ', ' + echo_pin + ', ' + rgb_pin + ')';
  
  var code = '';
  return code;
};

Blockly.Python['ultrasonic_get_distance_cm'] = function(block) {
  var code = 'us.distance_cm()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ultrasonic_get_distance_inch'] = function(block) {
  var code = 'us.distance_inch()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ultrasonic_get_distance_mm'] = function(block) {
  var code = 'us.distance_mm()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ultrasonic_is_within_range'] = function(block) {
  var min_distance = Blockly.Python.valueToCode(block, 'MIN_DISTANCE', Blockly.Python.ORDER_ATOMIC) || '0';
  var max_distance = Blockly.Python.valueToCode(block, 'MAX_DISTANCE', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var code = 'us.is_within_range(' + min_distance + ', ' + max_distance + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ultrasonic_is_closer_than'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC) || '20';
  
  var code = 'us.is_closer_than(' + distance + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ultrasonic_is_farther_than'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var code = 'us.is_farther_than(' + distance + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ultrasonic_rgb_set_color'] = function(block) {
  var red = Blockly.Python.valueToCode(block, 'RED', Blockly.Python.ORDER_ATOMIC) || '255';
  var green = Blockly.Python.valueToCode(block, 'GREEN', Blockly.Python.ORDER_ATOMIC) || '0';
  var blue = Blockly.Python.valueToCode(block, 'BLUE', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'us.set_color(' + red + ', ' + green + ', ' + blue + ')\n';
  return code;
};

Blockly.Python['ultrasonic_rgb_set_preset'] = function(block) {
  var color = block.getFieldValue('COLOR');
  
  var code = 'us.set_preset("' + color + '")\n';
  return code;
};

Blockly.Python['ultrasonic_rgb_off'] = function(block) {
  var code = 'us.rgb_off()\n';
  return code;
};

Blockly.Python['ultrasonic_rgb_rainbow'] = function(block) {
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var code = 'us.rainbow(' + speed + ')\n';
  return code;
};

Blockly.Python['ultrasonic_set_timeout'] = function(block) {
  var timeout = Blockly.Python.valueToCode(block, 'TIMEOUT', Blockly.Python.ORDER_ATOMIC) || '30000';
  
  var code = 'us.set_timeout(' + timeout + ')\n';
  return code;
};

Blockly.Python['ultrasonic_get_raw_time'] = function(block) {
  var code = 'us.get_raw_time()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};