import { useState } from 'react';
import { Calendar, User, Mail, FileText, CheckCircle, AlertCircle, Heart, Briefcase, Building, Clock } from 'lucide-react';

const AgendarConsulta = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nombre || !fecha) {
      setMensaje({ tipo: 'error', texto: 'Por favor completa el nombre y la fecha de consulta.' });
      return;
    }

    setLoading(true);
    setMensaje(null);

    // Simulación de envío
    setTimeout(() => {
      setMensaje({ tipo: 'exito', texto: '¡Tu consulta ha sido agendada exitosamente!' });
      setNombre('');
      setEmail('');
      setEmpresa('');
      setCargo('');
      setFecha('');
      setMotivo('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-sky-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/15 to-blue-200/15 rounded-full blur-3xl"></div>
      
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header con logo y título */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-blue-400/30 rounded-2xl blur-2xl animate-pulse"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-xl border-2 border-blue-100">
                <img 
                  src="/logo.png" 
                  alt="MedCheck Logo" 
                  className="h-16 object-contain"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[#001F54] mb-4">
              Agenda tu Consulta Médica
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Completa el formulario y nuestro equipo se pondrá en contacto contigo para confirmar tu cita
            </p>
          </div>

          {/* Card principal del formulario */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Barra superior decorativa */}
            <div className="h-1.5 bg-gradient-to-r from-[#0066CC] via-[#FF6B35] to-[#00A8E8]"></div>
            
            <div className="p-8 sm:p-12">
              <div className="space-y-6">
                {/* Información Personal Section */}
                <div className="border-l-4 border-[#0066CC] pl-4 mb-8">
                  <h2 className="text-xl font-bold text-[#001F54] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#0066CC]" />
                    Información Personal
                  </h2>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: María González López"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#0066CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@empresa.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#0066CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Información Laboral Section */}
                <div className="border-l-4 border-[#FF6B35] pl-4 mt-10 mb-8">
                  <h2 className="text-xl font-bold text-[#001F54] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#FF6B35]" />
                    Información Laboral
                  </h2>
                </div>

                {/* Empresa y Cargo */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Empresa
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Díaz Gill Laboratorios"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cargo
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        placeholder="Gerente de RRHH"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#FF6B35] focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Detalles de la Consulta Section */}
                <div className="border-l-4 border-[#00A8E8] pl-4 mt-10 mb-8">
                  <h2 className="text-xl font-bold text-[#001F54] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#00A8E8]" />
                    Detalles de la Consulta
                  </h2>
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de consulta *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#00A8E8] focus:ring-4 focus:ring-sky-100 outline-none transition-all text-gray-800 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Motivo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estudios solicitados <span className="text-gray-400 font-normal text-sm">(opcional)</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      placeholder="Describe los estudios médicos que necesitas realizar..."
                      rows={4}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#00A8E8] focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full relative group overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC] to-[#00A8E8] transition-transform group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-3 py-4 text-white font-bold text-lg">
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Procesando...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-6 h-6" />
                          <span>Agendar Consulta</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Mensaje de resultado */}
              {mensaje && (
                <div
                  className={`mt-8 p-5 rounded-xl flex items-start gap-4 transition-all border-2 ${
                    mensaje.tipo === 'exito'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  {mensaje.tipo === 'exito' ? (
                    <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-7 h-7 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p
                      className={`font-bold text-lg ${
                        mensaje.tipo === 'exito' ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {mensaje.texto}
                    </p>
                    {mensaje.tipo === 'exito' && (
                      <p className="text-green-700 mt-2">
                        Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para confirmar tu cita.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-10 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
                <Heart className="w-5 h-5 text-[#FF6B35]" fill="#FF6B35" />
                <span className="text-sm font-semibold text-[#001F54]">Tu bienestar es nuestra prioridad</span>
              </div>
              <p className="text-sm text-gray-500">
                ¿Necesitas ayuda? Contáctanos al <span className="font-semibold text-[#0066CC]">+595 983 867308</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendarConsulta;