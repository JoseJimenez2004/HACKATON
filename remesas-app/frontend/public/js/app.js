// Estado global mejorado de la aplicación
const AppState = {
    currentUser: null,
    currentPage: 'landing',
    currentProfileTab: 'personal',
    transactions: [],
    notifications: [],
    userData: {
        name: 'María González',
        email: 'maria@ejemplo.com',
        phone: '+1 234 567 8900',
        balance: 1250.00,
        currency: 'USD',
        joinedDate: '2024-01-15',
        avatar: 'MG',
        paymentPointer: '$finanzasparatodos.com/maria'
    },
    tempData: {
        loginAttempts: 0,
        lastLogin: null
    }
};

// Sistema de notificaciones
class NotificationSystem {
    static show(message, type = 'info', duration = 5000) {
        const id = Date.now().toString();
        const notification = {
            id,
            message,
            type,
            duration,
            timestamp: new Date()
        };
        
        AppState.notifications.push(notification);
        this.render();
        
        if (duration > 0) {
            setTimeout(() => {
                this.remove(id);
            }, duration);
        }
        
        return id;
    }
    
    static remove(id) {
        AppState.notifications = AppState.notifications.filter(n => n.id !== id);
        this.render();
    }
    
    static clear() {
        AppState.notifications = [];
        this.render();
    }
    
    static render() {
        const container = document.getElementById('notification-container');
        if (!container) return;
        
        container.innerHTML = AppState.notifications.map(notification => `
            <div class="notification ${notification.type}">
                <div class="notification-header">
                    <h4>${this.getTitle(notification.type)}</h4>
                    <button class="close-btn" onclick="NotificationSystem.remove('${notification.id}')">×</button>
                </div>
                <div class="notification-body">${notification.message}</div>
            </div>
        `).join('');
    }
    
    static getTitle(type) {
        const titles = {
            success: '✅ Éxito',
            error: '❌ Error',
            warning: '⚠️ Advertencia',
            info: 'ℹ️ Información'
        };
        return titles[type] || titles.info;
    }
}

// Sistema de validaciones
class ValidationSystem {
    static validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    static validatePassword(password) {
        const strengths = {
            weak: password.length >= 6,
            medium: password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password),
            strong: password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)
        };
        
        if (strengths.strong) return 'strong';
        if (strengths.medium) return 'medium';
        if (strengths.weak) return 'weak';
        return 'invalid';
    }
    
    static validatePhone(phone) {
        const regex = /^\+?[\d\s\-\(\)]{10,}$/;
        return regex.test(phone);
    }
    
    static validateAmount(amount) {
        return !isNaN(amount) && amount > 0 && amount <= 10000;
    }
    
    static validatePaymentPointer(pointer) {
        return pointer.startsWith('$') && pointer.includes('.');
    }
}

// Navegación mejorada entre páginas
function navigateTo(page, params = {}) {
    AppState.currentPage = page;
    if (params.tab) AppState.currentProfileTab = params.tab;
    
    renderPage();
    window.scrollTo(0, 0);
    
    // Agregar al historial del navegador
    history.pushState({ page, params }, '', `#${page}`);
}

// Renderizar página actual mejorado
function renderPage() {
    const app = document.getElementById('app');
    if (!app) return;
    
    let pageHTML = '';
    
    switch (AppState.currentPage) {
        case 'landing':
            pageHTML = renderLandingPage();
            break;
        case 'login':
            pageHTML = renderLoginPage();
            break;
        case 'register':
            pageHTML = renderRegisterPage();
            break;
        case 'dashboard':
            pageHTML = renderDashboard();
            break;
        case 'send':
            pageHTML = renderSendPage();
            break;
        case 'receive':
            pageHTML = renderReceivePage();
            break;
        case 'history':
            pageHTML = renderHistoryPage();
            break;
        case 'profile':
            pageHTML = renderProfilePage();
            break;
        case 'settings':
            pageHTML = renderSettingsPage();
            break;
        case 'help':
            pageHTML = renderHelpPage();
            break;
        default:
            pageHTML = renderLandingPage();
    }
    
    app.innerHTML = `
        ${renderHeader()}
        ${pageHTML}
        ${renderNotificationContainer()}
    `;
    
    // Agregar event listeners después de renderizar
    setTimeout(() => {
        addEventListeners();
        setupAnimations();
        setupRealTimeValidation();
    }, 100);
}

