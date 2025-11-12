// DHT11/DHT22 Humidity and Temperature Sensor Code Generators

Blockly.Python['dht_init'] = function(block) {
  var sensor_type = block.getFieldValue('SENSOR_TYPE');
  var data_pin = Blockly.Python.valueToCode(block, 'DATA_PIN', Blockly.Python.ORDER_ATOMIC) || '15';
  
  // Add necessary imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_dht'] = 'import dht';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  // Store last readings as global variables
  Blockly.Python.definitions_['dht_last_temp'] = 'dht_last_temp = 0';
  Blockly.Python.definitions_['dht_last_humidity'] = 'dht_last_humidity = 0';
  
  // Initialize the sensor
  if (sensor_type === 'DHT11') {
    Blockly.Python.definitions_['dht_sensor'] = 'dht_sensor = dht.DHT11(Pin(' + data_pin + '))';
  } else {
    Blockly.Python.definitions_['dht_sensor'] = 'dht_sensor = dht.DHT22(Pin(' + data_pin + '))';
  }
  
  var code = 'print("DHT sensor initialized on pin ' + data_pin + '")\n';
  return code;
};

Blockly.Python['dht_temp_unit_dropdown'] = function(block) {
  var unit = block.getFieldValue('UNIT');
  var code = '"' + unit + '"';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dht_read_all'] = function(block) {
  var code = 'dht_sensor.measure()\n';
  code += 'dht_last_temp = dht_sensor.temperature()\n';
  code += 'dht_last_humidity = dht_sensor.humidity()\n';
  return code;
};

Blockly.Python['dht_read_temperature'] = function(block) {
  var unit = Blockly.Python.valueToCode(block, 'UNIT', Blockly.Python.ORDER_ATOMIC) || '"C"';
  
  // Add helper function for unit conversion
  Blockly.Python.definitions_['dht_convert_temp'] = 
    'def dht_convert_temp(temp_c, unit):\n' +
    '    if unit == "F":\n' +
    '        return temp_c * 9/5 + 32\n' +
    '    else:\n' +
    '        return temp_c\n';
  
  var code = 'dht_convert_temp(dht_last_temp, ' + unit + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['dht_read_humidity'] = function(block) {
  var code = 'dht_last_humidity';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dht_heat_index'] = function(block) {
  var unit = Blockly.Python.valueToCode(block, 'UNIT', Blockly.Python.ORDER_ATOMIC) || '"C"';
  
  // Add heat index calculation function
  Blockly.Python.definitions_['dht_heat_index'] = 
    'def dht_heat_index(temp_c, humidity, unit="C"):\n' +
    '    # Convert to Fahrenheit for calculation\n' +
    '    temp_f = temp_c * 9/5 + 32\n' +
    '    h = humidity\n' +
    '    \n' +
    '    # Steadman formula for heat index\n' +
    '    hi = 0.5 * (temp_f + 61.0 + ((temp_f - 68.0) * 1.2) + (h * 0.094))\n' +
    '    \n' +
    '    # If temperature is high, use more complex formula\n' +
    '    if hi > 79:\n' +
    '        hi = -42.379 + 2.04901523 * temp_f + 10.14333127 * h\n' +
    '        hi = hi - 0.22475541 * temp_f * h - 0.00683783 * temp_f * temp_f\n' +
    '        hi = hi - 0.05481717 * h * h + 0.00122874 * temp_f * temp_f * h\n' +
    '        hi = hi + 0.00085282 * temp_f * h * h - 0.00000199 * temp_f * temp_f * h * h\n' +
    '    \n' +
    '    # Convert result based on desired unit\n' +
    '    if unit == "C":\n' +
    '        return (hi - 32) * 5/9\n' +
    '    else:\n' +
    '        return hi\n';
  
  var code = 'dht_heat_index(dht_last_temp, dht_last_humidity, ' + unit + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['dht_dew_point'] = function(block) {
  var unit = Blockly.Python.valueToCode(block, 'UNIT', Blockly.Python.ORDER_ATOMIC) || '"C"';
  
  // Add dew point calculation function
  Blockly.Python.definitions_['import_math'] = 'import math';
  Blockly.Python.definitions_['dht_dew_point'] = 
    'def dht_dew_point(temp_c, humidity, unit="C"):\n' +
    '    # Magnus formula for dew point\n' +
    '    a = 17.27\n' +
    '    b = 237.7\n' +
    '    \n' +
    '    alpha = ((a * temp_c) / (b + temp_c)) + math.log(humidity / 100.0)\n' +
    '    dew_c = (b * alpha) / (a - alpha)\n' +
    '    \n' +
    '    if unit == "F":\n' +
    '        return dew_c * 9/5 + 32\n' +
    '    else:\n' +
    '        return dew_c\n';
  
  var code = 'dht_dew_point(dht_last_temp, dht_last_humidity, ' + unit + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};