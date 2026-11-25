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



Funcion: totalVendidoM

¿Que recorro? Todo el arreglo de ventas.

¿Que filtro? Nada, recorro todos los elementos.

¿Que transformo? Cada objeto de venta a un valor numérico usando la función valorVenta().

¿Que acumulo? La suma total del dinero de todas las ventas.

¿Como agrupo? No agrupo, solo devuelvo un único valor total.

Funcion: unidadesVendidasM

¿Que recorro? Todo el arreglo de ventas.

¿Que filtro? Nada, recorro todos los elementos.

¿Que transformo? Extraigo la propiedad cantidad de cada objeto.

¿Que acumulo? La suma de las cantidades de todos los productos.

¿Como agrupo? No agrupo, solo devuelvo un único valor total.

Funcion: ventasPorCiudadM

¿Que recorro? El arreglo de ventas (primero se filtra y luego se reduce).

¿Que filtro? Solo las ventas cuya ciudad coincida con la ciudadBuscada, ignorando mayúsculas y espacios sobrantes.

¿Que transformo? El texto de la ciudad a minúsculas y sin espacios extremos para poder comparar correctamente.

¿Que acumulo? El dinero total de las ventas que pasaron el filtro.

¿Como agrupo? No agrupo, solo devuelvo el total de una ciudad específica.

Funcion: totalPorCiudad

¿Que recorro? Todo el arreglo de ventas.

¿Que filtro? Nada, recorro todos los elementos.

¿Que transformo? El nombre de la ciudad (lo paso a minúsculas, quito espacios y capitalizo la primera letra para unificar "Bogotá" y "Bogotá ").

¿Que acumulo? El dinero total por cada ciudad.

¿Como agrupo? Creando un diccionario (objeto) donde la llave es el nombre de la ciudad y el valor es la suma de sus ventas.

Funcion: unidadesPorProducto

¿Que recorro? Todo el arreglo de ventas.

¿Que filtro? Nada, recorro todos los elementos.

¿Que transformo? Nada, tomo directamente el nombre del producto.

¿Que acumulo? La cantidad de unidades vendidas.

¿Como agrupo? Creando un diccionario (objeto) donde la llave es el nombre del producto y el valor es el total de unidades.

Funcion: topProductosPorValor

¿Que recorro? El arreglo de ventas (para acumular) y luego el arreglo de pares generado por Object.entries (para ordenar).

¿Que filtro? Nada, recorro todos los elementos.

¿Que transformo? El objeto diccionario a un arreglo de arreglos con Object.entries, y luego a un arreglo de objetos con map.

¿Que acumulo? El dinero total generado por cada producto.

¿Como agrupo? Primero agrupo por producto en un diccionario, luego ordeno de mayor a menor con sort (creando una copia con spread operator) y finalmente corto el top con slice.

-----------------------------------------------------------------------------------------------------------------------------------------------------

MINI RETO 4 

## MINI RETO 4: Registro de Depuración
### Error 1: Caída del sistema al calcular ventas por ciudad

*   **Síntoma:** La terminal se cerraba abruptamente mostrando el mensaje `TypeError: Cannot read properties of undefined (reading 'toLowerCase')`.
*   **Entrada que lo produce:** Llamar a la función `ventasPorCiudadM(ventas)` sin pasarle el segundo parámetro.
*   **Hipótesis:** La función esperaba recibir la variable `ciudadBuscada`, pero al no enviarla, su valor era `undefined`. Al intentar ejecutar el método `.toLowerCase()` sobre un valor indefinido, JavaScript generaba un error y detenía la ejecución.
*   **Prueba realizada:** Se agregó un `console.log(ciudadBuscada)` al inicio de la función para verificar su valor. Al ejecutar, la consola imprimió `undefined`, confirmando la hipótesis.
*   **Causa:** Error humano (omisión) al momento de invocar la función, olvidando el segundo argumento requerido.
*   **Corrección:** Se modificó la llamada en el archivo de pruebas para que quedara así: `ventasPorCiudadM(ventas, "Medellín")`.

### Error 2: Reporte con valores NaN o undefined en días sin ventas

*   **Síntoma:** Al generar el reporte para una fecha en la que no hubo ventas (ej. `2026-12-25`), los totales se mostraban como `NaN` (Not a Number) o `undefined` en lugar de `$ 0`.
*   **Entrada que lo produce:** Ejecutar `ventasDelDia(ventas, "2026-12-25")` donde el arreglo filtrado resultaba vacío (`[]`).
*   **Hipótesis:** Al filtrar y no encontrar registros, el arreglo quedaba vacío. Al intentar usar `reduce` sobre un arreglo vacío sin valor inicial, JavaScript fallaba o devolvía un valor indefinido. Además, dividir por cero en promedios generaba `NaN`.
*   **Prueba realizada:** Se llamó a la función `ventasDelDia` con una fecha inexistente y se imprimió el objeto resultante por consola. Efectivamente, el total era `undefined`.
*   **Causa:** Falta de validación de casos borde (arreglos vacíos) en las funciones de cálculo matemático.
*   **Corrección:** Se agregó el valor inicial `0` al final de las funciones `reduce` en `ventasDelDia` y se añadieron las validaciones `if (ventas.length === 0) return 0;` en las funciones matemáticas (como `ticketPromedio`) para evitar divisiones por cero. Ahora el reporte muestra correctamente `$ 0` y `0` unidades.

-------------------------------------------------------------------------------------------------------
# Bitácora de Desarrollo: Medición de Rendimiento y Complejidad Algorítmica

## 1. contexto del mini reto 5
El objetivo de esta práctica fue construir un generador de datos masivos (`generarVentas(n)`) para simular el crecimiento de una base de datos y, posteriormente, instrumentar las funciones analíticas (`totalVendido`, `ventaMayor`, `totalPorCiudad` y una función extra `primeraVenta`) con un objeto contador. Esto permitió medir empíricamente el número de operaciones y el tiempo de ejecución al escalar los datos a 100, 1.000, 10.000 y 100.000 registros.

## 2. Predicciones (Hipótesis Inicial)
Antes de ejecutar el código, analizamos la lógica de los bucles y establecimos las siguientes predicciones:
*   **Funciones con bucles (`totalVendido`, `ventaMayor`, `totalPorCiudad`):** Si el tamaño de los datos (`n`) se multiplica por 10, el número de operaciones debería multiplicarse también por 10. Si se pasan 1.000 ventas, el bucle se ejecutará 1.000 veces.
*   **Función de acceso directo (`primeraVenta`):** Al no tener bucles y acceder directamente al primer índice del arreglo (`ventas[0]`), el número de operaciones debería ser siempre 1, sin importar si hay 10 o 100.000 ventas.
*   **Tiempo de ejecución:** Se predijo que las funciones lineales tardarían proporcionalmente más a medida que crece `n`, mientras que `primeraVenta` mantendría un tiempo casi instantáneo y constante.

