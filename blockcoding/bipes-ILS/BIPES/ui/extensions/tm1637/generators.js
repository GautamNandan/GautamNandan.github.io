// TM1637 Python Code Generators for Blockly

Blockly.Python['tm1637_pinout'] = function(block) {
	return '';
}


Blockly.Python['tm1637_init'] = function(block) {
  var clk_pin = Blockly.Python.valueToCode(block, 'CLK_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var dio_pin = Blockly.Python.valueToCode(block, 'DIO_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '5';
  
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_tm1637'] = 'from ils.tm1637 import TM1637';
  
  Blockly.Python.definitions_['tm1637_clk'] = 'tm_clk = Pin(' + clk_pin + ')';
  Blockly.Python.definitions_['tm1637_dio'] = 'tm_dio = Pin(' + dio_pin + ')';
  Blockly.Python.definitions_['tm1637_display'] = 'tm_display = TM1637(tm_clk, tm_dio, brightness=' + brightness + ')';
  
  var code = '';
  return code;
};

Blockly.Python['tm1637_brightness'] = function(block) {
  var brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '5';
  var code = 'tm_display.brightness(' + brightness + ')\n';
  return code;
};

Blockly.Python['tm1637_show_number'] = function(block) {
  var number = Blockly.Python.valueToCode(block, 'NUMBER', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'tm_display.number(' + number + ')\n';
  return code;
};

Blockly.Python['tm1637_show_hex'] = function(block) {
  var hex_value = Blockly.Python.valueToCode(block, 'HEX_VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'tm_display.hex(' + hex_value + ')\n';
  return code;
};

Blockly.Python['tm1637_show_time'] = function(block) {
  var hours = Blockly.Python.valueToCode(block, 'HOURS', Blockly.Python.ORDER_ATOMIC) || '0';
  var minutes = Blockly.Python.valueToCode(block, 'MINUTES', Blockly.Python.ORDER_ATOMIC) || '0';
  var colon = block.getFieldValue('COLON');
  var colon_bool = colon === 'TRUE' ? 'True' : 'False';
  
  var code = 'tm_display.numbers(' + hours + ', ' + minutes + ', colon=' + colon_bool + ')\n';
  return code;
};

Blockly.Python['tm1637_show_text'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  var colon = block.getFieldValue('COLON');
  var colon_bool = colon === 'TRUE' ? 'True' : 'False';
  
  var code = 'tm_display.show(' + text + ', colon=' + colon_bool + ')\n';
  return code;
};

Blockly.Python['tm1637_scroll_text'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  var delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC) || '250';
  
  var code = 'tm_display.scroll(' + text + ', delay=' + delay + ')\n';
  return code;
};

Blockly.Python['tm1637_show_temperature'] = function(block) {
  var temperature = Blockly.Python.valueToCode(block, 'TEMPERATURE', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'tm_display.temperature(' + temperature + ')\n';
  return code;
};

Blockly.Python['tm1637_clear'] = function(block) {
  var code = 'tm_display.show("    ")\n';
  return code;
};