// PWM LED Initialization
Blockly.Python['pwm_led_init'] = function(block) {
  var led_pin = Blockly.Python.valueToCode(block, 'LED_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var led_id = block.getFieldValue('LED_ID');

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_pwm'] = 'from machine import PWM';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ils_led'] = 'from ils import led_control';
  
  if (!Blockly.Python.definitions_['pwm_leds_dict']) {
    Blockly.Python.definitions_['pwm_leds_dict'] = 'pwm_leds = {}';
  }
  
  var code = 'pwm_leds[' + led_id + '] = led_control.PWMLed(' + led_pin + ')\n';
  return code;
};

// RGB LED Initialization
Blockly.Python['rgb_led_init'] = function(block) {
  var red_pin = Blockly.Python.valueToCode(block, 'RED_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var green_pin = Blockly.Python.valueToCode(block, 'GREEN_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var blue_pin = Blockly.Python.valueToCode(block, 'BLUE_PIN', Blockly.Python.ORDER_ATOMIC) || '27';
  var led_type = block.getFieldValue('LED_TYPE');
  var rgb_id = block.getFieldValue('RGB_ID');

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_pwm'] = 'from machine import PWM';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ils_led'] = 'from ils import led_control';
  
  if (!Blockly.Python.definitions_['rgb_leds_dict']) {
    Blockly.Python.definitions_['rgb_leds_dict'] = 'rgb_leds = {}';
  }
  
  var is_common_anode = led_type === 'ANODE' ? 'True' : 'False';
  var code = 'rgb_leds[' + rgb_id + '] = led_control.RGBLed(' + red_pin + ', ' + green_pin + ', ' + blue_pin + ', common_anode=' + is_common_anode + ')\n';
  return code;
};

// Three LED Initialization
Blockly.Python['three_led_init'] = function(block) {
  var red_pin = Blockly.Python.valueToCode(block, 'RED_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var green_pin = Blockly.Python.valueToCode(block, 'GREEN_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var yellow_pin = Blockly.Python.valueToCode(block, 'YELLOW_PIN', Blockly.Python.ORDER_ATOMIC) || '27';
  var led_id = block.getFieldValue('LED_ID');

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ils_led'] = 'from ils import led_control';
  
  if (!Blockly.Python.definitions_['three_leds_dict']) {
    Blockly.Python.definitions_['three_leds_dict'] = 'three_leds = {}';
  }
  
  var code = 'three_leds[' + led_id + '] = led_control.ThreeLed(' + red_pin + ', ' + green_pin + ', ' + yellow_pin + ')\n';
  return code;
};

// PWM LED Set Brightness
Blockly.Python['pwm_led_set_brightness'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var code = 'pwm_leds[' + led_id + '].set_brightness(' + brightness + ')\n';
  return code;
};

// PWM LED Fade
Blockly.Python['pwm_led_fade'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var from_brightness = Blockly.Python.valueToCode(block, 'FROM_BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '0';
  var to_brightness = Blockly.Python.valueToCode(block, 'TO_BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '100';
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || '1000';
  
  var code = 'pwm_leds[' + led_id + '].fade(' + from_brightness + ', ' + to_brightness + ', ' + duration + ')\n';
  return code;
};

// PWM LED Off
Blockly.Python['pwm_led_off'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var code = 'pwm_leds[' + led_id + '].off()\n';
  return code;
};

// RGB LED Set Color
Blockly.Python['rgb_led_set_color'] = function(block) {
  var rgb_id = Blockly.Python.valueToCode(block, 'RGB_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var red = Blockly.Python.valueToCode(block, 'RED', Blockly.Python.ORDER_ATOMIC) || '0';
  var green = Blockly.Python.valueToCode(block, 'GREEN', Blockly.Python.ORDER_ATOMIC) || '0';
  var blue = Blockly.Python.valueToCode(block, 'BLUE', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'rgb_leds[' + rgb_id + '].set_color(' + red + ', ' + green + ', ' + blue + ')\n';
  return code;
};

// RGB LED Preset Color
Blockly.Python['rgb_led_preset_color'] = function(block) {
  var rgb_id = Blockly.Python.valueToCode(block, 'RGB_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var color = block.getFieldValue('COLOR');
  
  var colorMap = {
    'RED': '(100, 0, 0)',
    'GREEN': '(0, 100, 0)',
    'BLUE': '(0, 0, 100)',
    'YELLOW': '(100, 100, 0)',
    'CYAN': '(0, 100, 100)',
    'MAGENTA': '(100, 0, 100)',
    'WHITE': '(100, 100, 100)',
    'ORANGE': '(100, 50, 0)',
    'PURPLE': '(50, 0, 100)',
    'PINK': '(100, 50, 75)'
  };
  
  var colorValues = colorMap[color] || '(0, 0, 0)';
  var code = 'rgb_leds[' + rgb_id + '].set_color' + colorValues + '\n';
  return code;
};

// RGB LED Fade Color
Blockly.Python['rgb_led_fade_color'] = function(block) {
  var rgb_id = Blockly.Python.valueToCode(block, 'RGB_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var effect = block.getFieldValue('EFFECT');
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || '2000';
  
  var code = 'rgb_leds[' + rgb_id + '].fade_effect("' + effect + '", ' + duration + ')\n';
  return code;
};

// RGB LED Off
Blockly.Python['rgb_led_off'] = function(block) {
  var rgb_id = Blockly.Python.valueToCode(block, 'RGB_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var code = 'rgb_leds[' + rgb_id + '].off()\n';
  return code;
};

// Three LED Traffic Light
Blockly.Python['three_led_traffic_light'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || '1000';
  
  var code = 'three_leds[' + led_id + '].traffic_light(' + duration + ')\n';
  return code;
};

// Three LED Chase
Blockly.Python['three_led_chase'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '200';
  var direction = block.getFieldValue('DIRECTION');
  
  var code = 'three_leds[' + led_id + '].chase("' + direction + '", ' + speed + ')\n';
  return code;
};

// Three LED Blink All
Blockly.Python['three_led_blink_all'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var count = Blockly.Python.valueToCode(block, 'COUNT', Blockly.Python.ORDER_ATOMIC) || '3';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '500';
  
  var code = 'three_leds[' + led_id + '].blink_all(' + count + ', ' + speed + ')\n';
  return code;
};

// Three LED Individual Control
Blockly.Python['three_led_control'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var red_state = block.getFieldValue('RED_STATE');
  var green_state = block.getFieldValue('GREEN_STATE');
  var yellow_state = block.getFieldValue('YELLOW_STATE');
  
  var code = 'three_leds[' + led_id + '].set_leds(' + red_state + ', ' + green_state + ', ' + yellow_state + ')\n';
  return code;
};

// Three LED All Off
Blockly.Python['three_led_all_off'] = function(block) {
  var led_id = Blockly.Python.valueToCode(block, 'LED_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var code = 'three_leds[' + led_id + '].all_off()\n';
  return code;
};