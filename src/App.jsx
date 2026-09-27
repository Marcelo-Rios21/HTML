function App() {
    return (
        <>
            {/* Cabecera */}
            <header id="inicio">
                <h1>GameStore</h1>
                <p>Tu tienda de videojuegos.</p>
            </header>

            {/* Navegacion */}
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
                                <a className="nav-link" href="#productos">Productos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link categoria-link" href="#productos">
                                    Estrategia
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link categoria-link" href="#productos">
                                    Simulación
                                </a>
                            </li>
                        </ul>

                        <form
                            id="form-busqueda"
                            className="d-flex mt-3 mt-lg-0"
                            role="search"
                            onSubmit={(evento) => evento.preventDefault()}
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
                            />
                            <button className="btn btn-outline-light" type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Carrusel */}
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

            {/* Productos */}
            <section id="productos" className="container my-5">
                <h2 className="text-center mb-4">Productos</h2>
                <div className="row g-4"></div>
            </section>

            {/* Carrito */}
            <section id="carrito" className="container my-5">
                <h2 className="text-center mb-4">Carrito de compras</h2>
                <div className="card">
                    <div className="card-body" aria-live="polite">
                        <p className="mb-0">El carrito está vacío.</p>
                    </div>
                </div>
            </section>

            {/* Contacto */}
            <section id="formulario-contacto" className="container my-5">
                <h2 className="text-center mb-4">Contacto</h2>

                <form
                    id="contactoForm"
                    noValidate
                    onSubmit={(evento) => evento.preventDefault()}
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
                </form>
            </section>

            {/* Pie de pagina */}
            <footer id="contacto">
                <p>Contacto: contacto@gamestore.cl</p>
                <p><a href="https://www.instagram.com/">Instagram</a></p>
            </footer>
        </>
    );
}

export default App;