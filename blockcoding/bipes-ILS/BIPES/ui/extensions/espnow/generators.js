/**
 * ESP-NOW Code Generators for BIPES
 * Python code generation for ESP-NOW blocks
 */

Blockly.Python['espnow_init'] = function(block) {
  Blockly.Python.definitions_['import_time'] = 'from espnow_lib import *';
  var code = 'espnow_init()\n';
  return code;
};

Blockly.Python['espnow_get_mac'] = function(block) {
  var code = 'espnow_get_mac()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['espnow_add_peer'] = function(block) {
  var value_mac = Blockly.Python.valueToCode(block, 'MAC', Blockly.Python.ORDER_ATOMIC);
  var code = 'espnow_add_peer(' + value_mac + ')\n';
  return code;
};

Blockly.Python['espnow_send'] = function(block) {
  var value_message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC);
  var value_peer = Blockly.Python.valueToCode(block, 'PEER', Blockly.Python.ORDER_ATOMIC);
  var code = 'espnow_send(' + value_message + ', ' + value_peer + ')\n';
  return code;
};

Blockly.Python['espnow_send_simple'] = function(block) {
  var value_message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC);
  var code = 'espnow_send(' + value_message + ')\n';
  return code;
};

Blockly.Python['espnow_receive'] = function(block) {
  var value_timeout = Blockly.Python.valueToCode(block, 'TIMEOUT', Blockly.Python.ORDER_ATOMIC);
  var code = 'espnow_receive(' + value_timeout + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['espnow_receive_simple'] = function(block) {
  var code = 'espnow_receive()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};