import { useEffect, useState } from 'react';
import { 
  Calendar, User, Mail, FileText, Search, 
  ClipboardList, AlertCircle, Building, 
  Briefcase, Filter, Download, Phone, 
  FileDigit, Clock, UserCircle, 
  ChevronDown, ChevronUp, Lock, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Consulta {
  id: number;
  nombre: string;
  email: string | null;
  empresa: string | null;
  cargo: string | null;
  fecha_consulta: string;
  motivo: string | null;
  archivo_url: string | null;
  creado_en: string | null;
  numero_documento: string | null;
  telefono: string | null;
}

const VerConsultas = () => {
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Autenticación simple por contraseña (medcheck)
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('verConsultasAuth') === 'true';
    } catch {
      return false;
    }
  });

  const handlePasswordSubmit = (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    setAuthError(null);
    if (passwordInput.trim() === 'medcheck') {
      try { sessionStorage.setItem('verConsultasAuth', 'true'); } catch {}
      setAuthenticated(true);
      setPasswordInput('');
    } else {
      setAuthError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    // Si ya está autenticado, cargar consultas (comportamiento actual)
    if (authenticated && fecha) {
      cargarConsultas();
    }
  }, [authenticated, fecha]);

  const cargarConsultas = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('consulta')
        .select('*')
        .eq('fecha_consulta', fecha)
        .order('fecha_consulta', { ascending: true });

      if (supabaseError) {
        setError('Error al cargar las consultas');
        console.error('Error de Supabase:', supabaseError);
      } else {
        setConsultas(data || []);
      }
    } catch (err) {
      setError('Error al conectar con la base de datos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated && fecha) cargarConsultas();
  }, [fecha, authenticated]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatFecha = (fechaString: string) => {
    return new Date(fechaString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatHora = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Si no está autenticado, mostrar modal de contraseña amigable
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#0066CC] to-[#00A8E8] w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#001F54] text-center mt-6">Acceso a Consultas</h2>
          <p className="text-center text-gray-600 mt-2 mb-6">Ingresa la contraseña para ver las consultas programadas</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <label className="block">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 p-1"
                  aria-label="Mostrar contraseña"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </label>

            {authError && <p className="text-sm text-red-600 text-center">{authError}</p>}

            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white rounded-xl font-semibold"
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={() => { setPasswordInput(''); setAuthError(null); }}
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700"
              >
                Limpiar
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-2">Pista: pregunta al administrador si tienes problemas</p>
          </form>
        </div>
      </div>
    );
  }

  // Si está autenticado, renderizar la pantalla completa (contenido existente)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 relative overflow-hidden">
      {/* Efectos decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-sky-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/15 to-blue-200/15 rounded-full blur-3xl"></div>

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-sky-400/30 rounded-2xl blur-2xl animate-pulse"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-xl border-2 border-blue-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#00A8E8] rounded-xl flex items-center justify-center">
                  <ClipboardList className="w-9 h-9 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[#001F54] mb-4">
              Consultas Programadas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visualiza y gestiona todas las citas médicas del día
            </p>
          </div>

          {/* Selector de fecha */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8 max-w-2xl mx-auto">
            <div className="h-1.5 bg-gradient-to-r from-[#0066CC] via-[#FF6B35] to-[#00A8E8]"></div>
            
            <div className="p-8">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 justify-center">
                  <Filter className="w-5 h-5 text-[#0066CC]" />
                  Filtrar por fecha
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split('T')[0]}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#0066CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-800 text-center text-lg font-semibold cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Estado de error */}
          {error && (
            <div className="text-center py-8 px-4">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-50 rounded-2xl border border-red-200">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span className="text-red-700 font-semibold">{error}</span>
              </div>
            </div>
          )}

          {/* Estado de carga */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 px-8 py-5 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-6 h-6 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-700 font-semibold text-lg">Cargando consultas...</span>
              </div>
            </div>
          )}

          {/* Resultados */}
          {!loading && fecha && !error && (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-[#0066CC] via-[#FF6B35] to-[#00A8E8]"></div>

              {consultas.length > 0 ? (
                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Header con estadísticas */}
                  <div className="mb-8 pb-6 border-b-2 border-gray-100">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#0066CC] to-[#00A8E8] rounded-xl flex items-center justify-center shadow-lg">
                          <Calendar className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Fecha seleccionada</p>
                          <p className="text-xl font-bold text-[#001F54]">
                            {new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-3 rounded-xl border border-orange-200">
                        <ClipboardList className="w-6 h-6 text-[#FF6B35]" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Total de consultas</p>
                          <p className="text-3xl font-bold text-[#FF6B35]">{consultas.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lista de consultas */}
                  <div className="space-y-4">
                    {consultas.map((c, index) => (
                      <div
                        key={c.id}
                        className="group bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#0066CC] hover:shadow-lg transition-all duration-300"
                      >
                        {/* Header colapsable */}
                        <button
                          onClick={() => toggleExpand(c.id)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-[#001F54] flex items-center gap-2">
                                <User className="w-5 h-5 text-[#0066CC]" />
                                {c.nombre}
                              </h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  {formatFecha(c.fecha_consulta)}
                                </span>
                                {c.creado_en && (
                                  <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    Registrado: {formatHora(c.creado_en)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium px-3 py-1 bg-blue-50 text-[#0066CC] rounded-full">
                              Ver detalles
                            </span>
                            {expandedId === c.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </button>

                        {/* Contenido expandible */}
                        {expandedId === c.id && (
                          <div className="px-6 pb-6 border-t border-gray-200 pt-4 animate-fadeIn">
                            {/* Sección 1: Datos de quien Agenda */}
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-4">
                                <UserCircle className="w-5 h-5 text-[#0066CC]" />
                                <h4 className="font-bold text-lg text-[#001F54]">
                                  Datos de quien Agenda
                                </h4>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <Building className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs text-gray-500 font-medium">Empresa</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                        {c.empresa || 'No especificada'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <Briefcase className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs text-gray-500 font-medium">Cargo</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                        {c.cargo || 'No especificado'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs text-gray-500 font-medium">Teléfono</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                        {c.telefono || 'No especificado'}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-[#00A8E8] flex-shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs text-gray-500 font-medium">Correo</p>
                                      <p className="text-sm text-gray-800 font-medium break-all">
                                        {c.email || 'No especificado'}
                                      </p>
                                    </div>
                                  </div>

                                  {c.creado_en && (
                                    <div className="flex items-start gap-3">
                                      <Clock className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                                      <div>
                                        <p className="text-xs text-gray-500 font-medium">Fecha de registro</p>
                                        <p className="text-sm text-gray-800 font-medium">
                                          {new Date(c.creado_en).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Sección 2: Datos del Colaborador Agendado */}
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-4">
                                <User className="w-5 h-5 text-[#FF6B35]" />
                                <h4 className="font-bold text-lg text-[#001F54]">
                                  Datos del Colaborador Agendado
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <UserCircle className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs text-gray-500 font-medium">Nombre completo</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                        {c.nombre}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <Briefcase className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs text-gray-500 font-medium">Cargo que ocupará</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                        {c.cargo || 'No especificado'}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <FileDigit className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                      <p className="text-xs text-gray-500 font-medium">Número de documento</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                        {c.numero_documento || 'No especificado'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Sección 3: Detalles de la Consulta */}
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-4">
                                <ClipboardList className="w-5 h-5 text-[#00A8E8]" />
                                <h4 className="font-bold text-lg text-[#001F54]">
                                  Detalles de la Consulta
                                </h4>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <Calendar className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-1" />
                                  <div>
                                    <p className="text-xs text-gray-500 font-medium">Fecha de consulta</p>
                                    <p className="text-sm text-gray-800 font-medium">
                                      {formatFecha(c.fecha_consulta)}
                                    </p>
                                  </div>
                                </div>

                                {c.motivo && (
                                  <div className="flex items-start gap-3">
                                    <FileText className="w-4 h-4 text-[#00A8E8] flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                      <p className="text-xs text-gray-500 font-medium mb-1">
                                        Estudios solicitados
                                      </p>
                                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                                        {c.motivo}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Sección 4: Archivo adjunto */}
                            {c.archivo_url && (
                              <div className="pt-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-lg flex items-center justify-center">
                                      <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">Archivo adjunto</p>
                                      <p className="text-xs text-gray-500">Documento disponible para descarga</p>
                                    </div>
                                  </div>
                                  <a
                                    href={c.archivo_url}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm whitespace-nowrap"
                                  >
                                    <Download className="w-4 h-4" />
                                    Descargar archivo
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-16 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6 shadow-inner">
                    <AlertCircle className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#001F54] mb-3">
                    No hay consultas programadas
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    No se encontraron citas médicas para la fecha seleccionada.
                  </p>
                  <button
                    onClick={() => setFecha(new Date().toISOString().split('T')[0])}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    <Calendar className="w-5 h-5" />
                    Ver consultas de hoy
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mensaje inicial */}
          {!fecha && !loading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl mb-6 shadow-xl border-2 border-blue-100">
                <Calendar className="w-12 h-12 text-[#0066CC]" />
              </div>
              <p className="text-gray-600 text-xl font-medium">
                Selecciona una fecha para ver las consultas programadas
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerConsultas;