// IoT Education Plugin for Freeboard
// Designed for students learning embedded systems and IoT
// Easy to maintain and extend

(function() {
    
    // ============================================
    // DEVICE CONFIGURATION DATABASE
    // Easy to add new devices here
    // ============================================
    
    var DEVICE_TYPES = {
        // DISPLAYS
        'lcd_16x2': {
            category: 'Display',
            name: 'LCD 16x2',
            icon: '📟',
            controls: [
                {type: 'textarea', label: 'Text to Display', maxlength: 32, rows: 2, cols: 16, placeholder: 'Line 1 (16 chars)\nLine 2 (16 chars)'}
            ]
        },
        'oled_096': {
            category: 'Display',
            name: 'OLED 0.96"',
            icon: '📺',
            controls: [
                {type: 'textarea', label: 'Text to Display', maxlength: 100, rows: 4, placeholder: 'Enter text for OLED display'}
            ]
        },
        'segment_7': {
            category: 'Display',
            name: '7-Segment 4-Digit',
            icon: '🔢',
            controls: [
                {type: 'text', label: 'Number/Text', maxlength: 4, placeholder: '0-9999'}
            ]
        },
        'dot_matrix': {
            category: 'Display',
            name: 'Dot Matrix',
            icon: '⬛',
            controls: [
                {type: 'text', label: 'Text to Scroll', placeholder: 'Scrolling text'}
            ]
        },
        'led_single': {
            category: 'Display',
            name: 'Single LED',
            icon: '💡',
            controls: [
                {type: 'toggle', label: 'LED State'}
            ]
        },
        'led_4piece': {
            category: 'Display',
            name: 'LED Array (4 LEDs)',
            icon: '💡💡💡💡',
            controls: [
                {type: 'multi_toggle', label: 'LED States', count: 4}
            ]
        },
        'led_traffic': {
            category: 'Display',
            name: 'Traffic Light (R/Y/G)',
            icon: '🚦',
            controls: [
                {type: 'radio', label: 'Active Light', options: ['Red', 'Yellow', 'Green', 'All Off']}
            ]
        },
        'neopixel_8': {
            category: 'Display',
            name: 'NeoPixel (8 LEDs)',
            icon: '🌈',
            controls: [
                {type: 'color', label: 'All LEDs Color'},
                {type: 'slider', label: 'Brightness', min: 0, max: 255, unit: '%'}
            ]
        },
        'rgb_led': {
            category: 'Display',
            name: 'RGB LED',
            icon: '🔴🟢🔵',
            controls: [
                {type: 'color', label: 'LED Color'}
            ]
        },
        
        // ACTUATORS
        'dc_motor': {
            category: 'Actuator',
            name: 'DC Motor',
            icon: '⚙️',
            controls: [
                {type: 'slider', label: 'Speed', min: 0, max: 255, unit: 'PWM'},
                {type: 'radio', label: 'Direction', options: ['Forward', 'Reverse', 'Stop']}
            ]
        },
        'relay': {
            category: 'Actuator',
            name: 'Relay',
            icon: '🔌',
            controls: [
                {type: 'toggle', label: 'Relay State'}
            ]
        },
        'servo_motor': {
            category: 'Actuator',
            name: 'Servo Motor',
            icon: '🔄',
            controls: [
                {type: 'slider', label: 'Angle', min: 0, max: 180, unit: '°'}
            ]
        },
        'buzzer': {
            category: 'Actuator',
            name: 'Buzzer',
            icon: '🔊',
            controls: [
                {type: 'toggle', label: 'Buzzer State'},
                {type: 'slider', label: 'Frequency', min: 100, max: 5000, unit: 'Hz'}
            ]
        },
        
        // SENSORS (Request-based)
        'sensor_ldr': {
            category: 'Sensor',
            name: 'LDR (Light Sensor)',
            icon: '💡📊',
            controls: [
                {type: 'request', label: 'Get Light Value', response_type: 'number', unit: 'lux'}
            ]
        },
        'sensor_rgb': {
            category: 'Sensor',
            name: 'RGB Color Sensor',
            icon: '🌈📊',
            controls: [
                {type: 'request', label: 'Get RGB Values', response_type: 'rgb'}
            ]
        },
        'sensor_pot': {
            category: 'Sensor',
            name: 'Potentiometer',
            icon: '🎚️',
            controls: [
                {type: 'request', label: 'Get Pot Value', response_type: 'number', unit: ''}
            ]
        },
        'sensor_ir': {
            category: 'Sensor',
            name: 'IR Sensor',
            icon: '👁️',
            controls: [
                {type: 'request', label: 'Get IR State', response_type: 'boolean'}
            ]
        }
    };
    
    // ============================================
    // FREEBOARD WIDGET PLUGIN
    // ============================================
    
    freeboard.loadWidgetPlugin({
        type_name: "iot_education_control",
        display_name: "IoT Device Control",
        description: "Educational IoT device control - Easy for students to use",
        
        settings: [
            {
                name: "device_type",
                display_name: "Device Type",
                type: "option",
                options: Object.keys(DEVICE_TYPES).map(function(key) {
                    var device = DEVICE_TYPES[key];
                    return {
                        name: device.icon + ' ' + device.name + ' (' + device.category + ')',
                        value: key
                    };
                })
            },
            {
                name: "device_name",
                display_name: "Device Name/ID",
                type: "text",
                default_value: "my_device",
                description: "Give your device a unique name (e.g., front_led, motor1)"
            },
            {
                name: "broker",
                display_name: "MQTT Broker",
                type: "text",
                default_value: "broker.hivemq.com"
            },
            {
                name: "port",
                display_name: "WebSocket Port",
                type: "number",
                default_value: 8884
            },
            {
                name: "use_ssl",
                display_name: "Use SSL",
                type: "boolean",
                default_value: true
            },
            {
                name: "topic_command",
                display_name: "Command Topic",
                type: "text",
                default_value: "iot/student/command",
                description: "Topic to send commands"
            },
            {
                name: "topic_response",
                display_name: "Response Topic (Sensors)",
                type: "text",
                default_value: "iot/student/response",
                description: "Topic to receive sensor data"
            }
        ],
        
        newInstance: function(settings, newInstanceCallback) {
            newInstanceCallback(new iotEducationWidget(settings));
        }
    });
    
    // ============================================
    // WIDGET IMPLEMENTATION
    // ============================================
    
    var iotEducationWidget = function(settings) {
        var self = this;
        var currentSettings = settings;
        var client = null;
        var isConnected = false;
        
        var containerElement = $('<div class="iot-edu-widget"></div>');
        var headerElement = $('<div class="iot-edu-header"></div>');
        var controlsElement = $('<div class="iot-edu-controls"></div>');
        var statusElement = $('<div class="iot-edu-status">Disconnected</div>');
        var responseElement = $('<div class="iot-edu-response" style="display:none;"></div>');
        
        // Add comprehensive styles
        var style = $('<style>').text(`
            .iot-edu-widget {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 12px;
                padding: 20px;
                color: white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            .iot-edu-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 2px solid rgba(255,255,255,0.3);
            }
            .iot-edu-icon {
                font-size: 32px;
            }
            .iot-edu-title {
                flex: 1;
            }
            .iot-edu-device-name {
                font-size: 18px;
                font-weight: bold;
            }
            .iot-edu-device-type {
                font-size: 12px;
                opacity: 0.8;
            }
            .iot-edu-controls {
                background: rgba(255,255,255,0.15);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 12px;
            }
            .iot-control-item {
                margin-bottom: 15px;
            }
            .iot-control-item:last-child {
                margin-bottom: 0;
            }
            .iot-control-label {
                display: block;
                font-weight: bold;
                margin-bottom: 8px;
                font-size: 14px;
            }
            .iot-toggle-switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
            }
            .iot-toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .iot-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: rgba(255,255,255,0.3);
                transition: .4s;
                border-radius: 34px;
            }
            .iot-toggle-slider:before {
                position: absolute;
                content: "";
                height: 26px; width: 26px;
                left: 4px; bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .iot-toggle-slider {
                background-color: #4CAF50;
            }
            input:checked + .iot-toggle-slider:before {
                transform: translateX(26px);
            }
            .iot-slider {
                width: 100%;
                height: 8px;
                border-radius: 5px;
                outline: none;
                -webkit-appearance: none;
                background: rgba(255,255,255,0.3);
            }
            .iot-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px; height: 20px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            }
            .iot-slider::-moz-range-thumb {
                width: 20px; height: 20px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                border: none;
            }
            .iot-value-display {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin: 10px 0;
                padding: 10px;
                background: rgba(255,255,255,0.2);
                border-radius: 5px;
            }
            .iot-textarea, .iot-textinput {
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 5px;
                font-size: 14px;
                font-family: monospace;
                box-sizing: border-box;
                background: rgba(255,255,255,0.9);
            }
            .iot-textarea {
                resize: vertical;
                min-height: 60px;
            }
            .iot-radio-group {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            .iot-radio-btn {
                padding: 8px 16px;
                background: rgba(255,255,255,0.3);
                border: 2px solid transparent;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .iot-radio-btn:hover {
                background: rgba(255,255,255,0.4);
            }
            .iot-radio-btn.active {
                background: white;
                color: #667eea;
                border-color: white;
            }
            .iot-send-btn {
                width: 100%;
                padding: 12px;
                background: white;
                color: #667eea;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                margin-top: 10px;
                transition: transform 0.2s;
            }
            .iot-send-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .iot-send-btn:active {
                transform: translateY(0);
            }
            .iot-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .iot-request-btn {
                width: 100%;
                padding: 12px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            }
            .iot-request-btn:hover {
                background: #45a049;
            }
            .iot-request-btn.loading {
                background: #FF9800;
            }
            .iot-edu-status {
                text-align: center;
                padding: 8px;
                border-radius: 5px;
                font-weight: bold;
                font-size: 12px;
                background: rgba(255,255,255,0.2);
            }
            .iot-edu-status.connected {
                background: rgba(76, 175, 80, 0.8);
            }
            .iot-edu-status.disconnected {
                background: rgba(244, 67, 54, 0.8);
            }
            .iot-edu-response {
                margin-top: 12px;
                padding: 12px;
                background: rgba(255,255,255,0.2);
                border-radius: 5px;
                border-left: 4px solid #4CAF50;
            }
            .iot-response-label {
                font-size: 12px;
                opacity: 0.8;
                margin-bottom: 5px;
            }
            .iot-response-value {
                font-size: 20px;
                font-weight: bold;
            }
            .iot-color-preview {
                width: 100%;
                height: 50px;
                border-radius: 5px;
                margin-top: 10px;
                border: 2px solid white;
            }
            .iot-multi-toggle-group {
                display: flex;
                gap: 10px;
            }
            .iot-multi-toggle-item {
                flex: 1;
                text-align: center;
            }
            .iot-multi-toggle-label {
                font-size: 12px;
                margin-bottom: 5px;
            }
        `);
        
        $('head').append(style);
        
        // MQTT Connection
        function connectMQTT() {
            try {
                var clientId = "iot_edu_" + Math.random().toString(16).substr(2, 8);
                
                console.log("IoT Education: Connecting to", currentSettings.broker);
                
                client = new Paho.MQTT.Client(
                    currentSettings.broker,
                    Number(currentSettings.port),
                    "/mqtt",
                    clientId
                );
                
                client.onConnectionLost = function() {
                    isConnected = false;
                    statusElement.removeClass('connected').addClass('disconnected').text('⚠️ Disconnected');
                    disableControls();
                };
                
                client.onMessageArrived = function(message) {
                    handleSensorResponse(message);
                };
                
                var connectOptions = {
                    timeout: 30,
                    useSSL: currentSettings.use_ssl,
                    onSuccess: function() {
                        isConnected = true;
                        statusElement.removeClass('disconnected').addClass('connected').text('✓ Connected');
                        enableControls();
                        
                        // Subscribe to response topic for sensors
                        client.subscribe(currentSettings.topic_response);
                        console.log("IoT Education: Connected and subscribed to", currentSettings.topic_response);
                    },
                    onFailure: function(error) {
                        isConnected = false;
                        statusElement.text('❌ Connection Failed');
                        console.error("IoT Education: Failed:", error.errorMessage);
                        setTimeout(connectMQTT, 5000);
                    }
                };
                
                client.connect(connectOptions);
                
            } catch (e) {
                console.error("IoT Education: Exception:", e);
            }
        }
        
        // Publish command
        function publishCommand(command, value) {
            if (!isConnected || !client) {
                alert("Not connected to MQTT broker");
                return;
            }
            
            var payload = {
                device: currentSettings.device_name,
                type: currentSettings.device_type,
                command: command,
                value: value,
                timestamp: Date.now()
            };
            
            var message = JSON.stringify(payload);
            var mqttMessage = new Paho.MQTT.Message(message);
            mqttMessage.destinationName = currentSettings.topic_command;
            
            client.send(mqttMessage);
            console.log("Published:", payload);
        }
        
        // Handle sensor response
        function handleSensorResponse(message) {
            try {
                var data = JSON.parse(message.payloadString);
                
                // Only show if it's for this device
                if (data.device === currentSettings.device_name) {
                    displaySensorResponse(data);
                }
            } catch (e) {
                console.error("Error parsing sensor response:", e);
            }
        }
        
        // Display sensor response
        function displaySensorResponse(data) {
            responseElement.show();
            
            var html = '<div class="iot-response-label">Response:</div>';
            html += '<div class="iot-response-value">';
            
            if (typeof data.value === 'object') {
                // RGB sensor
                html += 'R: ' + data.value.r + ', G: ' + data.value.g + ', B: ' + data.value.b;
            } else {
                html += data.value + (data.unit || '');
            }
            
            html += '</div>';
            responseElement.html(html);
            
            // Hide after 5 seconds
            setTimeout(function() {
                responseElement.fadeOut();
            }, 5000);
        }
        
        // Build controls based on device type
        function buildControls() {
            controlsElement.empty();
            responseElement.hide();
            
            var deviceConfig = DEVICE_TYPES[currentSettings.device_type];
            if (!deviceConfig) return;
            
            // Update header
            headerElement.html(
                '<div class="iot-edu-icon">' + deviceConfig.icon + '</div>' +
                '<div class="iot-edu-title">' +
                    '<div class="iot-edu-device-name">' + currentSettings.device_name + '</div>' +
                    '<div class="iot-edu-device-type">' + deviceConfig.name + '</div>' +
                '</div>'
            );
            
            // Build each control
            deviceConfig.controls.forEach(function(control) {
                var controlDiv = $('<div class="iot-control-item"></div>');
                var label = $('<div class="iot-control-label">' + control.label + '</div>');
                controlDiv.append(label);
                
                switch(control.type) {
                    case 'toggle':
                        controlDiv.append(createToggle(control));
                        break;
                    case 'slider':
                        controlDiv.append(createSlider(control));
                        break;
                    case 'text':
                        controlDiv.append(createTextInput(control));
                        break;
                    case 'textarea':
                        controlDiv.append(createTextarea(control));
                        break;
                    case 'color':
                        controlDiv.append(createColorPicker(control));
                        break;
                    case 'radio':
                        controlDiv.append(createRadioGroup(control));
                        break;
                    case 'multi_toggle':
                        controlDiv.append(createMultiToggle(control));
                        break;
                    case 'request':
                        controlDiv.append(createRequestButton(control));
                        break;
                }
                
                controlsElement.append(controlDiv);
            });
        }
        
        // Control builders
        function createToggle(control) {
            var container = $('<div style="text-align: center;"></div>');
            var label = $('<label class="iot-toggle-switch"></label>');
            var input = $('<input type="checkbox">');
            var slider = $('<span class="iot-toggle-slider"></span>');
            
            input.change(function() {
                publishCommand('state', this.checked ? 'on' : 'off');
            });
            
            label.append(input).append(slider);
            container.append(label);
            return container;
        }
        
        function createSlider(control) {
            var container = $('<div></div>');
            var valueDisplay = $('<div class="iot-value-display">' + control.min + ' ' + (control.unit || '') + '</div>');
            var slider = $('<input type="range" class="iot-slider">');
            
            slider.attr('min', control.min);
            slider.attr('max', control.max);
            slider.val(control.min);
            
            slider.on('input', function() {
                valueDisplay.text(this.value + ' ' + (control.unit || ''));
            });
            
            slider.on('change', function() {
                publishCommand(control.label.toLowerCase().replace(/ /g, '_'), parseInt(this.value));
            });
            
            container.append(valueDisplay).append(slider);
            return container;
        }
        
        function createTextInput(control) {
            var input = $('<input type="text" class="iot-textinput">');
            input.attr('placeholder', control.placeholder || '');
            input.attr('maxlength', control.maxlength || 100);
            
            var sendBtn = $('<button class="iot-send-btn">Send</button>');
            sendBtn.click(function() {
                var value = input.val();
                if (value) {
                    publishCommand('display', value);
                }
            });
            
            return $('<div></div>').append(input).append(sendBtn);
        }
        
        function createTextarea(control) {
            var textarea = $('<textarea class="iot-textarea"></textarea>');
            textarea.attr('placeholder', control.placeholder || '');
            textarea.attr('maxlength', control.maxlength || 200);
            textarea.attr('rows', control.rows || 3);
            
            var sendBtn = $('<button class="iot-send-btn">Send to Display</button>');
            sendBtn.click(function() {
                var value = textarea.val();
                if (value) {
                    publishCommand('display', value);
                }
            });
            
            return $('<div></div>').append(textarea).append(sendBtn);
        }
        
        function createColorPicker(control) {
            var container = $('<div></div>');
            var colorInput = $('<input type="color" value="#ff0000" style="width: 100%; height: 50px; cursor: pointer; border: none; border-radius: 5px;">');
            var preview = $('<div class="iot-color-preview"></div>');
            
            colorInput.on('change', function() {
                var color = this.value;
                preview.css('background-color', color);
                
                var r = parseInt(color.substr(1,2), 16);
                var g = parseInt(color.substr(3,2), 16);
                var b = parseInt(color.substr(5,2), 16);
                
                publishCommand('color', {r: r, g: g, b: b, hex: color});
            });
            
            preview.css('background-color', '#ff0000');
            container.append(colorInput).append(preview);
            return container;
        }
        
        function createRadioGroup(control) {
            var group = $('<div class="iot-radio-group"></div>');
            
            control.options.forEach(function(option) {
                var btn = $('<div class="iot-radio-btn">' + option + '</div>');
                btn.click(function() {
                    group.find('.iot-radio-btn').removeClass('active');
                    $(this).addClass('active');
                    publishCommand('mode', option.toLowerCase().replace(/ /g, '_'));
                });
                group.append(btn);
            });
            
            return group;
        }
        
        function createMultiToggle(control) {
            var group = $('<div class="iot-multi-toggle-group"></div>');
            
            for (var i = 0; i < control.count; i++) {
                var item = $('<div class="iot-multi-toggle-item"></div>');
                var label = $('<div class="iot-multi-toggle-label">LED ' + (i + 1) + '</div>');
                var toggleLabel = $('<label class="iot-toggle-switch"></label>');
                var input = $('<input type="checkbox" data-index="' + i + '">');
                var slider = $('<span class="iot-toggle-slider"></span>');
                
                input.change(function() {
                    var states = [];
                    group.find('input[type="checkbox"]').each(function() {
                        states.push(this.checked ? 1 : 0);
                    });
                    publishCommand('led_states', states);
                });
                
                toggleLabel.append(input).append(slider);
                item.append(label).append(toggleLabel);
                group.append(item);
            }
            
            return group;
        }
        
        function createRequestButton(control) {
            var btn = $('<button class="iot-request-btn">📊 ' + control.label + '</button>');
            
            btn.click(function() {
                btn.addClass('loading').text('⏳ Requesting...');
                publishCommand('request', control.response_type);
                
                setTimeout(function() {
                    btn.removeClass('loading').text('📊 ' + control.label);
                }, 3000);
            });
            
            return btn;
        }
        
        function disableControls() {
            containerElement.find('button, input, select, textarea').prop('disabled', true);
        }
        
        function enableControls() {
            containerElement.find('button, input, select, textarea').prop('disabled', false);
        }
        
        // Public methods
        this.render = function(element) {
            $(element).append(containerElement);
            containerElement.append(headerElement).append(controlsElement).append(statusElement).append(responseElement);
            buildControls();
            disableControls();
            connectMQTT();
        };
        
        this.onSettingsChanged = function(newSettings) {
            currentSettings = newSettings;
            buildControls();
            
            if (client && isConnected) {
                client.disconnect();
            }
            connectMQTT();
        };
        
        this.onCalculatedValueChanged = function(settingName, newValue) {};
        
        this.onDispose = function() {
            if (client && isConnected) {
                client.disconnect();
            }
        };
        
        this.getHeight = function() {
            return 5;
        };
        
        this.onSettingsChanged(settings);
    };
    
    console.log("IoT Education Plugin Loaded - Device Types:", Object.keys(DEVICE_TYPES).length);
    
}());