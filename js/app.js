document.getElementById('citaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Capturamos los valores del formulario
    const nombrePropietario = document.getElementById('nombrePropietario').value;
    const nombreMascota = document.getElementById('nombreMascota').value;
    const tipoMascota = document.getElementById('tipoMascota').value;
    const fechaCita = document.getElementById('fechaCita').value;
    const horaCita = document.getElementById('horaCita').value;
    const motivoCita = document.getElementById('motivoCita').value;
    const telefonoContacto = document.getElementById('telefonoContacto').value;

    // Validamos que los campos no estén vacíos (condicional básico)
    if (nombrePropietario === "" || nombreMascota === "" || tipoMascota === "" || fechaCita === "" || horaCita === "" || motivoCita === "" || telefonoContacto === "") {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    // Creamos un objeto de cita
    const cita = {
        nombrePropietario,
        nombreMascota,
        tipoMascota,
        fechaCita,
        horaCita,
        motivoCita,
        telefonoContacto
    };

    // Almacenamos la cita en el Local Storage
    let citas = JSON.parse(localStorage.getItem('citas')) || []; // Obtenemos las citas previas o inicializamos un array vacío
    citas.push(cita); // Añadimos la nueva cita al array

    localStorage.setItem('citas', JSON.stringify(citas)); // Guardamos el array en Local Storage

    alert("Cita Agendada con Exito: \n" + JSON.stringify(cita, null, 2)); // Mostramos los datos de la cita en una alerta

    // Limpiamos el formulario
    document.getElementById('citaForm').reset();
});

// Función para mostrar la alerta de disponibilidad con ciclo
function alertaDisponibilidad() {
    let input = "";

    // Ciclo que se repetirá mientras el usuario no escriba 'ok'
    while (input.toLowerCase() !== "ok") {
        input = prompt("Las citas están sujetas a disponibilidad. Escribe 'ok' para continuar.");
        if (input.toLowerCase() === "ok") {
            console.log("El usuario ha confirmado la disponibilidad.");
        } else {
            alert("Por favor, escribe 'ok' para continuar.");
        }
    }
}

// Llamar a la alerta de disponibilidad cuando se cargue la página
window.onload = function() {
    alertaDisponibilidad();
};

// Evento para buscar una cita por nombre del propietario
document.getElementById('buscarCitaBtn').addEventListener('click', function() {
    const nombreBuscado = prompt("Ingresa el nombre del propietario para buscar la cita:");

    if (!nombreBuscado) {
        alert("Debes ingresar un nombre para realizar la búsqueda.");
        return;
    }

    // Obtenemos las citas almacenadas en el Local Storage
    const citas = JSON.parse(localStorage.getItem('citas')) || [];

    // Buscamos la cita por el nombre del propietario
    const citaEncontrada = citas.find(cita => cita.nombrePropietario.toLowerCase() === nombreBuscado.toLowerCase());

    if (citaEncontrada) {
        // Si la cita es encontrada, mostramos la información en un alert
        alert("Cita encontrada:\n" + JSON.stringify(citaEncontrada, null, 2));
    } else {
        alert("No se encontró ninguna cita para el propietario: " + nombreBuscado);
    }
});
