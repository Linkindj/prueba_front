
async function obtenerProductos(filtroNombre, filtroCategoria, rangoPrecio) {
    let productosRef = collection(db, "estudiantes");
    let q = query(productosRef);

    // Filtro por nombre
    if (filtroNombre) {
        q = query(q, where("nombre", "==", filtroNombre));
    }

  
    if (filtroCurso) {
        q = query(q, where("Curso", "==", filtroCurso));
    }

 
    if (rangoEdad) {
        q = query(q, where("edad", ">=", rangoEdad.min), where("edad", "<=", rangoEdad.max));
    }

    const querySnapshot = await getDocs(q);
    const estudiantes = [];
    querySnapshot.forEach((doc) => {
        estudiantes.push(doc.data());
    });

    return estudiantes;
}