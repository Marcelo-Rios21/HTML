export function formatearPrecio(precio) {
    return precio === 0 ? "Gratis" : `$${precio.toLocaleString("es-CL")}`;
}

export function obtenerPrecio(producto) {
    return typeof producto.precioOferta === "number" && producto.precioOferta < producto.precio
        ? producto.precioOferta
        : producto.precio;
}
