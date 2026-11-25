const analitica = require("./analitica");
const ventasReales = require("./datos");
const { generadordeVentas } = require("./generador");
const catalogo = require("./catalogo");

// Lectura de parametros con process.argv
const argumento = process.argv[2];
let ventasAProcesar = ventasReales;

if (argumento) {
    const cantidad = parseInt(argumento, 10);
    if (!isNaN(cantidad) && cantidad > 0) {
        ventasAProcesar = generadordeVentas(cantidad);
    }
}

const formatoCOP = (valor) => `$ ${valor.toLocaleString("es-CO")}`;

const inicioTiempo = performance.now();

console.log("REPORTE ANALITICA CAFE ORIGEN v1.0");
console.log(`Fuente: ${argumento ? "Datos generados" : "Dia 1 Real"} | Registros: ${ventasAProcesar.length}`);

// Seccion 1: Resumen general
console.log("RESUMEN GENERAL");
console.log(`Total vendido: ${formatoCOP(analitica.totalVendidoM(ventasAProcesar))}`);
console.log(`Unidades vendidas: ${analitica.unidadesVendidasM(ventasAProcesar)}`);

// Seccion 2: Ventas por ciudad
console.log(" VENTAS POR CIUDAD");
const ventasCiudades = analitica.totalPorCiudad(ventasAProcesar);
for (const [ciudad, total] of Object.entries(ventasCiudades)) {
    console.log(`${ciudad.padEnd(12)} : ${formatoCOP(total)}`);
}

// Seccion 3: Top productos
console.log("TOP 3 PRODUCTOS");
const top3 = analitica.topProductosPorValor(ventasAProcesar, 3);
console.table(top3.map(p => ({ Producto: p.nombre, Valor: formatoCOP(p.valor) })));

// Seccion 4: Clientes recurrentes
console.log("CLIENTES RECURRENTES");
const recurrentes = analitica.clientesRecurrentesSet(ventasAProcesar);
console.log(`Cantidad: ${recurrentes.length} | Primeros 10: [${recurrentes.slice(0, 10).join(", ")}]`);

// Seccion 5: Producto estrella por ciudad
console.log("PRODUCTO ESTRELLA POR CIUDAD");
console.table(analitica.productoEstrellaPorCiudad(ventasAProcesar));

// Seccion 6: Combo de regalo sugerido
console.log("COMBO DE REGALO SUGERIDO ($87.000)");
const combo = analitica.comboRegalo(catalogo, 87000);
if (combo) {
    console.log(`Sugerencia: ${combo[0].producto} + ${combo[1].producto} | Total: ${formatoCOP(combo[0].precio + combo[1].precio)}`);
} else {
    console.log("No se encontro combinacion.");
}

// Seccion 7: Cliente para cupon
console.log("CLIENTE PARA CUPON (PRIMER CLIENTE UNICO)");
console.log(`Cliente: ${analitica.primerClienteUnico(ventasAProcesar)}`);

// Seccion 8: Mejor semana
console.log("MEJOR SEMANA DE VENTAS (SEPTIEMBRE, k=7)");
const mejorRacha = analitica.mejorSemana(analitica.ventasDiarias, 7);
if (mejorRacha) {
    console.log(`Mejor semana iniciando en el dia ${mejorRacha.mejorInicio + 1} (indice ${mejorRacha.mejorInicio}) | Total: $${mejorRacha.maxTotal} mil`);
}

const finTiempo = performance.now();
console.log(`TIEMPO TOTAL: ${(finTiempo - inicioTiempo).toFixed(2)} ms`);