// MAX30100 Pulse Oximeter and Heart Rate Sensor Blocks

Blockly.Blocks['max30100_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("❤️ Setup Heart Sensor");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/max30100/icon.png",
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
    this.setTooltip("Setup MAX30100 pulse oximeter and heart rate sensor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_read_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Read heart sensor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Read latest data from sensor (call before getting values)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_get_red'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💓 Red LED value");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get red LED sensor reading (for heart rate)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_get_ir'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🩸 Infrared LED value");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get infrared LED sensor reading (for SpO2)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_heart_rate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("❤️ Heart rate (BPM)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get calculated heart rate in beats per minute");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_spo2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🫁 Blood oxygen (SpO2 %)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get blood oxygen saturation percentage (95-100% is normal)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_temperature'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️ Sensor temperature (°C)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get MAX30100 internal temperature in Celsius");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_set_mode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Set mode to")
        .appendField(new Blockly.FieldDropdown([
          ["Heart Rate only", "HR"],
          ["Heart Rate + SpO2", "SPO2"]
        ]), "MODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set sensor mode (HR only is faster, SPO2 measures both)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['max30100_set_led_current'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 Set LED brightness");
    this.appendValueInput("RED_CURRENT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Red LED (mA)");
    this.appendValueInput("IR_CURRENT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IR LED (mA)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set LED current in mA (0, 4.4, 7.6, 11, 14.2, 17.4, 20.8, 24, 27.1, 30.6, 33.8, 37, 40.2, 43.6, 46.8, 50)");
    this.setHelpUrl("");
  }
};