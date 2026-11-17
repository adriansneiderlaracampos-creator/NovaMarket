import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, ScrollView, 
  Pressable, FlatList, Alert, SafeAreaView 
} from 'react-native';

const productosIniciales = [
  { id: "PROD-001", nombre: "Audífonos Inalámbricos", categoria: "Tecnología", precio: 85000, stock: 10, descripcion: "Audífonos Bluetooth con cancelación de ruido y 20h de batería." },
  { id: "PROD-002", nombre: "Smartwatch Deportivo", categoria: "Tecnología", precio: 145000, stock: 5, descripcion: "Reloj inteligente con monitor de ritmo cardíaco y GPS integrado." },
  { id: "PROD-003", nombre: "Power Bank 10000mAh", categoria: "Tecnología", precio: 65000, stock: 8, descripcion: "Cargador portátil ultradelgado con carga rápida USB-C." },
  { id: "PROD-004", nombre: "Mochila Urbana Impermeable", categoria: "Moda", precio: 120000, stock: 6, descripcion: "Mochila ergonómica con compartimento para portátil de 15 pulgadas." },
  { id: "PROD-005", nombre: "Chaquetas Cortavientos", categoria: "Moda", precio: 160000, stock: 4, descripcion: "Chaqueta ligera ideal para clima húmedo y frío moderado." },
  { id: "PROD-006", nombre: "Gorra Deportiva Ajustable", categoria: "Moda", precio: 45000, stock: 15, descripcion: "Gorra transpirable con protección UV para running o diario." },
  { id: "PROD-007", nombre: "Lámpara LED Escritorio", categoria: "Hogar", precio: 95000, stock: 7, descripcion: "Lámpara de mesa táctil con intensidad y temperatura de luz regulable." },
  { id: "PROD-008", nombre: "Set de Contenedores Herméticos", categoria: "Hogar", precio: 75000, stock: 12, descripcion: "Juego de 6 recipientes plásticos libres de BPA para alimentos." },
  { id: "PROD-009", nombre: "Almohada Ergonómica Memory Foam", categoria: "Hogar", precio: 110000, stock: 5, descripcion: "Almohada viscoelástica para soporte cervical óptimo al dormir." },
  { id: "PROD-010", nombre: "Mancuernas Ajustables (Par)", categoria: "Deporte", precio: 180000, stock: 3, descripcion: "Pesas modulares para entrenamiento funcional en casa." },
  { id: "PROD-011", nombre: "Mat de Yoga Antideslizante", categoria: "Deporte", precio: 70000, stock: 10, descripcion: "Tapete ecológico de 6mm de espesor para yoga y pilates." },
  { id: "PROD-012", nombre: "Banda Elástica de Resistencia", categoria: "Deporte", precio: 35000, stock: 20, descripcion: "Kit de 3 bandas con diferentes niveles de tensión para tonificar." }
];

