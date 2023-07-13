// Evento para crear un nuevo libro
document.getElementById('formulario').addEventListener('submit', crear);

// Función Crear
function crear(e) {
    nombre = document.getElementById('nombre').value;
    correo = document.getElementById('correo').value;
    grado = document.getElementById('grado').value;
    calificacion = document.getElementById('calificacion').value;

    let alumno = {
        nombre,
        correo,
        grado,
        calificacion
    }

    if (localStorage.getItem('alumnos') === null) {
        let alumnos = [];
        alumnos.push(alumno);
        
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
    } else {
        let alumnos = JSON.parse(localStorage.getItem('alumnos'));
        alumnos.push(alumno);

        localStorage.setItem('alumnos', JSON.stringify(alumnos));
    }

    leer();
    document.getElementById('formulario').reset();
    console.log('Registro guardado');
    e.preventDefault();
}

// Función Leer

function leer() {
    let alumnos = JSON.parse(localStorage.getItem('alumnos'));
    document.getElementById('tbody').innerHTML = '';

    if (alumnos != null) {
        for (let i=0; i < alumnos.length; i++) {
            let nombre = alumnos[i].nombre;
            let correo = alumnos[i].correo;
            let grado = alumnos[i].grado;
            let calificacion = alumnos[i].calificacion;

            document.getElementById('tbody').innerHTML +=
            `
            <tr>
                <td>${nombre}</td>
                <td>${correo}</td>
                <td>${grado}</td>
                <td>${calificacion}</td>
                <td><button onclick="eliminar('${nombre}')" class="btn btn-danger">Eliminar</button></td>
                <td><button onclick="editar('${nombre}')" class="btn btn-success">Editar</button></td>
            <tr>
            `
        }
    }
}

leer();