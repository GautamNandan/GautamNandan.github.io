// ILS Character LCD Blocks (PCF8574 I2C Controller)
// Color: #cc0000 (Teal for LCD displays)

// ==================== SETUP ====================
// Separate reference block (no code generation)
Blockly.Blocks['char_lcd_pinout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📺 LCD Pinout Reference");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/lcd/icon.png",
          200,
          100,
          "*"));
    this.appendDummyInput()
        .appendField("Reference diagram only");
    this.appendDummyInput()
        .appendField("Delete after viewing");
    this.setColour("#cc0000");
    this.setTooltip("Reference diagram for LCD wiring");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['char_lcd_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📺 LCD Setup");
   
    
    this.appendValueInput("SCL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SCL Pin");
    
    this.appendValueInput("SDA")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SDA Pin");
    
    this.appendValueInput("LINES")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Lines (rows)");
    
    this.appendValueInput("COLUMNS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Columns");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setColour('#cc0000');
    this.setTooltip("Initialize ILS character LCD with PCF8574 I2C controller");
    this.setHelpUrl("");
  }
};

// ==================== DISPLAY CONTROL ====================

Blockly.Blocks['char_lcd_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🗑️ Clear LCD Display");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setColour('#cc0000');
    this.setTooltip("Clear all text from LCD display");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['char_lcd_display'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📺 LCD Display Power");
    
    this.appendValueInput("STATE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("State (0=Off, 1=On)");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Turn LCD display on (1) or off (0)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['char_lcd_backlight'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 LCD Backlight");
    
    this.appendValueInput("STATE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("State (0=Off, 1=On)");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Turn LCD backlight on (1) or off (0)");
    this.setHelpUrl("");
  }
};

// ==================== TEXT DISPLAY ====================

Blockly.Blocks['char_lcd_putstr'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✏️ Write Text to LCD");
    
    this.appendValueInput("TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Text");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Write text to LCD at current cursor position");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['char_lcd_moveto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Move LCD Cursor");
    
    this.appendValueInput("ROW")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row (0-based)");
    
    this.appendValueInput("COLUMN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Column (0-based)");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Move cursor to specified row and column (both start at 0)");
    this.setHelpUrl("");
  }
};

// ==================== CURSOR CONTROL ====================

Blockly.Blocks['char_lcd_show_cursor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("👁️ Show LCD Cursor");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Show the cursor on LCD display");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['char_lcd_hide_cursor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🙈 Hide LCD Cursor");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Hide the cursor on LCD display");
    this.setHelpUrl("");
  }
};

// ==================== SCROLLING ====================

Blockly.Blocks['char_lcd_scroll_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬅️ Scroll LCD Left");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Scroll LCD display content to the left");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['char_lcd_scroll_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("➡️ Scroll LCD Right");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Scroll LCD display content to the right");
    this.setHelpUrl("");
  }
};