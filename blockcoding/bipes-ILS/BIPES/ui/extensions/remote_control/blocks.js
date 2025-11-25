// ESP-NOW ESP-NOW Remote Control Blocks

// ============= SETUP BLOCK =============
Blockly.Blocks['remote_receiver_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Setup ESP-NOW Remote Receiver");
    this.appendValueInput("BEACON_TIME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Beacon time (seconds)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Initialize remote receiver. Beacon helps transmitter find this device.");
    this.setHelpUrl("");
  }
};

// ============= CONTROL BLOCKS =============
Blockly.Blocks['remote_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Update ESP-NOW Remote");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Check for new remote control signals. Put this in your main loop!");
    this.setHelpUrl("");
  }
};

// ============= JOYSTICK BLOCKS =============
Blockly.Blocks['remote_on_joystick_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🕹️ When joystick moves");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X position:")
        .appendField(new Blockly.FieldVariable("x_pos"), "X_VAR");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y position:")
        .appendField(new Blockly.FieldVariable("y_pos"), "Y_VAR");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Direction:")
        .appendField(new Blockly.FieldVariable("direction"), "DIR_VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Run code when joystick moves. Gets X, Y positions and direction name.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remote_on_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 When joystick points")
        .appendField(new Blockly.FieldDropdown([
          ["⬆️ Up", "up"],
          ["⬇️ Down", "down"],
          ["⬅️ Left", "left"],
          ["➡️ Right", "right"],
          ["↗️ Up-Right", "up_right"],
          ["↖️ Up-Left", "up_left"],
          ["↘️ Down-Right", "down_right"],
          ["↙️ Down-Left", "down_left"],
          ["⏺️ Center", "center"]
        ]), "DIRECTION");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Run code when joystick points in a specific direction");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remote_get_joystick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🕹️ Joystick")
        .appendField(new Blockly.FieldDropdown([
          ["X position", "x"],
          ["Y position", "y"]
        ]), "AXIS");
    this.setOutput(true, "Number");
    this.setColour("#333399");
    this.setTooltip("Get joystick position as a number from -1 to +1");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remote_get_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭 Current joystick direction");
    this.setOutput(true, "String");
    this.setColour("#333399");
    this.setTooltip("Get current direction name (up, down, left, right, center, etc.)");
    this.setHelpUrl("");
  }
};

// ============= BUTTON BLOCKS =============
Blockly.Blocks['remote_on_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔘 When button")
        .appendField(new Blockly.FieldDropdown([
          ["🅰️ A", "a"],
          ["🅱️ B", "b"],
          ["🅲 C", "c"],
          ["🅳 D", "d"],
          ["🅴 E", "e"],
          ["🅵 F", "f"],
          ["🕹️ Joystick", "joystick"]
        ]), "BUTTON")
        .appendField("is")
        .appendField(new Blockly.FieldDropdown([
          ["pressed", "short"],
          ["held (long press)", "long"],
          ["double-clicked", "double"]
        ]), "EVENT");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Run code when a specific button is pressed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remote_on_any_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎮 When any button pressed");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Button name:")
        .appendField(new Blockly.FieldVariable("button_name"), "BTN_VAR");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Press type:")
        .appendField(new Blockly.FieldVariable("press_type"), "EVENT_VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Run code for any button press. Gets button name and press type.");
    this.setHelpUrl("");
  }
};

// ============= ADVANCED BLOCKS =============
Blockly.Blocks['remote_is_connected'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📶 ESP-NOW Remote is connected");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("Check if remote receiver is running");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remote_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 Stop ESP-NOW Remote");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Stop the remote receiver");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remote_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 Start ESP-NOW Remote");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Start the remote receiver");
    this.setHelpUrl("");
  }
};