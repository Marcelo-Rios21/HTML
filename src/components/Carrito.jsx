import { formatearPrecio, obtenerPrecio } from "../utils/precios.js";

function Carrito({ carrito, onEliminar }) {
    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad, 0
    );

    const precioTotal = carrito.reduce(
        (total, producto) =>
            total + obtenerPrecio(producto) * producto.cantidad, 0
    );

    return (
        <div className="card">
            <div className="card-body" aria-live="polite">
                <p className="fw-bold">
                    Productos en el carrito: {cantidadTotal}
                </p>

                {carrito.length === 0 ? (
                    <p className="mb-0">El carrito está vacío.</p>
                ) : (
                    <>
                        <ul className="list-group list-group-flush mb-3">
                            {carrito.map((producto) => (
                                <li
                                    key={producto.id}
                                    className="list-group-item d-flex justify-content-between align-items-center gap-3"
                                >
                                    <span>
                                        {producto.nombre} x{producto.cantidad}
                                        {" - "}
                                        {formatearPrecio(
                                            obtenerPrecio(producto) * producto.cantidad
                                        )}
                                    </span>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => onEliminar(producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <p className="fw-bold text-end mb-0">
                            Total: {formatearPrecio(precioTotal)}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Carrito;
