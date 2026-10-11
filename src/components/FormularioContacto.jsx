function FormularioContacto({
    validarContacto,
    resultadoContacto
}) {
    return (
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
    );
}

export default FormularioContacto;