## 3. Resultados Obtenidos (Ejecución Real)
Al ejecutar el script `src/medir.js`, obtuvimos la siguiente tabla de rendimiento:

| Función | Tamaño (n) | Operaciones | Tiempo (ms) |
| :--- | :--- | :--- | :--- |
| totalVendido | 100 | 100 | 0.0331 |
| ventaMayor | 100 | 106 | 0.0379 |
| totalPorCiudad | 100 | 100 | 0.0003 |
| primeraVenta | 100 | **1** | 0.0152 |
| totalVendido | 1,000 | 1,000 | 0.0799 |
| ventaMayor | 1,000 | 1,003 | 0.2459 |
| totalPorCiudad | 1,000 | 1,000 | 0.0010 |
| primeraVenta | 1,000 | **1** | 0.0010 |
| totalVendido | 10,000 | 10,000 | 1.3495 |
| ventaMayor | 10,000 | 10,003 | 0.3178 |
| totalPorCiudad | 10,000 | 10,000 | 1.5762 |
| primeraVenta | 10,000 | **1** | 0.0022 |
| totalVendido | 100,000 | 100,000 | 8.9946 |
| ventaMayor | 100,000 | 100,004 | 0.8261 |
| totalPorCiudad | 100,000 | 100,000 | 13.4422 |
| primeraVenta | 100,000 | **1** | 0.0045 |

## 4. Comparación: Predicción vs. Realidad
*   **Cumplimiento de la linealidad:** Se confirmó la predicción. En `totalVendido` y `totalPorCiudad`, las operaciones fueron exactamente 100, 1.000, 10.000 y 100.000. Al multiplicar `n` por 10, las operaciones se multiplicaron por 10.
*   **El caso de `ventaMayor`:** Aunque sigue la tendencia lineal, las operaciones fueron ligeramente mayores (ej. 106 en lugar de 100). Esto ocurre porque el código tiene un condicional `if (valorActual > valorMaximo)`. Las operaciones extra corresponden a las veces que el código entró en ese `if` para actualizar el valor máximo.
*   **El caso de `primeraVenta`:** Se mantuvo con exactamente **1 operación** en todos los escenarios, demostrando que su costo computacional es independiente del tamaño del arreglo.
*   **El caso del Tiempo:** Los tiempos reales fluctúan (ej. `totalPorCiudad` tomó 13.44 ms en 100.000 registros, mientras que `ventaMayor` tomó 0.82 ms). Esto se debe a que `totalPorCiudad` usa métodos de string (`toLowerCase`, `trim`, etc.), los cuales consumen más recursos del procesador que la simple comparación de números.

## 5. Clasificación Big O y Justificación Técnica
A partir del análisis de código y los resultados empíricos, clasificamos las funciones de la siguiente manera:

*   **`totalVendido` (O(n) - Tiempo Lineal):** 
    *   *Justificación:* Utiliza un bucle `for...of` que recorre el arreglo completo una sola vez. El número de operaciones crece de forma directamente proporcional al número de ventas (n).
*   **`ventaMayor` (O(n) - Tiempo Lineal):**
    *   *Justificación:* Itera sobre todo el arreglo para comparar cada venta con el máximo actual. Aunque tiene un pequeño costo extra por el condicional `if`, su comportamiento asintótico sigue siendo lineal.
*   **`totalPorCiudad` (O(n) - Tiempo Lineal):**
    *   *Justificación:* Utiliza el método `.reduce()`, el cual internamente itera sobre todos los elementos del arreglo exactamente una vez. El número de operaciones es igual a n.
*   **`primeraVenta` (O(1) - Tiempo Constante):**
    *   *Justificación:* No tiene bucles. Accede directamente a la posición `[0]` del arreglo en la memoria. Realiza exactamente 1 operación, sin importar si hay 10 o 1.000.000 de elementos.
*   *(Nota: Ninguna función de este reto es O(n²). Para que existiera una O(n²), tendríamos que tener un bucle `for` dentro de otro bucle `for`, recorriendo el mismo arreglo).*

## 6. Conclusión del Aprendizaje
Esta práctica demuestra por qué la notación **Big O** es vital en el desarrollo backend. La diferencia entre una función O(1) y una O(n) es abismal cuando hablamos de millones de registros en una base de datos real. Gracias a esta instrumentación, comprobamos que la cantidad de operaciones (el contador) es un reflejo matemático exacto de la complejidad algorítmica, mientras que el tiempo en milisegundos puede variar por factores del hardware o el motor de Node.js (como el recolector de basura o el manejo de strings).

-------------------------------------------------------------------------------------------------------
# Reto 6: Diagnóstico de Complejidad y Optimización

## 1. Verificación Inicial (Día 1)
Al ejecutar la función `clientesRecurrentes` con los 12 registros del archivo `datos.js`, el resultado obtenido fue: `['C01', 'C02', 'C03']`.
Esto es correcto, ya que al revisar la data:
*   El cliente **C01** aparece en las ventas con ID 1, 4 y 11.
*   El cliente **C02** aparece en las ventas con ID 2 y 7.
*   El cliente **C03** aparece en las ventas con ID 3 y 9.

## 2. Traza Manual (Paso a paso con n=5)
Para entender el algoritmo, tomamos un arreglo de 5 ventas simuladas: `['C01', 'C02', 'C01', 'C03', 'C02']`.
El algoritmo usa dos bucles `for` anidados. El bucle exterior (`i`) actúa como ancla, y el interior (`j`) compara desde la posición siguiente (`i+1`).

| i (Ancla) | j (Comparaciones) | ¿Coincide el cliente? | Arreglo `recurrentes` | Comparaciones realizadas |
| :--- | :--- | :--- | :--- | :--- |
| 0 (C01) | 1, 2, 3, 4 | Sí (en j=2) | `['C01']` | 4 |
| 1 (C02) | 2, 3, 4 | Sí (en j=4) | `['C01', 'C02']` | 3 |
| 2 (C01) | 3, 4 | No | `['C01', 'C02']` | 2 |
| 3 (C03) | 4 | No | `['C01', 'C02']` | 1 |
| 4 (C02) | (Ninguna) | - | `['C01', 'C02']` | 0 |

**Generalización matemática:** Las comparaciones totales son 4 + 3 + 2 + 1 = 10.
Para `n` ventas, la fórmula es **`n * (n - 1) / 2`**. Esto nos indica un crecimiento cuadrático.

## 3. Medición de Tiempos de Ejecución
Usando el generador de datos del MiniReto 5 (`generadordeVentas`), se ejecutó la función con distintos tamaños `n` y se cronometró con `console.time` y `console.timeEnd`.

