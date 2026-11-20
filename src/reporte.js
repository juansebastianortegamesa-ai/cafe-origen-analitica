const ventas = require("./datos")

const formatoCOP = (ventas) => `$ ${ventas.toLocaleString("es-CO")}`;

const {
    separadoruno,
    separadordos,
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica")


//reporte de las ventas //


// Resumen general //






