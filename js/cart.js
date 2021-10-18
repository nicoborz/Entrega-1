//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productoSingle = [];
let SIMBOLO_PESO = "UYU ";

function showProductoSingle(productoSingle) {

    let htmlContentToAppend = "";

    for (let i = 0; i < productoSingle.length; i++) {
        let singleProducto = productoSingle[i];
        let costoTotal = Math.round(singleProducto.unitCost * singleProducto.count);

        document.getElementById("singleUnitCost").innerHTML = SIMBOLO_PESO + singleProducto.unitCost;
        document.getElementById("singleTotalCost").innerHTML = SIMBOLO_PESO + costoTotal;

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
        <input type="number" class="form-control" id="cantidadIngresada" placeholder="" required="" value="2" onchange="updateCostos(`+ singleProducto.unitCost +`)"
        </a>
        `

        document.getElementById("showCarrito").innerHTML = htmlContentToAppend;
    }
}

function updateCostos(singleUnitCost) {

    let singleCantidad = parseInt(document.getElementById("cantidadIngresada").value);
    let singleCostoTotal = SIMBOLO_PESO + (Math.round(singleUnitCost * singleCantidad));

    document.getElementById("singleCantidadIngresada").innerHTML = singleCantidad;
    document.getElementById("singleTotalCost").innerHTML = singleCostoTotal;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productoSingle = resultObj.data.articles;

            showProductoSingle(productoSingle);
        }
    });

    document.getElementById("singleTotalCost").addEventListener("change", function() {
        updateCostos();
    });
});