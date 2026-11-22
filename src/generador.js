const ventas = require("./datos");

const listaProductos = ventas.map(venta => venta.producto);
const listaCiudades = ventas.map(venta => venta.ciudad);

const productosUnicos = [...new Set(listaProductos)];
const ciudadesUnicas = [...new Set(listaCiudades)];

function generadordeVentas(n) {
    let ventasAL = [];

    for (let i = 0; i < n; i++) {


        let indiceProducto = Math.floor(Math.random() * productosUnicos.length);
        let indiceCiudad = Math.floor(Math.random() * ciudadesUnicas.length);
        
        let cantidadAleatoria = Math.floor(Math.random() * 5) + 1;
        let precioAleatorio = Math.floor(Math.random() * 10) * 10000 + 26000;

        let nuevaVenta = {
            id: i + 1, 
            fecha: "2026-09-01", 
            cliente: `C0${Math.floor(Math.random() * 8) + 1}`, 
            producto: productosUnicos[indiceProducto], 
            ciudad: ciudadesUnicas[indiceCiudad], 
            cantidad: cantidadAleatoria,
            precio: precioAleatorio
        };

    
        ventasAL.push(nuevaVenta);
    }

    return ventasAL;
}

module.exports = { generadordeVentas };


const ventasDePrueba = generadordeVentas(5); 
console.table(ventasDePrueba); 



