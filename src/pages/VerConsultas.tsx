import { useEffect, useState } from 'react';
import { Calendar, User, Mail, FileText, Search, ClipboardList, AlertCircle, Building, Briefcase, Filter } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Persona {
  nombre: string;
  email: string | null;
  empresa: string | null;
  cargo: string | null;
}

interface Consulta {
  id: number;
  fecha_consulta: string;
  motivo: string | null;
  persona: Persona | null;
}

const VerConsultas = () => {
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarConsultas = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('consulta')
        .select(`
          id,
          fecha_consulta,
          motivo,
          persona:persona_id (
            nombre,
            email,
            empresa,
            cargo
          )
        `)
        .eq('fecha_consulta', fecha)
        .order('fecha_consulta', { ascending: true });

      if (supabaseError) {
        setError('Error al cargar las consultas');
        console.error('Error de Supabase:', supabaseError);
      } else {
        // Normalizar la relación "persona" que puede venir como arreglo desde Supabase
        const mapped: Consulta[] = (data || []).map((row: any) => {
          const rawPersona = row.persona;
          const personaObj: Persona | null = Array.isArray(rawPersona)
            ? rawPersona[0] ?? null
            : rawPersona ?? null;

          return {
            id: row.id,
            fecha_consulta: row.fecha_consulta,
            motivo: row.motivo,
            persona: personaObj
          };
        });

        setConsultas(mapped);
      }
    } catch (err) {
      setError('Error al conectar con la base de datos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fecha) cargarConsultas();
  }, [fecha]);

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

                  {/* Lista de consultas - Cards en lugar de tabla para mejor responsive */}
                  <div className="space-y-4">
                    {consultas.map((c, index) => (
                      <div
                        key={c.id}
                        className="group bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#0066CC] hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-[#001F54] flex items-center gap-2">
                                <User className="w-5 h-5 text-[#0066CC]" />
                                {c.persona?.nombre}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#00A8E8] flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Email</p>
                              <p className="text-sm text-gray-700 font-medium">
                                {c.persona?.email || 'No especificado'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Building className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Empresa</p>
                              <p className="text-sm text-gray-700 font-medium">
                                {c.persona?.empresa || 'No especificado'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Briefcase className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Cargo</p>
                              <p className="text-sm text-gray-700 font-medium">
                                {c.persona?.cargo || 'No especificado'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {c.motivo && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-start gap-3">
                              <FileText className="w-4 h-4 text-[#00A8E8] flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium mb-1">Estudios solicitados</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{c.motivo}</p>
                              </div>
                            </div>
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
                    Ver hoy
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