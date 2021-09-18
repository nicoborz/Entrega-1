//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto;   
var productoEncontrado;

//ta todo mal esto checkearlo devuelta

/*function traerProducto(producto){
    var info = "";

    info += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ producto.name +`</h4> 
                        <p> `+ producto.description +`</p> 
                        <p> `+ producto.cost + " " + producto.currency +`</p> 
                        </div>
                        <small class="text-muted">` + producto.soldCount + ` artículos</small> 
                        <button style="float: right;" onclick="verProducto('+ producto.id + ')">Ver Producto</button>
                    </div>

                </div>
            </div>
        </div>
        `;

    document.getElementById("contenido").innerHTML = info;
}*/

function traerProducto(product) {
    var info = "";

    info += `
            <h2>${product.name}</h2>
            <strong>${product.description}</strong><br>
            ${product.cost}<br>
            ${product.currency}<br>
            ${product.soldCount}<br>
    `;

    document.getElementById("contenido").innerHTML = info;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {

            result.data.forEach(product => {
                if (product.name == JSON.parse(localStorage.getItem('producto')).productoname){
                    producto = product;
                    encuentraProducto(producto);
                }
            } );

            
        }
    })
});

function encuentraProducto() {
    let name = JSON.parse(localStorage.getItem("producto")).productoname;
    let URL;

    switch (name) {
        case "Suzuki Celerio":
            URL = CELERIO_INFO;
            break;

        case "Chevrolet Onix Joy":
            URL = ONIXJOY_INFO;
            break;

        case "Fiat Way":
            URL = FIATWAY_INFO;
            break;

        case "Peugeot 208":
            URL = PEUGEOT208_INFO;
            break;
        default: "";


    }
    return URL;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(encuentraProducto()).then(function (result) {
        if (result.status === "ok") {
            productoEncontrado = result.data;
            traerProducto(productoEncontrado);
        }

    })
});