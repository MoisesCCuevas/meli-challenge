# Meli Challenge

Este proyecto es una aplicación desarrollada como parte de un prueba técnica de desarrollo utilizando **Next.js** y **Redux Toolkit**.

## Instalación

1. Clona repositorio.
2. Instala las dependencias:

   ```bash
   npm install
   ```

## Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Genera una versión optimizada para producción.
- **`npm start`**: Inicia la aplicación en modo producción.
- **`npm test`**: Ejecuta las pruebas unitarias.

## Estructura del Proyecto

```
src/
├── app/                # Páginas y componentes principales
├── components/         # Componentes reutilizables
├── hooks/              # Hooks personalizados
├── store/              # Configuración de Redux Toolkit
├── types/              # Definiciones de tipos TypeScript
└── __test__/           # Pruebas unitarias
```

## Funcionalidades

- **Búsqueda y filtrado**: Filtra productos por nombre y categoría.
- **Gestión de productos**: Agrega nuevos productos al estado global.
- **Páginas dinámicas**: Generación de páginas dinámicas para cada producto.

## Pruebas

Las pruebas unitarias están implementadas con **Jest** y **React Testing Library**.

El reporte de cobertura se genera en la carpeta `coverage/`.

