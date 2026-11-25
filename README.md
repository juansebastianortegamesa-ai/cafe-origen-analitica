# Analítica Café Origen (`v1.0`)

Motor de analítica de ventas desarrollado en **Node.js** para **Café Origen**, diseñado para procesar historiales transaccionales y reportes ejecutivos del marketplace en milisegundos.

La versión `v1.0` reemplaza las búsquedas cuadráticas iniciales ($O(n^2)$) por estructuras de acceso en tiempo constante (`Set` y `Map`), ventana deslizante y técnica de dos punteros, logrando procesar **100.000 ventas en `73,99 ms`** (muy por debajo del límite de `5.000 ms` exigido por el marketplace).

---

## Requisitos Previos

* **Node.js** `v18.0.0` o superior (sin dependencias externas; utiliza módulos nativos de JavaScript).
* **Git** (para clonar el repositorio).

---

## Cómo Ejecutar el Proyecto

1. **Clonar el repositorio e ingresar a la carpeta del proyecto:**
   ```bash
   git clone <url-del-repositorio>
   cd cafe-origen-analitica
   ```

2. **Ejecutar el reporte con los datos reales del Día 1 (12 registros):**
   ```bash
   node src/reporte.js
   ```

3. **Ejecutar el reporte con $n$ ventas generadas sintéticamente (prueba de escala):**
   Pasa la cantidad de registros deseada como argumento por línea de comandos (`process.argv`):
   ```bash
   node src/reporte.js 10000
   node src/reporte.js 100000
   ```

4. **Ejecutar pruebas específicas y benchmarks por módulo:**
   ```bash
   node src/medir.js
   node src/pruebas-mini-retos/minireto9.js
   node src/pruebas-mini-retos/minireto10.js
   node src/pruebas-mini-retos/minireto11.js
   ```

---

## Preguntas de Negocio que Responde

El reporte ejecutivo generado por `src/reporte.js` responde de forma automática a las siguientes consultas operativas y comerciales:

| Pregunta de Negocio | Función Responsable | Complejidad |
| :--- | :--- | :--- |
| ¿Cuál es el ingreso total, las unidades vendidas, la venta mayor y el ticket promedio? | `totalVendidoM`, `unidadesVendidasM`, `ventaMayor`, `ticketPromedio` | $O(n)$ |
| ¿Cómo se distribuyen los ingresos por ciudad y las unidades por producto? | `totalPorCiudad`, `unidadesPorProducto` | $O(n)$ |
| ¿Cuáles son los productos más rentables del periodo? | `topProductosPorValor` | $O(n \log n)$ |
| ¿Qué clientes han comprado más de una vez (clientes recurrentes)? | `clientesRecurrentesSet` / `comprasPorCliente` | $O(n)$ |
| ¿Cuál es el producto estrella (más vendido) en cada ciudad? | `productoEstrellaPorCiudad` | $O(n)$ |
| ¿Qué par de productos del catálogo suman exactamente un valor objetivo para combo de regalo? | `comboRegalo` | $O(n)$ |
| ¿Quién es el primer cliente con una sola compra elegible para cupón de fidelización? | `primerClienteUnico` | $O(n)$ |
| ¿Cuál fue la mejor racha de 7 días consecutivos de ventas en el mes? | `mejorSemana` | $O(n)$ |
| ¿Qué dos productos del catálogo se acercan más a un presupuesto corporativo sin superarlo? | `parMasCercano` | $O(n \log n)$ |

---

## Estructura del Proyecto

```text
cafe-origen-analitica/
├── src/
│   ├── analitica.js              # Motor principal con todas las funciones analíticas optimizadas
│   ├── catalogo.js               # Catálogo oficial de 8 productos con precios unitarios
│   ├── datos.js                  # Dataset real del Día 1 (12 ventas) y ventas diarias de septiembre
│   ├── generador.js              # Generador de n ventas sintéticas normalizadas
│   ├── medir.js                  # Script de instrumentación y conteo de operaciones
│   ├── reporte.js                # Punto de entrada CLI (soporta Día 1 o n ventas vía process.argv)
│   └── pruebas-mini-retos/       # Scripts de verificación y benchmarks (MiniRetos 2 al 11)
├── bitacora.md                   # Registro completo de diseño, trazas manuales, depuración y análisis
├── RENDIMIENTO.md                # Comparativa v0.1 vs. v1.0, tabla Big O y matriz de riesgos
├── README.md                     # Documentación general del producto
└── package.json                  # Configuración del paquete Node.js
```

---

## Resumen de Rendimiento (`v0.1` vs. `v1.0`)

| Escenario | Versión `v0.1` | Versión `v1.0` | Mejora |
| :--- | :--- | :--- | :--- |
| Día 1 Real (12 ventas) | ~16,50 ms | **17,00 ms** | Equivalente |
| 10.000 ventas | 286,00 ms | **23,97 ms** | **11,93x más rápido** |
| 100.000 ventas | ~36.508,00 ms (36,5 s) | **73,99 ms** | **~493x más rápido** |

Para el detalle técnico de cada función, proyecciones a `1.000.000` de registros y análisis de complejidad espacial, consulta [`RENDIMIENTO.md`](./RENDIMIENTO.md).

---

## Créditos

* **Desarrollo e implementación:** Juan Sebastián Ortega Mesa
* **Revisión por pares (`v0.2`):** Juan Pablo Morales Salazar