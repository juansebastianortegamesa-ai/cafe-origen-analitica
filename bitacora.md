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
# 📝 Bitácora de Desarrollo: Medición de Rendimiento y Complejidad Algorítmica

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

### 8 . como funciona el codigo del compañero
```javascript
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
```javascript

----------------------------------------------------------