// Header dinámico
function renderHeader() {
    const isLoggedIn = AppState.currentUser !== null;
    
    return `
        <header id="main-header">
            <nav>
                <div class="logo" onclick="navigateTo('landing')" style="cursor: pointer;">
                    <div class="logo-icon">💸</div>
                    <h1>RemesApp</h1>
                </div>
                <div class="nav-links">
                    ${isLoggedIn ? renderUserMenu() : renderGuestMenu()}
                </div>
            </nav>
        </header>
    `;
}

function renderUserMenu() {
    return `
        <div class="user-menu">
            <a href="#" onclick="navigateTo('dashboard')">Dashboard</a>
            <a href="#" onclick="navigateTo('history')">Historial</a>
            <a href="#" onclick="navigateTo('help')">Ayuda</a>
            <div class="user-avatar" onclick="navigateTo('profile')">
                ${AppState.userData.avatar}
            </div>
        </div>
    `;
}

function renderGuestMenu() {
    return `
        <a href="#features" onclick="scrollToSection('features')">Características</a>
        <a href="#como-funciona" onclick="scrollToSection('como-funciona')">Cómo Funciona</a>
        <a href="#testimonios" onclick="scrollToSection('testimonios')">Testimonios</a>
        <button class="btn-login" onclick="navigateTo('login')">Iniciar Sesión</button>
        <button class="btn-register" onclick="navigateTo('register')">Comenzar Gratis</button>
    `;
}

// Contenedor de notificaciones
function renderNotificationContainer() {
    return `<div id="notification-container" class="notification-container"></div>`;
}

// Página de Inicio Mejorada
function renderLandingPage() {
    return `
        <main>
            <!-- Hero Section -->
            <section id="hero">
                <div class="hero-content">
                    <h2>Envía Remesas Sin Comisiones</h2>
                    <p>Transferencias instantáneas y transparentes usando tecnología Open Payments</p>
                    <div class="hero-buttons">
                        <button class="btn-primary" onclick="navigateTo('register')">Abrir Mi Cuenta</button>
                        <button class="btn-secondary">Ver Demo</button>
                    </div>
                </div>
            </section>

            <!-- Stats Section -->
            <section id="stats">
                <div class="stats-container">
                    <div class="stat-item">
                        <div class="stat-number">0%</div>
                        <div class="stat-label">Comisiones</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Disponible</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">+10k</div>
                        <div class="stat-label">Usuarios</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">30s</div>
                        <div class="stat-label">Transferencias</div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section id="features">
                <div class="features-container">
                    <h2>Todo lo que necesitas en una sola app</h2>
                    <p class="subtitle">Diseñada para hacer tu vida financiera más simple y accesible</p>
                    
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">💸</div>
                            <h3>Remesas Instantáneas</h3>
                            <p>Envía dinero a cualquier parte del mundo en segundos, sin comisiones y con tipos de cambio justos.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🔒</div>
                            <h3>Seguridad Bancaria</h3>
                            <p>Tus fondos están protegidos con tecnología blockchain y encriptación de grado militar.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🌎</div>
                            <h3>Acceso Global</h3>
                            <p>Opera desde cualquier dispositivo, en cualquier momento y desde cualquier lugar del mundo.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📊</div>
                            <h3>Control Total</h3>
                            <p>Gestiona tus finanzas con herramientas intuitivas y reportes detallados en tiempo real.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section style="background: #1f2937; color: white; padding: 6rem 2rem; text-align: center;">
                <div style="max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">¿Listo para comenzar?</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
                        Únete a miles de usuarios que ya están disfrutando de las remesas sin complicaciones.
                    </p>
                    <button class="btn-primary" onclick="navigateTo('register')" style="font-size: 1.2rem; padding: 1.2rem 3rem;">
                        Crear Cuenta Gratis
                    </button>
                </div>
            </section>
        </main>

        <footer style="background: #111827; color: white; padding: 3rem 2rem; text-align: center;">
            <div style="max-width: 1200px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem; text-align: left;">
                    <div>
                        <h3 style="color: #10b981; margin-bottom: 1rem;">RemesApp</h3>
                        <p>Haciendo las remesas accesibles para todos, sin barreras ni comisiones ocultas.</p>
                    </div>
                    <div>
                        <h4>Enlaces Rápidos</h4>
                        <a href="#" style="color: #d1d5db; display: block; margin: 0.5rem 0; text-decoration: none;">Inicio</a>
                        <a href="#" style="color: #d1d5db; display: block; margin: 0.5rem 0; text-decoration: none;">Características</a>
                        <a href="#" style="color: #d1d5db; display: block; margin: 0.5rem 0; text-decoration: none;">Precios</a>
                    </div>
                    <div>
                        <h4>Legal</h4>
                        <a href="#" style="color: #d1d5db; display: block; margin: 0.5rem 0; text-decoration: none;">Términos</a>
                        <a href="#" style="color: #d1d5db; display: block; margin: 0.5rem 0; text-decoration: none;">Privacidad</a>
                        <a href="#" style="color: #d1d5db; display: block; margin: 0.5rem 0; text-decoration: none;">Seguridad</a>
                    </div>
                </div>
                <p style="border-top: 1px solid #374151; padding-top: 2rem; opacity: 0.7;">
                    &copy; 2024 RemesApp. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    `;
}

