Blockly.Blocks['bmp180_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️ Setup Pressure Sensor");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/bmp180/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("SDA_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SDA pin");
    this.appendValueInput("SCL_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SCL pin");
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sensor ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Initialize BMP180 temperature, pressure and altitude sensor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bmp180_read_temperature'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🌡️ Temperature (°C) from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read temperature in degrees Celsius");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bmp180_read_pressure'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔽 Pressure (Pa) from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read atmospheric pressure in Pascals");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bmp180_read_altitude'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("⛰️ Altitude (m) from sensor");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read altitude in meters (based on pressure and baseline)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bmp180_set_accuracy'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("⚙️ Set Sensor");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("accuracy to")
        .appendField(new Blockly.FieldDropdown([
          ["Low (fast)", "0"],
          ["Standard", "1"],
          ["High", "2"],
          ["Ultra High (slow)", "3"]
        ]), "ACCURACY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set measurement accuracy. Higher accuracy is slower but more precise");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bmp180_set_baseline'] = {
  init: function() {
    this.appendValueInput("SENSOR_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("📍 Set Sensor");
    this.appendValueInput("BASELINE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("baseline pressure (Pa)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set baseline pressure for altitude calculation (default: 101325 Pa at sea level)");
    this.setHelpUrl("");
  }
};