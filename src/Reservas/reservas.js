// Constantes
const cabeceraMenu = document.querySelector(".cabecera .links");
const menuBtn = document.querySelector(".menu-btn");
const hideMenuBtn = document.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const header = document.querySelector("header");
const topElements = document.getElementsByClassName("top");
const footer = document.querySelector("footer");
const clasesParticulares = document.querySelector("main-container");
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
        if (clasesParticulares.style.display === 'none') {
            clasesParticulares.style.display = 'block';
        } else {
            clasesParticulares.style.display = 'none';
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

// Clases Particulares
const categoryTitle = document.querySelectorAll('.category-title');
const allCategoryPosts = document.querySelectorAll('.all');

for(let i = 0; i < categoryTitle.length; i++){
    categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));
}

function filterPosts(item){
    changeActivePosition(item);
    for(let i = 0; i < allCategoryPosts.length; i++){
        if(allCategoryPosts[i].classList.contains(item.attributes.id.value)){
            allCategoryPosts[i].style.display = "block";
        } else {
            allCategoryPosts[i].style.display = "none";
        }
    }
}

function changeActivePosition(activeItem){
    for(let i = 0; i < categoryTitle.length; i++){
        categoryTitle[i].classList.remove('active');
    }
    activeItem.classList.add('active');
};

