import { useState } from 'react';
import { Calendar, User, Phone, Mail, FileText, CheckCircle, AlertCircle, Heart, Sparkles } from 'lucide-react';

const AgendarConsulta = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMensaje(null);

    // Aquí integrarías tu código de Supabase
    // const { data: persona, error: errorPersona } = await supabase...
    
    setTimeout(() => {
      setMensaje({ tipo: 'exito', texto: '¡Tu consulta ha sido agendada exitosamente!' });
      setNombre('');
      setTelefono('');
      setEmail('');
      setFecha('');
      setMotivo('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header con animación */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3 sm:mb-4">
              Agenda Tu Consulta
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Estamos aquí para cuidar de tu salud. Completa tus datos y nos comunicaremos contigo pronto
            </p>
          </div>

          {/* Card Principal con glassmorphism */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem]"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden">
              {/* Barra decorativa superior con gradiente animado */}
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
              
              <div className="p-6 sm:p-10">
                <div className="space-y-5 sm:space-y-6">
                  {/* Nombre completo */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      Nombre completo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: María González"
                        className="relative w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Grid para Teléfono y Email */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-teal-600" />
                        Teléfono
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <input
                          type="tel"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          placeholder="0981 234 567"
                          className="relative w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cyan-600" />
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ejemplo@mail.com"
                          className="relative w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fecha de consulta */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      Fecha de consulta
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="relative w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Motivo de consulta */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600" />
                      Motivo de consulta <span className="text-gray-400 font-normal text-xs">(opcional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Describe brevemente el motivo de tu consulta médica..."
                        rows={4}
                        className="relative w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all resize-none text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Botón de envío con efectos */}
                  <div className="pt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="relative w-full group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl transition-all group-hover:scale-105"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center justify-center gap-3 py-4 sm:py-5 text-white font-bold text-base sm:text-lg">
                        {loading ? (
                          <>
                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Agendando consulta...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span>Agendar Consulta</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Mensaje de confirmación/error */}
                {mensaje && (
                  <div
                    className={`mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl flex items-start gap-3 sm:gap-4 transform transition-all ${
                      mensaje.tipo === 'exito'
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200'
                        : 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200'
                    }`}
                  >
                    {mensaje.tipo === 'exito' ? (
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p
                        className={`font-bold text-base sm:text-lg ${
                          mensaje.tipo === 'exito' ? 'text-emerald-800' : 'text-red-800'
                        }`}
                      >
                        {mensaje.texto}
                      </p>
                      {mensaje.tipo === 'exito' && (
                        <p className="text-sm sm:text-base text-emerald-700 mt-1.5">
                          Nuestro equipo médico se pondrá en contacto contigo pronto para confirmar tu cita.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Badge informativo */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-emerald-100">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700">Tu salud es nuestra prioridad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendarConsulta;