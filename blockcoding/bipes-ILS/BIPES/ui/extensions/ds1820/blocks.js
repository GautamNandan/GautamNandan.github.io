// DS1820 Temperature Sensor Blocks

Blockly.Blocks['ds1820_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️ Setup ILS Temperature Sensor");
    this.appendValueInput("DATA_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Data pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Setup DS1820 temperature sensor on specified pin");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ds1820_unit_dropdown'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["Celsius (°C)", "C"],
          ["Fahrenheit (°F)", "F"],
          ["Kelvin (K)", "K"]
        ]), "UNIT");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Select temperature unit");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ds1820_read_temp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️ Read temperature");
    this.appendValueInput("UNIT")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Unit");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read temperature from first sensor in selected unit");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ds1820_convert_temp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏱️ Trigger temperature reading");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Start temperature conversion (wait before reading)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ds1820_scan_devices'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔍 Scan for sensors");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Scan and detect all connected DS1820 sensors");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ds1820_count_devices'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔢 Number of sensors");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get count of connected sensors");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ds1820_read_temp_by_index'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌡️ Read sensor");
    this.appendValueInput("INDEX")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sensor number");
    this.appendValueInput("UNIT")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Unit");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Read temperature from specific sensor by index (0, 1, 2...)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ds1820_get_rom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔖 Get sensor ID");
    this.appendValueInput("INDEX")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sensor number");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get unique ROM address of sensor");
    this.setHelpUrl("");
  }
};