// Página de Login Mejorada
function renderLoginPage() {
    return `
        <main style="background: linear-gradient(135deg, #f0fdf4, #ecfdf5); min-height: 100vh; padding: 2rem;">
            <div class="form-container">
                <h2>Bienvenido de Nuevo</h2>
                <p style="text-align: center; color: #6b7280; margin-bottom: 2rem;">Ingresa a tu cuenta para gestionar tus remesas</p>
                
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Correo Electrónico</label>
                        <input type="email" id="email" placeholder="tu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" placeholder="••••••••" required>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                            <input type="checkbox" id="rememberMe"> Recordarme
                        </label>
                        <a href="#" style="color: #10b981; text-decoration: none;">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit" class="btn-submit">Ingresar a Mi Cuenta</button>
                </form>
                
                <div class="form-footer">
                    <p>¿No tienes cuenta? <a href="#" onclick="navigateTo('register')">Regístrate gratis</a></p>
                </div>
            </div>
        </main>
    `;
}

// Página de Registro Mejorada
function renderRegisterPage() {
    return `
        <main style="background: linear-gradient(135deg, #f0fdf4, #ecfdf5); min-height: 100vh; padding: 2rem;">
            <div class="form-container">
                <h2>Comienza Tu Viaje con RemesApp</h2>
                <p style="text-align: center; color: #6b7280; margin-bottom: 2rem;">Crea tu cuenta en menos de 2 minutos</p>
                
                <form id="registerForm">
                    <div class="form-group">
                        <label for="fullName">Nombre Completo</label>
                        <input type="text" id="fullName" placeholder="Juan Pérez" required>
                    </div>
                    <div class="form-group">
                        <label for="regEmail">Correo Electrónico</label>
                        <input type="email" id="regEmail" placeholder="tu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Teléfono</label>
                        <input type="tel" id="phone" placeholder="+1 234 567 8900" required>
                    </div>
                    <div class="form-group">
                        <label for="regPassword">Contraseña</label>
                        <input type="password" id="regPassword" placeholder="••••••••" required minlength="6">
                        <small style="color: #6b7280; font-size: 0.875rem;">Mínimo 6 caracteres</small>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Contraseña</label>
                        <input type="password" id="confirmPassword" placeholder="••••••••" required>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer;">
                            <input type="checkbox" style="margin-top: 0.25rem;" required>
                            <span>Acepto los <a href="#" style="color: #10b981;">Términos de Servicio</a> y la <a href="#" style="color: #10b981;">Política de Privacidad</a></span>
                        </label>
                    </div>
                    
                    <button type="submit" class="btn-submit">Crear Mi Cuenta Gratis</button>
                </form>
                
                <div class="form-footer">
                    <p>¿Ya tienes cuenta? <a href="#" onclick="navigateTo('login')">Inicia sesión aquí</a></p>
                </div>
            </div>
        </main>
    `;
}

