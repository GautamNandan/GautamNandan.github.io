'use strict';

/**
 * =============================================================================
 * BLOCKLY SCREENSHOT UTILITIES
 * Code from: https://github.com/google/blockly/blob/096d1c46c5066cfa7e59db3b41405b7e854b95d0/tests/playgrounds/screenshot.js
 * @license Copyright 2019 Google LLC - SPDX-License-Identifier: Apache-2.0
 * @author samelh@google.com (Sam El-Husseini)
 * =============================================================================
 */

/**
 * Convert an SVG datauri into a PNG datauri
 * @param {string} data - SVG datauri
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {Function} callback - Callback function
 */
function svgToPng_(data, width, height, callback) {
  if (!data || !callback) {
    console.error('ILS: Invalid parameters for svgToPng_');
    return;
  }

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    const pixelDensity = 10;

    canvas.width = width * pixelDensity;
    canvas.height = height * pixelDensity;

    img.onload = function() {
      try {
        context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/png');
        callback(dataUri);
      } catch (err) {
        console.error('ILS: Error converting workspace SVG to PNG:', err);
        callback('');
      }
    };

    img.onerror = function() {
      console.error('ILS: Error loading image for conversion');
      callback('');
    };

    img.src = data;
  } catch (error) {
    console.error('ILS: Error in svgToPng_:', error);
    callback('');
  }
}

/**
 * Create an SVG of the blocks on the workspace
 * @param {Blockly.WorkspaceSvg} workspace - The workspace
 * @param {Function} callback - Callback function
 * @param {string} customCss - Custom CSS to append to the SVG
 */
function workspaceToSvg_(workspace, callback, customCss) {
  if (!workspace || !callback) {
    console.error('ILS: Invalid workspace or callback for workspaceToSvg_');
    return;
  }

  try {
    // Sync all text areas with their values
    const textAreas = document.getElementsByTagName("textarea");
    for (let i = 0; i < textAreas.length; i++) {
      textAreas[i].innerHTML = textAreas[i].value;
    }

    // Get workspace bounding box
    const bBox = workspace.getBlocksBoundingBox();
    const x = bBox.x || bBox.left;
    const y = bBox.y || bBox.top;
    const width = bBox.width || bBox.right - x;
    const height = bBox.height || bBox.bottom - y;

    // Clone the block canvas
    const blockCanvas = workspace.getCanvas();
    const clone = blockCanvas.cloneNode(true);
    clone.removeAttribute('transform');

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.appendChild(clone);
    svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('style', 'background-color: transparent');

    // Set SVG class with renderer and theme
    const renderer = workspace.options.renderer || 'geras';
    const theme = workspace.getTheme ? workspace.getTheme().name : '';
    svg.setAttribute('class', `blocklySvg ${renderer}-renderer ${theme ? theme + '-theme' : ''}`);

    // Extract and add styles
    const styles = [].slice.call(document.head.querySelectorAll('style'))
      .filter(el => /\.blocklySvg/.test(el.innerText) || (el.id.indexOf('blockly-') === 0))
      .map(el => el.innerText)
      .join('\n');

    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles + '\n' + (customCss || '');
    svg.insertBefore(styleElement, svg.firstChild);

    // Serialize and encode SVG
    let svgAsXML = (new XMLSerializer()).serializeToString(svg);
    svgAsXML = svgAsXML.replace(/&nbsp/g, '&#160');
    const data = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);

    svgToPng_(data, width, height, callback);
  } catch (error) {
    console.error('ILS: Error in workspaceToSvg_:', error);
    callback('');
  }
}

/**
 * Download a screenshot of the blocks on a Blockly workspace
 * @param {Blockly.WorkspaceSvg} workspace - The Blockly workspace
 */
Blockly.downloadScreenshot = function(workspace) {
  if (!workspace) {
    console.error('ILS: No workspace provided for screenshot');
    return;
  }

  workspaceToSvg_(workspace, function(datauri) {
    if (!datauri) {
      console.error('ILS: Failed to generate screenshot');
      return;
    }

    try {
      const a = document.createElement('a');
      a.download = 'screenshot.png';
      a.target = '_self';
      a.href = datauri;
      document.body.appendChild(a);
      a.click();
      a.parentNode.removeChild(a);
    } catch (error) {
      console.error('ILS: Error downloading screenshot:', error);
    }
  });
};

/**
 * =============================================================================
 * TOOL CLASS - Generic Utility Functions
 * =============================================================================
 */

class Tool {
  constructor() {
    console.warn('ILS: Tool class should not be instantiated, use static methods only');
  }

