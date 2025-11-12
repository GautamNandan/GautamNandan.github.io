// Matrix Keypad Blocks

Blockly.Blocks['keypad_init_4x3'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⌨️ Setup Keypad 4×3");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/keypad/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("ROW1_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 1 pin");
    this.appendValueInput("ROW2_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 2 pin");
    this.appendValueInput("ROW3_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 3 pin");
    this.appendValueInput("ROW4_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 4 pin");
    this.appendValueInput("COL1_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 1 pin");
    this.appendValueInput("COL2_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 2 pin");
    this.appendValueInput("COL3_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 3 pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Initialize 4x3 keypad (1-9, *, 0, #)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_init_4x4'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⌨️ Setup Keypad 4×4");	  
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/keypad/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("ROW1_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 1 pin");
    this.appendValueInput("ROW2_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 2 pin");
    this.appendValueInput("ROW3_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 3 pin");
    this.appendValueInput("ROW4_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 4 pin");
    this.appendValueInput("COL1_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 1 pin");
    this.appendValueInput("COL2_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 2 pin");
    this.appendValueInput("COL3_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 3 pin");
    this.appendValueInput("COL4_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 4 pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Initialize 4x4 keypad (1-9, *, 0, #, A, B, C, D)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_init_3x3'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⌨️ Setup Keypad 3×3");	  
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/keypad/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("ROW1_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 1 pin");
    this.appendValueInput("ROW2_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 2 pin");
    this.appendValueInput("ROW3_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row 3 pin");
    this.appendValueInput("COL1_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 1 pin");
    this.appendValueInput("COL2_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 2 pin");
    this.appendValueInput("COL3_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col 3 pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Initialize 3x3 keypad (1-9)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_init_custom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⌨️ Setup Custom Keypad");	  
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/keypad/icon.png",
          55,
          55,
          "*"));
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Row pins (comma-separated)")
        .appendField(new Blockly.FieldTextInput("13,12,14,27"), "ROW_PINS");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Col pins (comma-separated)")
        .appendField(new Blockly.FieldTextInput("26,25,33"), "COL_PINS");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Keys (comma-separated)")
        .appendField(new Blockly.FieldTextInput("1,2,3,4,5,6,7,8,9,*,0,#"), "KEYS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Initialize custom keypad configuration");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_get_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔍 Keypad get key");
    this.setOutput(true, "String");
    this.setColour("#333399");
    this.setTooltip("Get currently pressed key (returns empty if no key pressed)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_wait_for_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏳ Keypad wait for key");
    this.setOutput(true, "String");
    this.setColour("#333399");
    this.setTooltip("Wait until a key is pressed and return it");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_is_key_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("❓ Keypad key");
    this.appendValueInput("KEY")
        .setCheck("String")
        .appendField("pressed?");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("Check if specific key is pressed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_on_key_press'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 When keypad key pressed");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("(key stored in variable 'key')");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Run code when any key is pressed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_on_specific_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 When keypad key");
    this.appendValueInput("KEY")
        .setCheck("String");
    this.appendDummyInput()
        .appendField("pressed");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Run code when specific key is pressed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_get_number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔢 Keypad get number");
    this.appendValueInput("MAX_DIGITS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("max digits");
    this.setOutput(true, "String");
    this.setColour("#333399");
    this.setTooltip("Collect multiple digits (press # to finish)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_get_password'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔐 Keypad get password");
    this.appendValueInput("LENGTH")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("length");
    this.setOutput(true, "String");
    this.setColour("#333399");
    this.setTooltip("Collect password/PIN (press # to finish early)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['keypad_set_debounce'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set keypad debounce");
    this.appendValueInput("DELAY")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("delay (ms)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Set debounce delay in milliseconds");
    this.setHelpUrl("");
  }
};