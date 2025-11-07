import { useEffect, useState } from 'react';
import { Calendar, User, Phone, Mail, FileText, Search, ClipboardList, AlertCircle } from 'lucide-react';

interface Persona {
  nombre: string;
  telefono: string | null;
  email: string | null;
}

interface Consulta {
  id: number;
  fecha_consulta: string;
  motivo: string | null;
  persona: Persona;
}

const VerConsultas = () => {
  const [fecha, setFecha] = useState('');
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarConsultas = async () => {
    setLoading(true);
    
    // Aquí va tu código de Supabase
    // const { data, error } = await supabase...
    
    // Simulación temporal con datos de ejemplo
    setTimeout(() => {
      const ejemplos: Consulta[] = [
        {
          id: 1,
          fecha_consulta: fecha,
          motivo: 'Consulta general - Chequeo preventivo',
          persona: {
            nombre: 'María González',
            telefono: '0981 234 567',
            email: 'maria@example.com'
          }
        },
        {
          id: 2,
          fecha_consulta: fecha,
          motivo: 'Control de presión arterial',
          persona: {
            nombre: 'Juan Pérez',
            telefono: '0971 345 678',
            email: 'juan@example.com'
          }
        },
        {
          id: 3,
          fecha_consulta: fecha,
          motivo: null,
          persona: {
            nombre: 'Ana Martínez',
            telefono: null,
            email: 'ana@example.com'
          }
        }
      ];
      setConsultas(ejemplos);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (fecha) cargarConsultas();
  }, [fecha]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <ClipboardList className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3 sm:mb-4">
              Consultas del Día
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Visualiza y gestiona todas las consultas programadas
            </p>
          </div>

          {/* Card de búsqueda */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
              
              <div className="p-6 sm:p-8">
                <div className="group max-w-md mx-auto">
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 justify-center">
                    <Search className="w-5 h-5 text-emerald-600" />
                    Selecciona una fecha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      max={new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]}
                      className="relative w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 text-center text-lg font-semibold cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-700 font-semibold">Cargando consultas...</span>
              </div>
            </div>
          )}

          {/* Resultados */}
          {!loading && fecha && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                
                {consultas.length > 0 ? (
                  <div className="p-4 sm:p-6 lg:p-8">
                    {/* Contador de consultas */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total de consultas</p>
                          <p className="text-2xl font-bold text-gray-800">{consultas.length}</p>
                        </div>
                      </div>
                    </div>

                    {/* Lista de consultas - Vista móvil */}
                    <div className="block lg:hidden space-y-4">
                      {consultas.map((consulta, index) => (
                        <div
                          key={consulta.id}
                          className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 transition-all"
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 text-lg mb-1">
                                {consulta.persona?.nombre}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="space-y-3 pl-13">
                            {consulta.persona?.telefono && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4 text-teal-600" />
                                <span className="text-sm">{consulta.persona.telefono}</span>
                              </div>
                            )}
                            {consulta.persona?.email && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4 text-cyan-600" />
                                <span className="text-sm">{consulta.persona.email}</span>
                              </div>
                            )}
                            {consulta.motivo && (
                              <div className="flex items-start gap-2 text-gray-600">
                                <FileText className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{consulta.motivo}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tabla - Vista desktop */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-emerald-600" />
                                Nombre
                              </div>
                            </th>
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-teal-600" />
                                Teléfono
                              </div>
                            </th>
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-600" />
                                Email
                              </div>
                            </th>
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-emerald-600" />
                                Motivo
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {consultas.map((consulta) => (
                            <tr
                              key={consulta.id}
                              className="border-b border-gray-100 hover:bg-emerald-50/50 transition-colors"
                            >
                              <td className="py-4 px-4">
                                <span className="font-semibold text-gray-800">
                                  {consulta.persona?.nombre}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {consulta.persona?.telefono || (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {consulta.persona?.email || (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {consulta.motivo || (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
                      <AlertCircle className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      No hay consultas
                    </h3>
                    <p className="text-gray-600">
                      No se encontraron consultas programadas para esta fecha
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mensaje inicial */}
          {!fecha && !loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl mb-4 shadow-lg">
                <Calendar className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="text-gray-600 text-lg">
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