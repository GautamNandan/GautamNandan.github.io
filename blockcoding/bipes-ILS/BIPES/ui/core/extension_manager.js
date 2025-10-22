class ExtensionManager {
  constructor() {
    this.extensions = new Map();
    this.loadedExtensions = new Set();
    this.workspace = null;
    this.categoryMap = new Map(); // Track which extensions belong to which categories
    this.pythonModuleCallback = null; // Callback for handling Python modules
  }

  // Initialize with Blockly workspace
  async init(workspace) {
    this.workspace = workspace;
    await this.loadAvailableExtensions();
    // Restore previously enabled extensions
    await this.restoreState();
  }

  // Register callback for Python module installation
  // Callback signature: async function(extensionId, modulePath, moduleUrl)
  registerPythonModuleCallback(callback) {
    if (typeof callback !== 'function') {
      console.error('Python module callback must be a function');
      return false;
    }
    this.pythonModuleCallback = callback;
    console.log('Python module callback registered');
    return true;
  }

  // Get Python module URL for an extension
  getPythonModuleUrl(extensionId) {
    const ext = this.extensions.get(extensionId);
    if (!ext) {
      console.error(`Extension ${extensionId} not found`);
      return null;
    }

    if (!ext.files.python_module) {
      return null;
    }

    return `${ext.path}/${ext.files.python_module}`;
  }

  // Trigger Python module installation (calls registered callback)
  async installPythonModule(extensionId) {
    if (!this.pythonModuleCallback) {
      console.error('No Python module callback registered');
      return false;
    }

    const ext = this.extensions.get(extensionId);
    if (!ext) {
      console.error(`Extension ${extensionId} not found`);
      return false;
    }

    if (!ext.files.python_module) {
      console.warn(`Extension ${extensionId} has no Python module`);
      return false;
    }

    const moduleUrl = this.getPythonModuleUrl(extensionId);
    const modulePath = ext.files.python_module;

    try {
      console.log(`Installing Python module for ${extensionId}: ${moduleUrl}`);
      await this.pythonModuleCallback(extensionId, modulePath, moduleUrl);
      console.log(`Python module for ${extensionId} installed successfully`);
      
      // Dispatch event
      this.dispatchExtensionEvent('python-module-installed', ext);
      
      return true;
    } catch (error) {
      console.error(`Error installing Python module for ${extensionId}:`, error);
      return false;
    }
  }

  // Get icon URL for an extension
  getExtensionIconUrl(extensionId) {
    const ext = this.extensions.get(extensionId);
    if (!ext) {
      return null;
    }

    // Check if extension has a custom icon file
    if (ext.files.icon) {
      return `${ext.path}/${ext.files.icon}`;
    }

    // Fallback to emoji icon from metadata
    return ext.icon || '🧩';
  }

  // Get extension metadata including icon
  getExtensionInfo(extensionId) {
    const ext = this.extensions.get(extensionId);
    if (!ext) {
      return null;
    }

    return {
      id: ext.id,
      name: ext.name,
      description: ext.description,
      version: ext.version,
      author: ext.author,
      category: ext.category,
	  categoryFriendlyName: this.translateCategory(ext.category),
      iconType: ext.files.icon ? 'image' : 'emoji',
      tags: ext.tags,
      hasPythonModule: !!ext.files.python_module,
      pythonModulePath: ext.files.python_module || null,
      devices: ext.devices,
	  examples: ext.files.examples,
      isLoaded: this.isExtensionLoaded(extensionId)
    };
  }

  // Translate Blockly message keys
  translateCategory(categoryName) {
    if (!categoryName) return 'Other';
    
    // Check if it's a translation key
    if (categoryName.startsWith('%{') && categoryName.endsWith('}')) {
      const key = categoryName.slice(2+4, -1); // Remove %{ and }
      
      // Try to get translation from Blockly
      if (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) {
        return Blockly.Msg[key];
      }
      
      // Fallback: extract base name from key
      // BKY_CAT_COMM -> Communication (common pattern)
      const baseKey = key.replace('BKY_CAT_', '');
      const fallbackMap = {
        'COMM': 'Communication',
        'SENSOR': 'Sensors',
        'ACTUATOR': 'Actuators',
        'DISPLAY': 'Display',
        'STORAGE': 'Storage',
        'NETWORK': 'Network',
        'CONTROL': 'Control',
        'MATH': 'Math',
        'LOGIC': 'Logic'
      };
      
      return fallbackMap[baseKey] || categoryName;
    }
    
    return categoryName;
  }

  // Find category in toolbox (handles both translated and untranslated names)
  findCategory(currentDef, categoryName) {
    if (!currentDef.contents) return null;
    
    const translatedName = this.translateCategory(categoryName);
    
    return currentDef.contents.find(
      item => (item.kind === 'CATEGORY' || item.kind === 'category') && 
              (item.name === categoryName || item.name === translatedName)
    );
  }

  // Scan and load all available extensions
  async loadAvailableExtensions() {
    try {
      const response = await fetch('extensions/manifest.json');
      const manifest = await response.json();
      
      for (const extId of manifest.extensions) {
        const extData = await this.loadExtensionMetadata(extId);
        if (extData) {
          this.extensions.set(extId, extData);
          console.log(`Loaded metadata for ${extData.id}`);
        }
      }
      
      console.log(`Loaded ${this.extensions.size} extensions`);
    } catch (error) {
      console.error('Error loading extensions:', error);
    }
  }

  // Load extension metadata
  async loadExtensionMetadata(extensionId) {
    try {
      const response = await fetch(`extensions/${extensionId}/extension.json`);
      const metadata = await response.json();
      metadata.path = `extensions/${extensionId}`;
      
      // Validate files object
      if (!metadata.files) {
        metadata.files = {};
      }
      
      return metadata;
    } catch (error) {
      console.error(`Failed to load extension ${extensionId}:`, error);
      return null;
    }
  }

  // Enable an extension
  async enableExtension(extensionId) {
    if (this.loadedExtensions.has(extensionId)) {
      console.log(`Extension ${extensionId} already loaded`);
      return true;
    }

    const ext = this.extensions.get(extensionId);
    if (!ext) {
      console.error(`Extension ${extensionId} not found`);
      return false;
    }

    try {
      // Load dependencies first
      if (ext.dependencies.other_extensions) {
        for (const depId of ext.dependencies.other_extensions) {
          await this.enableExtension(depId);
        }
      }

      // Load blocks
      await this.loadScript(`${ext.path}/${ext.files.blocks}`);
      
      // Load generators
      await this.loadScript(`${ext.path}/${ext.files.generators}`);
      
      // Load toolbox
      await this.loadToolbox(ext);
      
      this.loadedExtensions.add(extensionId);
      
      // Track category membership using ORIGINAL category name
      const categoryName = ext.category || 'Other';
      if (!this.categoryMap.has(categoryName)) {
        this.categoryMap.set(categoryName, new Set());
      }
      this.categoryMap.get(categoryName).add(extensionId);
      
      console.log(`Extension ${extensionId} loaded successfully`);
      
      // Save state automatically
      this.saveState();
      
      // Dispatch event with full extension info
      this.dispatchExtensionEvent('loaded', ext);
      
      // If extension has Python module and callback is registered, notify
      if (ext.files.python_module && this.pythonModuleCallback) {
        this.dispatchExtensionEvent('python-module-available', ext);
      }
      
      return true;
    } catch (error) {
      console.error(`Error enabling extension ${extensionId}:`, error);
      return false;
    }
  }

  // Disable an extension
  disableExtension(extensionId) {
    if (!this.loadedExtensions.has(extensionId)) {
      return;
    }

    const ext = this.extensions.get(extensionId);
    const categoryName = ext.category || 'Other';
    
    // Remove from category tracking
    if (this.categoryMap.has(categoryName)) {
      this.categoryMap.get(categoryName).delete(extensionId);
      
      // If category is now empty, remove it entirely
      if (this.categoryMap.get(categoryName).size === 0) {
        this.categoryMap.delete(categoryName);
       // this.removeToolboxCategory(categoryName);
      } else {
        // Category still has other extensions, just remove this subcategory
        this.removeSubcategoryFromCategory(categoryName, ext.name);
      }
    }
    this.removeSubcategoryFromCategory(categoryName, ext.name);
    this.loadedExtensions.delete(extensionId);
    console.log(`Extension ${extensionId} disabled`);
    
    // Save state automatically
    this.saveState();
    
    // Dispatch event
    this.dispatchExtensionEvent('unloaded', ext);
  }

  // Remove a specific subcategory from a parent category
  removeSubcategoryFromCategory(categoryName, subcategoryName) {
    if (!this.workspace) return;
    
    try {
      const toolbox = this.workspace.getToolbox();
      let currentDef;
      
      // Try multiple methods to get toolbox definition
      if (typeof toolbox.getToolboxDefinition === 'function') {
        currentDef = toolbox.getToolboxDefinition();
      } else if (toolbox.toolboxDef_) {
        currentDef = toolbox.toolboxDef_;
      } else if (this.workspace.options.toolbox) {
        currentDef = this.workspace.options.toolbox;
      } else {
        console.error('Cannot access toolbox definition');
        return;
      }
      
      if (!currentDef.contents) {
        currentDef.contents = [];
      }

      // Find the parent category using translation-aware search
      const mainCategory = this.findCategory(currentDef, categoryName);

      if (mainCategory && mainCategory.contents) {
        const beforeCount = mainCategory.contents.length;
        
        // Remove the subcategory
        mainCategory.contents = mainCategory.contents.filter(
          sub => sub.name !== subcategoryName
        );
        
        const afterCount = mainCategory.contents.length;
        
        if (beforeCount !== afterCount) {
          console.log(`✓ Removed subcategory "${subcategoryName}" from "${mainCategory.name}"`);
          
          // Update toolbox
          this.workspace.updateToolbox(currentDef);
        } else {
          console.warn(`Subcategory "${subcategoryName}" not found in "${mainCategory.name}"`);
        }
      } else {
        console.warn(`Parent category "${categoryName}" not found in toolbox`);
      }
      
    } catch (error) {
      console.error(`Error removing subcategory "${subcategoryName}":`, error);
    }
  }

  // Load JavaScript file dynamically
  loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Load toolbox XML and add to workspace
  async loadToolbox(ext) {
    try {
      const response = await fetch(`${ext.path}/${ext.files.toolbox}`);
      const xmlText = await response.text();
      
      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const category = xmlDoc.documentElement;
      
      // Store the category XML
      ext.toolboxCategory = category;
      
      // Add to existing toolbox as subcategory
      this.addOrMergeAsSubcategory(ext);
      
    } catch (error) {
      console.error(`Error loading toolbox for ${ext.id}:`, error);
    }
  }

  // Add extension as subcategory under main category
  addOrMergeAsSubcategory(ext) {
    if (!this.workspace) return;

    try {
      const toolbox = this.workspace.getToolbox();
      
      // Get current toolbox definition
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
      const translatedCategoryName = this.translateCategory(mainCategoryName);
      const subcategoryName = ext.name;
      
      // Find existing main category (handles translation)
      let mainCategory = this.findCategory(currentDef, mainCategoryName);

      if (!mainCategory) {
        // Create new main category using translated name
        mainCategory = {
          kind: 'CATEGORY',
          name: translatedCategoryName,
          colour: this.getCategoryColor(translatedCategoryName),
          contents: []
        };
        currentDef.contents.push(mainCategory);
        console.log(`✓ Created new main category "${translatedCategoryName}"`);
      } else {
        console.log(`✓ Found existing category "${mainCategory.name}"`);
      }

      // Create subcategory for this extension
      const subcategory = {
        kind: 'category',
        name: subcategoryName,
        colour: mainCategory.colour,
        contents: this.extractBlocksFromXml(ext.toolboxCategory)
      };

      // Add subcategory to main category
      mainCategory.contents.push(subcategory);
      
      console.log(`✓ Added "${subcategoryName}" as subcategory under "${mainCategory.name}"`);
      
      // Update toolbox
      if (typeof this.workspace.updateToolbox === 'function') {
        this.workspace.updateToolbox(currentDef);
      } else {
        console.warn('workspace.updateToolbox not available, trying alternative method');
        this.alternativeToolboxUpdate(currentDef);
      }
      
    } catch (error) {
      console.error(`Error adding subcategory for ${ext.id}:`, error);
      console.log('Attempting fallback method...');
      this.fallbackToolboxUpdate(ext);
    }
  }

  // Extract blocks from XML category
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
        blocks.push(this.xmlBlockToJson(child));
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
      }
    }
    
    return blocks;
  }

  // Get color for category based on name
  getCategoryColor(categoryName) {
    const colorMap = {
      'Communication': '#4A90E2',
      'Sensors': '#7CB342',
      'Actuators': '#FB8C00',
      'Display': '#AB47BC',
      'Storage': '#5C6BC0',
      'Network': '#26C6DA',
      'Control': '#EF5350',
      'Math': '#5C6BC0',
      'Logic': '#5C81A6',
      'Other': '#78909C'
    };
    
    return colorMap[categoryName] || '#5C81A6';
  }

  // Rebuild a category with all its extensions as subcategories
  rebuildCategory(categoryName) {
    if (!this.workspace || !this.categoryMap.has(categoryName)) return;

    try {
      const toolbox = this.workspace.getToolbox();
      let currentDef;
      
      // Try multiple methods to get toolbox definition
      if (typeof toolbox.getToolboxDefinition === 'function') {
        currentDef = toolbox.getToolboxDefinition();
      } else if (toolbox.toolboxDef_) {
        currentDef = toolbox.toolboxDef_;
      } else if (this.workspace.options.toolbox) {
        currentDef = this.workspace.options.toolbox;
      } else {
        console.error('Cannot access toolbox definition');
        return;
      }
      
      if (!currentDef.contents) {
        currentDef.contents = [];
      }

      const translatedName = this.translateCategory(categoryName);

      // Find and remove existing category
      const categoryIndex = currentDef.contents.findIndex(
        item => (item.kind === 'category' || item.kind === 'CATEGORY') && 
                (item.name === categoryName || item.name === translatedName)
      );

      if (categoryIndex !== -1) {
        currentDef.contents.splice(categoryIndex, 1);
      }

      // Rebuild category with all its extensions as subcategories
      const extensionIds = Array.from(this.categoryMap.get(categoryName));
      const subcategories = [];

      for (const extId of extensionIds) {
        const ext = this.extensions.get(extId);
        
        if (ext && ext.toolboxCategory) {
          const subcategory = {
            kind: 'category',
            name: ext.name,
            colour: this.getCategoryColor(translatedName),
            contents: this.extractBlocksFromXml(ext.toolboxCategory)
          };
          
          subcategories.push(subcategory);
        }
      }

      // Only create main category if there are subcategories
      if (subcategories.length > 0) {
        const mainCategory = {
          kind: 'category',
          name: translatedName,
          colour: this.getCategoryColor(translatedName),
          contents: subcategories
        };

        currentDef.contents.push(mainCategory);
        console.log(`✓ Rebuilt category "${translatedName}" with ${subcategories.length} subcategory(ies)`);
      }

      // Update toolbox
      this.workspace.updateToolbox(currentDef);
      
    } catch (error) {
      console.error(`Error rebuilding category "${categoryName}":`, error);
    }
  }

  // Alternative method for updating toolbox
  alternativeToolboxUpdate(toolboxDef) {
    try {
      // Save workspace state
      const state = Blockly.serialization.workspaces.save(this.workspace);
      
      // Update options
      this.workspace.options.toolbox = toolboxDef;
      
      // Force refresh
      const toolbox = this.workspace.getToolbox();
      if (toolbox && typeof toolbox.refreshSelection === 'function') {
        toolbox.refreshSelection();
      }
      
      // Restore state
      Blockly.serialization.workspaces.load(state, this.workspace);
    } catch (error) {
      console.error('Alternative toolbox update failed:', error);
    }
  }

  // Fallback: Recreate workspace
  fallbackToolboxUpdate(ext) {
    try {
      console.log('Using fallback: recreating workspace');
      
      // Get current toolbox
      const currentToolbox = this.workspace.options.toolbox;
      
      if (!currentToolbox.contents) {
        currentToolbox.contents = [];
      }

      const mainCategoryName = ext.category || 'Other';
      const translatedName = this.translateCategory(mainCategoryName);
      const subcategoryName = ext.name;
      
      // Find or create main category
      let mainCategory = this.findCategory({ contents: currentToolbox.contents }, mainCategoryName);

      if (!mainCategory) {
        mainCategory = {
          kind: 'category',
          name: translatedName,
          colour: this.getCategoryColor(translatedName),
          contents: []
        };
        currentToolbox.contents.push(mainCategory);
      }

      // Add subcategory
      const subcategory = {
        kind: 'category',
        name: subcategoryName,
        colour: mainCategory.colour,
        contents: this.extractBlocksFromXml(ext.toolboxCategory)
      };

      mainCategory.contents.push(subcategory);
      
      // Save workspace
      const state = Blockly.serialization.workspaces.save(this.workspace);
      
      // Get container
      const container = this.workspace.getInjectionDiv();
      const options = Object.assign({}, this.workspace.options);
      options.toolbox = currentToolbox;
      
      // Dispose and recreate
      this.workspace.dispose();
      this.workspace = Blockly.inject(container, options);
      
      // Restore blocks
      Blockly.serialization.workspaces.load(state, this.workspace);
      
      // Update global reference if needed
      if (typeof window.workspace !== 'undefined') {
        window.workspace = this.workspace;
      }
      
      console.log('✓ Workspace recreated with nested toolbox');
    } catch (error) {
      console.error('Fallback toolbox update failed:', error);
    }
  }

  // Helper method to build definition from toolbox items
  buildDefinitionFromToolbox(toolbox) {
    const contents = [];
    
    try {
      const toolboxItems = toolbox.getToolboxItems();
      
      for (const item of toolboxItems) {
        if (item.kind_ === 'CATEGORY' || item.type_ === 'CATEGORY') {
          contents.push({
            kind: 'category',
            name: item.getName ? item.getName() : item.name_,
            colour: item.getColour ? item.getColour() : item.colour_,
            contents: []
          });
        }
      }
    } catch (e) {
      console.error('Error building definition from toolbox:', e);
    }
    
    return {
      kind: 'categoryToolbox',
      contents: contents
    };
  }

  // Remove entire category from toolbox
  removeToolboxCategory(categoryName) {
    if (!this.workspace) return;
    
    try {
      const toolbox = this.workspace.getToolbox();
      let currentDef;
      
      // Try multiple methods to get toolbox definition
      if (typeof toolbox.getToolboxDefinition === 'function') {
        currentDef = toolbox.getToolboxDefinition();
      } else if (toolbox.toolboxDef_) {
        currentDef = toolbox.toolboxDef_;
      } else if (this.workspace.options.toolbox) {
        currentDef = this.workspace.options.toolbox;
      } else if (toolbox.getToolboxItems) {
        currentDef = this.buildDefinitionFromToolbox(toolbox);
      } else {
        console.error('Cannot access toolbox definition');
        return;
      }
      
      // Ensure we have a proper structure
      if (!currentDef.contents) {
        if (Array.isArray(currentDef)) {
          currentDef = { kind: 'categoryToolbox', contents: currentDef };
        } else {
          currentDef.contents = [];
        }
      }
      
      const translatedName = this.translateCategory(categoryName);
      
      // Filter out the category
      currentDef.contents = currentDef.contents.filter(
        item => {
          if (!(item.kind === 'category' || item.kind === 'CATEGORY')) return true;
          return item.name !== categoryName && item.name !== translatedName;
        }
      );
      
      // Update toolbox
      this.workspace.updateToolbox(currentDef);
      
      console.log(`Removed category "${translatedName}"`);
    } catch (error) {
      console.error(`Error removing category "${categoryName}":`, error);
    }
  }

  // Convert XML block to JSON format
  xmlBlockToJson(blockXml) {
    const block = {
      kind: 'block',
      type: blockXml.getAttribute('type')
    };

    // Add fields
    const fields = blockXml.getElementsByTagName('field');
    if (fields.length > 0) {
      block.fields = {};
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        block.fields[field.getAttribute('name')] = field.textContent;
      }
    }

    // Add values (inputs with blocks)
    const values = blockXml.getElementsByTagName('value');
    if (values.length > 0) {
      block.inputs = {};
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        const innerBlock = value.getElementsByTagName('block')[0];
        if (innerBlock) {
          block.inputs[value.getAttribute('name')] = {
            block: this.xmlBlockToJson(innerBlock)
          };
        }
      }
    }

    return block;
  }

  // Refresh entire toolbox
  refreshToolbox() {
    if (!this.workspace) return;

    try {
      const toolbox = this.workspace.getToolbox();
      const currentDef = toolbox.getToolboxDefinition();
      this.workspace.updateToolbox(currentDef);
    } catch (error) {
      console.error('Error refreshing toolbox:', error);
    }
  }

  // Get all available extensions
  getAvailableExtensions() {
    return Array.from(this.extensions.values());
  }

  // Get all available extensions with full info (including icons)
  getAvailableExtensionsInfo() {
    return Array.from(this.extensions.keys()).map(id => this.getExtensionInfo(id));
  }

  // Get loaded extensions
  getLoadedExtensions() {
    return Array.from(this.loadedExtensions).map(id => this.extensions.get(id));
  }

  // Get loaded extensions with full info
  getLoadedExtensionsInfo() {
    return Array.from(this.loadedExtensions).map(id => this.getExtensionInfo(id));
  }

  // Check if extension is loaded
  isExtensionLoaded(extensionId) {
    return this.loadedExtensions.has(extensionId);
  }

  // Get extensions by category
  getExtensionsByCategory(category) {
    return Array.from(this.extensions.values())
      .filter(ext => ext.category === category);
  }

  // Get all loaded categories
  getLoadedCategories() {
    return Array.from(this.categoryMap.keys());
  }

  // Get extensions in a category
  getExtensionsInCategory(categoryName) {
    if (!this.categoryMap.has(categoryName)) return [];
    
    return Array.from(this.categoryMap.get(categoryName))
      .map(id => this.extensions.get(id))
      .filter(ext => ext !== undefined);
  }

  // Search extensions
  searchExtensions(query) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.extensions.values()).filter(ext => 
      ext.name.toLowerCase().includes(lowerQuery) ||
      ext.description.toLowerCase().includes(lowerQuery) ||
      ext.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Dispatch custom events
  dispatchExtensionEvent(eventType, extension) {
    const event = new CustomEvent('extension-' + eventType, {
      detail: { 
        extension,
        extensionInfo: this.getExtensionInfo(extension.id)
      }
    });
    document.dispatchEvent(event);
  }

  // Save enabled extensions to localStorage
  saveState() {
    const state = {
      enabled: Array.from(this.loadedExtensions)
    };
    localStorage.setItem('blockly_extensions', JSON.stringify(state));
  }

  // Restore enabled extensions from localStorage
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

// Create and expose global instance
window.extensionManager = new ExtensionManager();

// Also expose the class if needed
window.ExtensionManager = ExtensionManager;