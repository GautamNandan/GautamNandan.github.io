// Matrix Keypad Code Generators
Blockly.Python['keypad_pinout'] = function(block) {
	return '';
}

Blockly.Python['keypad_init_4x3'] = function(block) {
  var row1 = Blockly.Python.valueToCode(block, 'ROW1_PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var row2 = Blockly.Python.valueToCode(block, 'ROW2_PIN', Blockly.Python.ORDER_ATOMIC) || '12';
  var row3 = Blockly.Python.valueToCode(block, 'ROW3_PIN', Blockly.Python.ORDER_ATOMIC) || '14';
  var row4 = Blockly.Python.valueToCode(block, 'ROW4_PIN', Blockly.Python.ORDER_ATOMIC) || '27';
  var col1 = Blockly.Python.valueToCode(block, 'COL1_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var col2 = Blockly.Python.valueToCode(block, 'COL2_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var col3 = Blockly.Python.valueToCode(block, 'COL3_PIN', Blockly.Python.ORDER_ATOMIC) || '33';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_keypad'] = 'from ils import keypad';
  
  var row_pins = '[' + row1 + ', ' + row2 + ', ' + row3 + ', ' + row4 + ']';
  var col_pins = '[' + col1 + ', ' + col2 + ', ' + col3 + ']';
  var keys = '[["1","2","3"],["4","5","6"],["7","8","9"],["*","0","#"]]';
  
  Blockly.Python.definitions_['keypad_obj'] = 'kp = keypad.Keypad(' + row_pins + ', ' + col_pins + ', ' + keys + ')';
  
  var code = '';
  return code;
};

Blockly.Python['keypad_init_4x4'] = function(block) {
  var row1 = Blockly.Python.valueToCode(block, 'ROW1_PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var row2 = Blockly.Python.valueToCode(block, 'ROW2_PIN', Blockly.Python.ORDER_ATOMIC) || '12';
  var row3 = Blockly.Python.valueToCode(block, 'ROW3_PIN', Blockly.Python.ORDER_ATOMIC) || '14';
  var row4 = Blockly.Python.valueToCode(block, 'ROW4_PIN', Blockly.Python.ORDER_ATOMIC) || '27';
  var col1 = Blockly.Python.valueToCode(block, 'COL1_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var col2 = Blockly.Python.valueToCode(block, 'COL2_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var col3 = Blockly.Python.valueToCode(block, 'COL3_PIN', Blockly.Python.ORDER_ATOMIC) || '33';
  var col4 = Blockly.Python.valueToCode(block, 'COL4_PIN', Blockly.Python.ORDER_ATOMIC) || '32';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_keypad'] = 'from ils import keypad';
  
  var row_pins = '[' + row1 + ', ' + row2 + ', ' + row3 + ', ' + row4 + ']';
  var col_pins = '[' + col1 + ', ' + col2 + ', ' + col3 + ', ' + col4 + ']';
  var keys = '[["1","2","3","A"],["4","5","6","B"],["7","8","9","C"],["*","0","#","D"]]';
  
  Blockly.Python.definitions_['keypad_obj'] = 'kp = keypad.Keypad(' + row_pins + ', ' + col_pins + ', ' + keys + ')';
  
  var code = '';
  return code;
};

Blockly.Python['keypad_init_3x3'] = function(block) {
  var row1 = Blockly.Python.valueToCode(block, 'ROW1_PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var row2 = Blockly.Python.valueToCode(block, 'ROW2_PIN', Blockly.Python.ORDER_ATOMIC) || '12';
  var row3 = Blockly.Python.valueToCode(block, 'ROW3_PIN', Blockly.Python.ORDER_ATOMIC) || '14';
  var col1 = Blockly.Python.valueToCode(block, 'COL1_PIN', Blockly.Python.ORDER_ATOMIC) || '26';
  var col2 = Blockly.Python.valueToCode(block, 'COL2_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  var col3 = Blockly.Python.valueToCode(block, 'COL3_PIN', Blockly.Python.ORDER_ATOMIC) || '33';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_keypad'] = 'from ils import keypad';
  
  var row_pins = '[' + row1 + ', ' + row2 + ', ' + row3 + ']';
  var col_pins = '[' + col1 + ', ' + col2 + ', ' + col3 + ']';
  var keys = '[["1","2","3"],["4","5","6"],["7","8","9"]]';
  
  Blockly.Python.definitions_['keypad_obj'] = 'kp = keypad.Keypad(' + row_pins + ', ' + col_pins + ', ' + keys + ')';
  
  var code = '';
  return code;
};

Blockly.Python['keypad_init_custom'] = function(block) {
  var row_pins_str = block.getFieldValue('ROW_PINS');
  var col_pins_str = block.getFieldValue('COL_PINS');
  var keys_str = block.getFieldValue('KEYS');

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_keypad'] = 'from ils import keypad';
  
  // Convert comma-separated strings to lists
  var row_pins = '[' + row_pins_str + ']';
  var col_pins = '[' + col_pins_str + ']';
  
  // Parse keys into 2D array based on row/col counts
  var keys_array = keys_str.split(',').map(k => '"' + k.trim() + '"');
  var col_count = col_pins_str.split(',').length;
  var keys_2d = '[';
  for (var i = 0; i < keys_array.length; i += col_count) {
    if (i > 0) keys_2d += ',';
    keys_2d += '[' + keys_array.slice(i, i + col_count).join(',') + ']';
  }
  keys_2d += ']';
  
  Blockly.Python.definitions_['keypad_obj'] = 'kp = keypad.Keypad(' + row_pins + ', ' + col_pins + ', ' + keys_2d + ')';
  
  var code = '';
  return code;
};

Blockly.Python['keypad_get_key'] = function(block) {
  var code = 'kp.get_key()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['keypad_wait_for_key'] = function(block) {
  var code = 'kp.wait_for_key()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['keypad_is_key_pressed'] = function(block) {
  var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'kp.is_key_pressed(' + key + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['keypad_on_key_press'] = function(block) {
  var statements_do = Blockly.Python.statementToCode(block, 'DO');
  
  var code = 'key = kp.get_key()  # Non-blocking\n';
  code += 'if key:\n';
  code += Blockly.Python.INDENT + statements_do;
  if (!statements_do.trim()) {
    code += Blockly.Python.INDENT + 'pass\n';
  }
  code += 'await uasyncio.sleep_ms(50)  # Small delay\n';
  return code;
};

Blockly.Python['keypad_on_specific_key'] = function(block) {
  var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC) || '""';
  var statements_do = Blockly.Python.statementToCode(block, 'DO');
  
  var code = 'if kp.is_key_pressed(' + key + '):\n';
  code += statements_do;
  if (!statements_do.trim()) {
    code += Blockly.Python.INDENT + 'pass\n';
  }
  code += 'await uasyncio.sleep_ms(10)  # Small delay for async\n';
  return code;
};

Blockly.Python['keypad_get_number'] = function(block) {
  var max_digits = Blockly.Python.valueToCode(block, 'MAX_DIGITS', Blockly.Python.ORDER_ATOMIC) || '4';
  
  var code = 'kp.get_number(' + max_digits + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['keypad_get_password'] = function(block) {
  var length = Blockly.Python.valueToCode(block, 'LENGTH', Blockly.Python.ORDER_ATOMIC) || '4';
  
  var code = 'kp.get_password(' + length + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['keypad_set_debounce'] = function(block) {
  var delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var code = 'kp.set_debounce(' + delay + ')\n';
  return code;
};