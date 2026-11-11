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