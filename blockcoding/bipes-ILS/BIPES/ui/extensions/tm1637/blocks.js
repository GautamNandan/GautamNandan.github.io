// TM1637 7-Segment Display Blocks for Blockly

Blockly.Blocks['tm1637_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔧 TM1637 Initialize Display");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/tm1637/icon.png",
          255,
          155,
          "*"));		
    this.appendValueInput("CLK_PIN")
        .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField("CLK Pin");
    this.appendValueInput("DIO_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("DIO Pin");
    this.appendValueInput("BRIGHTNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("Brightness (0-7)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Initialize TM1637 7-segment display with CLK and DIO pins");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['tm1637_brightness'] = {
  init: function() {
    this.appendValueInput("BRIGHTNESS")
        .setCheck("Number")
        .appendField("💡 TM1637 Set Brightness");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set display brightness (0-7)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tm1637_show_number'] = {
  init: function() {
    this.appendValueInput("NUMBER")
        .setCheck("Number")
        .appendField("🔢 TM1637 Show Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display a number (-999 to 9999)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tm1637_show_hex'] = {
  init: function() {
    this.appendValueInput("HEX_VALUE")
        .setCheck("Number")
        .appendField("🔣 TM1637 Show Hex Value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display a hexadecimal value (0x0000 to 0xFFFF)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tm1637_show_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🕐 TM1637 Show Time");
    this.appendValueInput("HOURS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("Hours");
    this.appendValueInput("MINUTES")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("Minutes");
    this.appendDummyInput()
        .appendField("Colon")
        .setAlign(Blockly.ALIGN_RIGHT)		
        .appendField(new Blockly.FieldDropdown([["ON","TRUE"], ["OFF","FALSE"]]), "COLON");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display time in HH:MM format");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tm1637_show_text'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("📝 TM1637 Show Text");
    this.appendDummyInput()
        .appendField("Colon")
        .setAlign(Blockly.ALIGN_RIGHT)		
        .appendField(new Blockly.FieldDropdown([["ON","TRUE"], ["OFF","FALSE"]]), "COLON");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display text (up to 4 characters: 0-9, a-z, space, dash, star)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tm1637_scroll_text'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("📜 TM1637 Scroll Text");
    this.appendValueInput("DELAY")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("Delay (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Scroll text across the display");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tm1637_show_temperature'] = {
  init: function() {
    this.appendValueInput("TEMPERATURE")
        .setCheck("Number")
        .appendField("🌡️ TM1637 Show Temperature");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display temperature with degree symbol (-9 to 99°C)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tm1637_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🗑️ TM1637 Clear Display");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Clear the display");
    this.setHelpUrl("");
  }
};