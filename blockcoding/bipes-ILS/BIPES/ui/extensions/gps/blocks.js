// GPS (Global Positioning System) Sensor Blocks

Blockly.Blocks['gps_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛰️ Setup ILS GPS");
    this.appendValueInput("TX_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("TX pin (to GPS RX)");
    this.appendValueInput("RX_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RX pin (from GPS TX)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Setup GPS module with UART communication");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Update GPS data");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Read and process GPS data (call in loop)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_has_fix'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛰️ Has GPS fix?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if GPS has found satellites and location");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_latitude'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Latitude (decimal)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get latitude in decimal degrees");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_longitude'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Longitude (decimal)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get longitude in decimal degrees");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_latitude_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Latitude (formatted)");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get latitude as formatted string (e.g., '40 26.7672 N')");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_longitude_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Longitude (formatted)");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get longitude as formatted string (e.g., '73 58.3720 W')");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_altitude'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⛰️ Altitude (meters)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get altitude above sea level in meters");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚗 Speed")
        .appendField(new Blockly.FieldDropdown([
          ["km/h", "kph"],
          ["mph", "mph"],
          ["knots", "knot"]
        ]), "UNIT");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get current speed in selected unit");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_course'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭 Course (degrees)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get direction of travel in degrees (0-360)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭 Compass direction");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get direction as compass point (N, NE, E, SE, S, SW, W, NW)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_time_hour'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🕐 Hour (UTC)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get current hour in UTC (0-23)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_time_minute'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🕐 Minute");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get current minute (0-59)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_time_second'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🕐 Second");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get current second (0-59)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_date_day'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📅 Day");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get day of month (1-31)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_date_month'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📅 Month");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get month (1-12)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_date_year'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📅 Year");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get year (2-digit, e.g., 24 for 2024)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_date_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📅 Date as")
        .appendField(new Blockly.FieldDropdown([
          ["DD/MM/YYYY", "s_dmy"],
          ["MM/DD/YYYY", "s_mdy"],
          ["Long format", "long"]
        ]), "FORMAT");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get formatted date string");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_satellites'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛰️ Satellites in use");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get number of satellites used for fix");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['gps_hdop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 HDOP (accuracy)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get Horizontal Dilution of Precision (lower = better, <5 is good)");
    this.setHelpUrl("");
  }
};