# Softable - Tema de Shopify

## Descripción
Tema personalizado de Shopify para Softable, una marca de productos ergonómicos para trabajo remoto. Diseñado con un enfoque minimalista y moderno, inspirado en marcas DTC como Huel y Hismile.

## Brand DNA
- **Tagline**: Get Comfy, Work Better.
- **Valores**: Comfort, Quality, Efficiency
- **Estética**: Minimalista, diseño limpio, sofisticado, moderno
- **Tono**: Funcional, directo, enfocado en el confort
- **Colores**:
  - Primary: #5c899d (Azul)
  - Secondary: #fffcef (Beige)
  - Dark: #2b2b2b (Gris oscuro)
  - Black: #000000
  - White: #ffffff
- **Tipografías**:
  - Headings: Sora
  - Body: Inter

## Estructura del Tema

```
softable-theme/
├── assets/
│   ├── theme.css          # Estilos principales
│   ├── animations.css     # Animaciones
│   └── theme.js          # JavaScript principal
├── config/
│   └── settings_schema.json  # Configuración del tema
├── layout/
│   └── theme.liquid      # Layout principal
├── sections/
│   ├── header.liquid     # Header
│   ├── footer.liquid     # Footer
│   ├── hero-home.liquid  # Hero de la página principal
│   ├── features.liquid   # Sección de características
│   ├── product-showcase.liquid  # Showcase de producto
│   ├── benefits.liquid   # Beneficios
│   ├── testimonials.liquid  # Testimonios
│   └── cta-section.liquid  # Call to action
├── snippets/
│   └── meta-tags.liquid  # Meta tags SEO
├── templates/
│   ├── index.liquid      # Página de inicio
│   └── product.liquid    # Página de producto
└── README.md
```

## Instalación

### Método 1: Subir a GitHub y Conectar con Shopify

#### Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y inicia sesión
2. Haz clic en el botón "New" o "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Nombra tu repositorio (ej: `softable-shopify-theme`)
5. Selecciona "Private" si no quieres que sea público
6. NO inicialices con README (ya lo tenemos)
7. Haz clic en "Create repository"

#### Paso 2: Subir los Archivos a GitHub

Abre tu terminal y ejecuta los siguientes comandos:

```bash
# Navega a la carpeta del tema
cd /ruta/a/softable-theme

# Inicializa el repositorio Git
git init

# Añade todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit - Softable theme"

# Añade el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/softable-shopify-theme.git

# Sube los archivos
git branch -M main
git push -u origin main
```

#### Paso 3: Instalar Shopify GitHub Integration

1. Instala la app **Shopify GitHub** desde GitHub Marketplace:
   - Ve a: https://github.com/apps/shopify
   - Haz clic en "Install" o "Configure"
   - Selecciona tu cuenta/organización
   - Selecciona el repositorio `softable-shopify-theme`

2. En tu admin de Shopify:
   - Ve a **Online Store** → **Themes**
   - Haz clic en "Add theme"
   - Selecciona "Connect from GitHub"
   - Selecciona tu repositorio y la rama `main`
   - Haz clic en "Connect"

#### Paso 4: Publicar el Tema

1. Una vez conectado, verás tu tema en la sección de temas
2. Haz clic en "Actions" → "Publish"
3. O hazlo tema de vista previa primero con "Customize"

### Método 2: Usar Shopify CLI (Recomendado para desarrollo)

#### Paso 1: Instalar Shopify CLI

```bash
# macOS/Linux
brew tap shopify/shopify
brew install shopify-cli

# Windows (con Chocolatey)
choco install shopify-cli

# O con npm
npm install -g @shopify/cli @shopify/theme
```

#### Paso 2: Autenticar con Shopify

```bash
shopify auth login --store tu-tienda.myshopify.com
```

#### Paso 3: Push del Tema

```bash
# Navega a la carpeta del tema
cd softable-theme

# Sube el tema a Shopify
shopify theme push

# O para desarrollo en vivo
shopify theme dev
```

## Configuración Post-Instalación

### 1. Configurar el Logo
1. Ve a **Customize** en tu tema
2. En la sección **Header**, sube tu logo

### 2. Configurar Colores (opcional)
Los colores ya están configurados según el brand DNA, pero puedes ajustarlos en:
- **Theme settings** → **Colors**

### 3. Configurar Menús
1. Ve a **Navigation** en tu admin de Shopify
2. Crea un menú llamado "Main menu" con:
   - Inicio
   - Productos
   - Sobre nosotros
   - Contacto

### 4. Añadir tu Producto
1. Ve a **Products** → **Add product**
2. Añade tu producto Softable con:
   - Título
   - Descripción
   - Imágenes (usa las imágenes de la carpeta uploads)
   - Precio

### 5. Configurar la Página de Inicio
1. Ve a **Customize** → **Homepage**
2. Configura las secciones:
   - **Hero Home**: Añade título, subtítulo e imagen
   - **Features**: Añade 3 características del producto
   - **Product Showcase**: Selecciona tu producto
   - **Benefits**: Añade beneficios del producto
   - **Testimonials**: Añade 3 testimonios
   - **CTA Section**: Configura el call to action final

## Personalización

### Cambiar Colores
Edita el archivo `assets/theme.css` y modifica las variables CSS:

```css
:root {
  --color-primary: #5c899d;
  --color-secondary: #fffcef;
  /* ... */
}
```

### Añadir Nuevas Secciones
1. Crea un archivo `.liquid` en la carpeta `sections/`
2. Añade el schema al final del archivo
3. Añádelo a tu template usando `{% section 'nombre-seccion' %}`

### Modificar Tipografías
Las tipografías están cargadas desde Google Fonts en `layout/theme.liquid`:
- Sora: Para headings
- Inter: Para texto del cuerpo

## Actualizaciones

Para actualizar el tema en Shopify después de hacer cambios:

```bash
# Commit tus cambios
git add .
git commit -m "Descripción de los cambios"
git push origin main

# Si usas GitHub Integration, se actualizará automáticamente
# Si usas Shopify CLI:
shopify theme push
```

## Características

- ✅ Diseño responsive (mobile-first)
- ✅ Optimizado para conversión
- ✅ SEO optimizado
- ✅ Animaciones suaves
- ✅ Carrito de compras funcional
- ✅ Selector de variantes
- ✅ Imágenes con lightbox
- ✅ Newsletter integration
- ✅ Social media links
- ✅ Trust badges
- ✅ Payment icons

## Soporte

Para soporte o preguntas:
- Email: tu-email@ejemplo.com
- Issues: https://github.com/tu-usuario/softable-shopify-theme/issues

## Licencia

© 2024 Robles Agency. Todos los derechos reservados.