// Lógica para el botón 'Reservar'
document.querySelectorAll('.read-btn').forEach(button => {
    button.addEventListener('click', function() {
        const Profesor = this.getAttribute('data-profesor');
        const Deporte = this.getAttribute('data-deporte');
        const Precio = this.getAttribute('data-precio');

        // Aquí puedes enviar los datos a través de una solicitud AJAX
        // Por ejemplo, utilizando fetch()

        fetch('http://localhost/PHP/guardar_reserva.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Profesor: Profesor,
                Deporte: Deporte,
                Precio: Precio
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar la reserva');
            }
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta del servidor si es necesario
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

// Lógica para mostrar y editar datos de la base de datos en las tarjetas de 'Reservas'
$(document).ready(function() {
    // Realizar una solicitud AJAX para obtener los datos de PHP de futbol
    $.ajax({
        url: 'http://localhost/PHP/obtener_datos.php', // Ruta a tu archivo PHP que obtiene los datos de la base de datos
        method: 'GET', // Método de solicitud
        dataType: 'json', // Tipo de datos que esperas recibir
        success: function(data) {
            // Itera sobre los datos recibidos
            $.each(data, function(index, item) {
                // Crea un nuevo div para la tarjeta
                var card = $('<div class="card">');

                // Crea un div para el contenido de la tarjeta y el formulario de edición
                var cardContent = $('<div class="card-content">');
                var editFormContainer = $('<div class="edit-form-container">');

                // Crea un título para la tarjeta y asigna el nombre como texto
                var cardTitle = $('<h2 class="card-title">').text(item.deporte);

                // Crea un párrafo para la descripción y asigna otros datos como texto
                var cardDescription = $('<p class="card-description">').text('Correo: ' + item.correoUsuario + ' || ' + ' Superficie: ' + item.superficie + ' || ' + ' Precio: ' + item.precio + ' || ' + ' Horario: ' + item.horario + ' || ' + ' Fecha: ' + item.date);

                // Crea el formulario de edición
                var editForm = $('<form action="http://localhost/PHP/editar.php" method="post" class="edit-form">');
                editForm.append('<h4>Editar campos de esta reserva:</h4>');
                editForm.append('<input type="hidden" name="id" value="' + item.id + '">');
                editForm.append('<input type="text" name="horario" autocomplete="off" placeholder="Nuevo horario">');
                editForm.append('<input type="text" name="date" autocomplete="off" placeholder="Nueva fecha">');
                // Botones para editar y eliminar
                var editButton = $('<button type="submit" class="card-button">Editar</button>');
                var deleteButton = $('<button type="submit" class="delete-button">Eliminar</button>');
                var payButton = $('<a href="http://localhost:63342/webPolideportivo/MetodosDePago/metodosPago.html" type="button" class="pay-button">Pagar</a>');

                // Agrega los elementos al contenido de la tarjeta y al contenedor del formulario de edición
                cardContent.append(cardTitle, cardDescription);
                editForm.append(editButton);
                editForm.append(deleteButton);
                editForm.append(payButton);
                editFormContainer.append(editForm);

                // Agrega el contenido de la tarjeta y el formulario de edición al div de la tarjeta
                card.append(cardContent, editFormContainer);

                // Agrega la tarjeta al contenedor de tarjetas en tu página HTML
                $('#cards-container').append(card);
            });

            // Escuchar el evento de cambio en el campo de búsqueda
            $('#searchInput').on('input', function() {
                var searchText = $(this).val().toLowerCase(); // Obtener el valor del campo de búsqueda en minúsculas
                $('.card').each(function() {
                    var cardName = $(this).find('.card-title').text().toLowerCase(); // Obtener el nombre de la tarjeta en minúsculas
                    // Mostrar u ocultar la tarjeta según si el nombre coincide con el término de búsqueda
                    $(this).toggle(cardName.indexOf(searchText) > -1);
                });
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });

    // Realizar una solicitud AJAX para obtener los datos de PHP de baloncesto
    $.ajax({
        url: 'http://localhost/PHP/obtener_datos2.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
                $.each(data, function(index, item) {
                    var card = $('<div class="card">');

                    var cardContent = $('<div class="card-content">');
                    var editFormContainer = $('<div class="edit-form-container">');

                    var cardTitle = $('<h2 class="card-title">').text(item.deporte);

                    var cardDescription = $('<p class="card-description">').text('Correo: ' + item.correoUsuario + ' || ' + ' Superficie: ' + item.superficie + ' || ' + ' Precio: ' + item.precio + ' || ' + ' Horario: ' + item.horario + ' || ' + ' Fecha: ' + item.date);

                    // Formulario de edición
                    var editForm = $('<form action="http://localhost/PHP/editar2.php" method="post" class="edit-form">');
                    editForm.append('<h4>Editar campos de esta reserva:</h4>');
                    editForm.append('<input type="hidden" name="id" value="' + item.id + '">');
                    editForm.append('<input type="text" name="horario" autocomplete="off" placeholder="Nuevo horario">');
                    editForm.append('<input type="text" name="date" autocomplete="off" placeholder="Nueva fecha">');

                    // Botones para editar y eliminar
                    var editButton = $('<button type="submit" class="card-button">Editar</button>');
                    var deleteButton = $('<button type="submit" class="delete-button2">Eliminar</button>');
                    var payButton = $('<a href="http://localhost:63342/webPolideportivo/MetodosDePago/metodosPago.html" type="button" class="pay-button">Pagar</a>');

                    // Agrega los elementos al contenido de la tarjeta y al contenedor del formulario de edición
                    cardContent.append(cardTitle, cardDescription);
                    editForm.append(editButton);
                    editForm.append(deleteButton);
                    editForm.append(payButton);
                    editFormContainer.append(editForm);

                    // Agrega el contenido de la tarjeta y el formulario de edición al div de la tarjeta
                    card.append(cardContent, editFormContainer);

                    // Agrega la tarjeta al contenedor de tarjetas en tu página HTML
                    $('#cards-container').append(card);
                });

                // Escuchar el evento de cambio en el campo de búsqueda
                $('#searchInput').on('input', function() {
                    var searchText = $(this).val().toLowerCase();
                    $('.card').each(function() {
                        var cardName = $(this).find('.card-title').text().toLowerCase();
                        // Mostrar u ocultar la tarjeta según si el nombre coincide con el término de búsqueda
                        $(this).toggle(cardName.indexOf(searchText) > -1);
                    });
                });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });

    // Realizar una solicitud AJAX para obtener los datos de PHP de natacion
    $.ajax({
        url: 'http://localhost/PHP/obtener_datos3.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
                    $.each(data, function(index, item) {
                        var card = $('<div class="card">');

                        var cardContent = $('<div class="card-content">');
                        var editFormContainer = $('<div class="edit-form-container">');

                        var cardTitle = $('<h2 class="card-title">').text(item.deporte);

                        var cardDescription = $('<p class="card-description">').text('Correo: ' + item.correoUsuario + ' || ' + ' Precio: ' + item.precio + ' || ' + ' Horario: ' + item.horario + ' || ' + ' Fecha: ' + item.date);

                        // Formulario de edición
                        var editForm = $('<form action="http://localhost/PHP/editar3.php" method="post" class="edit-form">');
                        editForm.append('<h4>Editar campos de esta reserva:</h4>');
                        editForm.append('<input type="hidden" name="id" value="' + item.id + '">');
                        editForm.append('<input type="text" name="horario" autocomplete="off" placeholder="Nuevo horario">');
                        editForm.append('<input type="text" name="date" autocomplete="off" placeholder="Nueva fecha">');

                        // Botones para editar y eliminar
                        var editButton = $('<button type="submit" class="card-button">Editar</button>');
                        var deleteButton = $('<button type="submit" class="delete-button3">Eliminar</button>');
                        var payButton = $('<a href="http://localhost:63342/webPolideportivo/MetodosDePago/metodosPago.html" type="button" class="pay-button">Pagar</a>');

                        // Agrega los elementos al contenido de la tarjeta y al contenedor del formulario de edición
                        cardContent.append(cardTitle, cardDescription);
                        editForm.append(editButton);
                        editForm.append(deleteButton);
                        editForm.append(payButton);
                        editFormContainer.append(editForm);

                        // Agrega el contenido de la tarjeta y el formulario de edición al div de la tarjeta
                        card.append(cardContent, editFormContainer);

                        // Agrega la tarjeta al contenedor de tarjetas en tu página HTML
                        $('#cards-container').append(card);
                    });

                    // Escuchar el evento de cambio en el campo de búsqueda
                    $('#searchInput').on('input', function() {
                        var searchText = $(this).val().toLowerCase();
                        $('.card').each(function() {
                            var cardName = $(this).find('.card-title').text().toLowerCase();
                            // Mostrar u ocultar la tarjeta según si el nombre coincide con el término de búsqueda
                            $(this).toggle(cardName.indexOf(searchText) > -1);
                        });
                    });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });

     // Realizar una solicitud AJAX para obtener los datos de PHP de padel
     $.ajax({
        url: 'http://localhost/PHP/obtener_datos4.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
                        $.each(data, function(index, item) {
                            var card = $('<div class="card">');

                            var cardContent = $('<div class="card-content">');
                            var editFormContainer = $('<div class="edit-form-container">');

                            var cardTitle = $('<h2 class="card-title">').text(item.deporte);

                            var cardDescription = $('<p class="card-description">').text('Correo: ' + item.correoUsuario + ' || ' + ' Superficie: ' + item.superficie + ' || ' + ' Precio: ' + item.precio + ' || ' + ' Horario: ' + item.horario + ' || ' + ' Fecha: ' + item.date);

                            // Formulario de edición
                            var editForm = $('<form action="http://localhost/PHP/editar4.php" method="post" class="edit-form">');
                            editForm.append('<h4>Editar campos de esta reserva:</h4>');
                            editForm.append('<input type="hidden" name="id" value="' + item.id + '">');
                            editForm.append('<input type="text" name="horario" autocomplete="off" placeholder="Nuevo horario">');
                            editForm.append('<input type="text" name="date" autocomplete="off" placeholder="Nueva fecha">');

                            // Botones para editar y eliminar
                            var editButton = $('<button type="submit" class="card-button">Editar</button>');
                            var deleteButton = $('<button type="submit" class="delete-button4">Eliminar</button>');
                            var payButton = $('<a href="http://localhost:63342/webPolideportivo/MetodosDePago/metodosPago.html" type="button" class="pay-button">Pagar</a>');

                            // Agrega los elementos al contenido de la tarjeta y al contenedor del formulario de edición
                            cardContent.append(cardTitle, cardDescription);
                            editForm.append(editButton);
                            editForm.append(deleteButton);
                            editForm.append(payButton);
                            editFormContainer.append(editForm);

                            // Agrega el contenido de la tarjeta y el formulario de edición al div de la tarjeta
                            card.append(cardContent, editFormContainer);

                            // Agrega la tarjeta al contenedor de tarjetas en tu página HTML
                            $('#cards-container').append(card);
                        });

                        // Escuchar el evento de cambio en el campo de búsqueda
                        $('#searchInput').on('input', function() {
                            var searchText = $(this).val().toLowerCase();
                            $('.card').each(function() {
                                var cardName = $(this).find('.card-title').text().toLowerCase();
                                // Mostrar u ocultar la tarjeta según si el nombre coincide con el término de búsqueda
                                $(this).toggle(cardName.indexOf(searchText) > -1);
                            });
                        });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
     });

     // Realizar una solicitud AJAX para obtener los datos de PHP de atletismo
     $.ajax({
        url: 'http://localhost/PHP/obtener_datos5.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
                         $.each(data, function(index, item) {
                             var card = $('<div class="card">');

                             var cardContent = $('<div class="card-content">');
                             var editFormContainer = $('<div class="edit-form-container">');

                             var cardTitle = $('<h2 class="card-title">').text(item.deporte);

                             var cardDescription = $('<p class="card-description">').text('Correo: ' + item.correoUsuario + ' || ' + ' Precio: ' + item.precio + ' || ' + ' Horario: ' + item.horario + ' || ' + ' Fecha: ' + item.date);

                             // Formulario de edición
                             var editForm = $('<form action="http://localhost/PHP/editar5.php" method="post" class="edit-form">');
                             editForm.append('<h4>Editar campos de esta reserva:</h4>');
                             editForm.append('<input type="hidden" name="id" value="' + item.id + '">');
                             editForm.append('<input type="text" name="horario" autocomplete="off" placeholder="Nuevo horario">');
                             editForm.append('<input type="text" name="date" autocomplete="off" placeholder="Nueva fecha">');

                             // Botones para editar y eliminar
                             var editButton = $('<button type="submit" class="card-button">Editar</button>');
                             var deleteButton = $('<button type="submit" class="delete-button5">Eliminar</button>');
                             var payButton = $('<a href="http://localhost:63342/webPolideportivo/MetodosDePago/metodosPago.html" type="button" class="pay-button">Pagar</a>');

                             // Agrega los elementos al contenido de la tarjeta y al contenedor del formulario de edición
                             cardContent.append(cardTitle, cardDescription);
                             editForm.append(editButton);
                             editForm.append(deleteButton);
                             editForm.append(payButton);
                             editFormContainer.append(editForm);

                             // Agrega el contenido de la tarjeta y el formulario de edición al div de la tarjeta
                             card.append(cardContent, editFormContainer);

                             // Agrega la tarjeta al contenedor de tarjetas en tu página HTML
                             $('#cards-container').append(card);
                         });

                         // Escuchar el evento de cambio en el campo de búsqueda
                         $('#searchInput').on('input', function() {
                             var searchText = $(this).val().toLowerCase();
                             $('.card').each(function() {
                                 var cardName = $(this).find('.card-title').text().toLowerCase();
                                 // Mostrar u ocultar la tarjeta según si el nombre coincide con el término de búsqueda
                                 $(this).toggle(cardName.indexOf(searchText) > -1);
                             });
                         });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
     });
});

// Eliminar datos de la base de datos 'futbol'
$(document).ready(function() {
    // Adjunta un controlador de eventos al botón Eliminar
    $(document).on('click', '.delete-button', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Encuentra el elemento padre (la tarjeta) y elimínalo del DOM
        var card = $(this).closest('.card');
        card.remove();

        // Obtén el ID de la reserva que se va a eliminar
        var id = card.find('input[name="id"]').val();

        // Verifica que 'id' esté definida y tenga un valor válido
        if (typeof id !== 'undefined' && id !== null && id !== '') {
            // Realiza la solicitud AJAX
            $.ajax({
                url: 'http://localhost/PHP/eliminar.php?id=' + id,
                method: 'GET',
                success: function(response) {
                    console.log('Datos eliminados correctamente de la base de datos');
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar los datos de la base de datos:', error);
                }
            });
        } else {
            console.error('ID no válido');
        }
    });
});

// Eliminar datos de la base de datos 'baloncesto'
$(document).ready(function() {
    // Adjunta un controlador de eventos al botón Eliminar
    $(document).on('click', '.delete-button2', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Encuentra el elemento padre (la tarjeta) y elimínalo del DOM
        var card = $(this).closest('.card');
        card.remove();

        // Obtén el ID de la reserva que se va a eliminar
        var id = card.find('input[name="id"]').val();

        // Verifica que 'id' esté definida y tenga un valor válido
        if (typeof id !== 'undefined' && id !== null && id !== '') {
            // Realiza la solicitud AJAX
            $.ajax({
                url: 'http://localhost/PHP/eliminar2.php?id=' + id,
                method: 'GET',
                success: function(response) {
                    console.log('Datos eliminados correctamente de la base de datos');
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar los datos de la base de datos:', error);
                }
            });
        } else {
            console.error('ID no válido');
        }
    });
});

// Eliminar datos de la base de datos 'natacion'
$(document).ready(function() {
    // Adjunta un controlador de eventos al botón Eliminar
    $(document).on('click', '.delete-button3', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Encuentra el elemento padre (la tarjeta) y elimínalo del DOM
        var card = $(this).closest('.card');
        card.remove();

        // Obtén el ID de la reserva que se va a eliminar
        var id = card.find('input[name="id"]').val();

        // Verifica que 'id' esté definida y tenga un valor válido
        if (typeof id !== 'undefined' && id !== null && id !== '') {
            // Realiza la solicitud AJAX
            $.ajax({
                url: 'http://localhost/PHP/eliminar3.php?id=' + id,
                method: 'GET',
                success: function(response) {
                    console.log('Datos eliminados correctamente de la base de datos');
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar los datos de la base de datos:', error);
                }
            });
        } else {
            console.error('ID no válido');
        }
    });
});

// Eliminar datos de la base de datos 'padel'
$(document).ready(function() {
    // Adjunta un controlador de eventos al botón Eliminar
    $(document).on('click', '.delete-button4', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Encuentra el elemento padre (la tarjeta) y elimínalo del DOM
        var card = $(this).closest('.card');
        card.remove();

        // Obtén el ID de la reserva que se va a eliminar
        var id = card.find('input[name="id"]').val();

        // Verifica que 'id' esté definida y tenga un valor válido
        if (typeof id !== 'undefined' && id !== null && id !== '') {
            // Realiza la solicitud AJAX
            $.ajax({
                url: 'http://localhost/PHP/eliminar4.php?id=' + id,
                method: 'GET',
                success: function(response) {
                    console.log('Datos eliminados correctamente de la base de datos');
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar los datos de la base de datos:', error);
                }
            });
        } else {
            console.error('ID no válido');
        }
    });
});

// Eliminar datos de la base de datos 'atletismo'
$(document).ready(function() {
    // Adjunta un controlador de eventos al botón Eliminar
    $(document).on('click', '.delete-button5', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Encuentra el elemento padre (la tarjeta) y elimínalo del DOM
        var card = $(this).closest('.card');
        card.remove();

        // Obtén el ID de la reserva que se va a eliminar
        var id = card.find('input[name="id"]').val();

        // Verifica que 'id' esté definida y tenga un valor válido
        if (typeof id !== 'undefined' && id !== null && id !== '') {
            // Realiza la solicitud AJAX
            $.ajax({
                url: 'http://localhost/PHP/eliminar5.php?id=' + id,
                method: 'GET',
                success: function(response) {
                    console.log('Datos eliminados correctamente de la base de datos');
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar los datos de la base de datos:', error);
                }
            });
        } else {
            console.error('ID no válido');
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

function validarTelefono(event) {

    var input = event.target;

    // Expresión regular para números
    var regex = /^[0-9]+$/;

    // Si el valor del input no coincide con la expresión regular, se limpia el valor y elimina caracteres no numéricos
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
}