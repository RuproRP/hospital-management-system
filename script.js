document.addEventListener("DOMContentLoaded", function () {
    loadPatients();
});

document.getElementById("patientForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    // Verificar si se ingresaron valores válidos
    if (name.trim() === "" || age.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa nombre y edad válidos'
        });
        return;
    }

    // Guardar el paciente localmente
    savePatientLocally(name, age,);

    // Mostrar un mensaje de éxito
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Paciente ingresado correctamente'
    });

    // Limpiar el formulario
    document.getElementById("patientForm").reset();

    // Actualizar la lista de pacientes en la web
    loadPatients();
});

document.getElementById("goToList").addEventListener("click", function() {
    // Redirigir a la página de listado (simulado con un mensaje)
    Swal.fire({
        title: 'Listado de Pacientes',
        html: 'Simulación de redirección a la página de listado...'
    });
});

function savePatientLocally(name, age, gender, condition) {
    // Guardar los datos del paciente en el almacenamiento local
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const patientData = {
        name: name,
        age: age,
        gender: gender,
        condition: condition,
        timestamp: timestamp
    };
    const key = `patients/${name}_${timestamp}`;
    localStorage.setItem(key, JSON.stringify(patientData));
}

function loadPatients() {
    const patientsList = document.getElementById("patients");

    // Limpiar la lista antes de cargar los pacientes
    patientsList.innerHTML = "";

    // Recorrer todos los elementos en el almacenamiento local
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const patientData = JSON.parse(localStorage.getItem(key));

        // Crear un elemento de lista para cada paciente
        const listItem = document.createElement("li");
        listItem.textContent = `Nombre: ${patientData.name}, Edad: ${patientData.age}, Género: ${patientData.gender}, Condicíon Médica: ${patientData.condition} Fecha: ${patientData.timestamp}`;

        // Agregar el elemento a la lista
        patientsList.appendChild(listItem);
    }
}
