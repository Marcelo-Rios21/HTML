function Navbar({
    textoBusqueda,
    setTextoBusqueda,
    setCategoria,
    setFiltroBusqueda
}) {
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
        
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
                        <li className="nav-item">
                            <a className="nav-link" href="#formulario-contacto">
                                Contacto
                            </a>
                        </li>                    </ul>
        
                    <form
                        id="form-busqueda"
                        className="d-flex mt-3 mt-lg-0 ms-lg-auto"
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
    );
}

export default Navbar;
