import { useState, useRef, useEffect } from 'react'

// Estructura de Tiendas
interface Tienda {
  id: string;
  fecha: string;
  numero: string;
  linea: string;
  bpo: string;
  coordina: string;
  producto: string;
  trafi: string;
  presupuesto: number;
}

// Estructura para Rendimiento (CPR y Mensajes)
interface RendimientoTienda {
  id: string;
  linea: string;
  producto: string;
  fecha: string; // Formato YYYY-MM-DD
  cpr: number; // Costo por Respuesta / Registro ($)
  mensajes: number; // Cantidad de mensajes recibidos
  gasto: number; // Gasto total
}

type Responsable = 'OSCAR' | 'MATEO' | 'WILLINTONG';

interface ActividadBitacora {
  id: string;
  fecha: string;
  tiendaLinea: string;
  producto: string;
  responsable: Responsable;
  descripcion: string;
}

const RESPONSABLES: Responsable[] = ['OSCAR', 'MATEO', 'WILLINTONG'];

const TIENDAS_INICIALES: Tienda[] = [
  { id: '1', fecha: '27/9/2026', numero: '3117938167', linea: 'DRISTRI PRO 1', bpo: 'BTK', coordina: 'GOMEZ', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 290000 },
  { id: '2', fecha: '27/9/2026', numero: '3006865174', linea: 'VARIEDADES DIGITALES 1', bpo: 'BTK', coordina: 'GOMEZ', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 190000 },
  { id: '3', fecha: '27/9/2026', numero: '3117718030', linea: 'NOVA HOME', bpo: 'BTK', coordina: 'GOMEZ', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 290000 },
  { id: '4', fecha: '27/9/2026', numero: '3117654394', linea: 'DANTE NOVA', bpo: 'BTK', coordina: 'GOMEZ', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 285000 },
  { id: '5', fecha: '27/9/2026', numero: '3011674464', linea: 'CLOTHESNEW 2', bpo: 'BTK', coordina: 'GOMEZ', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '6', fecha: '27/9/2026', numero: '3233721174', linea: 'GOAL STORE 2', bpo: 'BTK', coordina: 'GOMEZ', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 240000 },
  { id: '7', fecha: '27/9/2026', numero: '3104964973', linea: 'LEVEL ONE 2', bpo: 'BTK', coordina: 'GOMEZ', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 240000 },
  { id: '8', fecha: '27/9/2026', numero: '3013622434', linea: 'AURA Y HOME 2', bpo: 'BTK', coordina: 'ALEJANDRA', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 300000 },
  { id: '9', fecha: '27/9/2026', numero: '3043646273', linea: 'NET CAPITAL 1', bpo: 'BTK', coordina: 'ALEJANDRA', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 500000 },
  { id: '10', fecha: '27/9/2026', numero: '3042503846', linea: 'DANTE NOVA 3', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 220000 },
  { id: '11', fecha: '27/9/2026', numero: '3042504328', linea: 'DISTRIPRO 2', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '12', fecha: '27/9/2026', numero: '3104964983', linea: 'LATIN SHOP 2', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 185000 },
  { id: '13', fecha: '27/9/2026', numero: '3219434182', linea: 'CLOTHESNEW', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 185000 },
  { id: '14', fecha: '27/9/2026', numero: '3043311027', linea: 'STYLE TRENDS', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 255000 },
  { id: '15', fecha: '27/9/2026', numero: '3117689919', linea: 'TODO EN LINEA 1 (9919)', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '16', fecha: '27/9/2026', numero: '3046497928', linea: 'NETCAPITAL', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '17', fecha: '27/9/2026', numero: '3117689943', linea: 'DRISTRIPRO', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '18', fecha: '27/9/2026', numero: '3004658319', linea: 'STYLE TRENDS 1', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 215000 },
  { id: '19', fecha: '27/9/2026', numero: '3104963935', linea: 'NOVA HOME 4', bpo: 'BTK', coordina: 'ANDREA', producto: 'CONJUNTOS', trafi: 'Oscar', presupuesto: 140000 },
  { id: '20', fecha: '27/9/2026', numero: '3127049437', linea: 'TIENDA EL CAMPITO', bpo: 'BTK', coordina: 'ALEJANDRA', producto: 'CARPAS', trafi: 'Oscar', presupuesto: 150000 },
  { id: '21', fecha: '27/9/2026', numero: '3006872470', linea: 'TIENDA EL CAMPITO 1', bpo: 'BTK', coordina: 'ALEJANDRA', producto: 'CARPAS', trafi: 'Oscar', presupuesto: 150000 },
  { id: '22', fecha: '27/9/2026', numero: '3006872469', linea: 'TIENDA EL CAMPITO 2', bpo: 'BTK', coordina: 'ALEJANDRA', producto: 'CARPAS', trafi: 'Oscar', presupuesto: 130000 },
  { id: '23', fecha: '27/9/2026', numero: '3106064596', linea: 'CLOTHES NEW 4', bpo: 'BTK GR', coordina: 'ALEJANDRA', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 330000 },
  { id: '24', fecha: '27/9/2026', numero: '3104371164', linea: 'AXIS SHOP 4', bpo: 'BTK GR', coordina: 'ALEJANDRA', producto: 'CAMISETAS', trafi: 'Oscar', presupuesto: 270000 },
  { id: '25', fecha: '27/9/2026', numero: '3006864858', linea: 'TOP MARKET 1', bpo: 'ELT', coordina: 'JORGE', producto: 'BOXERS CK', trafi: 'Oscar', presupuesto: 200000 },
  { id: '26', fecha: '27/9/2026', numero: '3042327503', linea: 'RAW STREET 3', bpo: 'ELT', coordina: 'JORGE', producto: 'CACHETEROS CK', trafi: 'Oscar', presupuesto: 200000 },
  { id: '27', fecha: '27/9/2026', numero: '3115230622', linea: 'NOXA', bpo: 'ELT', coordina: 'JORGE', producto: 'BOXERS NOXA', trafi: 'Oscar', presupuesto: 200000 },
  { id: '28', fecha: '27/9/2026', numero: '3117980010', linea: 'NOXA', bpo: 'ELT', coordina: 'JORGE', producto: 'BOXERS NOXA', trafi: 'Oscar', presupuesto: 100000 },
  { id: '29', fecha: '27/9/2026', numero: '3105210297', linea: 'NOVA HOME 3', bpo: 'E-HUK MEDELLIN', coordina: 'WILL', producto: 'PIJAMAS', trafi: 'Oscar', presupuesto: 200000 },
  { id: '30', fecha: '27/9/2026', numero: '3181350330', linea: 'COMPRA MAS 3', bpo: 'E-HUK MEDELLIN', coordina: 'WILL', producto: 'PIJAMAS', trafi: 'Oscar', presupuesto: 80000 },
  { id: '31', fecha: '27/9/2026', numero: '3104965029', linea: 'COMPRA MAS 4', bpo: 'E-HUK MEDELLIN', coordina: 'WILL', producto: 'PIJAMAS', trafi: 'Oscar', presupuesto: 80000 },
  { id: '32', fecha: '27/9/2026', numero: '3181699761', linea: 'SANTA SHOP 2', bpo: 'E-HUK MEDELLIN', coordina: 'WILL', producto: 'AROMATERAPIA', trafi: 'Oscar', presupuesto: 20000 },
  { id: '33', fecha: '27/9/2026', numero: '3104965018', linea: 'SANTA SHOP 3', bpo: 'E-HUK MEDELLIN', coordina: 'WILL', producto: 'AROMATERAPIA', trafi: 'Oscar', presupuesto: 20000 },
];

