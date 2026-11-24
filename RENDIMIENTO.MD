# Reporte de Rendimiento y Análisis Algorítmico (v0.2)

Este documento evalúa las funciones del motor analítico de "Café Origen", clasificando su complejidad temporal y espacial, y proyectando su comportamiento ante volúmenes masivos de datos (Big Data).

## 1. Tabla de Clasificación de Funciones

*Nota: Las mediciones de operaciones y tiempo se realizaron con un set de 10,000 ventas generadas aleatoriamente (MiniRetos 5 y 7).*

| Función | ¿Qué hace? | Complejidad Temporal | Complejidad Espacial | Justificación Basada en Código | Tiempo (10k) / Operaciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `valorVenta` | Multiplica cantidad por precio. | O(1) | O(1) | Operación matemática directa, sin bucles. | ~0.001 ms |
| `totalVendido` | Suma el valor de todas las ventas. | O(n) | O(1) | Un solo bucle `for...of` que recorre el arreglo. | ~0.5 ms (10,000 ops) |
| `unidadesVendidas` | Suma las cantidades vendidas. | O(n) | O(1) | Un solo bucle `for...of` que recorre el arreglo. | ~0.4 ms (10,000 ops) |
| `ventaMayor` | Encuentra la venta con mayor valor. | O(n) | O(1) | Un bucle `for...of` comparando el valor máximo. | ~0.6 ms (10,000 ops) |
| `ticketPromedio` | Calcula el promedio de ventas. | O(n) | O(1) | Llama a `totalVendido` (O(n)) y hace otro bucle para contar. | ~0.9 ms (20,000 ops) |
| `ventasPorCiudad` | Suma dinero de una ciudad específica. | O(n) | O(1) | Un bucle recorriendo y comparando strings. | ~0.8 ms (10,000 ops) |
| `totalPorCiudad` | Agrupa ingresos por ciudad. | O(n) | O(k) | `reduce` iterando una vez. (k = ciudades únicas). | ~1.2 ms (10,000 ops) |
| `unidadesPorProducto` | Agrupa unidades por producto. | O(n) | O(k) | `reduce` iterando una vez. (k = productos únicos). | ~1.1 ms (10,000 ops) |
| `topProductosPorValor` | Ranking de productos más rentables. | O(n log n) | O(k) | `reduce` (O(n)) + `sort` (O(n log n)) + `slice`. | ~2.5 ms |
| `primeraVenta` | Devuelve la primera venta. | O(1) | O(1) | Acceso directo por índice `ventas[0]`. | ~0.001 ms (1 op) |
| `totalCiudadCadena` | Suma ciudad usando métodos encadenados. | O(n) | **O(n)** | `map()` crea un arreglo nuevo en memoria, luego `filter` y `reduce`. | ~2.0 ms (4 pasadas) |
| `totalCiudadUnPasada` | Suma ciudad con un solo bucle. | O(n) | **O(1)** | Un solo `for...of`. No crea copias del arreglo. | ~0.5 ms (1 pasada) |
| **`clientesRecurrentes`** | Encuentra clientes que compraron >1 vez. | **O(n²)** | O(k) | **Bucles anidados.** Por cada venta, recorre todas las demás. | **~365 ms** (50,000,000 ops) |

---

## 2. Proyección de Crecimiento (1,000,000 de ventas)

Basado en las mediciones empíricas y la complejidad O(n²) de la función más pesada:
*   **Función:** `clientesRecurrentes`
*   **Medición Base:** 100,000 ventas tardaron **36.5 segundos**.
*   **Cálculo:** Al pasar a 1,000,000, el volumen crece 10 veces. Como la complejidad es cuadrática, el tiempo se multiplica por \(10^2 = 100\).
*   **Proyección:** \(36.5 \text{ s} \times 100 = \mathbf{3,650 \text{ segundos}}\) (**Más de 60 minutos**).
*   **Funciones O(n):** Tardarían apenas unos segundos en procesar el millón de datos. El cuello de botella es exclusivamente `clientesRecurrentes`.

---

## 3. Matriz de Riesgos

Orden de funciones de mayor a menor riesgo al escalar los datos:

1.  **`clientesRecurrentes` (Riesgo Crítico):** Complejidad O(n²). Si la base de datos crece, el servidor colapsará.
2.  **`topProductosPorValor` (Riesgo Medio):** Complejidad O(n log n). El uso de `sort` toma más recursos, pero es manejable hasta millones de registros.
3.  **`totalCiudadCadena` (Riesgo de Memoria Medio):** Aunque es O(n), su complejidad espacial es O(n) por el uso de `map()`. En arreglos gigantes, puede agotar la memoria RAM.
4.  **Funciones Básicas O(n) (Riesgo Bajo):** `totalVendido`, `ventasPorCiudad`, etc. Son eficientes y seguras para volúmenes masivos.
5.  **`primeraVenta` (Riesgo Nulo):** O(1). No importa si hay 10 o 1 billón de datos, el tiempo es el mismo.

**Criterio de ordenamiento:** Se basó en la notación Big O Temporal y Espacial. Las funciones con bucles anidados (O(n²)) representan el mayor peligro de bloqueo, seguidas de las que consumen memoria extra (O(n) espacial).

---

## 4. Plan de Optimización (Para el mayor riesgo)

**Función a optimizar:** `clientesRecurrentes`

*   **¿Qué trabajo repetido se debe reemplazar?** 
    Actualmente, el código usa un método `includes()` dentro de un bucle anidado. Esto genera un "trabajo repetido" enorme: cada vez que se evalúa una venta, el sistema busca en todo el arreglo de `recurrentes` si el cliente ya está ahí (búsqueda lineal O(n)), y a su vez, compara cada venta contra todas las demás (bucle anidado O(n²)).
*   **¿Qué información se podría guardar para no buscarla de nuevo?**
    Se debe implementar una estructura de datos de tipo **Hash Map / Set** (Conjunto). Al usar un `Set`, el sistema guarda los clientes que ya ha visto. Cuando llega una nueva venta, en lugar de hacer una búsqueda lineal (recorrer el arreglo), el `Set.has()` verifica instantáneamente (O(1)) si el cliente ya existe. Esto elimina los bucles anidados y el `includes()`, reduciendo el tiempo de espera de 1 hora a milisegundos.






    