// Dashboard Mejorado
function renderDashboard() {
    return `
        <main class="dashboard">
            <div class="welcome-section">
                <h1>¡Bienvenido a tu Dashboard!</h1>
                <p>Gestiona tus remesas de manera simple y eficiente</p>
            </div>

            <div class="balance-card">
                <h3>Balance Total</h3>
                <div class="balance-amount">$${AppState.userData.balance.toLocaleString()}</div>
                <div class="balance-change">+2.5% este mes</div>
            </div>

            <div class="action-buttons">
                <button class="btn-send" onclick="navigateTo('send')">
                    <span style="font-size: 2rem;">💸</span>
                    Enviar Remesa
                </button>
                <button class="btn-receive" onclick="navigateTo('receive')">
                    <span style="font-size: 2rem;">💰</span>
                    Recibir Remesa
                </button>
                <button class="btn-history" onclick="navigateTo('history')">
                    <span style="font-size: 2rem;">📊</span>
                    Ver Historial
                </button>
            </div>

            <div style="background: white; border-radius: 15px; padding: 2rem; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
                <h3 style="margin-bottom: 1.5rem; color: #1f2937;">Actividad Reciente</h3>
                <div id="recent-transactions" style="text-align: center; padding: 2rem; color: #6b7280;">
                    <p>No hay transacciones recientes</p>
                    <button onclick="navigateTo('send')" style="margin-top: 1rem; background: #10b981; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                        Realizar mi primera transacción
                    </button>
                </div>
            </div>
        </main>
    `;
}

// Página de Envío
function renderSendPage() {
    return `
        <main>
            <div class="form-container">
                <h2>Enviar Remesa</h2>
                <form id="sendForm">
                    <div class="form-group">
                        <label for="recipient">Destinatario (Payment Pointer)</label>
                        <input type="text" id="recipient" placeholder="$wallet.example.com" required>
                    </div>
                    <div class="form-group">
                        <label for="amount">Monto</label>
                        <input type="number" id="amount" step="0.01" min="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="currency">Moneda</label>
                        <select id="currency" required>
                            <option value="USD">USD - Dólar Americano</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="MXN">MXN - Peso Mexicano</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="memo">Concepto</label>
                        <input type="text" id="memo" placeholder="Ej: Apoyo familiar">
                    </div>
                    <button type="submit" class="btn-submit">Enviar Remesa</button>
                </form>
            </div>
        </main>
    `;
}

// Página de Recepción
function renderReceivePage() {
    return `
        <main>
            <div class="form-container">
                <h2>Recibir Pago</h2>
                <div class="payment-info">
                    <h3>Tu Payment Pointer</h3>
                    <div class="payment-pointer" onclick="copyToClipboard('${AppState.userData.paymentPointer}')">
                        ${AppState.userData.paymentPointer}
                        <span class="copy-icon">📋</span>
                    </div>
                    <p style="color: #6b7280; margin-top: 1rem;">
                        Comparte este código con quien quiera enviarte dinero. Es tu dirección única para recibir pagos.
                    </p>
                </div>
                
                <div class="qr-code" style="text-align: center; margin: 2rem 0;">
                    <div style="background: white; padding: 2rem; border-radius: 10px; display: inline-block;">
                        <div style="width: 150px; height: 150px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                            <span style="font-size: 3rem;">💰</span>
                        </div>
                    </div>
                    <p style="color: #6b7280; margin-top: 1rem;">Escanea este código QR para recibir pagos</p>
                </div>
            </div>
        </main>
    `;
}

// Página de Historial
function renderHistoryPage() {
    return `
        <main>
            <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
                <h2>Historial de Transacciones</h2>
                <div style="background: white; border-radius: 10px; padding: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <p style="text-align: center; color: #64748b;">No hay transacciones en tu historial</p>
                </div>
            </div>
        </main>
    `;
}