  /**
   * Fix async/await syntax in generated Python code
   * Converts regular function definitions to async and adds await to function calls
   * @param {string} code - Python code to process
   * @returns {string} Modified code with async/await
   */
  static fixAsyncInCode(code) {
    if (!code || typeof code !== 'string') {
      console.error('ILS: Invalid code provided to fixAsyncInCode');
      return '';
    }

    try {
      const lines = code.split('\n');
      const functionNames = [];
      const excludeFunctions = ['on_cretile_iot_data'];
      let hasOnStart = false;

      // First pass: Convert function definitions to async
      lines.forEach((line, index) => {
        if (line.startsWith('def')) {
          // Check if function should be excluded
          const shouldExclude = excludeFunctions.some(excludedFunc => 
            line.trim().indexOf(excludedFunc) >= 0
          );

          if (shouldExclude) {
            // Skip this function
          } else {
            // Extract function name and add to list
            const functionName = line.split('def')[1].trim().slice(0, -1);
            functionNames.push(functionName);
            lines[index] = 'async ' + line;
          }
        }

        if (line.includes('async def onStart')) {
          hasOnStart = true;
        }
      });

      // Second pass: Add await to function calls
      if (hasOnStart) {
        lines.forEach((line, index) => {
          if (!line.trim()) return;

          // Check if line is a direct function call (no other code)
          if (functionNames.includes(line.trim())) {
            const spaceCount = line.split(' ').length - 1;
            const indentation = ' '.repeat(spaceCount);
            lines[index] = indentation + 'await ' + line.trim();
          } else {
            // Check if line contains a function call within a statement
            for (const funcName of functionNames) {
              if (line.trim().includes(funcName)) {
                // Don't add await to function definitions
                if (!line.trim().startsWith("async def")) {
                  const indexOfFunc = line.indexOf(funcName);
                  const fullStatement = line.substr(0, indexOfFunc) + 'await ' + line.substr(indexOfFunc);
                  lines[index] = fullStatement;
                  break; // Only process once per line
                }
              }
            }
          }
        });
      }

      return lines.join('\n');
    } catch (error) {
      console.error('ILS: Error in fixAsyncInCode:', error);
      return code; // Return original code on error
    }
  }

  /**
   * Run Python code on the connected device
   * @param {string} code_ - Code to be sent (optional, generates from workspace if not provided)
   */
  static runPython(code_) {
    try {
      let code = code_ === undefined 
        ? Blockly.Python.workspaceToCode(Code.workspace) 
        : code_;

      code = Tool.fixAsyncInCode(code);

      if (code) {
        code += '\r\r'; // Snek workaround
        mux.bufferPush(`\x05${code}\x04`);
        UI['progress'].start(Channel.websocket.buffer_.length);
      }
    } catch (error) {
      console.error('ILS: Error running Python code:', error);
    }
  }

  /**
   * Stop running Python program by sending Ctrl+C
   */
  static stopPython() {
    try {
      mux.bufferPush('\x03\x03');
    } catch (error) {
      console.error('ILS: Error stopping Python:', error);
    }
  }

  /**
   * Perform a soft reset of the device
   */
  static softReset() {
    try {
      if (Channel['websocket'].connected) {
        setTimeout(() => {
          Channel['websocket'].connect(
            UI['workspace'].websocket.url.value,
            UI['workspace'].websocket.pass.value
          );
        }, 2000);
      } else if (Channel['webbluetooth'].connected) {
        setTimeout(() => {
          Channel['webbluetooth'].connect();
        }, 1000);
      }
      mux.bufferPush('\x04');
    } catch (error) {
      console.error('ILS: Error in soft reset:', error);
    }
  }

