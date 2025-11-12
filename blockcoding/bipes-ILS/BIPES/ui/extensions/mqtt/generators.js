// MQTT Init Generator
Blockly.Python['mqtt_init'] = function(block) {
  var client_id = Blockly.Python.valueToCode(block, 'CLIENT_ID', Blockly.Python.ORDER_ATOMIC) || '"esp32_client"';
  var broker = Blockly.Python.valueToCode(block, 'BROKER', Blockly.Python.ORDER_ATOMIC) || '"broker.hivemq.com"';
  var port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '1883';

  // Add imports
  Blockly.Python.definitions_['import_umqtt'] = 'from umqtt.simple import MQTTClient';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  // Add global MQTT variables
  Blockly.Python.definitions_['mqtt_client_id'] = 'mqtt_client_id = ' + client_id;
  Blockly.Python.definitions_['mqtt_broker'] = 'mqtt_broker = ' + broker;
  Blockly.Python.definitions_['mqtt_port'] = 'mqtt_port = ' + port;
  Blockly.Python.definitions_['mqtt_username'] = 'mqtt_username = None';
  Blockly.Python.definitions_['mqtt_password'] = 'mqtt_password = None';
  Blockly.Python.definitions_['mqtt_client'] = 'mqtt_client = None';
  Blockly.Python.definitions_['mqtt_last_topic'] = 'mqtt_last_topic = ""';
  Blockly.Python.definitions_['mqtt_last_message'] = 'mqtt_last_message = ""';
  
  // Add default callback function
  Blockly.Python.definitions_['mqtt_callback'] = 
    'def mqtt_default_callback(topic, msg):\n' +
    '    global mqtt_last_topic, mqtt_last_message\n' +
    '    mqtt_last_topic = topic.decode()\n' +
    '    mqtt_last_message = msg.decode()\n' +
    '    print("MQTT:", mqtt_last_topic, "=", mqtt_last_message)\n';

  var code = '';
  code += 'try:\n';
  code += '    mqtt_client = MQTTClient(mqtt_client_id, mqtt_broker, port=mqtt_port)\n';
  code += '    mqtt_client.set_callback(mqtt_default_callback)\n';
  code += '    print("MQTT initialized")\n';
  code += 'except Exception as e:\n';
  code += '    print("MQTT init failed:", e)\n';
  
  return code;
};

// MQTT Init with Auth Generator
Blockly.Python['mqtt_init_with_auth'] = function(block) {
  var client_id = Blockly.Python.valueToCode(block, 'CLIENT_ID', Blockly.Python.ORDER_ATOMIC) || '"esp32_client"';
  var broker = Blockly.Python.valueToCode(block, 'BROKER', Blockly.Python.ORDER_ATOMIC) || '"broker.hivemq.com"';
  var port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '1883';
  var username = Blockly.Python.valueToCode(block, 'USERNAME', Blockly.Python.ORDER_ATOMIC) || '""';
  var password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) || '""';

  // Add imports
  Blockly.Python.definitions_['import_umqtt'] = 'from umqtt.simple import MQTTClient';
  Blockly.Python.definitions_['import_time'] = 'import time';
  
  // Add global MQTT variables
  Blockly.Python.definitions_['mqtt_client_id'] = 'mqtt_client_id = ' + client_id;
  Blockly.Python.definitions_['mqtt_broker'] = 'mqtt_broker = ' + broker;
  Blockly.Python.definitions_['mqtt_port'] = 'mqtt_port = ' + port;
  Blockly.Python.definitions_['mqtt_username'] = 'mqtt_username = ' + username;
  Blockly.Python.definitions_['mqtt_password'] = 'mqtt_password = ' + password;
  Blockly.Python.definitions_['mqtt_client'] = 'mqtt_client = None';
  Blockly.Python.definitions_['mqtt_last_topic'] = 'mqtt_last_topic = ""';
  Blockly.Python.definitions_['mqtt_last_message'] = 'mqtt_last_message = ""';
  
  // Add default callback function
  Blockly.Python.definitions_['mqtt_callback'] = 
    'def mqtt_default_callback(topic, msg):\n' +
    '    global mqtt_last_topic, mqtt_last_message\n' +
    '    mqtt_last_topic = topic.decode()\n' +
    '    mqtt_last_message = msg.decode()\n' +
    '    print("MQTT:", mqtt_last_topic, "=", mqtt_last_message)\n';

  var code = '';
  code += 'try:\n';
  code += '    mqtt_client = MQTTClient(mqtt_client_id, mqtt_broker, port=mqtt_port, user=mqtt_username, password=mqtt_password)\n';
  code += '    mqtt_client.set_callback(mqtt_default_callback)\n';
  code += '    print("MQTT initialized with auth")\n';
  code += 'except Exception as e:\n';
  code += '    print("MQTT init failed:", e)\n';
  
  return code;
};

