import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  SafeAreaView,
  Share,
} from 'react-native';

const productosIniciales = [
  {
    id: 'PROD-001',
    nombre: 'Audífonos Inalámbricos Pro',
    categoria: 'Tecnología',
    marca: 'NovaAudio',
    precioBase: 85000,
    stock: 10,
    descripcion: 'Audífonos Bluetooth con cancelación de ruido y 20h de batería.',
    variantes: [
      { id: 'VAR-001-N', etiqueta: 'Negro Mate', precioFinal: 85000, stock: 6 },
      { id: 'VAR-001-B', etiqueta: 'Blanco Perla', precioFinal: 90000, stock: 4 },
    ],
  },
  {
    id: 'PROD-002',
    nombre: 'Smartwatch Deportivo',
    categoria: 'Tecnología',
    marca: 'PulseTech',
    precioBase: 145000,
    stock: 5,
    descripcion: 'Reloj inteligente con monitor de ritmo cardíaco y GPS integrado.',
    variantes: [],
  },
  {
    id: 'PROD-003',
    nombre: 'Power Bank 10000mAh',
    categoria: 'Tecnología',
    marca: 'NovaAudio',
    precioBase: 65000,
    stock: 8,
    descripcion: 'Cargador portátil ultradelgado con carga rápida USB-C.',
    variantes: [],
  },
  {
    id: 'PROD-004',
    nombre: 'Mochila Urbana Impermeable',
    categoria: 'Moda',
    marca: 'UrbanoLab',
    precioBase: 120000,
    stock: 9,
    descripcion: 'Mochila ergonómica con compartimento para portátil de 15 pulgadas.',
    variantes: [
      { id: 'VAR-004-15', etiqueta: '15" - Gris Carbón', precioFinal: 120000, stock: 5 },
      { id: 'VAR-004-17', etiqueta: '17" - Negro', precioFinal: 135000, stock: 4 },
    ],
  },
  {
    id: 'PROD-005',
    nombre: 'Chaqueta Cortavientos',
    categoria: 'Moda',
    marca: 'UrbanoLab',
    precioBase: 160000,
    stock: 5,
    descripcion: 'Chaqueta ligera ideal para clima húmedo y frío de sabana.',
    variantes: [
      { id: 'VAR-005-M', etiqueta: 'Talla M - Rojo', precioFinal: 160000, stock: 3 },
      { id: 'VAR-005-L', etiqueta: 'Talla L - Negro', precioFinal: 165000, stock: 2 },
      { id: 'VAR-005-XL', etiqueta: 'Talla XL - Azul', precioFinal: 165000, stock: 0 },
    ],
  },
  {
    id: 'PROD-006',
    nombre: 'Gorra Deportiva Ajustable',
    categoria: 'Moda',
    marca: 'FitSabana',
    precioBase: 45000,
    stock: 15,
    descripcion: 'Gorra transpirable con protección UV para running o diario.',
    variantes: [],
  },
  {
    id: 'PROD-007',
    nombre: 'Lámpara LED Escritorio',
    categoria: 'Hogar',
    marca: 'CasaClara',
    precioBase: 95000,
    stock: 7,
    descripcion: 'Lámpara de mesa táctil con intensidad y temperatura regulable.',
    variantes: [],
  },
  {
    id: 'PROD-008',
    nombre: 'Set Contenedores Herméticos',
    categoria: 'Hogar',
    marca: 'CasaClara',
    precioBase: 75000,
    stock: 12,
    descripcion: 'Juego de 6 recipientes libres de BPA para organizar alimentos.',
    variantes: [],
  },
  {
    id: 'PROD-009',
    nombre: 'Almohada Ergonómica',
    categoria: 'Hogar',
    marca: 'DescansoPlus',
    precioBase: 110000,
    stock: 5,
    descripcion: 'Almohada viscoelástica para soporte cervical óptimo al dormir.',
    variantes: [],
  },
  {
    id: 'PROD-010',
    nombre: 'Mancuernas Ajustables Par',
    categoria: 'Deporte',
    marca: 'FitSabana',
    precioBase: 180000,
    stock: 3,
    descripcion: 'Pesas modulares para entrenamiento funcional en casa.',
    variantes: [],
  },
  {
    id: 'PROD-011',
    nombre: 'Mat de Yoga Antideslizante',
    categoria: 'Deporte',
    marca: 'FitSabana',
    precioBase: 70000,
    stock: 10,
    descripcion: 'Tapete ecológico de 6mm de espesor para yoga y pilates.',
    variantes: [],
  },
  {
    id: 'PROD-012',
    nombre: 'Banda Elástica Resistencia',
    categoria: 'Deporte',
    marca: 'PulseTech',
    precioBase: 35000,
    stock: 0,
    descripcion: 'Kit de bandas con distintos niveles de tensión para tonificar.',
    variantes: [],
  },
  {
    id: 'PROD-013',
    nombre: 'Soporte Aluminio Laptop',
    categoria: 'Accesorios',
    marca: 'NovaAudio',
    precioBase: 55000,
    stock: 6,
    descripcion: 'Base plegable ergonómica para portátil de hasta 17 pulgadas.',
    variantes: [],
  },
];

const direccionesIniciales = [
  {
    id: 'DIR-1',
    alias: 'Casa Mosquera',
    municipio: 'Mosquera',
    descripcion: 'Conjunto Residencial Trebol, Torre 4 Apto 202',
    principal: true,
  },
  {
    id: 'DIR-2',
    alias: 'Oficina Funza',
    municipio: 'Funza',
    descripcion: 'Carrera 9 # 14-20, Local 103',
    principal: false,
  },
];

const pedidosIniciales = [
  {
    id: 'PED-900101',
    fecha: '2026-11-20 10:15',
    items: [
      {
        productoId: 'PROD-002',
        nombre: 'Smartwatch Deportivo',
        varianteId: null,
        varianteEtiqueta: 'Estándar',
        precioUnitario: 145000,
        cantidad: 1,
      },
    ],
    subtotal: 145000,
    costoEnvio: 6000,
    modalidadEnvio: 'estandar',
    plazoEstimado: '1 a 2 días',
    total: 151000,
    estado: 'Confirmado',
    historialEstados: ['Confirmado (2026-11-20 10:15)'],
    reembolsado: false,
    devolucionSolicitada: false,
    direccion: direccionesIniciales[0],
  },
];

const TARIFAS_ENVIO = {
  Mosquera: {
    estandar: { costo: 6000, plazo: '1 a 2 días' },
    expres: { costo: 10000, plazo: '1 a 2 días' },
  },
  Funza: {
    estandar: { costo: 8000, plazo: '1 a 2 días' },
    expres: { costo: 12000, plazo: '1 a 2 días' },
  },
  Madrid: {
    estandar: { costo: 10000, plazo: '1 a 2 días' },
    expres: { costo: 14000, plazo: '1 a 2 días' },
  },
};

const FLUJO_ESTADOS = ['Confirmado', 'Preparando', 'En camino', 'Entregado'];

function getStockProducto(prod) {
  if (prod.variantes && prod.variantes.length > 0) {
    return prod.variantes.reduce((acc, v) => acc + v.stock, 0);
  }
  return prod.stock;
}

function getPrecioReferencia(prod) {
  if (prod.variantes && prod.variantes.length > 0) {
    return Math.min(...prod.variantes.map((v) => v.precioFinal));
  }
  return prod.precioBase;
}

