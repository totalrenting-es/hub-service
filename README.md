# hub-service

Hub central de integraciones del ecosistema Totalrenting.

## Responsabilidades

- **Alphabet**: proxy transparente hacia la API de Alphabet Leasing, reenviando peticiones con los headers de autorización correspondientes.
- **Vixiees (Totalrenting)**: recibe webhooks de la cuenta Vixiees de Totalrenting y los distribuye (fan-out) a múltiples destinos configurados.
- **Vixiees (Twipo)**: recibe webhooks de la cuenta Vixiees de Twipo y los distribuye a múltiples destinos configurados.
- **Settings**: utilidades globales del servidor (IP pública, estado).

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| `ANY` | `/api/alphabet/proxy/*` | Proxy transparente a la API de Alphabet |
| `POST` | `/api/vixiees/webhook/totalrenting` | Webhook fan-out de Vixiees Totalrenting |
| `POST` | `/api/vixiees/webhook/twipo` | Webhook fan-out de Vixiees Twipo |
| `GET` | `/api/settings/ip` | IP pública del servidor |
| `GET` | `/health` | Estado del servidor |
| `GET` | `/docs` | Documentación OpenAPI (Scalar UI) |

## Variables de entorno

```env
NODE_ENV=
PORT=3002
HOST=0.0.0.0
API_PREFIX=/api
ALPHABET_API_URL=
VIXIEES_TOTALRENTING_DESTINATIONS=
VIXIEES_TWIPO_DESTINATIONS=
```

> `VIXIEES_*_DESTINATIONS` acepta múltiples URLs separadas por coma o salto de línea.

## Estructura

```
src/
├── config/          # Configuración del servidor y variables de entorno
├── controllers/     # alphabet/, vixiees/, settings/
├── routes/          # alphabet/proxy/, vixiees/webhook/, settings/get-ip/
├── services/        # Lógica de negocio de cada integración
├── types/           # Tipos TypeScript
└── utils/           # Utilidades compartidas
```

## Arquitectura de despliegue

En producción se levanta con **nginx + 3 instancias Node.js** en balance de carga:

```
Internet → nginx (puerto NGINX_PORT) → hub-1 / hub-2 / hub-3 (puerto PORT)
```

## Scripts

```bash
pnpm dev      # Desarrollo con hot-reload (tsx watch)
pnpm build    # Compilar (tsc)
pnpm start    # Producción
```
