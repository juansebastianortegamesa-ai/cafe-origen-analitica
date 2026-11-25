# Reporte de Rendimiento y Análisis Algorítmico (`v1.0`)

Este documento evalúa las funciones del motor analítico de **Café Origen**, comparando el rendimiento entre la versión inicial (`v0.1`) y la versión optimizada de lanzamiento (`v1.0`), clasificando la complejidad temporal y espacial de cada función y proyectando su comportamiento ante volúmenes masivos de datos.

---

## 1. Comparación de Rendimiento: `v0.1` vs. `v1.0`

En la versión `v0.1`, la detección de clientes recurrentes utilizaba ciclos anidados con `.includes()` ($O(n^2)$ / $O(n^3)$), provocando que el reporte tardara más de medio minuto con `100,000` ventas. En la versión `v1.0`, todas las funciones del reporte operan en tiempo lineal $O(n)$ o $O(n \log n)$ mediante `Set`, `Map`, ventana deslizante y dos punteros, sin ninguna función cuadrática $O(n^2)$ en ejecución.

### A. Tiempo total de ejecución del reporte (`src/reporte.js`)

| Escenario de Prueba | Reporte `v0.1` (Ciclos anidados) | Reporte `v1.0` (Optimizado) | Mejora obtenida |
| :--- | :--- | :--- | :--- |
| Día 1 Real (12 ventas) | ~16.50 ms | **17.00 ms** | Tiempo base equivalente |
| 1,000 ventas | 4.79 ms (solo cálculo núcleo) | **~18.00 ms** (reporte completo) | Escala lineal estable |
| 10,000 ventas | 286.00 ms | **23.97 ms** | **11.93x más rápido** |
| 100,000 ventas | ~36,508.00 ms (36.5 s — MiniReto 6) | **73.99 ms** | **~493x más rápido** (cumple `< 5,000 ms`) |

### B. Evolución específica de `clientesRecurrentes` (MiniReto 9)

| Tamaño ($n$) | `clientesRecurrentes` `v0.1` $O(n^2)$ | `clientesRecurrentesSet` `v1.0` $O(n)$ | `comprasPorCliente` (`Map`) `v1.0` $O(n)$ |
| :--- | :--- | :--- | :--- |
| 1,000 ventas | 4.922 ms | **0.131 ms** | **0.350 ms** |
| 10,000 ventas | 315.039 ms | **1.264 ms** | **1.475 ms** |
| 100,000 ventas | ~36,500.000 ms (36.5 s) | **11.748 ms** | **21.284 ms** |

---

## 2. Tabla de Clasificación de Funciones (`v1.0`)

Incluye todas las funciones del motor (`src/analitica.js`), indicando cuáles forman parte del reporte final `v1.0` y cuáles se mantienen únicamente como referencia de pruebas comparativas:

| Función | Módulo / Reto | ¿Qué hace? | Complejidad Temporal | Complejidad Espacial | Justificación Basada en Código |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `valorVenta` | MiniReto 2 | Multiplica cantidad por precio. | $O(1)$ | $O(1)$ | Operación aritmética directa, sin bucles. |
| `primeraVenta` | MiniReto 5 | Devuelve la primera venta del historial. | $O(1)$ | $O(1)$ | Acceso directo por índice `ventas[0]` (`1` operación). |
| `totalVendido` / `totalVendidoM` | MiniRetos 2–3 | Suma el valor total de todas las ventas. | $O(n)$ | $O(1)$ | Un único recorrido sobre el arreglo (`for...of` / `.reduce()`). |
| `unidadesVendidas` / `unidadesVendidasM` | MiniRetos 2–3 | Suma las unidades vendidas. | $O(n)$ | $O(1)$ | Un único recorrido acumulando cantidades válidas. |
| `ventaMayor` | MiniReto 2 | Encuentra la venta de mayor valor. | $O(n)$ | $O(1)$ | Un bucle comparando cada venta con el máximo actual. |
| `ticketPromedio` | MiniReto 2 | Calcula el promedio por venta válida. | $O(n)$ | $O(1)$ | Recorre el arreglo acumulando total y contador en variables primitivas. |
| `ventasPorCiudad` | MiniReto 2 | Suma dinero de una ciudad específica. | $O(n)$ | $O(1)$ | Un bucle comparando strings normalizados. |
| `ventasPorCiudadM` | MiniReto 3 | Suma dinero de una ciudad usando métodos. | $O(n)$ | $O(n)$ | `.filter()` crea un arreglo intermedio antes de `.reduce()`. |
| `totalPorCiudad` | MiniReto 3 | Agrupa ingresos por ciudad. | $O(n)$ | $O(k)$ | `.reduce()` en una pasada ($k$ = ciudades únicas). |
| `unidadesPorProducto` | MiniReto 3 | Agrupa unidades por producto. | $O(n)$ | $O(k)$ | `.reduce()` en una pasada ($k$ = productos únicos). |
| `ventasDelDia` | MiniReto 3 | Filtra y resume ventas de una fecha. | $O(n)$ | $O(n)$ | `.filter()` genera un subarreglo del día consultado. |
| `totalCiudadCadena` *(Ref.)* | MiniReto 7 | Suma ciudad encadenando 4 métodos. | $O(n)$ | $O(n)$ | Crea 3 arreglos intermedios en memoria RAM. |
| `totalCiudadUnPasada` | MiniReto 7 | Suma ciudad en un solo recorrido. | $O(n)$ | $O(1)$ | Un solo `for...of` sin arreglos auxiliares. |
| `clientesRecurrentes` *(Deprecada)* | MiniReto 6 | Detección original con ciclos anidados. | $O(n^2)$ / $O(n^3)$ | $O(k)$ | **Reemplazada en `v1.0`:** usaba bucles anidados y `.includes()`. |
| **`clientesRecurrentesSet`** | **MiniReto 9** | Detecta clientes con $\ge 2$ compras. | **$O(n)$** | **$O(n)$** | Un recorrido con dos `Set` (`vistos` y `recurrentes`, búsqueda $O(1)$). |
| **`comprasPorCliente`** | **MiniReto 9** | Cuenta compras totales por cada cliente. | **$O(n)$** | **$O(n)$** | Un recorrido con un `Map` de frecuencias (acceso $O(1)$). |
| **`comboRegalo`** | **MiniReto 10** | Busca dos productos que sumen un valor exacto. | **$O(n)$** | **$O(n)$** | Una pasada con un `Map` de complementos (`valor - precio`). |
| `comboRegaloFuerzaBruta` *(Ref.)* | MiniReto 10 | Búsqueda de combo con pares anidados. | $O(n^2)$ | $O(1)$ | Solo para pruebas comparativas; no se usa en el reporte. |
| **`productoEstrellaPorCiudad`** | **MiniReto 10** | Halla el producto más vendido por ciudad. | **$O(n)$** | **$O(n)$** | `Map` anidado (`Ciudad -> Producto -> Frecuencia`) en una pasada. |
| **`primerClienteUnico`** | **MiniReto 10** | Encuentra el primer cliente con 1 sola compra. | **$O(n)$** | **$O(n)$** | Dos recorridos secuenciales con `Map` ($O(n) + O(n) = O(n)$). |
| **`mejorSemana`** | **MiniReto 11** | Calcula la racha de $k$ días con mayor venta. | **$O(n)$** | **$O(1)$** | Ventana deslizante: suma día entrante y resta día saliente en $O(1)$. |
| `mejorSemanaBruta` *(Ref.)* | MiniReto 11 | Calcula la mejor racha sumando desde cero. | $O(n \cdot k)$ | $O(1)$ | Solo para pruebas comparativas; no se usa en el reporte. |
| `topProductosPorValor` | MiniReto 3 | Ranking de los $N$ productos más rentables. | $O(n \log n)$ | $O(k)$ | `reduce` ($O(n)$) + `.sort()` ($O(n \log n)$) + `.slice()`. |
| **`parMasCercano`** | **MiniReto 11** | Par de productos más cercano al presupuesto. | **$O(n \log n)$** | **$O(n)$** | Ordenamiento previo `.sort()` ($O(n \log n)$) + dos punteros ($O(n)$). |

