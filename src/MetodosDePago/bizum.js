// Validaciones
function validarNombre(event) {

    var input = event.target;

    // Expresión regular para letras y espacios
    var regex = /^[A-Za-z\s]+$/;

    // Si el valor del input no coincide con la expresión regular, se limpia el valor
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^A-Za-z\s]+/g, '');
    }
}

function validarTelefono(event) {

    var input = event.target;

    // Expresión regular para números
    var regex = /^[0-9]+$/;

    // Si el valor del input no coincide con la expresión regular, se limpia el valor y elimina caracteres no numéricos
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
}

// Mostrar Ventana Modal
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('paymentForm');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', function (event) {
        // Prevenir el comportamiento por defecto de enviar el formulario
        event.preventDefault();

        // Crear una solicitud AJAX para enviar los datos del formulario
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Mostrar el modal
            submitBtn.checked = true;
        })
        .catch(error => console.error('Error:', error));
    });
});
