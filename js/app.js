document.getElementById('citaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombrePropietario = document.getElementById('nombrePropietario').value;
    const nombreMascota = document.getElementById('nombreMascota').value;
    const tipoMascota = document.getElementById('tipoMascota').value;
    const fechaCita = document.getElementById('fechaCita').value;
    const horaCita = document.getElementById('horaCita').value;
    const motivoCita = document.getElementById('motivoCita').value;
    const telefonoContacto = document.getElementById('telefonoContacto').value;

    // Validaciones
    if (nombrePropietario === "" || nombreMascota === "" || tipoMascota === "" || fechaCita === "" || horaCita === "" || motivoCita === "" || telefonoContacto === "") {
        alert("Por favor, rellena todos los campos.");
        return;
    }
    if (!/^\d+$/.test(telefonoContacto)) {
        alert("El teléfono solo debe contener números.");
        return;
    }
    const fechaActual = new Date().toISOString().split('T')[0];
    if (fechaCita < fechaActual) {
        alert("La fecha de la cita no puede estar en el pasado.");
        return;
    }

    const cita = {
        nombrePropietario,
        nombreMascota,
        tipoMascota,
        fechaCita,
        horaCita,
        motivoCita,
        telefonoContacto
    };

    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citas));

    alert("Cita Agendada con Exito");
    document.getElementById('citaForm').reset();
    mostrarCitas(); // Actualizar la visualización de citas
});

// Función para mostrar citas almacenadas
function mostrarCitas() {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    const citasContainer = document.getElementById('citasContainer');
    citasContainer.innerHTML = ''; // Limpiar contenido previo

    citas.forEach((cita, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cita.nombrePropietario}</td>
            <td>${cita.nombreMascota}</td>
            <td>${cita.tipoMascota}</td>
            <td>${cita.fechaCita}</td>
            <td>${cita.horaCita}</td>
            <td>${cita.motivoCita}</td>
            <td>${cita.telefonoContacto}</td>
            <td><button class="btn btn-warning btn-sm" onclick="editarCita(${index})">Editar</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarCita(${index})">Eliminar</button></td>
        `;
        citasContainer.appendChild(row);
    });
}

// Función para eliminar una cita
function eliminarCita(index) {
    // Preguntar al usuario si está seguro de eliminar la cita
    if (!confirm("¿Estás seguro de eliminar esta cita?")) {
        return;
    }

    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.splice(index, 1);
    localStorage.setItem('citas', JSON.stringify(citas));
    mostrarCitas();
}

// Función para editar una cita
function editarCita(index) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    const cita = citas[index];

    document.getElementById('nombrePropietario').value = cita.nombrePropietario;
    document.getElementById('nombreMascota').value = cita.nombreMascota;
    document.getElementById('tipoMascota').value = cita.tipoMascota;
    document.getElementById('fechaCita').value = cita.fechaCita;
    document.getElementById('horaCita').value = cita.horaCita;
    document.getElementById('motivoCita').value = cita.motivoCita;
    document.getElementById('telefonoContacto').value = cita.telefonoContacto;

    // Remover la cita actual y guardar cambios
    citas.splice(index, 1);
    localStorage.setItem('citas', JSON.stringify(citas));
    mostrarCitas();
}

document.getElementById('buscarCitaBtn').addEventListener('click', function() {
    const nombreBuscado = prompt("Ingresa el nombre del propietario para buscar la cita:");
    if (!nombreBuscado) {
        alert("Debes ingresar un nombre para realizar la búsqueda.");
        return;
    }

    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    const citaEncontrada = citas.find(cita => cita.nombrePropietario.toLowerCase() === nombreBuscado.toLowerCase());

    if (citaEncontrada) {
        alert("Cita encontrada:\n" + JSON.stringify(citaEncontrada, null, 2));
    } else {
        alert("No se encontró ninguna cita para el propietario: " + nombreBuscado);
    }
});

// Cargar citas al iniciar la página
window.onload = mostrarCitas;
