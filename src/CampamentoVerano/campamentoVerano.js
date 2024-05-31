// Constantes
const cabeceraMenu = document.querySelector(".cabecera .links");
const menuBtn = document.querySelector(".menu-btn");
const hideMenuBtn = document.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const header = document.querySelector("header");
const home = document.querySelector(".home");
const topElements = document.getElementsByClassName("top");
const footer = document.querySelector("footer");
const logo = document.querySelector(".logo");
const cabecera = document.querySelector(".cabecera");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 0);
});

window.onscroll = () => {
    logo.classList.remove('bx-x');
    cabecera.classList.remove('open');
};

const sr = ScrollReveal ({
    distance: '30px',
    duration: 2600,
    reset: true
})

sr.reveal('.cabecera',{delay:280, origin:'bottom'})

sr.reveal('.home',{delay:200, origin:'bottom'})

// Mostrar menú móvil
menuBtn.addEventListener("click", () => {
    cabeceraMenu.classList.toggle("show-menu");
});

// Ocultar menú móvil
hideMenuBtn.addEventListener("click", () => menuBtn.click());

// Mostrar ventana emergente de formulario
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

// Ocultar ventana emergente de formulario
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Se agrega un detector de eventos de clic al botón de menú
    menuBtn.addEventListener('click', function() {
        // Comprueba si la sección está actualmente visible
        if (home.style.display === 'none') {
            // Si la sección está oculta, se muestra el menú lateral
            home.style.display = 'block';
        } else {
            // Si la sección está visible, el menú lateral se esconde
            home.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        // Esta función recorre todos los elementos con la clase 'top'
        for (var i = 0; i < topElements.length; i++) {
            // Se alterna la propiedad de visualización entre 'none' y 'block'
            if (topElements[i].style.display === 'none') {
                topElements[i].style.display = 'block';
            } else {
                topElements[i].style.display = 'none';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        if (footer.style.display === 'none') {
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
    });
});

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

function validarEdad(event) {

    var input = event.target;

    // Expresión regular para números
    var regex = /^[0-9]+$/;

    // Si el valor del input no coincide con la expresión regular, se limpia el valor y elimina caracteres no numéricos
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
}
