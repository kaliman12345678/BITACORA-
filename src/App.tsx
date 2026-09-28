import { useState, useRef } from 'react'

function App() {
  const [uploadState, setUploadState] = useState<'idle' | 'reading' | 'reviewing' | 'confirmed'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadState('reading');
      
      // Simulamos el tiempo de lectura OCR (2 segundos)
      setTimeout(() => {
        setUploadState('reviewing');
      }, 2000);
    }
  };

  const handleConfirm = () => {
    setUploadState('confirmed');
    // Volver al estado inicial después de un momento
    setTimeout(() => {
      setUploadState('idle');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">Bitácora</h1>
        
        {/* Buscador siempre accesible */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar tienda o teléfono..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        
        {/* Mensaje de Confirmación Rápido */}
        {uploadState === 'confirmed' && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2 font-medium animate-pulse">
            ✓ Pantallazo leído correctamente. Datos guardados.
          </div>
        )}

        {/* Dashboard Resumen (Se oculta durante la revisión para mantener el foco) */}
        {uploadState === 'idle' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">Total Tiendas</p>
                <p className="text-2xl font-bold mt-1">124</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">Presupuesto Total</p>
                <p className="text-2xl font-bold mt-1">$4.500.000</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">Última Actualización</p>
                <p className="text-lg font-semibold mt-1">Hoy, 14:30</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">Acciones Rápidas</p>
                <button className="mt-2 text-sm text-blue-600 font-medium hover:underline">
                  + Agregar tienda
                </button>
              </div>
            </div>

            {/* Acciones Principales */}
            <div className="flex gap-4">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
              />
              <button 
                onClick={handleUploadClick}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
              >
                📸 Subir pantallazo
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                📋 Copiar datos
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                📝 Registrar actividad
              </button>
            </div>

            {/* Lista de tiendas recientes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-700">Tiendas modificadas recientemente</h2>
              </div>
              <div className="p-6 text-center text-gray-500">
                Aquí irá la tabla de tiendas (Top Market, etc.)
              </div>
            </div>
          </>
        )}

        {/* Estado: Leyendo */}
        {uploadState === 'reading' && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="text-4xl mb-4 animate-spin inline-block">⏳</div>
            <h2 className="text-xl font-semibold text-gray-700">Estamos leyendo tu pantallazo...</h2>
            <p className="text-gray-500 mt-2">Identificando tiendas y montos.</p>
          </div>
        )}

        {/* Estado: Revisión */}
        {uploadState === 'reviewing' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-blue-800 text-lg">Encontramos 2 tiendas</h2>
                <p className="text-sm text-blue-600">Por favor revisa los datos antes de guardarlos.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setUploadState('idle')}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
                >
                  Confirmar y Guardar
                </button>
              </div>
            </div>
            
            {/* Tabla de revisión simulada */}
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                    <th className="px-6 py-3 font-medium">Tienda</th>
                    <th className="px-6 py-3 font-medium">Teléfono</th>
                    <th className="px-6 py-3 font-medium">Presupuesto Nuevo</th>
                    <th className="px-6 py-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 font-medium">Top Market</td>
                    <td className="px-6 py-4">3001234567</td>
                    <td className="px-6 py-4 font-semibold text-green-600">$300.000</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Actualizar</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Super Ofertas</td>
                    <td className="px-6 py-4">3009876543</td>
                    <td className="px-6 py-4 font-semibold text-green-600">$150.000</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Actualizar</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default App
