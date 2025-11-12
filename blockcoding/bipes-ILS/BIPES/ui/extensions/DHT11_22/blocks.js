// DHT11/DHT22 Humidity and Temperature Sensor Blocks

Blockly.Blocks['dht_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️💧 Setup Humidity Sensor");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/DHT11_22/icon.png",
          55,
          55,
          "*"));
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sensor type")
        .appendField(new Blockly.FieldDropdown([
          ["DHT11", "DHT11"],
          ["DHT22", "DHT22"]
        ]), "SENSOR_TYPE");
    this.appendValueInput("DATA_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Data pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Setup DHT11 or DHT22 temperature and humidity sensor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dht_temp_unit_dropdown'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["Celsius (°C)", "C"],
          ["Fahrenheit (°F)", "F"]
        ]), "UNIT");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Select temperature unit");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dht_read_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Read DHT sensor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Measure temperature and humidity (must call before reading values)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dht_read_temperature'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️ Temperature");
    this.appendValueInput("UNIT")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Unit");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get last temperature reading in selected unit");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dht_read_humidity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💧 Humidity (%)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get last humidity reading as percentage");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dht_heat_index'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔥 Heat Index");
    this.appendValueInput("UNIT")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Unit");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Calculate heat index (how hot it feels with humidity)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dht_dew_point'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💦 Dew Point");
    this.appendValueInput("UNIT")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Unit");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Calculate dew point (temperature where moisture condenses)");
    this.setHelpUrl("");
  }
};