class ExtensionManager {
  constructor() {
    this.extensions = new Map();
    this.loadedExtensions = new Set();
    this.workspace = null;
    this.categoryMap = new Map();
  }

  async init(workspace) {
    this.workspace = workspace;
    await this.loadAvailableExtensions();
    await this.restoreState();
  }

  async loadAvailableExtensions() {
    try {
      const response = await fetch('extensions/manifest.json');
      const manifest = await response.json();
      
      for (const extId of manifest.extensions) {
        const extData = await this.loadExtensionMetadata(extId);
        if (extData) {
          this.extensions.set(extId, extData);
        }
      }
      
      console.log(`Loaded ${this.extensions.size} extensions`);
    } catch (error) {
      console.error('Error loading extensions:', error);
    }
  }

  async loadExtensionMetadata(extensionId) {
    try {
      const response = await fetch(`extensions/${extensionId}/extension.json`);
      const metadata = await response.json();
      metadata.path = `extensions/${extensionId}`;
      
      if (!metadata.files) {
        metadata.files = {};
      }
      
      return metadata;
    } catch (error) {
      console.error(`Failed to load extension ${extensionId}:`, error);
      return null;
    }
  }

  getExtensionInfo(extensionId) {
    const ext = this.extensions.get(extensionId);
    if (!ext) return null;

    return {
      id: ext.id,
      name: ext.name,
      description: ext.description,
      version: ext.version,
      author: ext.author,
      category: ext.category,
      categoryFriendlyName: this.translateCategory(ext.category),
      tags: ext.tags,
      hasPythonModule: !!ext.files.python_module,
      pythonModulePath: ext.files.python_module || null,
      pythonInstallPath: `/lib/${ext.id}`,
      devices: ext.devices,
      examples: ext.files.examples,
      isLoaded: this.isExtensionLoaded(extensionId)
    };
  }

  translateCategory(categoryName) {
    if (!categoryName) return 'Other';
    
    if (categoryName.startsWith('%{') && categoryName.endsWith('}')) {
      const key = categoryName.slice(6, -1); // Remove %{BKY_ and }
      
      if (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) {
        return Blockly.Msg[key];
      }
      
      const baseKey = key.replace('BKY_CAT_', '');
      const fallbackMap = {
        'COMM': 'Communication',
        'SENSOR': 'Sensors',
        'ACTUATOR': 'Actuators',
        'DISPLAY': 'Display',
        'DISPLAYS': 'Displays',
        'STORAGE': 'Storage',
        'NETWORK': 'Network',
        'CONTROL': 'Control',
        'TIMING': 'Timing',
        'OUTPUTS': 'Outputs / Actuators',
        'FILES': 'Files',
        'NET': 'Network and Internet',
        'MACHINE': 'Machine'
      };
      
      return fallbackMap[baseKey] || categoryName;
    }
    
    return categoryName;
  }

  findCategory(currentDef, categoryName) {
    if (!currentDef.contents) return null;
    
    const translatedName = this.translateCategory(categoryName);
    
    return currentDef.contents.find(
      item => {
        if (!(item.kind === 'CATEGORY' || item.kind === 'category')) return false;
        
        return item.name === categoryName || 
               item.name === translatedName ||
               this.translateCategory(item.name) === translatedName;
      }
    );
  }

  async enableExtension(extensionId) {
    if (this.loadedExtensions.has(extensionId)) {
      return true;
    }

    const ext = this.extensions.get(extensionId);
    if (!ext) {
      console.error(`Extension ${extensionId} not found`);
      return false;
    }

    try {
      if (ext.dependencies && ext.dependencies.other_extensions) {
        for (const depId of ext.dependencies.other_extensions) {
          await this.enableExtension(depId);
        }
      }

      await this.loadScript(`${ext.path}/${ext.files.blocks}`);
      await this.loadScript(`${ext.path}/${ext.files.generators}`);
      await this.loadToolbox(ext);
      
      this.loadedExtensions.add(extensionId);
      
      const categoryName = ext.category || 'Other';
      if (!this.categoryMap.has(categoryName)) {
        this.categoryMap.set(categoryName, new Set());
      }
      this.categoryMap.get(categoryName).add(extensionId);
      
      this.saveState();
      this.dispatchExtensionEvent('loaded', ext);
      
      return true;
    } catch (error) {
      console.error(`Error enabling extension ${extensionId}:`, error);
      return false;
    }
  }

