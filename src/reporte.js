// src/reporte.js
const analitica = require("./analitica");
const ventasReales = require("./datos");
const { generadordeVentas } = require("./generador");
const catalogo = require("./catalogo");

// 1. (process.argv)
const argumento = process.argv[2]; 
let ventasAProcesar = ventasReales; 

if (argumento) {
    const cantidad = parseInt(argumento, 10); 
    if (!isNaN(cantidad) && cantidad > 0) {
        ventasAProcesar = generadordeVentas(cantidad);
    }
}

// Función auxiliar para dar formato de moneda colombiana
const formatoCOP = (valor) => `$ ${valor.toLocaleString("es-CO")}`;

//  INICIO DE MEDICIÓN DE TIEMPO TOTAL (Requisito: < 5 segundos) //
const inicioTiempo = performance.now();

console.log("==========================================");
console.log(`REPORTE ANALÍTICA CAFÉ ORIGEN v1.0`);
console.log(`Fuente: ${argumento ? "Datos generados" : "Día 1 Real"} | Registros: ${ventasAProcesar.length}`);
console.log("==========================================\n");

// SECCIÓN 1: RESUMEN GENERAL
console.log("--- RESUMEN GENERAL ---");
console.log(`Total vendido: ${formatoCOP(analitica.totalVendidoM(ventasAProcesar))}`);
console.log(`Unidades vendidas: ${analitica.unidadesVendidasM(ventasAProcesar)}`);

// SECCIÓN 2: VENTAS POR CIUDAD
console.log("\n--- VENTAS POR CIUDAD ---");
const ventasCiudades = analitica.totalPorCiudad(ventasAProcesar);
for (const [ciudad, total] of Object.entries(ventasCiudades)) {
    console.log(`${ciudad.padEnd(12)} : ${formatoCOP(total)}`);
}

// SECCIÓN 3: TOP PRODUCTOS
console.log("\n--- TOP 3 PRODUCTOS ---");
const top3 = analitica.topProductosPorValor(ventasAProcesar, 3);
console.table(top3.map(p => ({ Producto: p.nombre, Valor: formatoCOP(p.valor) })));

// SECCIÓN 4: CLIENTES RECURRENTES (Usando Set O(n))
console.log("\n--- CLIENTES RECURRENTES ---");
const recurrentes = analitica.clientesRecurrentesOptimizado(ventasAProcesar);
console.log(`Cantidad: ${recurrentes.length} | Listado: [${recurrentes.join(", ")}]`);

// SECCIÓN 5: PRODUCTO ESTRELLA POR CIUDAD (Usando Map O(n))
console.log("\n--- PRODUCTO ESTRELLA POR CIUDAD ---");
console.table(analitica.productoEstrellaPorCiudad(ventasAProcesar));

// SECCIÓN 6: COMBO DE REGALO SUGERIDO (Usando parMasCercano O(n log n))
console.log("\n--- COMBO DE REGALO SUGERIDO (Presupuesto $100,000) ---");
const combo = analitica.parMasCercano(catalogo, 100000); 
if (combo) {
    console.log(`Sugerencia: ${combo[0].producto} + ${combo[1].producto} | Total: ${formatoCOP(combo[0].precio + combo[1].precio)}`);
} else {
    console.log("No se encontró combinación.");
}

// SECCIÓN 7: PRIMER CLIENTE ÚNICO (Usando Map O(n))
console.log("\n--- PRIMER CLIENTE ÚNICO ---");
console.log(`Cliente: ${analitica.primerClienteUnico(ventasAProcesar)}`);

// SECCIÓN 8: MEJOR RACHA DE 3 DÍAS 
console.log("\n--- MEJOR RACHA DE 3 DÍAS ---"); 

// Agrupamos los totales reales por fecha usando un Map
const totalesPorFecha = new Map();
for (const venta of ventasAProcesar) {
    const totalVenta = venta.cantidad * venta.precio;
    totalesPorFecha.set(venta.fecha, (totalesPorFecha.get(venta.fecha) || 0) + totalVenta);
}

// Convertimos a un arreglo de totales diarios
const ventasDiariasReales = Array.from(totalesPorFecha.values());

if (ventasDiariasReales.length >= 3) {
    const mejorRacha = analitica.mejorSemana(ventasDiariasReales, 3);
    console.log(`Mejor racha de 3 días iniciando en el índice ${mejorRacha.mejorInicio} (Total: ${formatoCOP(mejorRacha.maxTotal)})`);
} else {
    console.log("No hay suficientes días para calcular una racha.");
}

// --- FIN DE MEDICIÓN DE TIEMPO ---
const finTiempo = performance.now();
console.log(`\n==========================================`);
console.log(`TIEMPO TOTAL: ${(finTiempo - inicioTiempo).toFixed(2)} ms`);
console.log(`==========================================`);


