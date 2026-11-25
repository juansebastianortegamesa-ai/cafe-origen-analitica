const ventas = require("../datos");
const catalogo = require("../catalogo");
const analitica = require("../analitica");

// Pruebas de comboRegalo
console.log("PRUEBAS COMBO DE REGALO");
console.log("1. Valor 87,000 (Fuerza Bruta):", analitica.comboRegaloFuerzaBruta(catalogo, 87000));
console.log("2. Valor 87,000 (Optimizado):", analitica.comboRegalo(catalogo, 87000));
console.log("3. Valor 61,000 (Fuerza Bruta):", analitica.comboRegaloFuerzaBruta(catalogo, 61000));
console.log("4. Valor 61,000 (Optimizado):", analitica.comboRegalo(catalogo, 61000));
console.log("5. Caso borde sin combinacion (50,000):", analitica.comboRegalo(catalogo, 50000));
console.log("6. Caso borde arreglo vacio:", analitica.comboRegalo([], 87000));

// Pruebas de productoEstrellaPorCiudad
console.log("\nPRUEBAS PRODUCTO ESTRELLA POR CIUDAD");
console.log("1. Datos Dia 1:", analitica.productoEstrellaPorCiudad(ventas));

const ventasEmpate = [
    { ciudad: "Medellin", producto: "Origen Huila 500 g" },
    { ciudad: "Medellin", producto: "Prensa francesa" }
];
console.log("2. Caso borde empate (conserva primero encontrado):", analitica.productoEstrellaPorCiudad(ventasEmpate));
console.log("3. Caso borde arreglo vacio:", analitica.productoEstrellaPorCiudad([]));

// Pruebas de primerClienteUnico
console.log("\nPRUEBAS PRIMER CLIENTE UNICO");
console.log("1. Datos Dia 1 (esperado C04):", analitica.primerClienteUnico(ventas));

const ventasTodosRepetidos = [
    { cliente: "C01" },
    { cliente: "C02" },
    { cliente: "C01" },
    { cliente: "C02" }
];
console.log("2. Caso borde sin cliente unico:", analitica.primerClienteUnico(ventasTodosRepetidos));
console.log("3. Caso borde arreglo vacio:", analitica.primerClienteUnico([]));