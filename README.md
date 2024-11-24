# Citas Veterinarias

Este es un proyecto de una aplicación web para gestionar citas médicas veterinarias. La aplicación permite registrar, editar, buscar y eliminar citas, haciendo uso de JSON Server como backend simulado y SweetAlert2 para mostrar alertas elegantes.

## Requisitos Previos

- [Node.js](https://nodejs.org) instalado en tu máquina.
- [JSON Server](https://www.npmjs.com/package/json-server) instalado globalmente o localmente.
- Navegador web actualizado.

---

## Instalación

1. **Clona el repositorio o descarga los archivos:**

   ```bash
   git clone https://github.com/Dizerep/Citas-Veterinaria.git
   cd citas-veterinaria


2. **Instala las dependencias:**

   ```bash
   npm install


3. **JSON Server como backend:**

   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3000

4. **JSON Server como backend:**

   ```bash
   Abre el archivo index.html en tu navegador. Puedes usar la extensión "Live Server" en Visual Studio Code para un entorno más dinámico.

## Funcionalidades

-Registrar citas: Completa el formulario y registra nuevas citas.

-Editar citas: Edita las citas existentes directamente desde la tabla.

- Eliminar citas: Elimina citas con confirmación previa.

- Buscar citas: Busca citas por el nombre del propietario.

- Alertas visuales: Todas las operaciones muestran notificaciones elegantes gracias a SweetAlert2.


