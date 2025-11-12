// DC Motor L298N Blocks
Blockly.Blocks['l298n_motor_init'] = {
  init: function() {
	  
    this.appendDummyInput()
        .appendField("⚙️ DC Motor Setup");	  
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/dcmotor/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("IN1_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1 Pin");
		
    this.appendValueInput("IN2_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2 Pin");
		
    this.appendValueInput("EN_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Enable Pin");
		
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Motor ID")
        .appendField(new Blockly.FieldNumber(1, 1, 10), "MOTOR_ID");
		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Setup DC motor with L298N driver. Connect motor wires to OUT1/OUT2 on driver");
    this.setHelpUrl("");
  }
};
// Joystick Controller Blocks

Blockly.Blocks['joystick_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🕹️ Setup Joystick");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/joystick/icon.png",
          55,
          55,
          "*"));

    this.appendValueInput("X_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X-axis pin");
    this.appendValueInput("Y_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y-axis pin");
    this.appendValueInput("BUTTON_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Button pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Initialize the joystick controller with X, Y, and button pins");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_read_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Joystick X raw value");
    this.setOutput(true, "Number");
    this.setColour("#333399");
    this.setTooltip("Read raw X-axis value (0-4095)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_read_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Joystick Y raw value");
    this.setOutput(true, "Number");
    this.setColour("#333399");
    this.setTooltip("Read raw Y-axis value (0-4095)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_read_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔘 Joystick button pressed?");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("Returns true if button is pressed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_get_x_normalized'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↔️ Joystick X position");
    this.setOutput(true, "Number");
    this.setColour("#333399");
    this.setTooltip("Get normalized X position (-100 to 100, 0 is center)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_get_y_normalized'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↕️ Joystick Y position");
    this.setOutput(true, "Number");
    this.setColour("#333399");
    this.setTooltip("Get normalized Y position (-100 to 100, 0 is center)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_is_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭 Joystick is")
        .appendField(new Blockly.FieldDropdown([
          ["UP", "UP"],
          ["DOWN", "DOWN"],
          ["LEFT", "LEFT"],
          ["RIGHT", "RIGHT"]
        ]), "DIRECTION");
    this.appendValueInput("THRESHOLD")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("threshold");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("Check if joystick is moved in a specific direction");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_get_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭 Joystick direction");
    this.appendValueInput("THRESHOLD")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("threshold");
    this.setOutput(true, "String");
    this.setColour("#333399");
    this.setTooltip("Get current direction: UP, DOWN, LEFT, RIGHT, or CENTER");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_is_centered'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⭕ Joystick is centered?");
    this.appendValueInput("DEADZONE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("deadzone");
    this.setOutput(true, "Boolean");
    this.setColour("#333399");
    this.setTooltip("Check if joystick is in center position");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_calibrate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Calibrate Joystick");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Calibrate joystick center position (keep joystick centered)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['joystick_set_center'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set Joystick Center");
    this.appendValueInput("X_CENTER")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X center");
    this.appendValueInput("Y_CENTER")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y center");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#333399");
    this.setTooltip("Manually set the center calibration values");
    this.setHelpUrl("");
  }
};