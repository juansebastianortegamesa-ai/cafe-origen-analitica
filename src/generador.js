const ventas = require("./datos");
const listaProductos = ventas.map(venta => venta.producto.trim());
const listaCiudades = ventas.map(venta => venta.ciudad.trim().toLowerCase());

const productosUnicos = [...new Set(listaProductos)];
const ciudadesUnicas = [...new Set(listaCiudades)].map(ciudad => ciudad.charAt(0).toUpperCase() + ciudad.slice(1));
const preciosPorProducto = new Map(ventas.map(venta => [venta.producto, venta.precio]));

function generadordeVentas(n) {
    let ventasAL = [];
    const totalClientes = Math.max(8, Math.floor(n * 0.7));

    for (let i = 0; i < n; i++) {
        let indiceProducto = Math.floor(Math.random() * productosUnicos.length);
        let indiceCiudad = Math.floor(Math.random() * ciudadesUnicas.length);
        let productoSeleccionado = productosUnicos[indiceProducto];

        let cantidadAleatoria = Math.floor(Math.random() * 5) + 1;
        let precioAleatorio = preciosPorProducto.get(productoSeleccionado);
        let diaAleatorio = String(Math.floor(Math.random() * 30) + 1).padStart(2, "0");
        let numeroCliente = Math.floor(Math.random() * totalClientes) + 1;

        let nuevaVenta = {
            id: i + 1,
            fecha: `2026-09-${diaAleatorio}`,
            cliente: `C${String(numeroCliente).padStart(2, "0")}`,
            producto: productoSeleccionado,
            ciudad: ciudadesUnicas[indiceCiudad],
            cantidad: cantidadAleatoria,
            precio: precioAleatorio
        };

        ventasAL.push(nuevaVenta);
    }

    return ventasAL;
}

module.exports = { generadordeVentas };

if (require.main === module) {
    console.log("Ejecutando pruebas locales de generador.js...");
    const ventasDePrueba = generadordeVentas(5);
    console.table(ventasDePrueba);
}