// ============= WiFi Connection Generators =============

Blockly.Python['wifi_connect_station'] = function(block) {
  var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC) || '""';
  var password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) || '""';
  var timeout = block.getFieldValue('TIMEOUT');

  Blockly.Python.definitions_['import_network'] = 'import network';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ils_network'] = 'from ils.http import network_utils';
  
  var code = 'network_utils.connect_wifi(' + ssid + ', ' + password + ', timeout=' + timeout + ')\n';
  return code;
};

Blockly.Python['wifi_create_ap'] = function(block) {
  var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC) || '"ESP32-AP"';
  var password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) || '"12345678"';
  var channel = block.getFieldValue('CHANNEL');

  Blockly.Python.definitions_['import_network'] = 'import network';
  Blockly.Python.definitions_['import_ils_network'] = 'from ils.http import network_utils';
  
  var code = 'network_utils.create_ap(' + ssid + ', ' + password + ', channel=' + channel + ')\n';
  return code;
};

Blockly.Python['wifi_check_connection'] = function(block) {
  Blockly.Python.definitions_['import_network'] = 'import network';
  Blockly.Python.definitions_['import_ils_network'] = 'from ils.http import network_utils';
  
  var code = 'network_utils.is_connected()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['wifi_get_ip'] = function(block) {
  Blockly.Python.definitions_['import_network'] = 'import network';
  Blockly.Python.definitions_['import_ils_network'] = 'from ils.http import network_utils';
  
  var code = 'network_utils.get_ip()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['wifi_disconnect'] = function(block) {
  Blockly.Python.definitions_['import_network'] = 'import network';
  Blockly.Python.definitions_['import_ils_network'] = 'from ils.http import network_utils';
  
  var code = 'network_utils.disconnect()\n';
  return code;
};

// ============= HTTP Server Generators =============

Blockly.Python['http_server_start'] = function(block) {
  var port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '80';
  var server_id = block.getFieldValue('SERVER_ID');

  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['import_ils_http'] = 'from ils.http import http_server';
  
  if (!Blockly.Python.definitions_['http_servers_dict']) {
    Blockly.Python.definitions_['http_servers_dict'] = 'http_servers = {}';
  }
  
  var code = 'http_servers[' + server_id + '] = http_server.HTTPServer(' + port + ')\n';
  code += 'http_servers[' + server_id + '].start()\n';
  return code;
};

Blockly.Python['http_server_add_route'] = function(block) {
  var path = Blockly.Python.valueToCode(block, 'PATH', Blockly.Python.ORDER_ATOMIC) || '"/"';
  var method = block.getFieldValue('METHOD');
  var server_id = block.getFieldValue('SERVER_ID');
  var handler_code = Blockly.Python.statementToCode(block, 'HANDLER');

  // Create a unique function name for this route
  var func_name = 'route_handler_' + block.id.replace(/[^a-zA-Z0-9]/g, '_');
  
  Blockly.Python.definitions_['import_ils_http'] = 'from ils.http import http_server';
  
  // Define the handler function
  var func_def = 'def ' + func_name + '(request, response):\n';
  if (handler_code) {
    func_def += handler_code;
  } else {
    func_def += '    pass\n';
  }
  func_def += '\n';
  
  Blockly.Python.definitions_['route_' + block.id] = func_def;
  
  var code = 'http_servers[' + server_id + '].add_route(' + path + ', ' + func_name + ', method="' + method + '")\n';
  return code;
};

Blockly.Python['http_server_send_html'] = function(block) {
  var html = Blockly.Python.valueToCode(block, 'HTML', Blockly.Python.ORDER_ATOMIC) || '""';
  var status_code = block.getFieldValue('STATUS_CODE');
  
  var code = 'response.send_html(' + html + ', status=' + status_code + ')\n';
  return code;
};

Blockly.Python['http_server_send_json'] = function(block) {
  var json_data = Blockly.Python.valueToCode(block, 'JSON_DATA', Blockly.Python.ORDER_ATOMIC) || '"{}"';
  
  var code = 'response.send_json(' + json_data + ')\n';
  return code;
};