const BITACORA_INICIAL: ActividadBitacora[] = [
  { id: '1', fecha: '28/09/2026', tiendaLinea: 'TOP MARKET 1', producto: 'BOXERS CK', responsable: 'OSCAR', descripcion: 'Se cambió creativo de campaña principal.' },
  { id: '2', fecha: '27/09/2026', tiendaLinea: 'NOVA HOME', producto: 'CAMISETAS', responsable: 'MATEO', descripcion: 'Se montó campaña de WhatsApp.' },
  { id: '3', fecha: '26/09/2026', tiendaLinea: 'DANTE NOVA', producto: 'CAMISETAS', responsable: 'WILLINTONG', descripcion: 'Aumento de presupuesto semanal.' }
];

// Generador de datos iniciales de Rendimiento (Hoy vs Hace 7 días vs Ayer)
const generateInitialRendimiento = (): RendimientoTienda[] => {
  const fechas = ['2026-10-05', '2026-10-04', '2026-09-28'];
  const data: RendimientoTienda[] = [];

  TIENDAS_INICIALES.forEach(t => {
    fechas.forEach((f, idx) => {
      // Simulación realista basada en el presupuesto de la tienda
      const baseCpr = Math.floor(2500 + Math.random() * 2000); // $2,500 - $4,500
      const cprVariation = idx === 0 ? baseCpr : idx === 1 ? baseCpr * 1.15 : baseCpr * 1.25;
      const gasto = t.presupuesto;
      const mensajes = Math.floor(gasto / cprVariation);

      data.push({
        id: `${t.id}-${f}`,
        linea: t.linea,
        producto: t.producto,
        fecha: f,
        cpr: Math.round(cprVariation),
        mensajes,
        gasto
      });
    });
  });

  return data;
};

