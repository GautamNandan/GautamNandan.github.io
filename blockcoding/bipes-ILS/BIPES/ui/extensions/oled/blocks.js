// A1. INITIALIZE OLED BLOCK (IMPROVED - with display size presets)
Blockly.Blocks['oled_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🖥️ Initialize OLED display");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/oled/icon.png",
          155,
          105,
          "*"));		
    this.appendDummyInput()
        .appendField("Display Size")
		.setAlign(Blockly.ALIGN_RIGHT)		
        .appendField(new Blockly.FieldDropdown([
          ["128x64 (0.96\")", "128,64"],
          ["128x32 (0.91\")", "128,32"],
          ["64x48", "64,48"],
          ["Custom", "CUSTOM"]
        ]), "DISPLAY_SIZE");
    this.appendValueInput("SCL_PIN")
        .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("SCL Pin");
    this.appendValueInput("SDA_PIN")
        .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("SDA Pin");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Initialize the OLED display with I2C pins (default: 128x64)");
    this.setHelpUrl("");
  }
};

// A1b. INITIALIZE OLED CUSTOM SIZE (for custom dimensions)
Blockly.Blocks['oled_init_custom'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🖥️ Initialize OLED custom size");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/oled/icon.png",
          155,
          105,
          "*"));			
    this.appendValueInput("WIDTH")
        .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("Width");
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("Height");
    this.appendValueInput("SCL_PIN")
        .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("SCL Pin");
    this.appendValueInput("SDA_PIN")
        .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)		
        .appendField("SDA Pin");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Initialize OLED with custom dimensions");
    this.setHelpUrl("");
  }
};

// A4. CLEAR DISPLAY BLOCK
Blockly.Blocks['oled_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🗑️ Clear display");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Clear all content from display");
    this.setHelpUrl("");
  }
};

// A5. SHOW/UPDATE DISPLAY BLOCK
Blockly.Blocks['oled_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 Update display");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Update display to show changes");
    this.setHelpUrl("");
  }
};

// A6. DISPLAY TEXT BLOCK (IMPROVED - with value inputs)
Blockly.Blocks['oled_text'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("📝 Display text at");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Display text at specified position");
    this.setHelpUrl("");
  }
};


// A7. DRAW PIXEL BLOCK (IMPROVED)
Blockly.Blocks['oled_pixel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬛ Draw pixel");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("color")
        .appendField(new Blockly.FieldDropdown([
          ["white", "1"],
          ["black", "0"]
        ]), "COLOR");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Draw a single pixel");
    this.setHelpUrl("");
  }
};

// A8. DRAW LINE BLOCK (IMPROVED)
Blockly.Blocks['oled_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📏 Draw line from");
    this.appendValueInput("X1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x1");
    this.appendValueInput("Y1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y1");
    this.appendValueInput("X2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x2");
    this.appendValueInput("Y2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y2");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Draw a line between two points");
    this.setHelpUrl("");
  }
};

// A9. DRAW RECTANGLE BLOCK (IMPROVED)
// DRAW RECTANGLE BLOCK
Blockly.Blocks['oled_rect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("▭ Draw rectangle");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("at x");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.appendValueInput("WIDTH")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("width");
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("height");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("filled")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "FILLED");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Draw a rectangle");
    this.setHelpUrl("");
  }
};

// DRAW CIRCLE BLOCK
Blockly.Blocks['oled_circle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⭕ Draw circle");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("at x");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("radius");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("filled")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "FILLED");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Draw a circle");
    this.setHelpUrl("");
  }
};

// DRAW TRIANGLE BLOCK
Blockly.Blocks['oled_triangle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔺 Draw triangle");
    this.appendValueInput("X1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x1");
    this.appendValueInput("Y1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y1");
    this.appendValueInput("X2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x2");
    this.appendValueInput("Y2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y2");
    this.appendValueInput("X3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x3");
    this.appendValueInput("Y3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y3");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("filled")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "FILLED");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Draw a triangle with three points");
    this.setHelpUrl("");
  }
};


// A12. INVERT DISPLAY BLOCK
Blockly.Blocks['oled_invert'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔳 Invert display")
        .appendField(new Blockly.FieldDropdown([
          ["on", "1"],
          ["off", "0"]
        ]), "INVERT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Invert all colors on display");
    this.setHelpUrl("");
  }
};

// A13. SET CONTRAST BLOCK (IMPROVED)
Blockly.Blocks['oled_contrast'] = {
  init: function() {
    this.appendValueInput("CONTRAST")
        .setCheck("Number")
        .appendField("💡 Set contrast");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Set display brightness (0-255)");
    this.setHelpUrl("");
  }
};

// A14. SCROLL DISPLAY BLOCK (IMPROVED)
Blockly.Blocks['oled_scroll'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬅️ Scroll display");
    this.appendValueInput("DX")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dx");
    this.appendValueInput("DY")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dy");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Scroll the display content");
    this.setHelpUrl("");
  }
};

// ============================================================================
// SECTION B: TANK DRAWING BLOCKS (IMPROVED WITH PEN CONTROL)
// ============================================================================

