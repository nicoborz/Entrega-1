//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function mostrarDatosPerfil() {

    let nombres = JSON.parse(localStorage.getItem("nombres"));
    let edad = JSON.parse(localStorage.getItem("edad"));
    let mail = JSON.parse(localStorage.getItem("mail"));
    let tel = JSON.parse(localStorage.getItem("tel"));

    let nombresCampo = document.getElementById("nombres");
    let edadCampo = document.getElementById("edad");
    let mailCampo = document.getElementById("mail");
    let telCampo = document.getElementById("tel");

    nombresCampo.value = nombres;

    edadCampo.value = edad;

    mailCampo.value = mail;

    telCampo.value = tel;

}

function guardarDatosPerfil() {

    let nombresInput = document.getElementById("nombres");
    let edadInput = document.getElementById("edad");
    let mailInput = document.getElementById("mail");
    let telInput = document.getElementById("tel");


    localStorage.setItem("nombres", JSON.stringify(nombresInput.value));
    localStorage.setItem("edad", JSON.stringify(edadInput.value));
    localStorage.setItem("mail", JSON.stringify(mailInput.value));
    localStorage.setItem("tel", JSON.stringify(telInput.value));

    window.location = 'my-profile.html'

}

document.addEventListener("DOMContentLoaded", function (e) {

    mostrarDatosPerfil();

});