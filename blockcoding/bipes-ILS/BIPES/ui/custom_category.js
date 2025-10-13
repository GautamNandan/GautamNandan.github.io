class CustomCategory extends Blockly.ToolboxCategory {
  /**
   * Constructor for a custom category.
   * @override
   */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }

  /**
   * Adds the colour to the toolbox.
   * This is called on category creation and whenever the theme changes.
   * @override
   */
  addColourBorder_(colour) {
    // Darken the background color by reducing brightness
    const darkerColour = this.darkenColor(colour, 0.3);
    this.rowDiv_.style.backgroundColor = darkerColour;
    
    // Add a subtle border for better definition
    this.rowDiv_.style.border = '3px solid rgba(0, 0, 0, 0.2)';
    this.rowDiv_.style.borderRadius = '8px';
    
    // Add smooth transitions for better UX
    this.rowDiv_.style.transition = 'all 0.3s ease';
    
    // Style the label - determine if we need light or dark text
    const labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
    if (labelDom) {
      labelDom.style.fontFamily = 'Quicksand, Arial, sans-serif';
      labelDom.style.fontWeight = '700';
      labelDom.style.fontSize = '16px';
      
      // Use dark text for light backgrounds, light text for dark backgrounds
      const textColor = this.getContrastColor(darkerColour);
      labelDom.style.color = textColor;
      labelDom.style.textShadow = textColor === '#ffffff' ? 
        '1px 1px 2px rgba(0, 0, 0, 0.3)' : '1px 1px 2px rgba(255, 255, 255, 0.3)';
      labelDom.style.transition = 'color 0.3s ease';
    }
    
    // Style the icon if present
    if (this.iconDom_) {
      const iconColor = this.getContrastColor(darkerColour);
      this.iconDom_.style.color = iconColor;
      this.iconDom_.style.transition = 'color 0.3s ease';
      this.iconDom_.style.filter = iconColor === '#ffffff' ? 
        'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))' : 'drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.3))';
    }
  }

  /**
   * Helper function to darken a color
   * @param {string} color - Hex color code
   * @param {number} factor - Darkening factor (0-1, where 1 is darkest)
   * @return {string} Darkened color
   */
  darkenColor(color, factor) {
    // Convert hex to RGB
    let r, g, b;
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    } else if (color.startsWith('rgb')) {
      const matches = color.match(/\d+/g);
      r = parseInt(matches[0]);
      g = parseInt(matches[1]);
      b = parseInt(matches[2]);
    } else {
      return color; // Return original if format not recognized
    }
    
    // Darken by reducing each channel
    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));
    
    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  /**
   * Helper function to determine if text should be light or dark based on background
   * @param {string} bgColor - Background color
   * @return {string} Text color (either white or dark)
   */
  getContrastColor(bgColor) {
    // Convert to RGB
    let r, g, b;
    if (bgColor.startsWith('#')) {
      const hex = bgColor.slice(1);
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    } else if (bgColor.startsWith('rgb')) {
      const matches = bgColor.match(/\d+/g);
      r = parseInt(matches[0]);
      g = parseInt(matches[1]);
      b = parseInt(matches[2]);
    } else {
      return '#ffffff'; // Default to white
    }
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return dark text for light backgrounds, light text for dark backgrounds
    return luminance > 0.5 ? '#2c3e50' : '#ffffff';
  }

  /**
   * Sets the style for the category when it is selected or deselected.
   * @param {boolean} isSelected True if the category has been selected,
   *     false otherwise.
   * @override
   */
  setSelected(isSelected) {
    const labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
    const darkerColour = this.darkenColor(this.colour_, 0.3);
    
    if (isSelected) {
      // Selected state: white background with colored text
      this.rowDiv_.style.backgroundColor = 'white';
      this.rowDiv_.style.border = `3px solid ${this.colour_}`;
      this.rowDiv_.style.boxShadow = `0 4px 12px ${this.colour_}60`;
      this.rowDiv_.style.transform = 'translateX(4px) scale(1.02)';
      
      if (labelDom) {
        labelDom.style.color = this.colour_;
        labelDom.style.textShadow = 'none';
      }
      
      if (this.iconDom_) {
        this.iconDom_.style.color = this.colour_;
        this.iconDom_.style.filter = 'none';
      }
    } else {
      // Unselected state: darker colored background with appropriate text color
      this.rowDiv_.style.backgroundColor = darkerColour;
      this.rowDiv_.style.border = '3px solid rgba(0, 0, 0, 0.2)';
      this.rowDiv_.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
      this.rowDiv_.style.transform = 'translateX(0) scale(1)';
      
      const textColor = this.getContrastColor(darkerColour);
      
      if (labelDom) {
        labelDom.style.color = textColor;
        labelDom.style.textShadow = textColor === '#ffffff' ? 
          '1px 1px 2px rgba(0, 0, 0, 0.3)' : '1px 1px 2px rgba(255, 255, 255, 0.3)';
      }
      
      if (this.iconDom_) {
        this.iconDom_.style.color = textColor;
        this.iconDom_.style.filter = textColor === '#ffffff' ? 
          'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))' : 'drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.3))';
      }
    }
    
    // Add hover effect on unselected items
    if (!isSelected) {
      this.rowDiv_.onmouseenter = () => {
        if (!this.isSelected_) {
          this.rowDiv_.style.transform = 'translateX(2px) scale(1.01)';
          this.rowDiv_.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.2)';
        }
      };
      
      this.rowDiv_.onmouseleave = () => {
        if (!this.isSelected_) {
          this.rowDiv_.style.transform = 'translateX(0) scale(1)';
          this.rowDiv_.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
        }
      };
    } else {
      // Remove hover effects when selected
      this.rowDiv_.onmouseenter = null;
      this.rowDiv_.onmouseleave = null;
    }
    
    // Accessibility support
    Blockly.utils.aria.setState(
      /** @type {!Element} */ (this.htmlDiv_),
      Blockly.utils.aria.State.SELECTED,
      isSelected
    );
  }
}

// Register the custom category
Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory,
  true
);