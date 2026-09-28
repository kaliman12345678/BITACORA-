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

interface ActividadBitacora {
  id: string;
  fecha: string;
  tiendaLinea: string;
  descripcion: string;
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
  const [selectedProducto, setSelectedProducto] = useState<string>('TODOS');
  const [uploadState, setUploadState] = useState<'idle' | 'reading' | 'reviewing' | 'confirmed'>('idle');
  const [extractedData, setExtractedData] = useState<Tienda[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Estados para Bitácora y su Historial
  const [showBitacoraModal, setShowBitacoraModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [selectedTiendaBitacora, setSelectedTiendaBitacora] = useState('');
  const [actividadTexto, setActividadTexto] = useState('');
  const [bitacoraList, setBitacoraList] = useState<ActividadBitacora[]>([
    { id: '1', fecha: '28 Sep 2026 - 14:15', tiendaLinea: 'TOP MARKET 1', descripcion: 'Se cambió creativo de campaña principal.' },
    { id: '2', fecha: '27 Sep 2026 - 09:30', tiendaLinea: 'NOVA HOME', descripcion: 'Se montó campaña de WhatsApp.' },
    { id: '3', fecha: '26 Sep 2026 - 16:45', tiendaLinea: 'DANTE NOVA', descripcion: 'Aumento de presupuesto semanal.' }
  ]);

  // Estado para menú de Copiar
  const [showCopyMenu, setShowCopyMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Obtener lista única de productos para los botones de filtro
  const productosUnicos = ['TODOS', ...Array.from(new Set(tiendas.map(t => t.producto)))];

  // Filtrado combinado por búsqueda general y por botón de producto
  const tiendasFiltradas = tiendas.filter(t => {
    const matchesSearch = 
      t.linea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.numero.includes(searchTerm) ||
      t.producto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProducto = selectedProducto === 'TODOS' || t.producto === selectedProducto;

    return matchesSearch && matchesProducto;
  });

  const presupuestoTotal = tiendasFiltradas.reduce((acc, t) => acc + t.presupuesto, 0);

  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(monto);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadState('reading');
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

  // Copiar datos especificando columna o toda la tabla
  const copyToClipboard = (type: 'all' | 'numero' | 'linea' | 'producto' | 'presupuesto') => {
    let text = '';
    let nombreColumna = '';

    if (type === 'all') {
      const header = "FECHA\tNUMERO\tLINEA\tPRODUCTO\tTRAFI\tPRESUPUESTO\n";
      const rows = tiendasFiltradas.map(t => `${t.fecha}\t${t.numero}\t${t.linea}\t${t.producto}\t${t.trafi}\t$${t.presupuesto.toLocaleString('es-CO')}`).join("\n");
      text = header + rows;
      nombreColumna = "Toda la tabla";
    } else if (type === 'numero') {
      text = tiendasFiltradas.map(t => t.numero).join("\n");
      nombreColumna = "Teléfonos";
    } else if (type === 'linea') {
      text = tiendasFiltradas.map(t => t.linea).join("\n");
      nombreColumna = "Líneas / Tiendas";
    } else if (type === 'producto') {
      text = tiendasFiltradas.map(t => t.producto).join("\n");
      nombreColumna = "Productos";
    } else if (type === 'presupuesto') {
      text = tiendasFiltradas.map(t => `$${t.presupuesto.toLocaleString('es-CO')}`).join("\n");
      nombreColumna = "Presupuestos";
    }

    navigator.clipboard.writeText(text);
    setShowCopyMenu(false);
    setFeedback(`✓ Datos copiados (${nombreColumna}). Ya puedes pegarlos en Excel o Google Sheets.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  // Guardar actividad en Bitácora
  const handleGuardarActividad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actividadTexto.trim()) return;

    const hoy = new Date();
    const fechaFormateada = `${hoy.getDate()} Sep ${hoy.getFullYear()} - ${hoy.getHours().toString().padStart(2, '0')}:${hoy.getMinutes().toString().padStart(2, '0')}`;

    const nuevaActividad: ActividadBitacora = {
      id: Date.now().toString(),
      fecha: fechaFormateada,
      tiendaLinea: selectedTiendaBitacora || 'General',
      descripcion: actividadTexto
    };

    setBitacoraList([nuevaActividad, ...bitacoraList]);
    setShowBitacoraModal(false);
    setActividadTexto('');
    setSelectedTiendaBitacora('');
    setFeedback("✓ Actividad registrada en la bitácora.");
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar con Buscador */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg shadow-xs">
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
                <p className="text-2xl font-bold text-gray-900 mt-1">{tiendasFiltradas.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Presupuesto Actual</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{formatMoneda(presupuestoTotal)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Última Actualización</p>
                <p className="text-base font-semibold text-gray-800 mt-1">Hoy, 28 Sep 2026</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Bitácora Rápida</p>
                <div className="flex items-center gap-3 mt-1">
                  <button 
                    onClick={() => setShowBitacoraModal(true)}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    + Registrar
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={() => setShowHistorialModal(true)}
                    className="text-xs text-gray-700 font-bold hover:underline flex items-center gap-1"
                  >
                    📜 Ver historial ({bitacoraList.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Acciones Principales y Menú Desplegable de Copiado */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
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

                {/* Botón Copiar con Opciones de Columna */}
                <div className="relative">
                  <button 
                    onClick={() => setShowCopyMenu(!showCopyMenu)}
                    className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-xs flex items-center gap-2 text-sm"
                  >
                    📋 Copiar datos ▼
                  </button>

                  {showCopyMenu && (
                    <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg border border-gray-200 shadow-lg z-20 py-1 text-sm">
                      <button 
                        onClick={() => copyToClipboard('all')} 
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium text-gray-800 border-b border-gray-100"
                      >
                        📋 Toda la tabla
                      </button>
                      <button 
                        onClick={() => copyToClipboard('linea')} 
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      >
                        🏷️ Solo nombres de Tiendas
                      </button>
                      <button 
                        onClick={() => copyToClipboard('numero')} 
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      >
                        📞 Solo Teléfonos
                      </button>
                      <button 
                        onClick={() => copyToClipboard('presupuesto')} 
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      >
                        💵 Solo Presupuestos
                      </button>
                      <button 
                        onClick={() => copyToClipboard('producto')} 
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      >
                        👕 Solo Productos
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setShowBitacoraModal(true)}
                  className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-xs flex items-center gap-2 text-sm"
                >
                  📝 Agregar a bitácora
                </button>

                {/* BOTÓN NUEVO: VER HISTORIAL DE BITÁCORA */}
                <button 
                  onClick={() => setShowHistorialModal(true)}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-xs flex items-center gap-2 text-sm"
                >
                  📜 Ver historial de bitácora ({bitacoraList.length})
                </button>
              </div>

              {/* Vista previa de última actividad */}
              {bitacoraList.length > 0 && (
                <div 
                  onClick={() => setShowHistorialModal(true)}
                  className="cursor-pointer text-xs text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-xs flex items-center gap-2 hover:border-blue-300 transition-all"
                >
                  <span className="font-bold text-blue-600">Última actividad:</span>
                  <span className="truncate max-w-xs font-medium">[{bitacoraList[0].tiendaLinea}] {bitacoraList[0].descripcion}</span>
                </div>
              )}
            </div>

            {/* FILTROS POR PRODUCTOS (Pills táctiles) */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Filtro por Producto:</span>
              <div className="flex flex-wrap gap-1.5">
                {productosUnicos.map((prod) => (
                  <button
                    key={prod}
                    onClick={() => setSelectedProducto(prod)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedProducto === prod
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {prod}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabla Principal de Tiendas */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800 text-base">
                  Tiendas y Presupuestos {searchTerm && <span className="text-sm font-normal text-gray-500">({tiendasFiltradas.length} encontradas)</span>}
                </h2>
                <span className="text-xs text-gray-500 font-medium">Haz clic en 📋 en la cabecera para copiar esa columna</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100/70 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="px-4 py-3 font-semibold">Fecha</th>
                      
                      <th className="px-4 py-3 font-semibold">
                        <div className="flex items-center gap-1">
                          <span>Teléfono</span>
                          <button 
                            onClick={() => copyToClipboard('numero')} 
                            title="Copiar solo columna Teléfonos"
                            className="text-gray-400 hover:text-blue-600 text-xs p-0.5 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        <div className="flex items-center gap-1">
                          <span>Línea / Tienda</span>
                          <button 
                            onClick={() => copyToClipboard('linea')} 
                            title="Copiar solo columna Tiendas"
                            className="text-gray-400 hover:text-blue-600 text-xs p-0.5 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        <div className="flex items-center gap-1">
                          <span>Producto</span>
                          <button 
                            onClick={() => copyToClipboard('producto')} 
                            title="Copiar solo columna Productos"
                            className="text-gray-400 hover:text-blue-600 text-xs p-0.5 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </th>

                      <th className="px-4 py-3 font-semibold">Trafi</th>

                      <th className="px-4 py-3 font-semibold text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span>Presupuesto</span>
                          <button 
                            onClick={() => copyToClipboard('presupuesto')} 
                            title="Copiar solo columna Presupuestos"
                            className="text-gray-400 hover:text-blue-600 text-xs p-0.5 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </th>
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
                          No se encontraron tiendas para los criterios seleccionados.
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
            
            {/* Tabla de revisión */}
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

      {/* MODAL REGISTRAR ACTIVIDAD */}
      {showBitacoraModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">📝 Registrar en Bitácora</h3>
              <button 
                onClick={() => setShowBitacoraModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGuardarActividad} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Tienda / Línea (Opcional)
                </label>
                <select
                  value={selectedTiendaBitacora}
                  onChange={(e) => setSelectedTiendaBitacora(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                >
                  <option value="">-- Seleccionar tienda --</option>
                  {tiendas.map((t) => (
                    <option key={t.id} value={t.linea}>
                      {t.linea} ({t.numero})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  ¿Qué hiciste?
                </label>
                <textarea
                  required
                  rows={3}
                  value={actividadTexto}
                  onChange={(e) => setActividadTexto(e.target.value)}
                  placeholder="Ej: Se cambió creativo de campaña / Se ajustó presupuesto..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBitacoraModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-xs"
                >
                  Guardar actividad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HISTORIAL DE BITÁCORA (NUEVO) */}
      {showHistorialModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h3 className="text-lg font-bold text-gray-900">Historial de Bitácora</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {bitacoraList.length} registros
                </span>
              </div>
              <button 
                onClick={() => setShowHistorialModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Lista de Registros */}
            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {bitacoraList.length > 0 ? (
                bitacoraList.map((act) => (
                  <div key={act.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-xs transition-all space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                        {act.tiendaLinea}
                      </span>
                      <span className="text-gray-400 font-medium">{act.fecha}</span>
                    </div>
                    <p className="text-sm text-gray-800 font-medium pt-1">
                      {act.descripcion}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Aún no hay actividades registradas en la bitácora.
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowHistorialModal(false);
                  setShowBitacoraModal(true);
                }}
                className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                + Registrar nueva actividad
              </button>

              <button
                onClick={() => setShowHistorialModal(false)}
                className="px-5 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