| Tamaño (n) | Tiempo de ejecución (ms) | ¿Qué pasa al duplicar n? |
| :--- | :--- | :--- |
| 1,000 | 6.889 ms | - |
| 2,000 | 14.166 ms | El tiempo casi se duplica. |
| 4,000 | 56.654 ms | El tiempo se multiplica **x4**. |
| 8,000 | 228.814 ms | El tiempo se multiplica **x4**. |
| 16,000 | 914.678 ms | El tiempo se multiplica **x4**. |
| 100,000 | 36,508 ms (36.5 s) | El tiempo se dispara exponencialmente. |

## 4. Análisis de los Resultados (Complejidad O(n²))
Al analizar la tabla (especialmente a partir de n=2,000), se evidencia que al duplicar el tamaño de la entrada, **el tiempo de ejecución se cuadruplica** (Ej: `56.654 / 14.166 ≈ 4`).
Esto confirma empíricamente que el algoritmo tiene una **complejidad O(n²)**. La razón es el uso de dos bucles `for` anidados: si el arreglo crece al doble, el bucle exterior se ejecuta el doble de veces, y por cada una de esas veces, el bucle interior también se ejecuta el doble de veces (\(2 \times 2 = 4\)).

## 5. Estimación para 1,000,000 de ventas
Para calcular cuánto tardaría el reporte con el volumen histórico real, usamos la medición de **100,000 ventas (36.5 segundos)**.
*   Para llegar de 100,000 a 1,000,000, los datos crecen **10 veces**.
*   Como la complejidad es \(O(n^2)\), el tiempo crecerá \(10^2 = 100\) veces.
*   Cálculo: \(36.5 \text{ segundos} \times 100 = 3,650 \text{ segundos}\).
*   En minutos: \(3,650 / 60 = \textbf{60.8 minutos}\).
**Conclusión:** El reporte tardaría **más de 1 hora** en ejecutarse, colapsando el servidor.

## 6. El Costo Oculto de `includes()`
El código original usa `recurrentes.includes(...)`. Este método recorre el arreglo `recurrentes` de principio a fin cada vez que se llama.
*   En el peor caso (cuando todos los clientes son diferentes), el arreglo `recurrentes` crece hasta tener `n` elementos.
*   Al estar dentro de los dos bucles, esta búsqueda lineal interna eleva la complejidad real del algoritmo a **O(n³)**. Si los datos se duplican, el tiempo no se multiplicaría por 4, sino por 8.

## 7. Conclusión para la Gerencia (Sin tecnicismos)
> "El motivo por el cual el reporte de clientes recurrentes se volvió lento es porque el sistema actual compara cada venta contra absolutamente todas las demás ventas de la base de datos, una por una. Es como buscar un par de zapatos iguales en un almacén revisando caja por caja al azar. 
> A medida que la empresa crece, el esfuerzo del servidor no aumenta de forma proporcional, sino exponencial: si duplicamos las ventas, el sistema tarda **cuatro veces más**. Con el volumen actual de 1 millón de ventas, este método tardaría **más de una hora** en generar el reporte. La solución no es comprar un servidor más potente, sino actualizar la lógica del sistema para que use un 'índice' (como un diccionario). Con esta mejora, el tiempo de espera se reduciría a menos de 2 segundos, permitiendo que el reporte sea instantáneo y el servidor no colapse."

---

### 8 . como funciona el codigo del compañero (esto del mini reto 6)

function clientesRecurrentes(ventas) {


    const recurrentes = []; // Caja vacía para guardar clientes repetidos.
    
    // i es el "Ancla". Recorre desde 0 hasta el final.
    for (let i = 0; i < ventas.length; i++) {
        
        // j es el "Comparador". Empieza en i + 1 para no comparar la venta consigo misma.
        for (let j = i + 1; j < ventas.length; j++) {
            
            // Condición doble:
            // 1. ventas[i].cliente === ventas[j].cliente (¿Son el mismo cliente?)
            // 2. !recurrentes.includes(...) (¿NO lo hemos guardado ya?)
            if (ventas[i].cliente === ventas[j].cliente && 
                !recurrentes.includes(ventas[i].cliente)) {
                
                recurrentes.push(ventas[i].cliente); // Lo guardamos.
            }
        }
    }
    return recurrentes; // Devolvemos la caja.
}
----------------------------------------------------------
 
 
 
 #  Bitácora y Análisis: Mini Reto 7 (Complejidad Espacial)

## 1. Objetivo del Reto
Analizar la complejidad espacial (uso de memoria RAM) de dos enfoques distintos para calcular las ventas de una ciudad específica. El objetivo es comprender cómo la cadena de métodos (`map`, `filter`, `reduce`) afecta el consumo de memoria en comparación con un recorrido único (`for...of`), especialmente en un entorno de servidor con recursos limitados.

---

## 2. Prueba de Ejecución (10,000 Ventas)
Se utilizó el script `minireto7.js` junto con el `generadordeVentas(10000)` para comparar ambas funciones y comprobar que devuelven exactamente el mismo resultado matemático.

**Resultados Obtenidos:**
*   **Resultado de `totalCiudadCadena`:** `$ 125,450,000` (valor de ejemplo, depende de la aleatoriedad).
*   **Resultado de `totalCiudadUnPasada`:** `$ 125,450,000`.
*   **¿Coinciden exactamente?:** **SÍ ✅**. Ambas funciones son correctas a nivel de cálculo.

---

## 3. Bitácora de Memoria (Traversals y Arreglos)

Para entender el impacto en el servidor, analizamos lo que hace el motor de JavaScript (V8) "por debajo de la mesa" al procesar 10,000 ventas.

### 🔹 Versión 1: Cadena de Métodos (`totalCiudadCadena`)
*   **Recorridos completos (Traversals):** **4**
    1.  `.map()` para normalizar las ciudades.
    2.  `.filter()` para dejar solo las ventas de la ciudad buscada.
    3.  `.map()` para transformar los objetos a valores numéricos.
    4.  `.reduce()` para sumar los valores.
*   **Arreglos nuevos creados en memoria:** **3**
    1.  Arreglo de 10,000 objetos (con las ciudades normalizadas).
    2.  Arreglo de los objetos filtrados (ej. 2,000 ventas de Medellín).
    3.  Arreglo de 2,000 números (los valores de las ventas filtradas).

### 🔹 Versión 2: Un Solo Recorrido (`totalCiudadUnPasada`)
*   **Recorridos completos (Traversals):** **1**
    1.  `for...of` recorre el arreglo original una sola vez.
*   **Arreglos nuevos creados en memoria:** **0**
    *   Solo se crea la variable primitiva `totalCiudad` (un número) que se actualiza en cada iteración.

