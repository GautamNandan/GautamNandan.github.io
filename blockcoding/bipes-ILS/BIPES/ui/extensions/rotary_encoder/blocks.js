// Rotary Encoder Blocks

Blockly.Blocks['rotary_encoder_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Setup Rotary Encoder");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/rotary_encoder/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("CLK_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("CLK pin");
    this.appendValueInput("DT_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DT pin");
    this.appendValueInput("SW_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SW (button) pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Initialize rotary encoder with button");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_init_no_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Setup Rotary Encoder");
    this.appendDummyInput()		
        .appendField(new Blockly.FieldImage(
          "extensions/rotary_encoder/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("CLK_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("CLK pin");
    this.appendValueInput("DT_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DT pin");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("(no button)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Initialize rotary encoder without button");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_get_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Encoder value");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get current encoder position");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_get_delta'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📈 Encoder delta");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get change since last read (resets after reading)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_get_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭 Encoder direction");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get rotation direction: CW, CCW, or NONE");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_button_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔘 Encoder button pressed?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if encoder button is pressed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_wait_for_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏳ Encoder wait for button");
    this.appendValueInput("TIMEOUT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("timeout (sec)");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Wait for button press (returns true if pressed, false on timeout)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_rotated_cw'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↻ Encoder rotated clockwise?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("True if rotated clockwise since last check");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_rotated_ccw'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↺ Encoder rotated counterclockwise?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("True if rotated counterclockwise since last check");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_has_moved'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Encoder has moved?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("True if encoder has rotated in any direction");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_set_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 Encoder set value");
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set encoder position to specific value");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_reset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Encoder reset to zero");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Reset encoder position to 0");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_set_limits'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔒 Encoder set limits");
    this.appendValueInput("MIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("min");
    this.appendValueInput("MAX")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("max");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Constrain encoder value within range");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_clear_limits'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔓 Encoder clear limits");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Remove min/max constraints");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_set_scale'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚖️ Encoder set scale");
    this.appendValueInput("SCALE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("factor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Scale encoder steps (e.g., 5 = count by 5s)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rotary_encoder_set_reverse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔃 Encoder reverse direction")
        .appendField(new Blockly.FieldDropdown([
          ["ON", "true"],
          ["OFF", "false"]
        ]), "REVERSE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Reverse rotation direction");
    this.setHelpUrl("");
  }
};