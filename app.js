// Evento para crear un nuevo libro
document.getElementById('formulario').addEventListener('submit', crear);

// Función Crear
function crear(e) {
    nombre = document.getElementById('nombre').value;
    correo = document.getElementById('correo').value;
    grado = document.getElementById('grado').value;
    calificacion = document.getElementById('calificacion').value;

    const verify = verificar(nombre, correo, grado, calificacion)

    console.log(verify)

    if (verify === false) {
        console.log('Registro incompleto, no guardado');
        e.preventDefault();
        return
    }

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
                <td><button onclick="editar('${nombre}')" class="btn btn-primary">Editar</button></td>
            <tr>
            `
        }
    }
}

// Función Editar

function editar(nombre) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos'));

    for (let i=0; i < alumnos.length; i++) {
        if (alumnos[i].nombre === nombre) {
            document.getElementById('body').innerHTML =
            `
            <div class="row">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header">
                            <h2>Editar libro</h2>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <input type="text" id="newnombre" class="form-control my-3" placeholder="${alumnos[i].nombre}">
                                </div>
                                <div>
                                    <input type="email" id="newcorreo" class="form-control my-3" placeholder="${alumnos[i].correo}">
                                </div>
                                <div class="form-group">
                                    <input type="text" id="newgrado" class="form-control my-3" placeholder="${alumnos[i].grado}">
                                </div>
                                <div class="form-group">
                                    <input type="number" id="newcalificacion" class="form-control my-3" placeholder="${alumnos[i].calificacion}">
                                </div>
                            </form>
                            <button type="submit" class="btn btn-primary" onclick="actualizar('${i}')">Actualizar</button>
                            <button type="submit" class="btn btn-secondary" onclick="vistaPrincipal()">Cancelar</button>

                        </div>
                    </div>
            `
        }
    }
}

// Función Actualizar
function actualizar(i) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos'));
    
    nombre = document.getElementById('newnombre').value;
    correo = document.getElementById('newcorreo').value;
    grado = document.getElementById('newgrado').value;
    calificacion = document.getElementById('newcalificacion').value;

    if (nombre != '') {
        alumnos[i].nombre = document.getElementById('newnombre').value;
    }
    
    if (correo != '') {
        alumnos[i].correo = document.getElementById('newcorreo').value;
    }
    
    if (grado != '') {
        alumnos[i].grado = document.getElementById('newgrado').value;
    }

    if (calificacion != '') {
        alumnos[i].calificacion = document.getElementById('newcalificacion').value;
    }

    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    console.log('Registro actualizado');
    vistaPrincipal();
}

// Función Eliminar
function eliminar(nombre) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos'));

    for(let i=0; i < alumnos.length; i++) {
        if (alumnos[i].nombre === nombre) {
            alumnos.splice(i, 1);
            console.log('Registro eliminado');
        }
    }

    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    leer();
}

// Función Vista Principal
function vistaPrincipal() {
    document.getElementById('body').innerHTML =
    `
    <div class="row">
        <div class="col-md-5">
            <div class="card">
                <div class="card-header">
                    <h3>Registrar alumno</h3>
                </div>
                <div class="card-body">
                    <form id="formulario">
                        <div class="form-group">
                            <input type="text" id="nombre" class="form-control my-3" placeholder="Nombre">
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" class="form-control my-3" placeholder="Correo electrónico">
                        </div>
                        <div class="form-group">
                            <input type="text" id="grado" class="form-control my-3" placeholder="Grado"></textarea>
                        </div>
                        <div class="form-group">
                            <input type="number" id="calificacion" class="form-control my-3" placeholder="Calificación">
                        </div>
                        <button type="submit" class="btn btn-primary">Agregar</button>
                        <button type="reset" class="btn btn-secondary">Limpiar</button>
                    </form>

                </div>
            </div>
        </div>
        <div class="col-md-6">
            <table class="table caption-top bg-light">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Grado</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `

    console.log('Registro no actualizado')
    leer();
}

function verificar(nombre, correo, grado, calificacion) {
    if (nombre === '') {
        alert('Campo obligatorio NOMBRE vacío.');
        return false;
    }

    if (correo === '') {
        alert('Campo obligatorio CORREO vacío.');
        return false;
    }
    
    if (grado === '') {
        alert('Campo obligatorio GRADO vacío.');
        return false;
    }

    if (calificacion === '') {
        alert('Campo obligatorio CALIFICACION vacío.');
        return false;
    }

    return true;
}

leer();