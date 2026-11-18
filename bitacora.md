# Diccionario de datos y análisis de casos borde

## 1. Diccionario de datos

El diccionario de datos describe cada campo de la tabla, su significado, tipo de dato y reglas de validación.

| Campo | Tipo en JavaScript | Descripción | Validaciones |
|---|---|---|---|
| `id` | `Number` | Identificador único de cada venta. | Debe ser un entero positivo y no repetirse. |
| `fecha` | `String` | Fecha en la que se realizó la venta. | Debe tener formato `YYYY-MM-DD` y ser una fecha válida. |
| `cliente` | `String` | Código que identifica al cliente. | No puede estar vacío y debe seguir el formato `C01`, `C02`, etc. |
| `producto` | `String` | Nombre del producto vendido. | No puede estar vacío y debe corresponder a un producto registrado. |
| `ciudad` | `String` | Ciudad donde se encuentra el cliente. | No puede estar vacía y debe tener un formato uniforme. |
| `cantidad` | `Number` | Número de unidades compradas. | Debe ser un entero mayor que cero. |
| `precio` | `Number` | Precio unitario del producto. | Debe ser un número positivo y finito. |


### que significa cada dato:

- `id`: permite identificar cada venta sin confundirla con otra.
- `fecha`: conviene almacenarla como texto en formato ISO (`YYYY-MM-DD`) y convertirla a `Date` cuando necesites realizar operaciones con fechas.
- `cliente`: es un código de identificación, no un número para realizar operaciones matemáticas.
- `producto`: permite identificar qué artículo se vendió.
- `ciudad`: debes unificar nombres como `medellín` y `Medellín`.
- `cantidad`: representa las unidades vendidas.
- `precio`: representa el precio de una unidad, no el valor total de la venta.


---

## 2. Identificación de casos borde

Los casos borde son situaciones especiales o inesperadas que pueden provocar errores en un programa si no se contemplan durante su desarrollo.

| Caso borde | Dato encontrado o ejemplo | Problema | Solución |
|---|---|---|---|
| Cantidad igual a cero| ID 8: cantidad `0` | No representa una venta válida. | Rechazar el registro o marcarlo como inválido para revisión. |
| Ciudad con minúsculas| ID 5: `medellín` | Puede generar registros duplicados al agrupar ciudades. | Normalizar el texto. |
| ID duplicado | Dos ventas con el mismo ID | Dos ventas tendrían el mismo identificador. | Comprobar que cada ID sea único.|
| Precio igual a cero | `precio = 0` | No representa un precio de venta válido según las reglas definidas. | Rechazarlo o revisar si se trata de una promoción    gratuita. |
| Cantidad negativa | `cantidad = -3` | Representaría una cantidad imposible en una venta normal. | Rechazar el registro o tratarlo como devolución en un proceso separado. |
| Precio negativo | `precio = -42000` | Generaría un valor total negativo. | Rechazarlo o manejarlo como ajuste/devolución por separado. |
| Fecha incorrecta | `2026-15-40` | No corresponde a una fecha válida. | Validar el calendario antes de aceptar el registro. |
| Cliente vacío | `cliente = ""` | No se podría identificar al comprador. | Rechazar el registro. |
| Producto vacío | `producto = ""` | No se sabría qué artículo se vendió. | Rechazar el registro. |
| Cantidad decimal | `cantidad = 2.5` | No corresponde a unidades completas en este inventario. | Exigir un número entero. |

---

que se hara con cada dato:

| Dato | ¿Qué se hace? |
|---|---|
| `id` | Identifica cada venta de manera única y permite diferenciarla de las demás. |
| `fecha` | Registra el día en que se realizó la venta. Permite organizar las ventas cronológicamente. |
| `cliente` | Identifica al comprador mediante un código único. |
| `producto` | Identifica el artículo que compró el cliente. |
| `ciudad` | Registra la ubicación del cliente para clasificar las ventas por ciudad. |
| `cantidad` | Indica cuántas unidades compró el cliente. Se utiliza para calcular el total de la venta. |
| `precio` | Representa el valor de una unidad del producto. Se multiplica por la cantidad para obtener el total. |

