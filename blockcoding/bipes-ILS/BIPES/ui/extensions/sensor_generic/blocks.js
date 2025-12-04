// ========== DIGITAL SENSOR BLOCKS ==========

Blockly.Blocks['digital_sensor_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Setup Digital Sensor");
    this.appendValueInput("PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Signal pin");
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sensor ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Setup digital sensor (motion, touch, tilt, etc.)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['digital_sensor_read'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("📡 Digital Value from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read digital sensor value (0 or 1)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['digital_sensor_is_active'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("✓ Digital Sensor");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("is active?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if digital sensor is active (detected/triggered)");
    this.setHelpUrl("");
  }
};

// ========== ANALOG SENSOR BLOCKS ==========

Blockly.Blocks['analog_sensor_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Setup Analog Sensor (Pot)");
    this.appendValueInput("PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Analog pin (32-39)");
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sensor ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Setup analog sensor (light, sound, potentiometer, etc.)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['analog_sensor_read'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("📊 Analog Value from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read analog sensor raw value (0-4095)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['analog_sensor_read_percent'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("📊 Analog % from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read analog sensor as percentage (0-100%)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['analog_sensor_threshold'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("📊 Analog Sensor");
    this.appendValueInput("THRESHOLD")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("above threshold");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if analog value is above threshold");
    this.setHelpUrl("");
  }
};

// ========== DUAL SENSOR BLOCKS ==========

Blockly.Blocks['dual_sensor_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔀 Setup Dual Sensor");
    this.appendValueInput("DIGITAL_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Digital pin");
    this.appendValueInput("ANALOG_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Analog pin (32-39)");
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sensor ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Setup dual sensor (soil moisture, gas sensor, etc.)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dual_sensor_read_digital'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔀 Dual Digital from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read digital value from dual sensor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dual_sensor_read_analog'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔀 Dual Analog from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read analog value from dual sensor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dual_sensor_is_detected'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔀 Dual Sensor");
    this.appendValueInput("THRESHOLD")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("detected (threshold)");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Smart detection using both digital and analog readings");
    this.setHelpUrl("");
  }
};