const ventasDia1 = require("./datos"); // Importamos tus 12 registros

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

// Prueba //
console.log("Clientes repetidos Día 1:", clientesRecurrentes(ventasDia1));

const { generadordeVentas } = require("./generador"); 

// funcion del compañero //
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

// 2. Definimos los tamaños de prueba en un arreglo //
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



