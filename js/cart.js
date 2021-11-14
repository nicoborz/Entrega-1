//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let tarjetaConfirmada = "Tarjeta de credito agregada";
let transferenciaConfirmada = "Transferencia bancaria agregada";
let metodoPagoNoConfirmado = "No hay metodo de pago asignado";
let productoSingle = [];
let SIMBOLO_PESO = "UYU ";
let SIMBOLO_PORCENTAJE = "%";
let comissionPercentage = 0.15;
let subTotal;

function showProductoSingle(productoSingle) {

    let htmlContentToAppend = "";

    for (let i = 0; i < productoSingle.length; i++) {
        let singleProducto = productoSingle[i];

        subTotal = Math.round(singleProducto.unitCost * singleProducto.count);

        document.getElementById("singleSubtotalCost").innerHTML = singleProducto.currency + " " + subTotal;

        htmlContentToAppend += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + singleProducto.src + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ singleProducto.name +`</h4>
                        <div class="text-muted">` + singleProducto.unitCost + " " + singleProducto.currency +`</div>
                        
                    </div>
                </div>
            </div>
        <label for="cantidadIngresada">Cantidad</label>
        <input type="number" class="form-control" id="cantidadIngresada" placeholder="" required="" value="2" onchange="costoSinEnvio(`+ singleProducto.unitCost + `)" value="` + singleProducto.count + `" min="0">
        </a>
        <p></p>
        `

        document.getElementById("showCarrito").innerHTML = htmlContentToAppend;
    }
}

function costoSinEnvio(singleCost) {

    let cant = parseInt(document.getElementById("cantidadIngresada").value);

    subTotal2 = SIMBOLO_PESO + Math.round(singleCost * cant);
    subTotal = singleCost * cant

    document.getElementById("singleSubtotalCost").innerHTML = subTotal2;
    updateCostos();

}

/*function updateCostos(singleUnitCost) {

    let singleCantidadIngresadaHTML = document.getElementById("singleCantidadIngresada");
    let singleTotalCostHTML = document.getElementById("singleTotalCost");
    let costoEnvioHTML = document.getElementById("costoEnvio");

    let singleCantidad = parseInt(document.getElementById("cantidadIngresada").value);
    let singleCostoTotal = (Math.round(singleUnitCost * singleCantidad));
    let porcentajeCostoTotal = (Math.round((singleUnitCost * singleCantidad) * comissionPercentage));
    let costoTotal = (singleCostoTotal + porcentajeCostoTotal);

    singleCantidadIngresadaHTML.innerHTML = singleCantidad;
    singleTotalCostHTML.innerHTML = SIMBOLO_PESO + costoTotal;
    costoEnvioHTML.innerHTML = SIMBOLO_PESO + porcentajeCostoTotal;

}*/

function updateCostos() {

    let costoEnvioHTML = document.getElementById("costoEnvio");
    let costoTotalHTML = document.getElementById("singleTotalCost");


    let costoEnvio = Math.round(comissionPercentage * subTotal);

    let costoTotal = (Math.round(subTotal * comissionPercentage) + subTotal);


    costoEnvioHTML.innerHTML = SIMBOLO_PESO + costoEnvio;
    costoTotalHTML.innerHTML = SIMBOLO_PESO + costoTotal;

}

function submitEvent(event) {
    if (!checkValidation()) {
        event.preventDefault();
        event.stopPropagation();
    }
}

function checkValidation() {

    let inputDireccion = document.getElementById("direccion");
    let inputCiudad = document.getElementById("ciudad");
    let inputCodigoPostal = document.getElementById("codigoPostal");
    
    let metodoPagoConfirmado = document.getElementById("validateMetodo").innerHTML;

    let camposCompletos = true;
    let camposCompletosdelPago = true;

    if (metodoPagoConfirmado === metodoPagoNoConfirmado) {
        camposCompletosdelPago = false;
        alert("Datos de pago incompletos");
    }

    if (inputDireccion.value === '') {
        camposCompletos = false;
    }

    if (inputCiudad.value === '') {
        camposCompletos = false;
    }

    if (inputCodigoPostal.value === '') {
        camposCompletos = false;
    }

    if (camposCompletos === false) {
        alert("Falta completar los datos de envio");
    }

    if (camposCompletos && camposCompletosdelPago) {
        alert("Compra realizada con exito");
    }

}

function confirmarFormaPago() {
    
    let camposCompletos = true;

    let validacionMetodo = document.getElementById("validateMetodo");

    let tarjetaCredito = document.getElementById("creditoCard");
    let transferenciaBanco = document.getElementById("transferenciaBancaria");

    let nombreTarjeta = document.getElementById("nombreCard");
    let numeroTarjeta = document.getElementById("numeroCard");
    let fechaTarjeta = document.getElementById("fechaCard");
    let CVVTarjeta = document.getElementById("CVVCard");

    let titularTransfe = document.getElementById("titularTransferencia");
    let bancoTransfe = document.getElementById("bancoTransferencia");
    let cuentaTransfe = document.getElementById("cuentaTransferencia");

    if (tarjetaCredito.checked) {
        if (nombreTarjeta.value === '') {
            camposCompletos = false;
        }

        if (numeroTarjeta.value === '') {
            camposCompletos = false;
        }

        if (fechaTarjeta.value === '') {
            camposCompletos = false;
        }

        if (CVVTarjeta.value === '') {
            camposCompletos = false;
        }

        if (camposCompletos) {
            validacionMetodo.innerHTML = tarjetaConfirmada;
        } 
        
        else {
            validacionMetodo.innerHTML = metodoPagoNoConfirmado;
        }

    }

    if (transferenciaBanco.checked) {
        if (titularTransfe.value === '') {
            camposCompletos = false;
        }

        if (bancoTransfe.value === '') {
            camposCompletos = false;
        }

        if (cuentaTransfe.value === '') {
            camposCompletos = false;
        }

        if (camposCompletos) {
            validacionMetodo.innerHTML = transferenciaConfirmada;
        } 
        
        else {
            validacionMetodo.innerHTML = metodoPagoNoConfirmado;
        }
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("singleTotalCost").addEventListener("change", function() {
        updateCostos();
    });

    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.15;
        updateCostos();
    });
    
    document.getElementById("expressradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateCostos();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.05;
        updateCostos();
    });

    document.getElementById("pagoConfirmado").addEventListener("click", function () {
        confirmarFormaPago();
    });

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productoSingle = resultObj.data.articles;
            
           
            showProductoSingle(productoSingle);
            updateCostos();
        }
    });

});