// RFID Reader Code Generators

Blockly.Python['rfid_init'] = function(block) {
  var sck_pin = Blockly.Python.valueToCode(block, 'SCK_PIN', Blockly.Python.ORDER_ATOMIC) || '18';
  var mosi_pin = Blockly.Python.valueToCode(block, 'MOSI_PIN', Blockly.Python.ORDER_ATOMIC) || '23';
  var miso_pin = Blockly.Python.valueToCode(block, 'MISO_PIN', Blockly.Python.ORDER_ATOMIC) || '19';
  var cs_pin = Blockly.Python.valueToCode(block, 'CS_PIN', Blockly.Python.ORDER_ATOMIC) || '5';
  var rst_pin = Blockly.Python.valueToCode(block, 'RST_PIN', Blockly.Python.ORDER_ATOMIC) || '22';

  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_spi'] = 'from machine import SPI';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_rfid'] = 'from ils import rfid';
  
  Blockly.Python.definitions_['rfid_spi'] = 'spi = SPI(2, baudrate=1000000, polarity=0, phase=0, sck=Pin(' + sck_pin + '), mosi=Pin(' + mosi_pin + '), miso=Pin(' + miso_pin + '))';
  Blockly.Python.definitions_['rfid_obj'] = 'reader = rfid.MFRC522(spi, Pin(' + cs_pin + '), Pin(' + rst_pin + '))';
  
  var code = '';
  return code;
};

Blockly.Python['rfid_card_present'] = function(block) {
  var code = 'reader.card_present()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_wait_for_card'] = function(block) {
  var timeout = Blockly.Python.valueToCode(block, 'TIMEOUT', Blockly.Python.ORDER_ATOMIC) || '5';
  
  var code = 'reader.wait_for_card(' + timeout + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_get_uid'] = function(block) {
  var code = 'reader.get_uid()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_get_uid_bytes'] = function(block) {
  var code = 'reader.get_uid_bytes()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_get_card_type'] = function(block) {
  var code = 'reader.get_card_type()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_is_card_uid'] = function(block) {
  var uid = Blockly.Python.valueToCode(block, 'UID', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'reader.is_card_uid(' + uid + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_uid_matches'] = function(block) {
  var uid1 = Blockly.Python.valueToCode(block, 'UID1', Blockly.Python.ORDER_ATOMIC) || '""';
  var uid2 = Blockly.Python.valueToCode(block, 'UID2', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'reader.uid_matches(' + uid1 + ', ' + uid2 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_read_block'] = function(block) {
  var block_num = Blockly.Python.valueToCode(block, 'BLOCK', Blockly.Python.ORDER_ATOMIC) || '8';
  
  var code = 'reader.read_block(' + block_num + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_write_block'] = function(block) {
  var block_num = Blockly.Python.valueToCode(block, 'BLOCK', Blockly.Python.ORDER_ATOMIC) || '8';
  var data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'reader.write_block(' + block_num + ', ' + data + ')\n';
  return code;
};

Blockly.Python['rfid_read_text'] = function(block) {
  var start_block = Blockly.Python.valueToCode(block, 'START_BLOCK', Blockly.Python.ORDER_ATOMIC) || '8';
  var num_blocks = Blockly.Python.valueToCode(block, 'NUM_BLOCKS', Blockly.Python.ORDER_ATOMIC) || '3';
  
  var code = 'reader.read_text(' + start_block + ', ' + num_blocks + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_write_text'] = function(block) {
  var start_block = Blockly.Python.valueToCode(block, 'START_BLOCK', Blockly.Python.ORDER_ATOMIC) || '8';
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'reader.write_text(' + start_block + ', ' + text + ')\n';
  return code;
};

Blockly.Python['rfid_authenticate'] = function(block) {
  var block_num = Blockly.Python.valueToCode(block, 'BLOCK', Blockly.Python.ORDER_ATOMIC) || '8';
  var key_type = block.getFieldValue('KEY_TYPE');
  
  var code = 'reader.authenticate(' + block_num + ', "' + key_type + '")';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['rfid_set_key'] = function(block) {
  var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC) || '"FF:FF:FF:FF:FF:FF"';
  var key_type = block.getFieldValue('KEY_TYPE');
  
  var code = 'reader.set_key(' + key + ', "' + key_type + '")\n';
  return code;
};

Blockly.Python['rfid_stop_crypto'] = function(block) {
  var code = 'reader.stop_crypto()\n';
  return code;
};

Blockly.Python['rfid_antenna_on'] = function(block) {
  var code = 'reader.antenna_on()\n';
  return code;
};

Blockly.Python['rfid_antenna_off'] = function(block) {
  var code = 'reader.antenna_off()\n';
  return code;
};