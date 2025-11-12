// GPS (Global Positioning System) Code Generators

Blockly.Python['gps_init'] = function(block) {
  var tx_pin = Blockly.Python.valueToCode(block, 'TX_PIN', Blockly.Python.ORDER_ATOMIC) || '17';
  var rx_pin = Blockly.Python.valueToCode(block, 'RX_PIN', Blockly.Python.ORDER_ATOMIC) || '16';
  
  // Add necessary imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, UART';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_micropygps'] = 'from ils.mini_micropyGPS import MicropyGPS';
  
  // Initialize UART for GPS communication
  Blockly.Python.definitions_['gps_uart'] = 'gps_uart = UART(2, baudrate=9600, tx=Pin(' + tx_pin + '), rx=Pin(' + rx_pin + '))';
  
  // Initialize GPS parser object
  Blockly.Python.definitions_['gps_parser'] = 'gps = MicropyGPS()';
  
  var code = 'print("GPS module initialized")\n';
  return code;
};

Blockly.Python['gps_update'] = function(block) {
  var code = 
    'if gps_uart.any():\n' +
    '    data = gps_uart.read()\n' +
    '    for byte in data:\n' +
    '        try:\n' +
    '            char = chr(byte)\n' +
    '            gps.update(char)\n' +
    '        except:\n' +
    '            pass\n';
  return code;
};

Blockly.Python['gps_has_fix'] = function(block) {
  var code = 'gps.valid';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_latitude'] = function(block) {
  // Helper function to convert to decimal degrees
  var functionCode = 
    'def gps_lat_decimal():\n' +
    '    if gps.valid:\n' +
    '        lat = gps._latitude\n' +
    '        decimal = lat[0] + (lat[1] / 60)\n' +
    '        if lat[2] == "S":\n' +
    '            decimal = -decimal\n' +
    '        return round(decimal, 6)\n' +
    '    return 0.0\n';
  
  Blockly.Python.definitions_['gps_lat_decimal'] = functionCode;
  
  var code = 'gps_lat_decimal()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['gps_longitude'] = function(block) {
  // Helper function to convert to decimal degrees
  var functionCode = 
    'def gps_lon_decimal():\n' +
    '    if gps.valid:\n' +
    '        lon = gps._longitude\n' +
    '        decimal = lon[0] + (lon[1] / 60)\n' +
    '        if lon[2] == "W":\n' +
    '            decimal = -decimal\n' +
    '        return round(decimal, 6)\n' +
    '    return 0.0\n';
  
  Blockly.Python.definitions_['gps_lon_decimal'] = functionCode;
  
  var code = 'gps_lon_decimal()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['gps_latitude_string'] = function(block) {
  var code = 'gps.latitude_string()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['gps_longitude_string'] = function(block) {
  var code = 'gps.longitude_string()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['gps_altitude'] = function(block) {
  var code = 'gps.altitude';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_speed'] = function(block) {
  var unit = block.getFieldValue('UNIT');
  
  var code;
  if (unit === 'mph') {
    code = 'gps.speed[1]';  // mph is index 1
  } else if (unit === 'knot') {
    code = 'gps.speed[0]';  // knots is index 0
  } else {
    code = 'gps.speed[2]';  // km/h is index 2
  }
  
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_course'] = function(block) {
  var code = 'gps.course';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_direction'] = function(block) {
  var code = 'gps.compass_direction()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['gps_time_hour'] = function(block) {
  var code = 'gps.timestamp[0]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_time_minute'] = function(block) {
  var code = 'gps.timestamp[1]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_time_second'] = function(block) {
  var code = 'int(gps.timestamp[2])';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['gps_date_day'] = function(block) {
  var code = 'gps.date[0]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_date_month'] = function(block) {
  var code = 'gps.date[1]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_date_year'] = function(block) {
  var code = 'gps.date[2]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_date_string'] = function(block) {
  var format = block.getFieldValue('FORMAT');
  var code = 'gps.date_string("' + format + '")';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['gps_satellites'] = function(block) {
  var code = 'gps.satellites_in_use';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['gps_hdop'] = function(block) {
  var code = 'gps.hdop';
  return [code, Blockly.Python.ORDER_MEMBER];
};