import { useState, useEffect } from 'react';
import { Eye, EyeOff, Music, Heart, ListMusic, Compass, User, LogOut, Search, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

// API Configuration
const API_URL = 'http://localhost:3000/api';

// Auth Context
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Verificar token al cargar
      fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    }
    return { success: false, error: data.message };
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    }
    return { success: false, error: data.message };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return { user, token, login, register, logout };
};

// Login Component
function LoginPage({ onRegisterClick, onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setLoading(true);
      const result = await login(formData.email, formData.password);
      setLoading(false);
      if (result.success) {
        onLoginSuccess();
      } else {
        setErrors({ general: result.error || 'Error al iniciar sesión' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Music size={48} className="text-blue-400 mr-3" />
          <h1 className="text-5xl font-light text-gray-300">MusicApp</h1>
        </div>

        <div className="bg-slate-800 bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 border-opacity-50 shadow-2xl space-y-6">
          {errors.general && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-slate-900 bg-opacity-70 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-slate-900 bg-opacity-70 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-medium rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando...' : 'Inicio'}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-300 text-sm">
              ¿No tienes cuenta?{' '}
              <button onClick={onRegisterClick} className="text-blue-300 hover:text-blue-200 transition font-medium">
                Registrarse
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Register Component
function RegisterPage({ onLoginClick, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      setLoading(true);
      const result = await register(formData.name, formData.email, formData.password);
      setLoading(false);
      if (result.success) {
        onRegisterSuccess();
      } else {
        setErrors({ general: result.error || 'Error al registrarse' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-lime-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Music size={48} className="text-teal-400 mr-3" />
          <h1 className="text-5xl font-light text-gray-300">Registro</h1>
        </div>

        <div className="bg-slate-900 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 border-opacity-50 shadow-2xl space-y-6">
          {errors.general && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-slate-800 bg-opacity-60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-slate-800 bg-opacity-60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-slate-800 bg-opacity-60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Confirmar Contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-slate-800 bg-opacity-60 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-medium rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{' '}
              <button onClick={onLoginClick} className="text-teal-400 hover:text-teal-300 transition font-medium">
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function MusicApp() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 bg-opacity-50 backdrop-blur-lg border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Music size={32} className="text-purple-400" />
            <h1 className="text-2xl font-bold text-white">MusicApp</h1>
          </div>
          
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar canciones, artistas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Hola, {user?.name || 'Usuario'}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition"
            >
              <LogOut size={18} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 h-fit">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('explore')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'explore' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <Compass size={20} />
              <span>Explorar</span>
            </button>
            <button
              onClick={() => setActiveTab('playlists')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'playlists' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <ListMusic size={20} />
              <span>Mis Playlists</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'favorites' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <Heart size={20} />
              <span>Favoritos</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'profile' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <User size={20} />
              <span>Perfil</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6">
            {activeTab === 'explore' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Explorar Música</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition cursor-pointer">
                      <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3"></div>
                      <h3 className="text-white font-semibold">Canción {i}</h3>
                      <p className="text-gray-400 text-sm">Artista {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'playlists' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Mis Playlists</h2>
                <p className="text-gray-400">Crea y gestiona tus playlists personalizadas</p>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Mis Favoritos</h2>
                <p className="text-gray-400">Tus canciones favoritas en un solo lugar</p>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Mi Perfil</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Nombre</label>
                    <p className="text-white text-lg">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white text-lg">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
            <div>
              <p className="text-white font-semibold">Canción Actual</p>
              <p className="text-gray-400 text-sm">Artista</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition">
              <SkipBack size={24} />
            </button>
            <button className="bg-white rounded-full p-3 hover:scale-105 transition">
              <Play size={24} className="text-slate-900" />
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <SkipForward size={24} />
            </button>
          </div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <Volume2 className="text-gray-400" size={20} />
            <input type="range" className="w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App with Auth Flow
export default function App() {
  const [view, setView] = useState('login');
  const { user } = useAuth();

  if (user) {
    return <MusicApp />;
  }

  if (view === 'register') {
    return (
      <RegisterPage
        onLoginClick={() => setView('login')}
        onRegisterSuccess={() => setView('login')}
      />
    );
  }

  return (
    <LoginPage
      onRegisterClick={() => setView('register')}
      onLoginSuccess={() => {}}
    />
  );
}