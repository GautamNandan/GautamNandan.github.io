// ============================================================================
// SECTION A: OLED DISPLAY CODE GENERATORS (IMPROVED)
// ============================================================================

Blockly.Python['oled_init'] = function(block) {
	
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL_PIN', Blockly.Python.ORDER_ATOMIC) || '22';
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA_PIN', Blockly.Python.ORDER_ATOMIC) || '21';
  var display_size = block.getFieldValue('DISPLAY_SIZE');

  Blockly.Python.definitions_['import_uasyncio'] = 'import uasyncio';
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_i2c'] = 'from machine import SoftI2C';
  Blockly.Python.definitions_['import_ssd1306'] = 'from ils.oled import ssd1306';
  Blockly.Python.definitions_['import_time'] = 'import time';  
  
  var dimensions = display_size.split(',');
  var width = dimensions[0];
  var height = dimensions[1];
  
  Blockly.Python.definitions_['oled_i2c'] = 'i2c = SoftI2C(scl=Pin(' + scl_pin + '), sda=Pin(' + sda_pin + '), freq=400000)';
  Blockly.Python.definitions_['oled_display'] = 'display = ssd1306.SSD1306_I2C(' + width + ', ' + height + ', i2c)';
  
  // Add global variables to definitions (at top of file)
  Blockly.Python.definitions_['oled_width'] = 'oled_width = ' + width;
  Blockly.Python.definitions_['oled_height'] = 'oled_height = ' + height;
  var code = 'display.fill(0)\n';
  code += 'display.show()\n';
  return code;
};

Blockly.Python['oled_init_custom'] = function(block) {
  var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC) || '128';
  var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC) || '64';
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL_PIN', Blockly.Python.ORDER_ATOMIC) || '22';
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA_PIN', Blockly.Python.ORDER_ATOMIC) || '21';
  
  Blockly.Python.definitions_['import_uasyncio'] = 'import uasyncio';
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_i2c'] = 'from machine import SoftI2C';
  Blockly.Python.definitions_['import_ssd1306'] = 'from ils.oled import ssd1306';
  Blockly.Python.definitions_['import_time'] = 'import time';  
  
  Blockly.Python.definitions_['oled_i2c'] = 'i2c = SoftI2C(scl=Pin(' + scl_pin + '), sda=Pin(' + sda_pin + '), freq=400000)';
  Blockly.Python.definitions_['oled_display'] = 'display = ssd1306.SSD1306_I2C(' + width + ', ' + height + ', i2c)';
    // Add global variables to definitions (at top of file)
  Blockly.Python.definitions_['oled_width'] = 'oled_width = ' + width;
  Blockly.Python.definitions_['oled_height'] = 'oled_height = ' + height;
  var code = 'display.fill(0)\n';
  code += 'display.show()\n';
  return code;
};


Blockly.Python['oled_clear'] = function(block) {
  var code = 'display.fill(0)\ndisplay.show()\n';
  return code;
};

Blockly.Python['oled_show'] = function(block) {
  var code = 'display.show()\n';
  return code;
};

Blockly.Python['oled_text'] = function(block) {
  var value_text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'display.text(str(' + value_text + '), ' + x + ', ' + y + ')\n';
  code += 'display.show()\n';
  return code;
};

Blockly.Python['oled_pixel'] = function(block) {
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
  var color = block.getFieldValue('COLOR');
  
  var code = 'display.pixel(' + x + ', ' + y + ', ' + color + ')\n';
  code += 'display.show()\n';
  return code;
};

Blockly.Python['oled_line'] = function(block) {
  var x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC) || '0';
  var y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC) || '0';
  var x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC) || '10';
  var y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC) || '10';
  
  Blockly.Python.definitions_['import_gfx'] = 'from ils.oled import gfx';
  
  var code = 'gfx_obj = gfx.GFX(oled_width, oled_height, display.pixel)\n';
  code += 'gfx_obj.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', 1)\n';
  code += 'display.show()\n';
  return code;
};

Blockly.Python['oled_rect'] = function(block) {
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
  var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_ATOMIC) || '20';
  var height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_ATOMIC) || '20';
  var filled = block.getFieldValue('FILLED') === 'TRUE';
  
  Blockly.Python.definitions_['import_gfx'] = 'from ils.oled import gfx';
  
  var code = 'gfx_obj = gfx.GFX(oled_width, oled_height, display.pixel)\n';
  if (filled) {
    code += 'gfx_obj.fill_rect(' + x + ', ' + y + ', ' + width + ', ' + height + ', 1)\n';
  } else {
    code += 'gfx_obj.rect(' + x + ', ' + y + ', ' + width + ', ' + height + ', 1)\n';
  }
  code += 'display.show()\n';
  return code;
};

Blockly.Python['oled_circle'] = function(block) {
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '64';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '32';
  var radius = Blockly.Python.valueToCode(block, 'RADIUS', Blockly.Python.ORDER_ATOMIC) || '10';
  var filled = block.getFieldValue('FILLED') === 'TRUE';
  
  Blockly.Python.definitions_['import_gfx'] = 'from ils.oled import gfx';
  
  var code = 'gfx_obj = gfx.GFX(oled_width, oled_height, display.pixel)\n';
  if (filled) {
    code += 'gfx_obj.fill_circle(' + x + ', ' + y + ', ' + radius + ', 1)\n';
  } else {
    code += 'gfx_obj.circle(' + x + ', ' + y + ', ' + radius + ', 1)\n';
  }
  code += 'display.show()\n';
  return code;
};

Blockly.Python['oled_triangle'] = function(block) {
  var x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC) || '10';
  var y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC) || '10';
  var x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC) || '20';
  var y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC) || '20';
  var x3 = Blockly.Python.valueToCode(block, 'X3', Blockly.Python.ORDER_ATOMIC) || '15';
  var y3 = Blockly.Python.valueToCode(block, 'Y3', Blockly.Python.ORDER_ATOMIC) || '5';
  var filled = block.getFieldValue('FILLED') === 'TRUE';
  
  Blockly.Python.definitions_['import_gfx'] = 'from ils.oled import gfx';
  
  var code = 'gfx_obj = gfx.GFX(oled_width, oled_height, display.pixel)\n';
  if (filled) {
    code += 'gfx_obj.fill_triangle(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + x3 + ', ' + y3 + ', 1)\n';
  } else {
    code += 'gfx_obj.triangle(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + x3 + ', ' + y3 + ', 1)\n';
  }
  code += 'display.show()\n';
  return code;
};

Blockly.Python['oled_invert'] = function(block) {
  var invert = block.getFieldValue('INVERT');
  var code = 'display.invert(' + invert + ')\n';
  return code;
};

Blockly.Python['oled_contrast'] = function(block) {
  var contrast = Blockly.Python.valueToCode(block, 'CONTRAST', Blockly.Python.ORDER_ATOMIC) || '255';
  var code = 'display.contrast(' + contrast + ')\n';
  return code;
};

Blockly.Python['oled_scroll'] = function(block) {
  var dx = Blockly.Python.valueToCode(block, 'DX', Blockly.Python.ORDER_ATOMIC) || '1';
  var dy = Blockly.Python.valueToCode(block, 'DY', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'display.scroll(' + dx + ', ' + dy + ')\ndisplay.show()\n';
  return code;
};

// ============================================================================
// SECTION B: TANK DRAWING CODE GENERATORS (IMPROVED)
// ============================================================================

// Global variable to track pen state
var tankPenState = 1; // 1 = pen down, 3 = pen up

Blockly.Python['tank_create'] = function(block) {
  var number_xpos = Blockly.Python.valueToCode(block, 'XPOS', Blockly.Python.ORDER_ATOMIC) || '64';
  var number_ypos = Blockly.Python.valueToCode(block, 'YPOS', Blockly.Python.ORDER_ATOMIC) || '32';
  var dropdown_direction = block.getFieldValue('DIRECTION');
  
  Blockly.Python.definitions_['import_tank'] = 'from ils.oled import tank';
  
  var code = 'tank_obj = tank.Tank(' + number_xpos + ', ' + number_ypos + ', ' + 
             dropdown_direction + ', display, oled_width, oled_height, i2c)\n';
  code += 'tank_pen_state = 1  # 1=pen down, 3=pen up\n';
  return code;
};

Blockly.Python['tank_pen_down'] = function(block) {
  var code = 'tank_pen_state = 1  # Pen down\n';
  return code;
};

Blockly.Python['tank_pen_up'] = function(block) {
  var code = 'tank_pen_state = 3  # Pen up\n';
  return code;
};

Blockly.Python['tank_move'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var number_steps = Blockly.Python.valueToCode(block, 'STEPS', Blockly.Python.ORDER_ATOMIC) || '20';
  
  var steps = dropdown_direction === '1' ? number_steps : '(-' + number_steps + ')';
  var code = 'tank_obj.move(' + steps + ', tank_pen_state)\n';
  return code;
};

Blockly.Python['tank_turn'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var number_angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC) || '90';
  
  var angle = dropdown_direction === '1' ? number_angle : '(-' + number_angle + ')';
  var code = 'tank_obj.turn(' + angle + ')\n';
  return code;
};