  /**
   * Async sleep function that allows UI updates
   * @param {number} milliseconds - Time to sleep in milliseconds
   * @returns {Promise} Promise that resolves after the specified time
   */
  static asleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Blocking sleep function (deprecated - use asleep instead)
   * @deprecated Use asleep() instead for non-blocking delays
   * @param {number} milliseconds - Time to sleep in milliseconds
   */
  static sleep(milliseconds) {
    const startDate = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - startDate < milliseconds);
  }

  /**
   * Update source code in the file editor
   * @param {Blob} code - Code blob
   * @param {string} fileName - File name for the code
   */
  static updateSourceCode(code, fileName) {
    if (!code || !fileName) {
      console.error('ILS: Invalid parameters for updateSourceCode');
      return;
    }

    try {
      const reader = new FileReader();

      reader.addEventListener('loadend', (e) => {
        let text = e.srcElement.result;
        text = Tool.fixAsyncInCode(text);
        Files.editor.getDoc().setValue(text);
        UI['workspace'].content_file_name.value = fileName;
      });

      reader.addEventListener('error', () => {
        console.error('ILS: Error reading file');
      });

      reader.readAsText(code);
    } catch (error) {
      console.error('ILS: Error updating source code:', error);
    }
  }

  /**
   * Generate Python code from blocks and append to file editor
   * @deprecated
   */
  static blocksToPython() {
    try {
      const code = Blockly.Python.workspaceToCode(Code.workspace);
      Files.editor.getDoc().setValue(code);
    } catch (error) {
      console.error('ILS: Error converting blocks to Python:', error);
    }
  }

  /**
   * Decode response data to fetch status code
   * @param {Uint8Array} data - Response data
   * @returns {number} Status code or -1 on error
   */
  static decode_resp(data) {
    if (!data || data.length < 4) {
      return -1;
    }

    try {
      if (data[0] === 'W'.charCodeAt(0) && data[1] === 'B'.charCodeAt(0)) {
        const code = data[2] | (data[3] << 8);
        return code;
      }
      return -1;
    } catch (error) {
      console.error('ILS: Error decoding response:', error);
      return -1;
    }
  }

  /**
   * Convert Unix timestamp to formatted time string
   * @param {number} timestamp - Unix timestamp (optional, uses current time if not provided)
   * @returns {string} Formatted time (HH:MM:SS)
   */
  static unix2date(timestamp) {
    try {
      const date = timestamp === undefined 
        ? new Date(+new Date()) 
        : new Date(timestamp);

      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();

      return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    } catch (error) {
      console.error('ILS: Error converting timestamp:', error);
      return '00:00:00';
    }
  }

  /**
   * Check incoming data for special markers like $BIPES-DATA: for plotting
   */
  static bipesVerify() {
    const re = /\r\n\$(.*):(.*)\r\n/;

    try {
      if (re.test(Files.received_string)) {
        const match_ = Files.received_string.match(re);

        if (match_.length === 3) {
          const coordinates = match_[2].split(',').map(item => parseFloat(item));
          window.frames[3].modules.DataStorage.push(match_[1], coordinates);

          // Compatibility layer with old BIPES-DATA:INDEX,DATA
          if (match_[1] === "BIPES-DATA") {
            coordinates[0] = parseInt(coordinates[0]);
            coordinates[1] = parseFloat(coordinates[1]);
            const q = new Queue(coordinates[0]);
            q.enqueue(coordinates[1]);

            if (UI['workspace'].EasyMQTT_bridge.checked) {
              Tool.EasyMQTTBridge(coordinates[0], coordinates[1]);
            }
          }
        }

        Files.received_string = Files.received_string.replace(re, '\r\n');
      }
    } catch (error) {
      console.error('ILS: Error in bipesVerify:', error);
    }
  }

  /**
   * Bridge incoming data to MQTT
   * @param {number} id_ - ID for the MQTT message
   * @param {number} value_ - Value for the MQTT message
   */
  static EasyMQTTBridge(id_, value_) {
    try {
      const easyMQTTsession = window.localStorage['bridgeSession'];

      if (easyMQTTsession) {
        xhrGET(
          `https://bipes.net.br/easymqtt/publish.php?session=${easyMQTTsession}&topic=Topic${id_}&value=${value_}`,
          '',
          (ev) => {
            UI['notify'].log(ev);
          }
        );
      }
    } catch (error) {
      console.error('ILS: Error in EasyMQTT bridge:', error);
    }
  }

  /**
   * Clear all queue data from localStorage
   */
  static clearQueue() {
    try {
      for (let i = 0; i < 20; i++) {
        const item = localStorage.getItem("queue" + i);
        if (item) {
          window.localStorage.removeItem('queue' + i);
          UI['notify'].log(`Cleaned queue ${i}`);
        }
      }
    } catch (error) {
      console.error('ILS: Error clearing queue:', error);
    }
  }

  /**
   * Get code for a MicroPython library from ui/pylibs
   * @param {string} pName - File name for a MicroPython library
   */
  static getText(pName) {
    if (!pName) {
      console.error('ILS: No library name provided');
      return;
    }

    try {
      const request = new XMLHttpRequest();
      request.open('GET', '/beta2/ui/pylibs/' + pName, true);
      request.send(null);

      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          if (typeof request.response === 'string') {
            Files.editor.getDoc().setValue(request.responseText);
            Files.file_save_as.className = 'py';
            UI['workspace'].content_file_name.value = pName;
          }
        }
      };

      request.onerror = function() {
        console.error('ILS: Error fetching library:', pName);
      };
    } catch (error) {
      console.error('ILS: Error in getText:', error);
    }
  }

  /**
   * Generate a name for a Blockly project based on code content
   * @param {string} code - Blockly generated code
   * @param {string} ext - File extension
   * @returns {string} Generated project name
   */
  static makeAName(code, ext) {
    if (!code) {
      return ext === '' ? 'My BIPES Project' : `my_project.bipes.${ext}`;
    }

    try {
      const desc = code.match(/#Description: '(.*)'/);
      const imports = [...code.matchAll(/import (.*)/g)];

      if (ext === '') {
        return desc ? `${desc[1].slice()}${ext}` : 'My BIPES Project';
      } else {
        let projectName = desc ? desc[1] : 'code';
        projectName = projectName.toLowerCase()
          .replaceAll(' ', '_')
          .replaceAll('.', '')
          .slice()
          .substring(0, 30);

        if (desc) {
          return `${projectName}.bipes.${ext}`;
        } else if (imports.length) {
          return `my_${imports.slice(-1)[0][1]}_project.bipes.${ext}`;
        } else {
          return `my_project.bipes.${ext}`;
        }
      }
    } catch (error) {
      console.error('ILS: Error generating name:', error);
      return `project.bipes.${ext}`;
    }
  }

  /**
   * Convert RGB to HEX color code
   * @param {number} r - Red (0-255)
   * @param {number} g - Green (0-255)
   * @param {number} b - Blue (0-255)
   * @returns {string} HEX color code
   */
  static RGB2HEX(r, g, b) {
    try {
      const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    } catch (error) {
      console.error('ILS: Error in RGB2HEX:', error);
      return '#000000';
    }
  }

  /**
   * Convert HEX to RGB color code
   * @param {string} hex - HEX color code
   * @returns {Object|null} RGB object {r, g, b} or null on error
   */
  static HEX2RGB(hex) {
    if (!hex) {
      return null;
    }

    try {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    } catch (error) {
      console.error('ILS: Error in HEX2RGB:', error);
      return null;
    }
  }

  /**
   * Convert HSL to HEX color code
   * @param {number} h - Hue (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Lightness (0-100)
   * @returns {string} HEX color code
   */
  static HUE2HEX(h, s, l) {
    try {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;

      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };

      return `#${f(0)}${f(8)}${f(4)}`;
    } catch (error) {
      console.error('ILS: Error in HUE2HEX:', error);
      return '#000000';
    }
  }

  /**
   * Display warnings if criteria are met
   * @param {Object} self - Object containing warning_ array
   * @param {Array} criteria - Array of [function, string] pairs
   */
  static warningIfTrue(self, criteria) {
    if (!self || !self.workspace) {
      return;
    }

    // Don't check state during drag operations
    if (!self.workspace.isDragging || self.workspace.isDragging()) {
      return;
    }

    try {
      const warnings = [];

      criteria.forEach(item => {
        if (item[0]()) {
          warnings.push(item[1]);
        }
      });

      self.setWarningText(warnings.length > 0 ? warnings.join("\n") : null);
    } catch (error) {
      console.error('ILS: Error in warningIfTrue:', error);
    }
  }

  /**
   * Generate a random unique identifier
   * @returns {string} Random UID
   */
  static uid() {
    return (+new Date()).toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Return empty XML template with project metadata
   * @returns {string} Empty XML workspace
   */
  static emptyXML() {
    const accountUser = localStorage['account_user'] || 'User';
    return `<xml xmlns="https://bipes.net.br"><workspace><databoard><![CDATA[{"currentWorkspace":"kvflqzky5js84d7x5pe","workspace:kvflqzky5js84d7x5pe":[]}]]></databoard></workspace><block type="project_metadata" id="" x="-212" y="-612"><value name="project_author"><shadow type="text" id=""><field name="TEXT">${accountUser}</field></shadow></value><value name="project_iot_id"><shadow type="math_number" id=""><field name="NUM">0</field></shadow></value><value name="project_description"><shadow type="text" id=""><field name="TEXT">My project</field></shadow></value></block><block type="onstart" id="" x="-212" y="-470"></block></xml>`;
  }

  /**
   * Export workspace as screenshot
   */
  static exportScreenshot() {
    try {
      if (Code && Code.workspace) {
        Blockly.downloadScreenshot(Code.workspace);
      } else {
        console.error('ILS: Workspace not available for screenshot');
      }
    } catch (error) {
      console.error('ILS: Error exporting screenshot:', error);
    }
  }
}

