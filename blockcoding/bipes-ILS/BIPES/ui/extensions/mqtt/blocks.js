// MQTT Init Block
Blockly.Blocks['mqtt_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Setup ILS MQTT");
    this.appendValueInput("CLIENT_ID")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Client ID");
    this.appendValueInput("BROKER")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Broker address");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Port");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Setup MQTT connection (WiFi required)");
    this.setHelpUrl("");
  }
};

// MQTT Init with Auth Block
Blockly.Blocks['mqtt_init_with_auth'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔐 Setup ILS MQTT (with login)");
    this.appendValueInput("CLIENT_ID")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Client ID");
    this.appendValueInput("BROKER")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Broker address");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Port");
    this.appendValueInput("USERNAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Username");
    this.appendValueInput("PASSWORD")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Password");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Setup MQTT with authentication");
    this.setHelpUrl("");
  }
};

// MQTT Connect Block
Blockly.Blocks['mqtt_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔌 Connect to MQTT broker");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Connect to MQTT broker");
    this.setHelpUrl("");
  }
};

// MQTT Publish Block
Blockly.Blocks['mqtt_publish'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📤 Publish MQTT message");
    this.appendValueInput("TOPIC")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Topic");
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Publish a message to a topic");
    this.setHelpUrl("");
  }
};

// MQTT Publish with QoS Block
Blockly.Blocks['mqtt_publish_with_qos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📤 Publish MQTT (with QoS)");
    this.appendValueInput("TOPIC")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Topic");
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Message");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Quality of Service")
        .appendField(new Blockly.FieldDropdown([
          ["0 - At most once", "0"],
          ["1 - At least once", "1"],
          ["2 - Exactly once", "2"]
        ]), "QOS");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Retain message")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "RETAIN");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Publish message with QoS and retain options");
    this.setHelpUrl("");
  }
};

// MQTT Subscribe Block
Blockly.Blocks['mqtt_subscribe'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📥 Subscribe to topic");
    this.appendValueInput("TOPIC")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Topic");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("QoS")
        .appendField(new Blockly.FieldDropdown([
          ["0 - At most once", "0"],
          ["1 - At least once", "1"],
          ["2 - Exactly once", "2"]
        ]), "QOS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Subscribe to receive messages from a topic");
    this.setHelpUrl("");
  }
};

// MQTT Set Callback Block
Blockly.Blocks['mqtt_set_callback'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📨 When message arrives");
    this.appendStatementInput("CALLBACK")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Set callback function for incoming messages");
    this.setHelpUrl("");
  }
};

// MQTT Check Messages Block
Blockly.Blocks['mqtt_check_messages'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔍 Check for new messages");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Check for incoming messages (non-blocking)");
    this.setHelpUrl("");
  }
};

// MQTT Last Topic Block
Blockly.Blocks['mqtt_last_topic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📋 Last message topic");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Get topic of last received message");
    this.setHelpUrl("");
  }
};

// MQTT Last Message Block
Blockly.Blocks['mqtt_last_message'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💬 Last message content");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Get content of last received message");
    this.setHelpUrl("");
  }
};

// MQTT Is Connected Block
Blockly.Blocks['mqtt_is_connected'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✅ MQTT connected?");
    this.setOutput(true, "Boolean");
    this.setColour("#336600");
    this.setTooltip("Check if connected to MQTT broker");
    this.setHelpUrl("");
  }
};

// MQTT Disconnect Block
Blockly.Blocks['mqtt_disconnect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔌 Disconnect MQTT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Disconnect from MQTT broker");
    this.setHelpUrl("");
  }
};

// MQTT Ping Block
Blockly.Blocks['mqtt_ping'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💓 Send MQTT keepalive");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send keepalive ping to broker");
    this.setHelpUrl("");
  }
};