// B1. CREATE TANK BLOCK (IMPROVED - with value inputs)
Blockly.Blocks['tank_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎨 Create tank at");	  
    this.appendValueInput("XPOS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x:");
    this.appendValueInput("YPOS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("facing")
        .appendField(new Blockly.FieldDropdown([
          ["right (0°)", "0"],
          ["down (90°)", "90"],
          ["left (180°)", "180"],
          ["up (270°)", "270"]
        ]), "DIRECTION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Create a tank at the specified position and direction");
    this.setHelpUrl("");
  }
};

// B2. PEN DOWN BLOCK (NEW!)
Blockly.Blocks['tank_pen_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🖊️ Pen down");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Put pen down - tank will draw when moving");
    this.setHelpUrl("");
  }
};

// B3. PEN UP BLOCK (NEW!)
Blockly.Blocks['tank_pen_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✏️ Pen up");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Lift pen - tank will move without drawing");
    this.setHelpUrl("");
  }
};

// B4. MOVE FORWARD/BACKWARD BLOCK (IMPROVED - with value input)
Blockly.Blocks['tank_move'] = {
  init: function() {
    this.appendValueInput("STEPS")
        .setCheck("Number")
        .appendField("🚗 Move")
        .appendField(new Blockly.FieldDropdown([
          ["forward", "1"],
          ["backward", "-1"]
        ]), "DIRECTION");
    this.appendDummyInput()
        .appendField("steps");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Move the tank forward or backward (respects pen state)");
    this.setHelpUrl("");
  }
};

// B5. TURN LEFT/RIGHT BLOCK (IMPROVED - with value input)
Blockly.Blocks['tank_turn'] = {
  init: function() {
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("↻ Turn")
        .appendField(new Blockly.FieldDropdown([
          ["right", "1"],
          ["left", "-1"]
        ]), "DIRECTION");
    this.appendDummyInput()
        .appendField("degrees");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Turn the tank left or right by specified degrees");
    this.setHelpUrl("");
  }
};

// B6. TURN PRESET ANGLES (for beginners)
Blockly.Blocks['tank_turn_preset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↻ Turn to preset angle")
        .appendField(new Blockly.FieldDropdown([
          ["right", "1"],
          ["left", "-1"]
        ]), "DIRECTION")
        .appendField(new Blockly.FieldDropdown([
          ["45°", "45"],
          ["60°", "60"],
          ["90°", "90"],
          ["120°", "120"],
          ["144°", "144"],
          ["180°", "180"]
        ]), "ANGLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Turn the tank by a preset angle");
    this.setHelpUrl("");
  }
};

// B7. POINT IN DIRECTION BLOCK (IMPROVED - with value input option)
Blockly.Blocks['tank_orient'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭 Point in direction")
        .appendField(new Blockly.FieldDropdown([
          ["right (0°)", "0"],
          ["down (90°)", "90"],
          ["left (180°)", "180"],
          ["up (270°)", "270"]
        ]), "DIRECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Point the tank in an absolute direction");
    this.setHelpUrl("");
  }
};

// B8. POINT TO ANGLE (custom angle)
Blockly.Blocks['tank_orient_custom'] = {
  init: function() {
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("🧭 Point to angle");
    this.appendDummyInput()
        .appendField("degrees");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Point the tank to a custom angle");
    this.setHelpUrl("");
  }
};

// B9. GO TO POSITION BLOCK (IMPROVED)
Blockly.Blocks['tank_goto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍 Go to");
    this.appendValueInput("XPOS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x");
    this.appendValueInput("YPOS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Jump to specified coordinates");
    this.setHelpUrl("");
  }
};


// B10. GO HOME BLOCK
Blockly.Blocks['tank_home'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🏠 Go to home (0, 0)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Return tank to origin (0, 0)");
    this.setHelpUrl("");
  }
};

// B11. GO TO CENTER BLOCK
Blockly.Blocks['tank_centre'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⊙ Go to center of screen");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Move tank to center of screen");
    this.setHelpUrl("");
  }
};

// B12. DRAW SHAPE BLOCK (IMPROVED)
Blockly.Blocks['tank_draw_shape'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬟ Draw")
        .appendField(new Blockly.FieldDropdown([
          ["square", "SQUARE"],
          ["triangle", "TRIANGLE"],
          ["pentagon", "PENTAGON"],
          ["hexagon", "HEXAGON"],
          ["octagon", "OCTAGON"],
          ["star (5-point)", "STAR5"],
          ["star (8-point)", "STAR8"]
        ]), "SHAPE");
    this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("with size");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#cc0000');
    this.setTooltip("Draw a preset shape");
    this.setHelpUrl("");
  }
};

// B13. GET X POSITION BLOCK (Reporter)
Blockly.Blocks['tank_get_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tank x position");
    this.setOutput(true, "Number");
    this.setColour('#cc0000');
    this.setTooltip("Get current X position of tank");
    this.setHelpUrl("");
  }
};

// B14. GET Y POSITION BLOCK (Reporter)
Blockly.Blocks['tank_get_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tank y position");
    this.setOutput(true, "Number");
    this.setColour('#cc0000');
    this.setTooltip("Get current Y position of tank");
    this.setHelpUrl("");
  }
};

// B15. GET DIRECTION BLOCK (Reporter)
Blockly.Blocks['tank_get_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tank direction");
    this.setOutput(true, "Number");
    this.setColour('#cc0000');
    this.setTooltip("Get current direction of tank (0-360°)");
    this.setHelpUrl("");
  }
};