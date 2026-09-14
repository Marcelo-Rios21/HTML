// Agrega un mensaje informativo a la sección de productos mediante manipulación del DOM.
function crearMensajeDinamico() {
    const productos = document.querySelector("#productos");

    const mensaje = document.createElement("div");
    mensaje.className = "alert alert-info mt-4";
    mensaje.textContent = "Próximamente se agregarán nuevos videojuegos a GameStore.";

    productos.appendChild(mensaje);
}

// Agrega botones y contenido adicional a las tarjetas de productos.
function configurarDetallesProductos() {
    const tarjetas = document.querySelectorAll(".card");

    const detalles = [
        "League of Legends es un juego competitivo por equipos desarrollado por Riot Games.",
        "Tennis Manager 25 permite administrar entrenamientos, torneos y la carrera de tenistas.",
        "RimWorld combina gestión de colonias, supervivencia y generación dinámica de historias."
    ];

    tarjetas.forEach((tarjeta, indice) => {
        const cuerpo = tarjeta.querySelector(".card-body");

        const detalle = document.createElement("p");
        detalle.className = "card-text d-none detalle-producto";
        detalle.textContent = detalles[indice];

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn btn-primary mt-2";
        boton.textContent = "Ver detalles";

        boton.addEventListener("click", () => {
            detalle.classList.toggle("d-none");

            if (detalle.classList.contains("d-none")) {
                boton.textContent = "Ver detalles";
            } else {
                boton.textContent = "Ocultar detalles";
            }
        });

        cuerpo.appendChild(detalle);
        cuerpo.appendChild(boton);
    });
}

// Resalta visualmente cada tarjeta cuando el puntero pasa sobre ella.
function configurarEventoMouseover() {
    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener("mouseover", () => {
            tarjeta.classList.add("shadow");
        });

        tarjeta.addEventListener("mouseout", () => {
            tarjeta.classList.remove("shadow");
        });
    });
}

crearMensajeDinamico();
configurarDetallesProductos();
configurarEventoMouseover();
