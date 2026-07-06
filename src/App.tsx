import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Calendar, ClipboardList, Menu, X, Phone } from 'lucide-react';
import AgendarConsulta from './pages/AgendarConsulta';
import VerConsultas from './pages/VerConsultas';
import DiazGill from './pages/DiazGill';
import MeyerLab from './pages/MeyerLab';
import './App.css';

// Navbar Component
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo y título */}
          <div className="flex items-center gap-3 group">
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <img 
                src="/medcheck.png" 
                alt="MedCheck Logo" 
                className="h-12 object-contain"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#001F54]">
                  MedCheck
                </h1>
                <p className="text-xs text-[#0066CC] font-semibold tracking-wide hidden sm:block">
                  BIENESTAR CORPORATIVO
                </p>
              </div>
            </Link>

            {/* Logo Díaz Gill y texto a la derecha del logo MedCheck */}
            <div className="hidden sm:flex items-center ml-4 gap-3">
              <img
                src="/diazgill.png"
                alt="Díaz Gill Logo"
                className="h-12 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold text-slate-900 tracking-tight">
                  Díaz Gill
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-slate-600">
                  Laboratorio
                </span>
              </div>
            </div>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white shadow-lg shadow-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#0066CC]'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar</span>
            </Link>
            <Link
              to="/consultas"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isActive('/consultas')
                  ? 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white shadow-lg shadow-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#0066CC]'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Ver Consultas</span>
            </Link>
            <Link
              to="/diazgill"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isActive('/diazgill')
                  ? 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white shadow-lg shadow-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#0066CC]'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Diaz Gill</span>
            </Link>
            <Link
              to="/meyerlab"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isActive('/meyerlab')
                  ? 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white shadow-lg shadow-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#0066CC]'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Meyer Lab</span>
            </Link>           
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive('/')
                  ? 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar Consulta</span>
            </Link>
            <Link
              to="/consultas"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive('/consultas')
                  ? 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Ver Consultas</span>
            </Link>
            
            {/* Contacto móvil */}
            <a
              href="tel:0800-MEDCHECK"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-md"
            >
              <Phone className="w-5 h-5" />
              <span>Contactar</span>
            </a>
          </div>
        )}
      </div>

      {/* Barra decorativa inferior */}
      <div className="h-1 bg-gradient-to-r from-[#0066CC] via-[#FF6B35] to-[#00A8E8]"></div>
    </nav>
  );
}


// App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<AgendarConsulta />} />
            <Route path="/consultas" element={<VerConsultas />} />
            <Route path="/diazgill" element={<DiazGill />} />
            <Route path="/meyerlab" element={<MeyerLab />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;