// TCP/IP Blocks

// WiFi Is Connected
Blockly.Blocks['ils_wifi_is_connected'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 WiFi Connected?");
    this.setOutput(true, "Boolean");
    this.setColour("#336600");
    this.setTooltip("Check if WiFi is connected");
    this.setHelpUrl("");
  }
};

// WiFi Get IP
Blockly.Blocks['ils_wifi_get_ip'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Get IP Address");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Get the current IP address");
    this.setHelpUrl("");
  }
};

// TCP Client Connect
Blockly.Blocks['ils_tcp_client_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌐 TCP Connect");
    this.appendValueInput("HOST")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Host");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Port");
    this.appendValueInput("SOCKET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Socket ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Connect to a TCP server");
    this.setHelpUrl("");
  }
};

// TCP Send
Blockly.Blocks['ils_tcp_send'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📤 TCP Send");
    this.appendValueInput("SOCKET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Socket ID");
    this.appendValueInput("DATA")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Data");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send data through TCP connection");
    this.setHelpUrl("");
  }
};

// TCP Receive
Blockly.Blocks['ils_tcp_receive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📥 TCP Receive");
    this.appendValueInput("SOCKET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Socket ID");
    this.appendValueInput("BYTES")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Max Bytes");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Receive data from TCP connection");
    this.setHelpUrl("");
  }
};

// TCP Close
Blockly.Blocks['ils_tcp_close'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔌 TCP Close");
    this.appendValueInput("SOCKET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Socket ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Close TCP connection");
    this.setHelpUrl("");
  }
};

// TCP Server Start
Blockly.Blocks['ils_tcp_server_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🖥️ Start TCP Server");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Port");
    this.appendValueInput("SERVER_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Server ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Start a TCP server listening on specified port");
    this.setHelpUrl("");
  }
};

// TCP Server Accept
Blockly.Blocks['ils_tcp_server_accept'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🖥️ TCP Accept Client");
    this.appendValueInput("SERVER_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Server ID");
    this.setOutput(true, "Number");
    this.setColour("#336600");
    this.setTooltip("Accept incoming client connection and return client socket ID");
    this.setHelpUrl("");
  }
};

// TCP Server Stop
Blockly.Blocks['ils_tcp_server_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🖥️ Stop TCP Server");
    this.appendValueInput("SERVER_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Server ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Stop TCP server");
    this.setHelpUrl("");
  }
};

// UDP Create
Blockly.Blocks['ils_udp_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📨 Create UDP Socket");
    this.appendValueInput("SOCKET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Socket ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Create a UDP socket");
    this.setHelpUrl("");
  }
};

// UDP Send To
Blockly.Blocks['ils_udp_send_to'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📨 UDP Send");
    this.appendValueInput("SOCKET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Socket ID");
    this.appendValueInput("DATA")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Data");
    this.appendValueInput("HOST")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To Host");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To Port");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send data via UDP to specified host and port");
    this.setHelpUrl("");
  }
};

// UDP Receive From
Blockly.Blocks['ils_udp_receive_from'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📨 UDP Receive");
    this.appendValueInput("SOCKET_ID")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Socket ID");
    this.appendValueInput("BYTES")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Max Bytes");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Receive data from UDP socket");
    this.setHelpUrl("");
  }
};