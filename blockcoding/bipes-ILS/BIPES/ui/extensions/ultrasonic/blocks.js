// Ultrasonic Sensor Blocks

Blockly.Blocks['ultrasonic_init_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📏 Setup Ultrasonic");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/ultrasonic/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("TRIG_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Trigger pin");
    this.appendValueInput("ECHO_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Echo pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Initialize simple ultrasonic distance sensor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_init_rgb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📏 Setup Ultrasonic RGB");	  
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/ultrasonic/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("TRIG_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Trigger pin");
    this.appendValueInput("ECHO_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Echo pin");
    this.appendValueInput("RGB_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RGB LED pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Initialize ultrasonic sensor with built-in RGB LED");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_get_distance_cm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Ultrasonic distance (cm)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get distance in centimeters");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_get_distance_inch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Ultrasonic distance (inch)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get distance in inches");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_get_distance_mm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📐 Ultrasonic distance (mm)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get distance in millimeters");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_is_within_range'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 Ultrasonic within range?");
    this.appendValueInput("MIN_DISTANCE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("min (cm)");
    this.appendValueInput("MAX_DISTANCE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("max (cm)");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if distance is within range");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_is_closer_than'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔍 Ultrasonic closer than");
    this.appendValueInput("DISTANCE")
        .setCheck("Number")
        .appendField("(cm)?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if object is closer than distance");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_is_farther_than'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔍 Ultrasonic farther than");
    this.appendValueInput("DISTANCE")
        .setCheck("Number")
        .appendField("(cm)?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if object is farther than distance");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_rgb_set_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 Ultrasonic RGB set color");
    this.appendValueInput("RED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Red");
    this.appendValueInput("GREEN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Green");
    this.appendValueInput("BLUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Blue");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set RGB LED color (0-255 each)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_rgb_set_preset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌈 Ultrasonic RGB set")
        .appendField(new Blockly.FieldDropdown([
          ["Red", "RED"],
          ["Green", "GREEN"],
          ["Blue", "BLUE"],
          ["Yellow", "YELLOW"],
          ["Cyan", "CYAN"],
          ["Magenta", "MAGENTA"],
          ["White", "WHITE"],
          ["Orange", "ORANGE"],
          ["Purple", "PURPLE"],
          ["Pink", "PINK"]
        ]), "COLOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set RGB LED to preset color");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_rgb_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚫ Ultrasonic RGB off");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Turn off RGB LED");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_rgb_rainbow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌈 Ultrasonic RGB rainbow");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("speed (ms)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Show rainbow effect on RGB LED");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_set_timeout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚙️ Ultrasonic set timeout");
    this.appendValueInput("TIMEOUT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("microseconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set measurement timeout");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ultrasonic_get_raw_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏱️ Ultrasonic raw time (μs)");
    this.setOutput(true, "Number");
    this.setColour("#cc9933");
    this.setTooltip("Get raw echo time in microseconds");
    this.setHelpUrl("");
  }
};