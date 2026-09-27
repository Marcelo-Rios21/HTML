import { formatearPrecio } from "../utils/precios.js";

function ProductoCard({ producto, onAgregar }) {
    const enOferta = producto.precioOferta < producto.precio;

    return (
        <article className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
                <img
                    src={`${import.meta.env.BASE_URL}${producto.imagen}`}
                    alt={producto.nombre}
                    className="card-img-top producto-img"
                />

                <div className="card-body d-flex flex-column">
                    <h3 className="card-title">{producto.nombre}</h3>
                    <p className="text-muted">{producto.categoria}</p>
                    <p className="card-text">{producto.descripcion}</p>

                    <div className="mt-auto">
                        <p className={enOferta ? "text-decoration-line-through mb-1" : "mb-1"}>
                            Precio normal: {formatearPrecio(producto.precio)}
                        </p>

                        <p className="fw-bold mb-0">
                            Precio oferta: {formatearPrecio(producto.precioOferta)}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={() => onAgregar(producto)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductoCard;