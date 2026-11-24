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

    if (ventas.length === 0) return null; 

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

//excepciones para lo de la tabla de entrada//
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



//mini reto 3 metodos de arreglo//
//total de ventas M//
separadordos();
console.log("metodos de arreglo")
separadordos();

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
console.log("ventasporciudadM (Medellín):", ventasPorCiudadM(ventas, "Medellín"));



// FASE 3: AGRUPACIONES Y RANKINGS

//  Total por Ciudad (Diccionario)
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

//  Unidades por Producto (Diccionario)
function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const producto = venta.producto;
        acumulador[producto] = (acumulador[producto] || 0) + venta.cantidad;
        return acumulador;
    }, {});
}

//  Top Productos por Valor (Ranking)


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


//mini reto 3 // fecha especifica

function ventasDelDia(ventas, fechaREQ) {
    const fechaBuscada = fechaREQ.trim();
    const ventaDiaFiltrada = ventas.filter(venta => venta.fecha.trim() === fechaBuscada);
    const totalDelDia = ventaDiaFiltrada.reduce((total, venta) => total + valorVenta(venta), 0);
    const unidadesDelDia = ventaDiaFiltrada.reduce((unidades, venta) => unidades + venta.cantidad, 0);

    return {
        total: totalDelDia,
        unidades: unidadesDelDia
    };
}



//mini reto 5  funciones para medir el tiempo // (ESTAS SON LAS FUNCIONES INSTRUMENTADAS)

function totalVendidoMedido(ventas, contador) {
    for (const venta of ventas) {
        contador.operaciones += 1; 
    }
    return totalVendido(ventas); 
}

function ventaMayorMedido(ventas, contador) {
    if (ventas.length === 0) return null; 
    let valorMaximo = 0;
    let registroCompleto = null; 

    for (const venta of ventas) {
        contador.operaciones += 1; 
        const valorActual = valorVenta(venta); 
        if (valorActual > valorMaximo) {
            contador.operaciones += 1; 
            valorMaximo = valorActual; 
            registroCompleto = venta;  
        }
    }
    return registroCompleto;
}

function totalPorCiudadMedido(ventas, contador) {
    return ventas.reduce((acumulador, venta) => {
        contador.operaciones += 1; 
        let ciudad = venta.ciudad.trim().toLowerCase();
        ciudad = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
        acumulador[ciudad] = (acumulador[ciudad] || 0) + valorVenta(venta);
        return acumulador;
    }, {}); 
}

function primeraVenta(ventas, contador) {
    contador.operaciones += 1; 
    return ventas.length > 0 ? ventas[0] : null; 
}




// mini reto 10 dia 3 //

//catalogo por fuerza bruta//
const catalogo = require("./catalogo"); 

function comboRegaloFuerzaBruta(catalogo, valor) {
    for (let i = 0; i < catalogo.length; i++) {
        
      
        for (let j = i + 1; j < catalogo.length; j++) {
            
            
            if (catalogo[i].precio + catalogo[j].precio === valor) {
               
                return [catalogo[i], catalogo[j]];
            }
        }
    }
    return null;
}



//catalogo optimizado //
function comboRegaloOptimizado(catalogo, valor) {
   
    const preciosVistos = new Map();

    for (let i = 0; i < catalogo.length; i++) {
        const productoActual = catalogo[i];
        const precioActual = productoActual.precio;
        
      
        const complemento = valor - precioActual;

       
        if (preciosVistos.has(complemento)) {
          
            const productoComplemento = preciosVistos.get(complemento);
          return [productoComplemento, productoActual];
        }

        
        preciosVistos.set(precioActual, productoActual);
    }

    return null; 


}


// productoEstrellaPorCiudad//

function productoEstrellaPorCiudad(ventas) {
    // Map principal: Ciudad -> Map(Producto -> Frecuencia)
    const conteoCiudades = new Map();

    
    for (const venta of ventas) {
        const ciudad = venta.ciudad.toLowerCase().trim(); // Normalizamos
        const producto = venta.producto;

        
        if (!conteoCiudades.has(ciudad)) {
            conteoCiudades.set(ciudad, new Map());
        }

        
        const productosDeLaCiudad = conteoCiudades.get(ciudad);

        const conteoActual = productosDeLaCiudad.get(producto) || 0;
        productosDeLaCiudad.set(producto, conteoActual + 1);
    }

    
    const resultado = {};

    for (const [ciudad, productosMap] of conteoCiudades.entries()) {
        let productoEstrella = null;
        let maxFrecuencia = 0;

       
        for (const [producto, frecuencia] of productosMap.entries()) {
            if (frecuencia > maxFrecuencia) {
                maxFrecuencia = frecuencia;
                productoEstrella = producto;
            }
        }

        resultado[ciudad] = productoEstrella;
    }

    return resultado;
}


// primerClienteUnico ///

function primerClienteUnico(ventas) {
 
    const frecuenciaProductos = new Map();

    for (const venta of ventas) {
        const producto = venta.producto;
        const conteoActual = frecuenciaProductos.get(producto) || 0;
        frecuenciaProductos.set(producto, conteoActual + 1);
    }

   
    for (const venta of ventas) {
        const producto = venta.producto;
        
       
        if (frecuenciaProductos.get(producto) === 1) {
           
            return venta.cliente; 
        }
    }

    // Si ningún producto es único, devolvemos null.
    return null;
}








//  EXPORTACIÓN DE MÓDULOS//
module.exports = {
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
    ventasDelDia,
    totalVendidoMedido,
    ventaMayorMedido,
    totalPorCiudadMedido,
    primeraVenta,
    comboRegaloFuerzaBruta,
    comboRegaloOptimizado,
    productoEstrellaPorCiudad,
    primerClienteUnico
};



