/**
 * ESP-NOW Blocks for BIPES
 * Block definitions for ESP-NOW wireless communication
 */

Blockly.Blocks['espnow_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP-NOW initialize");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Initialize ESP-NOW and display MAC address");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['espnow_get_mac'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP-NOW get MAC address");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Get this device's MAC address");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['espnow_add_peer'] = {
  init: function() {
    this.appendValueInput("MAC")
        .setCheck("String")
        .appendField("ESP-NOW add peer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Add a peer device by MAC address (format: AA:BB:CC:DD:EE:FF)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['espnow_send'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField("ESP-NOW send");
    this.appendValueInput("PEER")
        .setCheck("Number")
        .appendField("to peer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Send message to a specific peer (0 = first peer added)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['espnow_send_simple'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField("ESP-NOW send");
    this.appendDummyInput()
        .appendField("to first peer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Send message to first peer (peer 0)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['espnow_receive'] = {
  init: function() {
    this.appendValueInput("TIMEOUT")
        .setCheck("Number")
        .appendField("ESP-NOW receive (timeout");
    this.appendDummyInput()
        .appendField("ms)");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Receive message with timeout in milliseconds. Returns None if no message.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['espnow_receive_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP-NOW receive");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Receive message with 1000ms timeout. Returns None if no message.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['espnow_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("import ESP-NOW library");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("Import the ESP-NOW library module");
    this.setHelpUrl("");
  }
};