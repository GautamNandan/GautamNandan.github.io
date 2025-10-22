	   function installPyModuleForExtension(extensionName, pythonFileUrl) {
		   	console.log("Install py module for extensionName:" + extensionName + " pythonFileUrl:" + pythonFileUrl);
			//utils.handle_put_file_select_cloud(pythonFileUrl, "");
			Files.handle_put_file_extension(pythonFileUrl);
			
	   }

	   function unInstallPyModuleForExtension(extensionName, pythonFileUrl) {
		   	console.log("unInstall py module for extensionName:" + extensionName + " pythonFileUrl:" + pythonFileUrl);
		
			var copyCmd = `
import os

def delete_file(filename):
	try:
		# Check if file exists
		if filename in os.listdir():
			os.remove(filename)
			print(f"Deleted: {filename}")
		else:
			print(f"File not found: {filename}")
	except OSError as e:
		print(f"Error: {e}")
			`;
			copyCmd += '\n';
			copyCmd += 'delete_file(' + "'" + pythonFileUrl + "'" + ')\n';									
		
			Tool.runPython(copyCmd);
	   }

	   
      // Open modal
        function openExtensionModal() {
            const modal = document.getElementById('extensionModal');
            modal.classList.add('active');
            loadExtensions();
        }

        // Close modal
        function closeExtensionModal() {
            const modal = document.getElementById('extensionModal');
            modal.classList.remove('active');
        }

        // Close on overlay click
        document.getElementById('extensionModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeExtensionModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeExtensionModal();
            }
        });

        // Load extensions
        async function loadExtensions() {
            const container = document.getElementById('extensionsList');
            
            try {
                // Get extensions from ExtensionManager
                const extensions = window.extensionManager.getAvailableExtensions();
                
                if (extensions.length === 0) {
                    container.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-state-icon">📦</div>
                            <h3>No Extensions Available</h3>
                            <p>No extensions found in the manifest.</p>
                        </div>
                    `;
                    return;
                }

                // Render extensions
                container.innerHTML = extensions.map(ext => createExtensionCard(ext)).join('');
            } catch (error) {
                console.error('Error loading extensions:', error);
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">⚠️</div>
                        <h3>Error Loading Extensions</h3>
                        <p>${error.message}</p>
                    </div>
                `;
            }
        }

        // Create extension card HTML
        function createExtensionCard(ext) {
            const isInstalled = window.extensionManager.isExtensionLoaded(ext.id);
            const installedClass = isInstalled ? 'installed' : '';
			const cat_friendlyName = window.extensionManager.translateCategory(ext.category);
            
            // Determine icon display
            let iconHtml;
            if (ext.files && ext.files.icon) {
                // Use PNG/image file
                const iconPath = `${ext.path}/${ext.files.icon}`;
                iconHtml = `<img src="${iconPath}" alt="${ext.name}" onerror="this.style.display='none'; this.parentElement.textContent='📦';">`;
            } else if (ext.icon) {
                // Use emoji icon
                iconHtml = ext.icon;
            } else {
                // Default fallback
                iconHtml = '📦';
            }
            
            return `
                <div class="extension-card ${installedClass}" data-extension-id="${ext.id}">
                    <div class="extension-icon">${iconHtml}</div>
                    <div class="extension-content">
                        <div class="extension-header">
                            <span class="extension-name">${ext.name}</span>
                            <span class="extension-version">v${ext.version}</span>
                            ${cat_friendlyName ? `<span class="extension-category">${cat_friendlyName}</span>` : ''}
                        </div>
                        <div class="extension-description">${ext.description}</div>
                        ${ext.tags && ext.tags.length > 0 ? `
                            <div class="extension-tags">
                                ${ext.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                        <div class="extension-footer">
                            ${ext.author ? `<span class="extension-author">by ${ext.author}</span>` : ''}
                            <button 
                                class="btn ${isInstalled ? 'btn-uninstall' : 'btn-install'}" 
                                onclick="toggleExtension('${ext.id}')"
                                id="btn-${ext.id}"
                            >
                                ${isInstalled ? '✓ Uninstall' : '↓ Install'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Toggle extension (install/uninstall)
        async function toggleExtension(extensionId) {
            const btn = document.getElementById(`btn-${extensionId}`);
            const card = document.querySelector(`[data-extension-id="${extensionId}"]`);
            const isInstalled = window.extensionManager.isExtensionLoaded(extensionId);

            // Disable button during operation
            btn.disabled = true;
           

            try {
                if (isInstalled) {
                    // Uninstall
					const extInfo = window.extensionManager.getExtensionInfo(extensionId);					
					let success = true;
					if (mux.connected()) {
						btn.textContent = isInstalled ? 'Uninstalling...' : 'Installing...';					
						success = await window.extensionManager.disableExtension(extensionId);
						} else {
							console.log("Not Connected to Device");
							alert("Connect to Device and then try!");
							return;
						}

				       if (extInfo.hasPythonModule) {
						    const extensionName = extInfo.name;
						    let pythonFileUrl = window.extensionManager.getPythonModuleUrl(extensionId);
							pythonFileUrl = pythonFileUrl.split('/').pop();
	   
    						await unInstallPyModuleForExtension(extensionName, pythonFileUrl);
						}					
                    btn.className = 'btn btn-install';
                    btn.textContent = '↓ Install';
                    card.classList.remove('installed');
					
                } else {
                    // Install
					const extInfo = window.extensionManager.getExtensionInfo(extensionId);
					let success = true;
					if (mux.connected()) {
						btn.textContent = isInstalled ? 'Uninstalling...' : 'Installing...';					
						success = await window.extensionManager.enableExtension(extensionId);
						} else {
							console.log("Not Connected to Device");
							alert("Connect to Device and then try!");
							return;
						}
                    if (success) {		
				       if (extInfo.hasPythonModule) {
						    const extensionName = extInfo.name;
						    const pythonFileUrl = window.extensionManager.getPythonModuleUrl(extensionId);
	   
    						await installPyModuleForExtension(extensionName, pythonFileUrl);
						}					
                        btn.className = 'btn btn-uninstall';
                        btn.textContent = '✓ Uninstall';
                        card.classList.add('installed');
						
						
                    } else {
                        throw new Error('Failed to install extension');
                    }
                }
            } catch (error) {
                console.error(`Error toggling extension ${extensionId}:`, error);
                alert(`Error: ${error.message}`);
                // Reset button state
                btn.textContent = isInstalled ? '✓ Uninstall' : '↓ Install';
            } finally {
                btn.disabled = false;
            }
        }

        // Filter extensions by search query
        function filterExtensions() {
            const query = document.getElementById('extensionSearch').value.toLowerCase();
            const cards = document.querySelectorAll('.extension-card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }