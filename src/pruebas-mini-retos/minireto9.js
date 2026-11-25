const ventasDia1 = require("../datos");
const { generadordeVentas } = require("../generador");
const { clientesRecurrentesSet, comprasPorCliente } = require("../analitica");

// Fuerza bruta O(n^2)
function clientesRecurrentesOriginal(ventas) {
    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }
    return recurrentes;
}

// Obtencion de recurrentes a partir del Map de comprasPorCliente
function recurrentesDesdeMap(ventas) {
    const conteoClientes = comprasPorCliente(ventas);
    const recurrentes = [];

    for (const [cliente, cantidad] of conteoClientes.entries()) {
        if (cantidad > 1) {
            recurrentes.push(cliente);
        }
    }

    return recurrentes;
}

// Comparacion de resultados ordenados
function compararArreglos(nombrePrueba, arreglo1, arreglo2, arreglo3) {
    const ordenado1 = [...arreglo1].sort().join(",");
    const ordenado2 = [...arreglo2].sort().join(",");
    const ordenado3 = [...arreglo3].sort().join(",");

    console.log(`\nVERIFICACION: ${nombrePrueba}`);
    console.log(`Original: [${ordenado1}]`);
    console.log(`Set:      [${ordenado2}]`);
    console.log(`Map:      [${ordenado3}]`);
    console.log(`Coinciden: ${ordenado1 === ordenado2 && ordenado2 === ordenado3 ? "SI" : "NO"}`);
}

// Verificacion con datos del Dia 1 y 5,000 ventas generadas
compararArreglos(
    "Dia 1 (12 ventas)",
    clientesRecurrentesOriginal(ventasDia1),
    clientesRecurrentesSet(ventasDia1),
    recurrentesDesdeMap(ventasDia1)
);

const ventas5000 = generadordeVentas(5000);
compararArreglos(
    "Generadas (5,000 ventas)",
    clientesRecurrentesOriginal(ventas5000),
    clientesRecurrentesSet(ventas5000),
    recurrentesDesdeMap(ventas5000)
);

// Casos borde: arreglo vacio y clientes sin repeticion
compararArreglos(
    "Caso borde: arreglo vacio",
    clientesRecurrentesOriginal([]),
    clientesRecurrentesSet([]),
    recurrentesDesdeMap([])
);

const ventasSinRepetidos = [
    { cliente: "C01" },
    { cliente: "C02" },
    { cliente: "C03" }
];
compararArreglos(
    "Caso borde: todos los clientes unicos",
    clientesRecurrentesOriginal(ventasSinRepetidos),
    clientesRecurrentesSet(ventasSinRepetidos),
    recurrentesDesdeMap(ventasSinRepetidos)
);

// Medicion de rendimiento con console.time
const tamanos = [1000, 10000, 100000];

for (const n of tamanos) {
    console.log(`\nMedicion para n=${n}:`);
    const ventasMasivas = generadordeVentas(n);

    if (n <= 10000) {
        console.time(`Original (n=${n})`);
        clientesRecurrentesOriginal(ventasMasivas);
        console.timeEnd(`Original (n=${n})`);
    } else {
        console.log("Original (n=100000): omitida en este script (registrada en MiniReto 6 en ~36.5 s)");
    }

    console.time(`Set (n=${n})`);
    clientesRecurrentesSet(ventasMasivas);
    console.timeEnd(`Set (n=${n})`);

    console.time(`Map (n=${n})`);
    const mapa = comprasPorCliente(ventasMasivas);
    recurrentesDesdeMap(ventasMasivas);
    console.timeEnd(`Map (n=${n})`);
    console.log(`Clientes distintos registrados en Map (size): ${mapa.size}`);
}