  disableExtension(extensionId) {
    if (!this.loadedExtensions.has(extensionId)) {
      return;
    }

    const ext = this.extensions.get(extensionId);
    const categoryName = ext.category || 'Other';
    
    if (this.categoryMap.has(categoryName)) {
      this.categoryMap.get(categoryName).delete(extensionId);
      
      if (this.categoryMap.get(categoryName).size === 0) {
        this.categoryMap.delete(categoryName);
      } else {
        this.removeSubcategoryFromCategory(categoryName, ext.name);
      }
    }
    
    this.removeSubcategoryFromCategory(categoryName, ext.name);
    this.loadedExtensions.delete(extensionId);
    
    this.saveState();
    this.dispatchExtensionEvent('unloaded', ext);
  }

  removeSubcategoryFromCategory(categoryName, subcategoryName) {
    if (!this.workspace) return;
    
    try {
      const toolbox = this.workspace.getToolbox();
      let currentDef;
      
      if (typeof toolbox.getToolboxDefinition === 'function') {
        currentDef = toolbox.getToolboxDefinition();
      } else if (toolbox.toolboxDef_) {
        currentDef = toolbox.toolboxDef_;
      } else if (this.workspace.options.toolbox) {
        currentDef = this.workspace.options.toolbox;
      } else {
        return;
      }
      
      if (!currentDef.contents) {
        currentDef.contents = [];
      }

      let mainCategory = currentDef.contents.find(
        item => (item.kind === 'CATEGORY' || item.kind === 'category') && 
                item.name === categoryName
      );
      
      if (!mainCategory) {
        const translatedName = this.translateCategory(categoryName);
        mainCategory = currentDef.contents.find(
          item => (item.kind === 'CATEGORY' || item.kind === 'category') && 
                  (item.name === translatedName || 
                   this.translateCategory(item.name) === translatedName)
        );
      }

      if (mainCategory && mainCategory.contents) {
        mainCategory.contents = mainCategory.contents.filter(
          sub => sub.name !== subcategoryName
        );
        
        this.workspace.updateToolbox(currentDef);
      }
      
    } catch (error) {
      console.error(`Error removing subcategory "${subcategoryName}":`, error);
    }
  }


async loadToolboxModules() {
  const modules = [
    'extensions/oled/toolbox.xml'
    // Add more modules as needed
  ];
  
  for (const moduleFile of modules) {
    try {
      const response = await fetch(moduleFile);
      const xmlText = await response.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Get all categories from this module
      const categories = xmlDoc.querySelectorAll('category');
      
      categories.forEach(categoryNode => {
        const ext = {
          id: categoryNode.getAttribute('name'),
          name: categoryNode.getAttribute('name'),
          category: categoryNode.getAttribute('name'), // Main category
          toolboxCategory: categoryNode
        };
        
        this.addOrMergeAsSubcategory(ext);
      });
      
    } catch (error) {
      console.error(`Failed to load ${moduleFile}:`, error);
    }
  }
}

  addOrMergeAsSubcategory(ext) {
    if (!this.workspace) return;

    try {
      const toolbox = this.workspace.getToolbox();
      
      let currentDef;
      if (typeof toolbox.getToolboxDefinition === 'function') {
        currentDef = toolbox.getToolboxDefinition();
      } else if (toolbox.toolboxDef_) {
        currentDef = toolbox.toolboxDef_;
      } else {
        currentDef = {
          kind: 'categoryToolbox',
          contents: []
        };
      }
      
      if (!currentDef.contents) {
        currentDef.contents = [];
      }

      const mainCategoryName = ext.category || 'Other';
      const subcategoryName = ext.name;
      
      let mainCategory = this.findCategory(currentDef, mainCategoryName);

      if (!mainCategory) {
        const translatedName = this.translateCategory(mainCategoryName);
        mainCategory = {
          kind: 'CATEGORY',
          name: translatedName,
          colour: this.getCategoryColor(translatedName),
          contents: []
        };
        currentDef.contents.push(mainCategory);
      }

      const subcategory = {
        kind: 'category',
        name: subcategoryName,
        colour: mainCategory.colour,
        contents: this.extractBlocksFromXml(ext.toolboxCategory)
      };

      mainCategory.contents.push(subcategory);
      
      if (typeof this.workspace.updateToolbox === 'function') {
        this.workspace.updateToolbox(currentDef);
      }
      
    } catch (error) {
      console.error(`Error adding subcategory for ${ext.id}:`, error);
    }
  }

  loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadToolbox(ext) {
    try {
      const response = await fetch(`${ext.path}/${ext.files.toolbox}`);
      const xmlText = await response.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const category = xmlDoc.documentElement;
      
      ext.toolboxCategory = category;
      this.addOrMergeAsSubcategory(ext);
      
    } catch (error) {
      console.error(`Error loading toolbox for ${ext.id}:`, error);
    }
  }