Blockly.Python['http_server_send_text'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'response.send_text(' + text + ')\n';
  return code;
};

Blockly.Python['http_server_get_parameter'] = function(block) {
  var param_name = Blockly.Python.valueToCode(block, 'PARAM_NAME', Blockly.Python.ORDER_ATOMIC) || '""';
  
  var code = 'request.get_param(' + param_name + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['http_server_get_body'] = function(block) {
  var code = 'request.body';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['http_server_redirect'] = function(block) {
  var url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC) || '"/"';
  
  var code = 'response.redirect(' + url + ')\n';
  return code;
};

Blockly.Python['http_server_stop'] = function(block) {
  var server_id = block.getFieldValue('SERVER_ID');
  
  var code = 'http_servers[' + server_id + '].stop()\n';
  return code;
};

// ============= HTTP Client Generators =============

Blockly.Python['http_client_get_request'] = function(block) {
  var url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC) || '""';

  Blockly.Python.definitions_['import_urequests'] = 'import urequests';
  Blockly.Python.definitions_['import_ils_http_client'] = 'from ils.http import http_client';
  
  var code = 'http_client.get(' + url + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['http_client_post_request'] = function(block) {
  var url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC) || '""';
  var data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || '""';
  var content_type = block.getFieldValue('CONTENT_TYPE');

  Blockly.Python.definitions_['import_urequests'] = 'import urequests';
  Blockly.Python.definitions_['import_ils_http_client'] = 'from ils.http import http_client';
  
  var code = 'http_client.post(' + url + ', ' + data + ', content_type="' + content_type + '")';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['http_client_get_with_headers'] = function(block) {
  var url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC) || '""';
  var headers = Blockly.Python.valueToCode(block, 'HEADERS', Blockly.Python.ORDER_ATOMIC) || '"{}"';

  Blockly.Python.definitions_['import_urequests'] = 'import urequests';
  Blockly.Python.definitions_['import_json'] = 'import json';
  Blockly.Python.definitions_['import_ils_http_client'] = 'from ils.http import http_client';
  
  var code = 'http_client.get_with_headers(' + url + ', json.loads(' + headers + '))';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['http_client_download_file'] = function(block) {
  var url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC) || '""';
  var filename = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_ATOMIC) || '"file.txt"';

  Blockly.Python.definitions_['import_urequests'] = 'import urequests';
  Blockly.Python.definitions_['import_ils_http_client'] = 'from ils.http import http_client';
  
  var code = 'http_client.download_file(' + url + ', ' + filename + ')\n';
  return code;
};