// Página de Perfil Mejorada
function renderProfilePage() {
    return `
        <main class="profile-page">
            <div class="profile-header">
                <div class="profile-avatar">${AppState.userData.avatar}</div>
                <h1>${AppState.userData.name}</h1>
                <p>Miembro desde ${new Date(AppState.userData.joinedDate).toLocaleDateString('es-ES')}</p>
            </div>
            
            <div class="profile-grid">
                <div class="profile-sidebar">
                    <div class="sidebar-card">
                        <h3>Mi Cuenta</h3>
                        <div class="menu-item ${AppState.currentProfileTab === 'personal' ? 'active' : ''}" 
                             onclick="navigateTo('profile', {tab: 'personal'})">
                            👤 Información Personal
                        </div>
                        <div class="menu-item ${AppState.currentProfileTab === 'security' ? 'active' : ''}" 
                             onclick="navigateTo('profile', {tab: 'security'})">
                            🔒 Seguridad
                        </div>
                        <div class="menu-item ${AppState.currentProfileTab === 'preferences' ? 'active' : ''}" 
                             onclick="navigateTo('profile', {tab: 'preferences'})">
                            ⚙️ Preferencias
                        </div>
                        <div class="menu-item ${AppState.currentProfileTab === 'payment' ? 'active' : ''}" 
                             onclick="navigateTo('profile', {tab: 'payment'})">
                            💳 Métodos de Pago
                        </div>
                    </div>
                    
                    <div class="sidebar-card">
                        <h3>Acciones Rápidas</h3>
                        <div class="menu-item" onclick="navigateTo('send')">
                            💸 Enviar Dinero
                        </div>
                        <div class="menu-item" onclick="navigateTo('receive')">
                            💰 Recibir Pago
                        </div>
                        <div class="menu-item" onclick="navigateTo('history')">
                            📊 Ver Historial
                        </div>
                    </div>
                </div>
                
                <div class="profile-content">
                    ${renderProfileContent()}
                </div>
            </div>
        </main>
    `;
}

function renderProfileContent() {
    switch (AppState.currentProfileTab) {
        case 'personal':
            return renderPersonalInfo();
        case 'security':
            return renderSecuritySettings();
        case 'preferences':
            return renderPreferences();
        case 'payment':
            return renderPaymentMethods();
        default:
            return renderPersonalInfo();
    }
}

function renderPersonalInfo() {
    return `
        <div class="content-card">
            <h2>Información Personal</h2>
            <form id="personalInfoForm">
                <div class="form-group">
                    <label for="profileName">Nombre Completo</label>
                    <input type="text" id="profileName" value="${AppState.userData.name}" required>
                </div>
                <div class="form-group">
                    <label for="profileEmail">Correo Electrónico</label>
                    <input type="email" id="profileEmail" value="${AppState.userData.email}" required>
                </div>
                <div class="form-group">
                    <label for="profilePhone">Teléfono</label>
                    <input type="tel" id="profilePhone" value="${AppState.userData.phone}" required>
                </div>
                <div class="form-group">
                    <label>Payment Pointer</label>
                    <input type="text" value="${AppState.userData.paymentPointer}" readonly 
                           style="background: #f3f4f6; cursor: not-allowed;">
                    <small>Tu identificador único para recibir pagos</small>
                </div>
                <button type="submit" class="btn-submit">Guardar Cambios</button>
            </form>
        </div>
    `;
}

function renderSecuritySettings() {
    return `
        <div class="content-card">
            <h2>Configuración de Seguridad</h2>
            
            <div style="margin-bottom: 2rem;">
                <h3>Cambiar Contraseña</h3>
                <form id="changePasswordForm">
                    <div class="form-group">
                        <label for="currentPassword">Contraseña Actual</label>
                        <input type="password" id="currentPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="newPassword">Nueva Contraseña</label>
                        <input type="password" id="newPassword" required>
                        <div class="password-strength">
                            <div class="strength-bar" id="passwordStrengthBar"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="confirmNewPassword">Confirmar Nueva Contraseña</label>
                        <input type="password" id="confirmNewPassword" required>
                    </div>
                    <button type="submit" class="btn-submit">Actualizar Contraseña</button>
                </form>
            </div>
            
            <div>
                <h3>Autenticación de Dos Factores</h3>
                <p style="color: #6b7280; margin-bottom: 1rem;">Protege tu cuenta con una capa adicional de seguridad.</p>
                <button class="btn-submit" style="background: #3b82f6;">Activar 2FA</button>
            </div>
        </div>
    `;
}

