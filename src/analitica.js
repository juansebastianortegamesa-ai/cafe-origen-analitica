const ventas = require("./datos")

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

//funciones  mini reto 2//

// 2. Total Vendido (ACUMULADOR) //
function totalVendido(ventas) {
    let acumuladorTotal = 0; 
    for (const venta of ventas) {
        acumuladorTotal += valorVenta(venta);
    }
    return acumuladorTotal;
}

// 3. Unidades Vendidas (ACUMULADOR) //
function unidadesVendidas(ventas) {
    let totalUnidades = 0;
    for (const venta of ventas) {
        totalUnidades += venta.cantidad;
    }
    return totalUnidades;
}

// 4. Venta Mayor //
function ventaMayor(ventas) {

    if (ventas.length === 0) return 0; 

    let valorMaximo = 0;
    let registroCompleto = null; 

    for (const venta of ventas) {
        const valorActual = valorVenta(venta); 
        if (valorActual > valorMaximo) {
            valorMaximo = valorActual; 
            registroCompleto = venta;  
        }
    }
    return registroCompleto;
}

// 5. Ticket Promedio //
function ticketPromedio(ventas) {
//esto para que recorra la tabla y de 0 //
    if (ventas.length === 0) return 0; 

    let dineroTotal = totalVendido(ventas); 
    let ventasValidas = 0; // CONTADOR

    for (const venta of ventas) {
  
        if (venta.cantidad > 0) { 
            ventasValidas++; 
        }
    }

    if (ventasValidas === 0) return 0; 

    return dineroTotal / ventasValidas; 
}


function ventasPorCiudad(ventas, ciudadBuscada) {
    if (!ciudadBuscada || ventas.length === 0) return 0;

    let totalCiudad = 0;
    const ciudadLimpia = ciudadBuscada.toLowerCase().trim();

    for (const venta of ventas) {
        const ciudadEnBaseDeDatos = venta.ciudad.toLowerCase().trim();

        if (ciudadEnBaseDeDatos === ciudadLimpia) {
            totalCiudad += valorVenta(venta);
        }
    }
    return totalCiudad;
}

//exepciones para lo de la tabla de entrada//
const unaVenta =[ventas[0]]
const sinVentas =[];


//tabla de funciones con las entradas//
//seccion de las entradas con el arreglo completo//
console.log("================================")
console.log("pruebas con arreglo completo")
console.log("================================")

console.log("totalvendido:",totalVendido(ventas));
console.log("--------------------------------------")

console.log("unidadesvendidas:", unidadesVendidas(ventas));
console.log("-----------------------------------")

console.log("venta mayor:", ventaMayor(ventas));
console.log("----------------------------------")

console.log("tiket promedio:", ticketPromedio(ventas));
console.log("-----------------------------------")

console.log("ventas por ciudad:", ventasPorCiudad(ventas, "Medellín"));
console.log("---------------------------------")


// seccion de las entradas con arreglo de un solo elemento //
console.log("================================")
console.log("pruebas con un solo elemento")
console.log("================================")

console.log("total vendido de una venta (por un solo elemento):", totalVendido(unaVenta));
console.log("-------------------------------------------------")
console.log("unidades vendidas (por una solo elemento):", unidadesVendidas(unaVenta));
console.log("-----------------------------------------------")
console.log("venta mayor (por elemento):", ventaMayor(unaVenta));
console.log("----------------------------------------------")
console.log("ticket promedio (por elemento):", ticketPromedio(unaVenta));
console.log("----------------------------------------------")
console.log("ventas por ciudad (por elemento):", ventasPorCiudad(unaVenta, "medellín"));
console.log("----------------------------------------------")


//seccion de entradas por arreglos vacios//
console.log("================================")
console.log("arreglos vacios")
console.log("================================")

console.log("total vendido(vacio):", totalVendido(sinVentas));
console.log("---------------------------------------------------")
console.log("unidades vendidas (vacio):", unidadesVendidas(sinVentas));
console.log("------------------------------------------------------")
console.log("venta mayor (vacio):", ventaMayor(sinVentas));
console.log("------------------------------------------------------")
console.log("ticket promedio (vacio):", ticketPromedio(sinVentas));
console.log("------------------------------------------------------")
console.log("ventas por ciudad (vacio):", ventasPorCiudad(sinVentas, "medellín"));
console.log("------------------------------------------------------")

console.log("================================")





