//  Stepper Motor Blocks for Blockly
// Color: #666600
// For students aged 8-14 years

// Separate reference block (no code generation)
Blockly.Blocks['stepper_pinout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄  Stepper Motor Pinout Reference");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/stepper/icon.png",
          55,
          55,
          "*"));
    this.appendDummyInput()
        .appendField("Reference diagram only");
    this.appendDummyInput()
        .appendField("Delete after viewing");
    this.setColour("#666600");
    this.setTooltip("Reference diagram for Stepper Motor wiring");
    this.setHelpUrl("");
  }
};

// ==================== SETUP BLOCK ====================
Blockly.Blocks['stepper_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendValueInput("IN1_PIN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                                  IN1");
    this.appendValueInput("IN2_PIN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                                  IN2");
    this.appendValueInput("IN3_PIN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                                  IN3");
    this.appendValueInput("IN4_PIN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                                  IN4");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("              Steps/Revolution")
        .appendField(new Blockly.FieldDropdown([
          ["4096 (28BYJ-48)", "4096"],
          ["200 (NEMA 17)", "200"],
          ["400 (Half-step)", "400"]
        ]), "STEPS_PER_REV");
    this.setInputsInline(false);		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Initialize a stepper motor. Connect IN1-IN4 to ESP32 pins. Motor ID helps control multiple motors.");
    this.setHelpUrl("");
  }
};

// ==================== BASIC MOVEMENT BLOCKS ====================
Blockly.Blocks['stepper_rotate_degrees'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄  Stepper");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendValueInput("DEGREES")
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck("Number")
        .appendField("                            Rotate");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("degrees")
        .appendField(new Blockly.FieldDropdown([
          ["↻ clockwise", "clockwise"],
          ["↺ counter-clockwise", "counter_clockwise"]
        ]), "DIRECTION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Rotate the stepper motor by a specific angle in degrees.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['stepper_move_steps'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("👣  Stepper Move");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendValueInput("STEPS")
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck("Number")
        .appendField("                              Move");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("steps")
        .appendField(new Blockly.FieldDropdown([
          ["→ forward", "forward"],
          ["← backward", "backward"]
        ]), "DIRECTION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move the motor a specific number of steps. 1 full rotation = steps per revolution.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['stepper_move_to_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯  Stepper Go To");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendValueInput("POSITION")
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck("Number")
        .appendField("                      Position (°)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move motor to an absolute position in degrees from starting point (0°).");
    this.setHelpUrl("");
  }
};

// ==================== SPEED CONTROL BLOCKS ====================
Blockly.Blocks['stepper_set_speed_preset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚀  Stepper Speed");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                              Speed")
        .appendField(new Blockly.FieldDropdown([
          ["🐢 Very Slow", "very_slow"],
          ["🐌 Slow", "slow"],
          ["🚶 Medium", "medium"],
          ["🏃 Fast", "fast"],
          ["⚡ Very Fast", "very_fast"]
        ]), "SPEED");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Set motor speed using easy presets from very slow to very fast.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['stepper_set_speed_rpm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚡  Stepper Speed");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendValueInput("RPM")
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck("Number")
        .appendField("                               RPM");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Set motor speed in RPM (Rotations Per Minute). Typical range: 1-15 RPM for 28BYJ-48.");
    this.setHelpUrl("");
  }
};

// ==================== ADVANCED MOVEMENT BLOCKS ====================
Blockly.Blocks['stepper_rotate_smooth'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✨  Stepper Smooth");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendValueInput("DEGREES")
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck("Number")
        .appendField("                            Rotate");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("degrees")
        .appendField(new Blockly.FieldDropdown([
          ["↻ clockwise", "clockwise"],
          ["↺ counter-clockwise", "counter_clockwise"]
        ]), "DIRECTION");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                      Movement")
        .appendField(new Blockly.FieldDropdown([
          ["Smooth", "smooth"],
          ["Normal", "normal"],
          ["Quick", "quick"]
        ]), "ACCELERATION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Rotate with acceleration. Smooth = gradual speed up/down, Quick = fast start/stop.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['stepper_spin_continuous'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("♾️  Stepper Spin Forever");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                         Direction")
        .appendField(new Blockly.FieldDropdown([
          ["↻ clockwise", "clockwise"],
          ["↺ counter-clockwise", "counter_clockwise"]
        ]), "DIRECTION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Spin motor continuously. WARNING: This will block code! Use Stop block to halt.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['stepper_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 Stop  Stepper");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Stop the motor immediately and turn off all coils.");
    this.setHelpUrl("");
  }
};

// ==================== FUN PATTERN BLOCK ====================
Blockly.Blocks['stepper_dance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💃  Stepper Dance");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.appendValueInput("REPETITIONS")
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck("Number")
        .appendField("                   Repeat times");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Make the motor dance back and forth! Great for testing and fun projects.");
    this.setHelpUrl("");
  }
};

// ==================== SENSOR/STATUS BLOCKS ====================
Blockly.Blocks['stepper_get_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍  Stepper Position");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour("#666600");
    this.setTooltip("Get current position of the motor in degrees from starting point.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['stepper_is_moving'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("❓  Stepper Moving?");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.setInputsInline(false);
    this.setOutput(true, "Boolean");
    this.setColour("#666600");
    this.setTooltip("Check if the motor is currently moving. Returns true or false.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['stepper_reset_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Reset  Stepper Position");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("                          Motor ID")
        .appendField(new Blockly.FieldNumber(0, 0, 9, 1), "MOTOR_ID");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Reset position counter to 0°. Current position becomes the new starting point.");
    this.setHelpUrl("");
  }
}; 