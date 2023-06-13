// Variables
const registerContainer = document.querySelector('.register');
const loginContainer = document.querySelector('.login');
const tasksContainer = document.querySelector('.tasks');
const signInBtn = document.querySelector('#sign-in');
const signUpBtn = document.querySelector('#sign-up');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const registerNameInput = document.querySelector('#register-name');
const registerEmailInput = document.querySelector('#register-email');
const registerPasswordInput = document.querySelector('#register-password');
const loginEmailInput = document.querySelector('#login-email');
const loginPasswordInput = document.querySelector('#login-password');

// Event listeners
signInBtn.addEventListener('click', showLoginForm);
signUpBtn.addEventListener('click', showRegisterForm);
loginForm.addEventListener('submit', login);
registerForm.addEventListener('submit', register);

// Functions
function showLoginForm() {
    registerContainer.classList.add('hide');
    loginContainer.classList.remove('hide');
}

function showRegisterForm() {
    loginContainer.classList.add('hide');
    registerContainer.classList.remove('hide');
}

function login(event) {
    event.preventDefault();
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    // Aquí puedes realizar la autenticación del usuario utilizando los datos proporcionados

    // Guardar el usuario autenticado en el localStorage
    var usuarioAutenticado = {
      email: email
    };
    localStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioAutenticado));

    // Redireccionar a la página de tareas (TodoList.html)
    window.location.href = 'TodoList.html';
}

function register(event) {
    event.preventDefault();
    const name = registerNameInput.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    // Aquí puedes realizar el registro del nuevo usuario utilizando los datos proporcionados

    // Guardar el usuario autenticado en el localStorage
    var usuarioAutenticado = {
      email: email
    };
    localStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioAutenticado));

    // Crear lista de tareas vacía asociada al nuevo usuario
    var tareasUsuario = [];
    localStorage.setItem(email, JSON.stringify(tareasUsuario));

    // Redireccionar a la página de tareas (TodoList.html)
    window.location.href = 'TodoList.html';
}

// Función para obtener los usuarios del localStorage
function obtenerUsuarios() {
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios;
}

// Función para guardar los usuarios en el localStorage
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para agregar un nuevo usuario
function agregarUsuario(nombre, email, password) {
  var usuarios = obtenerUsuarios();

  var nuevoUsuario = {
    nombre: nombre,
    email: email,
    password: password
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  // Crear lista de tareas vacía asociada al nuevo usuario
  var tareasUsuario = [];
  localStorage.setItem(email, JSON.stringify(tareasUsuario));
}

// Obtener el formulario de registro
// Escuchar el evento de envío del formulario
registerForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Obtener los valores de los campos de registro
  const name = document.querySelector('#register-name').value;
  const email = document.querySelector('#register-email').value;
  const password = document.querySelector('#register-password').value;

  // Agregar el nuevo usuario
  agregarUsuario(name, email, password);

  // Redireccionar a la página de tareas
  window.location.href = 'TodoList.html';
});

// Función para obtener las tareas del usuario actual
function obtenerTareasUsuario() {
  var usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado"));
  if (usuarioAutenticado) {
    var email = usuarioAutenticado.email;
    var tareasUsuario = JSON.parse(localStorage.getItem(email)) || [];
    return tareasUsuario;
  }
  return [];
}

// Función para guardar las tareas del usuario actual en el localStorage
function guardarTareasUsuario(tareasUsuario) {
  var usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado"));
  if (usuarioAutenticado) {
    var email = usuarioAutenticado.email;
    localStorage.setItem(email, JSON.stringify(tareasUsuario));
  }
}

// Función para agregar una nueva tarea al usuario actual
function agregarTarea(titulo, descripcion) {
  var tareasUsuario = obtenerTareasUsuario();

  var nuevaTarea = {
    titulo: titulo,
    descripcion: descripcion
  };

  tareasUsuario.push(nuevaTarea);
  guardarTareasUsuario(tareasUsuario);
}

// Obtener el formulario de creación de tareas
const taskForm = document.querySelector('#task-form');

// Escuchar el evento de envío del formulario
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Obtener los valores de los campos de la tarea
  const titulo = document.querySelector('#task-title').value;
  const descripcion = document.querySelector('#task-description').value;

  // Agregar la nueva tarea al usuario actual
  agregarTarea(titulo, descripcion);

  // Limpiar los campos del formulario
  document.querySelector('#task-title').value = '';
  document.querySelector('#task-description').value = '';
});

// Función para mostrar las tareas del usuario actual en la página
function mostrarTareasUsuario() {
  var tareasUsuario = obtenerTareasUsuario();

  var tareaList = document.querySelector('#task-list');
  tareaList.innerHTML = '';

  tareasUsuario.forEach(function(tarea) {
    var tareaItem = document.createElement('li');
    tareaItem.textContent = tarea.titulo + ' - ' + tarea.descripcion;
    tareaList.appendChild(tareaItem);
  });
}

// Mostrar las tareas del usuario actual al cargar la página
mostrarTareasUsuario();
