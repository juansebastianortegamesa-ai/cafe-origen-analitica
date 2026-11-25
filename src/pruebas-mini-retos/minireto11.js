const { mejorSemanaBruta, mejorSemana, parMasCercano } = require('../analitica');
const catalogo = require('../catalogo');

// Datos exactos de Septiembre

const ventasDiarias = [
    320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
    480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
    710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

console.log("--- VERIFICACION CON DATOS DE SEPTIEMBRE (k=7) ---");
const resBruta = mejorSemanaBruta(ventasDiarias, 7);
const resVentana = mejorSemana(ventasDiarias, 7);

console.log("Resultado Fuerza Bruta: ", resBruta);
console.log("Resultado Ventana Deslizante: ", resVentana);

// Comprobación estricta de igualdad
const coinciden = resBruta.maxTotal === resVentana.maxTotal && resBruta.mejorInicio === resVentana.mejorInicio;
console.log(`Verificacion: Ambas versiones coinciden? ${coinciden ? 'SI' : 'NO'}`);


// =====================================================================
// INSTRUCCIÓN 4: Verificación con 100,000 días generados al azar
// =====================================================================
console.log("\n--- BENCHMARKING CON 100,000 DIAS ALEATORIOS (k=7) ---");

// Generador de datos masivos simulando ventas entre 100 y 1000
const diasAleatorios = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 900) + 100);

// Medición Fuerza Bruta
console.time("Tiempo Fuerza Bruta");
const bruta100k = mejorSemanaBruta(diasAleatorios, 7);
console.timeEnd("Tiempo Fuerza Bruta");

// Medición Ventana Deslizante
console.time("Tiempo Ventana Deslizante");
const ventana100k = mejorSemana(diasAleatorios, 7);
console.timeEnd("Tiempo Ventana Deslizante");

console.log(`Verificacion 100k: Coinciden? ${bruta100k.maxTotal === ventana100k.maxTotal ? 'SI' : 'NO'}`);


// =====================================================================
// INSTRUCCIÓN 6: Pruebas de Presupuesto
// =====================================================================
console.log("\n--- PRUEBAS DE PRESUPUESTO (parMasCercano) ---");
const presupuestos = [100000, 140000, 40000];

presupuestos.forEach(presupuesto => {
    console.log(`\nBuscando mejor par para presupuesto: $${presupuesto}`);
    const resultado = parMasCercano(catalogo, presupuesto);
    
    if (resultado) {
        const sumaTotal = resultado[0].precio + resultado[1].precio;
        console.log(`  Par seleccionado: ${resultado[0].producto} ($${resultado[0].precio}) + ${resultado[1].producto} ($${resultado[1].precio})`);
        console.log(`  Suma Total: $${sumaTotal} (Dentro del presupuesto)`);
    } else {
        // Caso borde: presupuesto insuficiente
        console.log("  Resultado: null (No existe combinacion posible sin superar el presupuesto)");
    }
});

