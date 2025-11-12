// DS1820 Temperature Sensor Code Generators

Blockly.Python['ds1820_init'] = function(block) {
  var data_pin = Blockly.Python.valueToCode(block, 'DATA_PIN', Blockly.Python.ORDER_ATOMIC) || '4';
  
  // Add necessary imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_onewire'] = 'import onewire';
  Blockly.Python.definitions_['import_ds18x20'] = 'import ds18x20';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  // Initialize OneWire and DS18X20
  Blockly.Python.definitions_['ds1820_onewire'] = 'ds_pin = Pin(' + data_pin + ')';
  Blockly.Python.definitions_['ds1820_ow'] = 'ds_ow = onewire.OneWire(ds_pin)';
  Blockly.Python.definitions_['ds1820_sensor'] = 'ds_sensor = ds18x20.DS18X20(ds_ow)';
  Blockly.Python.definitions_['ds1820_roms'] = 'ds_roms = []';
  
  var code = '# Scan for DS1820 sensors\n';
  code += 'ds_roms = ds_sensor.scan()\n';
  code += 'print("Found", len(ds_roms), "DS1820 sensor(s)")\n';
  
  return code;
};

Blockly.Python['ds1820_unit_dropdown'] = function(block) {
  var unit = block.getFieldValue('UNIT');
  var code = '"' + unit + '"';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ds1820_read_temp'] = function(block) {
  var unit = Blockly.Python.valueToCode(block, 'UNIT', Blockly.Python.ORDER_ATOMIC) || '"C"';
  
  // Add helper function for unit conversion
  Blockly.Python.definitions_['ds1820_convert_unit'] = 
    'def ds_convert_unit(temp_c, unit):\n' +
    '    if unit == "F":\n' +
    '        return temp_c * 9/5 + 32\n' +
    '    elif unit == "K":\n' +
    '        return temp_c + 273.15\n' +
    '    else:\n' +
    '        return temp_c\n';
  
  var code = 'ds_convert_unit(ds_sensor.read_temp(ds_roms[0]), ' + unit + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ds1820_convert_temp'] = function(block) {
  var code = 'ds_sensor.convert_temp()\n';
  code += 'time.sleep_ms(750)  # Wait for conversion\n';
  return code;
};

Blockly.Python['ds1820_scan_devices'] = function(block) {
  var code = 'ds_roms = ds_sensor.scan()\n';
  code += 'print("Found", len(ds_roms), "sensor(s)")\n';
  return code;
};

Blockly.Python['ds1820_count_devices'] = function(block) {
  var code = 'len(ds_roms)';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ds1820_read_temp_by_index'] = function(block) {
  var index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ATOMIC) || '0';
  var unit = Blockly.Python.valueToCode(block, 'UNIT', Blockly.Python.ORDER_ATOMIC) || '"C"';
  
  // Add helper function for unit conversion (if not already added)
  Blockly.Python.definitions_['ds1820_convert_unit'] = 
    'def ds_convert_unit(temp_c, unit):\n' +
    '    if unit == "F":\n' +
    '        return temp_c * 9/5 + 32\n' +
    '    elif unit == "K":\n' +
    '        return temp_c + 273.15\n' +
    '    else:\n' +
    '        return temp_c\n';
  
  var code = 'ds_convert_unit(ds_sensor.read_temp(ds_roms[' + index + ']), ' + unit + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ds1820_get_rom'] = function(block) {
  var index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ATOMIC) || '0';
  
  // Add helper function to convert ROM to hex string
  Blockly.Python.definitions_['ds1820_rom_to_hex'] = 
    'def ds_rom_to_hex(rom):\n' +
    '    return "".join("{:02x}".format(b) for b in rom)\n';
  
  var code = 'ds_rom_to_hex(ds_roms[' + index + '])';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};