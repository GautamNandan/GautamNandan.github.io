// ILS Character LCD Code Generators for MicroPython

// ==================== SETUP ====================
Blockly.Python['char_lcd_pinout'] = function(block) {
	return '';
}
Blockly.Python['char_lcd_init'] = function(block) {
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL', Blockly.Python.ORDER_ATOMIC) || '22';
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA', Blockly.Python.ORDER_ATOMIC) || '21';
  var lines = Blockly.Python.valueToCode(block, 'LINES', Blockly.Python.ORDER_ATOMIC) || '2';
  var columns = Blockly.Python.valueToCode(block, 'COLUMNS', Blockly.Python.ORDER_ATOMIC) || '16';

  // Add imports
  Blockly.Python.definitions_['import_machine_i2c'] = 'from machine import SoftI2C, Pin';
  Blockly.Python.definitions_['import_lcd'] = 'from ils.lcd import I2cLcd';
  
  var code = '';
  code += `i2c_lcd = SoftI2C(scl=Pin(${scl_pin}), sda=Pin(${sda_pin}), freq=400000)\n`;
  code += `lcd = I2cLcd(i2c_lcd, 0x27, ${lines}, ${columns})\n`;
  
  return code;
};

Blockly.Python['char_lcd_connection'] = function(block) {
  var code ='';
  return code;
};

// ==================== DISPLAY CONTROL ====================

Blockly.Python['char_lcd_clear'] = function(block) {
  var code = `lcd.clear()\n`;
  return code;
};

Blockly.Python['char_lcd_display'] = function(block) {
  var state = Blockly.Python.valueToCode(block, 'STATE', Blockly.Python.ORDER_ATOMIC) || '1';

  var code = '';
  code += `if ${state}:\n`;
  code += `    lcd.display_on()\n`;
  code += `else:\n`;
  code += `    lcd.display_off()\n`;
  
  return code;
};

Blockly.Python['char_lcd_backlight'] = function(block) {
  var state = Blockly.Python.valueToCode(block, 'STATE', Blockly.Python.ORDER_ATOMIC) || '1';

  var code = '';
  code += `if ${state}:\n`;
  code += `    lcd.backlight_on()\n`;
  code += `else:\n`;
  code += `    lcd.backlight_off()\n`;
  
  return code;
};

// ==================== TEXT DISPLAY ====================

Blockly.Python['char_lcd_putstr'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';

  var code = `lcd.putstr(${text})\n`;
  
  return code;
};

Blockly.Python['char_lcd_moveto'] = function(block) {
  var row = Blockly.Python.valueToCode(block, 'ROW', Blockly.Python.ORDER_ATOMIC) || '0';
  var column = Blockly.Python.valueToCode(block, 'COLUMN', Blockly.Python.ORDER_ATOMIC) || '0';

  var code = `lcd.move_to(${column}, ${row})\n`;
  
  return code;
};

// ==================== CURSOR CONTROL ====================

Blockly.Python['char_lcd_show_cursor'] = function(block) {
  var code = `lcd.show_cursor()\n`;
  return code;
};

Blockly.Python['char_lcd_hide_cursor'] = function(block) {
  var code = `lcd.hide_cursor()\n`;
  return code;
};

// ==================== SCROLLING ====================

Blockly.Python['char_lcd_scroll_left'] = function(block) {
  var code = `lcd.display_left()\n`;
  return code;
};

Blockly.Python['char_lcd_scroll_right'] = function(block) {
  var code = `lcd.display_right()\n`;
  return code;
};