// Estado global de la aplicación
const AppState = {
    currentUser: null,
    currentPage: 'landing',
    transactions: [],
    userData: {
        name: 'Usuario',
        balance: 1250.00,
        currency: 'USD'
    }
};

// Navegación entre páginas
function navigateTo(page) {
    AppState.currentPage = page;
    renderPage();
    window.scrollTo(0, 0);
}

// Renderizar página actual
function renderPage() {
    const app = document.getElementById('app');
    
    switch (AppState.currentPage) {
        case 'landing':
            app.innerHTML = renderLandingPage();
            break;
        case 'login':
            app.innerHTML = renderLoginPage();
            break;
        case 'register':
            app.innerHTML = renderRegisterPage();
            break;
        case 'dashboard':
            app.innerHTML = renderDashboard();
            break;
        case 'send':
            app.innerHTML = renderSendPage();
            break;
        case 'history':
            app.innerHTML = renderHistoryPage();
            break;
        default:
            app.innerHTML = renderLandingPage();
    }
    
    // Agregar event listeners después de renderizar
    setTimeout(addEventListeners, 100);
}

// Página de Inicio Mejorada
function renderLandingPage() {
    return `
        <header>
            <nav>
                <div class="logo">
                    <h1>💸 RemesApp</h1>
                </div>
                <div class="nav-links">
                    <a href="#inicio" onclick="navigateTo('landing')">Inicio</a>
                    <a href="#caracteristicas">Características</a>
                    <a href="#como-funciona">Cómo Funciona</a>
                    <a href="#testimonios">Testimonios</a>
                    <button class="btn-login" onclick="navigateTo('login')">Iniciar Sesión</button>
                    <button class="btn-register" onclick="navigateTo('register')">Comenzar Gratis</button>
                </div>
            </nav>
        </header>

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
        <header>
            <nav>
                <div class="logo">
                    <h1>💸 RemesApp</h1>
                </div>
                <div class="nav-links">
                    <button class="btn-register" onclick="navigateTo('register')">Crear Cuenta</button>
                </div>
            </nav>
        </header>

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
                            <input type="checkbox"> Recordarme
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
        <header>
            <nav>
                <div class="logo">
                    <h1>💸 RemesApp</h1>
                </div>
                <div class="nav-links">
                    <button class="btn-login" onclick="navigateTo('login')">Iniciar Sesión</button>
                </div>
            </nav>
        </header>

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
        <header>
            <nav>
                <div class="logo">
                    <h1>💸 RemesApp</h1>
                </div>
                <div class="nav-links">
                    <span style="color: #10b981; font-weight: 600;">¡Hola, ${AppState.userData.name}!</span>
                    <button class="btn-login" onclick="logout()">Cerrar Sesión</button>
                </div>
            </nav>
        </header>

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
                <button class="btn-receive" onclick="receivePayment()">
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
        <header>
            <nav>
                <div class="logo">
                    <h1>💸 RemesApp</h1>
                </div>
                <div class="nav-links">
                    <button class="btn-login" onclick="navigateTo('dashboard')">← Volver al Dashboard</button>
                </div>
            </nav>
        </header>

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

// Página de Historial
function renderHistoryPage() {
    return `
        <header>
            <nav>
                <div class="logo">
                    <h1>💸 RemesApp</h1>
                </div>
                <div class="nav-links">
                    <button class="btn-login" onclick="navigateTo('dashboard')">← Volver al Dashboard</button>
                </div>
            </nav>
        </header>

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
}

// Manejadores de eventos mejorados
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validación básica
    if (!email || !password) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Simular login exitoso
    showNotification('¡Bienvenido de nuevo!', 'success');
    AppState.currentUser = { email: email, name: email.split('@')[0] };
    AppState.userData.name = email.split('@')[0];
    
    setTimeout(() => {
        navigateTo('dashboard');
    }, 1000);
}

function handleRegister(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validaciones
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    // Simular registro exitoso
    showNotification('¡Cuenta creada exitosamente!', 'success');
    AppState.currentUser = { email: email, name: fullName };
    AppState.userData.name = fullName;
    
    setTimeout(() => {
        navigateTo('dashboard');
    }, 1500);
}

function handleSend(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const recipient = document.getElementById('recipient').value;
    
    showNotification(`Remesa de $${amount} enviada exitosamente a ${recipient}`, 'success');
    
    setTimeout(() => {
        navigateTo('dashboard');
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function logout() {
    AppState.currentUser = null;
    showNotification('Sesión cerrada exitosamente', 'info');
    setTimeout(() => {
        navigateTo('landing');
    }, 1000);
}

function receivePayment() {
    const paymentPointer = '$remesapp.example/usuario';
    prompt('Comparte tu Payment Pointer con el remitente:', paymentPointer);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderPage();
});

// Hacer las funciones globales
window.navigateTo = navigateTo;
window.logout = logout;
window.receivePayment = receivePayment;