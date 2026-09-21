// Almacena los productos obtenidos desde el archivo JSON.
let productos = [];

// Formatea un precio numerico para mostrarlo en pesos chilenos.
function formatearPrecio(precio) {
    if (precio === 0) {
        return "Gratis";
    }

    return `$${precio.toLocaleString("es-CL")}`;
}

// Crea una tarjeta Bootstrap para un producto del catalogo.
function crearTarjetaProducto(producto) {
    const columna = document.createElement("article");
    columna.className = "col-12 col-md-6 col-lg-4";

    const tarjeta = document.createElement("div");
    tarjeta.className = "card h-100";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = "card-img-top producto-img";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body d-flex flex-column";

    const titulo = document.createElement("h3");
    titulo.className = "card-title";
    titulo.textContent = producto.nombre;

    const categoria = document.createElement("p");
    categoria.className = "text-muted";
    categoria.textContent = producto.categoria;

    const descripcion = document.createElement("p");
    descripcion.className = "card-text";
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.className = "fw-bold mt-auto";
    precio.textContent = formatearPrecio(producto.precio);

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(categoria);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);

    return columna;
}

// Muestra en el DOM la lista de productos recibida.
function mostrarProductos(lista) {
    const contenedor = document.querySelector("#lista-productos");
    contenedor.innerHTML = "";

    lista.forEach((producto) => {
        contenedor.appendChild(crearTarjetaProducto(producto));
    });
}

// Muestra un mensaje amigable cuando no es posible cargar el catalogo.
function mostrarErrorCarga() {
    const contenedor = document.querySelector("#lista-productos");

    const mensaje = document.createElement("div");
    mensaje.className = "alert alert-danger";
    mensaje.textContent = "No fue posible cargar los productos. Intenta nuevamente más tarde.";

    contenedor.appendChild(mensaje);
}

// Obtiene el catalogo desde JSON y lo muestra dinamicamente.
async function cargarProductos() {
    try {
        const respuesta = await fetch("data/juegos.json");

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        mostrarErrorCarga();
        console.error("Error al cargar productos:", error);
    }
}

cargarProductos();
