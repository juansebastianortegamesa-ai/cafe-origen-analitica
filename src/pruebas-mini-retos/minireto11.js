const { mejorSemanaBruta, mejorSemana, parMasCercano } = require("../analitica");
const catalogo = require("../catalogo");

const ventasDiarias = [
    320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
    480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
    710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

// Pruebas de mejorSemana con datos de septiembre
console.log("PRUEBAS MEJOR SEMANA (SEPTIEMBRE, k=7)");
const resBruta = mejorSemanaBruta(ventasDiarias, 7);
const resVentana = mejorSemana(ventasDiarias, 7);

console.log("Fuerza Bruta:", resBruta);
console.log("Ventana Deslizante:", resVentana);
console.log("Dia de inicio de la mejor semana:", resVentana.mejorInicio + 1);
console.log("Coinciden:", resBruta.maxTotal === resVentana.maxTotal && resBruta.mejorInicio === resVentana.mejorInicio ? "SI" : "NO");

// Casos borde de mejorSemana
console.log("\nCASOS BORDE MEJOR SEMANA");
console.log("1. k mayor que numero de dias (k=35):", mejorSemana(ventasDiarias, 35));
console.log("2. Arreglo vacio:", mejorSemana([], 7));

// Benchmarking con 100,000 dias aleatorios
console.log("\nBENCHMARKING 100,000 DIAS ALEATORIOS (k=7)");
const diasAleatorios = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 900) + 100);

console.time("Fuerza Bruta (100,000 dias)");
const bruta100k = mejorSemanaBruta(diasAleatorios, 7);
console.timeEnd("Fuerza Bruta (100,000 dias)");

console.time("Ventana Deslizante (100,000 dias)");
const ventana100k = mejorSemana(diasAleatorios, 7);
console.timeEnd("Ventana Deslizante (100,000 dias)");

console.log("Coinciden en 100,000 dias:", bruta100k.maxTotal === ventana100k.maxTotal && bruta100k.mejorInicio === ventana100k.mejorInicio ? "SI" : "NO");

// Pruebas de parMasCercano
console.log("\nPRUEBAS PAR MAS CERCANO");
const presupuestos = [100000, 140000, 40000];

for (const presupuesto of presupuestos) {
    const resultado = parMasCercano(catalogo, presupuesto);
    if (resultado) {
        const suma = resultado[0].precio + resultado[1].precio;
        console.log(`Presupuesto $${presupuesto}: ${resultado[0].producto} ($${resultado[0].precio}) + ${resultado[1].producto} ($${resultado[1].precio}) = $${suma}`);
    } else {
        console.log(`Presupuesto $${presupuesto}: null (presupuesto insuficiente)`);
    }
}
console.log("Caso borde arreglo vacio:", parMasCercano([], 100000));