---

## 4. ¿Por qué `O(4n)` se simplifica a `O(n)`?
En la notación **Big O**, el objetivo es medir la **tasa de crecimiento** del algoritmo a medida que el tamaño de la entrada (`n`) aumenta, no el número exacto de operaciones.

*   Si `n` se duplica (de 10,000 a 20,000), la versión de cadena pasará de hacer 40,000 operaciones a 80,000.
*   La versión de un solo recorrido pasará de 10,000 a 20,000.
*   En ambos casos, el tiempo de ejecución crece de forma **directamente proporcional** al tamaño de los datos. Las constantes (el 4) se eliminan en Big O porque no afectan la curva de crecimiento a largo plazo. Por lo tanto, ambas son **\(O(n)\) en tiempo**.

---

## 5. Clasificación de la Complejidad Espacial del Motor (`analitica.js`)

Tras revisar tu código, clasificamos las funciones según su uso de memoria:

### Complejidad Espacial Constante \(O(1)\)
*No crean arreglos ni objetos nuevos que dependan del tamaño de `n`. Solo usan variables primitivas para acumular.*
*   `valorVenta`, `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, `totalVendidoM`, `unidadesVendidasM`, `primeraVenta`.
*   **`totalCiudadUnPasada`** (Nuestra versión ganadora).

### Complejidad Espacial Lineal \(O(n)\)
*Crean estructuras de datos (arreglos u objetos) en la memoria RAM que crecen proporcionalmente al número de ventas.*
*   **`ventasPorCiudadM`**: Usa `.filter()`, lo que genera un arreglo intermedio.
*   **`totalPorCiudad`** y **`unidadesPorProducto`**: Usan `.reduce()` para crear un objeto diccionario. En el peor de los casos (todas las ciudades/productos son únicos), el objeto crece hasta tener `n` elementos.
*   **`topProductosPorValor`**: Hace `reduce` (objeto), `Object.entries` (arreglo), `map` (arreglo) y `slice` (arreglo). Crea múltiples copias temporales.
*   **`ventasDelDia`**: Usa `.filter()`, creando un arreglo intermedio.
*   **`totalCiudadCadena`**: Crea 3 arreglos intermedios.

---

## 6. Decisión Técnica y Justificación Final

**Decisión:** Se decide implementar y dejar en el motor (en producción) la función **`totalCiudadUnPasada`**.

**Justificación (Argumentos de Recursos y Legalidad):**
El contexto del problema indica claramente que *"La plataforma del marketplace corre en un servidor con memoria limitada"*.
1.  **Recursos:** La versión `totalCiudadCadena` es muy elegante y legible (estilo declarativo), pero para 100,000 ventas crearía 300,000 estructuras temporales en la RAM. Esto podría provocar un **Out Of Memory (OOM)** y tumbar el servidor.
2.  **Legibilidad vs Rendimiento:** La versión `totalCiudadUnPasada` (estilo imperativo) es igual de legible para un desarrollador junior, pero garantiza el mismo resultado exacto con un consumo de memoria de **\(O(1)\)**. Protege la estabilidad del servicio sin sacrificar la claridad del código.

--------------------------------------------------------


##  MINI RETO 8 PUNTO 6. Observaciones del Compañero (Peer Review v0.2)
---

## 6. Observaciones del Compañero (Peer Review v0.2)

**Nombre del Revisor:** [juan pablo morales salazar]
**Fecha:** [23/11/2026]

**Observaciones del compañero:**
"Revisé la bitácora y el archivo `RENDIMIENTO.md`. La traza manual y el análisis de por qué el tiempo se multiplica por 4 están bien fundamentados. La propuesta de optimización con `Set` es la más adecuada para eliminar los ciclos anidados. Como recomendación, sugiero asegurar el uso de `Array.from()` al retornar el `Set` para no alterar el tipo de dato de salida original."

**Respuesta del autor:** (juan sebastian ortega mesa)
"Gracias por la revisión y la sugerencia. Tomo nota de lo del `Array.from()` para incluirlo en la refactorización final y garantizar la consistencia del código. Quedo atento a cualquier otra observación."

---

## 7. Cambios y Cierre de Versión (v0.2)

Como parte del ciclo de mejora continua y tras la revisión del par, se documentan los cambios realizados para la entrega final del motor analítico:

1.  **Creación del archivo `RENDIMIENTO.md`:** Se documentó la tabla de complejidad algorítmica (Tiempo y Espacio) para todas las funciones del motor, las proyecciones a 1 millón de datos, la matriz de riesgos y el plan de optimización.
2.  **Integración de los MiniRetos 6 y 7:** Se añadieron las funciones de diagnóstico (`clientesRecurrentes`) y las dos versiones de suma por ciudad (`totalCiudadCadena` y `totalCiudadUnPasada`).
3.  **Aplicación de la revisión del compañero:** Se acogió la recomendación técnica del revisor. Para la solución del Mini Reto 6, se implementó el uso de `Set` para eliminar los ciclos anidados (reduciendo la complejidad de \(O(n^2)\) a \(O(n)\)) y se añadió el método `Array.from()` para garantizar que la función siga devolviendo un Arreglo (Array) y no un Conjunto (Set), manteniendo así el contrato original del código.

### Código Propuesto (Solución Final Optimizada - Mini Reto 6)

Este es el código que se implementará en producción para reemplazar la función original del compañero, solucionando el problema de rendimiento diagnosticado:

```javascript

function clientesRecurrentesOptimizado(ventas) {
    const vistos = new Set();      
    const recurrentes = new Set(); 

    // Un solo recorrido O(n)
    for (let i = 0; i < ventas.length; i++) {
        const clienteActual = ventas[i].cliente;
        
        if (vistos.has(clienteActual)) {
            recurrentes.add(clienteActual); 
        } else {
            vistos.add(clienteActual);     
        }
    }
    
    // Incorporación sugerida por el compañero:   
    // Convertimos el Set de vuelta a un Arreglo para no romper el tipo de dato esperado.//
    return Array.from(recurrentes); 
}

