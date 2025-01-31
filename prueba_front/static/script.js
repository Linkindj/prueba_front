document.getElementById("formularioEstudiantes").addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar datos
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const curso = document.getElementById("curso").value;

    if (!nombre || !edad || !curso) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Guardar datos en Firebase
    agregarProducto(nombre, edad, curso);
});

function agregarProducto(nombre, edad, curso) {
    const estudiantesRef = collection(db, "estudiantes");
    const estudiante = { nombre, edad: parseFloat(edad), curso: curso };

    // Aquí añades el producto a Firebase
    // (por ejemplo, con `addDoc` o `setDoc` según corresponda)
}