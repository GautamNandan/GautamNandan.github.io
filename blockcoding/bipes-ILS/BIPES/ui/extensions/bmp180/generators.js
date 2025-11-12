Blockly.Python['bmp180_init'] = function(block) {
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA_PIN', Blockly.Python.ORDER_ATOMIC) || '21';
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL_PIN', Blockly.Python.ORDER_ATOMIC) || '22';
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_softi2c'] = 'from machine import SoftI2C';
  Blockly.Python.definitions_['import_bmp180'] = 'from ils.bmp180 import BMP180';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  // Create I2C bus and sensor instance
  var i2c_var = 'bmp180_i2c_' + sensor_id;
  var sensor_var = 'bmp180_sensor_' + sensor_id;
  
  Blockly.Python.definitions_['bmp180_i2c_' + sensor_id] = 
    i2c_var + ' = SoftI2C(scl=Pin(' + scl_pin + '), sda=Pin(' + sda_pin + '), freq=400000)';
  Blockly.Python.definitions_['bmp180_sensor_' + sensor_id] = 
    sensor_var + ' = BMP180(' + i2c_var + ')';
  
  var code = '# BMP180 sensor ' + sensor_id + ' initialized\n';
  return code;
};

Blockly.Python['bmp180_read_temperature'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var sensor_var = 'bmp180_sensor_' + sensor_id;
  
  var code = sensor_var + '.temperature';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['bmp180_read_pressure'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var sensor_var = 'bmp180_sensor_' + sensor_id;
  
  var code = sensor_var + '.pressure';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['bmp180_read_altitude'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var sensor_var = 'bmp180_sensor_' + sensor_id;
  
  var code = sensor_var + '.altitude';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['bmp180_set_accuracy'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var accuracy = block.getFieldValue('ACCURACY');
  var sensor_var = 'bmp180_sensor_' + sensor_id;
  
  var code = sensor_var + '.oversample_sett = ' + accuracy + '\n';
  return code;
};

Blockly.Python['bmp180_set_baseline'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var baseline = Blockly.Python.valueToCode(block, 'BASELINE', Blockly.Python.ORDER_ATOMIC) || '101325.0';
  var sensor_var = 'bmp180_sensor_' + sensor_id;
  
  var code = sensor_var + '.baseline = ' + baseline + '\n';
  return code;
};