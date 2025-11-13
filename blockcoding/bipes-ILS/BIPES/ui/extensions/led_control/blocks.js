// PWM LED Initialization
Blockly.Blocks['pwm_led_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 Setup LED with Brightness");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/led_control/led.png",
          55,
          55,
          "*"));
    this.appendValueInput("LED_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED pin");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED ID")
        .appendField(new Blockly.FieldNumber(1, 1, 10, 1), "LED_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set up LED with PWM brightness control");
    this.setHelpUrl("");
  }
};

// RGB LED Initialization
Blockly.Blocks['rgb_led_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌈 Setup RGB LED");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/led_control/rgb-led.png",
          55,
          55,
          "*"));
    this.appendValueInput("RED_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Red pin");
    this.appendValueInput("GREEN_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Green pin");
    this.appendValueInput("BLUE_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Blue pin");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Type")
        .appendField(new Blockly.FieldDropdown([
          ["Common Cathode", "CATHODE"],
          ["Common Anode", "ANODE"]
        ]), "LED_TYPE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RGB ID")
        .appendField(new Blockly.FieldNumber(1, 1, 10, 1), "RGB_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set up RGB LED (Common Cathode or Anode)");
    this.setHelpUrl("");
  }
};

// Three LED Initialization (R, G, Y)
Blockly.Blocks['three_led_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚦 Setup 3-LED Pattern");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/led_control/traffic_light.png",
          55,
          55,
          "*"));
    this.appendValueInput("RED_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Red pin");
    this.appendValueInput("YELLOW_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Yellow pin");
    this.appendValueInput("GREEN_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Green pin");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED Group ID")
        .appendField(new Blockly.FieldNumber(1, 1, 10, 1), "LED_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set up 3 LEDs (Red, Green, Yellow) for patterns");
    this.setHelpUrl("");
  }
};

// PWM LED Set Brightness
Blockly.Blocks['pwm_led_set_brightness'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 LED Set Brightness");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED ID");
    this.appendValueInput("BRIGHTNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Brightness (0-100)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set LED brightness (0=off, 100=full)");
    this.setHelpUrl("");
  }
};

// PWM LED Fade
Blockly.Blocks['pwm_led_fade'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✨ LED Fade");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED ID");
    this.appendValueInput("FROM_BRIGHTNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("From (0-100)");
    this.appendValueInput("TO_BRIGHTNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To (0-100)");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Duration (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Smoothly fade LED brightness");
    this.setHelpUrl("");
  }
};

// PWM LED Off
Blockly.Blocks['pwm_led_on_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💡 LED")
        .appendField(new Blockly.FieldDropdown([
          ["Turn OFF", "OFF"],
          ["Turn ON", "ON"]
        ]), "ACTION");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED ID");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Turn LED on or off");
    this.setHelpUrl("");
  }
};

// RGB LED Set Color
Blockly.Blocks['rgb_led_set_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎨 RGB Set Color");
    this.appendValueInput("RGB_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RGB ID");
    this.appendValueInput("RED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Red (0-100)");
    this.appendValueInput("GREEN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Green (0-100)");
    this.appendValueInput("BLUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Blue (0-100)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set RGB LED color with custom values");
    this.setHelpUrl("");
  }
};

// RGB LED Preset Colors
Blockly.Blocks['rgb_led_preset_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎨 RGB Preset Color");
    this.appendValueInput("RGB_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RGB ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color")
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
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Set RGB LED to a preset color");
    this.setHelpUrl("");
  }
};

// RGB LED Fade Colors
Blockly.Blocks['rgb_led_fade_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌟 RGB Color Fade");
    this.appendValueInput("RGB_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RGB ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Effect")
        .appendField(new Blockly.FieldDropdown([
          ["Rainbow Cycle", "RAINBOW"],
          ["Red to Green", "RED_GREEN"],
          ["Green to Blue", "GREEN_BLUE"],
          ["Blue to Red", "BLUE_RED"],
          ["Warm to Cool", "WARM_COOL"]
        ]), "EFFECT");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Duration (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Create smooth color transitions");
    this.setHelpUrl("");
  }
};

// RGB LED Off
Blockly.Blocks['rgb_led_on_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌈 RGB LED")
        .appendField(new Blockly.FieldDropdown([
          ["Turn OFF", "OFF"],
          ["Turn ON", "ON"]
        ]), "ACTION");
    this.appendValueInput("RGB_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RGB ID");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Turn RGB LED on or off");
    this.setHelpUrl("");
  }
};

// Three LED Traffic Light
Blockly.Blocks['three_led_traffic_light'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚦 Traffic Light Pattern");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED Group ID");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Each light (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Run traffic light sequence: Green→Yellow→Red");
    this.setHelpUrl("");
  }
};

// Three LED Chase
Blockly.Blocks['three_led_chase'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚡ LED Chase Pattern");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED Group ID");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed (ms)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Direction")
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "FORWARD"],
          ["Backward", "BACKWARD"],
          ["Bounce", "BOUNCE"]
        ]), "DIRECTION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("LEDs light up in sequence");
    this.setHelpUrl("");
  }
};

// Three LED Blink All
Blockly.Blocks['three_led_blink_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✨ All LEDs Blink");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED Group ID");
    this.appendValueInput("COUNT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Times");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Blink all 3 LEDs together");
    this.setHelpUrl("");
  }
};

// Three LED Individual Control
Blockly.Blocks['three_led_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎛️ Control Individual LEDs");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED Group ID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Red")
        .appendField(new Blockly.FieldDropdown([
          ["ON", "1"],
          ["OFF", "0"]
        ]), "RED_STATE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Yellow")
        .appendField(new Blockly.FieldDropdown([
          ["ON", "1"],
          ["OFF", "0"]
        ]), "YELLOW_STATE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Green")
        .appendField(new Blockly.FieldDropdown([
          ["ON", "1"],
          ["OFF", "0"]
        ]), "GREEN_STATE");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Control each LED individually");
    this.setHelpUrl("");
  }
};

// Three LED All Off
Blockly.Blocks['three_led_all_on_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚦 All LEDs")
        .appendField(new Blockly.FieldDropdown([
          ["Turn OFF", "OFF"],
          ["Turn ON", "ON"]
        ]), "ACTION");
    this.appendValueInput("LED_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("LED Group ID");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc0000");
    this.setTooltip("Turn all 3 LEDs on or off");
    this.setHelpUrl("");
  }
};// ========== DIGITAL SENSOR BLOCKS ==========

Blockly.Blocks['digital_sensor_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Setup Digital Sensor");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/sensor_generic/digital_icon.png",
          55,
          55,
          "*"));
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
    this.setTooltip("Check if digital sensor is active (detected/triggered)");
    this.setHelpUrl("");
  }
};

// ========== ANALOG SENSOR BLOCKS ==========

Blockly.Blocks['analog_sensor_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Setup Analog Sensor (Pot)");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/sensor_generic/analog_icon.png",
          55,
          55,
          "*"));
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
    this.setTooltip("Check if analog value is above threshold");
    this.setHelpUrl("");
  }
};

// ========== DUAL SENSOR BLOCKS ==========

Blockly.Blocks['dual_sensor_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔀 Setup Dual Sensor");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/sensor_generic/dual_icon.png",
          55,
          55,
          "*"));
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
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
    this.setColour("#cc0000");
    this.setTooltip("Smart detection using both digital and analog readings");
    this.setHelpUrl("");
  }
};