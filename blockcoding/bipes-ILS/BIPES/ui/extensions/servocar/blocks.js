// Servo Car Blocks - Supports PCA9685 and Direct GPIO
// Color: #9999ff

// Direct GPIO mode - 4 wheel pins
Blockly.Blocks['ils_car_set_pins_4wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Set Car GPIO Pins (4-Wheel)");
    this.appendValueInput("FL_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Left pin");
    this.appendValueInput("FR_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Right pin");
    this.appendValueInput("RL_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Left pin");
    this.appendValueInput("RR_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Right pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Set GPIO pins for 4-wheel Direct mode");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_set_pins_2wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Set Car GPIO Pins (2-Wheel)");
    this.appendValueInput("LEFT_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Left Wheel pin");
    this.appendValueInput("RIGHT_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Right Wheel pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Set GPIO pins for 2-wheel Direct mode");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_set_channels_4wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set Car PCA9685 (4-Wheel)");
    this.appendValueInput("SDA_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SDA pin");
    this.appendValueInput("SCL_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SCL pin");
    this.appendValueInput("ADDRESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("I2C address (hex)");
    this.appendValueInput("FL_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Left channel");
    this.appendValueInput("FR_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Right channel");
    this.appendValueInput("RL_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Left channel");
    this.appendValueInput("RR_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Right channel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Setup PCA9685 and set channels for 4-wheel configuration (0-15)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_set_channels_2wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set Car PCA9685 (2-Wheel)");
    this.appendValueInput("SDA_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SDA pin");
    this.appendValueInput("SCL_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SCL pin");
    this.appendValueInput("ADDRESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("I2C address (hex)");
    this.appendValueInput("LEFT_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Left Wheel channel");
    this.appendValueInput("RIGHT_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Right Wheel channel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Setup PCA9685 and set channels for 2-wheel configuration (0-15)");
    this.setHelpUrl("");
  }
};

// Combined Basic Movement Block
Blockly.Blocks['ils_car_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚗 Car Move")
        .appendField(new Blockly.FieldDropdown([
          ["⬆️ Forward", "FORWARD"],
          ["⬇️ Backward", "BACKWARD"],
          ["↪️ Turn Left", "LEFT"],
          ["↩️ Turn Right", "RIGHT"],
          ["🛑 Stop", "STOP"]
        ]), "DIRECTION");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Control car movement - select direction and speed");
    this.setHelpUrl("");
  }
};

// Advanced Movement Blocks

Blockly.Blocks['ils_car_curve_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Car Curve Left");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.appendValueInput("TURN_RATIO")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("turn sharpness (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Move forward while curving left. Higher turn ratio = sharper turn");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_curve_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔃 Car Curve Right");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.appendValueInput("TURN_RATIO")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("turn sharpness (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Move forward while curving right. Higher turn ratio = sharper turn");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_drift_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💨 Car Drift Left");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Drift left - works best in 4-wheel mode");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_drift_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💨 Car Drift Right");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Drift right - works best in 4-wheel mode");
    this.setHelpUrl("");
  }
};

// Individual Wheel Control

Blockly.Blocks['ils_car_wheel_speed_4wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎡 Set Wheel Speed (4-Wheel)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("wheel")
        .appendField(new Blockly.FieldDropdown([
          ["Front Left", "0"],
          ["Front Right", "1"],
          ["Rear Left", "2"],
          ["Rear Right", "3"]
        ]), "WHEEL");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (-100 to 100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Control individual wheel speed in 4-wheel mode. Negative = reverse");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_wheel_speed_2wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎡 Set Wheel Speed (2-Wheel)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("wheel")
        .appendField(new Blockly.FieldDropdown([
          ["Left", "0"],
          ["Right", "1"]
        ]), "WHEEL");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (-100 to 100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Control individual wheel speed in 2-wheel mode. Negative = reverse");
    this.setHelpUrl("");
  }
};

// Configuration Blocks

Blockly.Blocks['ils_car_set_servo_range'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📏 Set Car Servo Range");
    this.appendValueInput("MIN_US")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("min pulse (μs)");
    this.appendValueInput("MAX_US")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("max pulse (μs)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Calibrate servo pulse range. Default: 500-2500 microseconds");
    this.setHelpUrl("");
  }
};