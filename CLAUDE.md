# SOLV (`solv.quest`) — Reglas de Proyecto y Optimización

## Objetivo
Portal corporativo oficial de **SOLV** (`https://solv.quest`), despliegue estático (`output: 'export'`) en Cloudflare Workers Static Assets ($0/mes), cumpliendo requisitos de aprobación de **Google AdSense** (`ca-pub-6708132675087655`).

## Stack y Restricciones
- Next.js (App Router) con `output: 'export'` y `images: { unoptimized: true }`.
- TypeScript estricto y Tailwind CSS.
- Idioma: 100% español (`lang="es"`).
- Estética: modo oscuro grafito/azul marino profundo (`#0B0F19`) con acentos azul eléctrico (`#3B82F6`) y cian (`#06B6D4`).
- Contacto oficial: `contact@solv.quest`.
- Producto principal enlazado: **El Comparinizador** (`https://comparinizador.solv.quest`).

## Protocolo de Ejecución (Bajo consumo de tokens)
1. **No leas** `node_modules/`, `.next/`, `out/` ni `package-lock.json`.
2. Lee únicamente los archivos de `src/` que vayas a modificar.
3. Mantén componentes modulares, concisos y sin dependencias externas innecesarias.
4. Valida cambios únicamente con `npm run lint && npm run build`.
5. Detente al finalizar cada tarea sin hacer `git commit` salvo que se pida explícitamente.
