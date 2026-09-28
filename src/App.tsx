import { useState, useRef } from 'react'

// Estructura basada en los datos reales del pantallazo
interface Tienda {
  id: string;
  fecha: string;
  numero: string;
  linea: string; // Nombre de la tienda / línea
  producto: string;
  trafi: string;
  presupuesto: number;
}

const TIENDAS_INICIALES: Tienda[] = [
  { id: '1', fecha: '27/9/2026', numero: '3117938167', linea: 'DRISTRI PRO 1', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 290000 },
  { id: '2', fecha: '27/9/2026', numero: '3006865174', linea: 'VARIEDADES DIGITALES 1', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 190000 },
  { id: '3', fecha: '27/9/2026', numero: '3117718030', linea: 'NOVA HOME', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 290000 },
  { id: '4', fecha: '27/9/2026', numero: '3117654394', linea: 'DANTE NOVA', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 285000 },
  { id: '5', fecha: '27/9/2026', numero: '3011674464', linea: 'CLOTHESNEW 2', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '6', fecha: '27/9/2026', numero: '3233721174', linea: 'GOAL STORE 2', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 240000 },
  { id: '7', fecha: '27/9/2026', numero: '3104964973', linea: 'LEVEL ONE 2', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 240000 },
  { id: '8', fecha: '27/9/2026', numero: '3013622434', linea: 'AURA Y HOME 2', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 300000 },
  { id: '9', fecha: '27/9/2026', numero: '3043646273', linea: 'NET CAPITAL 1', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 500000 },
  { id: '10', fecha: '27/9/2026', numero: '3042503846', linea: 'DANTE NOVA 3', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 220000 },
  { id: '11', fecha: '27/9/2026', numero: '3042504328', linea: 'DISTRIPRO 2', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '12', fecha: '27/9/2026', numero: '3104964983', linea: 'LATIN SHOP 2', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 185000 },
  { id: '13', fecha: '27/9/2026', numero: '3219434182', linea: 'CLOTHESNEW', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 185000 },
  { id: '14', fecha: '27/9/2026', numero: '3043311027', linea: 'STYLE TRENDS', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 255000 },
  { id: '15', fecha: '27/9/2026', numero: '3117689919', linea: 'TODO EN LINEA 1 (9919)', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '16', fecha: '27/9/2026', numero: '3046497928', linea: 'NETCAPITAL', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '17', fecha: '27/9/2026', numero: '3117689943', linea: 'DRISTRIPRO', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '18', fecha: '27/9/2026', numero: '3004658319', linea: 'STYLE TRENDS 1', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 215000 },
  { id: '19', fecha: '27/9/2026', numero: '3104963935', linea: 'NOVA HOME 4', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 140000 },
  { id: '20', fecha: '27/9/2026', numero: '3127049437', linea: 'TIENDA EL CAMPITO', producto: 'CARPAS', trafi: 'Oscar', presupuesto: 150000 },
  { id: '21', fecha: '27/9/2026', numero: '3006872470', linea: 'TIENDA EL CAMPITO 1', producto: 'CARPAS', trafi: 'Oscar', presupuesto: 150000 },
  { id: '22', fecha: '27/9/2026', numero: '3006872469', linea: 'TIENDA EL CAMPITO 2', producto: 'CARPAS', trafi: 'Oscar', presupuesto: 130000 },
  { id: '23', fecha: '27/9/2026', numero: '3106064596', linea: 'CLOTHES NEW 4', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 330000 },
  { id: '24', fecha: '27/9/2026', numero: '3104371164', linea: 'AXIS SHOP 4', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 270000 },
  { id: '25', fecha: '27/9/2026', numero: '3006864858', linea: 'TOP MARKET 1', producto: 'BOXERS CK', trafi: 'Oscar', presupuesto: 200000 },
  { id: '26', fecha: '27/9/2026', numero: '3042327503', linea: 'RAW STREET 3', producto: 'CACHETEROS CK', trafi: 'Oscar', presupuesto: 200000 },
  { id: '27', fecha: '27/9/2026', numero: '3115230622', linea: 'NOXA', producto: 'BOXERS NOXA', trafi: 'Oscar', presupuesto: 200000 },
  { id: '28', fecha: '27/9/2026', numero: '3117980010', linea: 'NOXA', producto: 'BOXERS NOXA', trafi: 'Oscar', presupuesto: 100000 },
  { id: '29', fecha: '27/9/2026', numero: '3105210297', linea: 'NOVA HOME 3', producto: 'PIJAMAS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '30', fecha: '27/9/2026', numero: '3181350330', linea: 'COMPRA MAS 3', producto: 'PIJAMAS', trafi: 'Oscar', presupuesto: 80000 },
  { id: '31', fecha: '27/9/2026', numero: '3104965029', linea: 'COMPRA MAS 4', producto: 'PIJAMAS', trafi: 'Oscar', presupuesto: 80000 },
  { id: '32', fecha: '27/9/2026', numero: '3181699761', linea: 'SANTA SHOP 2', producto: 'AROMATERAPIA', trafi: 'Oscar', presupuesto: 20000 },
  { id: '33', fecha: '27/9/2026', numero: '3104965018', linea: 'SANTA SHOP 3', producto: 'AROMATERAPIA', trafi: 'Oscar', presupuesto: 20000 },
];

function App() {
  const [tiendas, setTiendas] = useState<Tienda[]>(TIENDAS_INICIALES);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadState, setUploadState] = useState<'idle' | 'reading' | 'reviewing' | 'confirmed'>('idle');
  const [extractedData, setExtractedData] = useState<Tienda[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtrado en tiempo real por Nombre/Línea o Teléfono
  const tiendasFiltradas = tiendas.filter(t => 
    t.linea.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.numero.includes(searchTerm) ||
    t.producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presupuestoTotal = tiendas.reduce((acc, t) => acc + t.presupuesto, 0);

  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(monto);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadState('reading');
      
      // Simular procesamiento del pantallazo extrayendo las 33 tiendas reales del documento
      setTimeout(() => {
        setExtractedData(TIENDAS_INICIALES);
        setUploadState('reviewing');
      }, 1500);
    }
  };

  const handleConfirm = () => {
    setTiendas(extractedData);
    setUploadState('confirmed');
    setFeedback(`✓ ${extractedData.length} tiendas procesadas y actualizadas correctamente.`);
    setTimeout(() => {
      setUploadState('idle');
      setFeedback(null);
    }, 4000);
  };

  const handleCopyData = () => {
    const header = "FECHA\tNUMERO\tLINEA\tPRODUCTO\tTRAFI\tPRESUPUESTO\n";
    const rows = tiendas.map(t => `${t.fecha}\t${t.numero}\t${t.linea}\t${t.producto}\t${t.trafi}\t$${t.presupuesto.toLocaleString('es-CO')}`).join("\n");
    navigator.clipboard.writeText(header + rows);

    setFeedback("✓ Datos copiados. Ya puedes pegarlos en Excel o Google Sheets.");
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar con Buscador */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg">
            B
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">Bitácora</h1>
            <p className="text-xs text-gray-500 mt-0.5">Control de tiendas y presupuestos</p>
          </div>
        </div>
        
        {/* Buscador siempre accesible */}
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, teléfono o producto..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
          />
          <div className="absolute left-3 top-2.5 text-gray-400 text-sm">
            🔍
          </div>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-3 top-2.5 text-xs bg-gray-200 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-300"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* Feedback Rápido */}
        {feedback && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-2 font-medium shadow-xs animate-fade-in text-sm">
            <span className="text-lg">✓</span> {feedback}
          </div>
        )}

        {/* Dashboard Resumen */}
        {uploadState === 'idle' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Tiendas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{tiendas.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Presupuesto Total</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{formatMoneda(presupuestoTotal)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Última Actualización</p>
                <p className="text-base font-semibold text-gray-800 mt-1">Hoy, 27 Sep 2026</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Acción Rápida</p>
                <button className="mt-1 text-sm text-blue-600 font-bold hover:text-blue-800 text-left flex items-center gap-1">
                  + Agregar tienda
                </button>
              </div>
            </div>

            {/* Acciones Principales en Lenguaje Natural */}
            <div className="flex flex-wrap gap-3">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
              />
              <button 
                onClick={handleUploadClick}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-2 text-sm"
              >
                📷 Subir pantallazo
              </button>
              <button 
                onClick={handleCopyData}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-xs flex items-center gap-2 text-sm"
              >
                📋 Copiar datos
              </button>
              <button 
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-xs flex items-center gap-2 text-sm"
              >
                📝 Agregar a bitácora
              </button>
            </div>

            {/* Tabla Principal de Tiendas */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800 text-base">
                  Tiendas y Presupuestos {searchTerm && <span className="text-sm font-normal text-gray-500">({tiendasFiltradas.length} encontradas)</span>}
                </h2>
                <span className="text-xs text-gray-500 font-medium">Formato compatible con Excel</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100/70 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="px-4 py-3 font-semibold">Fecha</th>
                      <th className="px-4 py-3 font-semibold">Teléfono</th>
                      <th className="px-4 py-3 font-semibold">Línea / Tienda</th>
                      <th className="px-4 py-3 font-semibold">Producto</th>
                      <th className="px-4 py-3 font-semibold">Trafi</th>
                      <th className="px-4 py-3 font-semibold text-right">Presupuesto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700">
                    {tiendasFiltradas.length > 0 ? (
                      tiendasFiltradas.map((tienda) => (
                        <tr key={tienda.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-gray-500">{tienda.fecha}</td>
                          <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900">{tienda.numero}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{tienda.linea}</td>
                          <td className="px-4 py-3">
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded font-medium">
                              {tienda.producto}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{tienda.trafi}</td>
                          <td className="px-4 py-3 font-bold text-gray-900 text-right font-mono">
                            {formatMoneda(tienda.presupuesto)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          No se encontraron tiendas con el término "<span className="font-semibold">{searchTerm}</span>"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Estado: Leyendo */}
        {uploadState === 'reading' && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-xs my-8">
            <div className="text-4xl mb-3 animate-spin inline-block">⏳</div>
            <h2 className="text-xl font-bold text-gray-800">Estamos leyendo tu pantallazo...</h2>
            <p className="text-sm text-gray-500 mt-1">Identificando números, líneas y presupuestos del documento.</p>
          </div>
        )}

        {/* Estado: Revisión de Pantallazo Leído */}
        {uploadState === 'reviewing' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-blue-900 text-lg">✓ Encontramos 33 tiendas en tu pantallazo</h2>
                <p className="text-sm text-blue-700">Por favor revisa la información extraída antes de confirmarla.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setUploadState('idle')}
                  className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirm}
                  className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-xs"
                >
                  Confirmar y Guardar
                </button>
              </div>
            </div>
            
            {/* Tabla de revisión con los datos reales */}
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="sticky top-0 bg-gray-100 text-gray-600 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Teléfono</th>
                    <th className="px-4 py-3 font-semibold">Línea</th>
                    <th className="px-4 py-3 font-semibold">Producto</th>
                    <th className="px-4 py-3 font-semibold">Trafi</th>
                    <th className="px-4 py-3 font-semibold text-right">Presupuesto Extraído</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {extractedData.map((row) => (
                    <tr key={row.id} className="hover:bg-blue-50/30">
                      <td className="px-4 py-2.5 text-gray-500">{row.fecha}</td>
                      <td className="px-4 py-2.5 font-mono text-xs">{row.numero}</td>
                      <td className="px-4 py-2.5 font-medium">{row.linea}</td>
                      <td className="px-4 py-2.5">{row.producto}</td>
                      <td className="px-4 py-2.5">{row.trafi}</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700 text-right font-mono">
                        {formatMoneda(row.presupuesto)}
                      </td>
                    </tr>
                  ))}
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
