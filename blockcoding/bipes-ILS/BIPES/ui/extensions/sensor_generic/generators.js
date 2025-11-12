// ========== DIGITAL SENSOR GENERATORS ==========

Blockly.Python['digital_sensor_init'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '15';
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  
  // Create pin instance
  var pin_var = 'digital_sensor_pin_' + sensor_id;
  Blockly.Python.definitions_['digital_sensor_' + sensor_id] = 
    pin_var + ' = Pin(' + pin + ', Pin.IN)';
  
  var code = '# Digital sensor ' + sensor_id + ' initialized\n';
  return code;
};

Blockly.Python['digital_sensor_read'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var pin_var = 'digital_sensor_pin_' + sensor_id;
  
  var code = pin_var + '.value()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['digital_sensor_is_active'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var pin_var = 'digital_sensor_pin_' + sensor_id;
  
  var code = pin_var + '.value() == 1';
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

// ========== ANALOG SENSOR GENERATORS ==========

Blockly.Python['analog_sensor_init'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '34';
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_adc'] = 'from machine import ADC';
  
  // Create ADC instance
  var adc_var = 'analog_sensor_adc_' + sensor_id;
  Blockly.Python.definitions_['analog_sensor_' + sensor_id] = 
    adc_var + ' = ADC(Pin(' + pin + '))';
  Blockly.Python.definitions_['analog_sensor_atten_' + sensor_id] = 
    adc_var + '.atten(ADC.ATTN_11DB)';
  
  var code = '# Analog sensor ' + sensor_id + ' initialized\n';
  return code;
};

Blockly.Python['analog_sensor_read'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var adc_var = 'analog_sensor_adc_' + sensor_id;
  
  var code = adc_var + '.read()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['analog_sensor_read_percent'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var adc_var = 'analog_sensor_adc_' + sensor_id;
  
  var code = 'int(' + adc_var + '.read() * 100 / 4095)';
  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python['analog_sensor_threshold'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_ATOMIC) || '2000';
  var adc_var = 'analog_sensor_adc_' + sensor_id;
  
  var code = adc_var + '.read() > ' + threshold;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

// ========== DUAL SENSOR GENERATORS ==========

Blockly.Python['dual_sensor_init'] = function(block) {
  var digital_pin = Blockly.Python.valueToCode(block, 'DIGITAL_PIN', Blockly.Python.ORDER_ATOMIC) || '15';
  var analog_pin = Blockly.Python.valueToCode(block, 'ANALOG_PIN', Blockly.Python.ORDER_ATOMIC) || '34';
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_adc'] = 'from machine import ADC';
  
  // Create digital pin instance
  var digital_var = 'dual_sensor_digital_' + sensor_id;
  Blockly.Python.definitions_['dual_sensor_dig_' + sensor_id] = 
    digital_var + ' = Pin(' + digital_pin + ', Pin.IN)';
  
  // Create analog ADC instance
  var analog_var = 'dual_sensor_analog_' + sensor_id;
  Blockly.Python.definitions_['dual_sensor_adc_' + sensor_id] = 
    analog_var + ' = ADC(Pin(' + analog_pin + '))';
  Blockly.Python.definitions_['dual_sensor_atten_' + sensor_id] = 
    analog_var + '.atten(ADC.ATTN_11DB)';
  
  var code = '# Dual sensor ' + sensor_id + ' initialized\n';
  return code;
};

Blockly.Python['dual_sensor_read_digital'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var digital_var = 'dual_sensor_digital_' + sensor_id;
  
  var code = digital_var + '.value()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['dual_sensor_read_analog'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var analog_var = 'dual_sensor_analog_' + sensor_id;
  
  var code = analog_var + '.read()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['dual_sensor_is_detected'] = function(block) {
  var sensor_id = Blockly.Python.valueToCode(block, 'SENSOR_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_ATOMIC) || '2000';
  var digital_var = 'dual_sensor_digital_' + sensor_id;
  var analog_var = 'dual_sensor_analog_' + sensor_id;
  
  var code = '(' + digital_var + '.value() == 1 or ' + analog_var + '.read() > ' + threshold + ')';
  return [code, Blockly.Python.ORDER_LOGICAL_OR];
};