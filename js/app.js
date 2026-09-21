// Almacena los productos obtenidos desde el archivo JSON.
let productos = [];

// Almacena los productos agregados al carrito.
let carrito = [];

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

    const botonCarrito = document.createElement("button");
    botonCarrito.type = "button";
    botonCarrito.className = "btn btn-primary";
    botonCarrito.textContent = "Agregar al carrito";

    botonCarrito.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
    });

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(categoria);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(botonCarrito);

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);

    return columna;
}

// Muestra en el DOM la lista de productos recibida.
function mostrarProductos(lista) {
    const contenedor = document.querySelector("#lista-productos");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        const mensaje = document.createElement("div");
        mensaje.className = "alert alert-info";
        mensaje.textContent = "No se encontraron productos.";
        contenedor.appendChild(mensaje);
        return;
    }

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

// Agrega un producto al carrito o aumenta su cantidad si ya existe.
function agregarAlCarrito(idProducto) {
    const producto = productos.find((item) => item.id === idProducto);

    if (!producto) {
        return;
    }

    const productoEnCarrito = carrito.find(
        (item) => item.id === idProducto
    );

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    mostrarCarrito();
}

// Actualiza dinámicamente el resumen y total del carrito.
function mostrarCarrito() {
    const contenedor = document.querySelector("#resumen-carrito .card-body");
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "mb-0";
        mensaje.textContent = "El carrito está vacío.";
        contenedor.appendChild(mensaje);
        return;
    }

    const lista = document.createElement("ul");
    lista.className = "list-group list-group-flush mb-3";

    let total = 0;

    carrito.forEach((producto) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between";

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        item.textContent =
            `${producto.nombre} x${producto.cantidad} - ${formatearPrecio(subtotal)}`;

        lista.appendChild(item);
    });

    const totalCarrito = document.createElement("p");
    totalCarrito.className = "fw-bold text-end mb-0";
    totalCarrito.textContent = `Total: ${formatearPrecio(total)}`;

    contenedor.appendChild(lista);
    contenedor.appendChild(totalCarrito);
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

// Procesa el formulario de búsqueda y filtra los productos por nombre.
function configurarBusqueda() {
    const formulario = document.querySelector("#form-busqueda");
    const campoBusqueda = document.querySelector("#buscar-producto");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const texto = campoBusqueda.value.trim().toLowerCase();

        if (!texto) {
            mostrarProductos(productos);
            return;
        }

        const resultados = productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(texto)
        );

        mostrarProductos(resultados);
    });
}

// Permite filtrar el catálogo mediante las categorías de la barra de navegación.
function configurarCategorias() {
    const categorias = document.querySelectorAll(".categoria-link");

    categorias.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            const categoria = enlace.dataset.categoria;

            const resultados = productos.filter(
                (producto) => producto.categoria === categoria
            );

            mostrarProductos(resultados);
        });
    });
}
cargarProductos();
configurarBusqueda();
configurarCategorias();
mostrarCarrito();
