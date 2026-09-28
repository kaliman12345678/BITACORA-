import { useState } from 'react'

function App() {
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
        
        {/* Dashboard Resumen */}
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
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
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

      </main>
    </div>
  )
}

export default App
