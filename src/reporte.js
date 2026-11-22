const ventas = require("./datos");
const {
    separadoruno,
    separadordos,
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica");

// 1. Función para dar formato de moneda colombiana
const formatoCOP = (valor) => `$ ${valor.toLocaleString("es-CO")}`;


// 2. SECCION 1: Resumen General
console.log("RESUMEN GENERAL");
separadoruno();
const totalDinero = totalVendidoM(ventas);
console.log(`Total vendido en el periodo: ${formatoCOP(totalDinero)}`);



// SECCION 2: Ventas por Ciudad
console.log("VENTAS POR CIUDAD");
separadoruno();
const ventasCiudades = totalPorCiudad(ventas); 
for (const [ciudad, total] of Object.entries(ventasCiudades)) {
    console.log(`${ciudad.padEnd(12)} : ${formatoCOP(total)}`);
}

// 4. SECCION 3: Unidades por Producto
console.log("UNIDADES VENDIDAS POR PRODUCTO");
separadoruno();
console.table(unidadesPorProducto(ventas));

// TOP DE LOS PRODUCTOS QUE MAS GANARON //

console.log("TOP 3 PRODUCTOS QUE MAS DINERO GENERARON ");
separadoruno();
const top3 = topProductosPorValor(ventas, 3);

const top3Formateado = top3.map((producto) => ({
    Producto: producto.nombre,
    Valor: formatoCOP(producto.valor) 
}));
console.table(top3Formateado);

// Reporte de días (Caso con ventas y caso vacío) //

console.log("REPORTE DE VENTAS POR DIA");
separadoruno();

const diaConVentas = "2026-09-01";
const reporteDia1 = ventasDelDia(ventas, diaConVentas);
console.log(`Dia: ${diaConVentas}`);
console.log(`  Total: ${formatoCOP(reporteDia1.total)} | Unidades: ${reporteDia1.unidades}`);

const diaVacio = "2026-12-25";
const reporteDia2 = ventasDelDia(ventas, diaVacio);
console.log(`\nDia: ${diaVacio} (Sin registros)`);
console.log(`  Total: ${formatoCOP(reporteDia2.total)} | Unidades: ${reporteDia2.unidades}`);



