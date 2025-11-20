// MAX7219 Python Code Generators for Blockly

Blockly.Python['max7219_pinout'] = function(block) {
	return '';
}

Blockly.Python['max7219_init'] = function(block) {
  var clk_pin = Blockly.Python.valueToCode(block, 'CLK_PIN', Blockly.Python.ORDER_ATOMIC) || '14';
  var dio_pin = Blockly.Python.valueToCode(block, 'DIO_PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var cs_pin = Blockly.Python.valueToCode(block, 'CS_PIN', Blockly.Python.ORDER_ATOMIC) || '12';
  var count = Blockly.Python.valueToCode(block, 'COUNT', Blockly.Python.ORDER_ATOMIC) || '1';
  
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, SPI';
  Blockly.Python.definitions_['import_max7219'] = 'from ils.max7219 import Matrix8x8';
  
  Blockly.Python.definitions_['max7219_spi'] = 'matrix_spi = SPI(1, baudrate=10000000, polarity=0, phase=0, sck=Pin(' + clk_pin + '), mosi=Pin(' + dio_pin + '))';
  Blockly.Python.definitions_['max7219_cs'] = 'matrix_cs = Pin(' + cs_pin + ', Pin.OUT)';
  Blockly.Python.definitions_['max7219_display'] = 'matrix_display = Matrix8x8(matrix_spi, matrix_cs, ' + count + ')';
  
  var code = '';
  return code;
};

Blockly.Python['max7219_brightness'] = function(block) {
  var brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '7';
  var code = 'matrix_display.brightness(' + brightness + ')\n';
  return code;
};

Blockly.Python['max7219_show'] = function(block) {
  var code = 'matrix_display.show()\n';
  return code;
};

Blockly.Python['max7219_clear'] = function(block) {
  var code = 'matrix_display.zero()\n';
  return code;
};

Blockly.Python['max7219_wake'] = function(block) {
  var code = 'matrix_display.wake()\n';
  return code;
};

Blockly.Python['max7219_shutdown'] = function(block) {
  var code = 'matrix_display.shutdown()\n';
  return code;
};

Blockly.Python['max7219_text'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'matrix_display.text(' + text + ', ' + x + ', ' + y + ')\n';
  return code;
};

Blockly.Python['max7219_scroll_text'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  var delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var code = 'matrix_display.scroll_text(' + text + ', ' + delay + ')\n';
  return code;
};

Blockly.Python['max7219_number'] = function(block) {
  var number = Blockly.Python.valueToCode(block, 'NUMBER', Blockly.Python.ORDER_ATOMIC) || '0';
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'matrix_display.number(' + number + ', ' + x + ', ' + y + ')\n';
  return code;
};

Blockly.Python['max7219_pixel'] = function(block) {
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
  var state = block.getFieldValue('STATE');
  var state_value = state === 'TRUE' ? '1' : '0';
  
  var code = 'matrix_display.pixel(' + x + ', ' + y + ', ' + state_value + ')\n';
  return code;
};

Blockly.Python['max7219_fill'] = function(block) {
  var state = block.getFieldValue('STATE');
  var state_value = state === 'TRUE' ? '1' : '0';
  
  var code = 'matrix_display.fill(' + state_value + ')\n';
  return code;
};

Blockly.Python['max7219_custom_pattern'] = function(block) {
  var pattern = [];
  
  for (var row = 0; row < 8; row++) {
    var rowName = String.fromCharCode(65 + row);
    var rowData = [];
    
    for (var col = 0; col < 8; col++) {
      var checked = block.getFieldValue(rowName + col) === 'TRUE';
      rowData.push(checked ? '1' : '0');
    }
    pattern.push('[' + rowData.join(',') + ']');
  }
  
  var code = 'matrix_pattern = [' + pattern.join(',') + ']\n';
  code += 'for y in range(8):\n';
  code += '    for x in range(8):\n';
  code += '        matrix_display.pixel(x, y, matrix_pattern[y][x])\n';
  
  return code;
};