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


document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("submitBtn").addEventListener("click", function () {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputEmail.classList.remove("invalid");
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputPassword.classList.remove("invalid");
        }

        if (camposCompletos) {

            getJSONData(USUARIOS_URL).then(function (resultado) {
                if (resultado.status === "ok") {
                    usersArray = resultado.data;

                    if (validateUser(usersArray, inputEmail.value, inputPassword.value)) {
                        window.location = 'index.html';
                    } else {
                        alert("Usuario o contraseña incorrectas!")
                    }
                }
            });

        } else {
            alert("Debes ingresar los datos!")
        }
    });
});