const ventas = require("./datos");

// Normalizamos ciudades para evitar duplicados como "medellín" y "Medellín"
const normalizarTexto = (texto) => {
    const limpio = texto.trim().toLowerCase();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
};

const productosUnicos = [...new Set(ventas.map(v => v.producto.trim()))];
const ciudadesUnicas = [...new Set(ventas.map(v => normalizarTexto(v.ciudad)))];

function generadordeVentas(n) {
    const ventasAL = [];
    // Escalamos el pool de clientes según n para que existan tanto recurrentes como únicos
    const totalClientesPosibles = Math.max(10, Math.floor(n * 0.6));

    for (let i = 0; i < n; i++) {
        const indiceProducto = Math.floor(Math.random() * productosUnicos.length);
        const indiceCiudad = Math.floor(Math.random() * ciudadesUnicas.length);

        // Genera un día aleatorio entre 1 y 30 en formato "2026-09-DD"
        const diaAleatorio = String(Math.floor(Math.random() * 30) + 1).padStart(2, "0");
        
        // Genera códigos de cliente dinámicos (ej. C001, C045...)
        const numeroCliente = Math.floor(Math.random() * totalClientesPosibles) + 1;
        const clienteFormateado = `C${String(numeroCliente).padStart(2, "0")}`;

        const cantidadAleatoria = Math.floor(Math.random() * 5) + 1;
        const precioAleatorio = Math.floor(Math.random() * 10) * 10000 + 26000;

        ventasAL.push({
            id: i + 1,
            fecha: `2026-09-${diaAleatorio}`,
            cliente: clienteFormateado,
            producto: productosUnicos[indiceProducto],
            ciudad: ciudadesUnicas[indiceCiudad],
            cantidad: cantidadAleatoria,
            precio: precioAleatorio
        });
    }

    return ventasAL;
}

module.exports = { generadordeVentas };

if (require.main === module) {
    console.log("Ejecutando pruebas locales de generador.js...");
    const ventasDePrueba = generadordeVentas(5);
    console.table(ventasDePrueba);
}