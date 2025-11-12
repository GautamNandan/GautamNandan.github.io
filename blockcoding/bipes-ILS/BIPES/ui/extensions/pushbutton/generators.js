Blockly.Python['pushbutton_init'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ticks_ms'] = 'from time import ticks_ms, ticks_diff';
  
  // Create button instance with class
  var button_var = 'button_' + button_id;
  
  // Define the PushButton class if not already defined
  if (!Blockly.Python.definitions_['class_pushbutton']) {
    Blockly.Python.definitions_['class_pushbutton'] = `
class PushButton:
    def __init__(self, pin, long_press_ms=1000):
        self.pin = Pin(pin, Pin.IN, Pin.PULL_UP)
        self.long_press_ms = long_press_ms
        self.pressed = False
        self.press_start = 0
        self.press_count = 0
        self.short_pressed = False
        self.long_pressed = False
        self.last_state = 1
        
    def update(self):
        current = self.pin.value()
        self.short_pressed = False
        self.long_pressed = False
        
        if current == 0 and self.last_state == 1:
            self.pressed = True
            self.press_start = ticks_ms()
            self.press_count += 1
        elif current == 1 and self.last_state == 0:
            self.pressed = False
            duration = ticks_diff(ticks_ms(), self.press_start)
            if duration < self.long_press_ms:
                self.short_pressed = True
            else:
                self.long_pressed = True
        
        self.last_state = current
    
    def is_pressed(self):
        return self.pressed
    
    def was_short_pressed(self):
        return self.short_pressed
    
    def was_long_pressed(self):
        return self.long_pressed
    
    def is_long_pressing(self):
        if self.pressed:
            return ticks_diff(ticks_ms(), self.press_start) >= self.long_press_ms
        return False
    
    def get_press_duration(self):
        if self.pressed:
            return ticks_diff(ticks_ms(), self.press_start)
        return 0
    
    def get_press_count(self):
        return self.press_count
    
    def reset_count(self):
        self.press_count = 0
`;
  }
  
  Blockly.Python.definitions_['button_' + button_id] = 
    button_var + ' = PushButton(' + pin + ')';
  
  var code = '# Push button ' + button_id + ' initialized\n';
  return code;
};

Blockly.Python['pushbutton_init_advanced'] = function(block) {
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC) || '13';
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var long_press_time = Blockly.Python.valueToCode(block, 'LONG_PRESS_TIME', Blockly.Python.ORDER_ATOMIC) || '1000';

  // Add imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_ticks_ms'] = 'from time import ticks_ms, ticks_diff';
  
  // Create button instance with class
  var button_var = 'button_' + button_id;
  
  // Define the PushButton class if not already defined
  if (!Blockly.Python.definitions_['class_pushbutton']) {
    Blockly.Python.definitions_['class_pushbutton'] = `
class PushButton:
    def __init__(self, pin, long_press_ms=1000):
        self.pin = Pin(pin, Pin.IN, Pin.PULL_UP)
        self.long_press_ms = long_press_ms
        self.pressed = False
        self.press_start = 0
        self.press_count = 0
        self.short_pressed = False
        self.long_pressed = False
        self.last_state = 1
        
    def update(self):
        current = self.pin.value()
        self.short_pressed = False
        self.long_pressed = False
        
        if current == 0 and self.last_state == 1:
            self.pressed = True
            self.press_start = ticks_ms()
            self.press_count += 1
        elif current == 1 and self.last_state == 0:
            self.pressed = False
            duration = ticks_diff(ticks_ms(), self.press_start)
            if duration < self.long_press_ms:
                self.short_pressed = True
            else:
                self.long_pressed = True
        
        self.last_state = current
    
    def is_pressed(self):
        return self.pressed
    
    def was_short_pressed(self):
        return self.short_pressed
    
    def was_long_pressed(self):
        return self.long_pressed
    
    def is_long_pressing(self):
        if self.pressed:
            return ticks_diff(ticks_ms(), self.press_start) >= self.long_press_ms
        return False
    
    def get_press_duration(self):
        if self.pressed:
            return ticks_diff(ticks_ms(), self.press_start)
        return 0
    
    def get_press_count(self):
        return self.press_count
    
    def reset_count(self):
        self.press_count = 0
`;
  }
  
  Blockly.Python.definitions_['button_' + button_id] = 
    button_var + ' = PushButton(' + pin + ', ' + long_press_time + ')';
  
  var code = '# Push button ' + button_id + ' initialized with custom timing\n';
  return code;
};

Blockly.Python['pushbutton_is_pressed'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.is_pressed()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_was_short_pressed'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.was_short_pressed()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_was_long_pressed'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.was_long_pressed()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_is_long_pressing'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.is_long_pressing()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_press_count'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.get_press_count()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_press_duration'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.get_press_duration()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['pushbutton_update'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.update()\n';
  return code;
};

Blockly.Python['pushbutton_reset_count'] = function(block) {
  var button_id = Blockly.Python.valueToCode(block, 'BUTTON_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var button_var = 'button_' + button_id;
  
  var code = button_var + '.reset_count()\n';
  return code;
};