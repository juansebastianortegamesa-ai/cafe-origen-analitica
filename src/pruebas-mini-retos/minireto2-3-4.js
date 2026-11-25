// pruebas/analitica_pruebas.js
const analitica = require("../analitica"); 
const ventas = require("../datos");
// Traemos los separadores desde analitica
const { separadoruno, separadordos } = analitica;

// excepciones para lo de la tabla de entrada
const unaVenta = [ventas[0]];
const sinVentas = [];

// ==========================================
// SECCIÓN 1: Arreglo completo
// ==========================================
separadordos();
console.log("pruebas con arreglo completo");
separadordos();

console.log("totalvendido:", analitica.totalVendido(ventas));
separadordos();

console.log("unidadesvendidas:", analitica.unidadesVendidas(ventas));
separadoruno();

console.log("venta mayor:", analitica.ventaMayor(ventas));
separadoruno();

console.log("tiket promedio:", analitica.ticketPromedio(ventas));
separadoruno();

console.log("ventas por ciudad:", analitica.ventasPorCiudad(ventas, "Medellín"));
separadoruno();

// ==========================================
// SECCIÓN 2: Un solo elemento
// ==========================================
separadordos();
console.log("pruebas con un solo elemento");
separadordos();

console.log("total vendido de una venta:", analitica.totalVendido(unaVenta));
separadoruno();

console.log("unidades vendidas:", analitica.unidadesVendidas(unaVenta));
separadoruno();

console.log("venta mayor:", analitica.ventaMayor(unaVenta));
separadoruno();

console.log("ticket promedio:", analitica.ticketPromedio(unaVenta));
separadoruno();

console.log("ventas por ciudad:", analitica.ventasPorCiudad(unaVenta, "medellín"));
separadoruno();

// ==========================================
// SECCIÓN 3: Arreglos vacíos
// ==========================================
separadordos();
console.log("arreglos vacios");
separadordos();

console.log("total vendido(vacio):", analitica.totalVendido(sinVentas));
separadoruno();

console.log("unidades vendidas (vacio):", analitica.unidadesVendidas(sinVentas));
separadoruno();

console.log("venta mayor (vacio):", analitica.ventaMayor(sinVentas));
separadoruno();

console.log("ticket promedio (vacio):", analitica.ticketPromedio(sinVentas));
separadoruno();

console.log("ventas por ciudad (vacio):", analitica.ventasPorCiudad(sinVentas, "medellín"));
separadoruno();

// ==========================================
// SECCIÓN 4: Pruebas de métodos de arreglo (M)
// ==========================================
separadordos();
console.log("metodos de arreglo");
separadordos();
separadoruno();

console.log("totalVendidoM:", analitica.totalVendidoM(ventas));
separadoruno();

console.log("unidadesVendidasM:", analitica.unidadesVendidasM(ventas));
separadoruno();

console.log("ventasporciudadM (Medellín):", analitica.ventasPorCiudadM(ventas, "Medellín"));
separadoruno();

