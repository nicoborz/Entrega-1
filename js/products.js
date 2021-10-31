//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productosArray = [];
var contenido;
var minPag;
var maxPag;
var minCount = undefined;
var maxCount = undefined;

function showProductos() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productosArray.length; i++) {
        let product1 = productosArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product1.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product1.productCount) <= maxCount))) {

            htmlContentToAppend += `

        <div class="row">
            <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
            <img src="` + product1.imgSrc + `" alt="` + product1.description + `" class="img-thumbnail">
                <div class="card-body">
                <p class="card-text">` + product1.description + `</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="text">
                    <text type="text" class="text">` + product1.cost + `</text>
                    <text type="text" class="text">` + product1.currency + `</text>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
            `
        }

        document.getElementById("listado").innerHTML = htmlContentToAppend;
    }
}

function showProductosFiltro(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let product1 = array[i];

        if (((minPag == undefined) || (minPag != undefined && parseInt(product1.cost) >= minPag)) &&
            ((maxPag == undefined) || (maxPag != undefined && parseInt(product1.cost) <= maxPag))) {

            contenido += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product1.imgSrc + `" alt="` + product1.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product1.name + `</h4>
                            <small class="text-muted">` + product1.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product1.description + `</p>
                        <p class="mb-1">` + product1.cost + `</p>
                        <p class="mb-1">` + product1.currency + `</p>
                    </div>
                </div>
            </a>
            `

        }

        document.getElementById("listado").innerHTML = contenido;
    }
}

function sortProductos(criterio, array) {
    let result = [];
    if (criterio === 1) {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            });

    } else if (criterio === 2) {
        result = array.sort(
            function (a, b) {
                if (a.cost > b.cost) { return -1 }
                if (a.cost < b.cost) { return 1 }
                return 0;
            });

    } else if (criterio === 3) {
        result = array.sort(
            function (a, b) {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            });
    }

    return result;
}

/*function verProducto(name) {
    localStorage.setItem("producto", JSON.stringify({ producto1: name }));
    window.location = 'verproducto.html'
}*/

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            productosArray = resultado.data;

            showProductos(productosArray);
        }
    });

    document.getElementById("sortCostAsc").addEventListener("click", function () {

        productosArray = sortProductos(1, productosArray);

        showProductos(productosArray);
    });

    document.getElementById("sortCostDesc").addEventListener("click", function () {

        productosArray = sortProductos(2, productosArray);

        showProductos(productosArray);
    });

    document.getElementById("sortRelDesc").addEventListener("click", function () {

        productosArray = sortProductos(3, productosArray);

        showProductos(productosArray);
    });

    document.getElementById("buttonFiltrar").addEventListener("click", function () {

        minPag = document.getElementById("inputMinFiltrar").value;
        maxPag = document.getElementById("inputMaxFiltrar").value;

        if ((minPag != undefined) && (minPag != "") && (parseInt(minPag)) >= 0) {
            minPag = parseInt(minPag);
        }
        else {
            minPag = undefined;
        }

        if ((maxPag != undefined) && (maxPag != "") && (parseInt(maxPag)) >= 0) {
            maxPag = parseInt(maxPag);
        }
        else {
            maxPag = undefined;
        }


        showProductosFiltro(productosArray);
    })

});