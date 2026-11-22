# 📊 Documento Técnico: Rendimiento del Motor de Analítica - Café Origen MINI RETO 8 DIA 2

Este documento detalla el análisis de complejidad algorítmica (Tiempo y Memoria) del motor de analítica, utilizando evidencia empírica de mediciones con 10.000 registros.

## 1. Tabla de Clasificación de Funciones

| Función | ¿Qué hace? | Complejidad Temporal | Complejidad Espacial | Justificación Técnica | Operaciones/Tiempo (10.000 ventas) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `primeraVenta` | Obtiene el primer registro | **O(1)** | **O(1)** | Accede directamente al índice `[0]`. No importa cuántos datos haya. | 1 op. / ~0.002 ms |
| `totalVendido` | Suma el dinero total | **O(n)** | **O(1)** | Usa un bucle `for...of` para recorrer las ventas una sola vez. | 10.000 ops / ~1.34 ms |
| `ventaMayor` | Encuentra la venta más alta | **O(n)** | **O(1)** | Recorre todo el arreglo comparando valores en una sola pasada. | 10.003 ops / ~0.31 ms |
| `totalPorCiudad` | Suma ventas agrupadas por ciudad | **O(n)** | **O(n)** | Usa `.reduce()`. Itera una vez (O(n)), pero crea un objeto diccionario nuevo en memoria (O(n)). | 10.000 ops / ~1.57 ms |
| `totalCiudadCadena` | Suma ventas de una ciudad (Métodos) | **O(n)** | **O(n)** | Hace 4 recorridos (map, filter, map, reduce) y crea 3 arreglos temporales en RAM. | 40.000 ops / ~4.5 ms |
| `totalCiudadUnPasada` | Suma ventas de una ciudad (Bucle) | **O(n)** | **O(1)** | Un solo `for...of`. No crea arreglos intermedios, solo una variable acumuladora. | 10.000 ops / ~1.34 ms |
| `clientesRecurrentes` | Encuentra clientes repetidos | **O(n³)** | **O(n)** | Bucles `for` anidados (O(n²)) + `.includes()` dentro del bucle, que busca linealmente (O(n)). Crea un arreglo de clientes. | 10.000 ops base (se dispara) / **~36.5 seg** |

## 2. Proyección para 1.000.000 de Ventas

Basados en las mediciones empíricas realizadas en el Mini Reto 5 y 6:

*   **Funciones Lineales O(n):** Si con 100.000 ventas `totalVendido` tardó ~9 ms, al multiplicar los datos por 10 (1 millón), el tiempo se multiplicará por 10. **Tiempo estimado: ~90 ms (0.09 segundos).** Es totalmente viable.
*   **Función Cuadrática/Cúbica O(n²)/O(n³):** La función `clientesRecurrentes` tardó **36.5 segundos** con 100.000 ventas. Al pasar a 1.000.000 (x10 datos), el tiempo no se multiplica por 10, sino por \(10^2\) (100) o \(10^3\) (1000) debido a los bucles anidados. 
    *   Cálculo: \(36.5 \text{ seg} \times 100 = 3.650 \text{ segundos} = \textbf{60.8 minutos}\). 
    *   **Tiempo estimado: Más de 1 hora.** El servidor colapsará por timeout.

## 3. Matriz de Riesgos (De mayor a menor)

1.  **`clientesRecurrentes` (Riesgo Crítico):** El uso de dos bucles `for` anidados y `.includes()` hace que el tiempo crezca exponencialmente. Con 1 millón de ventas, el servidor se caerá por falta de procesamiento.
2.  **`totalCiudadCadena` (Riesgo Alto):** Aunque su tiempo es O(n), su memoria es O(n). Con 1 millón de ventas, intentará crear arreglos temporales de 1 millón de posiciones en la RAM, lo que puede provocar un *Out Of Memory (OOM)* y tumbar el servidor.
3.  **`totalPorCiudad` y `unidadesPorProducto` (Riesgo Medio):** Crean diccionarios (objetos) que, si hay muchas ciudades o productos únicos, crecerán mucho en memoria.
4.  **`totalVendido`, `ventasPorCiudad` (Riesgo Bajo):** Son lineales y usan memoria constante. Soportan millones de datos sin problema.

## 4. Plan de Optimización (Enfoque en `clientesRecurrentes`)

**Función a optimizar:** `clientesRecurrentes`
**Trabajo repetido:** Actualmente, el algoritmo compara cada venta con todas las demás (fuerza bruta) y usa `.includes()` para verificar si el cliente ya fue guardado. Esto recalcula y busca lo mismo miles de veces.

**Mejora implementable (Sustituir O(n³) por O(n)):**
1.  En lugar de usar un arreglo `recurrentes` y buscarlo con `.includes()` (que es lento), usaremos un **Objeto (Diccionario) o un `Set`** para registrar qué clientes ya hemos visto.
2.  Crearemos un diccionario `conteoClientes` y un Set `recurrentesSet`.
3.  Haremos un **solo recorrido (Un solo bucle)**. Por cada venta, sumaremos 1 al contador del cliente. Si el contador llega a 2, lo agregamos al Set de recurrentes.
4.  **Información para no buscar de nuevo:** Al usar un `Set`, la búsqueda de si un cliente ya es recurrente es instantánea (O(1)), en lugar de recorrer un arreglo entero.


**Código Propuesto:**
```javascript
function clientesRecurrentesOptimizado(ventas) {
    const conteo = {}; // Diccionario O(1) para buscar
    const recurrentes = new Set(); // Set O(1) para evitar duplicados

    for (const venta of ventas) { // Un solo recorrido O(n)
        const cliente = venta.cliente;
        if (!conteo[cliente]) {
            conteo[cliente] = 1; // Primera vez que lo veo
        } else {
            if (conteo[cliente] === 1) {
                recurrentes.add(cliente); // Si es la segunda vez, es recurrente
            }
            conteo[cliente]++; // Sigo sumando por si hay más
        }
    }
    return Array.from(recurrentes); // Lo devuelvo como arreglo
}