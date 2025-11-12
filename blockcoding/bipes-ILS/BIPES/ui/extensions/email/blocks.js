// Email Init Block
Blockly.Blocks['email_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📧 Setup Email");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "extensions/email/icon.png",
          55,
          55,
          "*"));
    this.appendValueInput("SMTP_SERVER")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("SMTP server");
    this.appendValueInput("SMTP_PORT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Port");
    this.appendValueInput("SENDER_EMAIL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Your email");
    this.appendValueInput("SENDER_PASSWORD")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Password");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Use SSL")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "USE_SSL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Setup email connection with SMTP server");
    this.setHelpUrl("");
  }
};

// Send Email Block
Blockly.Blocks['email_send'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✉️ Send Email");
    this.appendValueInput("RECIPIENT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To");
    this.appendValueInput("SUBJECT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Subject");
    this.appendValueInput("MESSAGE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send an email");
    this.setHelpUrl("");
  }
};

// Send Email with From Block
Blockly.Blocks['email_send_with_from'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✉️ Send Email (with From)");
    this.appendValueInput("RECIPIENT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To");
    this.appendValueInput("FROM_EMAIL")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("From");
    this.appendValueInput("SUBJECT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Subject");
    this.appendValueInput("MESSAGE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send an email with custom From address");
    this.setHelpUrl("");
  }
};

// Send Email to Multiple Recipients
Blockly.Blocks['email_send_multiple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📬 Send to Multiple");
    this.appendValueInput("RECIPIENTS")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("To (comma-separated)");
    this.appendValueInput("SUBJECT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Subject");
    this.appendValueInput("MESSAGE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Send email to multiple recipients");
    this.setHelpUrl("");
  }
};

// Check Email Status Block
Blockly.Blocks['email_check_status'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✅ Email sent successfully?");
    this.setOutput(true, "Boolean");
    this.setColour("#336600");
    this.setTooltip("Returns true if last email was sent successfully");
    this.setHelpUrl("");
  }
};

// Get Email Error Block
Blockly.Blocks['email_get_error'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("❌ Get email error");
    this.setOutput(true, "String");
    this.setColour("#336600");
    this.setTooltip("Get error message from last email attempt");
    this.setHelpUrl("");
  }
};

// Disconnect Email Block
Blockly.Blocks['email_disconnect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔌 Close email connection");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#336600");
    this.setTooltip("Disconnect from email server");
    this.setHelpUrl("");
  }
};