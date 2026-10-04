import { useEffect, useState } from "react";
import ListaProductos from "./components/ListaProductos.jsx";
import Carrito from "./components/Carrito.jsx";

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

            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#inicio">GameStore</a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarGameStore"
                        aria-controls="navbarGameStore"
                        aria-expanded="false"
                        aria-label="Mostrar navegacion"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarGameStore">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#inicio">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#productos"
                                    onClick={() => {
                                        setCategoria("");
                                        setTextoBusqueda("");
                                        setFiltroBusqueda("");
                                    }}
                                >
                                    Productos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link categoria-link"
                                    href="#productos"
                                    onClick={() => {
                                        setCategoria("Estrategia");
                                        setTextoBusqueda("");
                                        setFiltroBusqueda("");
                                    }}
                                >
                                    Estrategia
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link categoria-link"
                                    href="#productos"
                                    onClick={() => {
                                        setCategoria("Simulación");
                                        setTextoBusqueda("");
                                        setFiltroBusqueda("");
                                    }}
                                >
                                    Simulación
                                </a>
                            </li>
                        </ul>

                        <form
                            id="form-busqueda"
                            className="d-flex mt-3 mt-lg-0"
                            role="search"
                            onSubmit={(evento) => {
                                evento.preventDefault();
                                setCategoria("");
                                setFiltroBusqueda(textoBusqueda.trim());
                            }}
                        >
                            <label className="visually-hidden" htmlFor="buscar-producto">
                                Buscar producto
                            </label>
                            <input
                                className="form-control me-2"
                                type="search"
                                id="buscar-producto"
                                placeholder="Buscar producto"
                                aria-label="Buscar producto"
                                value={textoBusqueda}
                                onChange={(evento) => setTextoBusqueda(evento.target.value)}
                            />
                            <button className="btn btn-outline-light" type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

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
    <ListaProductos productos={productosVisibles} carrito={carrito} onAgregar={agregarAlCarrito} />
)}
            </section>

            <section id="carrito" className="container my-5">
                <h2 className="text-center mb-4">Carrito de compras</h2>
                <Carrito carrito={carrito} onEliminar={eliminarDelCarrito} />
            </section>

            <section id="formulario-contacto" className="container my-5">
                <h2 className="text-center mb-4">Contacto</h2>

                <form
                    id="contactoForm"
                    noValidate
                    onSubmit={validarContacto}
                >
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="correo" name="correo" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mensaje" className="form-label">Mensaje</label>
                        <textarea className="form-control" id="mensaje" name="mensaje" rows="4"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Enviar</button>

                    {resultadoContacto && (
                        <div
                            className={"alert alert-" + resultadoContacto.tipo + " mt-3"}
                            role="status"
                        >
                            {resultadoContacto.mensaje}
                        </div>
                    )}
                </form>
            </section>

            <footer id="contacto">
                <p>Contacto: contacto@gamestore.cl</p>
                <p><a href="https://www.instagram.com/">Instagram</a></p>
            </footer>
        </>
    );
}

export default App;