Blockly.Python['tank_turn_preset'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var dropdown_angle = block.getFieldValue('ANGLE');
  
  var angle = dropdown_direction === '1' ? dropdown_angle : '-' + dropdown_angle;
  var code = 'tank_obj.turn(' + angle + ')\n';
  return code;
};

Blockly.Python['tank_orient'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'tank_obj.orient(' + dropdown_direction + ')\n';
  return code;
};

Blockly.Python['tank_orient_custom'] = function(block) {
  var number_angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'tank_obj.orient(' + number_angle + ')\n';
  return code;
};

Blockly.Python['tank_goto'] = function(block) {
  var number_xpos = Blockly.Python.valueToCode(block, 'XPOS', Blockly.Python.ORDER_ATOMIC) || '64';
  var number_ypos = Blockly.Python.valueToCode(block, 'YPOS', Blockly.Python.ORDER_ATOMIC) || '32';
  var code = 'tank_obj.setpos(' + number_xpos + ', ' + number_ypos + ', tank_obj.direction)\n';
  return code;
};

Blockly.Python['tank_home'] = function(block) {
  var code = 'tank_obj.home()\n';
  return code;
};

Blockly.Python['tank_centre'] = function(block) {
  var code = 'tank_obj.centre()\n';
  return code;
};

Blockly.Python['tank_draw_shape'] = function(block) {
  var dropdown_shape = block.getFieldValue('SHAPE');
  var number_size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_ATOMIC) || '30';
  
  var code = '';
  
  switch(dropdown_shape) {
    case 'SQUARE':
      code = 'for i in range(4):\n' +
             '  tank_obj.move(' + number_size + ', tank_pen_state)\n' +
             '  tank_obj.turn(90)\n';
      break;
    case 'TRIANGLE':
      code = 'for i in range(3):\n' +
             '  tank_obj.move(' + number_size + ', tank_pen_state)\n' +
             '  tank_obj.turn(120)\n';
      break;
    case 'PENTAGON':
      code = 'for i in range(5):\n' +
             '  tank_obj.move(' + number_size + ', tank_pen_state)\n' +
             '  tank_obj.turn(72)\n';
      break;
    case 'HEXAGON':
      code = 'for i in range(6):\n' +
             '  tank_obj.move(' + number_size + ', tank_pen_state)\n' +
             '  tank_obj.turn(60)\n';
      break;
    case 'OCTAGON':
      code = 'for i in range(8):\n' +
             '  tank_obj.move(' + number_size + ', tank_pen_state)\n' +
             '  tank_obj.turn(45)\n';
      break;
    case 'STAR5':
      code = 'for i in range(5):\n' +
             '  tank_obj.move(' + number_size + ', tank_pen_state)\n' +
             '  tank_obj.turn(144)\n';
      break;
    case 'STAR8':
      code = 'for i in range(8):\n' +
             '  tank_obj.move(' + number_size + ', tank_pen_state)\n' +
             '  tank_obj.turn(135)\n';
      break;
  }
  
  return code;
};

Blockly.Python['tank_get_x'] = function(block) {
  var code = 'tank_obj.getpos()[0]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['tank_get_y'] = function(block) {
  var code = 'tank_obj.getpos()[1]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['tank_get_direction'] = function(block) {
  var code = 'tank_obj.getpos()[2]';
  return [code, Blockly.Python.ORDER_MEMBER];
};