---

## 3. Proyección de Crecimiento (`1,000,000` de ventas)

* **Comportamiento en `v0.1` (Cuadrático $O(n^2)$):** Con `100,000` ventas tardaba **36.5 segundos**. Al multiplicar por 10 el volumen hasta `1,000,000`, el tiempo crecía $10^2 = 100$ veces: $36.5\text{ s} \times 100 = \mathbf{3,650\text{ segundos}}$ (**60.8 minutos**), bloqueando el servidor.
* **Comportamiento en `v1.0` (Lineal $O(n)$ / $O(n \log n)$):** Con `100,000` ventas el reporte completo tarda **73.99 ms**. Al escalar a `1,000,000` de registros (10 veces más datos), el tiempo proyectado es de **~750 ms a 900 ms (menos de 1 segundo)**, manteniendo estabilidad total en memoria y CPU.

---

## 4. Matriz de Riesgos Actualizada (`v1.0`)

Orden de funciones de mayor a menor riesgo al escalar los datos en producción:

1. **`topProductosPorValor` y `parMasCercano` (Riesgo Bajo-Medio — $O(n \log n)$):** El ordenamiento `.sort()` crece ligeramente más rápido que lineal, pero opera sobre catálogos o productos agrupados ($k$ reducido), ejecutándose en pocos milisegundos.
2. **`clientesRecurrentesSet`, `comprasPorCliente`, `productoEstrellaPorCiudad` y `primerClienteUnico` (Riesgo Bajo — Tiempo $O(n)$, Espacio $O(n)$):** Ejecutan en tiempo lineal (`11.7 ms` a `21.3 ms` en `100,000` ventas). Su único costo es la memoria $O(n)$ proporcional a los clientes distintos registrados.
3. **`mejorSemana`, `totalVendidoM`, `unidadesVendidasM`, `totalPorCiudad`, `totalCiudadUnPasada` (Riesgo Muy Bajo — Tiempo $O(n)$, Espacio $O(1)$):** Recorrido único sin copias intermedias en RAM.
4. **`valorVenta` y `primeraVenta` (Riesgo Nulo — Tiempo $O(1)$, Espacio $O(1)$):** Tiempo constante independiente del tamaño de entrada.

*(Nota: El **Riesgo Crítico** identificado en la `v0.2` sobre `clientesRecurrentes` $O(n^2)$ quedó **eliminado** tras su reemplazo por `clientesRecurrentesSet` en la `v1.0`).*

---

## 5. Cierre del Plan de Optimización

* **Trabajo repetido eliminado:** Se reemplazaron los ciclos anidados y búsquedas lineales `.includes()` ($O(n^2)$ / $O(n^3)$) por estructuras hash (`Set` y `Map`) con acceso en tiempo constante $O(1)$, ventana deslizante de tamaño fijo para rangos consecutivos y dos punteros sobre arreglos ordenados para búsqueda de presupuestos.
* **Resultado final:** Todas las métricas de negocio requeridas por el marketplace se ejecutan en **73.99 ms para `100,000` ventas**, cumpliendo con amplio margen el requisito de responder en menos de 5 segundos.