/**
 * =============================================================================
 * FILES CLASS - File Management
 * =============================================================================
 */

class files {
  constructor(fileList) {
    this.watcher = null;
    this.watcher_calledCount = 0;
    this.put_file_name = null;
    this.put_file_data = null;
    this.get_file_name = null;
    this.get_file_data = null;
    this.binary_state = 0;
    this.received_string = "";
    this.viewOnly = false;

    // Initialize CodeMirror editor
    this.editor = CodeMirror.fromTextArea(content_file_code, {
      mode: "python",
      lineNumbers: true
    });

    this.fileList = get('#fileList');
    this.file_save_as = get('#file_save_as');
    this.blocks2Code = {
      Python: get('#blocks2codePython'),
      XML: get('#blocks2codeXML')
    };

    // Bind event handlers
    this.blocks2Code.Python.onclick = () => this.internalPython();
    this.blocks2Code.XML.onclick = () => this.internalXML();
  }

  /**
   * Update file operation status display
   * @param {string} statusMessage - Status message to display
   */
  static update_file_status(statusMessage) {
    if (UI && UI['workspace'] && UI['workspace'].file_status) {
      UI['workspace'].file_status.innerHTML = statusMessage;
    }
  }

  /**
   * Resize the CodeMirror editor
   */
  resize() {
    if (!Code.current.includes('files')) {
      return;
    }

    try {
      if (Code.current[0] === 'files') {
        this.editor.setSize(
          window.innerWidth - (18 * $em),
          window.innerHeight - (6 * $em)
        );
      } else {
        this.editor.setSize(
          (window.innerWidth / 2) - (18 * $em),
          window.innerHeight - (6 * $em)
        );
      }
    } catch (error) {
      console.error('ILS: Error resizing editor:', error);
    }
  }

  /**
   * Upload file to device
   */
  put_file() {
    if (!this.put_file_name || !this.put_file_data) {
      console.error('ILS: No file data to upload');
      return;
    }

    try {
      switch (Channel['mux'].currentChannel) {
        case 'websocket':
          this._putFileWebsocket();
          break;
        case 'webserial':
        case 'webbluetooth':
          this._putFileSerial();
          break;
        default:
          console.error('ILS: Unknown channel for file upload');
      }
    } catch (error) {
      console.error('ILS: Error uploading file:', error);
    }
  }

  /**
   * Upload file via WebSocket
   * @private
   */
  _putFileWebsocket() {
    const destFileName = this.put_file_name;
    const destFileSize = this.put_file_data.length;

    // WEBREPL_FILE = "<2sBBQLH64s"
    const rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
    rec[0] = 'W'.charCodeAt(0);
    rec[1] = 'A'.charCodeAt(0);
    rec[2] = 1; // put command
    rec[3] = 0;

    // Clear bytes 4-11
    for (let i = 4; i < 12; i++) {
      rec[i] = 0;
    }

    // File size (4 bytes)
    rec[12] = destFileSize & 0xff;
    rec[13] = (destFileSize >> 8) & 0xff;
    rec[14] = (destFileSize >> 16) & 0xff;
    rec[15] = (destFileSize >> 24) & 0xff;

    // File name length (2 bytes)
    rec[16] = destFileName.length & 0xff;
    rec[17] = (destFileName.length >> 8) & 0xff;

    // File name (64 bytes max)
    for (let i = 0; i < 64; i++) {
      rec[18 + i] = i < destFileName.length 
        ? destFileName.charCodeAt(i) 
        : 0;
    }

    this.binary_state = 11;
    files.update_file_status(`Sending ${this.put_file_name}...`);
    mux.bufferPush(rec);
  }

