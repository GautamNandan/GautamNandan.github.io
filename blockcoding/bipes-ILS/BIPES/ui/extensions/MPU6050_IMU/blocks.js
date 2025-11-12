// MPU6050 IMU (Accelerometer + Gyroscope) Sensor Blocks

Blockly.Blocks['mpu6050_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 Setup Motion Sensor");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/MPU6050_IMU/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("SCL_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SCL pin");
    this.appendValueInput("SDA_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SDA pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Setup MPU6050 6-axis motion sensor (I2C)");
    this.setHelpUrl("");
  }
};

// Accelerometer blocks
Blockly.Blocks['mpu6050_accel_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Acceleration X-axis");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get X-axis acceleration in m/s² (left/right)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_accel_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Acceleration Y-axis");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get Y-axis acceleration in m/s² (forward/back)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_accel_z'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Acceleration Z-axis");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get Z-axis acceleration in m/s² (up/down)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_accel_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 All accelerations (X,Y,Z)");
    this.setOutput(true, "Array");
    this.setColour("#cc9933");
    this.setTooltip("Get all three acceleration values as tuple");
    this.setHelpUrl("");
  }
};

// Gyroscope blocks
Blockly.Blocks['mpu6050_gyro_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Rotation X-axis");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get X-axis rotation speed in rad/s");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_gyro_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Rotation Y-axis");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get Y-axis rotation speed in rad/s");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_gyro_z'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Rotation Z-axis");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get Z-axis rotation speed in rad/s");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_gyro_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 All rotations (X,Y,Z)");
    this.setOutput(true, "Array");
    this.setColour("#cc9933");
    this.setTooltip("Get all three rotation values as tuple");
    this.setHelpUrl("");
  }
};

// Temperature block
Blockly.Blocks['mpu6050_temperature'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️ Sensor temperature (°C)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get MPU6050 internal temperature in Celsius");
    this.setHelpUrl("");
  }
};

// Kalman filtered angle blocks
Blockly.Blocks['mpu6050_pitch_kalman'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Pitch (Kalman filtered)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get pitch angle with Kalman filter (accurate, smooth)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_roll_kalman'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Roll (Kalman filtered)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get roll angle with Kalman filter (accurate, smooth)");
    this.setHelpUrl("");
  }
};

// Complementary filtered angle blocks
Blockly.Blocks['mpu6050_pitch_complementary'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Pitch (Complementary)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get pitch angle with complementary filter (fast)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu6050_roll_complementary'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Roll (Complementary)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get roll angle with complementary filter (fast)");
    this.setHelpUrl("");
  }
};

// Calibration block
Blockly.Blocks['mpu6050_calibrate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Calibrate sensor");
    this.appendValueInput("SAMPLES")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Samples");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Calibrate sensor (place flat, keep still). More samples = more accurate");
    this.setHelpUrl("");
  }
};