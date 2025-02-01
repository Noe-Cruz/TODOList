/**************************************
Nombre:      tasks.js
Autor:       Noé Cruz Alvarado
Proyecto:    TODO List
Descripción: JS Script
***************************************/

const load = document.getElementById("cargando");

//Inicializamos la carga inicial
getTask();

//Obtención de todas las tareas
function getTask() {
  load.style.display = 'block';

  fetch('http://localhost:4000/api/tasks')
  .then(response => response.json())
  .then(json => {
    buildTable(json);
  })
  .catch(error => {
    console.error("Error al cargar información", error)
  });

  setTimeout(() => {
    load.style.display = 'none';
  }, 500);
}

//Crear tarea
function createTask( title, description) {
  load.style.display = 'block';
  
  fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
  })
  .then(response => response.json())
  .then(json => {
    clearForm();
    buildTable(json);
  })
  .catch(error => {
    console.error("Error al cargar información", error)
  });

  setTimeout(() => {
    load.style.display = 'none';
  }, 500);
}

//Actualización de tarea
function updateTask(e, id, title, description, status) {
  load.style.display = 'block';

  let newStatus; 

  if(e){
    newStatus = e.target.checked;
  }else {
    newStatus = status == 1 ? true : false;
  }


  fetch('http://localhost:4000/api/tasks/'+ id, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          title: title,
          description: description,
          status: newStatus ? 1 : 0
      })
  })
  .then(response => response.json())
  .then( json => {
    clearForm();
    buildTable(json);
  })
  .catch(error => {
    console.error("Error al actualizar información", error)
  });

  setTimeout(() => {
    load.style.display = 'none';
  }, 500);
}

//Eliminar tarea
function deleteTask(id){
  var response = confirm("Desea eliminar la tarea: " + id);

  if( response ){
    load.style.display = 'block';

    fetch('http://localhost:4000/api/tasks/'+ id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then( json => {
      buildTable(json);
    })
    .catch(error => {
    console.error("Error al eliminar información", error)
    });

    setTimeout(() => {
      load.style.display = 'none';
    }, 500);
  }

}

//Acciones de boton guardar-editar
function saveData(){
  //Obtenemos los valores del formulario
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const index = document.getElementById("index");
  const status = document.getElementById("status");

  changeClassValid();

  if( !title.value || !description.value  ){
    return false;
  } else {
    if( index.value && status.value ){
      updateTask(null, index.value, title.value, description.value, status.value)
    }else{
      createTask(title.value, description.value)
    }
  }
}

function setForm(id, title, description, status) {
  const formTitle = document.getElementById("title");
  const formDescription = document.getElementById("description");
  const formIndex = document.getElementById("index");
  const formStatus = document.getElementById("status");
  const titleMain= document.getElementById("title-form");

  //Asignamos los valores al formulario 
  formTitle.value = title;
  formDescription.value = description;
  formIndex.value = id;
  formStatus.value = status;
  titleMain.innerHTML = "Actualizar";

  changeClassValid();
}

function buildTable(data){
  //Identificamos el cuerpo de la tabla
  const tbody = document.querySelector("#table-task tbody");

  //Limpiamos la tabla
  tbody.innerHTML = "";

  //Mapeamos la data actualizada para su visualización 
  for (let i = 0; i < data.length; i++) {
    const task = data[i];

    const dataTask = '\''+ task.id +'\', \''+ task.title +'\', \''+ task.description +'\',\''+ task.status +'\''

    let row = document.createElement("tr");
    row.innerHTML = 
    '<td>'+ task.id +'</td>'
    + '<td>'+ task.title +'</td>'
    + '<td>'+ task.description +'</td>'
    + '<td>'
    +   '<input type="checkbox" class="check" onchange="updateTask(event, '+ dataTask +')"'
    +   ' id="status-'+ task.id +'" '+ (task.status == 1 ? 'checked' : '') +'/>'
    +   '<label for="status-'+ task.id +'">&nbsp;'+ (task.status == 1 ? 'Completa' : 'Por hacer') +'</label>'
    + '</td>'
    + '<td>'
    +   '<button type="button" class="btn-primary" onclick="setForm('+ dataTask +')">Editar</button>&nbsp;'
    +   '<button type="button" class="btn-warning" onclick="deleteTask('+ task.id +')">Eliminar</button>'
    + '</td>';

    tbody.appendChild(row);
  }
}


//Utilerias para la interfaz
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("index").value = "";
  document.getElementById("status").value = "";
  document.getElementById("title-form").innerHTML = "Registrar";
}

function changeClassValid() {
  const title = document.getElementById("title"); 
  const desc = document.getElementById("description"); 

  if( title.classList.contains("is-valid") && !title.value ){
    title.classList.replace("is-valid", "is-invalid");
  } else if ( title.classList.contains("is-invalid") && title.value ) {
    title.classList.replace("is-invalid", "is-valid");
  }

  if( desc.classList.contains("is-valid") && !desc.value ){
    desc.classList.replace("is-valid", "is-invalid");
  }else if ( desc.classList.contains("is-invalid") && desc.value ) {
    desc.classList.replace("is-invalid", "is-valid");
  }
}