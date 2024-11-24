

const API_URL = "http://localhost:3000/citas";
let isEditing = false; // Indica si estamos en modo edición
let editCitaId = null; // Almacena el ID de la cita que se está editando

// Inicializar
window.onload = () => {
    mostrarCitas();
    document.getElementById("citaForm").addEventListener("submit", manejarFormulario);
    document.getElementById("buscarCitaBtn").addEventListener("click", buscarCita);
};

// Manejar el formulario (registro o edición)
async function manejarFormulario(event) {
    event.preventDefault();

    const citaData = obtenerDatosFormulario();
    if (!validarDatos(citaData)) return;

    try {
        if (isEditing) {
            await Swal.fire("Éxito", "Cita actualizada con éxito", "success");
            await actualizarCita(editCitaId, citaData);
        } else {
            await Swal.fire("Éxito", "Cita registrada con éxito", "success");
            await registrarCita(citaData);
        }

        resetFormulario();
        mostrarCitas();
    } catch (error) {
        console.error("Error al procesar la cita:", error);
        Swal.fire("Error", "Ocurrió un error al guardar la cita.", "error");
    }
}

// Registrar cita
async function registrarCita(citaData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(citaData),
    });
    if (!response.ok) throw new Error("Error al registrar la cita");
}

// Mostrar citas
async function mostrarCitas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al cargar las citas");

        const citas = await response.json();
        renderizarCitas(citas);
    } catch (error) {
        console.error("Error al mostrar las citas:", error);
        Swal.fire("Error", "Ocurrió un error al cargar las citas.", "error");
    }
}

// Renderizar citas en la tabla utilizando DOM scripting
function renderizarCitas(citas) {
    const citasContainer = document.getElementById("citasContainer");
    citasContainer.textContent = ""; // Limpiar contenido previo

    citas.forEach((cita) => {
        const row = document.createElement("tr");

        // Crear celdas y agregar contenido
        row.appendChild(crearCelda(cita.nombrePropietario));
        row.appendChild(crearCelda(cita.nombreMascota));
        row.appendChild(crearCelda(cita.tipoMascota));
        row.appendChild(crearCelda(cita.fechaCita));
        row.appendChild(crearCelda(cita.horaCita));
        row.appendChild(crearCelda(cita.motivoCita));
        row.appendChild(crearCelda(cita.telefonoContacto));

        // Botón de editar
        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        editarButton.className = "btn btn-warning btn-sm";
        editarButton.addEventListener("click", () => cargarCita(cita.id));
        const editarCell = document.createElement("td");
        editarCell.appendChild(editarButton);
        row.appendChild(editarCell);

        // Botón de eliminar
        const eliminarButton = document.createElement("button");
        eliminarButton.textContent = "Eliminar";
        eliminarButton.className = "btn btn-danger btn-sm";
        eliminarButton.addEventListener("click", () => eliminarCita(cita.id));
        const eliminarCell = document.createElement("td");
        eliminarCell.appendChild(eliminarButton);
        row.appendChild(eliminarCell);

        // Agregar la fila al contenedor
        citasContainer.appendChild(row);
    });
}

// Crear una celda para la tabla
function crearCelda(texto) {
    const cell = document.createElement("td");
    cell.textContent = texto;
    return cell;
}

// Cargar cita en el formulario para editar
async function cargarCita(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Error al cargar la cita");

        const cita = await response.json();
        cargarDatosFormulario(cita);

        // Cambiar a modo edición
        isEditing = true;
        editCitaId = id;

        // Cambiar botón
        const submitButton = document.querySelector("#citaForm button[type='submit']");
        submitButton.textContent = "Guardar Cambios";
        submitButton.classList.replace("btn-primary", "btn-success");
    } catch (error) {
        console.error("Error al cargar la cita:", error);
        Swal.fire("Error", "Ocurrió un error al cargar la cita para editar.", "error");
    }
}

// Actualizar cita
async function actualizarCita(id, citaData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(citaData),
    });
    if (!response.ok) throw new Error("Error al actualizar la cita");
}

// Eliminar cita
async function eliminarCita(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la cita de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
                if (!response.ok) throw new Error("Error al eliminar la cita");

                await Swal.fire("Eliminado", "La cita ha sido eliminada.", "success");
                mostrarCitas();
            } catch (error) {
                console.error("Error al eliminar la cita:", error);
                await Swal.fire("Error", "Ocurrió un error al eliminar la cita.", "error");
            }
        }
    });
}

// Buscar cita por nombre
async function buscarCita() {
    const { value: nombreBuscado } = await Swal.fire({
        title: "Buscar cita",
        input: "text",
        inputPlaceholder: "Ingresa el nombre del propietario",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) return "Debes ingresar un nombre para buscar.";
        },
    });

    if (!nombreBuscado) return;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al buscar citas");

        const citas = await response.json();
        const cita = citas.find((c) => c.nombrePropietario.toLowerCase() === nombreBuscado.toLowerCase());

        if (cita) {
            Swal.fire("Cita encontrada", JSON.stringify(cita, null, 2), "success");
        } else {
            Swal.fire("Sin resultados", `No se encontró ninguna cita para ${nombreBuscado}.`, "info");
        }
    } catch (error) {
        console.error("Error al buscar la cita:", error);
        Swal.fire("Error", "Ocurrió un error al buscar la cita.", "error");
    }
}

// Utilidades
function obtenerDatosFormulario() {
    return {
        nombrePropietario: document.getElementById("nombrePropietario").value,
        nombreMascota: document.getElementById("nombreMascota").value,
        tipoMascota: document.getElementById("tipoMascota").value,
        fechaCita: document.getElementById("fechaCita").value,
        horaCita: document.getElementById("horaCita").value,
        motivoCita: document.getElementById("motivoCita").value,
        telefonoContacto: document.getElementById("telefonoContacto").value,
    };
}

function cargarDatosFormulario(cita) {
    document.getElementById("nombrePropietario").value = cita.nombrePropietario;
    document.getElementById("nombreMascota").value = cita.nombreMascota;
    document.getElementById("tipoMascota").value = cita.tipoMascota;
    document.getElementById("fechaCita").value = cita.fechaCita;
    document.getElementById("horaCita").value = cita.horaCita;
    document.getElementById("motivoCita").value = cita.motivoCita;
    document.getElementById("telefonoContacto").value = cita.telefonoContacto;
}

function validarDatos(citaData) {
    if (Object.values(citaData).some((value) => !value)) {
        Swal.fire("Error", "Por favor, rellena todos los campos.", "error");
        return false;
    }
    if (!/^\d+$/.test(citaData.telefonoContacto)) {
        Swal.fire("Error", "El teléfono solo debe contener números.", "error");
        return false;
    }
    const fechaActual = new Date().toISOString().split("T")[0];
    if (citaData.fechaCita < fechaActual) {
        Swal.fire("Error", "La fecha de la cita no puede estar en el pasado.", "error");
        return false;
    }
    return true;
}

function resetFormulario() {
    document.getElementById("citaForm").reset();
    isEditing = false;
    editCitaId = null;

    const submitButton = document.querySelector("#citaForm button[type='submit']");
    submitButton.textContent = "Registrar Cita";
    submitButton.classList.replace("btn-success", "btn-primary");
}
