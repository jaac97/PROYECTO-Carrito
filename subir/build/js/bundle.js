// Variables
const carrito = document.querySelector('#carrito'),
    listaCarrito = document.querySelector('#lista-carrito tbody'),
    vaciarCarrito = document.querySelector('#vaciar-carrito'),
    listaCursos = document.querySelector('#lista-cursos');
    let cursos = [];


// Funciones
const cargarEventos = () => {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', borrarCarro);

    // muestra cursos
    document.addEventListener('DOMContentLoaded', ()=>{
        cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        mostrarCursos(cursos);
        console.log(cursos)
    })
};

const agregarCurso = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {

        const datosCurso = e.target.parentElement.parentElement;

        leerDatos(datosCurso);

    }
}

const leerDatos = (datosCurso) => {
    const curso = {
        nombre: datosCurso.querySelector('.info-card h4').textContent,
        id: datosCurso.querySelector('a').getAttribute('data-id'),
        precio: datosCurso.querySelector('.precio span').textContent,
        imagen: datosCurso.querySelector('img').src,
        cantidad: 1
    };






    guardarCursos(curso);
}

// forma 2

const mostrarCursos = (cursos) => {

    limpiarHtml();

    cursos.forEach(datosCurso => {
        const fila = document.createElement('tr');
        const {
            imagen,
            nombre,
            precio,
            cantidad,
            id
        } = datosCurso;
        fila.innerHTML = `
            <td> <img src="${imagen}" alt="${nombre}"></td>
            <td> ${nombre} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}">X</a>
            
        `;
        listaCarrito.appendChild(fila);
    });
    sincronizarStorage()
}

const sincronizarStorage = () => {
    // console.log(cursos);
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

const guardarCursos = (datosCurso) => {

    if (cursos.length == 0) {
        cursos.push(datosCurso);
    } else {
        // Si ya existe el curso se incrementa la cantidad caso contrario se agrega un nuevo curso
        let existe = cursos.some(curso => curso.id == datosCurso.id);

        if (existe) {
            cursos.find(curso => {
                if (curso.id == datosCurso.id) {
                    curso.cantidad++;
                }
            });
        } else {
            cursos.push(datosCurso);
        }

    }
    mostrarCursos(cursos);
}

const limpiarHtml = () => {
    // forma lenta
    listaCarrito.innerHTML = "";

    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

const eliminarCurso = (e) =>{
    if(e.target.classList.contains('borrar-curso')){
        const curso = e.target.parentElement.parentElement;
        const cursoId = curso.querySelector('a').getAttribute('data-id');
        // e.target.parentElement.parentElement.remove();

        let cursos2 = cursos.filter(curso => curso.id !== cursoId);
        cursos = cursos2;
            
        mostrarCursos(cursos);

    }
}

const borrarCarro = ()=>{
    cursos = [];
    limpiarHtml();
}

cargarEventos();