que se hara con cada dato malo:

| Dato erróneo | Problema | Solución |
|---|---|---|
| ID duplicado | Dos ventas tienen el mismo identificador. | Rechazar el registro duplicado y asignar un ID único. |
| Fecha incorrecta | La fecha no existe o tiene un formato diferente. | Validar el formato y solicitar una fecha correcta. |
| Cliente vacío | No se identifica al comprador. | Rechazar el registro hasta ingresar el código del cliente. |
| Producto vacío | No se identifica qué se vendió. | Solicitar el nombre de un producto registrado. |
| Ciudad mal escrita | Puede generar categorías duplicadas. | Normalizar el texto, por ejemplo, `medellín` → `Medellín`. |
| Cantidad igual a cero | No existe una unidad vendida. | Marcar el registro para revisión y excluirlo de los cálculos. |
| Cantidad negativa | Representa una cantidad inválida para una venta normal. | Rechazar el registro o tratarlo como devolución por separado. |
| Cantidad decimal | No representa unidades completas. | Rechazarla y solicitar un número entero. |
| Precio igual a cero | No existe un cobro por el producto. | Revisar si es una promoción o un error de digitación. |
| Precio negativo | Produce un valor de venta negativo. | Rechazarlo y revisar el registro. |


# reto 2
psudo codigo explicacion : 

1  que condiciones debe cumplir el trabajo

Elemento solicitado	Explicación
Qué recorro	Los 12 registros de ventas.
Qué condición aplico	La cantidad es menor o igual a cero.
Qué acumulo	La cantidad de registros incorrectos.
Valor inicial	0 registros incorrectos.

----------------------------------------------
Lenguaje natural
1. Iniciar el contador de registros incorrectos en cero.
2. Recorrer los 12 registros.
3. Comprobar si la cantidad es menor o igual a cero.
4. Si cumple la condición, aumentar el contador en uno.
5. Al terminar, mostrar la cantidad de registros incorrectos.

---------------------------------------------------
Lenguaje natural
1. Crear un acumulador para cada ciudad.
2. Inicializar todos los acumuladores en cero.
3. Recorrer los 12 registros.
4. Comprobar que la cantidad sea mayor que cero.
5. Calcular el valor de la venta multiplicando cantidad por precio.
6. Identificar la ciudad del registro.
7. Sumar el valor de la venta al acumulador correspondiente.
8. Al terminar, mostrar los ingresos de cada ciudad.

todo debe ser normalizado para evitar errores de tipeo o de datos


# 1. Variables del ejercicio

Primero, vamos a identificar las variables:

### A. Variables de los datos originales

| Variable | Tipo de dato | ¿Qué almacena? |
|---|---|---|
| `id` | Entero | Identificador de la venta. |
| `fecha` | Cadena | Fecha de la venta. |
| `cliente` | Cadena | Código del cliente. |
| `producto` | Cadena | Nombre del producto. |
| `ciudad` | Cadena | Ciudad de la venta. |
| `cantidad` | Entero | Unidades compradas. |
| `precio` | Entero | Precio por unidad. |

### B. Variables para los indicadores

| Variable | Tipo | Función |
|---|---|---|
| `i` | Entero | Controla el recorrido de las ventas. |
| `valorVenta` | Real | Guarda el resultado de cantidad × precio. |
| `ingresosTotales` | Real | Acumula todos los ingresos. |
| `unidadesVendidas` | Entero | Acumula las unidades vendidas. |
| `ventasValidas` | Entero | Cuenta las ventas válidas. |
| `ventasIncorrectas` | Entero | Cuenta los registros incorrectos. |
| `ingresosMedellin` | Real | Acumula los ingresos de Medellín. |
| `ingresosBogota` | Real | Acumula los ingresos de Bogotá. |
| `ingresosCali` | Real | Acumula los ingresos de Cali. |
| `ingresosPereira` | Real | Acumula los ingresos de Pereira. |

