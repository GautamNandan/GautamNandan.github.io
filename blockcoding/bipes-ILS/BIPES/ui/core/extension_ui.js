// Extension UI Functions

async function installPyModuleForExtension(extensionName, pythonFileUrl, pythonInstallPath) {
    console.log(`Installing module: ${extensionName} from ${pythonFileUrl} to ${pythonInstallPath}`);
    await Files.handle_put_file_extension_async(pythonFileUrl, pythonInstallPath);
}

async function unInstallPyModuleForExtension(extensionId, pythonFileUrl) {
    console.log(`Uninstalling module: ${extensionId} - ${pythonFileUrl}`);
	await Files.delete_async(pythonFileUrl);
}

function openExtensionModal() {
    const modal = document.getElementById('extensionModal');
    modal.classList.add('active');
    loadExtensions();
}

function closeExtensionModal() {
    const modal = document.getElementById('extensionModal');
    modal.classList.remove('active');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('extensionModal');
        if (modal.classList.contains('active')) {
            closeExtensionModal();
        }
    }
});

let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    const categoryList = document.getElementById('extensionCategories');
    if (categoryList) {
        categoryList.addEventListener('click', function(e) {
            const li = e.target.closest('li');
            if (li && li.dataset.category && !li.classList.contains('hr')) {
                categoryList.querySelectorAll('li').forEach(item => item.classList.remove('active'));
                li.classList.add('active');
                
                currentCategory = li.dataset.category;
                filterExtensionsByCategory(currentCategory);
            }
        });
    }
});

function filterExtensionsByCategory(category) {
    const cards = document.querySelectorAll('.extension-list > li');
    
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all') {
            card.style.display = 'block';
        } else if (category === 'installed') {
            const extId = card.querySelector('[data-extension-id]')?.dataset.extensionId;
            const isInstalled = extId && window.extensionManager.isExtensionLoaded(extId);
            card.style.display = isInstalled ? 'block' : 'none';
        } else {
            card.style.display = cardCategory === category ? 'block' : 'none';
        }
    });
}

