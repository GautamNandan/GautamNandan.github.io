// ============= WiFi Connection Blocks =============

Blockly.Blocks['wifi_connect_station'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📶 Connect to WiFi");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/ils_network/wifi_icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("SSID")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Network Name (SSID)");
    this.appendValueInput("PASSWORD")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Password");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Timeout (seconds)")
        .appendField(new Blockly.FieldNumber(10, 1, 60, 1), "TIMEOUT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Connect ESP32 to WiFi network");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wifi_create_ap'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Create WiFi Hotspot");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/ils_network/ap_icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("SSID")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Hotspot Name (SSID)");
    this.appendValueInput("PASSWORD")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Password (min 8 chars)");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Channel")
        .appendField(new Blockly.FieldNumber(1, 1, 13, 1), "CHANNEL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Create WiFi Access Point on ESP32");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wifi_check_connection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✅ WiFi Connected?");
    this.setOutput(true, "Boolean");
    this.setColour("#336600");
    this.setTooltip("Check if WiFi is connected");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wifi_get_ip'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌐 Get IP Address");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Get device IP address");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wifi_disconnect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📴 Disconnect WiFi");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Disconnect from WiFi");
    this.setHelpUrl("");
  }
};

// ============= HTTP Server Blocks =============

Blockly.Blocks['http_server_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🌐 Start Web Server");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/ils_network/server_icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Port");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Server ID")
        .appendField(new Blockly.FieldNumber(1, 1, 5, 1), "SERVER_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Start HTTP web server");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_add_route'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛤️ Add Web Page Route");
    this.appendValueInput("PATH")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("URL Path");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Method")
        .appendField(new Blockly.FieldDropdown([
          ["GET", "GET"],
          ["POST", "POST"],
          ["PUT", "PUT"],
          ["DELETE", "DELETE"]
        ]), "METHOD");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Server ID")
        .appendField(new Blockly.FieldNumber(1, 1, 5, 1), "SERVER_ID");
    this.appendStatementInput("HANDLER")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Add route/page to web server");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_send_html'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📄 Send HTML Page");
    this.appendValueInput("HTML")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("HTML Content");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Status Code")
        .appendField(new Blockly.FieldNumber(200, 100, 599, 1), "STATUS_CODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send HTML response to browser");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_send_json'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 Send JSON Data");
    this.appendValueInput("JSON_DATA")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("JSON");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send JSON response");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_send_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💬 Send Text");
    this.appendValueInput("TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Text");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send plain text response");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_get_parameter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔍 Get URL Parameter");
    this.appendValueInput("PARAM_NAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Parameter Name");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Get parameter from URL query string");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_get_body'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📦 Get Request Body");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Get request body data");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_redirect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↪️ Redirect to URL");
    this.appendValueInput("URL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("URL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Redirect browser to another URL");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_server_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🛑 Stop Web Server");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Server ID")
        .appendField(new Blockly.FieldNumber(1, 1, 5, 1), "SERVER_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Stop HTTP server");
    this.setHelpUrl("");
  }
};

// ============= HTTP Client Blocks =============

Blockly.Blocks['http_client_get_request'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬇️ HTTP GET Request");
    this.appendValueInput("URL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("URL");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Make HTTP GET request and return response");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_client_post_request'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬆️ HTTP POST Request");
    this.appendValueInput("URL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("URL");
    this.appendValueInput("DATA")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Data");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Content Type")
        .appendField(new Blockly.FieldDropdown([
          ["JSON", "application/json"],
          ["Form Data", "application/x-www-form-urlencoded"],
          ["Plain Text", "text/plain"]
        ]), "CONTENT_TYPE");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Make HTTP POST request");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_client_get_with_headers'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📋 HTTP GET with Headers");
    this.appendValueInput("URL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("URL");
    this.appendValueInput("HEADERS")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Headers (JSON)");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Make HTTP GET with custom headers");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_client_download_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💾 Download File");
    this.appendValueInput("URL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("URL");
    this.appendValueInput("FILENAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Save As");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Download file from URL to ESP32");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_client_get_status_code'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔢 Last HTTP Status Code");
    this.setOutput(true, "Number");
    this.setColour("#336600");
    this.setTooltip("Get status code from last request (200=OK, 404=Not Found)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['http_client_parse_json'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔧 Parse JSON Value");
    this.appendValueInput("JSON_TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("JSON Text");
    this.appendValueInput("KEY")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Key");
    this.setOutput(true, null);
    this.setColour("#336600");
    this.setTooltip("Extract value from JSON by key");
    this.setHelpUrl("");
  }
};

// ============= HTML Builder Blocks =============

Blockly.Blocks['html_create_page'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📝 Create HTML Page");
    this.appendValueInput("TITLE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Page Title");
    this.appendValueInput("BODY_CONTENT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Body Content");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Create complete HTML page");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['html_create_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔘 HTML Button");
    this.appendValueInput("BUTTON_TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Button Text");
    this.appendValueInput("LINK_URL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Link URL");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color")
        .appendField(new Blockly.FieldDropdown([
          ["Blue", "blue"],
          ["Green", "green"],
          ["Red", "red"],
          ["Yellow", "yellow"],
          ["Gray", "gray"]
        ]), "COLOR");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Create HTML button with link");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['html_create_form'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📋 HTML Form");
    this.appendValueInput("ACTION")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Submit to URL");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Method")
        .appendField(new Blockly.FieldDropdown([
          ["GET", "GET"],
          ["POST", "POST"]
        ]), "METHOD");
    this.appendStatementInput("FIELDS")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Form Fields");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Create HTML form");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['html_add_input_field'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📝 Input Field");
    this.appendValueInput("FIELD_NAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Name");
    this.appendValueInput("PLACEHOLDER")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Placeholder");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Type")
        .appendField(new Blockly.FieldDropdown([
          ["Text", "text"],
          ["Number", "number"],
          ["Password", "password"],
          ["Email", "email"]
        ]), "INPUT_TYPE");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Create HTML input field");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['html_add_slider'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎚️ HTML Slider");
    this.appendValueInput("NAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Name");
    this.appendValueInput("MIN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Min Value");
    this.appendValueInput("MAX")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Max Value");
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Default Value");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Create HTML range slider");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['html_create_table'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 HTML Table");
    this.appendValueInput("HEADERS")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Headers (comma-separated)");
    this.appendValueInput("ROWS")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rows (comma-separated)");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Create HTML table");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['html_add_css_style'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎨 Add CSS Style");
    this.appendValueInput("CSS")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("CSS Code");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Add CSS styling to page");
    this.setHelpUrl("");
  }
};

// ============= WebSocket Blocks =============

Blockly.Blocks['websocket_server_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⚡ Start WebSocket Server");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Port");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Start WebSocket server for real-time updates");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['websocket_send_to_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📡 Send to All WebSocket Clients");
    this.appendValueInput("MESSAGE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Broadcast message to all connected clients");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['websocket_on_message_received'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📨 When WebSocket Message");
    this.appendStatementInput("HANDLER")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Execute when WebSocket message received");
    this.setHelpUrl("");
  }
};