# 2. como deberia verse el codigo en psint:

función totalVendido(ventas):
    total = 0
    para cada venta en ventas:
        total = total + venta.cantidad * venta.precio
    devolver total

función unidadesVendidas(ventas):
    totalUnidades = 0
    para cada venta en ventas:
        si venta.cantidad > 0:
            totalUnidades = totalUnidades + venta.cantidad
    devolver totalUnidades

función ventaMayor(ventas):
    si ventas está vacío:
        devolver nulo
    mayor = primera venta de ventas
    para cada venta en ventas:
        si venta.cantidad * venta.precio > mayor.cantidad * mayor.precio:
            mayor = venta
    devolver mayor

función ticketPromedio(ventas):
    total = 0
    cantidadVentas = 0
    para cada venta en ventas:
        si venta.cantidad > 0:
            total = total + venta.cantidad * venta.precio
            cantidadVentas = cantidadVentas + 1
    si cantidadVentas es 0:
        devolver 0
    devolver total / cantidadVentas

función ventasPorCiudad(ventas, ciudad):
    total = 0
    para cada venta en ventas:
        si normalizar(venta.ciudad) == normalizar(ciudad):
            total = total + venta.cantidad * venta.precio
    devolver total



### 1. Los arreglos

Por ejemplo:

```text
Dimension cantidad[12]
```

Significa que estamos creando un espacio para almacenar 12 cantidades.

Cuando escribimos:

```text
cantidad[1] <- 2
cantidad[2] <- 1
cantidad[3] <- 1
```

Estamos guardando información en posiciones diferentes.

### 2. Los acumuladores

Por ejemplo:

```text
ingresosTotales <- ingresosTotales + valorVenta
```

Estamos tomando el dinero que ya teníamos acumulado y sumándole el valor de la venta actual.

### 3. Los contadores

Por ejemplo:

```text
ventasValidas <- ventasValidas + 1
```

Cada vez que encontramos una venta válida, aumentamos el contador en uno.

---------------------------------------

mini reto 2 tablas a mano 
Verificación manual con tablas de traza
Traza de totalVendido(ventas)
ID 	Cantidad 	Precio 	Operación 	Total acumulado
1 	2 	42000 	2 * 42000 = 84000 	84000
2 	1 	26000 	1 * 26000 = 26000 	110000
3 	1 	95000 	1 * 95000 = 95000 	205000
4 	1 	42000 	1 * 42000 = 42000 	247000
5 	3 	45000 	3 * 45000 = 135000 	382000
6 	2 	26000 	2 * 26000 = 52000 	434000
7 	1 	120000 	1 * 120000 = 120000 	554000
8 	0 	42000 	0 * 42000 = 0 	554000
9 	2 	45000 	2 * 45000 = 90000 	644000
10 	4 	42000 	4 * 42000 = 168000 	812000
11 	1 	95000 	1 * 95000 = 95000 	907000
12 	3 	26000 	3 * 26000 = 78000 	985000

Resultado manual: 985000 Resultado del programa: totalVendido(ventas) = 985000 Los resultados coinciden.
Traza de ventasPorCiudad(ventas, "Medellín")
ID 	Ciudad normalizada 	¿Coincide? 	Valor de la venta 	Total acumulado
1 	medellín 	Sí 	84000 	84000
2 	bogotá 	No 	26000 	84000
3 	cali 	No 	95000 	84000
4 	medellín 	Sí 	42000 	126000
5 	medellín 	Sí 	135000 	261000
6 	bogotá 	No 	52000 	261000
7 	bogotá 	No 	120000 	261000
8 	cali 	No 	0 	261000
9 	cali 	No 	90000 	261000
10 	pereira 	No 	168000 	261000
11 	medellín 	Sí 	95000 	356000
12 	bogotá 	No 	78000 	356000

Resultado manual: 356000 Resultado del programa: ventasPorCiudad(ventas, "Medellín") = 356000 Los resultados coinciden.





