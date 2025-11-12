// MAX30100 Pulse Oximeter Code Generators

Blockly.Python['max30100_init'] = function(block) {
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL_PIN', Blockly.Python.ORDER_ATOMIC) || '22';
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA_PIN', Blockly.Python.ORDER_ATOMIC) || '21';
  
  // Add necessary imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, I2C';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_max30100'] = 'from ils.max30100 import MAX30100';
  
  // Heart rate calculation variables
  Blockly.Python.definitions_['max30100_hr_vars'] = 
    'max_last_beat_time = 0\n' +
    'max_beat_count = 0\n' +
    'max_heart_rate = 0\n' +
    'max_last_values = []\n' +
    'max_threshold = 50000  # Threshold for peak detection';
  
  // Heart rate calculation function
  Blockly.Python.definitions_['max30100_calculate_hr'] = 
    'def max_calculate_heart_rate(red_value):\n' +
    '    global max_last_beat_time, max_beat_count, max_heart_rate, max_last_values\n' +
    '    max_last_values.append(red_value)\n' +
    '    if len(max_last_values) > 10:\n' +
    '        max_last_values.pop(0)\n' +
    '    \n' +
    '    if len(max_last_values) >= 3:\n' +
    '        # Simple peak detection\n' +
    '        if (max_last_values[-2] > max_last_values[-1] and \n' +
    '            max_last_values[-2] > max_last_values[-3] and\n' +
    '            max_last_values[-2] > max_threshold):\n' +
    '            \n' +
    '            current_time = time.ticks_ms()\n' +
    '            if max_last_beat_time > 0:\n' +
    '                beat_interval = time.ticks_diff(current_time, max_last_beat_time)\n' +
    '                if 300 < beat_interval < 2000:  # Valid heart rate range (30-200 BPM)\n' +
    '                    max_heart_rate = int(60000 / beat_interval)\n' +
    '            \n' +
    '            max_last_beat_time = current_time\n' +
    '    \n' +
    '    return max_heart_rate\n';
  
  // SpO2 calculation function (simplified)
  Blockly.Python.definitions_['max30100_calculate_spo2'] = 
    'def max_calculate_spo2(red_value, ir_value):\n' +
    '    if ir_value == 0:\n' +
    '        return 0\n' +
    '    # Simplified SpO2 calculation (ratio of ratios method)\n' +
    '    ratio = (red_value / ir_value) * 100\n' +
    '    # Basic linear approximation\n' +
    '    spo2 = 110 - (ratio * 0.25)\n' +
    '    # Clamp to valid range\n' +
    '    if spo2 > 100:\n' +
    '        spo2 = 100\n' +
    '    elif spo2 < 0:\n' +
    '        spo2 = 0\n' +
    '    return int(spo2)\n';
  
  // Initialize I2C and MAX30100
  Blockly.Python.definitions_['max30100_i2c'] = 'max_i2c = I2C(0, scl=Pin(' + scl_pin + '), sda=Pin(' + sda_pin + '), freq=400000)';
  Blockly.Python.definitions_['max30100_sensor'] = 'max_sensor = MAX30100(i2c=max_i2c)';
  
  var code = 'print("MAX30100 heart sensor initialized")\n';
  code += 'time.sleep_ms(100)\n';
  return code;
};

Blockly.Python['max30100_read_sensor'] = function(block) {
  var code = 'max_sensor.read_sensor()\n';
  return code;
};

Blockly.Python['max30100_get_red'] = function(block) {
  var code = '(max_sensor.red if max_sensor.red is not None else 0)';
  return [code, Blockly.Python.ORDER_CONDITIONAL];
};

Blockly.Python['max30100_get_ir'] = function(block) {
  var code = '(max_sensor.ir if max_sensor.ir is not None else 0)';
  return [code, Blockly.Python.ORDER_CONDITIONAL];
};

Blockly.Python['max30100_heart_rate'] = function(block) {
  var code = 'max_calculate_heart_rate(max_sensor.red if max_sensor.red else 0)';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['max30100_spo2'] = function(block) {
  var code = 'max_calculate_spo2(max_sensor.red if max_sensor.red else 0, max_sensor.ir if max_sensor.ir else 0)';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['max30100_temperature'] = function(block) {
  var code = 'max_sensor.get_temperature()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['max30100_set_mode'] = function(block) {
  var mode = block.getFieldValue('MODE');
  
  if (mode === 'SPO2') {
    var code = 'max_sensor.enable_spo2()\n';
  } else {
    var code = 'max_sensor.disable_spo2()\n';
  }
  return code;
};

Blockly.Python['max30100_set_led_current'] = function(block) {
  var red_current = Blockly.Python.valueToCode(block, 'RED_CURRENT', Blockly.Python.ORDER_ATOMIC) || '11';
  var ir_current = Blockly.Python.valueToCode(block, 'IR_CURRENT', Blockly.Python.ORDER_ATOMIC) || '11';
  
  var code = 'max_sensor.set_led_current(' + red_current + ', ' + ir_current + ')\n';
  return code;
};