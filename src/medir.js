const { generadordeVentas } = require('./generador');

const { 
    totalVendidoMedido, 
    ventaMayorMedido, 
    totalPorCiudadMedido,
    primeraVenta
} = require('./analitica'); 




// 3. Los tamaños que nos pide el profesor en el punto 4
const tamanos = [100, 1000, 10000, 100000];


let resultados = [];

console.log("Iniciando pruebas de rendimiento");

// 5.  esto es un Bucle para probar cada tamaño
for (let i = 0; i < tamanos.length; i++) {
    let n = tamanos[i];
    

    let ventasGeneradas = generadordeVentas(n);

    // PRUEBA 1: totalVendido //
    let contador = { operaciones: 0 }; 
    let inicio = performance.now();    
    totalVendidoMedido(ventasGeneradas, contador); 
    let fin = performance.now();       

    resultados.push({
        Funcion: "totalVendido",
        "Tamaño (n)": n,
        Operaciones: contador.operaciones,
        "Tiempo (ms)": (fin - inicio).toFixed(4) // .toFixed(4) deja 4 decimales
    });

    // PRUEBA 2: ventaMayor //
    contador = { operaciones: 0 }; 
    inicio = performance.now();
    ventaMayorMedido(ventasGeneradas, contador);
    fin = performance.now();

    resultados.push({
        Funcion: "ventaMayor",
        "Tamaño (n)": n,
        Operaciones: contador.operaciones,
        "Tiempo (ms)": (fin - inicio).toFixed(4)
    });

    //  PRUEBA 3: totalPorCiudad //
    contador = { operaciones: 0 };
    inicio = performance.now();
    totalPorCiudadMedido(ventasGeneradas, contador);
    fin = performance.now();

    resultados.push({
        Funcion: "totalPorCiudad",
        "Tamaño (n)": n,
        Operaciones: contador.operaciones,
        "Tiempo (ms)": (fin - inicio).toFixed(4)
    });

    // PRUEBA 4: primeraVenta O(1)) //
    contador = { operaciones: 0 };
    inicio = performance.now();
    primeraVenta(ventasGeneradas, contador);
    fin = performance.now();

    resultados.push({
        Funcion: "primeraVenta",
        "Tamaño (n)": n,
        Operaciones: contador.operaciones,
        "Tiempo (ms)": (fin - inicio).toFixed(4)
    });
}


console.table(resultados);
