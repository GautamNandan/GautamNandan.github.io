// 4-Wheel Servo Car Blocks
// Color: #666600

Blockly.Blocks['ils_servo_car_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚗 Setup Servo Car");
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Initialize 4-wheel servo car with PCA9685");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_set_channels'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set Car Servo Channels");
    this.appendValueInput("FL_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Left");
    this.appendValueInput("FR_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Right");
    this.appendValueInput("RL_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Left");
    this.appendValueInput("RR_CHANNEL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Right");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Set which PCA9685 channels control which wheels (0-15)");
    this.setHelpUrl("");
  }
};

// Basic Movement Blocks

Blockly.Blocks['ils_car_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬆️ Car Move Forward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move the car forward at specified speed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬇️ Car Move Backward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Move the car backward at specified speed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↪️ Car Turn Left");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Rotate the car left in place");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↩️ Car Turn Right");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Rotate the car right in place");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_car_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 Car Stop");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Stop all wheels immediately");
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
    this.setColour("#666600");
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
    this.setColour("#666600");
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
    this.setColour("#666600");
    this.setTooltip("Drift left - front wheels turn while rear push forward");
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
    this.setColour("#666600");
    this.setTooltip("Drift right - front wheels turn while rear push forward");
    this.setHelpUrl("");
  }
};

// Individual Wheel Control

Blockly.Blocks['ils_car_wheel_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎡 Set Car Wheel Speed");
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
    this.setColour("#666600");
    this.setTooltip("Control individual wheel speed. Negative = reverse");
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
    this.setColour("#666600");
    this.setTooltip("Calibrate servo pulse range. Default: 500-2500 microseconds");
    this.setHelpUrl("");
  }
};