const radioButtons = document.querySelectorAll('input[type="radio"]');

// Iterar sobre cada elemento de radio
radioButtons.forEach(radioButton => {
    // Agregar un event listener para el evento 'change'
    radioButton.addEventListener('change', function() {
        // Verificar si el elemento seleccionado es 'tarjetaCredito'
        if (this.id === 'tarjetaCredito') {
            // Redirigir a la página deseada para 'tarjetaCredito'
            window.location.href = 'http://localhost:63342/webPolideportivo/MetodosDePago/tarjetaCredito.html';
        } else if (this.id === 'bizum') {
            // Redirigir a la página deseada para 'bizum'
            window.location.href = 'http://localhost:63342/webPolideportivo/MetodosDePago/bizum.html';
        }
    });
});