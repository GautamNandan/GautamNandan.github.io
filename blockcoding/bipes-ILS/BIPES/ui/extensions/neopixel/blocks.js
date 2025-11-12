//  NeoPixel Blocks
// Color: #cc0000 (Purple for NeoPixel)

// ==================== SETUP ====================

Blockly.Blocks['neopixel_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 NeoPixel Setup");
    
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/neopixel/icon.png",
          55,
          55,
          "*"));
    
    this.appendValueInput("PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Data Pin");
    
    this.appendValueInput("NUMBER")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Total LEDs");
    
    this.appendValueInput("STRIP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Strip ID");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Initialize NeoPixel strip. Connect data wire to the specified GPIO pin.");
    this.setHelpUrl("");
  }
};

// ==================== COLOR CREATION ====================

Blockly.Blocks['neopixel_color_picker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎨")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
    
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Choose a color using the color picker");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['neopixel_color_rgb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌈 RGB Color");
    
    this.appendValueInput("RED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Red (0-255)");
    
    this.appendValueInput("GREEN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Green (0-255)");
    
    this.appendValueInput("BLUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Blue (0-255)");
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Create a color using Red, Green, and Blue values (0-255)");
    this.setHelpUrl("");
  },
  styleBlock: function(colours) {
    colours = colours.map(x => parseInt(x));
    colours = colours.includes(NaN) ? [89, 102, 166] : colours;
    if(colours.every((e) => e <= 255) && colours.every((e) => e >= 0)) {
      let hex_ = Tool.RGB2HEX(colours[0], colours[1], colours[2]);
      this.setColour(hex_);
    } else {
      this.setColour("#FF0000");
    }
  }
};

Blockly.Blocks['neopixel_color_hsl'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎨 HSL Color");
    
    this.appendValueInput("HUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Hue (0-360°)");
    
    this.appendValueInput("SATURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Saturation (0-100%)");
    
    this.appendValueInput("LIGHTNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Lightness (0-100%)");
    
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Create a color using Hue (0-360°), Saturation (0-100%), and Lightness (0-100%)");
    this.setHelpUrl("");
  },
  styleBlock: function(colours) {
    colours = colours.map(x => parseFloat(x));
    colours = colours.includes(NaN) ? [230, 30, 50] : colours;
    if (colours[0] <= 360 && colours[0] >= 0 && 
        colours[1] >= 0 && colours[1] <= 100 && 
        colours[2] >= 0 && colours[2] <= 100) {
      let hex_ = Tool.HUE2HEX(colours[0], colours[1], colours[2]);
      this.setColour(hex_);
    } else {
      this.setColour("#FF0000");
    }
  }
};

// ==================== LED CONTROL ====================

Blockly.Blocks['neopixel_set_pixel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 Set LED Color");
    
    this.appendValueInput("STRIP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Strip ID");
    
    this.appendValueInput("LED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED Number");
    
    this.appendValueInput("COLOR")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set a specific LED to a color (LED numbers start at 0)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['neopixel_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✨ NeoPixel Show");
    
    this.appendValueInput("STRIP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Strip ID");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Update the NeoPixel strip to display the colors you set");
    this.setHelpUrl("");
  }
};

// ==================== PATTERNS ====================

Blockly.Blocks['neopixel_fill_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌟 Fill All LEDs");
    
    this.appendValueInput("STRIP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Strip ID");
    
    this.appendValueInput("COLOR")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set all LEDs to the same color");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['neopixel_fill_range'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📏 Fill LED Range");
    
    this.appendValueInput("STRIP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Strip ID");
    
    this.appendValueInput("START")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("From LED");
    
    this.appendValueInput("END")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To LED");
    
    this.appendValueInput("COLOR")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set a range of LEDs to the same color");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['neopixel_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🗑️ Clear All LEDs");
    
    this.appendValueInput("STRIP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Strip ID");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Turn off all LEDs (set to black)");
    this.setHelpUrl("");
  }
};

// ==================== BRIGHTNESS ====================

Blockly.Blocks['neopixel_brightness'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔆 Set Brightness");
    
    this.appendValueInput("STRIP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Strip ID");
    
    this.appendValueInput("BRIGHTNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Brightness (0-255)");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set overall brightness (0=off, 255=maximum)");
    this.setHelpUrl("");
  }
};