Blockly.Python['http_client_get_status_code'] = function(block) {
  Blockly.Python.definitions_['import_ils_http_client'] = 'from ils.http import http_client';
  
  var code = 'http_client.last_status_code';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['http_client_parse_json'] = function(block) {
  var json_text = Blockly.Python.valueToCode(block, 'JSON_TEXT', Blockly.Python.ORDER_ATOMIC) || '""';
  var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC) || '""';

  Blockly.Python.definitions_['import_json'] = 'import json';
  Blockly.Python.definitions_['import_ils_http_client'] = 'from ils.http import http_client';
  
  var code = 'http_client.parse_json(' + json_text + ', ' + key + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ============= HTML Builder Generators =============

Blockly.Python['html_create_page'] = function(block) {
  var title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_ATOMIC) || '"Page"';
  var body = Blockly.Python.valueToCode(block, 'BODY_CONTENT', Blockly.Python.ORDER_ATOMIC) || '""';

  Blockly.Python.definitions_['import_ils_html'] = 'from ils.http import html_builder';
  
  var code = 'html_builder.create_page(' + title + ', ' + body + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['html_create_button'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'BUTTON_TEXT', Blockly.Python.ORDER_ATOMIC) || '"Button"';
  var url = Blockly.Python.valueToCode(block, 'LINK_URL', Blockly.Python.ORDER_ATOMIC) || '"/"';
  var color = block.getFieldValue('COLOR');

  Blockly.Python.definitions_['import_ils_html'] = 'from ils.http import html_builder';
  
  var code = 'html_builder.create_button(' + text + ', ' + url + ', color="' + color + '")';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['html_create_form'] = function(block) {
  var action = Blockly.Python.valueToCode(block, 'ACTION', Blockly.Python.ORDER_ATOMIC) || '"/submit"';
  var method = block.getFieldValue('METHOD');
  var fields = Blockly.Python.statementToCode(block, 'FIELDS');

  Blockly.Python.definitions_['import_ils_html'] = 'from ils.http import html_builder';
  
  // For simplicity, just create basic form structure
  var code = 'html_builder.create_form(' + action + ', method="' + method + '")';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['html_add_input_field'] = function(block) {
  var name = Blockly.Python.valueToCode(block, 'FIELD_NAME', Blockly.Python.ORDER_ATOMIC) || '"field"';
  var placeholder = Blockly.Python.valueToCode(block, 'PLACEHOLDER', Blockly.Python.ORDER_ATOMIC) || '""';
  var input_type = block.getFieldValue('INPUT_TYPE');

  Blockly.Python.definitions_['import_ils_html'] = 'from ils.http import html_builder';
  
  var code = 'html_builder.create_input(' + name + ', ' + placeholder + ', input_type="' + input_type + '")';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['html_add_slider'] = function(block) {
  var name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC) || '"slider"';
  var min = Blockly.Python.valueToCode(block, 'MIN', Blockly.Python.ORDER_ATOMIC) || '0';
  var max = Blockly.Python.valueToCode(block, 'MAX', Blockly.Python.ORDER_ATOMIC) || '100';
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '50';

  Blockly.Python.definitions_['import_ils_html'] = 'from ils.http import html_builder';
  
  var code = 'html_builder.create_slider(' + name + ', ' + min + ', ' + max + ', ' + value + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['html_create_table'] = function(block) {
  var headers = Blockly.Python.valueToCode(block, 'HEADERS', Blockly.Python.ORDER_ATOMIC) || '""';
  var rows = Blockly.Python.valueToCode(block, 'ROWS', Blockly.Python.ORDER_ATOMIC) || '""';

  Blockly.Python.definitions_['import_ils_html'] = 'from ils.http import html_builder';
  
  var code = 'html_builder.create_table(' + headers + ', ' + rows + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['html_add_css_style'] = function(block) {
  var css = Blockly.Python.valueToCode(block, 'CSS', Blockly.Python.ORDER_ATOMIC) || '""';

  Blockly.Python.definitions_['import_ils_html'] = 'from ils.http import html_builder';
  
  var code = 'html_builder.add_css(' + css + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ============= WebSocket Generators =============

Blockly.Python['websocket_server_start'] = function(block) {
  var port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '8080';

  Blockly.Python.definitions_['import_ils_websocket'] = 'from ils.http import websocket_server';
  
  if (!Blockly.Python.definitions_['websocket_server_init']) {
    Blockly.Python.definitions_['websocket_server_init'] = 'ws_server = None';
  }
  
  var code = 'ws_server = websocket_server.WebSocketServer(' + port + ')\n';
  code += 'ws_server.start()\n';
  return code;
};

Blockly.Python['websocket_send_to_all'] = function(block) {
  var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC) || '""';

  Blockly.Python.definitions_['import_ils_websocket'] = 'from ils.http import websocket_server';
  
  var code = 'ws_server.broadcast(' + message + ')\n';
  return code;
};

Blockly.Python['websocket_on_message_received'] = function(block) {
  var handler_code = Blockly.Python.statementToCode(block, 'HANDLER');

  var func_name = 'ws_message_handler_' + block.id.replace(/[^a-zA-Z0-9]/g, '_');
  
  var func_def = 'def ' + func_name + '(client, message):\n';
  if (handler_code) {
    func_def += handler_code;
  } else {
    func_def += '    pass\n';
  }
  func_def += '\n';
  
  Blockly.Python.definitions_['ws_handler_' + block.id] = func_def;
  
  var code = 'ws_server.on_message(' + func_name + ')\n';
  return code;
};