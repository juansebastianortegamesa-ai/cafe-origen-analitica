const separadoruno = () => console.log("--------------------------------------");
const separadordos = () => console.log("===========================================");

const ventas = require("./datos");

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

// MiniReto 2: Funciones con bucles

function totalVendido(ventas) {
    let acumuladorTotal = 0;
    for (const venta of ventas) {
        acumuladorTotal += valorVenta(venta);
    }
    return acumuladorTotal;
}

function unidadesVendidas(ventas) {
    let totalUnidades = 0;
    for (const venta of ventas) {
        totalUnidades += venta.cantidad;
    }
    return totalUnidades;
}

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

function ticketPromedio(ventas) {
    if (ventas.length === 0) return 0;

    let dineroTotal = totalVendido(ventas);
    let ventasValidas = 0;

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

// MiniReto 3: Metodos de arreglo

function totalVendidoM(ventas) {
    return ventas.reduce((acumulador, venta) => acumulador + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
    return ventas.reduce((acumulador, venta) => acumulador + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudadBuscada) {
    return ventas
        .filter(venta => venta.ciudad.toLowerCase().trim() === ciudadBuscada.toLowerCase().trim())
        .reduce((acumulador, ventaFiltrada) => acumulador + valorVenta(ventaFiltrada), 0);
}

function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador, venta) => {
        let ciudad = venta.ciudad.trim().toLowerCase();
        ciudad = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
        acumulador[ciudad] = (acumulador[ciudad] || 0) + valorVenta(venta);
        return acumulador;
    }, {});
}

function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const producto = venta.producto;
        acumulador[producto] = (acumulador[producto] || 0) + venta.cantidad;
        return acumulador;
    }, {});
}

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

// MiniReto 5: Funciones instrumentadas

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

// MiniReto 9: Clientes recurrentes en tiempo lineal

function clientesRecurrentesSet(ventas) {
    const vistos = new Set();
    const recurrentes = new Set();

    for (const venta of ventas) {
        if (vistos.has(venta.cliente)) {
            recurrentes.add(venta.cliente);
        } else {
            vistos.add(venta.cliente);
        }
    }

    return [...recurrentes];
}

function comprasPorCliente(ventas) {
    const conteo = new Map();

    for (const venta of ventas) {
        if (conteo.has(venta.cliente)) {
            conteo.set(venta.cliente, conteo.get(venta.cliente) + 1);
        } else {
            conteo.set(venta.cliente, 1);
        }
    }

    return conteo;
}

// MiniReto 10: Complementos y conteo de frecuencias

function comboRegaloFuerzaBruta(catalogo, valor) {
    if (!Array.isArray(catalogo) || catalogo.length < 2) return null;

    for (let i = 0; i < catalogo.length; i++) {
        for (let j = i + 1; j < catalogo.length; j++) {
            if (catalogo[i].precio + catalogo[j].precio === valor) {
                return [catalogo[i], catalogo[j]];
            }
        }
    }
    return null;
}

function comboRegalo(catalogo, valor) {
    if (!Array.isArray(catalogo) || catalogo.length < 2) return null;

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

function productoEstrellaPorCiudad(ventas) {
    if (!Array.isArray(ventas) || ventas.length === 0) return {};

    const conteoCiudades = new Map();

    for (const venta of ventas) {
        const ciudad = venta.ciudad.toLowerCase().trim();
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

function primerClienteUnico(ventas) {
    if (!Array.isArray(ventas) || ventas.length === 0) return null;

    const frecuenciaClientes = new Map();

    for (const venta of ventas) {
        const cliente = venta.cliente;
        const conteoActual = frecuenciaClientes.get(cliente) || 0;
        frecuenciaClientes.set(cliente, conteoActual + 1);
    }

    for (const venta of ventas) {
        if (frecuenciaClientes.get(venta.cliente) === 1) {
            return venta.cliente;
        }
    }

    return null;
}


function productoEstrellaPorCiudad(ventas) {
    if (!Array.isArray(ventas) || ventas.length === 0) return {};

    const conteoCiudades = new Map();

    for (const venta of ventas) {
        let ciudad = venta.ciudad.trim().toLowerCase();
        ciudad = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
        const producto = venta.producto.trim();

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





















// MiniReto 11: Ventana deslizante y dos punteros

const ventasDiarias = [
    320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
    480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
    710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

function mejorSemanaBruta(dias, k) {
    if (!Array.isArray(dias) || k <= 0 || k > dias.length) return null;

    let maxTotal = -Infinity;
    let mejorInicio = 0;

    for (let i = 0; i <= dias.length - k; i++) {
        let sumaActual = 0;

        for (let j = i; j < i + k; j++) {
            sumaActual += dias[j];
        }

        if (sumaActual > maxTotal) {
            maxTotal = sumaActual;
            mejorInicio = i;
        }
    }

    return { maxTotal, mejorInicio };
}

function mejorSemana(dias, k) {
    if (!Array.isArray(dias) || k <= 0 || k > dias.length) return null;

    let sumaActual = 0;
    for (let i = 0; i < k; i++) {
        sumaActual += dias[i];
    }

    let maxTotal = sumaActual;
    let mejorInicio = 0;

    for (let i = k; i < dias.length; i++) {
        sumaActual = sumaActual - dias[i - k] + dias[i];

        if (sumaActual > maxTotal) {
            maxTotal = sumaActual;
            mejorInicio = i - k + 1;
        }
    }

    return { maxTotal, mejorInicio };
}

function parMasCercano(precios, presupuesto) {
    if (!Array.isArray(precios) || precios.length < 2) return null;

    const productosOrdenados = [...precios].sort((a, b) => a.precio - b.precio);

    let izquierda = 0;
    let derecha = productosOrdenados.length - 1;

    let mejorSuma = -Infinity;
    let mejorPar = null;

    while (izquierda < derecha) {
        const productoIzq = productosOrdenados[izquierda];
        const productoDer = productosOrdenados[derecha];
        const sumaActual = productoIzq.precio + productoDer.precio;

        if (sumaActual <= presupuesto) {
            if (sumaActual > mejorSuma) {
                mejorSuma = sumaActual;
                mejorPar = [productoIzq, productoDer];
            }
            izquierda++;
        } else {
            derecha--;
        }
    }

    return mejorPar;
}

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
    clientesRecurrentesSet,
    comprasPorCliente,
    comboRegaloFuerzaBruta,
    comboRegalo,
    productoEstrellaPorCiudad,
    primerClienteUnico,
    ventasDiarias,
    mejorSemana,
    mejorSemanaBruta,
    parMasCercano
};