// MQTT Connect Generator
Blockly.Python['mqtt_connect'] = function(block) {
  var code = '';
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.connect()\n';
  code += '        print("MQTT connected")\n';
  code += '    else:\n';
  code += '        print("MQTT client not initialized")\n';
  code += 'except Exception as e:\n';
  code += '    print("MQTT connect failed:", e)\n';
  
  return code;
};

// MQTT Publish Generator
Blockly.Python['mqtt_publish'] = function(block) {
  var topic = Blockly.Python.valueToCode(block, 'TOPIC', Blockly.Python.ORDER_ATOMIC) || '""';
  var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC) || '""';

  var code = '';
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.publish(' + topic + ', str(' + message + '))\n';
  code += '        print("Published to", ' + topic + ')\n';
  code += '    else:\n';
  code += '        print("MQTT not connected")\n';
  code += 'except Exception as e:\n';
  code += '    print("MQTT publish failed:", e)\n';
  
  return code;
};

// MQTT Publish with QoS Generator
Blockly.Python['mqtt_publish_with_qos'] = function(block) {
  var topic = Blockly.Python.valueToCode(block, 'TOPIC', Blockly.Python.ORDER_ATOMIC) || '""';
  var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC) || '""';
  var qos = block.getFieldValue('QOS');
  var retain = block.getFieldValue('RETAIN') === 'TRUE';

  var code = '';
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.publish(' + topic + ', str(' + message + '), qos=' + qos + ', retain=' + (retain ? 'True' : 'False') + ')\n';
  code += '        print("Published to", ' + topic + ', "with QoS", ' + qos + ')\n';
  code += '    else:\n';
  code += '        print("MQTT not connected")\n';
  code += 'except Exception as e:\n';
  code += '    print("MQTT publish failed:", e)\n';
  
  return code;
};

// MQTT Subscribe Generator
Blockly.Python['mqtt_subscribe'] = function(block) {
  var topic = Blockly.Python.valueToCode(block, 'TOPIC', Blockly.Python.ORDER_ATOMIC) || '""';
  var qos = block.getFieldValue('QOS');

  var code = '';
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.subscribe(' + topic + ', qos=' + qos + ')\n';
  code += '        print("Subscribed to", ' + topic + ')\n';
  code += '    else:\n';
  code += '        print("MQTT not connected")\n';
  code += 'except Exception as e:\n';
  code += '    print("MQTT subscribe failed:", e)\n';
  
  return code;
};

// MQTT Set Callback Generator
Blockly.Python['mqtt_set_callback'] = function(block) {
  var callback_code = Blockly.Python.statementToCode(block, 'CALLBACK');
  
  // Create custom callback function
  var functionName = 'mqtt_user_callback';
  var code = '';
  
  // Define the custom callback function
  Blockly.Python.definitions_['mqtt_user_callback'] = 
    'def ' + functionName + '(topic, msg):\n' +
    '    global mqtt_last_topic, mqtt_last_message\n' +
    '    mqtt_last_topic = topic.decode()\n' +
    '    mqtt_last_message = msg.decode()\n' +
    (callback_code ? callback_code : '    pass\n');
  
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.set_callback(' + functionName + ')\n';
  code += '        print("MQTT callback set")\n';
  code += '    else:\n';
  code += '        print("MQTT not initialized")\n';
  code += 'except Exception as e:\n';
  code += '    print("Set callback failed:", e)\n';
  
  return code;
};

// MQTT Check Messages Generator
Blockly.Python['mqtt_check_messages'] = function(block) {
  var code = '';
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.check_msg()\n';
  code += 'except Exception as e:\n';
  code += '    print("Check messages failed:", e)\n';
  
  return code;
};

// MQTT Last Topic Generator
Blockly.Python['mqtt_last_topic'] = function(block) {
  var code = 'mqtt_last_topic';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// MQTT Last Message Generator
Blockly.Python['mqtt_last_message'] = function(block) {
  var code = 'mqtt_last_message';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// MQTT Is Connected Generator
Blockly.Python['mqtt_is_connected'] = function(block) {
  var code = '(mqtt_client is not None)';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// MQTT Disconnect Generator
Blockly.Python['mqtt_disconnect'] = function(block) {
  var code = '';
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.disconnect()\n';
  code += '        print("MQTT disconnected")\n';
  code += 'except Exception as e:\n';
  code += '    print("Disconnect failed:", e)\n';
  
  return code;
};

// MQTT Ping Generator
Blockly.Python['mqtt_ping'] = function(block) {
  var code = '';
  code += 'try:\n';
  code += '    if mqtt_client is not None:\n';
  code += '        mqtt_client.ping()\n';
  code += 'except Exception as e:\n';
  code += '    print("Ping failed:", e)\n';
  
  return code;
};