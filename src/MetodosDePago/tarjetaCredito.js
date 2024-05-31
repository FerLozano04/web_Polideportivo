document.querySelector('.card-number-input').oninput = (event) => {
    // Obtiene el valor del input
    let inputValue = event.target.value;

    // Elimina cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Limita la longitud a 16 carácteres
    inputValue = inputValue.slice(0, 16);

    // Se asigna el valor limpio al input
    event.target.value = inputValue;

    // Actualiza la visualización del número de tarjeta
    document.querySelector('.card-number-box').innerText = inputValue;
}

document.querySelector('.card-holder-input').oninput = (event) => {
    // Obtiene el valor del input
    let inputValue = event.target.value;

    // Elimina cualquier carácter que no sea una letra
    inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    // Limita la longitud a 28 carácteres
    inputValue = inputValue.slice(0, 28);

    // Se asigna el valor limpio al input
    event.target.value = inputValue;

    // Actualiza la visualización del titular de la tarjeta
    document.querySelector('.card-holder-name').innerText = inputValue;
}


document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value + ' / ';
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    // Obtiene el valor del input
    let inputValue = event.target.value;

    // Elimina cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Limita la longitud a 3 carácteres
    inputValue = inputValue.slice(0, 3);

    // Se asigna el valor limpio al input
    event.target.value = inputValue;

    // Actualiza la visualización del número de tarjeta
    document.querySelector('.cvv-box').innerText = inputValue;
}

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
