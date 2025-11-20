// Separate reference block (no code generation)
Blockly.Blocks['pushbutton_pinout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔘 Push Button Pinout Reference");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/pushbutton/Push-button-Pinout.gif",
          200,
          200,
          "*"));
    this.appendDummyInput()
        .appendField("Reference diagram only");
    this.appendDummyInput()
        .appendField("Delete after viewing");
    this.setColour("#333399");
    this.setTooltip("Reference diagram for push button wiring");
    this.setHelpUrl("");
  }
};

// Compact functional block
Blockly.Blocks['pushbutton_init_advanced'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔘 Setup Push Button");
    this.appendValueInput("PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Button pin");
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Button ID");
    this.appendValueInput("LONG_PRESS_TIME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Long press time (ms)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Setup push button with custom long press duration. See 'Push Button Pinout' block for wiring diagram.");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['pushbutton_is_pressed'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔘 Button");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("is pressed?");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("Check if button is currently pressed down");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pushbutton_was_short_pressed'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("⚡ Button");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("was short pressed?");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("True if button was quickly pressed and released");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pushbutton_was_long_pressed'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("⏱️ Button");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("was long pressed?");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("True if button was held for long press duration");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pushbutton_is_long_pressing'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("⏳ Button");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("is long pressing?");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("True while button is being held down");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pushbutton_press_count'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔢 Button");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("press count");
    this.setOutput(true, "Number");
    this.setColour("#333399");
    this.setTooltip("Number of times button was pressed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pushbutton_press_duration'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("⏲️ Button");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("press duration (ms)");
    this.setOutput(true, "Number");
    this.setColour("#333399");
    this.setTooltip("How long the button is currently held in milliseconds");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pushbutton_update'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔄 Update Button");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Update button state - call this in your main loop");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pushbutton_reset_count'] = {
  init: function() {
    this.appendValueInput("BUTTON_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔁 Reset Button");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("press count");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Reset the press counter to zero");
    this.setHelpUrl("");
  }
};