  /**
   * Upload file via WebSerial/WebBluetooth
   * @private
   */
  _putFileSerial() {
    const destFileName = this.put_file_name;
    const destFileSize = this.put_file_data.length;

    files.update_file_status(`Sending raw (USB) ${this.put_file_name}...`);

    const decoderUint8 = new TextDecoder()
      .decode(this.put_file_data)
      .replaceAll(/(\r\n|\r|\n)/g, '\\r')
      .replaceAll(/'/g, "\\'")
      .replaceAll(/"/g, '\\"')
      .replaceAll(/\t/g, '    ');

    UI['progress'].start(parseInt(decoderUint8.length / Channel['webserial'].packetSize) + 1);

    // Interrupt any running program
    mux.clearBuffer();
    mux.bufferUnshift('\r\x03\x03');

    mux.bufferPush("import struct\r");

    // Workaround for ESP32S2 using CircuitPython
    if (UI['workspace'].selector.value === "ESP32S2") {
      mux.bufferPush("import storage\r");
      mux.bufferPush("storage.remount(\"/\", False)\r");
    }

    mux.bufferPush(`f=open('${this.put_file_name}', 'w')\r`);
    mux.bufferPush(`f.write('${decoderUint8}')\r`, () => {
      files.update_file_status(`Sent ${Files.put_file_data.length} bytes`);
    });
    mux.bufferPush("f.close()\r");
    mux.bufferPush('\r\r\r');
    files.update_file_status(`File ${this.put_file_name} sent.`);
  }

  /**
   * Get device version
   */
  get_ver() {
    try {
      // WEBREPL_REQ_S = "<2sBBQLH64s"
      const rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
      rec[0] = 'W'.charCodeAt(0);
      rec[1] = 'A'.charCodeAt(0);
      rec[2] = 3; // GET_VER command

      // Rest of rec is zero (already initialized)
      this.binary_state = 31;
      mux.bufferPush(rec);
    } catch (error) {
      console.error('ILS: Error getting version:', error);
    }
  }

  /**
   * Handle file selection from file input and upload
   */
  handle_put_file_select() {
    try {
      const files = UI['workspace'].put_file_select.files;
      
      if (!files || files.length === 0) {
        console.warn('ILS: No file selected');
        return;
      }

      const file = files[0];
      this.put_file_name = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.put_file_data = new Uint8Array(e.target.result);
        this.put_file();
      };
      reader.onerror = () => {
        console.error('ILS: Error reading selected file');
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('ILS: Error handling file selection:', error);
    }
  }

  /**
   * Handle file upload from cloud URL
   */
  handle_put_file_select_cloud() {
    try {
      const url = prompt('Path of library');

      if (!url || url.trim() === '') {
        console.log('ILS: No URL provided');
        return;
      }

      // Extract filename from URL
      const urlParts = url.split('/');
      this.put_file_name = urlParts[urlParts.length - 1];

      // Fetch the file from HTTP location
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then(arrayBuffer => {
          this.put_file_data = new Uint8Array(arrayBuffer);
          this.put_file();
        })
        .catch(error => {
          console.error('ILS: Error fetching file from cloud:', error);
          alert('Failed to fetch file: ' + error.message);
        });
    } catch (error) {
      console.error('ILS: Error in handle_put_file_select_cloud:', error);
    }
  }

  /**
   * Save code from editor or workspace and upload
   */
  files_save_as() {
    try {
      let codeStr;

      if (Code.current[0] === 'Files') {
        codeStr = Files.editor.getDoc().getValue('\n');
      } else {
        codeStr = Blockly.Python.workspaceToCode(Code.workspace);
        codeStr = Tool.fixAsyncInCode(codeStr);
      }

      const bufCode = new Uint8Array(codeStr.length);
      for (let i = 0; i < codeStr.length; i++) {
        bufCode[i] = codeStr.charCodeAt(i);
      }

      this.put_file_name = 'sketch.py';
      this.put_file_data = bufCode;

      this.put_file();
      UI['notify'].send(MSG['updatingSketch']);
    } catch (error) {
      console.error('ILS: Error saving file:', error);
    }
  }

  /**
   * List files from device
   */
  listFiles() {
    try {
      mux.bufferPush('import os; os.listdir(\'.\')\r', files.updateTable.bind(this));
    } catch (error) {
      console.error('ILS: Error listing files:', error);
    }
  }

  /**
   * Execute a program on the device
   * @param {string} file - File name to execute
   */
  run(file) {
    if (!file) {
      console.error('ILS: No file specified to run');
      return;
    }

    try {
      files.update_file_status(`Executing ${file}`);
      mux.bufferPush(`exec(open('./${file}').read(),globals())\r`);
    } catch (error) {
      console.error('ILS: Error running file:', error);
    }
  }

  /**
   * Delete a file from the device
   * @param {string} file - File name to delete
   */
  delete(file) {
    if (!file) {
      console.error('ILS: No file specified to delete');
      return;
    }

    try {
      const msg = `Are you sure you want to delete ${file}?`;

      if (confirm(msg)) {
        mux.bufferPush(`os.remove('${file}')\r`, this.listFiles.bind(this));
        files.update_file_status(`Deleted ${file}`);
      } else {
        files.update_file_status(`Delete aborted for ${file}`);
      }
    } catch (error) {
      console.error('ILS: Error deleting file:', error);
    }
  }

  /**
   * View a file in the editor
   * @param {string} file - File name to view
   */
  files_view(file) {
    this.viewOnly = true;
    this.get_file(file);
    files.update_file_status(`Downloading ${file}`);
  }

  /**
   * Download a file from the device
   * @param {string} file - File name to download
   */
  files_download(file) {
    this.viewOnly = false;
    this.get_file(file);
  }

  /**
   * Get file from device
   * @param {string} srcFileName - File name to fetch
   */
  get_file(srcFileName) {
    if (!srcFileName) {
      console.error('ILS: No file specified to get');
      return;
    }

    try {
      this.file_save_as.className = 'py';

      switch (Channel['mux'].currentChannel) {
        case 'websocket':
          this._getFileWebsocket(srcFileName);
          break;
        case 'webserial':
        case 'webbluetooth':
          this._getFileSerial(srcFileName);
          break;
        default:
          console.error('ILS: Unknown channel for file download');
      }
    } catch (error) {
      console.error('ILS: Error getting file:', error);
    }
  }

  /**
   * Get file via WebSocket
   * @private
   * @param {string} srcFileName - File name to fetch
   */
  _getFileWebsocket(srcFileName) {
    const rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
    rec[0] = 'W'.charCodeAt(0);
    rec[1] = 'A'.charCodeAt(0);
    rec[2] = 2; // get command
    rec[3] = 0;

    // Clear bytes 4-15
    for (let i = 4; i < 16; i++) {
      rec[i] = 0;
    }

    // File name length
    rec[16] = srcFileName.length & 0xff;
    rec[17] = (srcFileName.length >> 8) & 0xff;

    // File name
    for (let i = 0; i < 64; i++) {
      rec[18 + i] = i < srcFileName.length 
        ? srcFileName.charCodeAt(i) 
        : 0;
    }

    this.binary_state = 21;
    this.get_file_name = srcFileName;
    this.get_file_data = new Uint8Array(0);
    files.update_file_status(`Getting ${this.get_file_name}...`);
    mux.bufferPush(rec);
  }

  /**
   * Get file via WebSerial/WebBluetooth
   * @private
   * @param {string} srcFileName - File name to fetch
   */
  _getFileSerial(srcFileName) {
    this.binary_state = 91;
    files.update_file_status(`Getting ${srcFileName}...`);

    // Interrupt any running program
    mux.clearBuffer();
    mux.bufferUnshift('\r\x03\x03');

    this.get_file_name = srcFileName;
    this.received_string = "";
    this.watcher_calledCount = 0;

    mux.bufferPush(`import os, sys; os.stat('${srcFileName}')\r`);
    mux.bufferPush(
      `with open('${srcFileName}', 'rb') as infile:\rwhile True:\rresult = infile.read(32)\rif result == b'':\rbreak\r\blen = sys.stdout.write(result)\r`,
      () => {}
    );

    mux.bufferPush("\r\r\r", () => {
      this.watcher = setInterval(() => {
        if (Files.get_file_webserial_()) {
          Files.watcher_calledCount = 0;
          clearInterval(Files.watcher);
        } else {
          Files.watcher_calledCount += 1;
          if (Files.watcher_calledCount >= 10) {
            UI['notify'].send(MSG['ErrorGET']);
            clearInterval(Files.watcher);
            Files.watcher = undefined;
          }
        }
      }, 250);
    });
  }

  /**
   * Process file data received via WebSerial/WebBluetooth
   * @private
   * @returns {boolean} True if file was successfully received
   */
  get_file_webserial_() {
    const re = /sys\.stdout\.write\(result\)\r\n...         \r\n...         \r\n... \r\n(.*)>>> /s;

    try {
      if (re.test(Files.received_string)) {
        const getFileData = Files.received_string.match(re);

        if (getFileData.length === 2) {
          Files.get_file_data = getFileData[1];
        }

        files.update_file_status(
          `Got ${Files.get_file_name}, ${Files.get_file_data.length} bytes`
        );

        if (!Files.viewOnly) {
          saveAs(
            new Blob([Files.get_file_data], { type: "application/octet-stream" }),
            Files.get_file_name
          );
        } else {
          Tool.updateSourceCode(
            new Blob([Files.get_file_data], { type: "text/plain" }),
            Files.get_file_name
          );
        }

        Files.received_string = Files.received_string.replace(re, '\r\n');
        return true;
      }
      return false;
    } catch (error) {
      console.error('ILS: Error processing received file:', error);
      return false;
    }
  }

  /**
   * Update file list display in the UI
   */
  static updateTable() {
    const re = /\[(.+)?\]/g;

    try {
      if (!re.test(this.received_string)) {
        return;
      }

      const matches = this.received_string.match(/\[(.+)?\]/g);
      const treatStr = matches[matches.length - 1].replace(/[\[\]]/g, '');
      const splitStr = treatStr.split('"'[0]);
      const filesList = eval("[" + splitStr + "]");

      UI['notify'].send(`File list updated at ${Tool.unix2date()}.`);

      this.fileList.innerHTML = '';

      filesList.forEach(file => {
        const wrapper2 = new DOM('div');
        const openButton = new DOM('div', {
          innerText: file,
          className: 'runText'
        });

        if (!(/\./.test(file))) {
          // Directory
          openButton.flag('is directory');
          wrapper2.append(openButton);
          wrapper2._dom.style.cursor = 'default';
        } else {
          // File
          openButton._dom.title = `Open file ${file}`;
          openButton.onclick(this, Files.files_view, [file]);

          if (file === 'boot.py' || file === 'main.py') {
            openButton.flag('run at boot');
          }

          const deleteButton = new DOM('span', {
            className: 'icon',
            id: 'trashIcon',
            title: `Delete file ${file}`
          }).onclick(this, Files.delete, [file]);

          const runButton = new DOM('span', {
            className: 'icon',
            id: 'runIcon',
            title: `Run file ${file}`
          }).onclick(this, Files.run, [file]);

          const downloadButton = new DOM('span', {
            className: 'icon',
            id: 'downloadIcon',
            title: `Download file ${file}`
          }).onclick(this, Files.files_download, [file]);

          const wrapper = new DOM('div').append([runButton, downloadButton, deleteButton]);
          wrapper2.append([openButton, wrapper]);
        }

        this.fileList.appendChild(wrapper2._dom);
      });

      Files.received_string = Files.received_string.replace(re, '\r\n');
    } catch (error) {
      console.error('ILS: Error updating file table:', error);
    }
  }

  /**
   * Push edited XML to the workspace
   */
  editedXML2Workspace() {
    try {
      const result = window.confirm(
        'Changes will be applied directly to the workspace and might break everything, continue?'
      );

      if (result !== true) {
        return;
      }

      const content = UI['workspace'].readWorkspace(
        this.editor.getDoc().getValue("\n"),
        true
      );

      let xmlDom = '';
      try {
        xmlDom = Blockly.Xml.textToDom(content);
      } catch (e) {
        const q = window.confirm(MSG['badXml'].replace('%1', e));
        if (!q) {
          return;
        }
      }

      if (xmlDom) {
        Code.workspace.clear();
        Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
        Code.renderContent();
      }
    } catch (error) {
      console.error('ILS: Error applying XML to workspace:', error);
    }
  }

  /**
   * Open Python code generated from Blockly in the editor
   */
  internalPython() {
    try {
      this.file_save_as.className = 'bipes-py';
      const code = Code.generateCode();
      Tool.updateSourceCode(
        new Blob([code], { type: "text/plain" }),
        Tool.makeAName(code, 'py')
      );
    } catch (error) {
      console.error('ILS: Error opening Python code:', error);
    }
  }

  /**
   * Open XML code generated from Blockly in the editor
   */
  internalXML() {
    try {
      this.file_save_as.className = 'bipes-xml';
      Tool.updateSourceCode(
        new Blob([Code.generateXML()], { type: "text/plain" }),
        'workspace.bipes.xml'
      );
    } catch (error) {
      console.error('ILS: Error opening XML code:', error);
    }
  }

  /**
   * Update displayed name when switching tabs or projects
   */
  handleCurrentProject() {
    try {
      this.blocks2Code.Python.innerHTML = 
        Tool.makeAName(Code.generateCode(), 'py') + '<span>automatic</span>';

      if (this.file_save_as.className === 'bipes-py') {
        this.internalPython();
      } else if (Files.file_save_as.className === 'bipes-xml') {
        this.internalXML();
      }
    } catch (error) {
      console.error('ILS: Error handling current project:', error);
    }
  }
}

/**
 * =============================================================================
 * DOM CLASS - DOM Element Builder
 * =============================================================================
 */

class DOM {
  constructor(domType, tags) {
    this._dom = null;

    try {
      const validTypes = ['button', 'h2', 'h3', 'span', 'div', 'video'];

      if (!validTypes.includes(domType)) {
        console.warn(`ILS: Unknown DOM type: ${domType}`);
        return this;
      }

      this._dom = document.createElement(domType);

      if (typeof tags === 'object') {
        if (domType === 'video') {
          const videoAttrs = ['preload', 'controls', 'autoplay'];
          for (const tag in tags) {
            if (videoAttrs.includes(tag)) {
              this._dom[tag] = tags[tag];
            }
          }
        } else {
          const commonAttrs = ['innerText', 'className', 'id', 'title'];
          for (const tag in tags) {
            if (commonAttrs.includes(tag)) {
              this._dom[tag] = tags[tag];
            }
          }
        }
      }
    } catch (error) {
      console.error('ILS: Error creating DOM element:', error);
    }

    return this;
  }

  /**
   * Attach onclick event handler
   * @param {Object} self - Object to bind
   * @param {Function} ev - Event handler function
   * @param {Array} args - Arguments to pass to the function
   * @returns {DOM} This DOM instance for chaining
   */
  onclick(self, ev, args) {
    if (!this._dom) {
      console.error('ILS: No DOM element to attach onclick handler');
      return this;
    }

    try {
      this._dom.onclick = () => {
        if (typeof args === 'undefined') {
          ev.bind(self)();
        } else if (Array.isArray(args)) {
          ev.apply(self, args);
        }
      };
    } catch (error) {
      console.error('ILS: Error attaching onclick handler:', error);
    }

    return this;
  }

  /**
   * Append child elements to this DOM element
   * @param {Array|Object} DOMS - Array of DOM instances or DOM nodes
   * @returns {DOM} This DOM instance for chaining
   */
  append(DOMS) {
    if (!this._dom) {
      console.error('ILS: No DOM element to append to');
      return this;
    }

    try {
      if (!Array.isArray(DOMS)) {
        DOMS = [DOMS];
      }

      DOMS.forEach(item => {
        if (!item) return;

        if (/HTML(.*)Element/.test(item.constructor.name)) {
          this._dom.appendChild(item);
        } else if (item.constructor.name === 'DOM' && item._dom) {
          this._dom.appendChild(item._dom);
        }
      });
    } catch (error) {
      console.error('ILS: Error appending elements:', error);
    }

    return this;
  }

  /**
   * Add a flag label to the element
   * @param {string} str - Label text
   * @returns {DOM} This DOM instance for chaining
   */
  flag(str) {
    if (!this._dom) {
      console.error('ILS: No DOM element to add flag to');
      return this;
    }

    try {
      this._dom.innerHTML = `${this._dom.innerHTML} <span>${str}</span>`;
    } catch (error) {
      console.error('ILS: Error adding flag:', error);
    }

    return this;
  }
}

/**
 * =============================================================================
 * ANIMATE CLASS - CSS3 Animation Helper
 * =============================================================================
 */

class Animate {
  constructor() {
    console.warn('ILS: Animate class should not be instantiated, use static methods only');
  }

  /**
   * Turn off animation for a DOM element
   * @param {HTMLElement} dom - DOM element
   * @param {Function} callback - Optional callback after animation
   */
  static off(dom, callback) {
    if (!dom || !dom.classList) {
      console.error('ILS: Invalid DOM element for animation');
      return;
    }

    try {
      dom.classList.remove('on');
      setTimeout(() => {
        dom.classList.remove('ani', 'on');
        if (typeof callback === 'function') {
          callback();
        }
      }, 250);
    } catch (error) {
      console.error('ILS: Error turning off animation:', error);
    }
  }

  /**
   * Turn on animation for a DOM element
   * @param {HTMLElement} dom - DOM element
   */
  static on(dom) {
    if (!dom || !dom.classList) {
      console.error('ILS: Invalid DOM element for animation');
      return;
    }

    try {
      dom.classList.add('ani');
      setTimeout(() => {
        dom.classList.add('ani', 'on');
      }, 250);
    } catch (error) {
      console.error('ILS: Error turning on animation:', error);
    }
  }
}

/**
 * =============================================================================
 * TERM CLASS - Terminal (xterm.js) Handler
 * =============================================================================
 */

class term {
  constructor() {
    console.warn('ILS: term class should not be instantiated, use static methods only');
  }

  /**
   * Initialize the terminal
   * @param {string} dom - DOM selector or element
   */
  static init(dom) {
    if (!terminal) {
      console.error('ILS: Terminal not available');
      return;
    }

    try {
      terminal.open(get(dom));
      terminal.setOption('fontSize', 12);
      this.resize();

      terminal.onData((data) => {
        try {
          switch (Channel['mux'].currentChannel) {
            case 'websocket':
              data = data.replace(/\n/g, "\r");
              Channel['websocket'].ws.send(data);
              break;
            case 'webserial':
              Channel['webserial'].serialWrite(data);
              break;
            case 'webbluetooth':
              mux.bufferPush(data);
              Channel['webbluetooth'].watch();
              break;
            default:
              console.warn('ILS: Unknown channel for terminal data');
          }
        } catch (error) {
          console.error('ILS: Error handling terminal data:', error);
        }
      });
    } catch (error) {
      console.error('ILS: Error initializing terminal:', error);
    }
  }

  /**
   * Enable terminal input
   */
  static on() {
    if (!terminal) return;

    try {
      terminal.setOption('disableStdin', false);
      terminal.focus();
    } catch (error) {
      console.error('ILS: Error enabling terminal:', error);
    }
  }

  /**
   * Disable terminal input
   */
  static off() {
    if (!terminal) return;

    try {
      terminal.setOption('disableStdin', true);
      terminal.blur();
    } catch (error) {
      console.error('ILS: Error disabling terminal:', error);
    }
  }

  /**
   * Write data to terminal
   * @param {string} data - Data to write
   */
  static write(data) {
    if (!terminal) return;

    try {
      terminal.write(data);
    } catch (error) {
      console.error('ILS: Error writing to terminal:', error);
    }
  }

  /**
   * Resize terminal to fit window
   */
  static resize() {
    if (!terminal || !Code || !Code.current) return;

    try {
      if (!Code.current.includes('console')) {
        return;
      }

      let cols;
      if (Code.current[0] === 'console') {
        cols = Math.max(50, Math.min(200, (window.innerWidth - 4 * $em) / 7)) | 0;
      } else {
        cols = Math.max(50, Math.min(200, ((window.innerWidth) / 2 - 4 * $em) / 7)) | 0;
      }

      const rows = Math.max(15, Math.min(40, (window.innerHeight - 20 * $em) / 12)) | 0;

      terminal.resize(cols, rows);
    } catch (error) {
      console.error('ILS: Error resizing terminal:', error);
    }
  }
}