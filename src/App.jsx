import { useEffect, useState } from "react";
import ListaProductos from "./components/ListaProductos.jsx";
import Carrito from "./components/Carrito.jsx";
import Navbar from "./components/Navbar.jsx";
import FormularioContacto from "./components/FormularioContacto.jsx";
import GestionCatalogo from "./components/GestionCatalogo.jsx";

function App() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState(false);
    const [carrito, setCarrito] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [filtroBusqueda, setFiltroBusqueda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [resultadoContacto, setResultadoContacto] = useState(null);

    // Carga el catalogo desde el archivo JSON.
    useEffect(() => {
        async function cargarProductos() {
            try {
                const respuesta = await fetch(`${import.meta.env.BASE_URL}data/juegos.json`);

                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }

                const datos = await respuesta.json();
                setProductos(datos);
            } catch (error) {
                console.error("Error al cargar productos:", error);
                setErrorCarga(true);
            } finally {
                setCargando(false);
            }
        }

        cargarProductos();
    }, []);

    // Agrega un producto o incrementa su cantidad.
    function agregarAlCarrito(producto) {
        setCarrito((actual) => {
            const existe = actual.some((item) => item.id === producto.id);

            if (existe) {
                return actual.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...actual, { ...producto, cantidad: 1 }];
        });
    }

    function eliminarDelCarrito(id) {
        setCarrito((actual) =>
            actual.filter((producto) => producto.id !== id)
        );
    }
    // Agrega y elimina videojuegos del catalogo usando el estado.
    function agregarProducto(producto) {
        setProductos((actual) => {
            const siguienteId =
                actual.length === 0
                    ? 1
                    : Math.max(...actual.map((item) => item.id)) + 1;

            return [...actual, { ...producto, id: siguienteId }];
        });
    }

    function eliminarProducto(id) {
        setProductos((actual) =>
            actual.filter((producto) => producto.id !== id)
        );

        setCarrito((actual) =>
            actual.filter((producto) => producto.id !== id)
        );
    }


    // Filtra el catalogo segun busqueda y categoria.
    const productosVisibles = productos.filter((producto) =>
        (!categoria || producto.categoria === categoria) &&
        producto.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
    );

    function validarContacto(evento) {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const datos = new FormData(formulario);
        const nombre = datos.get("nombre").trim();
        const correo = datos.get("correo").trim();
        const mensaje = datos.get("mensaje").trim();

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

        if (!nombre || !correoValido || !mensaje) {
            setResultadoContacto({
                tipo: "danger",
                mensaje: "Completa todos los campos e ingresa un correo v\u00e1lido."
            });
            return;
        }

        setResultadoContacto({
            tipo: "success",
            mensaje: "Gracias, " + nombre + ". Tu mensaje fue validado correctamente."
        });

        formulario.reset();
    }

    return (
        <>
            <header id="inicio">
                <h1>GameStore</h1>
                <p>Tu tienda de videojuegos.</p>
            </header>

            <Navbar
                textoBusqueda={textoBusqueda}
                setTextoBusqueda={setTextoBusqueda}
                setCategoria={setCategoria}
                setFiltroBusqueda={setFiltroBusqueda}
            />

            <main>
            <div
                id="carouselProductos"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="img/lol-portada.jpg" className="d-block w-100 carousel-img" alt="League of Legends" />
                    </div>
                    <div className="carousel-item">
                        <img src="img/tennis-portada.jpg" className="d-block w-100 carousel-img" alt="Tennis Manager 25" />
                    </div>
                    <div className="carousel-item">
                        <img src="img/rimworld-portada.jpg" className="d-block w-100 carousel-img" alt="RimWorld" />
                    </div>
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselProductos"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselProductos"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>

            <section id="productos" className="container my-5">
                <h2 className="text-center mb-4">Productos</h2>
                {cargando ? (
    <p>Cargando productos...</p>
) : errorCarga ? (
    <div className="alert alert-danger">
        No fue posible cargar los productos.
    </div>
) : (
    <ListaProductos
        productos={productosVisibles}
        carrito={carrito}
        onAgregar={agregarAlCarrito}
        onEliminarProducto={eliminarProducto}
    />
)}
            </section>

            <GestionCatalogo onAgregarProducto={agregarProducto} />
            <section id="carrito" className="container my-5">
                <h2 className="text-center mb-4">Carrito de compras</h2>
                <Carrito carrito={carrito} onEliminar={eliminarDelCarrito} />
            </section>

            <FormularioContacto
                validarContacto={validarContacto}
                resultadoContacto={resultadoContacto}
            />

            </main>

            <footer id="contacto">
                <p>Contacto: contacto@gamestore.cl</p>
                <p><a href="https://www.instagram.com/">Instagram</a></p>
            </footer>
        </>
    );
}

export default App;