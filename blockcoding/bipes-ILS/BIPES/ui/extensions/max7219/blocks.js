// MAX7219 LED Matrix Blocks for Blockly

Blockly.Blocks['max7219_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔌 MAX7219 Matrix Initialize");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/max7219/icon.png",
          55,
          55,
          "*"));		
    this.appendValueInput("CLK_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("CLK Pin");
    this.appendValueInput("DIO_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DIO Pin");
    this.appendValueInput("CS_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("CS Pin");
    this.appendValueInput("COUNT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Matrix Count");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Initialize MAX7219 LED Matrix with SPI pins and number of cascaded matrices");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_brightness'] = {
  init: function() {
    this.appendValueInput("BRIGHTNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("💡 MAX7219 Matrix Brightness");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set matrix brightness (0-15)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✨ MAX7219 Matrix Show");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display the current buffer on matrix");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🗑️ MAX7219 Matrix Clear");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Clear all pixels on matrix");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_wake'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("👁️ MAX7219 Matrix Wake");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Wake up the display from shutdown mode");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_shutdown'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💤 MAX7219 Matrix Shutdown");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Put the display into shutdown mode (low power)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_text'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("📝 MAX7219 Matrix Text");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display text at specified position");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_scroll_text'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔄 MAX7219 Matrix Scroll Text");
    this.appendValueInput("DELAY")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Delay (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Scroll text across the matrix display");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_number'] = {
  init: function() {
    this.appendValueInput("NUMBER")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔢 MAX7219 Matrix Number");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Display number at specified position");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_pixel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚫ MAX7219 Matrix Pixel");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("State")
        .appendField(new Blockly.FieldDropdown([["ON","TRUE"], ["OFF","FALSE"]]), "STATE");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set individual pixel on or off");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_fill'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎨 MAX7219 Matrix Fill")
        .appendField(new Blockly.FieldDropdown([["ON","TRUE"], ["OFF","FALSE"]]), "STATE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Fill entire matrix with ON or OFF pixels");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max7219_custom_pattern'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎭 MAX7219 Matrix Custom Pattern");
    
    // Create 8x8 grid of checkboxes
    for (var row = 0; row < 8; row++) {
      var rowName = String.fromCharCode(65 + row);
      var input = this.appendDummyInput()
          .setAlign(Blockly.ALIGN_CENTRE);
      
      for (var col = 0; col < 8; col++) {
        input.appendField(new Blockly.FieldCheckbox("FALSE"), rowName + col);
      }
    }
    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Create custom 8x8 pixel pattern");
    this.setHelpUrl("");
  }
};