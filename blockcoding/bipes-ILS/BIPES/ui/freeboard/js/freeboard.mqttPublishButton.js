// MQTT Publish Button Widget for Freeboard
// Allows sending commands to MQTT broker

(function() {
    freeboard.loadWidgetPlugin({
        type_name: "mqtt_button",
        display_name: "MQTT Button",
        description: "Button to publish MQTT messages",
        
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text",
                default_value: "LED Control"
            },
            {
                name: "broker",
                display_name: "Broker Address",
                type: "text",
                default_value: "broker.hivemq.com",
                description: "MQTT broker hostname"
            },
            {
                name: "port",
                display_name: "WebSocket Port",
                type: "number",
                default_value: 8884,
                description: "WebSocket port (8884 for HiveMQ SSL)"
            },
            {
                name: "use_ssl",
                display_name: "Use SSL",
                type: "boolean",
                default_value: true
            },
            {
                name: "topic",
                display_name: "Publish Topic",
                type: "text",
                default_value: "test/kumark1/led",
                description: "Topic to publish to"
            },
            {
                name: "button_on_text",
                display_name: "ON Button Text",
                type: "text",
                default_value: "Turn ON"
            },
            {
                name: "button_off_text",
                display_name: "OFF Button Text",
                type: "text",
                default_value: "Turn OFF"
            },
            {
                name: "button_toggle_text",
                display_name: "TOGGLE Button Text",
                type: "text",
                default_value: "Toggle"
            }
        ],
        
        newInstance: function(settings, newInstanceCallback) {
            newInstanceCallback(new mqttButtonWidget(settings));
        }
    });

    var mqttButtonWidget = function(settings) {
        var self = this;
        var currentSettings = settings;
        var titleElement = $('<h2 class="section-title"></h2>');
        var containerElement = $('<div class="mqtt-button-container"></div>');
        var client = null;
        var isConnected = false;
        
        // Create buttons
        var buttonOn = $('<button class="mqtt-btn mqtt-btn-on">Turn ON</button>');
        var buttonOff = $('<button class="mqtt-btn mqtt-btn-off">Turn OFF</button>');
        var buttonToggle = $('<button class="mqtt-btn mqtt-btn-toggle">Toggle</button>');
        var statusDiv = $('<div class="mqtt-status">Disconnected</div>');
        
        // Add styles
        var style = $('<style>')
            .text(`
                .mqtt-button-container {
                    padding: 10px;
                    text-align: center;
                }
                .mqtt-btn {
                    margin: 5px;
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: bold;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s;
                    min-width: 100px;
                }
                .mqtt-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                .mqtt-btn:active {
                    transform: translateY(0);
                }
                .mqtt-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .mqtt-btn-on {
                    background: #27ae60;
                    color: white;
                }
                .mqtt-btn-on:hover {
                    background: #229954;
                }
                .mqtt-btn-off {
                    background: #e74c3c;
                    color: white;
                }
                .mqtt-btn-off:hover {
                    background: #c0392b;
                }
                .mqtt-btn-toggle {
                    background: #3498db;
                    color: white;
                }
                .mqtt-btn-toggle:hover {
                    background: #2980b9;
                }
                .mqtt-status {
                    margin-top: 10px;
                    padding: 8px;
                    border-radius: 4px;
                    font-weight: bold;
                    background: #ecf0f1;
                }
                .mqtt-status.connected {
                    background: #d4edda;
                    color: #155724;
                }
                .mqtt-status.disconnected {
                    background: #f8d7da;
                    color: #721c24;
                }
            `);
        
        $('head').append(style);
        
        // Connect to MQTT
        function connectMQTT() {
            try {
                var clientId = "freeboard_btn_" + Math.random().toString(16).substr(2, 8);
                var path = "/mqtt";
                
                console.log("MQTT Button: Connecting to", currentSettings.broker);
                
                client = new Paho.MQTT.Client(
                    currentSettings.broker,
                    Number(currentSettings.port),
                    path,
                    clientId
                );
                
                client.onConnectionLost = function(responseObject) {
                    isConnected = false;
                    statusDiv.removeClass('connected').addClass('disconnected').text('Disconnected');
                    buttonOn.prop('disabled', true);
                    buttonOff.prop('disabled', true);
                    buttonToggle.prop('disabled', true);
                    console.error("MQTT Button: Connection lost");
                };
                
                var connectOptions = {
                    timeout: 30,
                    useSSL: currentSettings.use_ssl,
                    onSuccess: function() {
                        isConnected = true;
                        statusDiv.removeClass('disconnected').addClass('connected').text('Connected');
                        buttonOn.prop('disabled', false);
                        buttonOff.prop('disabled', false);
                        buttonToggle.prop('disabled', false);
                        console.log("MQTT Button: Connected!");
                    },
                    onFailure: function(error) {
                        isConnected = false;
                        statusDiv.removeClass('connected').addClass('disconnected').text('Connection Failed');
                        console.error("MQTT Button: Connection failed:", error.errorMessage);
                        
                        // Retry after 5 seconds
                        setTimeout(connectMQTT, 5000);
                    }
                };
                
                client.connect(connectOptions);
                
            } catch (e) {
                console.error("MQTT Button: Exception:", e);
            }
        }
        
        // Publish message
        function publishMessage(command) {
            if (!isConnected || !client) {
                console.error("MQTT Button: Not connected");
                alert("Not connected to MQTT broker");
                return;
            }
            
            try {
                var message = JSON.stringify({ command: command });
                var mqttMessage = new Paho.MQTT.Message(message);
                mqttMessage.destinationName = currentSettings.topic;
                
                client.send(mqttMessage);
                console.log("MQTT Button: Published:", command, "to", currentSettings.topic);
                
                // Visual feedback
                statusDiv.text('Sent: ' + command.toUpperCase());
                setTimeout(function() {
                    statusDiv.text('Connected');
                }, 2000);
                
            } catch (e) {
                console.error("MQTT Button: Publish error:", e);
            }
        }
        
        // Button click handlers
        buttonOn.click(function() {
            publishMessage("on");
        });
        
        buttonOff.click(function() {
            publishMessage("off");
        });
        
        buttonToggle.click(function() {
            publishMessage("toggle");
        });
        
        // Disable buttons initially
        buttonOn.prop('disabled', true);
        buttonOff.prop('disabled', true);
        buttonToggle.prop('disabled', true);
        statusDiv.addClass('disconnected');
        
        // Add buttons to container
        containerElement.append(buttonOn);
        containerElement.append(buttonOff);
        containerElement.append(buttonToggle);
        containerElement.append(statusDiv);
        
        this.render = function(element) {
            $(element).append(titleElement).append(containerElement);
            connectMQTT();
        };
        
        this.onSettingsChanged = function(newSettings) {
            currentSettings = newSettings;
            titleElement.html(newSettings.title);
            buttonOn.text(newSettings.button_on_text);
            buttonOff.text(newSettings.button_off_text);
            buttonToggle.text(newSettings.button_toggle_text);
            
            // Reconnect with new settings
            if (client && isConnected) {
                client.disconnect();
            }
            connectMQTT();
        };
        
        this.onCalculatedValueChanged = function(settingName, newValue) {
            // Not needed for this widget
        };
        
        this.onDispose = function() {
            if (client && isConnected) {
                client.disconnect();
            }
        };
        
        this.getHeight = function() {
            return 3;
        };
        
        this.onSettingsChanged(settings);
    };
}());