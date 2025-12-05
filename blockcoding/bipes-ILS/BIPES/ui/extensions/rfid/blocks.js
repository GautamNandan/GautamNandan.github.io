// RFID Reader Blocks

Blockly.Blocks['rfid_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔖 Setup RFID");	  
    this.appendValueInput("SCK_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SCK pin");
    this.appendValueInput("MOSI_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("MOSI pin");
    this.appendValueInput("MISO_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("MISO pin");
    this.appendValueInput("CS_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("CS pin");
    this.appendValueInput("RST_PIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RST pin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Initialize MFRC522 RFID reader with SPI interface");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_card_present'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔍 RFID card present?");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if a card or tag is detected");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_wait_for_card'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏳ RFID wait for card");
    this.appendValueInput("TIMEOUT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("timeout (sec)");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Wait for card (returns true if found, false on timeout)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_get_uid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🏷️ RFID get card UID");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get card Unique ID as text (e.g., 'A1:B2:C3:D4')");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_get_uid_bytes'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🏷️ RFID get UID bytes");
    this.setOutput(true, "Array");
    this.setColour("#cc9933");
    this.setTooltip("Get card UID as list of bytes");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_get_card_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📇 RFID get card type");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Get card type (e.g., 'MIFARE 1KB')");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_is_card_uid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✅ RFID card UID is");
    this.appendValueInput("UID")
        .setCheck("String");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Check if current card matches specific UID");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_uid_matches'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✅ RFID UIDs match?");
    this.appendValueInput("UID1")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("UID 1");
    this.appendValueInput("UID2")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("UID 2");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Compare two UIDs");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_read_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📖 RFID read block");
    this.appendValueInput("BLOCK")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("block number");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Read data from block (returns 16 bytes as text)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_write_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✏️ RFID write block");
    this.appendValueInput("BLOCK")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("block number");
    this.appendValueInput("DATA")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("data");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Write data to block (max 16 bytes)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_read_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📖 RFID read text");
    this.appendValueInput("START_BLOCK")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("start block");
    this.appendValueInput("NUM_BLOCKS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("num blocks");
    this.setOutput(true, "String");
    this.setColour("#cc9933");
    this.setTooltip("Read text from multiple consecutive blocks");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_write_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✏️ RFID write text");
    this.appendValueInput("START_BLOCK")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("start block");
    this.appendValueInput("TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("text");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Write long text across multiple blocks");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_authenticate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔐 RFID authenticate");
    this.appendValueInput("BLOCK")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("block");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("key type")
        .appendField(new Blockly.FieldDropdown([
          ["Key A", "A"],
          ["Key B", "B"]
        ]), "KEY_TYPE");
    this.setOutput(true, "Boolean");
    this.setColour("#cc9933");
    this.setTooltip("Authenticate block for read/write access");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_set_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔑 RFID set key");
    this.appendValueInput("KEY")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("key");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("type")
        .appendField(new Blockly.FieldDropdown([
          ["Key A", "A"],
          ["Key B", "B"]
        ]), "KEY_TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Set authentication key");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_stop_crypto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 RFID stop crypto");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Stop encryption (call after reading/writing)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_antenna_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 RFID antenna ON");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Turn on RFID antenna");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['rfid_antenna_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📴 RFID antenna OFF");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#cc9933");
    this.setTooltip("Turn off RFID antenna (save power)");
    this.setHelpUrl("");
  }
};