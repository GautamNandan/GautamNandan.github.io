// Google Sheets Blocks
// Initialize Google Sheets connection
Blockly.Blocks['ils_sheets_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Setup Google Sheet");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/googlesheet/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("DEPLOY_CODE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Deployment Code");
    this.appendValueInput("SHEET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sheet ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Initialize connection to Google Sheets with deployment code");
    this.setHelpUrl("");
  }
};

// Add cell data (text)
Blockly.Blocks['ils_sheets_add_cell'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📝 Add Cell Data");
    this.appendValueInput("SHEET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sheet ID");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Add a cell value to the current row");
    this.setHelpUrl("");
  }
};

// Add number data
Blockly.Blocks['ils_sheets_add_number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔢 Add Number");
    this.appendValueInput("SHEET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sheet ID");
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Add a number value to the current row");
    this.setHelpUrl("");
  }
};

// Post data to Google Sheets
Blockly.Blocks['ils_sheets_post_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📤 Send Data to Sheet");
    this.appendValueInput("SHEET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sheet ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send all added cell data to Google Sheets");
    this.setHelpUrl("");
  }
};

// Complete workflow: Send row with cells (compatible with old code)
Blockly.Blocks['ils_sheets_send_row'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Send Row to Sheet");
    this.appendValueInput("DEPLOY_CODE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Deployment Code");
    this.appendValueInput("SHEET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Sheet ID");
    this.appendStatementInput("CELLS_VALUES")
        .setCheck("ils_cell_value")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Cell Values");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send a complete row of data to Google Sheets");
    this.setHelpUrl("");
  }
};

// Cell value block (stackable)
Blockly.Blocks['ils_sheets_cell_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📋 Cell");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Value");
    this.setPreviousStatement(true, "ils_cell_value");
    this.setNextStatement(true, "ils_cell_value");
    this.setColour("#336600");
    this.setTooltip("Add a cell value to the row. Chain multiple blocks together.");
    this.setHelpUrl("");
  }
};