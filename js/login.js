//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var usersArray = [];

function validateUser(array, userIn, passwordIn) {
    for (let i = 0; i < array.lenght; i++) {
        if (array[i].email == userIn && array[i].password == passwordIn) {
            return true;
        }
    }

    return false;
}  

function mostrarUsuario() {

    if (localStorage.getItem("usuario")) {

        let mi_usuario = localStorage.getItem("usuario");

        document.getElementById("usuario").innerHTML = 
            "Usuario: " + mi_usuario + "<br>";
    }
}

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("submitBtn").addEventListener("click", function () {

        let usuario = document.getElementById("usuario");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (usuario.value === '') {
            usuario.classList.add("invalid");
            camposCompletos = false;
        } else {
            usuario.classList.remove("invalid");
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputPassword.classList.remove("invalid");
        }

        if ((usuario.value === '') && (inputPassword.value === '')) {
            usuario.classList.add("invalid");
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        } else {
            usuario.classList.remove("invalid");
            inputPassword.classList.remove("invalid");
        }

        if (camposCompletos) {
            mostrarUsuario()
            window.location = 'inicio.html';
        } else {
            alert("Debes ingresar los datos!")
        }
    });
});