```
-----------------------------


## MINI RETO 9: Optimizacion con Set y Map, y Analisis de Trade-off
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

### ¿Qué significa cada dato?
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
| Precio igual a cero | `precio = 0` | No representa un precio de venta válido según las reglas definidas. | Rechazarlo o revisar si se trata de una promoción gratuita. |
| Cantidad negativa | `cantidad = -3` | Representaría una cantidad imposible en una venta normal. | Rechazar el registro o tratarlo como devolución en un proceso separado. |
| Precio negativo | `precio = -42000` | Generaría un valor total negativo. | Rechazarlo o manejarlo como ajuste/devolución por separado. |
| Fecha incorrecta | `2026-15-40` | No corresponde a una fecha válida. | Validar el calendario antes de aceptar el registro. |
| Cliente vacío | `cliente = ""` | No se podría identificar al comprador. | Rechazar el registro. |
| Producto vacío | `producto = ""` | No se sabría qué artículo se vendió. | Rechazar el registro. |
| Cantidad decimal | `cantidad = 2.5` | No corresponde a unidades completas en este inventario. | Exigir un número entero. |

---

# Reto 2: Pseudocódigo y Lógica
1. Iniciar el contador de registros incorrectos en cero.
2. Recorrer los 12 registros.
3. Comprobar si la cantidad es menor o igual a cero.
4. Si cumple la condición, aumentar el contador en uno.
5. Al terminar, mostrar la cantidad de registros incorrectos.

**Lógica para agrupar por ciudad:**
1. Crear un acumulador para cada ciudad.
2. Inicializar todos los acumuladores en cero.
3. Recorrer los 12 registros.
4. Comprobar que la cantidad sea mayor que cero.
5. Calcular el valor de la venta multiplicando cantidad por precio.
6. Identificar la ciudad del registro.
7. Sumar el valor de la venta al acumulador correspondiente.
8. Al terminar, mostrar los ingresos de cada ciudad.
*(Todo debe ser normalizado para evitar errores de tipeo o de datos).*

---

# Verificación manual con tablas de traza (Mini Reto 2)

**Traza de totalVendido(ventas)**
| ID | Cantidad | Precio | Operación | Total acumulado |
|---|---|---|---|---|
| 1 | 2 | 42000 | 2 * 42000 = 84000 | 84000 |
| 2 | 1 | 26000 | 1 * 26000 = 26000 | 110000 |
| ... | ... | ... | ... | ... |
| 12 | 3 | 26000 | 3 * 26000 = 78000 | 985000 |
*Resultado manual: 985000. Resultado del programa: 985000. Los resultados coinciden.*

---

# Bitácora de Desarrollo: Medición de Rendimiento y Complejidad Algorítmica (Mini Reto 5)

## 1. Predicciones vs Realidad
*   **Funciones con bucles (`totalVendido`, `ventaMayor`, `totalPorCiudad`):** Al multiplicar `n` por 10, las operaciones se multiplicaron por 10.
*   **Función de acceso directo (`primeraVenta`):** El número de operaciones fue siempre 1, sin importar si hay 10 o 100.000 ventas.

## 2. Clasificación Big O y Justificación Técnica
*   **`totalVendido` (O(n)):** Bucle `for...of` que recorre el arreglo una sola vez.
*   **`ventaMayor` (O(n)):** Itera sobre todo el arreglo para comparar cada venta con el máximo actual.
*   **`totalPorCiudad` (O(n)):** Utiliza `.reduce()`, iterando sobre todos los elementos exactamente una vez.
*   **`primeraVenta` (O(1)):** Acceso directo a la posición `[0]`. Realiza exactamente 1 operación.

---

# Reto 6: Diagnóstico de Complejidad (O(n²))

Al ejecutar la función original `clientesRecurrentes` (con dos bucles `for` anidados) con distintos tamaños, se evidenció que al duplicar el tamaño de la entrada, **el tiempo de ejecución se cuadruplica**.

**Estimación para 1,000,000 de ventas:**
*   Para llegar de 100,000 a 1,000,000, los datos crecen 10 veces.
*   Como la complejidad es \(O(n^2)\), el tiempo crecerá \(10^2 = 100\) veces.
*   Cálculo: \(36.5 \text{ segundos} \times 100 = 3,650 \text{ segundos}\) (**Más de 60 minutos**).

**El Costo Oculto de `includes()`:**
El método `recurrentes.includes(...)` recorre el arreglo internamente. Al estar dentro de los dos bucles, eleva la complejidad real a **O(n³)**.

---

# Mini Reto 7: Complejidad Espacial (Trade-offs)

Se compararon dos enfoques para calcular ventas por ciudad:
1.  **`totalCiudadCadena` (4 Traversals):** Usa `.map()`, `.filter()`, `.map()` y `.reduce()`. Crea **3 arreglos nuevos** en memoria.
2.  **`totalCiudadUnPasada` (1 Traversal):** Usa un solo `for...of`. Crea **0 arreglos nuevos**.

**Decisión Técnica:** Se elige `totalCiudadUnPasada` en producción. Protege el servidor (memoria limitada) garantizando un consumo de memoria \(O(1)\) con el mismo resultado exacto.

---

# MINI RETO 10: Estructuras Clave-Valor y Optimización de Búsquedas

## 1. Resolución de Combos (Fuerza Bruta vs Map)
*   **Fuerza Bruta (`comboRegaloFuerzaBruta`):** Usa dos bucles `for` anidados para comparar cada producto con todos los demás. Complejidad Temporal: **O(n²)**. Complejidad Espacial: **O(1)**.
*   **Optimizado (`comboRegaloOptimizado`):** Usa un `Map` para guardar los precios vistos y calcular el complemento (`valor - precioActual`) en una sola pasada. La búsqueda en el Map es O(1). Complejidad Temporal: **O(n)**. Complejidad Espacial: **O(n)** (por el Map creado).

### Traza del Combo Optimizado (Buscando 87,000)
1. Revisa `Origen Nariño 250 g` (26,000). Complemento: 61,000. No está en el Map. Lo guarda.
2. Revisa `Origen Huila 500 g` (42,000). Complemento: 45,000. No está en el Map. Lo guarda.
3. Revisa `Origen Sierra 500 g` (45,000). Complemento: **42,000**. **¡Está en el Map!** Retorna `[Origen Huila 500 g, Origen Sierra 500 g]`.

## 2. Regla de Desempate en `productoEstrellaPorCiudad`
Cuando dos o más productos tienen exactamente la misma cantidad de ventas (frecuencia) en una ciudad, el algoritmo implementado resuelve el empate **quedándose con el primer producto que encontró en el orden de inserción del Map**. 
Esto ocurre porque la condición de actualización es estrictamente mayor (`if (frecuencia > maxFrecuencia)`). Si la frecuencia es igual, el algoritmo no actualiza la variable y mantiene el primer producto que alcanzó ese máximo.

## 3. Primer Cliente Único (`primerClienteUnico`)
El objetivo es encontrar al primer cliente en orden de ventas que **solo aparezca una vez en todo el historial**. 
*   **Corrección lógica:** Inicialmente se contaron los productos, pero al leer la rúbrica detenidamente, se ajustó la lógica para contar las frecuencias de los **clientes**.
*   Al recorrer los datos del Día 1, el cliente **C04** (ID 5) es el primero que tiene una frecuencia global igual a 1. Por ende, el algoritmo devuelve correctamente `C04`.

## 4. Justificación de Complejidad Algorítmica (Big O)
Los criterios exigen que las tres funciones sean O(n). Aquí la justificación técnica:

*   **`comboRegaloOptimizado` (Tiempo: O(n) / Espacio: O(n)):**
    *   *Justificación:* Utiliza un solo bucle `for` para recorrer el catálogo una única vez. La búsqueda del complemento en el `Map` se hace en tiempo constante O(1). El espacio es O(n) porque en el peor de los casos (no hay combinación) guardaremos todos los productos en el Map.
*   **`productoEstrellaPorCiudad` (Tiempo: O(n) / Espacio: O(k)):**
    *   *Justificación:* Recorre el arreglo de ventas una sola vez para llenar un Map anidado (Ciudad -> Producto -> Frecuencia). Luego, recorre los Map creados, cuyo tamaño total está acotado por `n`. Por lo tanto, el tiempo crece linealmente con la cantidad de ventas.
*   **`primerClienteUnico` (Tiempo: O(n) / Espacio: O(n)):**
    *   *Justificación:* Utiliza dos recorridos secuenciales (no anidados) sobre el arreglo de ventas. El primero llena un Map de frecuencias (O(n)), y el segundo busca en el Map en tiempo O(1) por cada venta (O(n)). En notación Big O, \(O(n) + O(n)\) se simplifica a **O(n)**.

## 5. Casos Borde Probados
*   **Sin solución:** Si no hay combinación para el combo, devuelve `null`.
*   **Empates:** Documentado en el punto 2.
*   **Arreglo vacío:** Si las ventas están vacías, los mapas se crean vacíos y el algoritmo devuelve `null` sin romperse.


--------------------------------------------------------------------

## MINI RETO 9: Optimización con Set y Map, y Análisis de Trade-off

### 1. Método de resolución (6 fases)
1. **Entender el problema:**
   * **Entradas:** Arreglo `ventas` de objetos con propiedad `cliente`.
   * **Salidas:** Arreglo de clientes que aparecen 2 o más veces (`clientesRecurrentesSet`), y un `Map` con el conteo de compras por cliente (`comprasPorCliente`).
   * **Restricciones:** Procesar 100.000 ventas en menos de 1 segundo (`< 1,000 ms`).
2. **Ejemplos y casos borde:**
   * Datos del Día 1 (12 ventas) $\rightarrow$ `['C01', 'C02', 'C03']`.
   * Arreglo vacío `[]` $\rightarrow$ `[]`.
   * Todos los clientes únicos `['C01', 'C02', 'C03']` $\rightarrow$ `[]`.
   * Cliente repetido 3 o más veces $\rightarrow$ aparece una sola vez en la salida.
3. **Fuerza bruta y complejidad:** La versión original compara cada venta contra las siguientes mediante dos bucles `for` anidados ($O(n^2)$) y verifica duplicados con `.includes()` ($O(n)$), alcanzando $O(n^3)$ en el peor caso (`36,508 ms` para `100,000` ventas).
4. **Idea de optimización:** Reemplazar las búsquedas lineales por consultas en tiempo constante $O(1)$: dos `Set` (`vistos` y `recurrentes`) en un único recorrido (`clientesRecurrentesSet`), y un `Map` de frecuencias por cliente (`comprasPorCliente`).
5. **Implementación y verificación:** Se verificó con resultados ordenados que la versión original, `clientesRecurrentesSet` y `comprasPorCliente` devuelven exactamente los mismos clientes en los datos del Día 1 (`[C01, C02, C03]`), en `5,000` ventas generadas, en arreglo vacío (`[]`) y cuando todos los clientes son únicos (`[]`).
6. **Medición y análisis:** Se cronometraron las tres versiones con `console.time` para `1,000`, `10,000` y `100,000` ventas.

### 2. Tabla de medición de tiempos reales (`src/pruebas-mini-retos/minireto9.js`)

| Tamaño ($n$) | Original $O(n^2)$ | `clientesRecurrentesSet` $O(n)$ | `comprasPorCliente` (`Map`) $O(n)$ | Clientes distintos (`Map.size`) |
| :--- | :--- | :--- | :--- | :--- |
| 1,000 ventas | 4.922 ms | 0.131 ms | 0.350 ms | 526 |
| 10,000 ventas | 315.039 ms | 1.264 ms | 1.475 ms | 5,363 |
| 100,000 ventas | ~36,508 ms (MiniReto 6) | 11.748 ms | 21.284 ms | 53,182 |

### 3. Intercambio entre tiempo y memoria (Trade-off)
* **Ganancia en tiempo:** Se reduce la complejidad temporal de cuadrática $O(n^2)$ a lineal $O(n)$, bajando el tiempo de ejecución para `100,000` ventas de ~36.5 segundos a **11.748 ms** con `Set` y **21.284 ms** con `Map` (cumpliendo el límite de `< 1,000 ms`).
* **Costo en memoria $O(n)$:** Tanto `clientesRecurrentesSet` (dos `Set`) como `comprasPorCliente` (un `Map`) almacenan hasta $n$ claves en memoria RAM cuando todos los clientes son distintos, lo que representa una complejidad espacial **$O(n)$**.

---

## MINI RETO 10: Estructuras Clave-Valor y Optimización de Búsquedas

### 1. Resolución de Combos (Fuerza Bruta vs Map)
* **Fuerza Bruta (`comboRegaloFuerzaBruta`):** Usa dos bucles `for` anidados para comparar cada producto con todos los demás. Complejidad Temporal: **$O(n^2)$**. Complejidad Espacial: **$O(1)$**.
* **Optimizado (`comboRegalo`):** Usa un `Map` para guardar los precios vistos y calcular el complemento (`valor - precioActual`) en una sola pasada. La búsqueda en el `Map` es $O(1)$. Complejidad Temporal: **$O(n)$**. Complejidad Espacial: **$O(n)$** (por el `Map` creado).

#### Traza del Combo Optimizado (Buscando 87,000)
1. Revisa `Origen Nariño 250 g` (`26,000`). Complemento: `61,000`. No está en el `Map`. Lo guarda.
2. Revisa `Origen Huila 500 g` (`42,000`). Complemento: `45,000`. No está en el `Map`. Lo guarda.
3. Revisa `Origen Sierra 500 g` (`45,000`). Complemento: **`42,000`**. **¡Está en el `Map`!** Retorna `[Origen Huila 500 g, Origen Sierra 500 g]`.

#### Resultados reales de ejecución (`src/pruebas-mini-retos/minireto10.js`)
* **Valor `87,000` (Fuerza Bruta y Optimizado):** `Origen Huila 500 g ($42,000) + Origen Sierra 500 g ($45,000)`.
* **Valor `61,000` (Fuerza Bruta y Optimizado):** `Origen Nariño 250 g ($26,000) + Taza de cerámica ($35,000)`.
* **Valor `50,000` (sin combinación posible):** `null`.
* **Catálogo vacío `[]`:** `null`.

### 2. Regla de Desempate en `productoEstrellaPorCiudad`
Cuando dos o más productos tienen exactamente la misma cantidad de ventas (frecuencia) en una ciudad, el algoritmo implementado resuelve el empate **quedándose con el primer producto que encontró en el orden de inserción del `Map`**.
Esto ocurre porque la condición de actualización es estrictamente mayor (`if (frecuencia > maxFrecuencia)`). Si la frecuencia es igual, el algoritmo no actualiza la variable y mantiene el primer producto que alcanzó ese máximo.

* **Resultado real en Datos del Día 1:** `{ Medellín: 'Origen Huila 500 g', Bogotá: 'Origen Nariño 250 g', Cali: 'Prensa francesa', Pereira: 'Origen Huila 500 g' }`.
* **Caso borde empate:** Conserva el primero encontrado (`{ Medellin: 'Origen Huila 500 g' }`).
* **Caso borde arreglo vacío `[]`:** `{}`.

### 3. Primer Cliente Único (`primerClienteUnico`)
El objetivo es encontrar al primer cliente en orden de ventas que **solo aparezca una vez en todo el historial**.
* **Corrección lógica:** Inicialmente se contaron los productos, pero al revisar los requisitos del reto, se ajustó la lógica para contar las frecuencias de los **clientes**.
* Al recorrer los datos del Día 1, el cliente **`C04`** (ID 5) es el primero que tiene una frecuencia global igual a `1`. Por ende, el algoritmo devuelve correctamente `C04`.
* **Casos borde probados:** Sin cliente único devuelve `null`; arreglo vacío `[]` devuelve `null`.

### 4. Justificación de Complejidad Algorítmica (Big O)
Los criterios exigen que las tres funciones sean $O(n)$. Aquí la justificación técnica:

* **`comboRegalo` (Tiempo: $O(n)$ / Espacio: $O(n)$):**
  * *Justificación:* Utiliza un solo bucle `for` para recorrer el catálogo una única vez. La búsqueda del complemento en el `Map` se hace en tiempo constante $O(1)$. El espacio es $O(n)$ porque en el peor de los casos (no hay combinación) guardaremos todos los productos en el `Map`.
* **`productoEstrellaPorCiudad` (Tiempo: $O(n)$ / Espacio: $O(n)$):**
  * *Justificación:* Recorre el arreglo de ventas una sola vez para llenar un `Map` anidado (`Ciudad -> Producto -> Frecuencia`). Luego, recorre los `Map` creados, cuyo tamaño total está acotado por $n$. Por lo tanto, el tiempo crece linealmente con la cantidad de ventas.
* **`primerClienteUnico` (Tiempo: $O(n)$ / Espacio: $O(n)$):**
  * *Justificación:* Utiliza dos recorridos secuenciales (no anidados) sobre el arreglo de ventas. El primero llena un `Map` de frecuencias ($O(n)$), y el segundo busca en el `Map` en tiempo $O(1)$ por cada venta ($O(n)$). En notación Big O, $O(n) + O(n)$ se simplifica a **$O(n)$**.

### 5. Casos Borde Probados
* **Sin solución:** Si no hay combinación para el combo (`50,000`), devuelve `null`.
* **Empates:** Documentado en el punto 2 (conserva el primero encontrado).
* **Arreglo vacío:** Si las ventas están vacías (`[]`), devuelve `{}` en `productoEstrellaPorCiudad` y `null` en `comboRegalo` y `primerClienteUnico` sin romperse.

---

## MINI RETO 11: La mejor racha y el presupuesto exacto

### 1. Traza Manual de las Primeras Posiciones (Ventana Deslizante, $k = 7$)
Para comprender el funcionamiento del algoritmo, se analiza el arreglo de ventas diarias de septiembre. La ventana deslizante optimiza el cálculo al no sumar los 7 días desde cero en cada iteración, sino reutilizando la suma anterior.

Arreglo base: `[320, 410, 280, 390, 510, 620, 700, 300, 290, ...]`

| Posición | Días (Índices) | Operación Matemática (Fórmula de Ventana) | Suma Total |
| :--- | :--- | :--- | :--- |
| 1 | 0 al 6 | Suma inicial iterativa: `320 + 410 + 280 + 390 + 510 + 620 + 700` | **3230** |
| 2 | 1 al 7 | `3230 - 320 (día 0 que sale) + 300 (día 7 que entra)` | **3210** |
| 3 | 2 al 8 | `3210 - 410 (día 1 que sale) + 290 (día 8 que entra)` | **3090** |

Tras evaluar todo el arreglo, la ejecución confirmó que la mejor racha ocurre en el **día 24** (índice `23` de inicio de la ventana) con un total de **`3670`** (`$3,670 mil`). Ambas versiones (`mejorSemanaBruta` y `mejorSemana`) arrojaron exactamente el mismo resultado, validando la correcta implementación del algoritmo.

* **Benchmarking real con 100,000 días aleatorios ($k = 7$):**
  * `mejorSemanaBruta`: **1.560 ms**
  * `mejorSemana` (Ventana Deslizante): **0.461 ms**
  * Coincidencia exacta verificada entre ambas versiones (`SI`).

### 2. Traza de los Punteros (Presupuesto: 100,000)
Para resolver la búsqueda del par de productos, primero se ordena el catálogo numéricamente por precio de menor a mayor:
`[18000 (Filtros), 26000 (Nariño), 35000 (Taza), 42000 (Huila 500g), 45000 (Sierra), 79000 (Huila 1kg), 95000 (Prensa), 120000 (Molino)]`

Se utilizan dos punteros: `izquierda` (apunta al más barato) y `derecha` (apunta al más caro).

* **Paso 1:** Izq = 18,000. Der = 120,000. Suma = **138,000**.
  * *Acción:* La suma excede el presupuesto. El puntero `derecha` se mueve a la izquierda para buscar un producto más económico.
* **Paso 2:** Izq = 18,000. Der = 95,000. Suma = **113,000**.
  * *Acción:* Excede el presupuesto. `derecha` se mueve a la izquierda.
* **Paso 3:** Izq = 18,000. Der = 79,000. Suma = **97,000**.
  * *Acción:* Es una suma válida (no supera los 100,000). Se registra como el `mejorPar` actual. Como queremos acercarnos más al límite, movemos el puntero `izquierda` a la derecha para intentar sumar un producto de mayor valor.
* **Paso 4:** Izq = 26,000. Der = 79,000. Suma = **105,000**.
  * *Acción:* Excede el presupuesto. `derecha` se mueve a la izquierda.
* **Paso 5:** Izq = 26,000. Der = 45,000. Suma = **71,000**.
  * *Acción:* Es válida, pero menor a 97,000. No actualiza el récord. `izquierda` se mueve a la derecha.
* **Pasos posteriores:** El algoritmo continúa moviendo los punteros hasta que se cruzan, sin encontrar una suma mayor a 97,000 que no supere el presupuesto.

**Resultados reales confirmados de `parMasCercano` (`minireto11.js`):**
* **Presupuesto `100,000`:** `Filtros de papel x100 ($18,000) + Origen Huila 1 kg ($79,000) = $97,000`.
* **Presupuesto `140,000`:** `Origen Sierra 500 g ($45,000) + Prensa francesa ($95,000) = $140,000` (exacto).
* **Presupuesto `40,000`:** `null` (presupuesto insuficiente).
* **Arreglo vacío `[]`:** `null`.

### 3. Justificación de Complejidad Algorítmica (Big O)
* **`mejorSemanaBruta` es $O(n \cdot k)$ en tiempo y $O(1)$ en espacio:** Recalcula desde cero la suma de los $k$ días en cada desplazamiento de la ventana.
* **`mejorSemana` es $O(n)$ en tiempo y $O(1)$ en espacio:** Utiliza un único bucle `for` que recorre el arreglo de días una sola vez. En cada iteración realiza operaciones aritméticas de tiempo constante. El tiempo de ejecución crece de forma lineal y directamente proporcional al número de días. No crea estructuras de datos auxiliares, por lo que su espacio es constante.
* **`parMasCercano` es $O(n \log n)$ en tiempo y $O(n)$ en espacio:** Aunque el bucle `while` de los dos punteros es $O(n)$, el cuello de botella es el método `sort()` previo. Los algoritmos de ordenamiento eficientes en JavaScript (como Timsort) tienen una complejidad de $O(n \log n)$. Como $O(n \log n)$ domina asintóticamente a $O(n)$, la función completa se clasifica como $O(n \log n)$. La complejidad espacial es $O(n)$ debido a la creación de una copia del catálogo (usando el operador spread `[...]`) para garantizar la inmutabilidad de los datos originales.

### 4. Casos Borde Validados
* **Ventana mayor a los datos ($k > \text{dias.length}$, ej. $k = 35$) y arreglo vacío `[]`:** La función retorna `null` de forma segura, evitando errores de desbordamiento de índices o cálculos incorrectos.
* **Presupuesto insuficiente (`40,000`) y arreglo vacío `[]`:** Si el presupuesto es menor a la suma de los dos productos más baratos, los punteros se cruzan sin encontrar ninguna suma válida. La función retorna `null`, cumpliendo con el requisito de no superar nunca el presupuesto.

---

## MINI RETO 12: Analítica Café Origen `v1.0` (Lanzamiento)

### 1. Mediciones reales del reporte final (`src/reporte.js`)
Al integrar todas las funciones optimizadas en `src/reporte.js` con soporte CLI (`process.argv`), se obtuvieron los siguientes tiempos reales de ejecución completa:
* **Día 1 Real (12 registros):** `17.00 ms`
* **Datos generados (`10,000` registros):** `23.97 ms` (frente a `286.00 ms` en la `v0.1` — **11.9x más rápido**)
* **Datos generados (`100,000` registros):** `73.99 ms` (cumple ampliamente el criterio de ejecutarse en menos de `5,000 ms`)

### 2. Resumen de construcción y estrategia de resolución (MiniRetos 1 al 12)

| MiniReto | Qué se construyó | Estrategia de resolución y optimización aplicada |
| :--- | :--- | :--- |
| **1** | Exploración inicial de `src/datos.js` (`explorar.js`). | Inspección directa de propiedades y acceso por índice en $O(1)$. |
| **2** | Diccionario de datos, casos borde e indicadores imperativos (`totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`). | Acumuladores y contadores en un solo recorrido $O(n)$ con validaciones de arreglo vacío y normalización de texto. |
| **3** | Refactorización declarativa (`totalVendidoM`, `unidadesVendidasM`, `ventasPorCiudadM`, `totalPorCiudad`, `unidadesPorProducto`, `topProductosPorValor`, `ventasDelDia`). | Encadenamiento declarativo con `.filter()`, `.map()`, `.reduce()` y copias inmutables `[...arr].sort()` ($O(n)$ y $O(n \log n)$). |
| **4** | Registro de depuración y pruebas de casos borde (`minireto2-3-4.js`). | Reproducción controlada de fallos (`undefined`, `NaN`) y valores iniciales seguros en `reduce`. |
| **5** | Generador de datos (`src/generador.js`) e instrumentación de operaciones (`src/medir.js`). | Conteo empírico de operaciones para contrastar complejidad constante $O(1)$ frente a lineal $O(n)$. |
| **6** | Diagnóstico de rendimiento de `clientesRecurrentes` (`minireto6.js`). | Trazas manuales y pruebas de duplicación de entrada para demostrar crecimiento cuadrático $O(n^2)$ / $O(n^3)$. |
| **7** | Comparativa de memoria entre cadena de métodos y pasada única (`minireto7.js`). | Reducción de 4 recorridos y 3 arreglos intermedios ($O(n)$ espacio) a 1 recorrido sin copias ($O(1)$ espacio). |
| **8** | Documento `RENDIMIENTO.md` (`v0.2`) y revisión por pares. | Matriz de riesgos por complejidad Big O y uso de `Array.from()` para conservar contratos de retorno. |
| **9** | `clientesRecurrentesSet` y `comprasPorCliente` (`minireto9.js`). | Eliminación de ciclos anidados mediante búsqueda en tiempo constante $O(1)$ con `Set` y `Map` (tiempo $O(n)$, memoria $O(n)$). |
| **10** | Catálogo (`src/catalogo.js`), `comboRegalo`, `productoEstrellaPorCiudad` y `primerClienteUnico` (`minireto10.js`). | Búsqueda de complemento en una pasada con `Map` ($O(n)$) y conteo de frecuencias en `Map` anidados ($O(n)$). |
| **11** | `mejorSemanaBruta`, `mejorSemana` y `parMasCercano` (`minireto11.js`). | Ventana deslizante de tamaño fijo ($O(n)$ tiempo, $O(1)$ espacio) y dos punteros sobre arreglo ordenado ($O(n \log n)$). |
| **12** | Integración final en `src/reporte.js` con soporte CLI (`process.argv`), `README.md` y `RENDIMIENTO.md` `v1.0`. | Unificación de todos los módulos optimizados sin funciones $O(n^2)$, ejecutando `100,000` ventas en `73.99 ms`. |