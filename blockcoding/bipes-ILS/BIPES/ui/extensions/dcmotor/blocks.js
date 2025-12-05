// DC Motor L298N Blocks

// Separate reference block (no code generation)
Blockly.Blocks['l298n_pinout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️DC Motor Pinout Reference");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/dcmotor/icon.png",
          55,
          55,
          "*"));
    this.appendDummyInput()
        .appendField("Reference diagram only");
    this.appendDummyInput()
        .appendField("Delete after viewing");
    this.setColour("#666600");
    this.setTooltip("Reference diagram for DC Motor wiring");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_init'] = {
  init: function() {
	  
    this.appendDummyInput()
        .appendField("⚙️ DC Motor Setup");	  

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
	this.setInputsInline(false);	
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Setup DC motor with L298N driver. Connect motor wires to OUT1/OUT2 on driver");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("▶️ Motor");
    this.appendValueInput("MOTOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Forward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed %");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move motor forward at specified speed (0-100%)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("◀️ Motor");
    this.appendValueInput("MOTOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Backward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed %");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move motor backward at specified speed (0-100%)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏹️ Motor");
    this.appendValueInput("MOTOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Stop");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Stop the motor (coast to stop)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_set_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Motor");
    this.appendValueInput("MOTOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Direction")
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "FORWARD"],
          ["Backward", "BACKWARD"]
        ]), "DIRECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Set motor direction without changing speed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_set_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚡ Motor");
    this.appendValueInput("MOTOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Set Speed");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed %");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Change motor speed (0-100%) without changing direction");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_run_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏱️ Motor");
    this.appendValueInput("MOTOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "FORWARD"],
          ["Backward", "BACKWARD"]
        ]), "DIRECTION");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed %");
    this.appendValueInput("TIME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("For seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Run motor for specified time then automatically stop");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['l298n_motor_brake'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 Motor");
    this.appendValueInput("MOTOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Brake");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Apply electrical brake to stop motor quickly");
    this.setHelpUrl("");
  }
};