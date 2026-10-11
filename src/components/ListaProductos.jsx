import ProductoCard from "./ProductoCard.jsx";

function ListaProductos({ productos, carrito, onAgregar, onEliminarProducto }) {
    if (productos.length === 0) {
        return (
            <div className="alert alert-info">
                No se encontraron productos.
            </div>
        );
    }

    return (
        <div className="row g-4">
            {productos.map((producto) => (
                <ProductoCard
                    key={producto.id}
                    producto={producto}
                    cantidadEnCarrito={carrito.find((item) => item.id === producto.id)?.cantidad ?? 0}
                    onAgregar={onAgregar}
                    onEliminarProducto={onEliminarProducto}
                />
            ))}
        </div>
    );
}

export default ListaProductos;