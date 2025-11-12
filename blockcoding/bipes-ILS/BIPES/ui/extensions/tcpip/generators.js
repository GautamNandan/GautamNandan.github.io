// ILS TCP/IP Code Generators


// WiFi Is Connected
Blockly.Python['ils_wifi_is_connected'] = function(block) {
  Blockly.Python.definitions_['import_network'] = 'import network';
  Blockly.Python.definitions_['wifi_sta'] = 'wlan = network.WLAN(network.STA_IF)';
  
  var code = 'wlan.isconnected()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// WiFi Get IP
Blockly.Python['ils_wifi_get_ip'] = function(block) {
  Blockly.Python.definitions_['import_network'] = 'import network';
  Blockly.Python.definitions_['wifi_sta'] = 'wlan = network.WLAN(network.STA_IF)';
  
  var code = 'wlan.ifconfig()[0]';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// TCP Client Connect
Blockly.Python['ils_tcp_client_connect'] = function(block) {
  var host = Blockly.Python.valueToCode(block, 'HOST', Blockly.Python.ORDER_ATOMIC) || '"127.0.0.1"';
  var port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '80';
  var socket_id = Blockly.Python.valueToCode(block, 'SOCKET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['tcp_sockets'] = 'tcp_sockets = {}';
  
  var code = 'tcp_sockets[' + socket_id + '] = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n';
  code += 'tcp_sockets[' + socket_id + '].connect((' + host + ', ' + port + '))\n';
  
  return code;
};

// TCP Send
Blockly.Python['ils_tcp_send'] = function(block) {
  var socket_id = Blockly.Python.valueToCode(block, 'SOCKET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || '""';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['tcp_sockets'] = 'tcp_sockets = {}';
  
  var code = 'if ' + socket_id + ' in tcp_sockets:\n';
  code += '  tcp_sockets[' + socket_id + '].send(str(' + data + ').encode())\n';
  
  return code;
};

// TCP Receive
Blockly.Python['ils_tcp_receive'] = function(block) {
  var socket_id = Blockly.Python.valueToCode(block, 'SOCKET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var bytes = Blockly.Python.valueToCode(block, 'BYTES', Blockly.Python.ORDER_ATOMIC) || '1024';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['tcp_sockets'] = 'tcp_sockets = {}';
  
  var code = 'tcp_sockets[' + socket_id + '].recv(' + bytes + ').decode()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// TCP Close
Blockly.Python['ils_tcp_close'] = function(block) {
  var socket_id = Blockly.Python.valueToCode(block, 'SOCKET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['tcp_sockets'] = 'tcp_sockets = {}';
  
  var code = 'if ' + socket_id + ' in tcp_sockets:\n';
  code += '  tcp_sockets[' + socket_id + '].close()\n';
  code += '  del tcp_sockets[' + socket_id + ']\n';
  
  return code;
};

// TCP Server Start
Blockly.Python['ils_tcp_server_start'] = function(block) {
  var port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '80';
  var server_id = Blockly.Python.valueToCode(block, 'SERVER_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['tcp_servers'] = 'tcp_servers = {}';
  
  var code = 'tcp_servers[' + server_id + '] = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n';
  code += 'tcp_servers[' + server_id + '].setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n';
  code += 'tcp_servers[' + server_id + '].bind(("0.0.0.0", ' + port + '))\n';
  code += 'tcp_servers[' + server_id + '].listen(5)\n';
  code += 'print("TCP Server started on port", ' + port + ')\n';
  
  return code;
};

// TCP Server Accept
Blockly.Python['ils_tcp_server_accept'] = function(block) {
  var server_id = Blockly.Python.valueToCode(block, 'SERVER_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['tcp_servers'] = 'tcp_servers = {}';
  Blockly.Python.definitions_['tcp_sockets'] = 'tcp_sockets = {}';
  Blockly.Python.definitions_['client_counter'] = 'client_counter = 100';
  
  var code = '(lambda: (tcp_sockets.update({client_counter: tcp_servers[' + server_id + '].accept()[0]}), client_counter)[-1])()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// TCP Server Stop
Blockly.Python['ils_tcp_server_stop'] = function(block) {
  var server_id = Blockly.Python.valueToCode(block, 'SERVER_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['tcp_servers'] = 'tcp_servers = {}';
  
  var code = 'if ' + server_id + ' in tcp_servers:\n';
  code += '  tcp_servers[' + server_id + '].close()\n';
  code += '  del tcp_servers[' + server_id + ']\n';
  
  return code;
};

// UDP Create
Blockly.Python['ils_udp_create'] = function(block) {
  var socket_id = Blockly.Python.valueToCode(block, 'SOCKET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['udp_sockets'] = 'udp_sockets = {}';
  
  var code = 'udp_sockets[' + socket_id + '] = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n';
  
  return code;
};

// UDP Send To
Blockly.Python['ils_udp_send_to'] = function(block) {
  var socket_id = Blockly.Python.valueToCode(block, 'SOCKET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || '""';
  var host = Blockly.Python.valueToCode(block, 'HOST', Blockly.Python.ORDER_ATOMIC) || '"127.0.0.1"';
  var port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '8080';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['udp_sockets'] = 'udp_sockets = {}';
  
  var code = 'if ' + socket_id + ' in udp_sockets:\n';
  code += '  udp_sockets[' + socket_id + '].sendto(str(' + data + ').encode(), (' + host + ', ' + port + '))\n';
  
  return code;
};

// UDP Receive From
Blockly.Python['ils_udp_receive_from'] = function(block) {
  var socket_id = Blockly.Python.valueToCode(block, 'SOCKET_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var bytes = Blockly.Python.valueToCode(block, 'BYTES', Blockly.Python.ORDER_ATOMIC) || '1024';
  
  Blockly.Python.definitions_['import_socket'] = 'import socket';
  Blockly.Python.definitions_['udp_sockets'] = 'udp_sockets = {}';
  
  var code = 'udp_sockets[' + socket_id + '].recvfrom(' + bytes + ')[0].decode()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};