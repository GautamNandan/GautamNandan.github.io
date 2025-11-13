// ILS NeoPixel Code Generators for MicroPython

// ==================== SETUP ====================

Blockly.Python['neopixel_init'] = function(block) {
  var pin_value = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var num_leds = Blockly.Python.valueToCode(block, 'NUMBER', Blockly.Python.ORDER_ATOMIC) || '8';
  var strip_id = Blockly.Python.valueToCode(block, 'STRIP', Blockly.Python.ORDER_ATOMIC) || '1';

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_neopixel'] = 'from ils import neopixel';
  
  // Initialize strip dictionary if not exists
  if (!Blockly.Python.definitions_['neopixel_strips']) {
    Blockly.Python.definitions_['neopixel_strips'] = 'neopixel_strips = {}';
  }

  var code = `neopixel_strips[${strip_id}] = neopixel.NeoPixel(Pin(${pin_value}), ${num_leds})\n`;
  
  return code;
};


// ==================== COLOR CREATION ====================

Blockly.Python['neopixel_color_picker'] = function(block) {
  var color = block.getFieldValue('COLOR');
  
  // Convert hex to RGB using Tool function
  if (typeof Tool !== 'undefined' && Tool.HEX2RGB) {
    var rgb = Tool.HEX2RGB(color);
    var code = `(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  } else {
    // Fallback: manual hex to RGB conversion
    var r = parseInt(color.substr(1, 2), 16);
    var g = parseInt(color.substr(3, 2), 16);
    var b = parseInt(color.substr(5, 2), 16);
    var code = `(${r}, ${g}, ${b})`;
  }
  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['neopixel_color_rgb'] = function(block) {
  var red = Blockly.Python.valueToCode(block, 'RED', Blockly.Python.ORDER_ATOMIC) || '0';
  var green = Blockly.Python.valueToCode(block, 'GREEN', Blockly.Python.ORDER_ATOMIC) || '0';
  var blue = Blockly.Python.valueToCode(block, 'BLUE', Blockly.Python.ORDER_ATOMIC) || '0';

  // Style block with compiled values
  if (this.styleBlock) {
    this.styleBlock([red, green, blue]);
  }

  var code = `(${red}, ${green}, ${blue})`;
  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['neopixel_color_hsl'] = function(block) {
  var hue = Blockly.Python.valueToCode(block, 'HUE', Blockly.Python.ORDER_ATOMIC) || '0';
  var saturation = Blockly.Python.valueToCode(block, 'SATURATION', Blockly.Python.ORDER_ATOMIC) || '100';
  var lightness = Blockly.Python.valueToCode(block, 'LIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '50';

  // Add HSL to RGB conversion function
  Blockly.Python.definitions_['hsl_to_rgb'] = `def hsl_to_rgb(h, s, l):
    h, s, l = h / 360, s / 100, l / 100
    def hue2rgb(p, q, t):
        if t < 0: t += 1
        if t > 1: t -= 1
        if t < 1/6: return p + (q - p) * 6 * t
        if t < 1/2: return q
        if t < 2/3: return p + (q - p) * (2/3 - t) * 6
        return p
    if s == 0:
        r = g = b = l
    else:
        q = l * (1 + s) if l < 0.5 else l + s - l * s
        p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
    return (int(r * 255), int(g * 255), int(b * 255))`;

  // Style block with compiled values
  if (this.styleBlock) {
    this.styleBlock([hue, saturation, lightness]);
  }

  var code = `hsl_to_rgb(${hue}, ${saturation}, ${lightness})`;
  
  return [code, Blockly.Python.ORDER_NONE];
};

// ==================== LED CONTROL ====================

Blockly.Python['neopixel_set_pixel'] = function(block) {
  var strip_id = Blockly.Python.valueToCode(block, 'STRIP', Blockly.Python.ORDER_ATOMIC) || '1';
  var led_num = Blockly.Python.valueToCode(block, 'LED', Blockly.Python.ORDER_ATOMIC) || '0';
  var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC) || '(0, 0, 0)';

  var code = `neopixel_strips[${strip_id}][${led_num}] = ${color}\n`;
  
  return code;
};

Blockly.Python['neopixel_show'] = function(block) {
  var strip_id = Blockly.Python.valueToCode(block, 'STRIP', Blockly.Python.ORDER_ATOMIC) || '1';

  var code = `neopixel_strips[${strip_id}].write()\n`;
  
  return code;
};

// ==================== PATTERNS ====================

Blockly.Python['neopixel_fill_all'] = function(block) {
  var strip_id = Blockly.Python.valueToCode(block, 'STRIP', Blockly.Python.ORDER_ATOMIC) || '1';
  var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC) || '(0, 0, 0)';

  var code = `for i in range(len(neopixel_strips[${strip_id}])):\n`;
  code += `    neopixel_strips[${strip_id}][i] = ${color}\n`;
 
  return code;
};

Blockly.Python['neopixel_fill_range'] = function(block) {
  var strip_id = Blockly.Python.valueToCode(block, 'STRIP', Blockly.Python.ORDER_ATOMIC) || '1';
  var start = Blockly.Python.valueToCode(block, 'START', Blockly.Python.ORDER_ATOMIC) || '0';
  var end = Blockly.Python.valueToCode(block, 'END', Blockly.Python.ORDER_ATOMIC) || '7';
  var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC) || '(0, 0, 0)';

  var code = `for i in range(${start}, ${end} + 1):\n`;
  code += `    neopixel_strips[${strip_id}][i] = ${color}\n`;
 
  return code;
};

Blockly.Python['neopixel_clear'] = function(block) {
  var strip_id = Blockly.Python.valueToCode(block, 'STRIP', Blockly.Python.ORDER_ATOMIC) || '1';

  var code = `for i in range(len(neopixel_strips[${strip_id}])):\n`;
  code += `    neopixel_strips[${strip_id}][i] = (0, 0, 0)\n`;
  code += `neopixel_strips[${strip_id}].write()\n`;
  
  return code;
};

// ==================== BRIGHTNESS ====================

Blockly.Python['neopixel_brightness'] = function(block) {
  var strip_id = Blockly.Python.valueToCode(block, 'STRIP', Blockly.Python.ORDER_ATOMIC) || '1';
  var brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '50';

  // Add brightness helper function
  Blockly.Python.definitions_['neopixel_set_brightness'] = `def neopixel_set_brightness(strip, brightness):
    brightness = max(0, min(255, brightness))
    for i in range(len(strip)):
        r, g, b = strip[i]
        strip[i] = (
            int(r * brightness / 255),
            int(g * brightness / 255),
            int(b * brightness / 255)
        )`;

  var code = `neopixel_set_brightness(neopixel_strips[${strip_id}], ${brightness})\n`;
  code += `neopixel_strips[${strip_id}].write()\n`;
  
  return code;
};