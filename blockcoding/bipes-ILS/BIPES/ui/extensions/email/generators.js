// Email Init Generator
Blockly.Python['email_init'] = function(block) {
  var smtp_server = Blockly.Python.valueToCode(block, 'SMTP_SERVER', Blockly.Python.ORDER_ATOMIC) || '"smtp.gmail.com"';
  var smtp_port = Blockly.Python.valueToCode(block, 'SMTP_PORT', Blockly.Python.ORDER_ATOMIC) || '465';
  var sender_email = Blockly.Python.valueToCode(block, 'SENDER_EMAIL', Blockly.Python.ORDER_ATOMIC) || '"your_email@gmail.com"';
  var sender_password = Blockly.Python.valueToCode(block, 'SENDER_PASSWORD', Blockly.Python.ORDER_ATOMIC) || '"your_password"';
  var use_ssl = block.getFieldValue('USE_SSL') === 'TRUE';

  // Add imports
  Blockly.Python.definitions_['import_umail'] = 'from ils import umail';
  
  // Add global email variables
  Blockly.Python.definitions_['email_smtp_server'] = 'email_smtp_server = ' + smtp_server;
  Blockly.Python.definitions_['email_smtp_port'] = 'email_smtp_port = ' + smtp_port;
  Blockly.Python.definitions_['email_sender'] = 'email_sender = ' + sender_email;
  Blockly.Python.definitions_['email_password'] = 'email_password = ' + sender_password;
  Blockly.Python.definitions_['email_use_ssl'] = 'email_use_ssl = ' + (use_ssl ? 'True' : 'False');
  Blockly.Python.definitions_['email_smtp_obj'] = 'email_smtp_obj = None';
  Blockly.Python.definitions_['email_last_status'] = 'email_last_status = False';
  Blockly.Python.definitions_['email_last_error'] = 'email_last_error = ""';

  var code = '';
  code += 'try:\n';
  code += '    email_smtp_obj = umail.SMTP(email_smtp_server, email_smtp_port, ssl=email_use_ssl, username=email_sender, password=email_password)\n';
  code += '    email_last_status = True\n';
  code += '    email_last_error = ""\n';
  code += '    print("Email initialized successfully")\n';
  code += 'except Exception as e:\n';
  code += '    email_last_status = False\n';
  code += '    email_last_error = str(e)\n';
  code += '    print("Email init failed:", e)\n';
  
  return code;
};

// Send Email Generator
Blockly.Python['email_send'] = function(block) {
  var recipient = Blockly.Python.valueToCode(block, 'RECIPIENT', Blockly.Python.ORDER_ATOMIC) || '""';
  var subject = Blockly.Python.valueToCode(block, 'SUBJECT', Blockly.Python.ORDER_ATOMIC) || '""';
  var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC) || '""';

  var code = '';
  code += 'try:\n';
  code += '    if email_smtp_obj is None:\n';
  code += '        email_smtp_obj = umail.SMTP(email_smtp_server, email_smtp_port, ssl=email_use_ssl, username=email_sender, password=email_password)\n';
  code += '    email_smtp_obj.to(' + recipient + ')\n';
  code += '    email_smtp_obj.write("From: " + email_sender + "\\r\\n")\n';
  code += '    email_smtp_obj.write("To: " + ' + recipient + ' + "\\r\\n")\n';
  code += '    email_smtp_obj.write("Subject: " + ' + subject + ' + "\\r\\n\\r\\n")\n';
  code += '    email_smtp_obj.write(' + message + ')\n';
  code += '    email_smtp_obj.send()\n';
  code += '    email_last_status = True\n';
  code += '    email_last_error = ""\n';
  code += '    print("Email sent successfully")\n';
  code += 'except Exception as e:\n';
  code += '    email_last_status = False\n';
  code += '    email_last_error = str(e)\n';
  code += '    print("Email send failed:", e)\n';
  
  return code;
};