function renderPreferences() {
    return `
        <div class="content-card">
            <h2>Preferencias</h2>
            <form id="preferencesForm">
                <div class="form-group">
                    <label for="language">Idioma</label>
                    <select id="language">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="currencyPref">Moneda Predeterminada</label>
                    <select id="currencyPref">
                        <option value="USD">USD - Dólar Americano</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="MXN">MXN - Peso Mexicano</option>
                    </select>
                </div>
                <div class="form-group">
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" id="emailNotifications">
                        Recibir notificaciones por email
                    </label>
                </div>
                <div class="form-group">
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" id="smsNotifications">
                        Recibir notificaciones por SMS
                    </label>
                </div>
                <button type="submit" class="btn-submit">Guardar Preferencias</button>
            </form>
        </div>
    `;
}

function renderPaymentMethods() {
    return `
        <div class="content-card">
            <h2>Métodos de Pago</h2>
            <div style="margin-bottom: 2rem;">
                <h3>Tarjetas Vinculadas</h3>
                <div class="payment-method">
                    <div class="method-icon">💳</div>
                    <div class="method-info">
                        <strong>Visa •••• 1234</strong>
                        <span>Expira 12/2025</span>
                    </div>
                    <button class="btn-remove">Eliminar</button>
                </div>
                <button class="btn-submit" style="background: #3b82f6; margin-top: 1rem;">+ Agregar Tarjeta</button>
            </div>
            
            <div>
                <h3>Cuentas Bancarias</h3>
                <div class="payment-method">
                    <div class="method-icon">🏦</div>
                    <div class="method-info">
                        <strong>Banco Nacional</strong>
                        <span>•••• 5678</span>
                    </div>
                    <button class="btn-remove">Eliminar</button>
                </div>
                <button class="btn-submit" style="background: #3b82f6; margin-top: 1rem;">+ Agregar Cuenta</button>
            </div>
        </div>
    `;
}

function renderSettingsPage() {
    return `
        <main>
            <div style="max-width: 600px; margin: 0 auto; padding: 2rem;">
                <h2>Configuración</h2>
                <div style="background: white; border-radius: 10px; padding: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <p style="text-align: center; color: #64748b;">Página de configuración en desarrollo</p>
                </div>
            </div>
        </main>
    `;
}

function renderHelpPage() {
    return `
        <main>
            <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
                <h2>Centro de Ayuda</h2>
                <div style="background: white; border-radius: 10px; padding: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h3>Preguntas Frecuentes</h3>
                    <div class="faq-item">
                        <h4>¿Cómo envío dinero?</h4>
                        <p>Ve a la sección "Enviar Remesa" e ingresa los datos del destinatario.</p>
                    </div>
                    <div class="faq-item">
                        <h4>¿Qué es un Payment Pointer?</h4>
                        <p>Es tu dirección única para recibir pagos, similar a un email.</p>
                    </div>
                    <div class="contact-support">
                        <h3>¿Necesitas más ayuda?</h3>
                        <button class="btn-submit">Contactar Soporte</button>
                    </div>
                </div>
            </div>
        </main>
    `;
}

// Agregar event listeners mejorados
function addEventListeners() {
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Validación en tiempo real
        const password = document.getElementById('regPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', function() {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.style.borderColor = '#ef4444';
                } else {
                    confirmPassword.style.borderColor = '#10b981';
                }
            });
        }
    }

    // Formulario de envío
    const sendForm = document.getElementById('sendForm');
    if (sendForm) {
        sendForm.addEventListener('submit', handleSend);
    }

    // Formularios del perfil
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', handlePersonalInfoUpdate);
    }

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', handlePasswordChange);
    }
}

