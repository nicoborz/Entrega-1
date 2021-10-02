//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productos2Array = [];
var array2 = [];
var producto2 = {};
var minPag;
var maxPag;
var minCount = undefined;
var maxCount = undefined;


function showProductoComments() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productos2Array.length; i++) {
        let comment = productos2Array[i];

        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user + `</h4>
                            <small class="text-muted">` + comment.score + ` estrellas</small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                        <p class="mb-1">` + comment.dateTime + `</p>
                    </div>
                </div>
            </a>
            `

        document.getElementById("listado").innerHTML = htmlContentToAppend;
    }
}

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showProductosRelacionados(arrayListado, arrayRelated) {

    let htmlContentToAppend = "";

    for (let i = 0; i < arrayRelated.length; i++) {
        let detalle = arrayListado[arrayRelated[i]].name + "<br>";
        let imagen = arrayListado[arrayRelated[i]].imgSrc;

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ detalle + `</h4>
                        <div class="col-lg-3 col-md-4 col-6">
                            <div class="d-block mb-4 h-100">
                                <img class="img-fluid img-thumbnail" src="` + imagen + `" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        `

        document.getElementById("listadoRelacionados").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productoSimple = resultObj.data;

            let productoSimpleNameHTML = document.getElementById("productoSimpleName");
            let productoSimpleDescriptionHTML = document.getElementById("productoSimpleDescription");
            let productoSimpleSoldCountHTML = document.getElementById("productoSimpleSoldCount");
            let productoSimpleCostHTML = document.getElementById("productoSimpleCost");
            let productoSimpleCurrencyHTML = document.getElementById("productoSimpleCurrency");
            let productoSimpleCategoryHTML = document.getElementById("productoSimpleCategory");

            productoSimpleNameHTML.innerHTML = productoSimple.name;
            productoSimpleDescriptionHTML.innerHTML = productoSimple.description;
            productoSimpleSoldCountHTML.innerHTML = productoSimple.soldCount;
            productoSimpleCostHTML.innerHTML = productoSimple.cost;
            productoSimpleCurrencyHTML.innerHTML = productoSimple.currency;
            productoSimpleCategoryHTML.innerHTML = productoSimple.category;

            showImagesGallery(productoSimple.images)
        }
    });
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            productos2Array = result.data;
            showProductoComments(productos2Array);
        }

    })
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayListado = resultObj.data;
            showProductosRelacionados(arrayListado, productoSimple.relatedProducts);
        }
    })
});