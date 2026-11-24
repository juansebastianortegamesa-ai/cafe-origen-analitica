// src/minireto10.js
const ventas = require("../datos");
const catalogo = require("../catalogo");
const analitica = require("../analitica");

const { separadordos } = require("../analitica")

separadordos();
console.log("PRUEBAS MINI RETO 10");
separadordos();

//  PRUEBAS PASO 4: COMBOS DE REGALO //
console.log("\n--- PRUEBAS COMBOS DE REGALO ---");

console.log("\n1. Buscando combo de 87,000 (Fuerza Bruta):");
console.table(analitica.comboRegaloFuerzaBruta(catalogo, 87000));

console.log("\n2. Buscando combo de 87,000 (Optimizado):");
console.table(analitica.comboRegaloOptimizado(catalogo, 87000));

console.log("\n3. Buscando combo de 61,000 (Fuerza Bruta):");
console.table(analitica.comboRegaloFuerzaBruta(catalogo, 61000));

console.log("\n4. Buscando combo de 61,000 (Optimizado):");
console.table(analitica.comboRegaloOptimizado(catalogo, 61000));

//  PRUEBAS PASO 5: PRODUCTO ESTRELLA POR CIUDAD //
separadordos();
console.log("\n--- PRODUCTO ESTRELLA POR CIUDAD ---");
const estrellas = analitica.productoEstrellaPorCiudad(ventas);
console.table(estrellas);

//  PRUEBAS PASO 6: PRIMER CLIENTE ÚNICO //
separadordos();
console.log("\n--- PRIMER CLIENTE ÚNICO ---");
const clienteUnico = analitica.primerClienteUnico(ventas);
console.log(`El primer cliente que compró un producto que solo se vendió una vez es: ${clienteUnico}`);
separadordos();