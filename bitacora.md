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

```text
Algoritmo AnalisisDeVentas

    // 1. Definir variables originales
    Definir i Como Entero

    Definir id, cantidad, precio Como Entero

    Definir fecha, cliente, producto, ciudad Como Cadena

    // 2. Definir variables de los indicadores
    Definir unidadesVendidas, ventasValidas, ventasIncorrectas Como Entero

    Definir valorVenta, ingresosTotales Como Real

    Definir ingresosMedellin, ingresosBogota Como Real
    Definir ingresosCali, ingresosPereira Como Real

    // 3. Crear arreglos
    Dimension id[12]
    Dimension fecha[12]
    Dimension cliente[12]
    Dimension producto[12]
    Dimension ciudad[12]
    Dimension cantidad[12]
    Dimension precio[12]

    // 4. Registrar los datos de las ventas

    id[1] <- 1
    fecha[1] <- "2026-09-01"
    cliente[1] <- "C01"
    producto[1] <- "Origen Huila 500 g"
    ciudad[1] <- "MEDELLIN"
    cantidad[1] <- 2
    precio[1] <- 42000

    id[2] <- 2
    fecha[2] <- "2026-09-01"
    cliente[2] <- "C02"
    producto[2] <- "Origen Nariño 250 g"
    ciudad[2] <- "BOGOTA"
    cantidad[2] <- 1
    precio[2] <- 26000

    id[3] <- 3
    fecha[3] <- "2026-09-02"
    cliente[3] <- "C03"
    producto[3] <- "Prensa francesa"
    ciudad[3] <- "CALI"
    cantidad[3] <- 1
    precio[3] <- 95000

    id[4] <- 4
    fecha[4] <- "2026-09-02"
    cliente[4] <- "C01"
    producto[4] <- "Origen Huila 500 g"
    ciudad[4] <- "MEDELLIN"
    cantidad[4] <- 1
    precio[4] <- 42000

    id[5] <- 5
    fecha[5] <- "2026-09-03"
    cliente[5] <- "C04"
    producto[5] <- "Origen Sierra 500 g"
    ciudad[5] <- "MEDELLIN"
    cantidad[5] <- 3
    precio[5] <- 45000

    id[6] <- 6
    fecha[6] <- "2026-09-03"
    cliente[6] <- "C05"
    producto[6] <- "Origen Nariño 250 g"
    ciudad[6] <- "BOGOTA"
    cantidad[6] <- 2
    precio[6] <- 26000

    id[7] <- 7
    fecha[7] <- "2026-09-04"
    cliente[7] <- "C02"
    producto[7] <- "Molino manual"
    ciudad[7] <- "BOGOTA"
    cantidad[7] <- 1
    precio[7] <- 120000

    id[8] <- 8
    fecha[8] <- "2026-09-04"
    cliente[8] <- "C06"
    producto[8] <- "Origen Huila 500 g"
    ciudad[8] <- "CALI"
    cantidad[8] <- 0
    precio[8] <- 42000

    id[9] <- 9
    fecha[9] <- "2026-09-05"
    cliente[9] <- "C03"
    producto[9] <- "Origen Sierra 500 g"
    ciudad[9] <- "CALI"
    cantidad[9] <- 2
    precio[9] <- 45000

    id[10] <- 10
    fecha[10] <- "2026-09-05"
    cliente[10] <- "C07"
    producto[10] <- "Origen Huila 500 g"
    ciudad[10] <- "PEREIRA"
    cantidad[10] <- 4
    precio[10] <- 42000

    id[11] <- 11
    fecha[11] <- "2026-09-06"
    cliente[11] <- "C01"
    producto[11] <- "Prensa francesa"
    ciudad[11] <- "MEDELLIN"
    cantidad[11] <- 1
    precio[11] <- 95000

    id[12] <- 12
    fecha[12] <- "2026-09-06"
    cliente[12] <- "C08"
    producto[12] <- "Origen Nariño 250 g"
    ciudad[12] <- "BOGOTA"
    cantidad[12] <- 3
    precio[12] <- 26000

    // 5. Inicializar acumuladores y contadores

    unidadesVendidas <- 0
    ingresosTotales <- 0

    ventasValidas <- 0
    ventasIncorrectas <- 0

    ingresosMedellin <- 0
    ingresosBogota <- 0
    ingresosCali <- 0
    ingresosPereira <- 0

    // 6. Recorrer y procesar las ventas

    Para i <- 1 Hasta 12 Hacer

        Si cantidad[i] > 0 Entonces

            ventasValidas <- ventasValidas + 1

            unidadesVendidas <- unidadesVendidas + cantidad[i]

            valorVenta <- cantidad[i] * precio[i]

            ingresosTotales <- ingresosTotales + valorVenta

            Segun ciudad[i] Hacer

                "MEDELLIN":
                    ingresosMedellin <- ingresosMedellin + valorVenta

                "BOGOTA":
                    ingresosBogota <- ingresosBogota + valorVenta

                "CALI":
                    ingresosCali <- ingresosCali + valorVenta

                "PEREIRA":
                    ingresosPereira <- ingresosPereira + valorVenta

            FinSegun

        SiNo

            ventasIncorrectas <- ventasIncorrectas + 1

        FinSi

    FinPara

    // 7. Mostrar resultados

    Escribir "INGRESOS TOTALES: $", ingresosTotales

    Escribir "UNIDADES VENDIDAS: ", unidadesVendidas

    Escribir "VENTAS VALIDAS: ", ventasValidas

    Escribir "VENTAS INCORRECTAS: ", ventasIncorrectas

    Escribir "INGRESOS POR CIUDAD:"

    Escribir "MEDELLIN: $", ingresosMedellin
    Escribir "BOGOTA: $", ingresosBogota
    Escribir "CALI: $", ingresosCali
    Escribir "PEREIRA: $", ingresosPereira

FinAlgoritmo


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

-------------