// Manejadores de eventos mejorados
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe')?.checked;
    
    // Validaciones
    if (!email || !password) {
        NotificationSystem.show('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (!ValidationSystem.validateEmail(email)) {
        NotificationSystem.show('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Simular carga
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Procesando...';
    submitBtn.disabled = true;
    
    // Simular API call
    setTimeout(() => {
        if (password === 'password123') { // Contraseña de prueba
            AppState.currentUser = { 
                email: email, 
                name: email.split('@')[0],
                loginTime: new Date()
            };
            AppState.userData.name = email.split('@')[0];
            AppState.userData.email = email;
            AppState.userData.avatar = email.split('@')[0].substring(0, 2).toUpperCase();
            
            NotificationSystem.show('¡Bienvenido de nuevo!', 'success');
            
            setTimeout(() => {
                navigateTo('dashboard');
            }, 1000);
        } else {
            AppState.tempData.loginAttempts++;
            NotificationSystem.show('Credenciales incorrectas. Intenta nuevamente.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validaciones
    if (password !== confirmPassword) {
        NotificationSystem.show('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (password.length < 6) {
        NotificationSystem.show('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    if (!ValidationSystem.validateEmail(email)) {
        NotificationSystem.show('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Simular registro exitoso
    NotificationSystem.show('¡Cuenta creada exitosamente!', 'success');
    AppState.currentUser = { email: email, name: fullName };
    AppState.userData.name = fullName;
    AppState.userData.email = email;
    AppState.userData.avatar = fullName.substring(0, 2).toUpperCase();
    
    setTimeout(() => {
        navigateTo('dashboard');
    }, 1500);
}

function handleSend(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const recipient = document.getElementById('recipient').value;
    
    if (!ValidationSystem.validateAmount(amount)) {
        NotificationSystem.show('El monto debe ser entre $0.01 y $10,000', 'error');
        return;
    }
    
    if (!ValidationSystem.validatePaymentPointer(recipient)) {
        NotificationSystem.show('Payment Pointer inválido', 'error');
        return;
    }
    
    NotificationSystem.show(`Remesa de $${amount} enviada exitosamente a ${recipient}`, 'success');
    
    setTimeout(() => {
        navigateTo('dashboard');
    }, 2000);
}

function handlePersonalInfoUpdate(e) {
    e.preventDefault();
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    
    AppState.userData.name = name;
    AppState.userData.email = email;
    AppState.userData.phone = phone;
    AppState.userData.avatar = name.substring(0, 2).toUpperCase();
    
    NotificationSystem.show('Información personal actualizada correctamente', 'success');
}

function handlePasswordChange(e) {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    
    if (ValidationSystem.validatePassword(newPassword) === 'invalid') {
        NotificationSystem.show('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    NotificationSystem.show('Contraseña actualizada correctamente', 'success');
    e.target.reset();
}

// Sistema de animaciones
function setupAnimations() {
    // Animación de scroll para header
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animaciones para elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    document.querySelectorAll('.feature-card, .stat-item, .form-container').forEach(el => {
        observer.observe(el);
    });
}

// Validaciones en tiempo real
function setupRealTimeValidation() {
    const passwordInput = document.getElementById('newPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strength = ValidationSystem.validatePassword(this.value);
            const strengthBar = document.getElementById('passwordStrengthBar');
            if (strengthBar) {
                strengthBar.className = 'strength-bar ' + strength;
            }
        });
    }
    
    // Validación de email en tiempo real
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !ValidationSystem.validateEmail(this.value)) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
        });
    });
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', function() {
    renderPage();
    NotificationSystem.render();
    
    // Manejar navegación con el botón atrás
    window.addEventListener('popstate', function(event) {
        if (event.state) {
            navigateTo(event.state.page, event.state.params);
        }
    });
});

// Funciones globales
window.navigateTo = navigateTo;
window.NotificationSystem = NotificationSystem;
window.logout = function() {
    AppState.currentUser = null;
    NotificationSystem.show('Sesión cerrada correctamente', 'info');
    navigateTo('landing');
};

window.receivePayment = function() {
    navigator.clipboard.writeText(AppState.userData.paymentPointer).then(() => {
        NotificationSystem.show('Payment Pointer copiado al portapapeles', 'success');
    });
};

window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        NotificationSystem.show('Copiado al portapapeles', 'success');
    });
};

window.scrollToSection = function(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};