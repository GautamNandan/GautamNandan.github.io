// RTTTL Player Code Generators

// Initialize RTTTL Player
Blockly.Python['rtttl_init'] = function(block) {
  var buzzer_pin = Blockly.Python.valueToCode(block, 'BUZZER_PIN', Blockly.Python.ORDER_ATOMIC) || '25';
  
  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_pwm'] = 'from machine import PWM';
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  Blockly.Python.definitions_['import_uasyncio'] = 'import uasyncio';
  
  // Initialize the RTTTL player
  Blockly.Python.definitions_['rtttl_buzzer_pin'] = 'rtttl_buzzer = Pin(' + buzzer_pin + ', Pin.OUT)';
  Blockly.Python.definitions_['rtttl_pwm'] = 'rtttl_pwm = PWM(rtttl_buzzer)';
  Blockly.Python.definitions_['rtttl_player_init'] = 'rtttl = rtttl_player.RTTTLPlayer(rtttl_pwm)';
  
  var code = '';
  return code;
};

// Play Popular Song (Non-blocking)
Blockly.Python['rtttl_play_popular'] = function(block) {
  var song = block.getFieldValue('SONG');
  
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.play_popular("' + song + '", wait=False)\n';
  return code;
};

// Play Popular Song (Blocking)
Blockly.Python['rtttl_play_popular_wait'] = function(block) {
  var song = block.getFieldValue('SONG');
  
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.play_popular("' + song + '", wait=True)\n';
  return code;
};

// Play Custom RTTTL String (Non-blocking)
Blockly.Python['rtttl_play_custom'] = function(block) {
  var rtttl_string = Blockly.Python.valueToCode(block, 'RTTTL_STRING', Blockly.Python.ORDER_ATOMIC) || '""';
  
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.play(' + rtttl_string + ', wait=False)\n';
  return code;
};

// Play Custom RTTTL String (Blocking)
Blockly.Python['rtttl_play_custom_wait'] = function(block) {
  var rtttl_string = Blockly.Python.valueToCode(block, 'RTTTL_STRING', Blockly.Python.ORDER_ATOMIC) || '""';
  
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.play(' + rtttl_string + ', wait=True)\n';
  return code;
};

// Stop Playback
Blockly.Python['rtttl_stop'] = function(block) {
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.stop()\n';
  return code;
};

// Check if Playing
Blockly.Python['rtttl_is_playing'] = function(block) {
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.is_playing()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// Set Volume
Blockly.Python['rtttl_set_volume'] = function(block) {
  var volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_ATOMIC) || '50';
  
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.set_volume(' + volume + ')\n';
  return code;
};

// Play Musical Note
Blockly.Python['rtttl_play_note'] = function(block) {
  var note = block.getFieldValue('NOTE');
  var octave = Blockly.Python.valueToCode(block, 'OCTAVE', Blockly.Python.ORDER_ATOMIC) || '5';
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || '500';
  
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.play_note("' + note + '", ' + octave + ', ' + duration + ')\n';
  return code;
};

// Play Frequency
Blockly.Python['rtttl_play_frequency'] = function(block) {
  var frequency = Blockly.Python.valueToCode(block, 'FREQUENCY', Blockly.Python.ORDER_ATOMIC) || '440';
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || '500';
  
  Blockly.Python.definitions_['import_rtttl'] = 'from ils import rtttl_player';
  
  var code = 'rtttl.play_frequency(' + frequency + ', ' + duration + ')\n';
  return code;
};