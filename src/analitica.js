const separadoruno = () => console.log("--------------------------------------");
const separadordos = () => console.log("===========================================");

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
separadordos();
console.log("pruebas con arreglo completo")
separadordos();

console.log("totalvendido:",totalVendido(ventas));
separadordos();

console.log("unidadesvendidas:", unidadesVendidas(ventas));
separadoruno();


console.log("venta mayor:", ventaMayor(ventas));
separadoruno();


console.log("tiket promedio:", ticketPromedio(ventas));
separadoruno();


console.log("ventas por ciudad:", ventasPorCiudad(ventas, "Medellín"));
separadoruno();


// seccion de las entradas con arreglo de un solo elemento //
separadordos();
console.log("pruebas con un solo elemento")
separadordos();

console.log("total vendido de una venta (por un solo elemento):", totalVendido(unaVenta));
separadoruno();

console.log("unidades vendidas (por una solo elemento):", unidadesVendidas(unaVenta));
separadoruno();

console.log("venta mayor (por elemento):", ventaMayor(unaVenta));
separadoruno();

console.log("ticket promedio (por elemento):", ticketPromedio(unaVenta));
separadoruno();

console.log("ventas por ciudad (por elemento):", ventasPorCiudad(unaVenta, "medellín"));
separadoruno();



//seccion de entradas por arreglos vacios//
separadordos();
console.log("arreglos vacios")
separadordos();

console.log("total vendido(vacio):", totalVendido(sinVentas));
separadoruno();

console.log("unidades vendidas (vacio):", unidadesVendidas(sinVentas));
separadoruno();

console.log("venta mayor (vacio):", ventaMayor(sinVentas));
separadoruno();

console.log("ticket promedio (vacio):", ticketPromedio(sinVentas));
separadoruno();

console.log("ventas por ciudad (vacio):", ventasPorCiudad(sinVentas, "medellín"));
separadoruno();

separadordos();


//mini reto 3 metodos de arreglo//
//total de ventas M//
separadordos();

console.log("metodos de arreglo")
separadoruno();

separadoruno();

function totalVendidoM(ventas) {
    return ventas.reduce((acumulador, venta) => acumulador + valorVenta(venta), 0);
  
}
separadoruno();

console.log("totalVendidoM:", totalVendidoM(ventas));
separadoruno();



//unidadesVendidasM//

// Cumple requisito: reduce con valor inicial (0)
function unidadesVendidasM(ventas) {
    return ventas.reduce((acumulador, venta) => acumulador + venta.cantidad, 0);
}
separadoruno();

console.log("unidadesVendidasM:", unidadesVendidasM(ventas));
separadoruno();


//ventasPorCiudadM//
function ventasPorCiudadM(ventas, ciudadBuscada) {
    return ventas
        .filter(venta => venta.ciudad.toLowerCase().trim() === ciudadBuscada.toLowerCase().trim())
        .reduce((acumulador, ventaFiltrada) => acumulador + valorVenta(ventaFiltrada), 0);
}

separadoruno();
separadoruno();
console.log("ventasporciudadM (Medellín):", ventasPorCiudadM(ventas, "Medellín"));


//por variable creada//
/* 
function ventasPorCiudadM(ventas, ciudadBuscada) {
    return ventas
        // Normalizamos el elemento del arreglo Y el parámetro de búsqueda AL MISMO TIEMPO
        .filter(venta => venta.ciudad.toLowerCase().trim() === ciudadBuscada.toLowerCase().trim())
        .reduce((acumulador, ventaFiltrada) => acumulador + valorVenta(ventaFiltrada), 0);
}
*/
//



// FASE 3: AGRUPACIONES Y RANKINGS


// 4. Total por Ciudad (Diccionario)
function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador, venta) => {
        // Normalizamos y capitalizamos la primera letra
        let ciudad = venta.ciudad.trim().toLowerCase();
        ciudad = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);

        // Usamos el operador || para inicializar en 0 si no existe
        acumulador[ciudad] = (acumulador[ciudad] || 0) + valorVenta(venta);
        
        return acumulador;
    }, {});
}

// 5. Unidades por Producto (Diccionario)
function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const producto = venta.producto;
        acumulador[producto] = (acumulador[producto] || 0) + venta.cantidad;
        return acumulador;
    }, {});
}

// 6. Top Productos por Valor (Ranking)


function topProductosPorValor(ventas, k) {

    const valorPorProducto = ventas.reduce((acumulador, venta) => {
        const producto = venta.producto;
        acumulador[producto] = (acumulador[producto] || 0) + valorVenta(venta);
        return acumulador;
    }, {});

  
    const arrayDeProductos = Object.entries(valorPorProducto);


    const productosMapeados = arrayDeProductos.map(([nombre, valor]) => ({ nombre, valor }));

    
    const copiaOrdenada = [...productosMapeados].sort((a, b) => b.valor - a.valor);

   
    return copiaOrdenada.slice(0, k);
}

//  EXPORTACIÓN DE MÓDULOS//
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};

