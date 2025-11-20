// RTTTL Player Block Definitions

// Initialize RTTTL Player
Blockly.Blocks['rtttl_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎵 RTTTL Setup");	
    this.appendValueInput("BUZZER_PIN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Buzzer Pin");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Initialize RTTTL player with buzzer pin");
    this.setHelpUrl("");
  }
};

// Play Popular Song (Non-blocking)
Blockly.Blocks['rtttl_play_popular'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎼 Play Song")
        .appendField(new Blockly.FieldDropdown([
          ["Nokia Tune", "nokia"],
          ["Super Mario", "mario"],
          ["Star Wars", "starwars"],
          ["Happy Birthday", "birthday"],
          ["Jingle Bells", "jinglebells"],
          ["Imperial March", "imperial"],
          ["Tetris", "tetris"],
          ["Game of Thrones", "got"],
          ["Pink Panther", "pinkpanther"],
          ["The Simpsons", "simpsons"],
          ["Mission Impossible", "mission"],
          ["Indiana Jones", "indiana"],
          ["Bond Theme", "bond"],
          ["Barbie Girl", "barbie"],
          ["Take On Me", "takeonme"]
        ]), "SONG")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Play a popular song (non-blocking)");
    this.setHelpUrl("");
  }
};

// Play Popular Song (Blocking)
Blockly.Blocks['rtttl_play_popular_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎼 Play & Wait Song")
        .appendField(new Blockly.FieldDropdown([
          ["Nokia Tune", "nokia"],
          ["Super Mario", "mario"],
          ["Star Wars", "starwars"],
          ["Happy Birthday", "birthday"],
          ["Jingle Bells", "jinglebells"],
          ["Imperial March", "imperial"],
          ["Tetris", "tetris"],
          ["Game of Thrones", "got"],
          ["Pink Panther", "pinkpanther"],
          ["The Simpsons", "simpsons"],
          ["Mission Impossible", "mission"],
          ["Indiana Jones", "indiana"],
          ["Bond Theme", "bond"],
          ["Barbie Girl", "barbie"],
          ["Take On Me", "takeonme"]
        ]), "SONG")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Play a popular song and wait until finished");
    this.setHelpUrl("");
  }
};

// Play Custom RTTTL String (Non-blocking)
Blockly.Blocks['rtttl_play_custom'] = {
  init: function() {
    this.appendValueInput("RTTTL_STRING")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🎹 Play Custom RTTTL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Play custom RTTTL string (non-blocking)");
    this.setHelpUrl("");
  }
};

// Play Custom RTTTL String (Blocking)
Blockly.Blocks['rtttl_play_custom_wait'] = {
  init: function() {
    this.appendValueInput("RTTTL_STRING")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🎹 Play & Wait Custom RTTTL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Play custom RTTTL string and wait until finished");
    this.setHelpUrl("");
  }
};

// Stop Playback
Blockly.Blocks['rtttl_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏹️ Stop RTTTL Playback");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Stop currently playing song");
    this.setHelpUrl("");
  }
};

// Check if Playing
Blockly.Blocks['rtttl_is_playing'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎵 Is RTTTL Playing?");
    this.setOutput(true, "Boolean");
    this.setColour("#666600");
    this.setTooltip("Returns true if a song is currently playing");
    this.setHelpUrl("");
  }
};

// Set Volume
Blockly.Blocks['rtttl_set_volume'] = {
  init: function() {
    this.appendValueInput("VOLUME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🔊 Set Volume (%)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Set buzzer volume (0-100%)");
    this.setHelpUrl("");
  }
};

// Play Musical Note
Blockly.Blocks['rtttl_play_note'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎹 Play Note")
        .appendField(new Blockly.FieldDropdown([
          ["C", "C"],
          ["C# / D♭", "C#"],
          ["D", "D"],
          ["D# / E♭", "D#"],
          ["E", "E"],
          ["F", "F"],
          ["F# / G♭", "F#"],
          ["G", "G"],
          ["G# / A♭", "G#"],
          ["A", "A"],
          ["A# / B♭", "A#"],
          ["B", "B"]
        ]), "NOTE")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("OCTAVE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Octave (1-8)");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Duration (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Play a single musical note with octave and duration");
    this.setHelpUrl("");
  }
};

// Play Frequency
Blockly.Blocks['rtttl_play_frequency'] = {
  init: function() {
    this.appendValueInput("FREQUENCY")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("🎼 Play Frequency (Hz)");
    this.appendValueInput("DURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Duration (ms)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#666600");
    this.setTooltip("Play a specific frequency for a duration");
    this.setHelpUrl("");
  }
};