export default function App() {
  const [productos, setProductos] = useState(productosIniciales);
  const [pantalla, setPantalla] = useState('catalogo');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [orden, setOrden] = useState('ninguno');

  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [codigoCupon, setCodigoCupon] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [direccion, setDireccion] = useState('');

  const categorias = ['Todas', 'Tecnología', 'Moda', 'Hogar', 'Deporte'];

  const productosFiltrados = productos.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaActiva === 'Todas' || p.categoria === categoriaActiva;
    return coincideNombre && coincideCategoria;
  }).sort((a, b) => {
    if (orden === 'asc') return a.precio - b.precio;
    if (orden === 'desc') return b.precio - a.precio;
    return 0;
  });

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) {
      Alert.alert("Aviso", "Este producto está agotado.");
      return;
    }
    const itemEnCarrito = carrito.find(item => item.id === producto.id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if (cantidadActual + 1 > producto.stock) {
      Alert.alert("Stock superado", "No puedes agregar más unidades que el stock disponible.");
      return;
    }

    if (itemEnCarrito) {
      setCarrito(carrito.map(item => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { id: producto.id, cantidad: 1 }]);
    }
    Alert.alert("Éxito", "Producto agregado al carrito.");
  };

  const modificarCantidad = (id, delta) => {
    const producto = productos.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    const nuevaCantidad = item.cantidad + delta;
    if (nuevaCantidad <= 0) {
      setCarrito(carrito.filter(i => i.id !== id));
    } else if (nuevaCantidad > producto.stock) {
      Alert.alert("Stock máximo", "Has alcanzado el límite de stock disponible.");
    } else {
      setCarrito(carrito.map(i => i.id === id ? { ...i, cantidad: nuevaCantidad } : i));
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(i => i.id !== id));
  };

  const subtotal = carrito.reduce((sum, item) => {
    const p = productos.find(prod => prod.id === item.id);
    return sum + (p ? p.precio * item.cantidad : 0);
  }, 0);

  const costoEnvio = subtotal === 0 ? 0 : (subtotal >= 150000 ? 0 : 8000);
  const descuentoValor = descuentoAplicado ? subtotal * 0.10 : 0;
  const total = (subtotal - descuentoValor) + costoEnvio;

  const aplicarCupon = () => {
    if (codigoCupon.trim().toUpperCase() === 'BIENVENIDO10') {
      setDescuentoAplicado(true);
      Alert.alert("Cupón aplicado", "Se aplicó el 10% de descuento sobre el subtotal.");
    } else {
      Alert.alert("Cupón inválido", "El código ingresado no es válido o expiró.");
      setDescuentoAplicado(false);
    }
  };

  const confirmarCompra = () => {
    if (!nombre.trim() || !telefono.trim() || !municipio.trim() || !direccion.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los datos obligatorios de entrega.");
      return;
    }

    for (let item of carrito) {
      const p = productos.find(prod => prod.id === item.id);
      if (p.stock < item.cantidad) {
        Alert.alert("Error de stock", `El producto ${p.nombre} ya no tiene suficientes existencias.`);
        return;
      }
    }

    const nuevosProductos = productos.map(p => {
      const itemEnCarrito = carrito.find(i => i.id === p.id);
      if (itemEnCarrito) {
        return { ...p, stock: p.stock - itemEnCarrito.cantidad };
      }
      return p;
    });
    setProductos(nuevosProductos);

    const codigoUnicoPedido = 'PED-' + Math.floor(100000 + Math.random() * 900000);
    const nuevoPedido = {
      codigo: codigoUnicoPedido,
      fecha: new Date().toLocaleString(),
      articulos: [...carrito],
      subtotal,
      envio: costoEnvio,
      descuento: descuentoValor,
      total,
      comprador: { nombre, telefono, municipio, direccion }
    };

    setHistorial([nuevoPedido, ...historial]);
    setCarrito([]);
    setDescuentoAplicado(false);
    setCodigoCupon('');
    setPantalla('catalogo');
    
    Alert.alert(
      "¡Compra Simulada Exitosa!", 
      `Código de pedido: ${codigoUnicoPedido}\nEsta es una simulación académica sin cobro real.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>NovaMarket</Text>
        <Text style={styles.brandSlogan}>Tu tienda móvil de confianza en Cundinamarca</Text>
      </View>

      <View style={styles.navBar}>
        <Pressable style={[styles.navButton, pantalla === 'catalogo' && styles.navActive]} onPress={() => setPantalla('catalogo')}>
          <Text style={styles.navText}>Catálogo</Text>
        </Pressable>
        <Pressable style={[styles.navButton, pantalla === 'favoritos' && styles.navActive]} onPress={() => setPantalla('favoritos')}>
          <Text style={styles.navText}>Favoritos ({favoritos.length})</Text>
        </Pressable>
        <Pressable style={[styles.navButton, pantalla === 'carrito' && styles.navActive]} onPress={() => setPantalla('carrito')}>
          <Text style={styles.navText}>Carrito ({carrito.reduce((acc, i) => acc + i.cantidad, 0)})</Text>
        </Pressable>
        <Pressable style={[styles.navButton, pantalla === 'historial' && styles.navActive]} onPress={() => setPantalla('historial')}>
          <Text style={styles.navText}>Historial</Text>
        </Pressable>
      </View>

      {pantalla === 'catalogo' && (
        <View style={{ flex: 1 }}>
          <TextInput 
            style={styles.input}
            placeholder="Buscar producto por nombre..."
            value={busqueda}
            onChangeText={setBusqueda}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catScrollContent}>
            {categorias.map(cat => (
              <Pressable 
                key={cat} 
                style={[styles.catChip, categoriaActiva === cat && styles.catChipActive]}
                onPress={() => setCategoriaActiva(cat)}
              >
                <Text style={[styles.catText, categoriaActiva === cat && styles.catTextActive]}>{cat}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Ordenar:</Text>
            <Pressable style={[styles.sortBtn, orden === 'asc' && styles.sortBtnActive]} onPress={() => setOrden('asc')}>
              <Text style={styles.sortBtnText}>Menor a mayor</Text>
            </Pressable>
            <Pressable style={[styles.sortBtn, orden === 'desc' && styles.sortBtnActive]} onPress={() => setOrden('desc')}>
              <Text style={styles.sortBtnText}>Mayor a menor</Text>
            </Pressable>
            {orden !== 'ninguno' && (
              <Pressable style={styles.sortBtnClear} onPress={() => setOrden('ninguno')}>
                <Text style={styles.sortBtnText}>Limpiar</Text>
              </Pressable>
            )}
          </View>

          {productosFiltrados.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No encontramos productos</Text>
            </View>
          ) : (
            <FlatList
              data={productosFiltrados}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const esFavorito = favoritos.includes(item.id);
                return (
                  <View style={styles.card}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardCategory}>{item.categoria}</Text>
                      <Text style={styles.cardTitle}>{item.nombre}</Text>
                      <Text style={styles.cardPrice}>${item.precio.toLocaleString()} COP</Text>
                      <Text style={styles.cardStock}>Stock disponible: {item.stock}</Text>
                    </View>
                    <View style={styles.cardActions}>
                      <Pressable style={styles.iconBtn} onPress={() => toggleFavorito(item.id)}>
                        <Text style={{ fontSize: 18 }}>{esFavorito ? '❤️' : '🤍'}</Text>
                      </Pressable>
                      <Pressable style={styles.detailBtn} onPress={() => { setProductoSeleccionado(item); setPantalla('detalle'); }}>
                        <Text style={styles.detailBtnText}>Ver más</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      )}

      {pantalla === 'detalle' && productoSeleccionado && (
        <ScrollView style={styles.containerPad}>
          <Pressable style={styles.backBtn} onPress={() => setPantalla('catalogo')}>
            <Text style={styles.backBtnText}>← Volver al catálogo</Text>
          </Pressable>
          <View style={styles.detailCard}>
            <Text style={styles.detailCategory}>{productoSeleccionado.categoria}</Text>
            <Text style={styles.detailTitle}>{productoSeleccionado.nombre}</Text>
            <Text style={styles.detailPrice}>${productoSeleccionado.precio.toLocaleString()} COP</Text>
            <Text style={styles.detailStock}>
              {productoSeleccionado.stock > 0 ? `Stock disponible: ${productoSeleccionado.stock}` : '⚠️ AGOTADO'}
            </Text>
            <Text style={styles.detailDescTitle}>Descripción:</Text>
            <Text style={styles.detailDesc}>{productoSeleccionado.descripcion}</Text>

            <Pressable 
              style={[styles.primaryBtn, productoSeleccionado.stock === 0 && styles.disabledBtn]} 
              onPress={() => agregarAlCarrito(productoSeleccionado)}
              disabled={productoSeleccionado.stock === 0}
            >
              <Text style={styles.primaryBtnText}>
                {productoSeleccionado.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}

      {pantalla === 'favoritos' && (
        <View style={{ flex: 1, padding: 15 }}>
          <Text style={styles.sectionTitle}>Mis Productos Favoritos</Text>
          {favoritos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tienes productos guardados en favoritos.</Text>
              <Pressable style={styles.secondaryBtn} onPress={() => setPantalla('catalogo')}>
                <Text style={styles.secondaryBtnText}>Ir al Catálogo</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList
              data={productos.filter(p => favoritos.includes(p.id))}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.nombre}</Text>
                    <Text style={styles.cardPrice}>${item.precio.toLocaleString()} COP</Text>
                  </View>
                  <Pressable style={styles.dangerBtn} onPress={() => toggleFavorito(item.id)}>
                    <Text style={styles.dangerBtnText}>Quitar</Text>
                  </Pressable>
                </View>
              )}
            />
          )}
        </View>
      )}

      {pantalla === 'carrito' && (
        <ScrollView style={styles.containerPad}>
          <Text style={styles.sectionTitle}>Carrito de Compras</Text>
          {carrito.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
              <Pressable style={styles.secondaryBtn} onPress={() => setPantalla('catalogo')}>
                <Text style={styles.secondaryBtnText}>Explorar Catálogo</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {carrito.map(item => {
                const p = productos.find(prod => prod.id === item.id);
                if (!p) return null;
                return (
                  <View key={item.id} style={styles.cartCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cartItemTitle}>{p.nombre}</Text>
                      <Text style={styles.cartItemPrice}>${p.precio.toLocaleString()} c/u</Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <Pressable style={styles.qBtn} onPress={() => modificarCantidad(item.id, -1)}><Text>-</Text></Pressable>
                      <Text style={styles.qText}>{item.cantidad}</Text>
                      <Pressable style={styles.qBtn} onPress={() => modificarCantidad(item.id, 1)}><Text>+</Text></Pressable>
                    </View>
                    <Pressable onPress={() => eliminarDelCarrito(item.id)} style={{ marginLeft: 10 }}>
                      <Text style={{ color: 'red', fontWeight: 'bold' }}>Eliminar</Text>
                    </Pressable>
                  </View>
                );
              })}

              <View style={styles.couponContainer}>
                <TextInput 
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Código de cupón (ej: BIENVENIDO10)"
                  value={codigoCupon}
                  onChangeText={setCodigoCupon}
                />
                <Pressable style={styles.couponBtn} onPress={aplicarCupon}>
                  <Text style={styles.couponBtnText}>Aplicar</Text>
                </Pressable>
              </View>

              <View style={styles.summaryContainer}>
                <Text style={styles.summaryRow}>Subtotal: ${subtotal.toLocaleString()} COP</Text>
                {descuentoAplicado && <Text style={[styles.summaryRow, { color: 'green' }]}>Descuento (10%): -${descuentoValor.toLocaleString()} COP</Text>}
                <Text style={styles.summaryRow}>
                  Envío: {costoEnvio === 0 ? '¡GRATIS!' : `$${costoEnvio.toLocaleString()} COP`} 
                </Text>
                <Text style={styles.summaryTotal}>Total: ${total.toLocaleString()} COP</Text>
                <Text style={styles.shippingNote}>
                  {subtotal >= 150000 ? '✨ ¡Felicidades! Tienes envío gratis.' : '💡 Agrega más productos para obtener envío gratis desde $150.000'}
                </Text>
              </View>

              <Pressable style={styles.primaryBtn} onPress={() => setPantalla('checkout')}>
                <Text style={styles.primaryBtnText}>Continuar con Datos de Envío</Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      )}

      {pantalla === 'checkout' && (
        <ScrollView style={styles.containerPad}>
          <Pressable style={styles.backBtn} onPress={() => setPantalla('carrito')}>
            <Text style={styles.backBtnText}>← Volver al carrito</Text>
          </Pressable>
          <Text style={styles.sectionTitle}>Datos de Contacto y Entrega</Text>
          <Text style={styles.disclaimerText}>Nota académica: No se solicitan datos bancarios ni contraseñas reales.</Text>

          <TextInput style={styles.input} placeholder="Nombre completo *" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Teléfono de contacto *" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} />
          <TextInput style={styles.input} placeholder="Municipio (Ej: Mosquera, Madrid, Funza) *" value={municipio} onChangeText={setMunicipio} />
          <TextInput style={styles.input} placeholder="Dirección de entrega *" value={direccion} onChangeText={setDireccion} />

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTotal}>Total a pagar: ${total.toLocaleString()} COP</Text>
          </View>

          <Pressable style={styles.primaryBtn} onPress={confirmarCompra}>
            <Text style={styles.primaryBtnText}>Confirmar Compra Simulada</Text>
          </Pressable>
        </ScrollView>
      )}

      {pantalla === 'historial' && (
        <ScrollView style={styles.containerPad}>
          <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
          {historial.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay pedidos registrados en la simulación.</Text>
              <Pressable style={styles.secondaryBtn} onPress={() => setPantalla('catalogo')}>
                <Text style={styles.secondaryBtnText}>Ir a Comprar</Text>
              </Pressable>
            </View>
          ) : (
            historial.map((ped, index) => (
              <View key={index} style={styles.historyCard}>
                <Text style={styles.historyCode}>Código: {ped.codigo}</Text>
                <Text style={styles.historyDate}>Fecha: {ped.fecha}</Text>
                <Text style={styles.historyBuyer}>Destinatario: {ped.comprador.nombre} ({ped.comprador.municipio})</Text>
                <Text style={styles.historyTotal}>Total pagado: ${ped.total.toLocaleString()} COP</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: { backgroundColor: '#1e293b', padding: 15, alignItems: 'center' },
  brandTitle: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' },
  brandSlogan: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  navBar: { flexDirection: 'row', backgroundColor: '#334155' },
  navButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  navActive: { backgroundColor: '#0f172a', borderBottomWidth: 3, borderBottomColor: '#38bdf8' },
  navText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  containerPad: { padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 14 },
  catScroll: { maxHeight: 50, marginBottom: 10 },
  catScrollContent: { paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row' },
  catChip: { backgroundColor: '#e2e8f0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 8, justifyContent: 'center' },
  catChipActive: { backgroundColor: '#c70202' },
  catText: { color: '#334155', fontWeight: '600' },
  catTextActive: { color: '#ffffff' },
  sortContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' },
  sortLabel: { fontSize: 12, fontWeight: 'bold', marginRight: 5 },
  sortBtn: { backgroundColor: '#e2e8f0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginRight: 5, marginBottom: 5 },
  sortBtnActive: { backgroundColor: '#a10303' },
  sortBtnClear: { backgroundColor: '#f87171', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginBottom: 5 },
  sortBtnText: { fontSize: 11, color: '#334155' },
  card: { backgroundColor: '#ffffff', borderRadius: 8, padding: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  cardCategory: { fontSize: 10, color: '#c7020295', fontWeight: 'bold', textTransform: 'uppercase' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginVertical: 2 },
  cardPrice: { fontSize: 14, fontWeight: '600', color: '#16a34a' },
  cardStock: { fontSize: 11, color: '#64748b' },
  cardActions: { alignItems: 'flex-end' },
  iconBtn: { padding: 5, marginBottom: 5 },
  detailBtn: { backgroundColor: '#c70202', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  detailBtnText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#64748b', marginBottom: 15 },
  backBtn: { marginBottom: 10 },
  backBtnText: { color: '#0284c7', fontWeight: 'bold', fontSize: 14 },
  detailCard: { backgroundColor: '#ffffff', padding: 20, borderRadius: 10, elevation: 3 },
  detailCategory: { fontSize: 12, color: '#0284c7', fontWeight: 'bold' },
  detailTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginVertical: 5 },
  detailPrice: { fontSize: 18, fontWeight: 'bold', color: '#16a34a', marginBottom: 10 },
  detailStock: { fontSize: 14, color: '#64748b', marginBottom: 15 },
  detailDescTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
  detailDesc: { fontSize: 14, color: '#475569', marginBottom: 20, lineHeight: 20 },
  primaryBtn: { backgroundColor: '#16a34a', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  disabledBtn: { backgroundColor: '#94a3b8' },
  primaryBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  secondaryBtn: { backgroundColor: '#0284c7', padding: 10, borderRadius: 8 },
  secondaryBtnText: { color: '#ffffff', fontWeight: 'bold' },
  dangerBtn: { backgroundColor: '#fee2e2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  dangerBtnText: { color: '#dc2626', fontSize: 12, fontWeight: 'bold' },
  cartCard: { backgroundColor: '#ffffff', padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  cartItemTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },
  cartItemPrice: { fontSize: 12, color: '#64748b' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 6, paddingHorizontal: 8 },
  qBtn: { padding: 6 },
  qText: { paddingHorizontal: 10, fontWeight: 'bold' },
  couponContainer: { flexDirection: 'row', marginVertical: 10 },
  couponBtn: { backgroundColor: '#c70202', justifyContent: 'center', paddingHorizontal: 15, borderRadius: 8, marginLeft: 5 },
  couponBtnText: { color: '#ffffff', fontWeight: 'bold' },
  summaryContainer: { backgroundColor: '#ffffff', padding: 15, borderRadius: 8, marginTop: 10, elevation: 1 },
  summaryRow: { fontSize: 14, color: '#334155', marginBottom: 5 },
  summaryTotal: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginTop: 5 },
  shippingNote: { fontSize: 11, color: '#0284c7', marginTop: 5, fontStyle: 'italic' },
  disclaimerText: { fontSize: 11, color: '#64748b', fontStyle: 'italic', marginBottom: 10 },
  historyCard: { backgroundColor: '#ffffff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 1 },
  historyCode: { fontSize: 14, fontWeight: 'bold', color: '#0284c7' },
  historyDate: { fontSize: 12, color: '#64748b', marginVertical: 2 },
  historyBuyer: { fontSize: 12, color: '#334155' },
  historyTotal: { fontSize: 14, fontWeight: 'bold', color: '#16a34a', marginTop: 5 }
});