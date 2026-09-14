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

// Valida el formulario de contacto y muestra el resultado sin recargar la página.
function configurarFormulario() {
    const formulario = document.querySelector("#contactoForm");

    if (!formulario) {
        return;
    }

    const resultado = document.createElement("div");
    resultado.className = "mt-3";
    formulario.appendChild(resultado);

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = formulario.querySelector("#nombre").value.trim();
        const correo = formulario.querySelector("#correo").value.trim();
        const mensaje = formulario.querySelector("#mensaje").value.trim();

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

        if (!nombre || !correoValido || !mensaje) {
            resultado.className = "alert alert-danger mt-3";
            resultado.textContent = "Completa todos los campos e ingresa un correo válido.";
            return;
        }

        resultado.className = "alert alert-success mt-3";
        resultado.textContent = `Gracias, ${nombre}. Tu mensaje fue validado correctamente.`;

        formulario.reset();
    });
}
// Crea una tarjeta Bootstrap a partir de un juego obtenido desde el archivo JSON.
function crearTarjetaRecomendada(juego) {
    const columna = document.createElement("article");
    columna.className = "col-12 col-md-6 col-lg-4";

    const tarjeta = document.createElement("div");
    tarjeta.className = "card h-100";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "card-title";
    titulo.textContent = juego.nombre;

    const genero = document.createElement("p");
    genero.className = "fw-bold";
    genero.textContent = `Género: ${juego.genero}`;

    const descripcion = document.createElement("p");
    descripcion.className = "card-text";
    descripcion.textContent = juego.descripcion;

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(genero);
    cuerpo.appendChild(descripcion);

    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);

    return columna;
}

// Obtiene los juegos desde un archivo JSON y los incorpora dinámicamente al DOM.
async function cargarJuegosRecomendados() {
    const contenedor = document.querySelector("#lista-recomendados");

    try {
        const respuesta = await fetch("data/juegos.json");

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const juegos = await respuesta.json();

        juegos.forEach((juego) => {
            contenedor.appendChild(crearTarjetaRecomendada(juego));
        });
    } catch (error) {
        const mensajeError = document.createElement("div");
        mensajeError.className = "alert alert-danger";
        mensajeError.textContent = "No fue posible cargar los juegos recomendados.";

        contenedor.appendChild(mensajeError);

        console.error("Error al cargar juegos:", error);
    }
}
crearMensajeDinamico();
configurarDetallesProductos();
configurarEventoMouseover();
configurarFormulario();
cargarJuegosRecomendados();
