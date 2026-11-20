const analitica = require('./analitica');
const ventas = require('./datos'); 

function comparar(nombre, resultadoViejo, resultadoNuevo) {
    const strViejo = JSON.stringify(resultadoViejo);
    const strNuevo = JSON.stringify(resultadoNuevo);

    if (strViejo === strNuevo) {
      
        console.log("[OK] " + nombre + ": Coinciden");
    } else {
     
        console.log("[DIFERENTE] " + nombre + ": No coinciden");
    }
}

console.log("========================================");
console.log("VERIFICACION DE METODOS y BUCLES");
console.log("========================================");

comparar("totalVendido", analitica.totalVendido(ventas), analitica.totalVendidoM(ventas));
comparar("unidadesVendidas", analitica.unidadesVendidas(ventas), analitica.unidadesVendidasM(ventas));
comparar("ventasPorCiudad (Medellin)", analitica.ventasPorCiudad(ventas, "Medellín"), analitica.ventasPorCiudadM(ventas, "Medellín"));

console.log("========================================");
console.log("PRUEBAS DE AGRUPACION Y RANKING");
console.log("========================================");

console.log("Total por Ciudad:", analitica.totalPorCiudad(ventas));
console.log("Unidades por Producto:", analitica.unidadesPorProducto(ventas));
console.log("Top 3 Productos por Valor:", analitica.topProductosPorValor(ventas, 3));

console.log("========================================");
console.log("verificar inmutabilidad del arreglo");
console.log("========================================");

console.log("Primera venta original (debe ser ID 1):", ventas[0].id);


