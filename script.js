document.addEventListener("DOMContentLoaded", function () {
  // Selección de elementos
  const containerElement = document.querySelector('.container-letter');
  const coverElement = document.querySelector('.cover');
  const paperElement = document.querySelector('.paper');
  const heartElement = document.querySelector('.heart');
  const heartsContainer = document.querySelector('.hearts-container');
  const buttonsContainer = document.querySelector('.buttons-container'); // Contenedor de botones ahora fuera de la carta
  const btnYes = document.querySelector(".btn-yes");
  const btnNo = document.querySelector(".btn-no");

  let isOpen = false;
  let heartAnimationInterval;

  // FUNCIONALIDAD DE LOS BOTONES
  const handleButtonClick = (url) => {
    try {
      console.log(`Redirigiendo a: ${url}`);
      window.location.href = url; // Redirige inmediatamente al URL deseado
    } catch (error) {
      console.error("Error al redirigir: ", error);
    }
  };

  // Asignar eventos de clic a los botones
  if (btnYes) {
    btnYes.addEventListener("click", (event) => {
      try {
        event.stopPropagation(); // Evita que el clic se propague al contenedor
        handleButtonClick("carta.html");
      } catch (error) {
        console.error("Error en el clic del botón 'Sí': ", error);
      }
    });
  } else {
    console.warn("Botón 'Sí' no encontrado");
  }

  if (btnNo) {
    btnNo.addEventListener("click", (event) => {
      try {
        event.stopPropagation(); // Evita que el clic se propague al contenedor
        handleButtonClick("gif.html");
      } catch (error) {
        console.error("Error en el clic del botón 'No': ", error);
      }
    });
  } else {
    console.warn("Botón 'No' no encontrado");
  }

  // ABRIR LA CARTA SOLO UNA VEZ AL HACER CLIC EN ELLA
  containerElement.addEventListener('click', function (event) {
    try {
      if (!isOpen && !event.target.closest(".btn-yes, .btn-no")) {
        abrirCarta();
      }
    } catch (error) {
      console.error("Error al abrir la carta: ", error);
    }
  });

  // Función para abrir la carta
  function abrirCarta() {
    try {
      isOpen = true;
      console.log("Abriendo la carta...");

      coverElement.classList.add('open-cover');

      // Mostrar la carta después de la animación de la cubierta
      setTimeout(() => {
        coverElement.style.zIndex = -1;
        paperElement.classList.add('open-paper');
        heartElement.style.display = 'block';
        buttonsContainer.style.display = 'flex'; // Muestra los botones ahora fuera del contenedor de la carta
        iniciarAnimacionCorazones();
      }, 500); // Retardo para la animación de apertura
    } catch (error) {
      console.error("Error al abrir la carta: ", error);
    }
  }

  // INICIO DE ANIMACIÓN DE CORAZONES
  function iniciarAnimacionCorazones() {
    try {
      clearInterval(heartAnimationInterval); // Asegura que no haya animaciones previas
      heartAnimationInterval = setInterval(() => {
        crearCorazon();
      }, 500); // Crear corazones cada medio segundo
    } catch (error) {
      console.error("Error al iniciar la animación de corazones: ", error);
    }
  }

  // FUNCIONALIDAD PARA CREAR CORAZONES
  function crearCorazon() {
    try {
      const heart = document.createElement('div');
      heart.classList.add('heart-animation');
      heart.textContent = '❤️';

      const paperRect = paperElement.getBoundingClientRect();
      heart.style.left = `${Math.random() * (paperRect.width - 30)}px`;
      heart.style.top = `${Math.random() * (paperRect.height - 30)}px`;

      heartsContainer.appendChild(heart);

      // Eliminar el corazón después de 2 segundos
      setTimeout(() => heart.remove(), 2000);
    } catch (error) {
      console.error("Error al crear el corazón: ", error);
    }
  }
});