// Send Email with From Generator
Blockly.Python['email_send_with_from'] = function(block) {
  var recipient = Blockly.Python.valueToCode(block, 'RECIPIENT', Blockly.Python.ORDER_ATOMIC) || '""';
  var from_email = Blockly.Python.valueToCode(block, 'FROM_EMAIL', Blockly.Python.ORDER_ATOMIC) || 'email_sender';
  var subject = Blockly.Python.valueToCode(block, 'SUBJECT', Blockly.Python.ORDER_ATOMIC) || '""';
  var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC) || '""';

  var code = '';
  code += 'try:\n';
  code += '    if email_smtp_obj is None:\n';
  code += '        email_smtp_obj = umail.SMTP(email_smtp_server, email_smtp_port, ssl=email_use_ssl, username=email_sender, password=email_password)\n';
  code += '    email_smtp_obj.to(' + recipient + ', mail_from=' + from_email + ')\n';
  code += '    email_smtp_obj.write("From: " + ' + from_email + ' + "\\r\\n")\n';
  code += '    email_smtp_obj.write("To: " + ' + recipient + ' + "\\r\\n")\n';
  code += '    email_smtp_obj.write("Subject: " + ' + subject + ' + "\\r\\n\\r\\n")\n';
  code += '    email_smtp_obj.write(' + message + ')\n';
  code += '    email_smtp_obj.send()\n';
  code += '    email_last_status = True\n';
  code += '    email_last_error = ""\n';
  code += '    print("Email sent successfully")\n';
  code += 'except Exception as e:\n';
  code += '    email_last_status = False\n';
  code += '    email_last_error = str(e)\n';
  code += '    print("Email send failed:", e)\n';
  
  return code;
};

// Send Email to Multiple Recipients Generator
Blockly.Python['email_send_multiple'] = function(block) {
  var recipients = Blockly.Python.valueToCode(block, 'RECIPIENTS', Blockly.Python.ORDER_ATOMIC) || '""';
  var subject = Blockly.Python.valueToCode(block, 'SUBJECT', Blockly.Python.ORDER_ATOMIC) || '""';
  var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC) || '""';

  var code = '';
  code += 'try:\n';
  code += '    if email_smtp_obj is None:\n';
  code += '        email_smtp_obj = umail.SMTP(email_smtp_server, email_smtp_port, ssl=email_use_ssl, username=email_sender, password=email_password)\n';
  code += '    recipients_list = [r.strip() for r in ' + recipients + '.split(",")]\n';
  code += '    email_smtp_obj.to(recipients_list)\n';
  code += '    email_smtp_obj.write("From: " + email_sender + "\\r\\n")\n';
  code += '    email_smtp_obj.write("To: " + ' + recipients + ' + "\\r\\n")\n';
  code += '    email_smtp_obj.write("Subject: " + ' + subject + ' + "\\r\\n\\r\\n")\n';
  code += '    email_smtp_obj.write(' + message + ')\n';
  code += '    email_smtp_obj.send()\n';
  code += '    email_last_status = True\n';
  code += '    email_last_error = ""\n';
  code += '    print("Email sent to multiple recipients")\n';
  code += 'except Exception as e:\n';
  code += '    email_last_status = False\n';
  code += '    email_last_error = str(e)\n';
  code += '    print("Email send failed:", e)\n';
  
  return code;
};

// Check Email Status Generator
Blockly.Python['email_check_status'] = function(block) {
  var code = 'email_last_status';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Get Email Error Generator
Blockly.Python['email_get_error'] = function(block) {
  var code = 'email_last_error';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Disconnect Email Generator
Blockly.Python['email_disconnect'] = function(block) {
  var code = '';
  code += 'try:\n';
  code += '    if email_smtp_obj is not None:\n';
  code += '        email_smtp_obj.quit()\n';
  code += '        email_smtp_obj = None\n';
  code += '        print("Email disconnected")\n';
  code += 'except Exception as e:\n';
  code += '    print("Disconnect failed:", e)\n';
  
  return code;
};