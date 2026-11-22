const analitica = require('./analitica');
const ventas = require('./datos'); 

function comparar(nombre, resultadoViejo, resultadoNuevo) {
    const strViejo = JSON.stringify(resultadoViejo);
    const strNuevo = JSON.stringify(resultadoNuevo);

    if (strViejo === strNuevo) {
        console.log("OK");
    } else {
        console.log("DIFERENTE");
    }
}

console.log("========================================");
console.log("VERIFICACION DE METODOS y BUCLES");
console.log("========================================");

comparar("totalVendido", analitica.totalVendido(ventas), analitica.totalVendidoM(ventas));
comparar("unidadesVendidas", analitica.unidadesVendidas(ventas), analitica.unidadesVendidasM(ventas));
comparar("ventasPorCiudad", analitica.ventasPorCiudad(ventas, "Medellín"), analitica.ventasPorCiudadM(ventas, "Medellín"));

console.log("========================================");
console.log("VERIFICANDO INMUTABILIDAD DEL ARREGLO");
console.log("========================================");
console.log("Primera venta original (debe ser ID 1):", ventas[0].id);