export default function App() {
  const [productos, setProductos] = useState(productosIniciales);
  const [pantalla, setPantalla] = useState('catalogo');
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  const [varianteSeleccionadaId, setVarianteSeleccionadaId] = useState(null);
  const [cantidadSolicitada, setCantidadSolicitada] = useState(1);
  const [errorVariante, setErrorVariante] = useState('');

  // HU33 Opcional: Tema oscuro y accesibilidad
  const [modoOscuro, setModoOscuro] = useState(false);
  const [letraGrande, setLetraGrande] = useState(false);

  // Búsqueda, categorías y filtros combinados (HU23)
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [orden, setOrden] = useState('ninguno');
  const [marcaFiltro, setMarcaFiltro] = useState('Todas');
  const [precioMinTexto, setPrecioMinTexto] = useState('');
  const [precioMaxTexto, setPrecioMaxTexto] = useState('');
  const [rangoAplicado, setRangoAplicado] = useState({ min: null, max: null });
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [errorFiltro, setErrorFiltro] = useState('');

  // Favoritos, Carrito y Comparador (HU22)
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [errorCarrito, setErrorCarrito] = useState('');
  const [comparadorIds, setComparadorIds] = useState([]);
  const [errorComparador, setErrorComparador] = useState('');

  // Direcciones (HU25) y Envío (HU26)
  const [direcciones, setDirecciones] = useState(direccionesIniciales);
  const [direccionSeleccionadaId, setDireccionSeleccionadaId] = useState('DIR-1');
  const [modalidadEnvio, setModalidadEnvio] = useState(null);
  const [errorCheckout, setErrorCheckout] = useState('');

  // Pedidos (HU27), Cancelación (HU28) y Notificaciones (HU29)
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [pedidoDetalleId, setPedidoDetalleId] = useState(null);
  const [pedidoPendienteCancelarId, setPedidoPendienteCancelarId] = useState(null);
  const [errorCancelacionPedido, setErrorCancelacionPedido] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);

  // Preguntas (HU24) y Reposición (HU30)
  const [consultas, setConsultas] = useState([]);
  const [preguntaTexto, setPreguntaTexto] = useState('');
  const [errorPregunta, setErrorPregunta] = useState('');
  const [suscripcionesReposicion, setSuscripcionesReposicion] = useState([]);
  const [avisoReposicion, setAvisoReposicion] = useState('');

  // Ayuda / Tickets (HU32)
  const [tickets, setTickets] = useState([]);
  const [pedidoTicketId, setPedidoTicketId] = useState('');
  const [motivoTicket, setMotivoTicket] = useState('Entrega');
  const [descripcionTicket, setDescripcionTicket] = useState('');
  const [errorTicket, setErrorTicket] = useState('');

  // Compartir alternativo en pantalla (HU35 Opcional)
  const [mensajeCompartido, setMensajeCompartido] = useState('');

  // Formulario libreta de direcciones (HU25)
  const [editandoDirId, setEditandoDirId] = useState(null);
  const [aliasDir, setAliasDir] = useState('');
  const [municipioDir, setMunicipioDir] = useState('Mosquera');
  const [descDir, setDescDir] = useState('');
  const [errorDir, setErrorDir] = useState('');

  const categorias = ['Todas', 'Tecnología', 'Moda', 'Hogar', 'Deporte', 'Accesorios'];
  const marcas = ['Todas', ...Array.from(new Set(productos.map((p) => p.marca)))];

  // Estilos dinámicos para accesibilidad (HU33)
  const fs = (base) => (letraGrande ? base + 3 : base);
  const bgMain = modoOscuro ? '#0f172a' : '#f1f5f9';
  const bgCard = modoOscuro ? '#1e293b' : '#ffffff';
  const borderCol = modoOscuro ? '#334155' : '#e2e8f0';
  const txtPrimary = modoOscuro ? '#f8fafc' : '#0f172a';
  const txtSecondary = modoOscuro ? '#cbd5e1' : '#475569';

  const agregarNotificacion = (tipo, mensaje, referencia) => {
    setNotificaciones((prev) => {
      const existeDuplicado = prev.some(
        (n) => n.tipo === tipo && n.referencia === referencia && n.mensaje === mensaje
      );
      if (existeDuplicado) return prev;
      return [
        {
          id: 'NOTIF-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          tipo,
          mensaje,
          fecha: new Date().toLocaleString(),
          leida: false,
          referencia,
        },
        ...prev,
      ];
    });
  };

  // HU23: Validar y aplicar rango de precio
  const aplicarRangoPrecio = () => {
    setErrorFiltro('');
    const minVal = precioMinTexto.trim() === '' ? null : Number(precioMinTexto);
    const maxVal = precioMaxTexto.trim() === '' ? null : Number(precioMaxTexto);

    if ((minVal !== null && Number.isNaN(minVal)) || (maxVal !== null && Number.isNaN(maxVal))) {
      const msg = 'Ingresa valores numéricos válidos para el rango de precio.';
      setErrorFiltro(msg);
      Alert.alert('Error de validación', msg);
      return;
    }
    if ((minVal !== null && minVal < 0) || (maxVal !== null && maxVal < 0)) {
      const msg = 'Los precios no pueden ser negativos.';
      setErrorFiltro(msg);
      Alert.alert('Rango inválido', msg);
      return;
    }
    if (minVal !== null && maxVal !== null && minVal > maxVal) {
      const msg = 'El precio mínimo no puede ser mayor que el precio máximo.';
      setErrorFiltro(msg);
      Alert.alert('Rango inválido', msg);
      return;
    }
    setRangoAplicado({ min: minVal, max: maxVal });
  };

  // HU23 CA04: Restablecer filtros al estado inicial
  const restablecerFiltros = () => {
    setBusqueda('');
    setCategoriaActiva('Todas');
    setMarcaFiltro('Todas');
    setPrecioMinTexto('');
    setPrecioMaxTexto('');
    setRangoAplicado({ min: null, max: null });
    setSoloDisponibles(false);
    setOrden('ninguno');
    setErrorFiltro('');
  };

  const productosFiltrados = productos
    .filter((p) => {
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCat = categoriaActiva === 'Todas' || p.categoria === categoriaActiva;
      const coincideMarca = marcaFiltro === 'Todas' || p.marca === marcaFiltro;
      const precioRef = getPrecioReferencia(p);
      const coincideMin = rangoAplicado.min === null || precioRef >= rangoAplicado.min;
      const coincideMax = rangoAplicado.max === null || precioRef <= rangoAplicado.max;
      const stockTotal = getStockProducto(p);
      const coincideDisp = !soloDisponibles || stockTotal > 0;
      return (
        coincideNombre &&
        coincideCat &&
        coincideMarca &&
        coincideMin &&
        coincideMax &&
        coincideDisp
      );
    })
    .sort((a, b) => {
      if (orden === 'asc') return getPrecioReferencia(a) - getPrecioReferencia(b);
      if (orden === 'desc') return getPrecioReferencia(b) - getPrecioReferencia(a);
      return 0;
    });

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // HU22: Comparador (2 a 3 productos)
  const toggleComparar = (id) => {
    setErrorComparador('');
    if (comparadorIds.includes(id)) {
      setComparadorIds(comparadorIds.filter((item) => item !== id));
      return;
    }
    if (comparadorIds.length >= 3) {
      const msg =
        'Límite de comparación alcanzado: solo puedes comparar hasta 3 productos a la vez. Retira uno antes de añadir otro.';
      setErrorComparador(msg);
      Alert.alert('Límite de tres', msg);
      return;
    }
    setComparadorIds([...comparadorIds, id]);
  };

  // HU21: Agregar al carrito con variante y validación estricta de stock / máximo permitido
  const agregarAlCarrito = (producto, varianteIdArg = null, cantArg = 1) => {
    setErrorVariante('');
    const tieneVariantes = producto.variantes && producto.variantes.length > 0;
    let varObj = null;

    if (tieneVariantes) {
      const targetVarId = varianteIdArg || varianteSeleccionadaId;
      if (!targetVarId) {
        const msg =
          'Por favor elige una variante (talla, color o presentación) antes de agregar al carrito.';
        setErrorVariante(msg);
        Alert.alert('Selecciona una variante', msg);
        return;
      }
      varObj = producto.variantes.find((v) => v.id === targetVarId);
      if (!varObj) return;
      if (varObj.stock <= 0) {
        const msg = `La variante "${varObj.etiqueta}" no tiene stock disponible (máximo permitido: 0).`;
        setErrorVariante(msg);
        Alert.alert('Variante agotada', msg);
        return;
      }
    } else {
      if (producto.stock <= 0) {
        const msg = `Este producto está agotado (máximo permitido: 0).`;
        setErrorVariante(msg);
        Alert.alert('Producto agotado', msg);
        return;
      }
    }

    const claveItem = varObj ? `${producto.id}__${varObj.id}` : producto.id;
    const precioUnitario = varObj ? varObj.precioFinal : producto.precioBase;
    const stockMax = varObj ? varObj.stock : producto.stock;
    const etiqueta = varObj ? varObj.etiqueta : 'Única';

    const existente = carrito.find((c) => c.clave === claveItem);
    const cantActual = existente ? existente.cantidad : 0;
    const cantSolicitadaNum = Math.max(1, Number(cantArg) || 1);

    if (cantActual + cantSolicitadaNum > stockMax) {
      const msg = `Stock insuficiente para ${etiqueta}: solo hay ${stockMax} unidad(es) disponibles (tienes ${cantActual} en carrito; máximo permitido: ${stockMax}). No se agregaron unidades.`;
      setErrorVariante(msg);
      Alert.alert('Stock insuficiente', msg);
      return;
    }

    if (existente) {
      setCarrito(
        carrito.map((c) =>
          c.clave === claveItem ? { ...c, cantidad: c.cantidad + cantSolicitadaNum } : c
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          clave: claveItem,
          productoId: producto.id,
          nombre: producto.nombre,
          varianteId: varObj ? varObj.id : null,
          varianteEtiqueta: etiqueta,
          precioUnitario,
          cantidad: cantSolicitadaNum,
        },
      ]);
    }
    setErrorVariante('');
    setCantidadSolicitada(1);
    Alert.alert(
      'Agregado',
      `${cantSolicitadaNum} x ${producto.nombre} (${etiqueta}) añadido al carrito.`
    );
  };

  const cambiarCantidadCarrito = (clave, delta) => {
    setErrorCarrito('');
    const item = carrito.find((c) => c.clave === clave);
    if (!item) return;
    const prod = productos.find((p) => p.id === item.productoId);
    if (!prod) return;

    const varObj =
      item.varianteId && prod.variantes
        ? prod.variantes.find((v) => v.id === item.varianteId)
        : null;
    const stockMax = varObj ? varObj.stock : prod.stock;
    const nuevaCant = item.cantidad + delta;

    if (nuevaCant <= 0) {
      setCarrito(carrito.filter((c) => c.clave !== clave));
      return;
    }
    if (nuevaCant > stockMax) {
      const msg = `Stock insuficiente para "${item.nombre} (${item.varianteEtiqueta})": máximo permitido ${stockMax} unidad(es).`;
      setErrorCarrito(msg);
      Alert.alert('Límite de stock', msg);
      return;
    }
    setCarrito(
      carrito.map((c) => (c.clave === clave ? { ...c, cantidad: nuevaCant } : c))
    );
  };

  const eliminarItemCarrito = (clave) => {
    setErrorCarrito('');
    setCarrito(carrito.filter((c) => c.clave !== clave));
  };

  // HU25 y HU26: Cálculo de envío según municipio y modalidad
  const direccionActual = direcciones.find((d) => d.id === direccionSeleccionadaId) || null;
  const tarifaMunicipio =
    direccionActual &&
    modalidadEnvio &&
    TARIFAS_ENVIO[direccionActual.municipio]
      ? TARIFAS_ENVIO[direccionActual.municipio][modalidadEnvio]
      : null;

  const subtotal = carrito.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
  const costoEnvio = carrito.length === 0 ? 0 : tarifaMunicipio ? tarifaMunicipio.costo : 0;
  const total = subtotal + costoEnvio;

  // HU25: Guardar o editar dirección ficticia
  const guardarDireccion = () => {
    setErrorDir('');
    if (!aliasDir.trim() || !municipioDir.trim() || !descDir.trim()) {
      const msg = 'Completa alias, municipio y referencia ficticia de entrega.';
      setErrorDir(msg);
      Alert.alert('Datos incompletos', msg);
      return;
    }
    if (editandoDirId) {
      setDirecciones(
        direcciones.map((d) =>
          d.id === editandoDirId
            ? {
                ...d,
                alias: aliasDir.trim(),
                municipio: municipioDir.trim(),
                descripcion: descDir.trim(),
              }
            : d
        )
      );
      setEditandoDirId(null);
      Alert.alert('Actualizada', 'Dirección actualizada sin duplicar registros.');
    } else {
      const nuevaId = 'DIR-' + Date.now();
      const esPrimera = direcciones.length === 0;
      const nuevaDir = {
        id: nuevaId,
        alias: aliasDir.trim(),
        municipio: municipioDir.trim(),
        descripcion: descDir.trim(),
        principal: esPrimera,
      };
      setDirecciones([...direcciones, nuevaDir]);
      if (esPrimera) setDireccionSeleccionadaId(nuevaId);
      Alert.alert('Guardada', 'Dirección ficticia agregada a la libreta.');
    }
    setAliasDir('');
    setDescDir('');
  };

  const marcarPrincipal = (id) => {
    setDirecciones(direcciones.map((d) => ({ ...d, principal: d.id === id })));
    setDireccionSeleccionadaId(id);
  };

  // HU25 CA04 & HU26 CA04: Validación completa antes de confirmar compra simulada
  const confirmarCompra = () => {
    setErrorCheckout('');
    if (carrito.length === 0) {
      const msg = 'Agrega productos antes de confirmar.';
      setErrorCheckout(msg);
      Alert.alert('Carrito vacío', msg);
      return;
    }

    const faltantes = [];
    if (!direccionActual) faltantes.push('dirección de entrega');
    if (!modalidadEnvio) faltantes.push('modalidad de envío (Estándar o Exprés)');

    if (faltantes.length > 0) {
      const msg = `Completa los datos faltantes antes de finalizar la compra: debes elegir ${faltantes.join(' y ')}.`;
      setErrorCheckout(msg);
      Alert.alert('Datos faltantes', msg);
      return;
    }

    if (!TARIFAS_ENVIO[direccionActual.municipio]) {
      const msg = `El municipio "${direccionActual.municipio}" no tiene tarifa automática (solo Mosquera, Funza o Madrid). Requiere ajuste manual.`;
      setErrorCheckout(msg);
      Alert.alert('Tarifa no disponible', msg);
      return;
    }

    for (const item of carrito) {
      const prod = productos.find((p) => p.id === item.productoId);
      if (!prod) return;
      if (item.varianteId && prod.variantes.length > 0) {
        const v = prod.variantes.find((vr) => vr.id === item.varianteId);
        if (!v || v.stock < item.cantidad) {
          Alert.alert(
            'Stock insuficiente',
            `Sin stock suficiente para ${prod.nombre} (${item.varianteEtiqueta}). Máximo permitido: ${v ? v.stock : 0}.`
          );
          return;
        }
      } else if (prod.stock < item.cantidad) {
        Alert.alert(
          'Stock insuficiente',
          `Sin stock suficiente para ${prod.nombre}. Máximo permitido: ${prod.stock}.`
        );
        return;
      }
    }

    const nuevosProductos = productos.map((prod) => {
      const itemsDelProd = carrito.filter((c) => c.productoId === prod.id);
      if (itemsDelProd.length === 0) return prod;

      if (prod.variantes && prod.variantes.length > 0) {
        const nuevasVariantes = prod.variantes.map((v) => {
          const itemVar = itemsDelProd.find((c) => c.varianteId === v.id);
          if (!itemVar) return v;
          return { ...v, stock: Math.max(0, v.stock - itemVar.cantidad) };
        });
        const stockSumado = nuevasVariantes.reduce((s, v) => s + v.stock, 0);
        return { ...prod, variantes: nuevasVariantes, stock: stockSumado };
      } else {
        const totalCant = itemsDelProd.reduce((s, c) => s + c.cantidad, 0);
        return { ...prod, stock: Math.max(0, prod.stock - totalCant) };
      }
    });

    setProductos(nuevosProductos);

    const codigoPedido = 'PED-' + Math.floor(100000 + Math.random() * 900000);
    const fechaActual = new Date().toLocaleString();
    const nuevoPedido = {
      id: codigoPedido,
      fecha: fechaActual,
      items: carrito.map((c) => ({ ...c })),
      subtotal,
      costoEnvio,
      modalidadEnvio,
      plazoEstimado: tarifaMunicipio.plazo,
      total,
      estado: 'Confirmado',
      historialEstados: [`Confirmado (${fechaActual})`],
      reembolsado: false,
      devolucionSolicitada: false,
      direccion: { ...direccionActual },
    };

    setPedidos([nuevoPedido, ...pedidos]);
    setCarrito([]);
    setErrorCarrito('');
    setErrorCheckout('');
    agregarNotificacion(
      'PEDIDO',
      `Pedido ${codigoPedido} registrado en estado Confirmado.`,
      `${codigoPedido}-Confirmado`
    );
    setPantalla('pedidos');
    Alert.alert(
      'Compra Simulada Confirmada',
      `Código: ${codigoPedido}\nTotal: $${total.toLocaleString()} COP\nSimulación académica sin cobro real.`
    );
  };

  // HU27: Seguimiento secuencial
  const simularAvanceEntrega = (pedidoId) => {
    setErrorCancelacionPedido(null);
    const ped = pedidos.find((p) => p.id === pedidoId);
    if (!ped) return;
    if (ped.estado === 'Entregado' || ped.estado === 'Cancelado') {
      Alert.alert(
        'Transición no permitida',
        `El pedido ya está en estado "${ped.estado}" y no admite más avances.`
      );
      return;
    }
    const idxActual = FLUJO_ESTADOS.indexOf(ped.estado);
    const siguienteEstado = FLUJO_ESTADOS[idxActual + 1];
    if (!siguienteEstado) return;

    const marcaTiempo = new Date().toLocaleString();
    setPedidos(
      pedidos.map((p) =>
        p.id === pedidoId
          ? {
              ...p,
              estado: siguienteEstado,
              historialEstados: [...p.historialEstados, `${siguienteEstado} (${marcaTiempo})`],
            }
          : p
      )
    );
    agregarNotificacion(
      'SEGUIMIENTO',
      `Pedido ${pedidoId} cambió a estado: ${siguienteEstado}.`,
      `${pedidoId}-${siguienteEstado}`
    );
  };

  // HU28: Solicitar y confirmar cancelación con reintegro exacto
  const solicitarCancelacion = (pedidoId) => {
    setErrorCancelacionPedido(null);
    const ped = pedidos.find((p) => p.id === pedidoId);
    if (!ped) return;
    if (ped.estado === 'En camino' || ped.estado === 'Entregado') {
      const razon = `No se puede cancelar el pedido ${pedidoId} porque ya está "${ped.estado}". Solo se permite cancelar antes del despacho (Confirmado o Preparando).`;
      setErrorCancelacionPedido({ pedidoId, mensaje: razon });
      Alert.alert('Cancelación no permitida', razon);
      return;
    }
    if (ped.estado === 'Cancelado' || ped.reembolsado) {
      const razon = `El pedido ${pedidoId} ya fue cancelado y su inventario ya se reintegró.`;
      setErrorCancelacionPedido({ pedidoId, mensaje: razon });
      Alert.alert('Ya cancelado', razon);
      return;
    }
    setPedidoPendienteCancelarId(pedidoId);
  };

  const confirmarCancelacionPedido = (pedidoId) => {
    const ped = pedidos.find((p) => p.id === pedidoId);
    if (!ped || ped.estado === 'Cancelado' || ped.reembolsado) {
      setPedidoPendienteCancelarId(null);
      return;
    }

    const productosRestituidos = productos.map((prod) => {
      const itemsDelProd = ped.items.filter((i) => i.productoId === prod.id);
      if (itemsDelProd.length === 0) return prod;

      if (prod.variantes && prod.variantes.length > 0) {
        const nuevasVariantes = prod.variantes.map((v) => {
          const itemVar = itemsDelProd.find((i) => i.varianteId === v.id);
          if (!itemVar) return v;
          return { ...v, stock: v.stock + itemVar.cantidad };
        });
        return {
          ...prod,
          variantes: nuevasVariantes,
          stock: nuevasVariantes.reduce((s, v) => s + v.stock, 0),
        };
      } else {
        const cantDevuelta = itemsDelProd.reduce((s, i) => s + i.cantidad, 0);
        return { ...prod, stock: prod.stock + cantDevuelta };
      }
    });

    setProductos(productosRestituidos);
    const marcaTiempo = new Date().toLocaleString();
    setPedidos(
      pedidos.map((p) =>
        p.id === pedidoId
          ? {
              ...p,
              estado: 'Cancelado',
              reembolsado: true,
              historialEstados: [...p.historialEstados, `Cancelado (${marcaTiempo})`],
            }
          : p
      )
    );
    setPedidoPendienteCancelarId(null);
    setErrorCancelacionPedido(null);
    agregarNotificacion(
      'CANCELACION',
      `Pedido ${pedidoId} cancelado. Inventario reintegrado al catálogo.`,
      `${pedidoId}-Cancelado`
    );
  };

  // HU34 Opcional: Solicitud de devolución simulada
  const solicitarDevolucion = (pedidoId) => {
    const ped = pedidos.find((p) => p.id === pedidoId);
    if (!ped) return;
    if (ped.estado !== 'Entregado') {
      Alert.alert(
        'Devolución no habilitada',
        'Solo puedes solicitar devolución cuando el pedido esté en estado Entregado.'
      );
      return;
    }
    if (ped.devolucionSolicitada) {
      Alert.alert('Ya registrada', 'Ya existe una solicitud de devolución para este pedido.');
      return;
    }
    const marcaTiempo = new Date().toLocaleString();
    setPedidos(
      pedidos.map((p) =>
        p.id === pedidoId
          ? {
              ...p,
              devolucionSolicitada: true,
              historialEstados: [...p.historialEstados, `Devolución solicitada (${marcaTiempo})`],
            }
          : p
      )
    );
    agregarNotificacion(
      'DEVOLUCION',
      `Solicitud de devolución simulada registrada para ${pedidoId}.`,
      `${pedidoId}-Devolucion`
    );
  };

  // HU24: Preguntas frecuentes del producto
  const enviarPregunta = (productoId) => {
    setErrorPregunta('');
    if (preguntaTexto.trim().length < 10) {
      const msg = 'La pregunta debe tener al menos 10 caracteres.';
      setErrorPregunta(msg);
      Alert.alert('Validación', msg);
      return;
    }
    const nuevaConsulta = {
      id: 'CONS-' + Date.now(),
      productoId,
      pregunta: preguntaTexto.trim(),
      fecha: new Date().toLocaleString(),
      estado: 'Pendiente',
      respuesta: null,
    };
    setConsultas([nuevaConsulta, ...consultas]);
    setPreguntaTexto('');
  };

  const simularRespuestaConsulta = (consultaId) => {
    setConsultas(
      consultas.map((c) =>
        c.id === consultaId
          ? {
              ...c,
              estado: 'Respondida',
              respuesta:
                '[Respuesta automática simulada de demostración]: El artículo cuenta con garantía académica y disponibilidad según el stock mostrado.',
            }
          : c
      )
    );
  };

  // HU30: Avisos de reposición (suscripción única por artículo / variante)
  const toggleSuscripcionReposicion = (productoId, varianteId = null) => {
    const clave = varianteId ? `${productoId}__${varianteId}` : productoId;
    const prod = productos.find((p) => p.id === productoId);
    const varObj =
      varianteId && prod && prod.variantes
        ? prod.variantes.find((v) => v.id === varianteId)
        : null;
    const etiquetaArticulo = varObj
      ? `${prod ? prod.nombre : productoId} (${varObj.etiqueta})`
      : prod
      ? prod.nombre
      : productoId;

    const existe = suscripcionesReposicion.some((s) => s.clave === clave);
    if (existe) {
      setSuscripcionesReposicion((prev) => prev.filter((s) => s.clave !== clave));
      const msg = `Suscripción cancelada para ${etiquetaArticulo}. No se registran duplicados.`;
      setAvisoReposicion(msg);
      Alert.alert('Suscripción cancelada', msg);
    } else {
      setSuscripcionesReposicion((prev) => {
        if (prev.some((s) => s.clave === clave)) return prev;
        return [...prev, { clave, productoId, varianteId }];
      });
      const msg = `Suscripción única registrada para ${etiquetaArticulo}. Te avisaremos cuando haya stock.`;
      setAvisoReposicion(msg);
      Alert.alert('Suscripción única activa', msg);
    }
  };

  const simularReposicion = (productoId, varianteId = null) => {
    const unidadesReponer = 5;
    setProductos(
      productos.map((prod) => {
        if (prod.id !== productoId) return prod;
        if (varianteId && prod.variantes.length > 0) {
          const nuevasVars = prod.variantes.map((v) =>
            v.id === varianteId ? { ...v, stock: v.stock + unidadesReponer } : v
          );
          return {
            ...prod,
            variantes: nuevasVars,
            stock: nuevasVars.reduce((s, v) => s + v.stock, 0),
          };
        }
        return { ...prod, stock: prod.stock + unidadesReponer };
      })
    );

    const clave = varianteId ? `${productoId}__${varianteId}` : productoId;
    const tieneSuscripcionActiva = suscripcionesReposicion.some((s) => s.clave === clave);
    if (tieneSuscripcionActiva) {
      const prod = productos.find((p) => p.id === productoId);
      agregarNotificacion(
        'REPOSICION',
        `[Demostración] Stock repuesto para ${prod ? prod.nombre : productoId} (+${unidadesReponer} uds).`,
        `${clave}-rep-${Date.now()}`
      );
      setSuscripcionesReposicion(suscripcionesReposicion.filter((s) => s.clave !== clave));
      setAvisoReposicion('');
    }
    Alert.alert(
      'Acción de demostración ejecutada',
      `Se repusieron ${unidadesReponer} unidades simuladas.`
    );
  };

  // HU32: Centro de ayuda y solicitudes
  const crearTicket = () => {
    setErrorTicket('');
    if (!pedidoTicketId) {
      const msg = 'Selecciona un pedido del historial antes de enviar.';
      setErrorTicket(msg);
      Alert.alert('Pedido requerido', msg);
      return;
    }
    if (descripcionTicket.trim().length < 15) {
      const msg = 'Describe el inconveniente con al menos 15 caracteres.';
      setErrorTicket(msg);
      Alert.alert('Descripción insuficiente', msg);
      return;
    }
    const nuevoTicket = {
      id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
      pedidoId: pedidoTicketId,
      motivo: motivoTicket,
      descripcion: descripcionTicket.trim(),
      estado: 'Abierto',
      respuestaSimulada: null,
    };
    setTickets([nuevoTicket, ...tickets]);
    setDescripcionTicket('');
    Alert.alert('Solicitud creada', `Caso único ${nuevoTicket.id} creado en estado Abierto.`);
  };

  const simularRespuestaTicket = (ticketId) => {
    setTickets(
      tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              estado: 'Respondido',
              respuestaSimulada:
                '[Respuesta ficticia de prueba]: Caso revisado por el equipo de demostración.',
            }
          : t
      )
    );
  };

  // HU35 Opcional: Compartir producto sin prometer enlace público real
  const compartirProducto = async (prod) => {
    const texto = `Mira este producto en NovaMarket 2.0 (App móvil de demostración): ${prod.nombre} - $${getPrecioReferencia(prod).toLocaleString()} COP.`;
    setMensajeCompartido(texto);
    try {
      await Share.share({ message: texto });
    } catch (e) {
      // Respaldo visible en pantalla ya asignado
    }
  };

  const productoActual = productos.find((p) => p.id === productoSeleccionadoId) || null;
  const varianteActual =
    productoActual && productoActual.variantes
      ? productoActual.variantes.find((v) => v.id === varianteSeleccionadaId) || null
      : null;

  const claveSeleccionadaActual = productoActual
    ? varianteActual
      ? `${productoActual.id}__${varianteActual.id}`
      : productoActual.id
    : null;
  const itemEnCarritoActual = claveSeleccionadaActual
    ? carrito.find((c) => c.clave === claveSeleccionadaActual)
    : null;
  const cantEnCarritoActual = itemEnCarritoActual ? itemEnCarritoActual.cantidad : 0;

  // HU31: Hasta 4 productos relacionados de la misma categoría con stock disponible
  const recomendados = productoActual
    ? productos
        .filter(
          (p) =>
            p.id !== productoActual.id &&
            p.categoria === productoActual.categoria &&
            getStockProducto(p) > 0
        )
        .slice(0, 4)
    : [];

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgMain }]}>
      <View style={styles.header}>
        <Text style={[styles.brandTitle, { fontSize: fs(20) }]}>NovaMarket 2.0</Text>
        <Text style={[styles.brandSlogan, { fontSize: fs(12) }]}>
          Tu tienda móvil de confianza en Cundinamarca
        </Text>
        <View style={[styles.rowGap, { marginTop: 8 }]}>
          <Pressable style={styles.accBtn} onPress={() => setModoOscuro(!modoOscuro)}>
            <Text style={styles.accBtnText}>
              {modoOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
            </Text>
          </Pressable>
          <Pressable style={styles.accBtn} onPress={() => setLetraGrande(!letraGrande)}>
            <Text style={styles.accBtnText}>
              {letraGrande ? 'A- Letra Normal' : 'A+ Letra Grande'}
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navBar}>
        <Pressable
          style={[styles.navTab, pantalla === 'catalogo' && styles.navTabActive]}
          onPress={() => {
            setErrorComparador('');
            setPantalla('catalogo');
          }}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>Catálogo</Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, pantalla === 'comparador' && styles.navTabActive]}
          onPress={() => {
            setErrorComparador('');
            setPantalla('comparador');
          }}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>
            Comparar ({comparadorIds.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, pantalla === 'favoritos' && styles.navTabActive]}
          onPress={() => setPantalla('favoritos')}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>
            Favoritos ({favoritos.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, pantalla === 'carrito' && styles.navTabActive]}
          onPress={() => {
            setErrorCarrito('');
            setErrorCheckout('');
            setPantalla('carrito');
          }}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>
            Carrito ({carrito.reduce((s, i) => s + i.cantidad, 0)})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, pantalla === 'direcciones' && styles.navTabActive]}
          onPress={() => setPantalla('direcciones')}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>Direcciones</Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, pantalla === 'pedidos' && styles.navTabActive]}
          onPress={() => {
            setErrorCancelacionPedido(null);
            setPantalla('pedidos');
          }}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>
            Pedidos ({pedidos.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, pantalla === 'notificaciones' && styles.navTabActive]}
          onPress={() => setPantalla('notificaciones')}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>
            Avisos ({noLeidas})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navTab, pantalla === 'ayuda' && styles.navTabActive]}
          onPress={() => setPantalla('ayuda')}
        >
          <Text style={[styles.navTabText, { fontSize: fs(12) }]}>Ayuda</Text>
        </Pressable>
      </ScrollView>

      {pantalla === 'catalogo' && (
        <ScrollView style={styles.pad} contentContainerStyle={{ paddingBottom: 30 }}>
          {errorComparador !== '' && (
            <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: '#fca5a5' }]}>
              <Text style={styles.errorText}>{errorComparador}</Text>
            </View>
          )}

          <TextInput
            style={[styles.input, { fontSize: fs(14) }]}
            placeholder="Buscar producto por nombre..."
            placeholderTextColor="#64748b"
            value={busqueda}
            onChangeText={setBusqueda}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rowScroll}>
            {categorias.map((cat) => (
              <Pressable
                key={cat}
                style={[styles.chip, categoriaActiva === cat && styles.chipActive]}
                onPress={() => setCategoriaActiva(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { fontSize: fs(13) },
                    categoriaActiva === cat && styles.chipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rowScroll}>
              {marcas.map((m) => (
                <Pressable
                  key={m}
                  style={[styles.smallChip, marcaFiltro === m && styles.chipActive]}
                  onPress={() => setMarcaFiltro(m)}
                >
                  <Text
                    style={[
                      styles.smallChipText,
                      { fontSize: fs(12) },
                      marcaFiltro === m && styles.chipTextActive,
                    ]}
                  >
                    {m}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.rowGap}>
              <TextInput
                style={[styles.input, styles.halfInput, { marginBottom: 0, fontSize: fs(13) }]}
                placeholder="Precio mín COP"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                value={precioMinTexto}
                onChangeText={setPrecioMinTexto}
              />
              <TextInput
                style={[styles.input, styles.halfInput, { marginBottom: 0, fontSize: fs(13) }]}
                placeholder="Precio máx COP"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                value={precioMaxTexto}
                onChangeText={setPrecioMaxTexto}
              />
              <Pressable style={styles.btnBlue} onPress={aplicarRangoPrecio}>
                <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Aplicar</Text>
              </Pressable>
            </View>

            {errorFiltro !== '' && <Text style={styles.errorText}>{errorFiltro}</Text>}

            <View style={[styles.rowGap, { marginTop: 8 }]}>
              <Pressable
                style={[styles.smallChip, soloDisponibles && styles.chipActive]}
                onPress={() => setSoloDisponibles(!soloDisponibles)}
              >
                <Text
                  style={[
                    styles.smallChipText,
                    { fontSize: fs(12) },
                    soloDisponibles && styles.chipTextActive,
                  ]}
                >
                  {soloDisponibles ? '✓ Solo disponibles' : 'Solo disponibles'}
                </Text>
              </Pressable>
              <Pressable style={styles.btnGray} onPress={restablecerFiltros}>
                <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>Restablecer</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.rowGap, { marginBottom: 8 }]}>
            <Text style={[styles.smallLabel, { color: txtPrimary, fontSize: fs(12) }]}>
              Ordenar:
            </Text>
            <Pressable
              style={[styles.smallChip, orden === 'asc' && styles.chipActive]}
              onPress={() => setOrden('asc')}
            >
              <Text
                style={[
                  styles.smallChipText,
                  { fontSize: fs(12) },
                  orden === 'asc' && styles.chipTextActive,
                ]}
              >
                Menor a mayor
              </Text>
            </Pressable>
            <Pressable
              style={[styles.smallChip, orden === 'desc' && styles.chipActive]}
              onPress={() => setOrden('desc')}
            >
              <Text
                style={[
                  styles.smallChipText,
                  { fontSize: fs(12) },
                  orden === 'desc' && styles.chipTextActive,
                ]}
              >
                Mayor a menor
              </Text>
            </Pressable>
          </View>

          {productosFiltrados.length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: bgCard }]}>
              <Text style={[styles.emptyTitle, { color: txtPrimary, fontSize: fs(16) }]}>
                No encontramos productos
              </Text>
              <Text style={[styles.emptySub, { color: txtSecondary, fontSize: fs(13) }]}>
                Ningún artículo coincide con los filtros o búsqueda actuales.
              </Text>
              <Pressable style={styles.btnBlue} onPress={restablecerFiltros}>
                <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Restablecer filtros</Text>
              </Pressable>
            </View>
          ) : (
            productosFiltrados.map((item) => {
              const stockTotal = getStockProducto(item);
              const precioRef = getPrecioReferencia(item);
              const esFav = favoritos.includes(item.id);
              const enComp = comparadorIds.includes(item.id);

              return (
                <View
                  key={item.id}
                  style={[styles.prodCard, { backgroundColor: bgCard, borderColor: borderCol }]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.catTag, { fontSize: fs(11) }]}>
                      {item.categoria} • {item.marca}
                    </Text>
                    <Text style={[styles.prodName, { color: txtPrimary, fontSize: fs(15) }]}>
                      {item.nombre}
                    </Text>
                    <Text style={[styles.prodPrice, { fontSize: fs(14) }]}>
                      {item.variantes.length > 0 ? 'Desde ' : ''}${precioRef.toLocaleString()} COP
                    </Text>
                    <Text style={[styles.prodStock, { color: txtSecondary, fontSize: fs(12) }]}>
                      {stockTotal > 0 ? `Stock total: ${stockTotal}` : 'AGOTADO'}
                      {item.variantes.length > 0 ? ` (${item.variantes.length} variantes)` : ''}
                    </Text>
                  </View>
                  <View style={styles.cardCol}>
                    <Pressable style={styles.favBtn} onPress={() => toggleFavorito(item.id)}>
                      <Text style={{ fontSize: 18 }}>{esFav ? '❤️' : '🤍'}</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.compBtn, enComp && styles.compBtnActive]}
                      onPress={() => toggleComparar(item.id)}
                    >
                      <Text style={[styles.btnTextSm, { fontSize: fs(11) }]}>
                        {enComp ? 'Comparando' : '+ Comparar'}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.btnBlue}
                      onPress={() => {
                        setProductoSeleccionadoId(item.id);
                        setVarianteSeleccionadaId(null);
                        setCantidadSolicitada(1);
                        setErrorVariante('');
                        setErrorComparador('');
                        setMensajeCompartido('');
                        setAvisoReposicion('');
                        setPantalla('detalle');
                      }}
                    >
                      <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Ver detalle</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}

      {pantalla === 'detalle' && productoActual && (
        <ScrollView style={styles.pad} contentContainerStyle={{ paddingBottom: 30 }}>
          <Pressable style={styles.backLink} onPress={() => setPantalla('catalogo')}>
            <Text style={[styles.backLinkText, { color: txtPrimary, fontSize: fs(14) }]}>
              ← Volver al catálogo
            </Text>
          </Pressable>

          <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
            <View style={[styles.rowGap, { justifyContent: 'space-between' }]}>
              <Text style={[styles.catTag, { fontSize: fs(11) }]}>
                {productoActual.categoria} • {productoActual.marca}
              </Text>
              <Pressable
                style={styles.btnGray}
                onPress={() => compartirProducto(productoActual)}
              >
                <Text style={[styles.btnTextDark, { fontSize: fs(11) }]}>📤 Compartir</Text>
              </Pressable>
            </View>

            {mensajeCompartido !== '' && (
              <View style={styles.innerItem}>
                <Text style={styles.metaSm}>{mensajeCompartido}</Text>
              </View>
            )}

            <Text style={[styles.detailTitle, { color: txtPrimary, fontSize: fs(20) }]}>
              {productoActual.nombre}
            </Text>

            {productoActual.variantes && productoActual.variantes.length > 0 ? (
              <>
                <Text style={[styles.detailPrice, { fontSize: fs(17) }]}>
                  Precio:{' '}
                  {varianteActual
                    ? `$${varianteActual.precioFinal.toLocaleString()} COP`
                    : `Desde $${getPrecioReferencia(productoActual).toLocaleString()} COP`}
                </Text>
                <Text style={[styles.prodStock, { color: txtSecondary, fontSize: fs(12) }]}>
                  {varianteActual
                    ? varianteActual.stock > 0
                      ? `Máximo disponible variante: ${varianteActual.stock} unidad(es) • En carrito: ${cantEnCarritoActual}`
                      : 'Variante AGOTADA (máximo permitido: 0)'
                    : `Stock total del producto: ${getStockProducto(productoActual)} (elige variante)`}
                </Text>

                <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14), marginTop: 8 }]}>
                  Elige una variante:
                </Text>
                <View style={styles.rowWrap}>
                  {productoActual.variantes.map((v) => {
                    const sel = varianteSeleccionadaId === v.id;
                    return (
                      <Pressable
                        key={v.id}
                        style={[styles.varChip, sel && styles.chipActive]}
                        onPress={() => {
                          setVarianteSeleccionadaId(v.id);
                          setCantidadSolicitada(1);
                          setErrorVariante('');
                          setAvisoReposicion('');
                        }}
                      >
                        <Text
                          style={[
                            styles.smallChipText,
                            { fontSize: fs(12) },
                            sel && styles.chipTextActive,
                          ]}
                        >
                          {v.etiqueta} ({v.stock > 0 ? `máx ${v.stock}` : 'Agotado'})
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View style={[styles.rowGap, { marginTop: 6 }]}>
                  <Text style={[styles.smallLabel, { color: txtPrimary, fontSize: fs(12) }]}>
                    Cantidad a agregar:
                  </Text>
                  <Pressable
                    style={styles.qBtn}
                    onPress={() => {
                      setErrorVariante('');
                      setCantidadSolicitada((prev) => Math.max(1, prev - 1));
                    }}
                  >
                    <Text style={styles.boldSm}>-</Text>
                  </Pressable>
                  <Text style={[styles.qNum, { color: txtPrimary, fontSize: fs(14) }]}>
                    {cantidadSolicitada}
                  </Text>
                  <Pressable
                    style={styles.qBtn}
                    onPress={() => {
                      if (!varianteActual) {
                        const msg =
                          'Selecciona primero una variante para validar su stock máximo.';
                        setErrorVariante(msg);
                        return;
                      }
                      const nextCant = cantidadSolicitada + 1;
                      if (cantEnCarritoActual + nextCant > varianteActual.stock) {
                        const msg = `Stock insuficiente para ${varianteActual.etiqueta}: máximo permitido ${varianteActual.stock} unidad(es).`;
                        setErrorVariante(msg);
                        Alert.alert('Máximo permitido', msg);
                        return;
                      }
                      setErrorVariante('');
                      setCantidadSolicitada(nextCant);
                    }}
                  >
                    <Text style={styles.boldSm}>+</Text>
                  </Pressable>
                </View>

                {errorVariante !== '' && <Text style={styles.errorText}>{errorVariante}</Text>}

                <Pressable
                  style={[
                    styles.btnGreen,
                    varianteActual && varianteActual.stock === 0 && styles.btnDisabled,
                  ]}
                  onPress={() =>
                    agregarAlCarrito(productoActual, varianteSeleccionadaId, cantidadSolicitada)
                  }
                >
                  <Text style={[styles.btnTextLg, { fontSize: fs(15) }]}>
                    {varianteActual && varianteActual.stock === 0
                      ? 'Variante Agotada'
                      : 'Agregar al Carrito'}
                  </Text>
                </Pressable>

                {varianteActual && varianteActual.stock === 0 && (
                  <View style={{ marginTop: 10 }}>
                    <Pressable
                      style={styles.btnGray}
                      onPress={() =>
                        toggleSuscripcionReposicion(productoActual.id, varianteActual.id)
                      }
                    >
                      <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                        {suscripcionesReposicion.some(
                          (s) => s.clave === `${productoActual.id}__${varianteActual.id}`
                        )
                          ? '✓ Suscripción única activa (Cancelar aviso)'
                          : 'Avisarme cuando haya stock'}
                      </Text>
                    </Pressable>
                    {avisoReposicion !== '' && (
                      <View style={styles.innerItem}>
                        <Text style={[styles.respText, { fontSize: fs(12), marginTop: 0 }]}>
                          {avisoReposicion}
                        </Text>
                      </View>
                    )}
                    <Pressable
                      style={[styles.btnBlue, { marginTop: 6 }]}
                      onPress={() => simularReposicion(productoActual.id, varianteActual.id)}
                    >
                      <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>
                        [Demo] Simular reposición (+5 unidades)
                      </Text>
                    </Pressable>
                  </View>
                )}
              </>
            ) : (
              <>
                <Text style={[styles.detailPrice, { fontSize: fs(17) }]}>
                  ${productoActual.precioBase.toLocaleString()} COP
                </Text>
                <Text style={[styles.prodStock, { color: txtSecondary, fontSize: fs(12) }]}>
                  {productoActual.stock > 0
                    ? `Máximo disponible: ${productoActual.stock} unidad(es) • En carrito: ${cantEnCarritoActual}`
                    : 'AGOTADO (máximo permitido: 0)'}
                </Text>

                {productoActual.stock > 0 && (
                  <View style={[styles.rowGap, { marginTop: 6 }]}>
                    <Text style={[styles.smallLabel, { color: txtPrimary, fontSize: fs(12) }]}>
                      Cantidad a agregar:
                    </Text>
                    <Pressable
                      style={styles.qBtn}
                      onPress={() => {
                        setErrorVariante('');
                        setCantidadSolicitada((prev) => Math.max(1, prev - 1));
                      }}
                    >
                      <Text style={styles.boldSm}>-</Text>
                    </Pressable>
                    <Text style={[styles.qNum, { color: txtPrimary, fontSize: fs(14) }]}>
                      {cantidadSolicitada}
                    </Text>
                    <Pressable
                      style={styles.qBtn}
                      onPress={() => {
                        const nextCant = cantidadSolicitada + 1;
                        if (cantEnCarritoActual + nextCant > productoActual.stock) {
                          const msg = `Stock insuficiente: máximo permitido ${productoActual.stock} unidad(es).`;
                          setErrorVariante(msg);
                          Alert.alert('Máximo permitido', msg);
                          return;
                        }
                        setErrorVariante('');
                        setCantidadSolicitada(nextCant);
                      }}
                    >
                      <Text style={styles.boldSm}>+</Text>
                    </Pressable>
                  </View>
                )}

                {errorVariante !== '' && <Text style={styles.errorText}>{errorVariante}</Text>}

                <Pressable
                  style={[styles.btnGreen, productoActual.stock === 0 && styles.btnDisabled]}
                  disabled={productoActual.stock === 0}
                  onPress={() => agregarAlCarrito(productoActual, null, cantidadSolicitada)}
                >
                  <Text style={[styles.btnTextLg, { fontSize: fs(15) }]}>
                    {productoActual.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                  </Text>
                </Pressable>

                {productoActual.stock === 0 && (
                  <View style={{ marginTop: 10 }}>
                    <Pressable
                      style={styles.btnGray}
                      onPress={() => toggleSuscripcionReposicion(productoActual.id, null)}
                    >
                      <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                        {suscripcionesReposicion.some((s) => s.clave === productoActual.id)
                          ? '✓ Suscripción única activa (Cancelar aviso)'
                          : 'Avisarme cuando haya stock'}
                      </Text>
                    </Pressable>
                    {avisoReposicion !== '' && (
                      <View style={styles.innerItem}>
                        <Text style={[styles.respText, { fontSize: fs(12), marginTop: 0 }]}>
                          {avisoReposicion}
                        </Text>
                      </View>
                    )}
                    <Pressable
                      style={[styles.btnBlue, { marginTop: 6 }]}
                      onPress={() => simularReposicion(productoActual.id, null)}
                    >
                      <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>
                        [Demo] Simular reposición (+5 unidades)
                      </Text>
                    </Pressable>
                  </View>
                )}
              </>
            )}

            <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14), marginTop: 14 }]}>
              Descripción:
            </Text>
            <Text style={[styles.descText, { color: txtSecondary, fontSize: fs(14) }]}>
              {productoActual.descripcion}
            </Text>
          </View>

          <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
            <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14) }]}>
              Preguntas sobre este producto
            </Text>
            <TextInput
              style={[styles.input, { fontSize: fs(14) }]}
              placeholder="Escribe tu pregunta (mín. 10 caracteres)..."
              placeholderTextColor="#64748b"
              value={preguntaTexto}
              onChangeText={(t) => {
                setPreguntaTexto(t);
                if (errorPregunta) setErrorPregunta('');
              }}
            />
            {errorPregunta !== '' && <Text style={styles.errorText}>{errorPregunta}</Text>}
            <Pressable style={styles.btnBlue} onPress={() => enviarPregunta(productoActual.id)}>
              <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Enviar pregunta</Text>
            </Pressable>

            {consultas.filter((c) => c.productoId === productoActual.id).length === 0 ? (
              <Text style={[styles.metaSm, { color: txtSecondary, marginTop: 8 }]}>
                Aún no hay preguntas registradas para este artículo.
              </Text>
            ) : (
              consultas
                .filter((c) => c.productoId === productoActual.id)
                .map((c) => (
                  <View key={c.id} style={styles.innerItem}>
                    <Text style={[styles.boldSm, { fontSize: fs(13) }]}>
                      [{c.estado}] {c.pregunta}
                    </Text>
                    <Text style={[styles.metaSm, { fontSize: fs(11) }]}>{c.fecha}</Text>
                    {c.respuesta && (
                      <Text style={[styles.respText, { fontSize: fs(12) }]}>{c.respuesta}</Text>
                    )}
                    {c.estado === 'Pendiente' && (
                      <Pressable
                        style={[styles.btnGray, { marginTop: 6 }]}
                        onPress={() => simularRespuestaConsulta(c.id)}
                      >
                        <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                          Simular respuesta (Demo)
                        </Text>
                      </Pressable>
                    )}
                  </View>
                ))
            )}
          </View>

          <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
            <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14) }]}>
              Productos relacionados
            </Text>
            {recomendados.length === 0 ? (
              <Text
                style={[styles.emptySub, { color: txtSecondary, fontSize: fs(13), marginBottom: 0 }]}
              >
                No hay otros productos disponibles en la categoría {productoActual.categoria} por ahora.
              </Text>
            ) : (
              recomendados.map((rec) => (
                <View key={rec.id} style={styles.innerRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                      {rec.nombre}
                    </Text>
                    <Text style={[styles.metaSm, { color: txtSecondary, fontSize: fs(12) }]}>
                      ${getPrecioReferencia(rec).toLocaleString()} COP • Stock:{' '}
                      {getStockProducto(rec)}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.btnBlue}
                    onPress={() => {
                      setProductoSeleccionadoId(rec.id);
                      setVarianteSeleccionadaId(null);
                      setCantidadSolicitada(1);
                      setErrorVariante('');
                      setMensajeCompartido('');
                      setAvisoReposicion('');
                    }}
                  >
                    <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Ver</Text>
                  </Pressable>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}

      {pantalla === 'comparador' && (
        <ScrollView style={styles.pad}>
          <Text style={[styles.sectionTitle, { color: txtPrimary, fontSize: fs(18) }]}>
            Comparador de Productos (2 a 3)
          </Text>
          {comparadorIds.length < 2 ? (
            <View style={[styles.emptyBox, { backgroundColor: bgCard }]}>
              <Text style={[styles.emptyTitle, { color: txtPrimary, fontSize: fs(16) }]}>
                Selecciona entre 2 y 3 productos
              </Text>
              <Text style={[styles.emptySub, { color: txtSecondary, fontSize: fs(13) }]}>
                Actualmente tienes {comparadorIds.length} seleccionado(s) en el catálogo.
              </Text>
              <Pressable style={styles.btnBlue} onPress={() => setPantalla('catalogo')}>
                <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Ir al catálogo</Text>
              </Pressable>
            </View>
          ) : (
            <ScrollView horizontal>
              {comparadorIds.map((id) => {
                const p = productos.find((item) => item.id === id);
                if (!p) return null;
                const st = getStockProducto(p);
                return (
                  <View
                    key={p.id}
                    style={[styles.compCol, { backgroundColor: bgCard, borderColor: borderCol }]}
                  >
                    <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                      Nombre:
                    </Text>
                    <Text style={[styles.compVal, { color: txtSecondary, fontSize: fs(13) }]}>
                      {p.nombre}
                    </Text>
                    <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                      Marca:
                    </Text>
                    <Text style={[styles.compVal, { color: txtSecondary, fontSize: fs(13) }]}>
                      {p.marca}
                    </Text>
                    <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                      Precio:
                    </Text>
                    <Text style={[styles.compVal, { color: txtSecondary, fontSize: fs(13) }]}>
                      ${getPrecioReferencia(p).toLocaleString()} COP
                    </Text>
                    <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                      Disponibilidad:
                    </Text>
                    <Text style={[styles.compVal, { color: txtSecondary, fontSize: fs(13) }]}>
                      {st > 0 ? `Disponible (${st})` : 'Agotado'}
                    </Text>
                    <Pressable style={styles.btnRedSm} onPress={() => toggleComparar(p.id)}>
                      <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Retirar</Text>
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </ScrollView>
      )}

      {pantalla === 'favoritos' && (
        <ScrollView style={styles.pad}>
          <Text style={[styles.sectionTitle, { color: txtPrimary, fontSize: fs(18) }]}>
            Mis Favoritos
          </Text>
          {favoritos.length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: bgCard }]}>
              <Text style={[styles.emptyTitle, { color: txtPrimary, fontSize: fs(16) }]}>
                No tienes favoritos aún
              </Text>
              <Pressable style={styles.btnBlue} onPress={() => setPantalla('catalogo')}>
                <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Explorar catálogo</Text>
              </Pressable>
            </View>
          ) : (
            favoritos.map((id) => {
              const p = productos.find((item) => item.id === id);
              if (!p) return null;
              return (
                <View
                  key={p.id}
                  style={[styles.prodCard, { backgroundColor: bgCard, borderColor: borderCol }]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.prodName, { color: txtPrimary, fontSize: fs(15) }]}>
                      {p.nombre}
                    </Text>
                    <Text style={[styles.prodPrice, { fontSize: fs(14) }]}>
                      ${getPrecioReferencia(p).toLocaleString()} COP
                    </Text>
                  </View>
                  <Pressable style={styles.btnRedSm} onPress={() => toggleFavorito(p.id)}>
                    <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Quitar</Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </ScrollView>
      )}

      {pantalla === 'carrito' && (
        <ScrollView style={styles.pad} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={[styles.sectionTitle, { color: txtPrimary, fontSize: fs(18) }]}>
            Carrito y Resumen de Envío
          </Text>

          {errorCarrito !== '' && (
            <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: '#fca5a5' }]}>
              <Text style={styles.errorText}>{errorCarrito}</Text>
            </View>
          )}

          {errorCheckout !== '' && (
            <View style={[styles.confirmBox, { marginTop: 0, marginBottom: 10 }]}>
              <Text style={styles.errorText}>{errorCheckout}</Text>
            </View>
          )}

          {carrito.length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: bgCard }]}>
              <Text style={[styles.emptyTitle, { color: txtPrimary, fontSize: fs(16) }]}>
                Tu carrito está vacío
              </Text>
              <Text style={[styles.emptySub, { color: txtSecondary, fontSize: fs(13) }]}>
                Subtotal: $0 COP • Envío: $0 COP
              </Text>
              <Pressable style={styles.btnBlue} onPress={() => setPantalla('catalogo')}>
                <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Ir al catálogo</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {carrito.map((item) => (
                <View
                  key={item.clave}
                  style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}
                >
                  <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                    {item.nombre}
                  </Text>
                  <Text style={[styles.metaSm, { color: txtSecondary, fontSize: fs(12) }]}>
                    Opción: {item.varianteEtiqueta} • ${item.precioUnitario.toLocaleString()} c/u
                  </Text>
                  <View style={[styles.rowGap, { marginTop: 8 }]}>
                    <Pressable
                      style={styles.qBtn}
                      onPress={() => cambiarCantidadCarrito(item.clave, -1)}
                    >
                      <Text style={styles.boldSm}>-</Text>
                    </Pressable>
                    <Text style={[styles.qNum, { color: txtPrimary, fontSize: fs(14) }]}>
                      {item.cantidad}
                    </Text>
                    <Pressable
                      style={styles.qBtn}
                      onPress={() => cambiarCantidadCarrito(item.clave, 1)}
                    >
                      <Text style={styles.boldSm}>+</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.btnRedSm, { marginLeft: 'auto' }]}
                      onPress={() => eliminarItemCarrito(item.clave)}
                    >
                      <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Eliminar</Text>
                    </Pressable>
                  </View>
                </View>
              ))}

              <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
                <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14) }]}>
                  Dirección de entrega {!direccionActual ? '(Sin seleccionar)' : ''}
                </Text>
                {direcciones.map((d) => (
                  <Pressable
                    key={d.id}
                    style={[
                      styles.dirOption,
                      direccionSeleccionadaId === d.id && styles.dirOptionSelected,
                    ]}
                    onPress={() => {
                      setDireccionSeleccionadaId(d.id);
                      setErrorCheckout('');
                    }}
                  >
                    <Text
                      style={[
                        styles.boldSm,
                        {
                          color: direccionSeleccionadaId === d.id ? '#0f172a' : txtPrimary,
                          fontSize: fs(13),
                        },
                      ]}
                    >
                      {direccionSeleccionadaId === d.id ? '● ' : '○ '}
                      {d.alias} ({d.municipio}) {d.principal ? '[Principal]' : ''}
                    </Text>
                    <Text
                      style={[
                        styles.metaSm,
                        {
                          color: direccionSeleccionadaId === d.id ? '#334155' : txtSecondary,
                          fontSize: fs(12),
                        },
                      ]}
                    >
                      {d.descripcion}
                    </Text>
                  </Pressable>
                ))}
                <View style={styles.rowGap}>
                  <Pressable style={styles.btnGray} onPress={() => setPantalla('direcciones')}>
                    <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                      Gestionar libreta
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnGray}
                    onPress={() => {
                      setDireccionSeleccionadaId(null);
                      setErrorCheckout('');
                    }}
                  >
                    <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                      Quitar selección
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
                <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14) }]}>
                  Modalidad de envío {!modalidadEnvio ? '(Sin seleccionar)' : ''}
                </Text>
                <View style={styles.rowGap}>
                  <Pressable
                    style={[styles.smallChip, modalidadEnvio === 'estandar' && styles.chipActive]}
                    onPress={() => {
                      setModalidadEnvio('estandar');
                      setErrorCheckout('');
                    }}
                  >
                    <Text
                      style={[
                        styles.smallChipText,
                        { fontSize: fs(12) },
                        modalidadEnvio === 'estandar' && styles.chipTextActive,
                      ]}
                    >
                      Envío Estándar
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.smallChip, modalidadEnvio === 'expres' && styles.chipActive]}
                    onPress={() => {
                      setModalidadEnvio('expres');
                      setErrorCheckout('');
                    }}
                  >
                    <Text
                      style={[
                        styles.smallChipText,
                        { fontSize: fs(12) },
                        modalidadEnvio === 'expres' && styles.chipTextActive,
                      ]}
                    >
                      Envío Exprés
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
                <Text style={[styles.sumRow, { color: txtSecondary, fontSize: fs(14) }]}>
                  Subtotal: ${subtotal.toLocaleString()} COP
                </Text>
                <Text style={[styles.sumRow, { color: txtSecondary, fontSize: fs(14) }]}>
                  Envío:{' '}
                  {tarifaMunicipio
                    ? `$${costoEnvio.toLocaleString()} COP`
                    : !direccionActual
                    ? 'Selecciona dirección'
                    : !modalidadEnvio
                    ? 'Selecciona modalidad'
                    : 'No disponible (requiere ajuste manual)'}
                </Text>
                <Text style={[styles.sumRow, { color: txtSecondary, fontSize: fs(14) }]}>
                  Plazo estimado:{' '}
                  {tarifaMunicipio ? tarifaMunicipio.plazo : 'Pendiente de selección'}
                </Text>
                <Text style={[styles.sumTotal, { color: txtPrimary, fontSize: fs(17) }]}>
                  Total: ${total.toLocaleString()} COP
                </Text>
                <Text style={[styles.noteSim, { fontSize: fs(11) }]}>
                  Simulación académica: no se solicitan datos bancarios ni contraseñas.
                </Text>

                {errorCheckout !== '' && <Text style={styles.errorText}>{errorCheckout}</Text>}

                <Pressable style={styles.btnGreen} onPress={confirmarCompra}>
                  <Text style={[styles.btnTextLg, { fontSize: fs(15) }]}>
                    Confirmar Compra Simulada
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      )}

      {pantalla === 'direcciones' && (
        <ScrollView style={styles.pad} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={[styles.sectionTitle, { color: txtPrimary, fontSize: fs(18) }]}>
            Libreta de Direcciones (Ficticias)
          </Text>

          <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
            <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14) }]}>
              {editandoDirId ? 'Editar dirección' : 'Registrar nueva dirección'}
            </Text>
            <TextInput
              style={[styles.input, { fontSize: fs(14) }]}
              placeholder="Alias (ej: Casa, Trabajo)"
              placeholderTextColor="#64748b"
              value={aliasDir}
              onChangeText={setAliasDir}
            />
            <TextInput
              style={[styles.input, { fontSize: fs(14) }]}
              placeholder="Municipio (Mosquera, Funza, Madrid)"
              placeholderTextColor="#64748b"
              value={municipioDir}
              onChangeText={setMunicipioDir}
            />
            <TextInput
              style={[styles.input, { fontSize: fs(14) }]}
              placeholder="Referencia ficticia de entrega"
              placeholderTextColor="#64748b"
              value={descDir}
              onChangeText={setDescDir}
            />
            {errorDir !== '' && <Text style={styles.errorText}>{errorDir}</Text>}
            <Pressable style={styles.btnBlue} onPress={guardarDireccion}>
              <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>
                {editandoDirId ? 'Guardar cambios' : 'Agregar dirección'}
              </Text>
            </Pressable>
          </View>

          {direcciones.map((d) => (
            <View
              key={d.id}
              style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}
            >
              <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                {d.alias} • {d.municipio} {d.principal ? '★ Principal' : ''}
              </Text>
              <Text style={[styles.metaSm, { color: txtSecondary, fontSize: fs(12) }]}>
                {d.descripcion}
              </Text>
              <View style={[styles.rowGap, { marginTop: 8 }]}>
                {!d.principal && (
                  <Pressable style={styles.btnGray} onPress={() => marcarPrincipal(d.id)}>
                    <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                      Marcar principal
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  style={styles.btnBlue}
                  onPress={() => {
                    setEditandoDirId(d.id);
                    setAliasDir(d.alias);
                    setMunicipioDir(d.municipio);
                    setDescDir(d.descripcion);
                    setErrorDir('');
                  }}
                >
                  <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Editar</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {pantalla === 'pedidos' && (
        <ScrollView style={styles.pad} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={[styles.sectionTitle, { color: txtPrimary, fontSize: fs(18) }]}>
            Mis Pedidos y Seguimiento
          </Text>
          {pedidos.length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: bgCard }]}>
              <Text style={[styles.emptyTitle, { color: txtPrimary, fontSize: fs(16) }]}>
                No hay pedidos registrados
              </Text>
            </View>
          ) : (
            pedidos.map((ped) => {
              const abierto = pedidoDetalleId === ped.id;
              const confirmandoCancel = pedidoPendienteCancelarId === ped.id;
              const errorEstePedido =
                errorCancelacionPedido && errorCancelacionPedido.pedidoId === ped.id
                  ? errorCancelacionPedido.mensaje
                  : '';
              return (
                <View
                  key={ped.id}
                  style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}
                >
                  <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                    {ped.id} • Estado: {ped.estado}
                  </Text>
                  <Text style={[styles.metaSm, { color: txtSecondary, fontSize: fs(12) }]}>
                    Fecha: {ped.fecha} • Total: ${ped.total.toLocaleString()} COP
                  </Text>
                  <Text style={[styles.metaSm, { color: txtSecondary, fontSize: fs(12) }]}>
                    Entrega: {ped.direccion.alias} ({ped.direccion.municipio}) • Envío: $
                    {ped.costoEnvio.toLocaleString()} ({ped.plazoEstimado})
                  </Text>

                  <View style={[styles.rowGap, { marginTop: 8 }]}>
                    <Pressable
                      style={styles.btnBlue}
                      onPress={() => setPedidoDetalleId(abierto ? null : ped.id)}
                    >
                      <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>
                        {abierto ? 'Ocultar detalle' : 'Ver detalle'}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.btnGray}
                      onPress={() => simularAvanceEntrega(ped.id)}
                    >
                      <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                        Simular avance de entrega
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.btnRedSm}
                      onPress={() => solicitarCancelacion(ped.id)}
                    >
                      <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Cancelar</Text>
                    </Pressable>
                  </View>

                  {errorEstePedido !== '' && (
                    <View style={styles.confirmBox}>
                      <Text style={styles.errorText}>{errorEstePedido}</Text>
                    </View>
                  )}

                  {confirmandoCancel && (
                    <View style={styles.confirmBox}>
                      <Text style={styles.boldSm}>
                        ¿Confirmas cancelar el pedido {ped.id} y reintegrar su stock?
                      </Text>
                      <View style={[styles.rowGap, { marginTop: 6 }]}>
                        <Pressable
                          style={styles.btnRedSm}
                          onPress={() => confirmarCancelacionPedido(ped.id)}
                        >
                          <Text style={styles.btnTextSm}>Sí, confirmar cancelación</Text>
                        </Pressable>
                        <Pressable
                          style={styles.btnGray}
                          onPress={() => setPedidoPendienteCancelarId(null)}
                        >
                          <Text style={styles.btnTextDark}>No, volver</Text>
                        </Pressable>
                      </View>
                    </View>
                  )}

                  {abierto && (
                    <View style={styles.innerItem}>
                      <Text style={[styles.boldSm, { fontSize: fs(13) }]}>Artículos:</Text>
                      {ped.items.map((it, idx) => (
                        <Text key={idx} style={[styles.metaSm, { fontSize: fs(12) }]}>
                          - {it.nombre} ({it.varianteEtiqueta}) x{it.cantidad} ($
                          {it.precioUnitario.toLocaleString()} c/u)
                        </Text>
                      ))}
                      <Text style={[styles.boldSm, { marginTop: 6, fontSize: fs(13) }]}>
                        Historial cronológico de estados:
                      </Text>
                      {ped.historialEstados.map((h, idx) => (
                        <Text key={idx} style={[styles.metaSm, { fontSize: fs(12) }]}>
                          • {h}
                        </Text>
                      ))}

                      <Pressable
                        style={[
                          styles.btnGray,
                          { marginTop: 8 },
                          ped.estado !== 'Entregado' && { opacity: 0.6 },
                        ]}
                        onPress={() => solicitarDevolucion(ped.id)}
                      >
                        <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>
                          {ped.devolucionSolicitada
                            ? '✓ Devolución simulada solicitada'
                            : 'Solicitar devolución simulada'}
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
      )}

      {pantalla === 'notificaciones' && (
        <ScrollView style={styles.pad}>
          <Text style={[styles.sectionTitle, { color: txtPrimary, fontSize: fs(18) }]}>
            Centro de Notificaciones Interno
          </Text>
          {notificaciones.length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: bgCard }]}>
              <Text style={[styles.emptyTitle, { color: txtPrimary, fontSize: fs(16) }]}>
                No tienes notificaciones
              </Text>
              <Text style={[styles.emptySub, { color: txtSecondary, fontSize: fs(13) }]}>
                Aquí aparecerán avisos internos dentro de la app sobre tus pedidos y reposiciones.
              </Text>
            </View>
          ) : (
            notificaciones.map((n) => (
              <Pressable
                key={n.id}
                style={[
                  styles.boxCard,
                  { backgroundColor: bgCard, borderColor: borderCol },
                  !n.leida && styles.unreadCard,
                ]}
                onPress={() =>
                  setNotificaciones(
                    notificaciones.map((item) =>
                      item.id === n.id ? { ...item, leida: true } : item
                    )
                  )
                }
              >
                <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                  {n.leida ? '✓ ' : '● '}
                  {n.tipo}: {n.mensaje}
                </Text>
                <Text style={[styles.metaSm, { color: txtSecondary, fontSize: fs(12) }]}>
                  {n.fecha} • {n.leida ? 'Leída' : 'Toca para marcar como leída'}
                </Text>
              </Pressable>
            ))
          )}
        </ScrollView>
      )}

      {pantalla === 'ayuda' && (
        <ScrollView style={styles.pad} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={[styles.sectionTitle, { color: txtPrimary, fontSize: fs(18) }]}>
            Centro de Ayuda y Solicitudes
          </Text>

          <View style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}>
            <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14) }]}>
              1. Selecciona un pedido:
            </Text>
            <View style={styles.rowWrap}>
              {pedidos.map((p) => (
                <Pressable
                  key={p.id}
                  style={[styles.smallChip, pedidoTicketId === p.id && styles.chipActive]}
                  onPress={() => {
                    setPedidoTicketId(p.id);
                    setErrorTicket('');
                  }}
                >
                  <Text
                    style={[
                      styles.smallChipText,
                      { fontSize: fs(12) },
                      pedidoTicketId === p.id && styles.chipTextActive,
                    ]}
                  >
                    {p.id}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.subLabel, { color: txtPrimary, fontSize: fs(14), marginTop: 10 }]}>
              2. Motivo:
            </Text>
            <View style={styles.rowGap}>
              {['Entrega', 'Producto', 'Otro'].map((mot) => (
                <Pressable
                  key={mot}
                  style={[styles.smallChip, motivoTicket === mot && styles.chipActive]}
                  onPress={() => setMotivoTicket(mot)}
                >
                  <Text
                    style={[
                      styles.smallChipText,
                      { fontSize: fs(12) },
                      motivoTicket === mot && styles.chipTextActive,
                    ]}
                  >
                    {mot}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              style={[styles.input, { marginTop: 10, fontSize: fs(14) }]}
              placeholder="Describe el inconveniente (mín. 15 caracteres)..."
              placeholderTextColor="#64748b"
              value={descripcionTicket}
              onChangeText={(t) => {
                setDescripcionTicket(t);
                if (errorTicket) setErrorTicket('');
              }}
            />
            {errorTicket !== '' && <Text style={styles.errorText}>{errorTicket}</Text>}
            <Pressable style={styles.btnBlue} onPress={crearTicket}>
              <Text style={[styles.btnTextSm, { fontSize: fs(12) }]}>Enviar solicitud</Text>
            </Pressable>
          </View>

          {tickets.map((t) => (
            <View
              key={t.id}
              style={[styles.boxCard, { backgroundColor: bgCard, borderColor: borderCol }]}
            >
              <Text style={[styles.boldSm, { color: txtPrimary, fontSize: fs(13) }]}>
                {t.id} • Pedido {t.pedidoId} • Motivo: {t.motivo} • Estado: {t.estado}
              </Text>
              <Text style={[styles.metaSm, { color: txtSecondary, fontSize: fs(12) }]}>
                {t.descripcion}
              </Text>
              {t.respuestaSimulada && (
                <Text style={[styles.respText, { fontSize: fs(12) }]}>{t.respuestaSimulada}</Text>
              )}
              {t.estado === 'Abierto' && (
                <Pressable
                  style={[styles.btnGray, { marginTop: 6 }]}
                  onPress={() => simularRespuestaTicket(t.id)}
                >
                  <Text style={[styles.btnTextDark, { fontSize: fs(12) }]}>Simular respuesta</Text>
                </Pressable>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { backgroundColor: '#1e293b', padding: 14, alignItems: 'center' },
  brandTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  brandSlogan: { color: '#cbd5e1', fontSize: 12, marginTop: 2 },
  accBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  accBtnText: { color: '#ffffff', fontSize: 11, fontWeight: '600' },
  navBar: { backgroundColor: '#0f172a', maxHeight: 46 },
  navTab: { paddingHorizontal: 14, paddingVertical: 12, justifyContent: 'center' },
  navTabActive: { borderBottomWidth: 3, borderBottomColor: '#dc2626' },
  navTabText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  pad: { flex: 1, padding: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 10 },
  subLabel: { fontSize: 14, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 },
  smallLabel: { fontSize: 12, fontWeight: 'bold', color: '#334155' },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#0f172a',
  },
  halfInput: { flex: 1 },
  rowScroll: { maxHeight: 42, marginBottom: 8 },
  rowGap: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 8,
  },
  smallChip: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  varChip: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#94a3b8',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  chipActive: { backgroundColor: '#dc2626' },
  chipText: { color: '#1e293b', fontWeight: '600', fontSize: 13 },
  smallChipText: { color: '#1e293b', fontWeight: '600', fontSize: 12 },
  chipTextActive: { color: '#ffffff' },
  boxCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  confirmBox: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  unreadCard: { borderLeftWidth: 4, borderLeftColor: '#dc2626' },
  prodCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardCol: { alignItems: 'flex-end', gap: 6, marginLeft: 8 },
  favBtn: { padding: 4 },
  compBtn: { backgroundColor: '#475569', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 6 },
  compBtnActive: { backgroundColor: '#dc2626' },
  catTag: { fontSize: 11, fontWeight: 'bold', color: '#dc2626', textTransform: 'uppercase' },
  prodName: { fontSize: 15, fontWeight: 'bold', color: '#0f172a', marginVertical: 2 },
  prodPrice: { fontSize: 14, fontWeight: 'bold', color: '#15803d' },
  prodStock: { fontSize: 12, color: '#475569', marginTop: 2 },
  detailTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginVertical: 4 },
  detailPrice: { fontSize: 17, fontWeight: 'bold', color: '#15803d', marginBottom: 4 },
  descText: { fontSize: 14, color: '#334155', lineHeight: 20 },
  btnBlue: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnGray: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnRedSm: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnGreen: {
    backgroundColor: '#15803d',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnDisabled: { backgroundColor: '#94a3b8' },
  btnTextSm: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  btnTextDark: { color: '#0f172a', fontSize: 12, fontWeight: 'bold' },
  btnTextLg: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  backLink: { marginBottom: 8 },
  backLinkText: { color: '#1e293b', fontWeight: 'bold', fontSize: 14 },
  innerItem: { backgroundColor: '#f8fafc', padding: 10, borderRadius: 8, marginTop: 8 },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  boldSm: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
  metaSm: { fontSize: 12, color: '#475569', marginTop: 2 },
  respText: { fontSize: 12, color: '#15803d', marginTop: 4, fontWeight: '600' },
  errorText: { color: '#dc2626', fontSize: 12, fontWeight: 'bold', marginTop: 4, marginBottom: 4 },
  compCol: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    width: 190,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  compVal: { fontSize: 13, color: '#334155', marginBottom: 8 },
  qBtn: { backgroundColor: '#e2e8f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  qNum: { fontSize: 14, fontWeight: 'bold', paddingHorizontal: 6 },
  dirOption: { padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 6 },
  dirOptionSelected: { borderColor: '#dc2626', backgroundColor: '#fef2f2' },
  sumRow: { fontSize: 14, color: '#334155', marginBottom: 4 },
  sumTotal: { fontSize: 17, fontWeight: 'bold', color: '#0f172a', marginTop: 4 },
  noteSim: { fontSize: 11, color: '#64748b', fontStyle: 'italic', marginTop: 6 },
  emptyBox: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
  },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  emptySub: { fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 12 },
});