// MINI RETO 7
const { generadordeVentas } = require("../generador");
const { separadoruno }= require("../analitica")


// totalCiudadcadena //
function totalCiudadCadena(ventas, ciudad) {
    const ciudadBuscada = ciudad.toLowerCase().trim();

    return ventas
        .map(venta => ({...venta, ciudad: venta.ciudad.toLowerCase().trim()})) 
        .filter(venta => venta.ciudad === ciudadBuscada) 
        .map(venta => venta.cantidad * venta.precio)
        .reduce((acumulador, valorVenta) => acumulador + valorVenta, 0); 
}

// 
function totalCiudadUnPasada(ventas, ciudad) {
    let totalCiudad = 0;
    const ciudadBuscada = ciudad.toLowerCase().trim();

    for (const venta of ventas) { // Traversal 1 (Único)
        const ciudadVenta = venta.ciudad.toLowerCase().trim();
        if (ciudadVenta === ciudadBuscada) {
            totalCiudad += venta.cantidad * venta.precio;
        }
    }
    return totalCiudad;
}

// EJECUCIÓN DE lAS PRUEBAS //

separadoruno();
console.log("MINI RETO 7");
separadoruno();

separadoruno();
console.log("10,000 ventas aleatorias");
const ventas10k = generadordeVentas(10000);
const ciudadPrueba = "Medellín";
console.log(`Ciudad a buscar: "${ciudadPrueba}"\n`);
separadoruno();

// Medimos y ejecutamos la versión Cadena
separadoruno();
console.time("Tiempo totalCiudadCadena");
const resultadoCadena = totalCiudadCadena(ventas10k, ciudadPrueba);
console.timeEnd("Tiempo totalCiudadCadena");
separadoruno();


// Medimos y ejecutamos la versión Un Pasada
separadoruno();

console.time("Tiempo totalCiudadUnPasada");
const resultadoUnPasada = totalCiudadUnPasada(ventas10k, ciudadPrueba);
console.timeEnd("Tiempo totalCiudadUnPasada");
separadoruno();



console.log("RESULTADOS OBTENIDOS:");
console.log(`Resultado Cadena:   $${resultadoCadena}`);
console.log(`Resultado UnPasada: $${resultadoUnPasada}`);

// Comprobación de igualdad
separadoruno();
const sonIguales = resultadoCadena === resultadoUnPasada;
console.log(`Coinciden exactamente?: ${sonIguales ? "SÍ" : "NO"}`);
separadoruno();
