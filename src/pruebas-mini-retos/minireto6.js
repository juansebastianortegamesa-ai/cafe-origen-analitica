const ventasDia1 = require("../datos");
const { generadordeVentas } = require("../generador");

// MiniReto 6: Diagnostico de complejidad O(n^2)
function clientesRecurrentes(ventas) {
    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }

    return recurrentes;
}

console.log("Clientes repetidos Dia 1:", clientesRecurrentes(ventasDia1));

const tamanos = [1000, 2000, 4000, 8000, 16000];

for (let n of tamanos) {
    const ventasMasivas = generadordeVentas(n);
    const etiqueta = `Tiempo para n=${n}`;

    console.time(etiqueta);
    clientesRecurrentes(ventasMasivas);
    console.timeEnd(etiqueta);
}

console.log("INICIANDO PRUEBA DE 100,000 VENTAS");
const ventas100k = generadordeVentas(100000);
console.time("Tiempo para n=100000");
clientesRecurrentes(ventas100k);
console.timeEnd("Tiempo para n=100000");