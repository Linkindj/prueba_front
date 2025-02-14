import { saveprograma, onObtenerprogramas, eliminarprograma, editarprograma, obtenerprograma, savedocente } from "./firebase.js"

const programaContainer = document.getElementById('programaContainer')
const filtrocurso = document.getElementById('filtrocurso');
const filtrodocente = document.getElementById('filtrodocente');
const filtrocodigo = document.getElementById('filtrocodigo');
const formularioprogramas = document.getElementById('formularioprogramas')
let editStatus = false
let id=""


window.addEventListener('DOMContentLoaded', async ()=>{
  onObtenerprogramas((querySnapshot) => {
    let programas = [];

    let html="";
    if (!programaContainer) {
        console.error("El contenedor de programas no existe");
        return;
    }
    querySnapshot.forEach((doc) => {
        programas.push({ id: doc.id, ...doc.data() });

    });

    // Función para mostrar los programas filtrados
    const renderprogramas = (programasFiltrados) => {
      let html = "";
      programasFiltrados.forEach(programa => {
        html += `
          <tr>
            <td>${programa.curso}</td>
            <td>${programa.codigo}</td>
            <td>${programa.docente}</td>
            <td>${programa.descripcion}</td>
            <td>${programa.duracion}</td>
            <td>${programa.fecha}</td>
            <td>${programa.precio}</td>
            <td><button class='btn-eliminar' data-id="${programa.id}">Eliminar</button></td>
            <td><button class='btn-editar' data-id="${programa.id}">Editar</button></td>
          </tr>
        `;
      });
      programaContainer.innerHTML = html;

    const btneliminar= programaContainer.querySelectorAll('.btn-eliminar')

    btneliminar.forEach(btn => {
        btn.addEventListener('click', ({target: {dataset}}) => {
             eliminarprograma(dataset.id)
        })
    })

    const btneditar= programaContainer.querySelectorAll('.btn-editar')

    btneditar.forEach(btn =>{ 
        btn.addEventListener('click', async(e)=>{
            const doc=await obtenerprograma(e.target.dataset.id)
            const programa = doc.data()

            formularioprogramas['curso'].value=programa.curso
            formularioprogramas['codigo'].value=programa.codigo
            formularioprogramas['docente'].value=programa.docente
            formularioprogramas['descripcion'].value=programa.descripcion
            formularioprogramas['duracion'].value=programa.duracion
            formularioprogramas['fecha'].value=programa.fecha
            formularioprogramas['precio'].value=programa.precio

            editStatus = true
            id=doc.id
        
            formularioprogramas['btn-guardar'].innerText='Actualizar'

        })
    })
};

// Mostrar todos los programas al cargar la página
        renderprogramas(programas);

            // Función para filtrar programas en base a los valores de los inputs
        const aplicarFiltros = () => {
        const cursoFiltro = filtrocurso.value.toLowerCase();
        const docenteFiltro = filtrodocente.value.toLowerCase();
        const codigoFiltro = filtrocodigo.value;

        const programasFiltrados = programas.filter(est => 
            (cursoFiltro === "" || est.curso.toLowerCase().includes(cursoFiltro)) &&
            (docenteFiltro === "" || est.docente.toLowerCase().includes(docenteFiltro)) &&
            (codigoFiltro === "" || est.codigo.toString() === codigoFiltro)
        );

        renderprogramas(programasFiltrados);
        };

        // Agregar eventos de entrada a los filtros
        filtrocurso.addEventListener('input', aplicarFiltros);
        filtrodocente.addEventListener('input', aplicarFiltros);
        filtrocodigo.addEventListener('input', aplicarFiltros);
        
    }); 
    formularioprogramas.addEventListener('submit', (e)=>{
    e.preventDefault()
  
    const curso = formularioprogramas['curso']
    const codigo = formularioprogramas['codigo']
    const docente = formularioprogramas['docente']
    const descripcion = formularioprogramas['descripcion']
    const precio = formularioprogramas['precio']
    const duracion = formularioprogramas['duracion']
    const fecha = formularioprogramas['fecha']  
    if(!editStatus){
        saveprograma(curso.value,codigo.value,docente.value, descripcion.value, duracion.value, fecha.value, precio.value)
    }else{    
        editarprograma(id, {curso: curso.value, codigo: codigo.value, docente: docente.value,descripcion: descripcion.value, duracion: duracion.value, fecha: fecha.value, precio: precio.value })
        editStatus=false
        formularioprogramas['btn-guardar'].innerText='Guadar'
    }
       

    formularioprogramas.reset()  
    })
});




    