async function loadExtensions() {
    const container = document.getElementById('extensionList');
    
    try {
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

        container.innerHTML = extensions.map(ext => createExtensionCard(ext)).join('');
        filterExtensionsByCategory(currentCategory);
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

function createExtensionCard(ext) {
    const isInstalled = window.extensionManager.isExtensionLoaded(ext.id);
    
    let category = ext.category || 'other';
    if (category.startsWith('%{BKY_')) {
        const key = category.match(/%\{BKY_(.+?)\}/)?.[1];
        if (key && typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) {
            category = Blockly.Msg[key];
        }
    }
    
    const categoryItems = document.querySelectorAll('#extensionCategories li[data-category]');
    let categorySlug = 'other';
    
    for (const item of categoryItems) {
        const displayName = item.textContent.trim();
        const slug = item.dataset.category;
        
        if (displayName.toLowerCase().includes(category.toLowerCase()) || 
            category.toLowerCase().includes(displayName.toLowerCase())) {
            categorySlug = slug;
            break;
        }
    }
    
    let iconHtml;
    if (ext.files && ext.files.icon) {
        const iconPath = `${ext.path}/${ext.files.icon}`;
        iconHtml = `<img src="${iconPath}" alt="${ext.name}" onerror="this.style.display='none'; this.parentElement.textContent='📦';">`;
    } else if (ext.icon) {
        iconHtml = ext.icon;
    } else {
        iconHtml = '📦';
    }
    
    return `
        <li data-category="${categorySlug}">
            <div class="extension-box" data-extension-id="${ext.id}">
                <div class="header">
                    <div class="cover">${iconHtml}</div>
                    <div class="detail">
                        <div class="name">
                            ${ext.name}
                            ${isInstalled ? '<span class="installed-icon"><i class="fas fa-check-circle"></i></span>' : ''}
                        </div>
                        <div class="author">${ext.author || 'Unknown'}</div>
                        <div class="other">
                            <span class="version">${ext.version || '1.0.0'}</span>
                            ${ext.github ? `<a href="${ext.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="description">${ext.description || 'No description available'}</div>
                <div class="button">
                    <button 
                        class="${isInstalled ? 'extension-uninstall' : 'extension-install'}" 
                        onclick="toggleExtension('${ext.id}')"
                        id="btn-${ext.id}"
                    >
                        <i class="fas fa-${isInstalled ? 'trash-alt' : 'download'}"></i> ${isInstalled ? 'Uninstall' : 'Install'}
                    </button>
                </div>
            </div>
        </li>
    `;
}

async function toggleExtension(extensionId) {
    const btn = document.getElementById(`btn-${extensionId}`);
    const card = document.querySelector(`[data-extension-id="${extensionId}"]`);
    const isInstalled = window.extensionManager.isExtensionLoaded(extensionId);

    btn.disabled = true;

    try {
        if (isInstalled) {
            // Uninstall
            if (!mux.connected()) {
                alert("Connect to Device first!");
                btn.disabled = false;
                return;
            }

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uninstalling...';
            const extInfo = window.extensionManager.getExtensionInfo(extensionId);
            
            await window.extensionManager.disableExtension(extensionId);

            if (extInfo.hasPythonModule) {
                for (const fileUrl of extInfo.pythonModulePath) {
                    await unInstallPyModuleForExtension(extensionId, fileUrl);
                }
            }

            btn.className = 'extension-install';
            btn.innerHTML = '<i class="fas fa-download"></i> Install';
            
            const installedIcon = card.querySelector('.installed-icon');
            if (installedIcon) installedIcon.remove();
            
        } else {
            // Install
            if (!mux.connected()) {
                alert("Connect to Device first!");
                btn.disabled = false;
                return;
            }

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Installing...';
            const extInfo = window.extensionManager.getExtensionInfo(extensionId);
            
            const success = await window.extensionManager.enableExtension(extensionId);
            
            if (success) {
                if (extInfo.hasPythonModule) {
                    //const pythonInstallPath = extInfo.pythonInstallPath;
					const pythonInstallPath = '';
                    const basePath = `extensions/${extensionId}/pylib/`;
                    
                    // Create directory first
                    await createDirectoryOnDevice(pythonInstallPath);
                    
                    for (const fileUrl of extInfo.pythonModulePath) {
                        const filePath = basePath + fileUrl;
                        await installPyModuleForExtension(extensionId, filePath, pythonInstallPath);
                    }
                }

                btn.className = 'extension-uninstall';
                btn.innerHTML = '<i class="fas fa-trash-alt"></i> Uninstall';
                
                const nameDiv = card.querySelector('.name');
                if (nameDiv && !nameDiv.querySelector('.installed-icon')) {
                    nameDiv.innerHTML += '<span class="installed-icon"><i class="fas fa-check-circle"></i></span>';
                }
            } else {
                throw new Error('Failed to install extension');
            }
        }
    } catch (error) {
        console.error(`Error toggling extension ${extensionId}:`, error);
        alert(`Error: ${error.message}`);
        btn.innerHTML = isInstalled ? '<i class="fas fa-trash-alt"></i> Uninstall' : '<i class="fas fa-download"></i> Install';
    } finally {
        btn.disabled = false;
    }
}

function createDirectoryOnDevice(destDir) {
    return new Promise((resolve, reject) => {
        try {
            mux.bufferPush(`import os\r`);
            mux.bufferPush(`def ensure_dir(path):\r`);
            mux.bufferPush(`    parts = path.strip('/').split('/')\r`);
            mux.bufferPush(`    current = ''\r`);
            mux.bufferPush(`    for part in parts:\r`);
            mux.bufferPush(`        current += '/' + part\r`);
            mux.bufferPush(`        try:\r`);
            mux.bufferPush(`            os.mkdir(current)\r`);
            mux.bufferPush(`        except:\r`);
            mux.bufferPush(`            pass\r`);
            mux.bufferPush(`\r`);
            mux.bufferPush(`ensure_dir('${destDir}')\r`);
            
            // Wait a bit for the command to execute
            setTimeout(() => resolve(), 500);
        } catch (error) {
            reject(error);
        }
    });
}

function filterExtensions() {
    const query = document.getElementById('extensionSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.extension-list > li');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}