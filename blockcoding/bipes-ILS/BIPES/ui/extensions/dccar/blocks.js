// DC Motor Car Blocks - L298N and DRV8833 Drivers (Separated)
// Color: #9999ff

Blockly.Blocks['ils_dc_car_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚗 Setup DC Motor Car");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("configuration")
        .appendField(new Blockly.FieldDropdown([
          ["4 Wheels", "0"],
          ["2 Wheels + Castor", "1"]
        ]), "CONFIG");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("driver")
        .appendField(new Blockly.FieldDropdown([
          ["L298N", "0"],
          ["DRV8833", "1"]
        ]), "DRIVER");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Initialize DC motor car. Choose configuration and driver type");
    this.setHelpUrl("");
  }
};

// L298N Driver - 4 Wheel Setup
Blockly.Blocks['ils_dc_car_set_pins_l298n_4wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set L298N Pins (4-Wheel)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Left Motor");
    this.appendValueInput("FL_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ENA");
    this.appendValueInput("FL_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput("FL_PIN3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Right Motor");
    this.appendValueInput("FR_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ENA");
    this.appendValueInput("FR_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput("FR_PIN3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Left Motor");
    this.appendValueInput("RL_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ENB");
    this.appendValueInput("RL_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput("RL_PIN3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Right Motor");
    this.appendValueInput("RR_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ENB");
    this.appendValueInput("RR_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput("RR_PIN3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Set pins for L298N driver in 4-wheel configuration. Each motor uses 3 pins (ENA/ENB, IN1/IN3, IN2/IN4)");
    this.setHelpUrl("");
  }
};

// L298N Driver - 2 Wheel Setup
Blockly.Blocks['ils_dc_car_set_pins_l298n_2wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set L298N Pins (2-Wheel)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Left Motor");
    this.appendValueInput("LEFT_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ENA");
    this.appendValueInput("LEFT_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput("LEFT_PIN3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Right Motor");
    this.appendValueInput("RIGHT_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ENB");
    this.appendValueInput("RIGHT_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput("RIGHT_PIN3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Set pins for L298N driver in 2-wheel configuration. Each motor uses 3 pins (ENA/ENB, IN1/IN3, IN2/IN4)");
    this.setHelpUrl("");
  }
};

// DRV8833 Driver - 4 Wheel Setup
Blockly.Blocks['ils_dc_car_set_pins_drv8833_4wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set DRV8833 Pins (4-Wheel)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Left Motor");
    this.appendValueInput("FL_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput("FL_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Front Right Motor");
    this.appendValueInput("FR_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput("FR_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Left Motor");
    this.appendValueInput("RL_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput("RL_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rear Right Motor");
    this.appendValueInput("RR_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput("RR_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Set pins for DRV8833 driver in 4-wheel configuration. Each motor uses 2 pins (IN1/IN3, IN2/IN4)");
    this.setHelpUrl("");
  }
};

// DRV8833 Driver - 2 Wheel Setup
Blockly.Blocks['ils_dc_car_set_pins_drv8833_2wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set DRV8833 Pins (2-Wheel)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Left Motor");
    this.appendValueInput("LEFT_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput("LEFT_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Right Motor");
    this.appendValueInput("RIGHT_PIN1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput("RIGHT_PIN2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Set pins for DRV8833 driver in 2-wheel configuration. Each motor uses 2 pins (IN1/IN3, IN2/IN4)");
    this.setHelpUrl("");
  }
};

// Basic Movement Blocks (unchanged)

Blockly.Blocks['ils_dc_car_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬆️ DC Car Move Forward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Move the DC motor car forward at specified speed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_dc_car_backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬇️ DC Car Move Backward");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Move the DC motor car backward at specified speed");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_dc_car_turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↪️ DC Car Turn Left");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Rotate the DC motor car left in place");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_dc_car_turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↩️ DC Car Turn Right");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (0-100)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Rotate the DC motor car right in place");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_dc_car_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 DC Car Stop");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Stop all DC motors immediately");
    this.setHelpUrl("");
  }
};

// Advanced Movement Blocks (unchanged)

Blockly.Blocks['ils_dc_car_curve_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 DC Car Curve Left");
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

Blockly.Blocks['ils_dc_car_curve_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔃 DC Car Curve Right");
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

Blockly.Blocks['ils_dc_car_drift_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💨 DC Car Drift Left");
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

Blockly.Blocks['ils_dc_car_drift_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💨 DC Car Drift Right");
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

// Individual Wheel Control (unchanged)

Blockly.Blocks['ils_dc_car_wheel_speed_4wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎡 Set DC Wheel Speed (4-Wheel)");
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
    this.setTooltip("Control individual DC motor speed in 4-wheel mode. Negative = reverse");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ils_dc_car_wheel_speed_2wheel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎡 Set DC Wheel Speed (2-Wheel)");
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
    this.setTooltip("Control individual DC motor speed in 2-wheel mode. Negative = reverse");
    this.setHelpUrl("");
  }
};

// Configuration Block (unchanged)

Blockly.Blocks['ils_dc_car_set_mirror'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Set DC Car Mirror Mode");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mirror left motors")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "MIRROR_LEFT");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mirror right motors")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "MIRROR_RIGHT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9999ff");
    this.setTooltip("Enable mirror mode if motors are mounted in opposite directions");
    this.setHelpUrl("");
  }
};