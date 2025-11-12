{
  "name": "ILS NeoPixel",
  "version": "1.0.0",
  "description": "Control addressable RGB LED strips (WS2812B/NeoPixel) with ILS blocks. Perfect for creating colorful lighting effects and patterns.",
  "author": "ILS",
  "category": "Display",
  "tags": ["led", "neopixel", "ws2812b", "rgb", "lights", "colors", "strip"],
  "icon": "media/neopixel.png",
  "color": "#9966FF",
  "blocks": "blocks.js",
  "generators": "generators.js",
  "toolbox": "toolbox.xml",
  "requirements": {
    "micropython": ">=1.19",
    "modules": ["neopixel"]
  },
  "hardware": {
    "compatible": ["ESP32", "ESP8266", "Raspberry Pi Pico"],
    "connections": {
      "data": "Any GPIO pin (default: GPIO 25)",
      "power": "5V or 3.3V (depending on LED strip)",
      "ground": "GND"
    }
  },
  "features": [
    "Multiple strip support",
    "RGB and HSL color modes",
    "Visual color picker",
    "Pattern fill functions",
    "Brightness control",
    "Kid-friendly interface (ages 8-14)"
  ],
  "documentation": {
    "quickstart": "Connect NeoPixel data pin to ESP32 GPIO pin. Use Setup block to initialize, create colors, and control individual LEDs or patterns.",
    "examples": [
      {
        "name": "Rainbow Effect",
        "description": "Create a rainbow color pattern across the strip"
      },
      {
        "name": "Traffic Light",
        "description": "Simulate a traffic light with red, yellow, and green LEDs"
      },
      {
        "name": "Knight Rider",
        "description": "Create a scanning LED effect"
      }
    ],
    "tips": [
      "LED numbers start at 0 (first LED is 0, second is 1, etc.)",
      "Always call 'Show' block after setting colors to update the display",
      "Use lower brightness values to save power and reduce heat",
      "RGB values range from 0 (off) to 255 (full brightness)",
      "Connect a capacitor (100-1000µF) across power supply for stability"
    ]
  },
  "blockly_version": "6.20210701.0",
  "brand": "ILS"
}