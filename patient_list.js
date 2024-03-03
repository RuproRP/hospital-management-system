document.addEventListener("DOMContentLoaded", function () {
    loadPatients();
});

function loadPatients() {
    const patientsList = document.getElementById("patients");

    // Limpiar la lista antes de cargar los pacientes
    patientsList.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const patientData = JSON.parse(localStorage.getItem(key));

        // Crear un elemento de lista para cada paciente
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>Nombre:</strong> ${patientData.name}, 
            <strong>Edad:</strong> ${patientData.age}, 
            <strong>Condición Médica:</strong> ${patientData.condition},
            <strong>Fecha de Ingreso:</strong> ${formatDate(patientData.timestamp)},
            <button class="edit-button" onclick="editPatient('${key}')">Editar</button>
            <button class="details-button" onclick="showDetails('${key}')">Detalles</button>
            <button class="delete-button" onclick="deletePatient('${key}')">Eliminar</button>
        `;

        // Agregar el elemento a la lista
        patientsList.appendChild(listItem);
    }
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}



function showDetails(key) {
    const patientData = JSON.parse(localStorage.getItem(key));

    const detailsHtml = `
        <div class="details-container">
            <p><strong>Nombre:</strong> ${patientData.name}</p>
            <p><strong>Edad:</strong> ${patientData.age}</p>
            <p><strong>Condición Médica:</strong> ${patientData.condition}</p>
            <p><strong>Fecha de Ingreso:</strong> ${formatDate(patientData.timestamp)}</p>
            <hr>
            <p><strong>Pruebas a Realizar:</strong></p>
            ${renderTests(patientData.tests)}
        </div>
    `;

    Swal.fire({
        icon: 'info',
        title: 'Detalles del Paciente',
        html: detailsHtml,
        showCancelButton: true,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            container: 'details-buttons-container'
        }
    });

    const container = document.querySelector('.details-buttons-container');

    // Botón Añadir Prueba
    const addTestButton = document.createElement('button');
    addTestButton.textContent = 'Añadir Prueba';
    addTestButton.className = 'details-button';
    addTestButton.onclick = function () {
        addTest(key);
        Swal.close();
    };

    container.appendChild(addTestButton);
}


function renderTests(tests) {
    if (!tests || tests.length === 0) {
        return '<p>No hay pruebas registradas.</p>';
    }

    return tests.map((test, index) => `
        <p>
            ${test.name} - ${formatDate(test.timestamp)}
            <button class="delete-test-button" onclick="deleteTest('${index}')">Eliminar</button>
        </p>
    `).join('');
}

function deleteTest(index) {
    const key = localStorage.key(index);
    const patientData = JSON.parse(localStorage.getItem(key));

    if (patientData && patientData.tests && patientData.tests.length > index) {
        patientData.tests.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(patientData));
        loadPatients(); // Asegúrate de recargar la lista después de eliminar la prueba
        Swal.close();
    }
}

    const container = document.querySelector('.edit-delete-buttons-container');
    
    // Botón Editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit-button';
    editButton.onclick = function () {
        editPatient(key);
        Swal.close();
    };

    // Botón Eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function () {
        deletePatient(key);
        Swal.close();
    };

    // Botón Añadir Prueba
    const addTestButton = document.createElement('button');
    addTestButton.textContent = 'Añadir Prueba';
    addTestButton.className = 'add-test-button';
    addTestButton.onclick = function () {
        addTest(key);
        Swal.close();
    };

    container.appendChild(editButton);
    container.appendChild(deleteButton);
    container.appendChild(addTestButton);



function deletePatient(key) {
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará permanentemente al paciente.',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem(key);
            loadPatients(); // Actualizar la lista después de eliminar
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'El paciente ha sido eliminado correctamente.'
            });
        }
    });
}

function editPatient(key) {
    const patientData = JSON.parse(localStorage.getItem(key));

    // Puedes redirigir a una página de edición o mostrar un formulario de edición en un modal
    // Ejemplo: window.location.href = 'edit_patient.html?key=' + key;
    // Puedes personalizar la lógica según tus necesidades específicas.

    // Aquí puedes implementar la lógica para la edición del paciente
    // Por ejemplo, mostrar un formulario de edición en un modal
    Swal.fire({
        icon: 'question',
        title: 'Editar Paciente',
        html: `
            <label for="editedName">Nombre:</label>
            <input type="text" id="editedName" value="${patientData.name}" required>

            <label for="editedAge">Edad:</label>
            <input type="number" id="editedAge" value="${patientData.age}" required>

            <label for="editedCondition">Condición Médica:</label>
            <input type="text" id="editedCondition" value="${patientData.condition}" required>

            <button onclick="saveEditedPatient('${key}')">Guardar Cambios</button>
        `
    });
}

function saveEditedPatient(key) {
    const editedName = document.getElementById('editedName').value;
    const editedAge = document.getElementById('editedAge').value;
    const editedCondition = document.getElementById('editedCondition').value;

    const editedPatientData = {
        name: editedName,
        age: editedAge,
        condition: editedCondition
    };

    localStorage.setItem(key, JSON.stringify(editedPatientData));
    loadPatients(); // Asegúrate de recargar la lista después de editar
    Swal.close(); // Cierra el modal de edición
}

function addTest(key) {
    const patientData = JSON.parse(localStorage.getItem(key));

    const testName = prompt('Ingrese el nombre de la prueba:');
    
    if (testName) {
        // Agregar la prueba al registro del paciente
        if (!patientData.tests) {
            patientData.tests = [];
        }

        const timestamp = new Date().toLocaleString();
        patientData.tests.push({ name: testName, timestamp });

        localStorage.setItem(key, JSON.stringify(patientData));
        loadPatients();
    }
}


function goToRegistration() {
    window.location.href = 'index.html';
}
