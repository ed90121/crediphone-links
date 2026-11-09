# CrediPhone Linktree

Página de links personalizada para las redes sociales de CrediPhone.

## Personalización rápida

### 1. Cambiar URLs
Abre `index.html` y busca estos atributos `href`:

| Link | Busca | Reemplaza con tu URL real |
|---|---|---|
| WhatsApp | `https://wa.me/573001234567` | `https://wa.me/57TUNUMERO` |
| Instagram | `https://www.instagram.com/crediphone` | Tu perfil real |
| Facebook | `https://www.facebook.com/crediphone` | Tu página real |
| TikTok | `https://www.tiktok.com/@crediphone` | Tu perfil real |
| Tienda | `https://www.crediphone.com` | Tu URL de tienda |

### 2. Cambiar la foto de perfil
Reemplaza el archivo `profile.jpg` con tu foto. Debe llamarse exactamente `profile.jpg`.
Si no hay imagen, el avatar mostrará las iniciales "CP" automáticamente.

### 3. Cambiar colores
Todos los colores están en la sección `:root` al inicio de `style.css`. Ningún color está hardcodeado fuera de ahí.

## Publicar en GitHub Pages

1. Crea un repositorio en https://github.com (nombre sugerido: `crediphone-links`)
2. Sube los archivos: `index.html`, `style.css`, `profile.jpg`
3. Ve a **Settings → Pages → Source: Deploy from a branch → branch: main → / (root)**
4. Tu URL quedará: `https://TUUSUARIO.github.io/crediphone-links`

## Archivos del proyecto

```
crediphone-linktree/
├── index.html      # Página principal
├── style.css       # Tokens y estilos
├── profile.jpg     # Tu foto de perfil (agregar)
└── README.md       # Este archivo
```
