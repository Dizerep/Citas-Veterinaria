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

    alert("Cita registrada con éxito.");

    // Limpiamos el formulario
    document.getElementById('citaForm').reset();
});

// Función para mostrar la alerta de disponibilidad con ciclo
function alertaDisponibilidad() {
    let confirmado = false;
    // Ciclo que se repetirá mientras el usuario no haga clic en "OK"
    while (!confirmado) {
        confirmado = confirm("Las citas están sujetas a disponibilidad. Haz clic en 'OK' para continuar.");
    }
}

// Llamar a la alerta de disponibilidad cuando se cargue la página
window.onload = function() {
    alertaDisponibilidad();
};