  extractBlocksFromXml(categoryXml) {
    const blocks = [];
    const children = categoryXml.children;
    
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      
      if (child.tagName === 'label') {
        blocks.push({
          kind: 'label',
          text: child.getAttribute('text') || child.textContent
        });
      } else if (child.tagName === 'block') {
        const hasValues = child.getElementsByTagName('value').length > 0;
        
        if (hasValues) {
          const serializer = new XMLSerializer();
          const blockXmlString = serializer.serializeToString(child);
          
          blocks.push({
            kind: 'block',
            blockxml: blockXmlString
          });
        } else {
          const blockJson = this.xmlBlockToJson(child);
          blocks.push(blockJson);
        }
        
      } else if (child.tagName === 'button') {
        blocks.push({
          kind: 'button',
          text: child.getAttribute('text'),
          callbackKey: child.getAttribute('callbackKey')
        });
      } else if (child.tagName === 'sep') {
        blocks.push({
          kind: 'sep',
          gap: child.getAttribute('gap') || '24'
        });
      } else if (child.tagName === 'category') {
        blocks.push({
          kind: 'category',
          name: child.getAttribute('name'),
          colour: child.getAttribute('colour'),
          contents: this.extractBlocksFromXml(child)
        });
      }
    }
    
    return blocks;
  }

  getCategoryColor(categoryName) {
    const colorMap = {
      'Communication': '#4A90E2',
      'Sensors': '#7CB342',
      'Actuators': '#FB8C00',
      'Display': '#AB47BC',
      'Displays': '#AB47BC',
      'Storage': '#5C6BC0',
      'Network': '#26C6DA',
      'Control': '#EF5350',
      'Timing': '#FFC107',
      'Machine': '#607D8B',
      'Files': '#FF9800',
      'Network and Internet': '#26C6DA',
      'Outputs / Actuators': '#FF6F00',
      'Other': '#78909C'
    };
    
    return colorMap[categoryName] || '#5C81A6';
  }

  xmlBlockToJson(blockXml) {
    const block = {
      kind: 'block',
      type: blockXml.getAttribute('type')
    };

    const directChildren = Array.from(blockXml.children);
    const fieldElements = directChildren.filter(child => child.tagName === 'field');
    
    if (fieldElements.length > 0) {
      block.fields = {};
      for (let i = 0; i < fieldElements.length; i++) {
        const field = fieldElements[i];
        block.fields[field.getAttribute('name')] = field.textContent;
      }
    }

    const valueElements = directChildren.filter(child => child.tagName === 'value');
    
    if (valueElements.length > 0) {
      block.inputs = {};
      for (let i = 0; i < valueElements.length; i++) {
        const value = valueElements[i];
        const inputName = value.getAttribute('name');
        
        const valueChildren = Array.from(value.children);
        const shadowBlock = valueChildren.find(child => child.tagName.toLowerCase() === 'shadow');
        const regularBlock = valueChildren.find(child => child.tagName.toLowerCase() === 'block');
        
        if (shadowBlock) {
          const shadowJson = this.xmlBlockToJson(shadowBlock);
          shadowJson.kind = 'block';
          
          block.inputs[inputName] = {
            shadow: {
              type: shadowJson.type,
              fields: shadowJson.fields
            }
          };
          
          if (regularBlock) {
            const regularJson = this.xmlBlockToJson(regularBlock);
            regularJson.kind = 'block';
            block.inputs[inputName].block = regularJson;
          }
        } else if (regularBlock) {
          const regularJson = this.xmlBlockToJson(regularBlock);
          regularJson.kind = 'block';
          block.inputs[inputName] = {
            block: regularJson
          };
        }
      }
    }

    return block;
  }

  getAvailableExtensions() {
    return Array.from(this.extensions.values());
  }

  isExtensionLoaded(extensionId) {
    return this.loadedExtensions.has(extensionId);
  }

  dispatchExtensionEvent(eventType, extension) {
    const event = new CustomEvent('extension-' + eventType, {
      detail: { 
        extension,
        extensionInfo: this.getExtensionInfo(extension.id)
      }
    });
    document.dispatchEvent(event);
  }

  saveState() {
    const state = {
      enabled: Array.from(this.loadedExtensions)
    };
    localStorage.setItem('blockly_extensions', JSON.stringify(state));
  }

  async restoreState() {
    const saved = localStorage.getItem('blockly_extensions');
    if (!saved) return;

    try {
      const state = JSON.parse(saved);
      for (const extId of state.enabled) {
        await this.enableExtension(extId);
      }
    } catch (error) {
      console.error('Error restoring extension state:', error);
    }
  }
}

window.extensionManager = new ExtensionManager();
window.ExtensionManager = ExtensionManager;