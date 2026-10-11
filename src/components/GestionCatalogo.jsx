function GestionCatalogo({ onAgregarProducto }) {
    function manejarEnvio(evento) {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const datos = new FormData(formulario);
        const precio = Number(datos.get("precioProducto"));

        onAgregarProducto({
            nombre: datos.get("nombreProducto").trim(),
            categoria: datos.get("categoriaProducto"),
            precio,
            precioOferta: precio,
            imagen: datos.get("imagenProducto").trim(),
            descripcion: datos.get("descripcionProducto").trim()
        });

        formulario.reset();
    }

    return (
        <section id="gestion-catalogo" className="container my-5">
            <h2 className="text-center mb-4">Gestion del catalogo</h2>

            <form className="row g-3" onSubmit={manejarEnvio}>
                <div className="col-md-6">
                    <label htmlFor="nombreProducto" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreProducto"
                        name="nombreProducto"
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="categoriaProducto" className="form-label">
                        Categoria
                    </label>
                    <select
                        className="form-select"
                        id="categoriaProducto"
                        name="categoriaProducto"
                        required
                    >
                        <option value="Estrategia">Estrategia</option>
                        <option value="Simulación">Simulación</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="precioProducto" className="form-label">
                        Precio
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="form-control"
                        id="precioProducto"
                        name="precioProducto"
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="imagenProducto" className="form-label">
                        Ruta de imagen
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="imagenProducto"
                        name="imagenProducto"
                        placeholder="img/lol-portada.jpg"
                        required
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="descripcionProducto" className="form-label">
                        Descripcion
                    </label>
                    <textarea
                        className="form-control"
                        id="descripcionProducto"
                        name="descripcionProducto"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Agregar videojuego
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GestionCatalogo;