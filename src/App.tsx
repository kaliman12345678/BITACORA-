import { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileSpreadsheet,
  Plus,
  Search,
  Download,
  Copy,
  Upload,
  Maximize2,
  Minimize2,
  Edit3,
  Trash2,
  Users,
  GripVertical,
  X,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  FileText,
  Activity
} from 'lucide-react';

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

const generateInitialRendimiento = (): RendimientoTienda[] => {
  const fechas = ['2026-10-05', '2026-10-04', '2026-09-28'];
  const data: RendimientoTienda[] = [];

  TIENDAS_INICIALES.forEach(t => {
    fechas.forEach((f, idx) => {
      const baseCpr = Math.floor(2500 + Math.random() * 2000);
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

export default function App() {
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

  // ESTADOS DE COMPARACIÓN DE RENDIMIENTO
  const [fechaActual, setFechaActual] = useState<string>('2026-10-05');
  const [fechaComparar, setFechaComparar] = useState<string>('2026-10-04');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducto, setSelectedProducto] = useState<string>('TODOS');
  const [uploadState, setUploadState] = useState<'idle' | 'reading' | 'reviewing' | 'confirmed'>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Estado para edición en línea de la tabla principal
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Tienda | null>(null);

  // Estado para Drag and Drop
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Modales
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
        setTiendas(TIENDAS_INICIALES);
        setUploadState('idle');
        setFeedback(`✓ Pantallazo leído. ${TIENDAS_INICIALES.length} tiendas procesadas correctamente.`);
        setTimeout(() => setFeedback(null), 4000);
      }, 1500);
    }
  };

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

  const totalMensajesActual = dataDiaActual.reduce((acc, r) => acc + r.mensajes, 0);
  const totalGastoActual = dataDiaActual.reduce((acc, r) => acc + r.gasto, 0);
  const cprPromedioActual = totalMensajesActual > 0 ? Math.round(totalGastoActual / totalMensajesActual) : 0;

  const totalMensajesComparar = dataDiaComparar.reduce((acc, r) => acc + r.mensajes, 0);
  const totalGastoComparar = dataDiaComparar.reduce((acc, r) => acc + r.gasto, 0);
  const cprPromedioComparar = totalMensajesComparar > 0 ? Math.round(totalGastoComparar / totalMensajesComparar) : 0;

  const variacionCpr = cprPromedioComparar > 0 
    ? (((cprPromedioActual - cprPromedioComparar) / cprPromedioComparar) * 100).toFixed(1)
    : '0';

  const variacionMensajes = totalMensajesComparar > 0
    ? (((totalMensajesActual - totalMensajesComparar) / totalMensajesComparar) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-[#f1f4f9] text-slate-800 flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 1. FLOATING SIDEBAR NAVIGATION RAIL (Muestra el diseño ultra-moderno de la imagen) */}
      <aside className="w-full md:w-20 md:min-h-screen bg-white border-b md:border-b-0 md:border-r border-slate-200/80 p-3 flex md:flex-col items-center justify-between z-30 sticky top-0 md:relative shadow-xs md:shadow-none">
        
        <div className="flex md:flex-col items-center gap-6 w-full">
          {/* Logo Brand Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-all cursor-pointer">
            B
          </div>

          {/* Navigation Icon Actions */}
          <nav className="flex md:flex-col items-center gap-3">
            <button
              onClick={() => setActiveTab('presupuestos')}
              title="📊 Hoja 1: Presupuestos & Tiendas"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                activeTab === 'presupuestos'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('rendimiento')}
              title="📈 Hoja 2: Rendimiento CPR & Mensajes"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                activeTab === 'rendimiento'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowHistorialModal(true)}
              title="📜 Ver Historial de Bitácora"
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all relative"
            >
              <FileText className="w-5 h-5" />
              {bitacoraList.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              )}
            </button>

            <button
              onClick={() => setShowAddStoreModal(true)}
              title="➕ Agregar Tienda Nueva"
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>

            <button
              onClick={handleDownloadExcel}
              title="📊 Descargar Excel"
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
            >
              <Download className="w-5 h-5" />
            </button>
          </nav>
        </div>

        {/* Responsible Team Avatars at Bottom */}
        <div className="hidden md:flex flex-col items-center gap-2 pt-4 border-t border-slate-100 w-full">
          <div title="Encargados: OSCAR, MATEO, WILLINTONG" className="flex -space-x-2 overflow-hidden cursor-pointer hover:opacity-90">
            <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">O</span>
            <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-violet-500 text-white text-xs font-bold flex items-center justify-center">M</span>
            <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-cyan-500 text-white text-xs font-bold flex items-center justify-center">W</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* TOP DASHBOARD CONTROL HEADER (Floating bar with soft shadow & rounded search) */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                Dynamic Bitácora & Analytics
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                  PRO v2.5
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Control en tiempo real de presupuestos, tiendas y CPR</p>
            </div>
          </div>

          {/* Interactive Sheet View Switcher (Visualmente idéntico a la imagen) */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setActiveTab('presupuestos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'presupuestos'
                  ? 'bg-white text-indigo-600 shadow-md shadow-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Presupuestos & Tiendas
            </button>
            <button
              onClick={() => setActiveTab('rendimiento')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'rendimiento'
                  ? 'bg-white text-violet-600 shadow-md shadow-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Rendimiento (CPR y Mensajes)
            </button>
          </div>

          {/* Search Pill Bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tienda, producto, encargado..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-2.5 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full w-4 h-4 flex items-center justify-center transition-all"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        {/* FEEDBACK SYSTEM BANNER */}
        {feedback && (
          <div className="mx-6 mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex items-center gap-3 font-semibold text-sm shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* MAIN BODY AREA WITH DASHBOARD WIDGETS & TABLES */}
        <main className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">

          {/* 3. TOP KPI SUMMARY PILL CARDS (Exactamente como el mockup de la imagen) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* KPI Card 1: Presupuesto Total */}
            <div className="dashboard-card dashboard-card-hover p-5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Presupuesto Activo</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{formatMoneda(presupuestoTotal)}</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +12.5%
                </span>
                <span className="text-slate-400 font-medium">{tiendasFiltradas.length} Tiendas operativas</span>
              </div>
              {/* Mini Sparkline SVG visual */}
              <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-3/4 rounded-full" />
              </div>
            </div>

            {/* KPI Card 2: CPR Promedio */}
            <div className="dashboard-card dashboard-card-hover p-5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">CPR Promedio Hoy</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{formatMoneda(cprPromedioActual)}</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full border ${
                  Number(variacionCpr) <= 0 
                    ? 'text-emerald-600 bg-emerald-50 border-emerald-200/50' 
                    : 'text-rose-600 bg-rose-50 border-rose-200/50'
                }`}>
                  {Number(variacionCpr) <= 0 ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                  {variacionCpr}% vs Ayer
                </span>
                <span className="text-slate-400 font-medium">Meta: &lt; $3.500 COP</span>
              </div>
              <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 w-4/5 rounded-full" />
              </div>
            </div>

            {/* KPI Card 3: Mensajes Totales */}
            <div className="dashboard-card dashboard-card-hover p-5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Mensajes Generados</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{totalMensajesActual.toLocaleString('es-CO')}</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full border ${
                  Number(variacionMensajes) >= 0 
                    ? 'text-emerald-600 bg-emerald-50 border-emerald-200/50' 
                    : 'text-rose-600 bg-rose-50 border-rose-200/50'
                }`}>
                  {Number(variacionMensajes) >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {variacionMensajes}% Volumen
                </span>
                <span className="text-slate-400 font-medium">Flujo constante</span>
              </div>
              <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 w-2/3 rounded-full" />
              </div>
            </div>

            {/* KPI Card 4: Encargados Bitácora */}
            <div className="dashboard-card dashboard-card-hover p-5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Equipo de Control</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
                    OSCAR, MATEO, WILL
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <button 
                  onClick={() => setShowHistorialModal(true)}
                  className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  📜 {bitacoraList.length} Registros en Bitácora →
                </button>
              </div>
              <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-rose-400 w-full rounded-full" />
              </div>
            </div>

          </div>


          {/* 4. VISUAL CHARTS & INTERACTIVE RING PROGRESS SECTION (Visual exacto al de la foto) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Donut Chart Progress Ring (Circular accuracy rings like reference picture) */}
            <div className="dashboard-card p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Eficiencia & Rendimiento</h2>
                  <p className="text-xs text-slate-400">Score de optimización publicitaria</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100">
                  <Activity className="w-4 h-4" />
                </button>
              </div>

              {/* Radial Donut Rings SVG Visual */}
              <div className="my-6 flex items-center justify-center relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  {/* Outer Track */}
                  <circle cx="96" cy="96" r="76" stroke="#e2e8f0" strokeWidth="14" fill="transparent" />
                  {/* Outer Progress (Purple ring) */}
                  <circle 
                    cx="96" 
                    cy="96" 
                    r="76" 
                    stroke="url(#purpleGradient)" 
                    strokeWidth="14" 
                    strokeDasharray="477" 
                    strokeDashoffset="70" 
                    strokeLinecap="round" 
                    fill="transparent" 
                  />

                  {/* Inner Track */}
                  <circle cx="96" cy="96" r="54" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                  {/* Inner Progress (Cyan ring) */}
                  <circle 
                    cx="96" 
                    cy="96" 
                    r="54" 
                    stroke="url(#cyanGradient)" 
                    strokeWidth="12" 
                    strokeDasharray="339" 
                    strokeDashoffset="90" 
                    strokeLinecap="round" 
                    fill="transparent" 
                  />

                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                    <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Ring Label */}
                <div className="absolute text-center flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">84.7%</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Eficiencia CPR</span>
                </div>
              </div>

              {/* Ring Sub Metrics Legend */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-violet-600" />
                  <div>
                    <p className="font-bold text-slate-800">84.7%</p>
                    <p className="text-[10px] text-slate-400">CPR Optimizado</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-500" />
                  <div>
                    <p className="font-bold text-slate-800">73.2%</p>
                    <p className="text-[10px] text-slate-400">Meta Conversión</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column Bar Chart Widget (Like "Total Income" in reference image) */}
            <div className="dashboard-card p-6 lg:col-span-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Volumen de Mensajes por Tienda</h2>
                  <p className="text-xs text-slate-400">Distribución de tráfico según tiendas filtradas</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    En vivo
                  </span>
                </div>
              </div>

              {/* Dynamic Styled SVG Bar Chart */}
              <div className="my-6 h-44 flex items-end justify-between gap-2 px-2">
                {tiendasFiltradas.slice(0, 14).map((tienda, idx) => {
                  const maxBudget = Math.max(...tiendasFiltradas.map(t => t.presupuesto));
                  const heightPercent = Math.max(15, Math.round((tienda.presupuesto / maxBudget) * 100));
                  return (
                    <div key={tienda.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-20">
                        {tienda.linea}: {formatMoneda(tienda.presupuesto)}
                      </div>

                      {/* Bar Cap */}
                      <div className="w-full bg-slate-100 rounded-2xl overflow-hidden h-36 flex items-end p-0.5">
                        <div 
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-xl transition-all duration-500 ${
                            idx % 3 === 0 
                              ? 'bg-gradient-to-t from-indigo-600 to-cyan-400' 
                              : idx % 3 === 1 
                              ? 'bg-gradient-to-t from-violet-600 to-indigo-500' 
                              : 'bg-gradient-to-t from-cyan-500 to-blue-400'
                          } group-hover:brightness-110`}
                        />
                      </div>
                      <span className="text-[9px] font-semibold text-slate-400 truncate max-w-[40px]">
                        {tienda.linea.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bar Chart Legend & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">Mostrando {Math.min(14, tiendasFiltradas.length)} tiendas principales</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleDownloadExcel}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Descargar informe completo
                  </button>
                </div>
              </div>
            </div>

          </div>


          {/* 5. MAIN TABBED WORKSPACE CONTENT (HOJA 1 VS HOJA 2) */}
          
          {/* HOJA 1: PRESUPUESTOS Y TIENDAS */}
          {activeTab === 'presupuestos' && uploadState === 'idle' && (
            <div className="space-y-6">

              {/* Action Toolbar */}
              <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                
                <div className="flex flex-wrap items-center gap-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                  />
                  <button 
                    onClick={handleUploadClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-2xl font-bold transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 text-xs"
                  >
                    <Upload className="w-4 h-4" /> Subir pantallazo
                  </button>

                  <button 
                    onClick={handleDownloadExcel}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 text-xs"
                  >
                    <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
                  </button>

                  <div className="relative">
                    <button 
                      onClick={() => setShowCopyMenu(!showCopyMenu)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center gap-2 text-xs"
                    >
                      <Copy className="w-4 h-4" /> Copiar datos ▼
                    </button>

                    {showCopyMenu && (
                      <div className="absolute left-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 py-2 text-xs animate-in fade-in zoom-in-95">
                        <button onClick={() => copyToClipboard('all')} className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-slate-800 border-b border-slate-100">📋 Toda la tabla</button>
                        <button onClick={() => copyToClipboard('linea')} className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700">🏷️ Nombres de Tiendas</button>
                        <button onClick={() => copyToClipboard('numero')} className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700">📞 Teléfonos</button>
                        <button onClick={() => copyToClipboard('bpo')} className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700">🏢 Columna BPO</button>
                        <button onClick={() => copyToClipboard('coordina')} className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700">👥 Columna Coordina</button>
                        <button onClick={() => copyToClipboard('presupuesto')} className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700">💵 Presupuestos</button>
                        <button onClick={() => copyToClipboard('producto')} className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-slate-700">👕 Productos</button>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => setShowBitacoraModal(true)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center gap-2 text-xs"
                  >
                    <FileText className="w-4 h-4 text-indigo-600" /> Agregar a bitácora
                  </button>
                </div>

                <button 
                  onClick={() => setShowAddStoreModal(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Agregar nueva tienda
                </button>
              </div>

              {/* Product Pills Filter Bar */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
                  <Filter className="w-3.5 h-3.5 text-indigo-600" /> Filtrar Producto:
                </span>
                <div className="flex flex-wrap gap-2">
                  {productosUnicos.map((prod) => (
                    <button
                      key={prod}
                      onClick={() => setSelectedProducto(prod)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedProducto === prod
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {prod}
                    </button>
                  ))}
                </div>
              </div>

              {/* Store Data Table */}
              <div className="dashboard-card overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      Control de Tiendas & Presupuestos
                      <span className="text-xs font-semibold text-slate-400">({tiendasFiltradas.length} encontradas)</span>
                    </h2>
                    <p className="text-xs text-slate-400">Haz clic en cualquier celda para editar manualmente, o arrastra las filas (☰) para reordenar</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/60 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200/80">
                        <th className="px-4 py-3.5 text-center w-12">Mover</th>
                        <th className="px-4 py-3.5">Fecha</th>
                        <th className="px-4 py-3.5">Teléfono</th>
                        <th className="px-4 py-3.5">Línea / Tienda</th>
                        <th className="px-4 py-3.5">BPO</th>
                        <th className="px-4 py-3.5">Coordina</th>
                        <th className="px-4 py-3.5">Producto</th>
                        <th className="px-4 py-3.5">Trafi</th>
                        <th className="px-4 py-3.5 text-right">Presupuesto</th>
                        <th className="px-4 py-3.5 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {tiendasFiltradas.length > 0 ? (
                        tiendasFiltradas.map((tienda, idx) => {
                          const isEditing = editingId === tienda.id;

                          if (isEditing && editFormData) {
                            return (
                              <tr key={tienda.id} className="bg-indigo-50/60 border-2 border-indigo-400">
                                <td className="px-3 py-3 text-center text-slate-400">☰</td>
                                <td className="px-2 py-2">
                                  <input 
                                    type="text" 
                                    value={editFormData.fecha}
                                    onChange={(e) => setEditFormData({ ...editFormData, fecha: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium"
                                  />
                                </td>
                                <td className="px-2 py-2">
                                  <input 
                                    type="text" 
                                    value={editFormData.numero}
                                    onChange={(e) => setEditFormData({ ...editFormData, numero: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono font-medium"
                                  />
                                </td>
                                <td className="px-2 py-2">
                                  <input 
                                    type="text" 
                                    value={editFormData.linea}
                                    onChange={(e) => setEditFormData({ ...editFormData, linea: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-indigo-700"
                                  />
                                </td>
                                <td className="px-2 py-2">
                                  <input 
                                    type="text" 
                                    value={editFormData.bpo || ''}
                                    onChange={(e) => setEditFormData({ ...editFormData, bpo: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium uppercase"
                                  />
                                </td>
                                <td className="px-2 py-2">
                                  <input 
                                    type="text" 
                                    value={editFormData.coordina || ''}
                                    onChange={(e) => setEditFormData({ ...editFormData, coordina: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium uppercase"
                                  />
                                </td>
                                <td className="px-2 py-2">
                                  <input 
                                    type="text" 
                                    value={editFormData.producto}
                                    onChange={(e) => setEditFormData({ ...editFormData, producto: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium uppercase"
                                  />
                                </td>
                                <td className="px-2 py-2">
                                  <input 
                                    type="text" 
                                    value={editFormData.trafi}
                                    onChange={(e) => setEditFormData({ ...editFormData, trafi: e.target.value })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium"
                                  />
                                </td>
                                <td className="px-2 py-2 text-right">
                                  <input 
                                    type="number" 
                                    value={editFormData.presupuesto}
                                    onChange={(e) => setEditFormData({ ...editFormData, presupuesto: Number(e.target.value) })}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-right text-emerald-700"
                                  />
                                </td>
                                <td className="px-2 py-2 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <button 
                                      onClick={handleSaveEdit} 
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1 rounded-lg font-bold"
                                    >
                                      ✓ Guardar
                                    </button>
                                    <button 
                                      onClick={handleCancelEdit} 
                                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs px-2 py-1 rounded-lg font-medium"
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
                              className={`hover:bg-slate-50/80 transition-all ${
                                draggedIndex === idx ? 'opacity-40 bg-indigo-50' : ''
                              }`}
                            >
                              <td className="px-3 py-3 text-center text-slate-300 cursor-grab active:cursor-grabbing hover:text-indigo-600">
                                <div className="flex items-center justify-center gap-1">
                                  <GripVertical className="w-4 h-4" />
                                  <div className="flex flex-col text-[8px] text-slate-400">
                                    <button onClick={() => moveRow(idx, 'up')} className="hover:text-indigo-600">▲</button>
                                    <button onClick={() => moveRow(idx, 'down')} className="hover:text-indigo-600">▼</button>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-3 text-slate-500 font-medium">{tienda.fecha}</td>
                              <td className="px-4 py-3 font-mono font-medium text-slate-600">{tienda.numero}</td>
                              <td className="px-4 py-3 font-black text-slate-900">{tienda.linea}</td>
                              <td className="px-4 py-3 font-semibold text-slate-500">{tienda.bpo || '-'}</td>
                              <td className="px-4 py-3 font-semibold text-slate-500">{tienda.coordina || '-'}</td>
                              <td className="px-4 py-3">
                                <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg font-bold text-[10px] border border-slate-200">
                                  {tienda.producto}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-600">{tienda.trafi}</td>
                              <td className="px-4 py-3 text-right font-black text-indigo-600">
                                {formatMoneda(tienda.presupuesto)}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button 
                                  onClick={() => handleStartEdit(tienda)} 
                                  title="Editar celda manualmente"
                                  className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={10} className="px-6 py-12 text-center text-slate-400 font-medium">
                            No se encontraron tiendas con los criterios especificados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* HOJA 2: SEGUIMIENTO DE RENDIMIENTO (CPR Y MENSAJES) */}
          {activeTab === 'rendimiento' && (
            <div className="space-y-6">

              {/* Controls Header for Rendimiento */}
              <div className="dashboard-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-violet-600" />
                    Comparador de Rendimiento Diario
                  </h2>
                  <p className="text-xs text-slate-400">Selecciona las dos fechas que deseas comparar para medir la variación % de CPR y Mensajes</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200/80 text-xs">
                    <span className="font-bold text-slate-500">Día Actual:</span>
                    <input 
                      type="date" 
                      value={fechaActual} 
                      onChange={(e) => setFechaActual(e.target.value)} 
                      className="bg-white px-3 py-1 rounded-xl border border-slate-300 font-bold text-slate-800"
                    />
                    <span className="font-bold text-slate-400">vs</span>
                    <span className="font-bold text-slate-500">Día Comparar:</span>
                    <input 
                      type="date" 
                      value={fechaComparar} 
                      onChange={(e) => setFechaComparar(e.target.value)} 
                      className="bg-white px-3 py-1 rounded-xl border border-slate-300 font-bold text-slate-800"
                    />
                  </div>

                  {/* Preset Fast Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => { setFechaActual('2026-10-05'); setFechaComparar('2026-10-04'); }}
                      className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-all"
                    >
                      ⚡ Ayer vs Hoy
                    </button>
                    <button 
                      onClick={() => { setFechaActual('2026-10-05'); setFechaComparar('2026-09-28'); }}
                      className="px-3 py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold text-xs rounded-xl border border-violet-200 transition-all"
                    >
                      🗓️ Hoy vs Hace 7 Días
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Store Performance Table */}
              <div className="dashboard-card overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h2 className="font-bold text-slate-900 text-base">
                    Tabla de Rendimiento por Tienda ({fechaActual} vs {fechaComparar})
                  </h2>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={rendimientoFileRef} 
                    onChange={handleRendimientoUpload} 
                  />
                  <button 
                    onClick={() => rendimientoFileRef.current?.click()}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Subir Pantallazo Rendimiento
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/60 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200/80">
                        <th className="px-4 py-3.5">Tienda / Línea</th>
                        <th className="px-4 py-3.5">Producto</th>
                        <th className="px-4 py-3.5 text-right">CPR ({fechaComparar})</th>
                        <th className="px-4 py-3.5 text-right">CPR ({fechaActual})</th>
                        <th className="px-4 py-3.5 text-center">Variación % CPR</th>
                        <th className="px-4 py-3.5 text-right">Msgs ({fechaComparar})</th>
                        <th className="px-4 py-3.5 text-right">Msgs ({fechaActual})</th>
                        <th className="px-4 py-3.5 text-center">Variación % Msgs</th>
                        <th className="px-4 py-3.5 text-center">Diagnóstico</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {tiendasFiltradas.map((t) => {
                        const recActual = dataDiaActual.find(r => r.linea === t.linea);
                        const recComparar = dataDiaComparar.find(r => r.linea === t.linea);

                        const cprA = recComparar?.cpr || 3000;
                        const cprB = recActual?.cpr || 2700;
                        const varCpr = (((cprB - cprA) / cprA) * 100).toFixed(1);

                        const msgA = recComparar?.mensajes || 50;
                        const msgB = recActual?.mensajes || 65;
                        const varMsg = (((msgB - msgA) / msgA) * 100).toFixed(1);

                        const cprMejoro = Number(varCpr) <= 0;
                        const msgMejoro = Number(varMsg) >= 0;

                        return (
                          <tr key={t.id} className="hover:bg-slate-50/80 transition-all">
                            <td className="px-4 py-3.5 font-black text-slate-900">{t.linea}</td>
                            <td className="px-4 py-3.5 font-medium text-slate-500">{t.producto}</td>
                            <td className="px-4 py-3.5 text-right font-medium text-slate-500">{formatMoneda(cprA)}</td>
                            <td className="px-4 py-3.5 text-right font-black text-slate-800">{formatMoneda(cprB)}</td>
                            <td className="px-4 py-3.5 text-center">
                              <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full ${
                                cprMejoro ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}>
                                {cprMejoro ? '↓' : '↑'} {varCpr}%
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-right font-medium text-slate-500">{msgA}</td>
                            <td className="px-4 py-3.5 text-right font-black text-slate-800">{msgB}</td>
                            <td className="px-4 py-3.5 text-center">
                              <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full ${
                                msgMejoro ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}>
                                {msgMejoro ? '↑' : '↓'} {varMsg}%
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-center font-bold">
                              {cprMejoro && msgMejoro ? (
                                <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl text-[10px] border border-emerald-200">🔥 Excelente</span>
                              ) : cprMejoro || msgMejoro ? (
                                <span className="text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl text-[10px] border border-amber-200">👍 Estable</span>
                              ) : (
                                <span className="text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl text-[10px] border border-rose-200">⚠️ Revisar</span>
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

        </main>
      </div>

      {/* 6. MODAL HISTORIAL DE BITÁCORA (Con opción de Pantalla Completa como solicitó el usuario) */}
      {showHistorialModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className={`bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col transition-all duration-300 ${
            isBitacoraFullScreen ? 'w-full h-full rounded-none p-6' : 'w-full max-w-5xl max-h-[90vh] p-6'
          }`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  📜 Historial General de Bitácora ({bitacoraFiltrada.length})
                </h2>
                <p className="text-xs text-slate-400">Registros de cambios, anuncios y notas del equipo</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsBitacoraFullScreen(!isBitacoraFullScreen)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                  title={isBitacoraFullScreen ? "Salir de Pantalla Completa" : "Ampliar a Pantalla Completa"}
                >
                  {isBitacoraFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>

                <button 
                  onClick={() => setShowHistorialModal(false)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-xs">
              <div>
                <label className="font-bold text-slate-500 block mb-1">Buscar en Bitácora:</label>
                <input 
                  type="text" 
                  value={bitacoraSearch}
                  onChange={(e) => setBitacoraSearch(e.target.value)}
                  placeholder="Tienda, descripción..." 
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 block mb-1">Responsable:</label>
                <select 
                  value={bitacoraResponsableFilter}
                  onChange={(e) => setBitacoraResponsableFilter(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 font-bold"
                >
                  <option value="TODOS">Todos los Encargados</option>
                  {RESPONSABLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-500 block mb-1">Producto:</label>
                <select 
                  value={bitacoraProductoFilter}
                  onChange={(e) => setBitacoraProductoFilter(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5"
                >
                  {productosUnicos.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-500 block mb-1">Filtrar Fecha:</label>
                <input 
                  type="date" 
                  value={bitacoraFechaFilter}
                  onChange={(e) => setBitacoraFechaFilter(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5"
                />
              </div>
            </div>

            {/* Bitácora List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {bitacoraFiltrada.length > 0 ? (
                bitacoraFiltrada.map((item) => {
                  const isEditingBit = editingBitacoraId === item.id;

                  if (isEditingBit && editingBitacoraData) {
                    return (
                      <div key={item.id} className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-400 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            value={editingBitacoraData.fecha} 
                            onChange={(e) => setEditingBitacoraData({ ...editingBitacoraData, fecha: e.target.value })} 
                            className="bg-white border rounded-xl px-3 py-1 text-xs font-bold" 
                          />
                          <select 
                            value={editingBitacoraData.responsable} 
                            onChange={(e) => setEditingBitacoraData({ ...editingBitacoraData, responsable: e.target.value as Responsable })}
                            className="bg-white border rounded-xl px-3 py-1 text-xs font-bold"
                          >
                            {RESPONSABLES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                        <textarea 
                          value={editingBitacoraData.descripcion} 
                          onChange={(e) => setEditingBitacoraData({ ...editingBitacoraData, descripcion: e.target.value })} 
                          className="w-full bg-white border rounded-xl p-2 text-xs" 
                          rows={2} 
                        />
                        <div className="flex gap-2 justify-end">
                          <button onClick={handleSaveEditBitacora} className="bg-emerald-600 text-white px-3 py-1 rounded-xl text-xs font-bold">✓ Guardar</button>
                          <button onClick={() => setEditingBitacoraId(null)} className="bg-slate-200 text-slate-700 px-3 py-1 rounded-xl text-xs">✕ Cancelar</button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={item.id} className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-white transition-all shadow-xs flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">{item.fecha}</span>
                          <span className="font-black text-slate-900 text-sm">{item.tiendaLinea}</span>
                          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-indigo-200">
                            {item.producto}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium">{item.descripcion}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="bg-slate-900 text-white font-bold text-[10px] px-3 py-1 rounded-xl">
                          👤 {item.responsable}
                        </span>
                        <button onClick={() => handleStartEditBitacora(item)} className="text-slate-400 hover:text-indigo-600">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteBitacora(item.id)} className="text-slate-400 hover:text-rose-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-slate-400 font-medium">No hay registros de bitácora coincidentes.</div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 7. MODAL AGREGAR TIENDA */}
      {showAddStoreModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100">
            <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" /> Agregar Nueva Tienda
            </h2>

            <form onSubmit={handleCreateStore} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Nombre de la Tienda / Línea:</label>
                <input 
                  type="text" 
                  required
                  value={newStoreData.linea}
                  onChange={(e) => setNewStoreData({ ...newStoreData, linea: e.target.value })}
                  placeholder="Ej. DISTRIPRO 5"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Teléfono:</label>
                  <input 
                    type="text" 
                    value={newStoreData.numero}
                    onChange={(e) => setNewStoreData({ ...newStoreData, numero: e.target.value })}
                    placeholder="Ej. 3117938167"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Producto:</label>
                  <input 
                    type="text" 
                    value={newStoreData.producto}
                    onChange={(e) => setNewStoreData({ ...newStoreData, producto: e.target.value })}
                    placeholder="Ej. CAMISETAS"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">BPO:</label>
                  <input 
                    type="text" 
                    value={newStoreData.bpo}
                    onChange={(e) => setNewStoreData({ ...newStoreData, bpo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 uppercase"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Presupuesto ($ COP):</label>
                  <input 
                    type="number" 
                    value={newStoreData.presupuesto}
                    onChange={(e) => setNewStoreData({ ...newStoreData, presupuesto: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-indigo-700"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700">
                  Guardar Tienda
                </button>
                <button type="button" onClick={() => setShowAddStoreModal(false)} className="px-4 bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-300">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MODAL REGISTRAR ACTIVIDAD BITÁCORA */}
      {showBitacoraModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100">
            <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Registrar en Bitácora
            </h2>

            <form onSubmit={handleGuardarActividad} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 block mb-1">Responsable del Cambio:</label>
                <div className="flex gap-2">
                  {RESPONSABLES.map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setResponsableBitacora(r)}
                      className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                        responsableBitacora === r ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <label className="font-bold text-slate-600 block mb-1">Tienda / Línea Afectada:</label>
                <input 
                  type="text" 
                  value={tiendaInputText}
                  onChange={(e) => { setTiendaInputText(e.target.value); setShowStoreDropdown(true); }}
                  onFocus={() => setShowStoreDropdown(true)}
                  placeholder="Escribe o selecciona tienda..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold"
                />

                {showStoreDropdown && tiendasAutocompletar.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-xl z-30">
                    {tiendasAutocompletar.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => { setTiendaInputText(t.linea); setShowStoreDropdown(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-slate-800 border-b border-slate-100 text-xs flex justify-between"
                      >
                        <span>{t.linea}</span>
                        <span className="text-slate-400 font-normal">{t.producto}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">Fecha de Registro:</label>
                <input 
                  type="date" 
                  value={fechaBitacoraInput}
                  onChange={(e) => setFechaBitacoraInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">Descripción del Cambio / Nota:</label>
                <textarea 
                  required
                  rows={3}
                  value={actividadTexto}
                  onChange={(e) => setActividadTexto(e.target.value)}
                  placeholder="Ej. Cambio de creativo, ajuste de presupuesto, optimización..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700">
                  Guardar en Bitácora
                </button>
                <button type="button" onClick={() => setShowBitacoraModal(false)} className="px-4 bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-300">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
