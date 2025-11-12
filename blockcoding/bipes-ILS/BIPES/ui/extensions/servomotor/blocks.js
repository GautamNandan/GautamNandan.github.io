// Servo Motor Blocks

Blockly.Blocks['servo_init_standard'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Servo Setup (180°)");	
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/servomotor/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Signal Pin");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Servo ID")
        .appendField(new Blockly.FieldNumber(1, 1, 16), "SERVO_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Setup a standard 180° servo motor. ID helps control multiple servos");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_init_continuous'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Servo Setup (360°)");	
	  
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/servomotor/icon.png",
          55,
          55,
          "*"));

    this.appendValueInput("PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Signal Pin");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Servo ID")
        .appendField(new Blockly.FieldNumber(2, 1, 16), "SERVO_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Setup a continuous rotation 360° servo motor for spinning");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Move to Angle");
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move servo to specific angle (0-180°). 0=left, 90=center, 180=right");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_preset_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Move to")
        .appendField(new Blockly.FieldDropdown([
          ["Left (0°)", "0"],
          ["Center Left (45°)", "45"],
          ["Center (90°)", "90"],
          ["Center Right (135°)", "135"],
          ["Right (180°)", "180"]
        ]), "POSITION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move servo to preset position");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_sweep'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↔️ Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sweep");
    this.appendValueInput("START_ANGLE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("From Angle");
    this.appendValueInput("END_ANGLE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To Angle");
    this.appendValueInput("STEP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Step Size");
    this.appendValueInput("DELAY")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Delay (ms)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Sweep servo back and forth between two angles");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_smooth_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Smooth Move to");
    this.appendValueInput("TARGET_ANGLE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Angle");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move servo smoothly to target angle. Speed 1-20 (higher is faster)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_continuous_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏩ Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Spin Forward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed %");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Spin continuous servo forward at specified speed (0-100%)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_continuous_backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏪ Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Spin Backward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed %");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Spin continuous servo backward at specified speed (0-100%)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_continuous_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏹️ Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Stop Spinning");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Stop continuous servo rotation");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_detach'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔌 Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Detach (Power Off)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Turn off servo signal. Servo can move freely and saves power");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['servo_attach'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔌 Servo");
    this.appendValueInput("SERVO_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Attach (Power On)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Turn on servo signal after detaching");
    this.setHelpUrl("");
  }
};