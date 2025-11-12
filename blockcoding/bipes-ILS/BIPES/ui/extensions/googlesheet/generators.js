// ILS Google Sheets Code Generators

// Initialize Google Sheets
Blockly.Python['ils_sheets_init'] = function(block) {
  var deploy_code = Blockly.Python.valueToCode(block, 'DEPLOY_CODE', Blockly.Python.ORDER_ATOMIC) || '""';
  var sheet_id = Blockly.Python.valueToCode(block, 'SHEET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  // Add imports
  Blockly.Python.definitions_['import_prequests'] = 'from ils.googlesheet import prequests';
  Blockly.Python.definitions_['import_ujson'] = 'import ujson';
  
  // Add post_data function
  Blockly.Python.definitions_['post_data'] = 'def post_data(row_data, deployment_code):\n' +
    '  request_data = ujson.dumps({"parameters": row_data})\n' +
    '  r = prequests.post("https://script.google.com/macros/s/" + deployment_code + "/exec", headers = {"content-type": "application/json"}, data = request_data)\n' +
    '  r.close()';
  
  // Initialize deployment code and row data for this sheet
  Blockly.Python.definitions_['deployment_code_' + sheet_id] = 'deployment_code_' + sheet_id + ' = ' + deploy_code;
  Blockly.Python.definitions_['row_data_' + sheet_id] = 'row_data_' + sheet_id + ' = {}';
  Blockly.Python.definitions_['cell_counter_' + sheet_id] = 'cell_counter_' + sheet_id + ' = 0';
  
  var code = '# ILS Google Sheet ' + sheet_id + ' initialized\n';
  return code;
};

// Add cell data
Blockly.Python['ils_sheets_add_cell'] = function(block) {
  var sheet_id = Blockly.Python.valueToCode(block, 'SHEET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'row_data_' + sheet_id + '["var" + str(cell_counter_' + sheet_id + ')] = ' + value + '\n';
  code += 'cell_counter_' + sheet_id + ' += 1\n';
  
  return code;
};

// Add number data
Blockly.Python['ils_sheets_add_number'] = function(block) {
  var sheet_id = Blockly.Python.valueToCode(block, 'SHEET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var code = 'row_data_' + sheet_id + '["var" + str(cell_counter_' + sheet_id + ')] = ' + value + '\n';
  code += 'cell_counter_' + sheet_id + ' += 1\n';
  
  return code;
};

// Post data to Google Sheets
Blockly.Python['ils_sheets_post_data'] = function(block) {
  var sheet_id = Blockly.Python.valueToCode(block, 'SHEET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  var code = 'post_data(row_data_' + sheet_id + ', deployment_code_' + sheet_id + ')\n';
  code += 'row_data_' + sheet_id + ' = {}\n';
  code += 'cell_counter_' + sheet_id + ' = 0\n';
  
  return code;
};

// Complete workflow: Send row with cells (compatible with old code)
Blockly.Python['ils_sheets_send_row'] = function(block) {
  var deploy_code = Blockly.Python.valueToCode(block, 'DEPLOY_CODE', Blockly.Python.ORDER_ATOMIC) || '""';
  var sheet_id = Blockly.Python.valueToCode(block, 'SHEET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  // Add imports
  Blockly.Python.definitions_['import_prequests'] = 'from ils.googlesheet import prequests';
  Blockly.Python.definitions_['import_ujson'] = 'import ujson';
  
  // Add post_data function
  Blockly.Python.definitions_['post_data'] = 'def post_data(row_data, deployment_code):\n' +
    '  request_data = ujson.dumps({"parameters": row_data})\n' +
    '  r = prequests.post("https://script.google.com/macros/s/" + deployment_code + "/exec", headers = {"content-type": "application/json"}, data = request_data)\n' +
    '  r.close()';
  
  // Initialize deployment code and row data for this sheet
  Blockly.Python.definitions_['deployment_code_' + sheet_id] = 'deployment_code_' + sheet_id + ' = ' + deploy_code;
  Blockly.Python.definitions_['row_data_' + sheet_id] = 'row_data_' + sheet_id + ' = {}';
  
  // Process cell values
  var cells_blocks = block.getInputTargetBlock('CELLS_VALUES');
  var row_data_def = '';
  var num_cell = 0;
  
  if (cells_blocks) {
    do {
      var cell_value = Blockly.Python.valueToCode(cells_blocks, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';
      row_data_def += '  row_data_' + sheet_id + '["var' + num_cell + '"] = ' + cell_value + '\n';
      num_cell++;
    } while (cells_blocks = cells_blocks.getNextBlock());
    
    Blockly.Python.definitions_['update_row_data_' + sheet_id] = 'def update_row_data_' + sheet_id + '():\n' + row_data_def;
  }
  
  var code = 'update_row_data_' + sheet_id + '()\n';
  code += 'post_data(row_data_' + sheet_id + ', deployment_code_' + sheet_id + ')\n';
  
  return code;
};

// Cell value block
Blockly.Python['ils_sheets_cell_value'] = function(block) {
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '""';
  // This block doesn't generate code directly, it's processed by the parent block
  return '';
};