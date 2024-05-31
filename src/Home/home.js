// Constantes
const cabeceraMenu = document.querySelector(".cabecera .links");
const menuBtn = document.querySelector(".menu-btn");
const hideMenuBtn = document.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const allStar = document.querySelectorAll(".rating .star");
const ratingValue = document.querySelectorAll(".rating input");
const header = document.querySelector("header");
const home = document.querySelector(".home");
const bienvenida = document.querySelector(".bienvenida");
const queOfrecemos = document.querySelector(".queOfrecemos");
const porqueVenir = document.querySelector(".porqueVenir");
const galeria = document.querySelector(".galeria");
const contacto = document.querySelector(".contacto");
const valoraciones = document.querySelector(".valoraciones");
const topElements = document.getElementsByClassName("top");
const footer = document.querySelector("footer");
const logo = document.querySelector(".logo");
const cabecera = document.querySelector(".cabecera");
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".galeria .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        // Actualizar la posición del pulgar al mover el mouse
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Eliminar los eventos con el mouse hacia arriba
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Agregar eventos para la interacción de arrastre
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Deslizar las imágenes de acuerdo con los clics del botón de diapositivas
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    // Actualizar la posición del pulgar de la barra de desplazamiento según el desplazamiento de la imagen
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load", initSlider);

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

sr.reveal('.home,.bienvenida,.queOfrecemos,.porqueVenir,.galeria,.contacto,.valoraciones',{delay:200, origin:'bottom'})

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

allStar.forEach((item, idx) => {
    item.addEventListener("click", function() {
        let click = 0;
        ratingValue.value = idx + 1;
        console.log(ratingValue.value);

        allStar.forEach(i => {
            i.classList.replace("bxs-star", "bx-star");
            i.classList.remove("active");
        });
        for(let i=0; i < allStar.length; i++){
            if(i <= idx){
                allStar[i].classList.replace("bx-star", "bxs-star");
                allStar[i].classList.add("active");
            } else {
                allStar[i].style.setProperty("--i", click);
                click++;
            };
        };
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
        if (bienvenida.style.display === 'none') {
            bienvenida.style.display = 'block';
        } else {
            bienvenida.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        if (queOfrecemos.style.display === 'none') {
            queOfrecemos.style.display = 'block';
        } else {
            queOfrecemos.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        if (porqueVenir.style.display === 'none') {
            porqueVenir.style.display = 'block';
        } else {
            porqueVenir.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        if (galeria.style.display === 'none') {
            galeria.style.display = 'block';
        } else {
            galeria.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        if (contacto.style.display === 'none') {
            contacto.style.display = 'block';
        } else {
            contacto.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        if (valoraciones.style.display === 'none') {
            valoraciones.style.display = 'block';
        } else {
            valoraciones.style.display = 'none';
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

// Para crear nuestra cookie
setCookie = (cName, cValue, expDays) => {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires + "; path=/";
}

getCookie = (cName) => {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; ");
    let value;
    cArr.forEach(val => {
        if(val.indexOf(name) === 0) value = val.substring(name.length);
    })

    return value;
}

document.querySelector(".cookies-btn").addEventListener("click", () => {
    document.querySelector(".cookies").style.display = "none";
    setCookie("cookie", true, 30);
})

cookieMessage = () => {
    if(!getCookie("cookie"))
    document.querySelector(".cookies").style.display = "block";
}

window.addEventListener("load", cookieMessage);

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