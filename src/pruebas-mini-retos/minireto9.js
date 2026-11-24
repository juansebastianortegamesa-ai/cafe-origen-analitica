
// MINI RETO 9 : SET, MAP Y ANALISIS BIG O//

const ventasDia1 = require("../datos"); 
const { generadordeVentas } = require("../generador"); 

// VERSION 1: FUERZA BRUTA (O(n2)) - Original

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

// VERSION 2: OPTIMIZACION CON SET (O(n))

function clientesRecurrentesSet(ventas) {
    const vistos = new Set();       
    const recurrentes = new Set();  

    for (const venta of ventas) {
        const clienteActual = venta.cliente; 

        if (vistos.has(clienteActual)) {
            recurrentes.add(clienteActual);
        } else {
            vistos.add(clienteActual);
        }
    }

   
    console.log(`[Debug Set] Clientes unicos vistos: ${vistos.size} | Recurrentes encontrados: ${recurrentes.size}`);

    return Array.from(recurrentes);
}


// VERSION 3: OPTIMIZACION CON MAP (O(n))

function compararPorCliente(ventas) {
    const conteoClientes = new Map(); 

    for (const venta of ventas) {
        const cliente = venta.cliente; 

        if (conteoClientes.has(cliente)) {
            const cantidadActual = conteoClientes.get(cliente);
            conteoClientes.set(cliente, cantidadActual + 1);
        } else {
            conteoClientes.set(cliente, 1);
        }
    }

    
    console.log(`[Debug Map] Total de clientes registrados en el Map: ${conteoClientes.size}`);

    const recurrentes = []; 

    for (const [cliente, cantidad] of conteoClientes.entries()) {
        if (cantidad > 1) {
            recurrentes.push(cliente);
        }
    }

    return recurrentes;
}


// FUNCION DE VERIFICACION

function compararArreglos(nombrePrueba, arreglo1, arreglo2, arreglo3) {
    const ordenado1 = [...arreglo1].sort().join(',');
    const ordenado2 = [...arreglo2].sort().join(',');
    const ordenado3 = [...arreglo3].sort().join(',');

    console.log(`\n--- VERIFICACION: ${nombrePrueba} ---`);
    console.log(`Original: [${ordenado1}]`);
    console.log(`Set:      [${ordenado2}]`);
    console.log(`Map:      [${ordenado3}]`);

    if (ordenado1 === ordenado2 && ordenado2 === ordenado3) {
        console.log("Resultado: Los tres metodos coinciden.");
    } else {
        console.log("Resultado: Hay una discrepancia en los resultados.");
    }
}


// EJECUCION DE VERIFICACION

console.log("==========================================");
console.log("FASE DE VERIFICACION Y COMPARACION");
console.log("==========================================");

const resOriginalD1 = clientesRecurrentesOriginal(ventasDia1);
const resSetD1 = clientesRecurrentesSet(ventasDia1);
const resMapD1 = compararPorCliente(ventasDia1);
compararArreglos("Dia 1 (12 ventas)", resOriginalD1, resSetD1, resMapD1);

const ventas5000 = generadordeVentas(5000); 
const resOriginal5k = clientesRecurrentesOriginal(ventas5000);
const resSet5k = clientesRecurrentesSet(ventas5000);
const resMap5k = compararPorCliente(ventas5000);
compararArreglos("Generadas (5,000 ventas)", resOriginal5k, resSet5k, resMap5k);


// FASE DE MEDICION DE RENDIMIENTO (BENCHMARKING)

console.log("\n==========================================");
console.log("FASE DE MEDICION DE TIEMPO (console.time)");
console.log("==========================================");

const tamanos = [1000, 10000, 100000];

for (let n of tamanos) {
    console.log(`\nGenerando ${n} ventas...`);
    const ventasMasivas = generadordeVentas(n);

    console.time(`Original (n=${n})`);
    clientesRecurrentesOriginal(ventasMasivas);
    console.timeEnd(`Original (n=${n})`);

    console.time(`Set (n=${n})`);
    clientesRecurrentesSet(ventasMasivas);
    console.timeEnd(`Set (n=${n})`);

    console.time(`Map (n=${n})`);
    compararPorCliente(ventasMasivas);
    console.timeEnd(`Map (n=${n})`);
}