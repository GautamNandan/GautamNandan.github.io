// MQTT Datasource Plugin for Freeboard
// Based on working mqtest.html model
// Uses Paho MQTT library for WebSocket connections

(function() {
    var mqttDatasource = function(settings, updateCallback) {
        var self = this;
        var currentSettings = settings;
        var client;
        var reconnectTimeout;
        var isConnecting = false;
        
        function connectMQTT() {
            if (isConnecting) {
                console.log("MQTT: Already connecting, skipping...");
                return;
            }
            
            try {
                isConnecting = true;
                
                // Generate random client ID if not provided
                var clientId = currentSettings.client_id || 
                    "freeboard_" + Math.random().toString(16).substr(2, 8) + "_" + Date.now();
                
                var broker = currentSettings.server;
                var port = Number(currentSettings.port);
                var path = currentSettings.path || "/mqtt";
                var useSSL = currentSettings.use_ssl || false;
                
                console.log("=".repeat(60));
                console.log("MQTT: Connecting to broker");
                console.log("=".repeat(60));
                console.log("Broker:", broker);
                console.log("Port:", port);
                console.log("Path:", path);
                console.log("SSL:", useSSL);
                console.log("Client ID:", clientId);
                console.log("Full URL:", (useSSL ? "wss://" : "ws://") + broker + ":" + port + path);
                console.log("=".repeat(60));
                
                // Create MQTT client - EXACTLY like working mqtest.html
                client = new Paho.MQTT.Client(
                    broker,
                    port,
                    path,
                    clientId
                );
                
                console.log("MQTT: Client created successfully");
                
                // Set up callbacks
                client.onConnectionLost = onConnectionLost;
                client.onMessageArrived = onMessageArrived;
                
                // Connection options - matching working test file
                var connectOptions = {
                    timeout: 30,
                    keepAliveInterval: 60,
                    useSSL: useSSL,
                    cleanSession: true,
                    mqttVersion: 4,
                    onSuccess: onConnect,
                    onFailure: onConnectFailure
                };
                
                // Add credentials if provided
                if (currentSettings.username && currentSettings.username.trim() !== "") {
                    connectOptions.userName = currentSettings.username;
                    console.log("MQTT: Using authentication");
                }
                if (currentSettings.password && currentSettings.password.trim() !== "") {
                    connectOptions.password = currentSettings.password;
                }
                
                console.log("MQTT: Connecting with timeout=30s, keepAlive=60s...");
                
                // Connect
                client.connect(connectOptions);
                
            } catch (e) {
                console.error("MQTT Connection Exception:", e);
                isConnecting = false;
            }
        }
        
        function onConnect() {
            isConnecting = false;
            
            console.log("=".repeat(60));
            console.log("🎉 MQTT CONNECTED SUCCESSFULLY!");
            console.log("=".repeat(60));
            console.log("✓ Connection to", currentSettings.server, "established");
            
            // Subscribe to topic
            if (currentSettings.topic) {
                console.log("📬 Subscribing to topic:", currentSettings.topic);
                
                try {
                    client.subscribe(currentSettings.topic, {
                        qos: 0,
                        onSuccess: function() {
                            console.log("✓ Subscribed successfully!");
                            console.log("👂 Listening for messages...");
                            console.log("=".repeat(60));
                        },
                        onFailure: function(error) {
                            console.error("✗ Subscribe failed:", error.errorMessage);
                        }
                    });
                } catch (e) {
                    console.error("Subscribe exception:", e);
                }
            }
        }
        
        function onConnectFailure(error) {
            isConnecting = false;
            
            console.error("=".repeat(60));
            console.error("✗ MQTT CONNECTION FAILED");
            console.error("=".repeat(60));
            console.error("Error:", error.errorMessage);
            console.error("Error Code:", error.errorCode);
            console.error("=".repeat(60));
            
            // Troubleshooting tips
            if (error.errorMessage.includes("timed out")) {
                console.warn("⚠️ Connection timed out - check broker address and port");
            } else if (error.errorCode === 7) {
                console.warn("⚠️ WebSocket connection refused - check SSL setting and port");
            }
            
            // Retry connection after 10 seconds
            reconnectTimeout = setTimeout(function() {
                console.log("🔄 Attempting to reconnect...");
                connectMQTT();
            }, 10000);
        }
        
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.error("=".repeat(60));
                console.error("⚠️ MQTT Connection Lost:", responseObject.errorMessage);
                console.error("=".repeat(60));
                
                // Attempt to reconnect after 5 seconds
                reconnectTimeout = setTimeout(function() {
                    console.log("🔄 Attempting to reconnect...");
                    connectMQTT();
                }, 5000);
            }
        }
        
        function onMessageArrived(message) {
            console.log("=".repeat(60));
            console.log("📨 MESSAGE RECEIVED");
            console.log("=".repeat(60));
            console.log("Topic:", message.destinationName);
            console.log("Payload:", message.payloadString);
            
            var data;
            
            try {
                // Try to parse as JSON if json_data is enabled
                if (currentSettings.json_data) {
                    data = JSON.parse(message.payloadString);
                    console.log("✓ JSON parsed successfully:");
                    console.log(data);
                } else {
                    data = message.payloadString;
                }
            } catch (e) {
                // If JSON parse fails, use raw string
                console.log("⚠️ Not JSON format, using raw string");
                data = message.payloadString;
            }
            
            console.log("=".repeat(60));
            
            // Update the datasource - this is what Freeboard widgets will see
            updateCallback(data);
        }
        
        // Public methods
        this.updateNow = function() {
            // MQTT is real-time, no manual update needed
            console.log("MQTT: Real-time datasource (no manual update needed)");
        };
        
        this.onDispose = function() {
            console.log("MQTT: Disposing datasource");
            
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
            
            if (client && client.isConnected()) {
                try {
                    client.disconnect();
                    console.log("MQTT: Disconnected cleanly");
                } catch (e) {
                    console.error("MQTT: Disconnect error:", e);
                }
            }
        };
        
        this.onSettingsChanged = function(newSettings) {
            console.log("MQTT: Settings changed, reconnecting...");
            currentSettings = newSettings;
            
            // Disconnect existing connection
            if (client && client.isConnected()) {
                try {
                    client.disconnect();
                } catch (e) {
                    console.error("MQTT: Disconnect error:", e);
                }
            }
            
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
            
            isConnecting = false;
            
            // Reconnect with new settings
            setTimeout(function() {
                connectMQTT();
            }, 1000);
        };
        
        // Initialize connection
        console.log("MQTT Datasource Plugin Initialized");
        connectMQTT();
    };
    
    // Register the plugin with Freeboard
    freeboard.loadDatasourcePlugin({
        type_name: "paho_mqtt",
        display_name: "MQTT (Paho WebSocket)",
        description: "Connect to MQTT broker via WebSocket (works with SSL and non-SSL)",
        settings: [
            {
                name: "server",
                display_name: "Broker Address",
                type: "text",
                description: "MQTT broker hostname (e.g., broker.hivemq.com)",
                default_value: "broker.hivemq.com",
                required: true
            },
            {
                name: "port",
                display_name: "WebSocket Port",
                type: "number",
                description: "WebSocket port (8000/8884 for HiveMQ, 8080 for Mosquitto)",
                default_value: 8884,
                required: true
            },
            {
                name: "path",
                display_name: "WebSocket Path",
                type: "text",
                description: "WebSocket path (usually /mqtt or /)",
                default_value: "/mqtt",
                required: false
            },
            {
                name: "use_ssl",
                display_name: "Use SSL/TLS",
                type: "boolean",
                description: "Enable SSL/TLS (wss:// instead of ws://)",
                default_value: true
            },
            {
                name: "client_id",
                display_name: "Client ID",
                type: "text",
                description: "MQTT client ID (leave empty for auto-generate)",
                default_value: "",
                required: false
            },
            {
                name: "username",
                display_name: "Username",
                type: "text",
                description: "MQTT username (leave empty if not required)",
                default_value: "",
                required: false
            },
            {
                name: "password",
                display_name: "Password",
                type: "text",
                description: "MQTT password (leave empty if not required)",
                default_value: "",
                required: false
            },
            {
                name: "topic",
                display_name: "Topic",
                type: "text",
                description: "MQTT topic to subscribe to (e.g., test/kumark1/data)",
                default_value: "test/kumark1/data",
                required: true
            },
            {
                name: "json_data",
                display_name: "Parse as JSON",
                type: "boolean",
                description: "Parse incoming messages as JSON",
                default_value: true
            }
        ],
        newInstance: function(settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new mqttDatasource(settings, updateCallback));
        }
    });
    
    console.log("MQTT Datasource Plugin Loaded");
})();