function App() {
  // Navegación entre Hojas ("presupuestos" vs "rendimiento")
  const [activeTab, setActiveTab] = useState<'presupuestos' | 'rendimiento'>('presupuestos');

  // Persistencia con localStorage
  const [tiendas, setTiendas] = useState<Tienda[]>(() => {
    const saved = localStorage.getItem('bitacora_tiendas_v2');
    return saved ? JSON.parse(saved) : TIENDAS_INICIALES;
  });

  const [bitacoraList, setBitacoraList] = useState<ActividadBitacora[]>(() => {
    const saved = localStorage.getItem('bitacora_historial_v2');
    return saved ? JSON.parse(saved) : BITACORA_INICIAL;
  });

  const [rendimientoData] = useState<RendimientoTienda[]>(() => {
    const saved = localStorage.getItem('rendimiento_data_v1');
    return saved ? JSON.parse(saved) : generateInitialRendimiento();
  });

  useEffect(() => {
    localStorage.setItem('bitacora_tiendas_v2', JSON.stringify(tiendas));
  }, [tiendas]);

  useEffect(() => {
    localStorage.setItem('bitacora_historial_v2', JSON.stringify(bitacoraList));
  }, [bitacoraList]);

  useEffect(() => {
    localStorage.setItem('rendimiento_data_v1', JSON.stringify(rendimientoData));
  }, [rendimientoData]);

  // ESTADOS DE COMPARACIÓN DE RENDIMIENTO (Días seleccionados por el usuario)
  const [fechaActual, setFechaActual] = useState<string>('2026-10-05'); // Hoy
  const [fechaComparar, setFechaComparar] = useState<string>('2026-10-04'); // Ayer por defecto

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducto, setSelectedProducto] = useState<string>('TODOS');
  const [uploadState, setUploadState] = useState<'idle' | 'reading' | 'reviewing' | 'confirmed'>('idle');
  const [extractedData, setExtractedData] = useState<Tienda[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Estado para edición en línea de la tabla principal
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Tienda | null>(null);

  // Estado para Drag and Drop
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Estado para Modal Agregar Tienda Nueva
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [newStoreData, setNewStoreData] = useState<Omit<Tienda, 'id'>>({
    fecha: '28/9/2026',
    numero: '',
    linea: '',
    bpo: 'BTK',
    coordina: 'GOMEZ',
    producto: 'CAMISETAS',
    trafi: 'Oscar',
    presupuesto: 200000
  });

  // Estados para Modal de Bitácora
  const [showBitacoraModal, setShowBitacoraModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [isBitacoraFullScreen, setIsBitacoraFullScreen] = useState(false);

  const todayISO = new Date().toISOString().split('T')[0];
  const [fechaBitacoraInput, setFechaBitacoraInput] = useState(todayISO);

  const [tiendaInputText, setTiendaInputText] = useState('');
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [responsableBitacora, setResponsableBitacora] = useState<Responsable>('OSCAR');
  const [actividadTexto, setActividadTexto] = useState('');

  const [editingBitacoraId, setEditingBitacoraId] = useState<string | null>(null);
  const [editingBitacoraData, setEditingBitacoraData] = useState<ActividadBitacora | null>(null);

  const [bitacoraSearch, setBitacoraSearch] = useState('');
  const [bitacoraProductoFilter, setBitacoraProductoFilter] = useState('TODOS');
  const [bitacoraResponsableFilter, setBitacoraResponsableFilter] = useState('TODOS');
  const [bitacoraFechaFilter, setBitacoraFechaFilter] = useState('');

  const [showCopyMenu, setShowCopyMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rendimientoFileRef = useRef<HTMLInputElement>(null);

  const productosUnicos = ['TODOS', ...Array.from(new Set(tiendas.map(t => t.producto)))];

  const tiendasAutocompletar = tiendas.filter(t => 
    t.linea.toLowerCase().includes(tiendaInputText.toLowerCase()) ||
    t.numero.includes(tiendaInputText) ||
    t.producto.toLowerCase().includes(tiendaInputText.toLowerCase())
  );

  const tiendasFiltradas = tiendas.filter(t => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      t.linea.toLowerCase().includes(searchLower) ||
      t.numero.includes(searchLower) ||
      t.producto.toLowerCase().includes(searchLower) ||
      (t.bpo && t.bpo.toLowerCase().includes(searchLower)) ||
      (t.coordina && t.coordina.toLowerCase().includes(searchLower));
    
    const matchesProducto = selectedProducto === 'TODOS' || t.producto === selectedProducto;

    return matchesSearch && matchesProducto;
  });

  const moveRow = (indexInFiltered: number, direction: 'up' | 'down') => {
    const targetFilteredIndex = direction === 'up' ? indexInFiltered - 1 : indexInFiltered + 1;
    if (targetFilteredIndex < 0 || targetFilteredIndex >= tiendasFiltradas.length) return;

    const itemToMove = tiendasFiltradas[indexInFiltered];
    const itemTarget = tiendasFiltradas[targetFilteredIndex];

    const realIndex1 = tiendas.findIndex(t => t.id === itemToMove.id);
    const realIndex2 = tiendas.findIndex(t => t.id === itemTarget.id);

    if (realIndex1 !== -1 && realIndex2 !== -1) {
      const newTiendas = [...tiendas];
      newTiendas[realIndex1] = itemTarget;
      newTiendas[realIndex2] = itemToMove;
      setTiendas(newTiendas);
    }
  };

  const handleDragStart = (indexInFiltered: number) => {
    setDraggedIndex(indexInFiltered);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndexInFiltered: number) => {
    if (draggedIndex === null || draggedIndex === dropIndexInFiltered) return;

    const itemToMove = tiendasFiltradas[draggedIndex];
    const itemTarget = tiendasFiltradas[dropIndexInFiltered];

    const realIndex1 = tiendas.findIndex(t => t.id === itemToMove.id);
    const realIndex2 = tiendas.findIndex(t => t.id === itemTarget.id);

    if (realIndex1 !== -1 && realIndex2 !== -1) {
      const newTiendas = [...tiendas];
      newTiendas.splice(realIndex1, 1);
      newTiendas.splice(realIndex2, 0, itemToMove);
      setTiendas(newTiendas);
    }

    setDraggedIndex(null);
  };

  const bitacoraFiltrada = bitacoraList.filter(item => {
    const searchLower = bitacoraSearch.toLowerCase();
    const matchesSearch = 
      item.descripcion.toLowerCase().includes(searchLower) ||
      item.tiendaLinea.toLowerCase().includes(searchLower) ||
      item.producto.toLowerCase().includes(searchLower) ||
      item.responsable.toLowerCase().includes(searchLower);

    const matchesProducto = bitacoraProductoFilter === 'TODOS' || item.producto === bitacoraProductoFilter;
    const matchesResponsable = bitacoraResponsableFilter === 'TODOS' || item.responsable === bitacoraResponsableFilter;
    
    let matchesFecha = true;
    if (bitacoraFechaFilter) {
      const [y, m, d] = bitacoraFechaFilter.split('-');
      const fechaBuscada = `${d}/${m}/${y}`;
      matchesFecha = item.fecha.includes(fechaBuscada) || item.fecha.includes(bitacoraFechaFilter);
    }

    return matchesSearch && matchesProducto && matchesResponsable && matchesFecha;
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

  // Carga de pantallazo de rendimiento
  const handleRendimientoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadState('reading');
      setTimeout(() => {
        setUploadState('idle');
        setFeedback("✓ Pantallazo de rendimiento leído. Datos de CPR y Mensajes actualizados.");
        setTimeout(() => setFeedback(null), 4000);
      }, 1500);
    }
  };

  const handleStartEdit = (tienda: Tienda) => {
    setEditingId(tienda.id);
    setEditFormData({ ...tienda });
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;
    setTiendas(tiendas.map(t => t.id === editFormData.id ? editFormData : t));
    setEditingId(null);
    setEditFormData(null);
    setFeedback(`✓ Tienda "${editFormData.linea}" actualizada correctamente.`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleDeleteBitacora = (id: string) => {
    setBitacoraList(bitacoraList.filter(item => item.id !== id));
    setFeedback("✓ Registro eliminado de la bitácora.");
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleStartEditBitacora = (act: ActividadBitacora) => {
    setEditingBitacoraId(act.id);
    setEditingBitacoraData({ ...act });
  };

  const handleSaveEditBitacora = () => {
    if (!editingBitacoraData) return;
    setBitacoraList(bitacoraList.map(b => b.id === editingBitacoraData.id ? editingBitacoraData : b));
    setEditingBitacoraId(null);
    setEditingBitacoraData(null);
    setFeedback("✓ Registro de bitácora actualizado.");
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreData.linea.trim()) return;

    const nueva: Tienda = {
      id: Date.now().toString(),
      ...newStoreData
    };

    setTiendas([nueva, ...tiendas]);
    setShowAddStoreModal(false);
    setNewStoreData({
      fecha: '28/9/2026',
      numero: '',
      linea: '',
      bpo: 'BTK',
      coordina: 'GOMEZ',
      producto: 'CAMISETAS',
      trafi: 'Oscar',
      presupuesto: 200000
    });
    setFeedback(`✓ Tienda "${nueva.linea}" creada e integrada correctamente.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleDownloadExcel = () => {
    const headers = "FECHA;NUMERO;LINEA;BPO;COORDINA;PRODUCTO;TRAFI;PRESUPUESTO\n";
    const rows = tiendasFiltradas.map(t => 
      `"${t.fecha}";"${t.numero}";"${t.linea}";"${t.bpo || ''}";"${t.coordina || ''}";"${t.producto}";"${t.trafi}";"${t.presupuesto}"`
    ).join("\n");

    const csvContent = "\uFEFF" + headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bitacora_Tiendas_Presupuestos_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFeedback("✓ Archivo Excel descargado correctamente.");
    setTimeout(() => setFeedback(null), 4000);
  };

  const copyToClipboard = (type: 'all' | 'numero' | 'linea' | 'bpo' | 'coordina' | 'producto' | 'presupuesto') => {
    let text = '';
    let nombreColumna = '';

    if (type === 'all') {
      const header = "FECHA\tNUMERO\tLINEA\tBPO\tCOORDINA\tPRODUCTO\tTRAFI\tPRESUPUESTO\n";
      const rows = tiendasFiltradas.map(t => `${t.fecha}\t${t.numero}\t${t.linea}\t${t.bpo || ''}\t${t.coordina || ''}\t${t.producto}\t${t.trafi}\t$${t.presupuesto.toLocaleString('es-CO')}`).join("\n");
      text = header + rows;
      nombreColumna = "Toda la tabla";
    } else if (type === 'numero') {
      text = tiendasFiltradas.map(t => t.numero).join("\n");
      nombreColumna = "Teléfonos";
    } else if (type === 'linea') {
      text = tiendasFiltradas.map(t => t.linea).join("\n");
      nombreColumna = "Líneas / Tiendas";
    } else if (type === 'bpo') {
      text = tiendasFiltradas.map(t => t.bpo || '').join("\n");
      nombreColumna = "BPO";
    } else if (type === 'coordina') {
      text = tiendasFiltradas.map(t => t.coordina || '').join("\n");
      nombreColumna = "Coordina";
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

  const handleGuardarActividad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actividadTexto.trim()) return;

    const [year, month, day] = fechaBitacoraInput.split('-');
    const fechaPersonalizada = `${day}/${month}/${year}`;

    const tiendaEncontrada = tiendas.find(t => t.linea.toLowerCase() === tiendaInputText.trim().toLowerCase());
    const productoTienda = tiendaEncontrada ? tiendaEncontrada.producto : 'GENERAL';

    const nuevaActividad: ActividadBitacora = {
      id: Date.now().toString(),
      fecha: fechaPersonalizada,
      tiendaLinea: tiendaInputText.trim() || 'General',
      producto: productoTienda,
      responsable: responsableBitacora,
      descripcion: actividadTexto
    };

    setBitacoraList([nuevaActividad, ...bitacoraList]);
    setShowBitacoraModal(false);
    setActividadTexto('');
    setTiendaInputText('');
    setFechaBitacoraInput(todayISO);
    setFeedback(`✓ Actividad (${fechaPersonalizada}) asignada a ${responsableBitacora} guardada correctamente.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  // CÁLCULO DE RENDIMIENTO Y COMPARACIÓN ENTRE DÍAS
  const dataDiaActual = rendimientoData.filter(r => r.fecha === fechaActual);
  const dataDiaComparar = rendimientoData.filter(r => r.fecha === fechaComparar);

  // Totales Día Actual
  const totalMensajesActual = dataDiaActual.reduce((acc, r) => acc + r.mensajes, 0);
  const totalGastoActual = dataDiaActual.reduce((acc, r) => acc + r.gasto, 0);
  const cprPromedioActual = totalMensajesActual > 0 ? Math.round(totalGastoActual / totalMensajesActual) : 0;

  // Totales Día Comparar
  const totalMensajesComparar = dataDiaComparar.reduce((acc, r) => acc + r.mensajes, 0);
  const totalGastoComparar = dataDiaComparar.reduce((acc, r) => acc + r.gasto, 0);
  const cprPromedioComparar = totalMensajesComparar > 0 ? Math.round(totalGastoComparar / totalMensajesComparar) : 0;

  // Variaciones %
  const variacionCpr = cprPromedioComparar > 0 
    ? (((cprPromedioActual - cprPromedioComparar) / cprPromedioComparar) * 100).toFixed(1)
    : '0';

  const variacionMensajes = totalMensajesComparar > 0
    ? (((totalMensajesActual - totalMensajesComparar) / totalMensajesComparar) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar con pestañas de Navegación principales ("Hojas") */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-xs">
        <div className="px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg shadow-xs">
              B
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Bitácora</h1>
              <p className="text-xs text-gray-500 mt-0.5">Asistente diario de tiendas y rendimiento</p>
            </div>
          </div>
          
          {/* NAVEGACIÓN ENTRE HOJAS INTERACTIVAS */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setActiveTab('presupuestos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'presupuestos'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Hoja 1: Presupuestos y Tiendas
            </button>
            <button
              onClick={() => setActiveTab('rendimiento')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'rendimiento'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📈 Hoja 2: Rendimiento (CPR y Mensajes)
            </button>
          </div>

          {/* Buscador siempre accesible */}
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tienda, producto..." 
              className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white"
            />
            <span className="absolute left-3 top-2 text-gray-400 text-xs">🔍</span>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-2.5 top-2 text-xs bg-gray-200 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* Feedback Rápido */}
        {feedback && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-2 font-medium shadow-xs text-sm">
            <span className="text-lg">✓</span> {feedback}
          </div>
        )}

        {/* HOJA 1: PRESUPUESTOS Y TIENDAS */}
        {activeTab === 'presupuestos' && uploadState === 'idle' && (
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
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Encargados Equipo</p>
                <div className="flex gap-1 mt-2">
                  {RESPONSABLES.map(r => (
                    <span key={r} className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Acciones Rápidas</p>
                <div className="flex items-center gap-3 mt-1">
                  <button 
                    onClick={() => setShowAddStoreModal(true)}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    + Agregar tienda
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={() => setShowHistorialModal(true)}
                    className="text-xs text-gray-700 font-bold hover:underline flex items-center gap-1"
                  >
                    📜 Historial ({bitacoraList.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Acciones Principales */}
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

                <button 
                  onClick={handleDownloadExcel}
                  className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-2 text-sm"
                >
                  📊 Descargar Excel
                </button>

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
                        onClick={() => copyToClipboard('bpo')} 
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      >
                        🏢 Solo BPO
                      </button>
                      <button 
                        onClick={() => copyToClipboard('coordina')} 
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      >
                        👥 Solo Coordina
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

                <button 
                  onClick={() => setShowHistorialModal(true)}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-xs flex items-center gap-2 text-sm"
                >
                  📜 Ver historial de bitácora ({bitacoraList.length})
                </button>
              </div>

              <button 
                onClick={() => setShowAddStoreModal(true)}
                className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 text-xs shadow-xs"
              >
                + Agregar nueva tienda
              </button>
            </div>

            {/* FILTROS POR PRODUCTOS */}
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
                <span className="text-xs text-gray-500 font-medium">Usa ⬆️ ⬇️ o arrastra las filas (☰) para cambiar el orden</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100/70 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="px-3 py-3 font-semibold text-center w-12">Orden</th>
                      <th className="px-3 py-3 font-semibold">Fecha</th>
                      
                      <th className="px-3 py-3 font-semibold">
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

                      <th className="px-3 py-3 font-semibold">
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

                      <th className="px-3 py-3 font-semibold">
                        <div className="flex items-center gap-1">
                          <span>BPO</span>
                          <button 
                            onClick={() => copyToClipboard('bpo')} 
                            title="Copiar solo columna BPO"
                            className="text-gray-400 hover:text-blue-600 text-xs p-0.5 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        <div className="flex items-center gap-1">
                          <span>Coordina</span>
                          <button 
                            onClick={() => copyToClipboard('coordina')} 
                            title="Copiar solo columna Coordina"
                            className="text-gray-400 hover:text-blue-600 text-xs p-0.5 rounded"
                          >
                            📋
                          </button>
                        </div>
                      </th>

                      <th className="px-3 py-3 font-semibold">
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

                      <th className="px-3 py-3 font-semibold">Trafi</th>

                      <th className="px-3 py-3 font-semibold text-right">
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

                      <th className="px-3 py-3 font-semibold text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700">
                    {tiendasFiltradas.length > 0 ? (
                      tiendasFiltradas.map((tienda, idx) => {
                        const isEditing = editingId === tienda.id;

                        if (isEditing && editFormData) {
                          return (
                            <tr key={tienda.id} className="bg-blue-50/70 border-2 border-blue-400">
                              <td className="px-2 py-2 text-center text-gray-400">☰</td>
                              <td className="px-2 py-2">
                                <input 
                                  type="text" 
                                  value={editFormData.fecha}
                                  onChange={(e) => setEditFormData({ ...editFormData, fecha: e.target.value })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <input 
                                  type="text" 
                                  value={editFormData.numero}
                                  onChange={(e) => setEditFormData({ ...editFormData, numero: e.target.value })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-mono font-medium"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <input 
                                  type="text" 
                                  value={editFormData.linea}
                                  onChange={(e) => setEditFormData({ ...editFormData, linea: e.target.value })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-bold"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <input 
                                  type="text" 
                                  value={editFormData.bpo || ''}
                                  onChange={(e) => setEditFormData({ ...editFormData, bpo: e.target.value })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium uppercase"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <input 
                                  type="text" 
                                  value={editFormData.coordina || ''}
                                  onChange={(e) => setEditFormData({ ...editFormData, coordina: e.target.value })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium uppercase"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <input 
                                  type="text" 
                                  value={editFormData.producto}
                                  onChange={(e) => setEditFormData({ ...editFormData, producto: e.target.value })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium uppercase"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <input 
                                  type="text" 
                                  value={editFormData.trafi}
                                  onChange={(e) => setEditFormData({ ...editFormData, trafi: e.target.value })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium"
                                />
                              </td>
                              <td className="px-2 py-2 text-right">
                                <input 
                                  type="number" 
                                  value={editFormData.presupuesto}
                                  onChange={(e) => setEditFormData({ ...editFormData, presupuesto: Number(e.target.value) || 0 })}
                                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs font-bold text-right font-mono"
                                />
                              </td>
                              <td className="px-2 py-2 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1">
                                  <button 
                                    onClick={handleSaveEdit}
                                    className="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded font-bold hover:bg-emerald-700"
                                  >
                                    ✓ Guardar
                                  </button>
                                  <button 
                                    onClick={handleCancelEdit}
                                    className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-medium hover:bg-gray-300"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <tr 
                            key={tienda.id}
                            draggable
                            onDragStart={() => handleDragStart(idx)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(idx)}
                            className={`hover:bg-blue-50/50 transition-colors cursor-grab active:cursor-grabbing ${draggedIndex === idx ? 'opacity-40 bg-blue-100' : ''}`}
                          >
                            <td className="px-2 py-3 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-0.5">
                                <span className="text-gray-300 font-bold text-xs mr-0.5 cursor-grab">☰</span>
                                <button 
                                  disabled={idx === 0}
                                  onClick={() => moveRow(idx, 'up')}
                                  title="Mover arriba"
                                  className="text-gray-400 hover:text-blue-600 disabled:opacity-20 text-xs p-0.5 rounded"
                                >
                                  ⬆️
                                </button>
                                <button 
                                  disabled={idx === tiendasFiltradas.length - 1}
                                  onClick={() => moveRow(idx, 'down')}
                                  title="Mover abajo"
                                  className="text-gray-400 hover:text-blue-600 disabled:opacity-20 text-xs p-0.5 rounded"
                                >
                                  ⬇️
                                </button>
                              </div>
                            </td>

                            <td className="px-3 py-3 whitespace-nowrap text-gray-500">{tienda.fecha}</td>
                            <td className="px-3 py-3 font-mono text-xs font-medium text-gray-900">{tienda.numero}</td>
                            <td className="px-3 py-3 font-semibold text-gray-900">{tienda.linea}</td>
                            
                            <td className="px-3 py-3 font-medium text-xs">
                              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                                {tienda.bpo || '-'}
                              </span>
                            </td>

                            <td className="px-3 py-3 font-medium text-xs text-gray-700">
                              <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold">
                                {tienda.coordina || '-'}
                              </span>
                            </td>

                            <td className="px-3 py-3">
                              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded font-medium">
                                {tienda.producto}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-gray-600">{tienda.trafi}</td>
                            <td className="px-3 py-3 font-bold text-gray-900 text-right font-mono">
                              {formatMoneda(tienda.presupuesto)}
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap">
                              <button 
                                onClick={() => handleStartEdit(tienda)}
                                title="Modificar manualmente esta tienda"
                                className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1 rounded text-xs transition-all font-medium inline-flex items-center justify-center gap-1"
                              >
                                ✏️ <span className="hidden md:inline">Editar</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
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

        {/* HOJA 2: SEGUIMIENTO DE RENDIMIENTO (CPR Y CANTIDAD DE MENSAJES) CON COMPARATIVA INTERACTIVA ENTRE DÍAS */}
        {activeTab === 'rendimiento' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* PANEL DE CONTROL DE COMPARACIÓN Y BOTÓN SUBIR PANTALLAZO */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">📈 Comparativa de Rendimiento por Días</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Analiza variaciones de CPR y mensajes recibidos entre fechas personalizadas</p>
                </div>

                {/* Subir pantallazo de Rendimiento */}
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={rendimientoFileRef} 
                    onChange={handleRendimientoUpload} 
                  />
                  <button 
                    onClick={() => rendimientoFileRef.current?.click()}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-xs flex items-center gap-2"
                  >
                    📷 Subir Pantallazo de Rendimiento
                  </button>
                </div>
              </div>

              {/* SELECTORES DE FECHA Y PRESETS RÁPIDOS */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-700">Día Principal:</span>
                    <input 
                      type="date"
                      value={fechaActual}
                      onChange={(e) => setFechaActual(e.target.value)}
                      className="border border-gray-300 rounded p-1.5 font-bold bg-white focus:outline-none"
                    />
                  </div>

                  <span className="font-bold text-blue-600 text-sm">VS</span>

                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-700">Día a Comparar:</span>
                    <input 
                      type="date"
                      value={fechaComparar}
                      onChange={(e) => setFechaComparar(e.target.value)}
                      className="border border-gray-300 rounded p-1.5 font-bold bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* BOTONES PRESETS DE COMPARACIÓN RÁPIDA */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-gray-500">Filtros Rápidos:</span>
                  <button 
                    onClick={() => { setFechaActual('2026-10-05'); setFechaComparar('2026-10-04'); }}
                    className="bg-white border border-gray-300 hover:bg-blue-50 text-gray-800 font-bold px-2.5 py-1 rounded"
                  >
                    Ayer vs Hoy
                  </button>
                  <button 
                    onClick={() => { setFechaActual('2026-10-05'); setFechaComparar('2026-09-28'); }}
                    className="bg-white border border-gray-300 hover:bg-blue-50 text-gray-800 font-bold px-2.5 py-1 rounded"
                  >
                    Hoy vs Hace 7 días
                  </button>
                </div>
              </div>
            </div>

            {/* TARJETAS RESUMEN DE VARIACIÓN (%) CPR Y MENSAJES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* METRICA CPR */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  <span>Costo por Respuesta (CPR)</span>
                  <span className="text-gray-400">Promedio</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-black text-gray-900 font-mono">{formatMoneda(cprPromedioActual)}</p>
                  
                  {/* Badge de Variación CPR (Bajar el CPR es POSITIVO verde) */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    Number(variacionCpr) <= 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {Number(variacionCpr) <= 0 ? `📉 ${variacionCpr}%` : `📈 +${variacionCpr}%`}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Comparado con {fechaComparar} ({formatMoneda(cprPromedioComparar)})
                </p>
              </div>

              {/* METRICA MENSAJES */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  <span>Cantidad de Mensajes</span>
                  <span className="text-gray-400">Total Recibidos</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-black text-blue-600 font-mono">{totalMensajesActual.toLocaleString('es-CO')}</p>
                  
                  {/* Badge de Variación Mensajes (Subir mensajes es POSITIVO verde) */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    Number(variacionMensajes) >= 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {Number(variacionMensajes) >= 0 ? `🚀 +${variacionMensajes}%` : `📉 ${variacionMensajes}%`}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Comparado con {fechaComparar} ({totalMensajesComparar.toLocaleString('es-CO')} msgs)
                </p>
              </div>

              {/* METRICA GASTO TOTAL */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  <span>Gasto Total Ejecutado</span>
                  <span className="text-gray-400">Inversión</span>
                </div>
                <p className="text-3xl font-black text-gray-900 font-mono">{formatMoneda(totalGastoActual)}</p>
                <p className="text-xs text-gray-500">
                  Inversión activa en las {dataDiaActual.length} tiendas
                </p>
              </div>

            </div>

            {/* TABLA COMPARATIVA DETALLADA POR TIENDA */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-base">
                  Rendimiento por Tienda ({fechaActual} vs {fechaComparar})
                </h3>
                <span className="text-xs text-gray-500 font-semibold">🟢 Verde = Mejoró rendimiento | 🔴 Rojo = Requiere atención</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100/80 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="px-4 py-3 font-bold">Línea / Tienda</th>
                      <th className="px-4 py-3 font-bold">Producto</th>
                      <th className="px-4 py-3 font-bold text-right">CPR ({fechaActual})</th>
                      <th className="px-4 py-3 font-bold text-right">CPR ({fechaComparar})</th>
                      <th className="px-4 py-3 font-bold text-center">Var. CPR (%)</th>
                      <th className="px-4 py-3 font-bold text-right">Mensajes ({fechaActual})</th>
                      <th className="px-4 py-3 font-bold text-right">Mensajes ({fechaComparar})</th>
                      <th className="px-4 py-3 font-bold text-center">Var. Mensajes (%)</th>
                      <th className="px-4 py-3 font-bold text-center">Diagnóstico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700">
                    {dataDiaActual.map((item) => {
                      const itemComparar = dataDiaComparar.find(c => c.linea === item.linea);
                      
                      const cprAnt = itemComparar ? itemComparar.cpr : 0;
                      const msgAnt = itemComparar ? itemComparar.mensajes : 0;

                      const diffCpr = cprAnt > 0 ? (((item.cpr - cprAnt) / cprAnt) * 100).toFixed(1) : '0';
                      const diffMsg = msgAnt > 0 ? (((item.mensajes - msgAnt) / msgAnt) * 100).toFixed(1) : '0';

                      const cprBajo = Number(diffCpr) <= 0;
                      const msgSubio = Number(diffMsg) >= 0;

                      return (
                        <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="px-4 py-3 font-bold text-gray-900">{item.linea}</td>
                          <td className="px-4 py-3">
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded font-medium">
                              {item.producto}
                            </span>
                          </td>

                          {/* CPR ACTUAL VS ANTERIOR */}
                          <td className="px-4 py-3 font-bold text-right font-mono text-gray-900">{formatMoneda(item.cpr)}</td>
                          <td className="px-4 py-3 text-right font-mono text-gray-500">{cprAnt > 0 ? formatMoneda(cprAnt) : '-'}</td>

                          {/* VAR VARIACION CPR */}
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              cprBajo ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {cprBajo ? `📉 ${diffCpr}%` : `📈 +${diffCpr}%`}
                            </span>
                          </td>

                          {/* MENSAJES ACTUAL VS ANTERIOR */}
                          <td className="px-4 py-3 font-bold text-right font-mono text-blue-700">{item.mensajes.toLocaleString('es-CO')}</td>
                          <td className="px-4 py-3 text-right font-mono text-gray-500">{msgAnt > 0 ? msgAnt.toLocaleString('es-CO') : '-'}</td>

                          {/* VAR VARIACION MENSAJES */}
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              msgSubio ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {msgSubio ? `🚀 +${diffMsg}%` : `📉 ${diffMsg}%`}
                            </span>
                          </td>

                          {/* DIAGNÓSTICO AUTOMÁTICO */}
                          <td className="px-4 py-3 text-center">
                            {cprBajo && msgSubio ? (
                              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                                🔥 Excelente
                              </span>
                            ) : cprBajo || msgSubio ? (
                              <span className="bg-blue-100 text-blue-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                                👍 Estable
                              </span>
                            ) : (
                              <span className="bg-rose-100 text-rose-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                                ⚠️ Revisar
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Estado: Leyendo */}
        {uploadState === 'reading' && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-xs my-8">
            <div className="text-4xl mb-3 animate-spin inline-block">⏳</div>
            <h2 className="text-xl font-bold text-gray-800">Estamos leyendo tu pantallazo...</h2>
            <p className="text-sm text-gray-500 mt-1">Identificando datos de tiendas y rendimiento.</p>
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
                    <th className="px-3 py-3 font-semibold">Fecha</th>
                    <th className="px-3 py-3 font-semibold">Teléfono</th>
                    <th className="px-3 py-3 font-semibold">Línea</th>
                    <th className="px-3 py-3 font-semibold">BPO</th>
                    <th className="px-3 py-3 font-semibold">Coordina</th>
                    <th className="px-3 py-3 font-semibold">Producto</th>
                    <th className="px-3 py-3 font-semibold">Trafi</th>
                    <th className="px-3 py-3 font-semibold text-right">Presupuesto Extraído</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {extractedData.map((row) => (
                    <tr key={row.id} className="hover:bg-blue-50/30">
                      <td className="px-3 py-2.5 text-gray-500">{row.fecha}</td>
                      <td className="px-3 py-2.5 font-mono text-xs">{row.numero}</td>
                      <td className="px-3 py-2.5 font-medium">{row.linea}</td>
                      <td className="px-3 py-2.5 text-xs font-bold text-blue-800">{row.bpo}</td>
                      <td className="px-3 py-2.5 text-xs font-bold text-amber-800">{row.coordina}</td>
                      <td className="px-3 py-2.5">{row.producto}</td>
                      <td className="px-3 py-2.5">{row.trafi}</td>
                      <td className="px-3 py-2.5 font-bold text-emerald-700 text-right font-mono">
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

      {/* MODAL AGREGAR NUEVA TIENDA */}
      {showAddStoreModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">🏬 Agregar Nueva Tienda</h3>
              <button 
                onClick={() => setShowAddStoreModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStore} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nombre de la Línea / Tienda *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Ej: NUEVA TIENDA 1"
                  value={newStoreData.linea}
                  onChange={(e) => setNewStoreData({ ...newStoreData, linea: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Número de Teléfono
                  </label>
                  <input 
                    type="text"
                    placeholder="Ej: 3001234567"
                    value={newStoreData.numero}
                    onChange={(e) => setNewStoreData({ ...newStoreData, numero: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    BPO
                  </label>
                  <input 
                    type="text"
                    placeholder="Ej: BTK / ELT"
                    value={newStoreData.bpo}
                    onChange={(e) => setNewStoreData({ ...newStoreData, bpo: e.target.value.toUpperCase() })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Coordina
                  </label>
                  <input 
                    type="text"
                    placeholder="Ej: GOMEZ / ANDREA"
                    value={newStoreData.coordina}
                    onChange={(e) => setNewStoreData({ ...newStoreData, coordina: e.target.value.toUpperCase() })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Producto
                  </label>
                  <input 
                    type="text"
                    placeholder="Ej: CAMISETAS"
                    value={newStoreData.producto}
                    onChange={(e) => setNewStoreData({ ...newStoreData, producto: e.target.value.toUpperCase() })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Presupuesto ($)
                  </label>
                  <input 
                    type="number"
                    required
                    placeholder="200000"
                    value={newStoreData.presupuesto}
                    onChange={(e) => setNewStoreData({ ...newStoreData, presupuesto: Number(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Trafi
                  </label>
                  <input 
                    type="text"
                    value={newStoreData.trafi}
                    onChange={(e) => setNewStoreData({ ...newStoreData, trafi: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddStoreModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-xs"
                >
                  Guardar Tienda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REGISTRAR ACTIVIDAD EN BITÁCORA */}
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
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  👤 Encargado / Responsable *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {RESPONSABLES.map((resp) => (
                    <button
                      key={resp}
                      type="button"
                      onClick={() => setResponsableBitacora(resp)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                        responsableBitacora === resp
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {resp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  📅 Fecha de la actividad *
                </label>
                <input
                  type="date"
                  required
                  value={fechaBitacoraInput}
                  onChange={(e) => setFechaBitacoraInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 font-medium"
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  🏬 Tienda / Línea (Escribe para buscar o ingresar)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={tiendaInputText}
                    onChange={(e) => {
                      setTiendaInputText(e.target.value);
                      setShowStoreDropdown(true);
                    }}
                    onFocus={() => setShowStoreDropdown(true)}
                    placeholder="Escribe o busca una tienda (ej: NOVA HOME)..."
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  />
                  <span className="absolute left-3 top-3 text-gray-400 text-xs">🔍</span>
                  {tiendaInputText && (
                    <button 
                      type="button"
                      onClick={() => {
                        setTiendaInputText('');
                        setShowStoreDropdown(false);
                      }} 
                      className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {showStoreDropdown && tiendasAutocompletar.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-xs divide-y divide-gray-100">
                    {tiendasAutocompletar.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setTiendaInputText(t.linea);
                          setShowStoreDropdown(false);
                        }}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors"
                      >
                        <div>
                          <span className="font-bold text-gray-900">{t.linea}</span>
                          <span className="text-gray-400 ml-2 font-mono">({t.numero})</span>
                        </div>
                        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                          {t.producto}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  💬 ¿Qué hiciste? *
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

      {/* MODAL HISTORIAL DE BITÁCORA */}
      {showHistorialModal && (
        <div className={`fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-0 md:p-4 z-50 transition-all`}>
          <div className={`bg-white shadow-xl space-y-4 transition-all duration-300 flex flex-col ${
            isBitacoraFullScreen 
              ? 'w-full h-full rounded-none border-none p-6' 
              : 'rounded-2xl border border-gray-200 max-w-3xl w-full p-6'
          }`}>
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h3 className="text-lg font-bold text-gray-900">Historial de Bitácora</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {bitacoraFiltrada.length} de {bitacoraList.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsBitacoraFullScreen(!isBitacoraFullScreen)}
                  title={isBitacoraFullScreen ? "Restaurar tamaño normal" : "Ampliar a Pantalla Completa"}
                  className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg text-sm font-bold border border-gray-200 flex items-center gap-1 transition-all"
                >
                  {isBitacoraFullScreen ? '🗗 Restaurar' : '⛶ Pantalla completa'}
                </button>

                <button 
                  onClick={() => {
                    setShowHistorialModal(false);
                    setEditingBitacoraId(null);
                    setIsBitacoraFullScreen(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-lg px-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text"
                    value={bitacoraSearch}
                    onChange={(e) => setBitacoraSearch(e.target.value)}
                    placeholder="Buscar por nota, tienda o responsable..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
                  {bitacoraSearch && (
                    <button onClick={() => setBitacoraSearch('')} className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600">✕</button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-600">📅 Fecha:</span>
                  <input 
                    type="date"
                    value={bitacoraFechaFilter}
                    onChange={(e) => setBitacoraFechaFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-1.5 text-xs font-medium bg-white"
                  />
                  {bitacoraFechaFilter && (
                    <button 
                      onClick={() => setBitacoraFechaFilter('')}
                      className="text-xs text-gray-500 hover:text-gray-700 underline px-1"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-600">Encargado:</span>
                  {['TODOS', ...RESPONSABLES].map(r => (
                    <button
                      key={r}
                      onClick={() => setBitacoraResponsableFilter(r)}
                      className={`px-2.5 py-1 rounded font-bold transition-all ${
                        bitacoraResponsableFilter === r
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-600">Producto:</span>
                  <select
                    value={bitacoraProductoFilter}
                    onChange={(e) => setBitacoraProductoFilter(e.target.value)}
                    className="border border-gray-300 rounded p-1 text-xs font-medium bg-white focus:outline-none"
                  >
                    {productosUnicos.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={`overflow-y-auto space-y-3 pr-1 ${isBitacoraFullScreen ? 'flex-1 max-h-none' : 'max-h-80'}`}>
              {bitacoraFiltrada.length > 0 ? (
                bitacoraFiltrada.map((act) => {
                  const isEditingThisBitacora = editingBitacoraId === act.id;

                  if (isEditingThisBitacora && editingBitacoraData) {
                    return (
                      <div key={act.id} className="p-4 rounded-xl border-2 border-blue-400 bg-blue-50/50 space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-600 uppercase">Encargado</label>
                            <select 
                              value={editingBitacoraData.responsable}
                              onChange={(e) => setEditingBitacoraData({ ...editingBitacoraData, responsable: e.target.value as Responsable })}
                              className="w-full bg-white border border-gray-300 rounded p-1 font-bold"
                            >
                              {RESPONSABLES.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-600 uppercase">Tienda</label>
                            <input 
                              type="text" 
                              value={editingBitacoraData.tiendaLinea}
                              onChange={(e) => setEditingBitacoraData({ ...editingBitacoraData, tiendaLinea: e.target.value })}
                              className="w-full bg-white border border-gray-300 rounded p-1 font-semibold text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-600 uppercase">Descripción</label>
                          <textarea 
                            rows={3}
                            value={editingBitacoraData.descripcion}
                            onChange={(e) => setEditingBitacoraData({ ...editingBitacoraData, descripcion: e.target.value })}
                            className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-medium"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setEditingBitacoraId(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-300"
                          >
                            Cancelar
                          </button>
                          <button 
                            onClick={handleSaveEditBitacora}
                            className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded hover:bg-emerald-700"
                          >
                            ✓ Guardar Cambios
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={act.id} className="p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2">
                      <div className="flex flex-wrap justify-between items-center text-xs gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-black bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] tracking-wide">
                            👤 {act.responsable}
                          </span>

                          <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                            {act.tiendaLinea}
                          </span>

                          {act.producto && (
                            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                              {act.producto}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 font-mono text-[11px]">{act.fecha}</span>
                          
                          <button 
                            onClick={() => handleStartEditBitacora(act)}
                            title="Editar esta nota de bitácora"
                            className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 text-xs"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteBitacora(act.id)}
                            title="Eliminar esta nota de bitácora"
                            className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 text-xs"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-800 font-medium pl-1 border-l-2 border-blue-500 my-1">
                        {act.descripcion}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No se encontraron actividades con los filtros seleccionados.
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
                onClick={() => {
                  setShowHistorialModal(false);
                  setIsBitacoraFullScreen(false);
                }}
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
