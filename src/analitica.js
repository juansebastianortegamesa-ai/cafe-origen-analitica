function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}


//mis funciones//

//el total vendido//
function  totalVendido(ventas) {
    let acumuladorTotal = 0;
    
    for (const venta of ventas) {
        acumuladorTotal += valorVenta(venta);
    }

    return acumuladorTotal;
}







