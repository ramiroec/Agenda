import { useEffect, useState } from 'react';
import { Calendar, User, Phone, Mail, FileText, Search, ClipboardList, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

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
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarConsultas = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('consulta')
      .select(
        `
        id,
        fecha_consulta,
        motivo,
        persona (
          nombre,
          telefono,
          email
        )
      `
      )
      .eq('fecha_consulta', fecha)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al obtener consultas:', error);
      setConsultas([]);
    } else if (data) {
      // Normalizamos persona (Supabase devuelve array)
      const normalizadas = data.map((c: any) => ({
        ...c,
        persona: Array.isArray(c.persona) ? c.persona[0] : c.persona,
      }));
      setConsultas(normalizadas);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (fecha) cargarConsultas();
  }, [fecha]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Efectos decorativos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado */}
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

          {/* Selector de fecha */}
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
                      max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split('T')[0]}
                      className="relative w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 text-center text-lg font-semibold cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estado de carga */}
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
                    {/* Contador */}
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

                    {/* Tabla */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-emerald-600" /> Nombre
                              </div>
                            </th>
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-teal-600" /> Teléfono
                              </div>
                            </th>
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-600" /> Email
                              </div>
                            </th>
                            <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-emerald-600" /> Motivo
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {consultas.map((c) => (
                            <tr
                              key={c.id}
                              className="border-b border-gray-100 hover:bg-emerald-50/50 transition-colors"
                            >
                              <td className="py-4 px-4 font-semibold text-gray-800">
                                {c.persona?.nombre}
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {c.persona?.telefono || '-'}
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {c.persona?.email || '-'}
                              </td>
                              <td className="py-4 px-4 text-gray-600">
                                {c.motivo || '-'}
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
                      No se encontraron consultas programadas para esta fecha.
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
