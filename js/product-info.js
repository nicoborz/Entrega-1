//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productos2Array = [];
var producto2 = {};
var minPag;
var maxPag;
var minCount = undefined;
var maxCount = undefined;


function showProductoComments() {
    let htmlContentToAppend = "";
    for(let i = 0; i < productos2Array.length; i++){
        let comment = productos2Array[i];

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user +`</h4>
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

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            producto2 = resultObj.data;

            let producto2NameHTML  = document.getElementById("producto2Name");
            let producto2DescriptionHTML = document.getElementById("producto2Description");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productCategoryHTML = document.getElementById("productCategory");
        
            producto2NameHTML.innerHTML = producto2.name;
            producto2DescriptionHTML.innerHTML = producto2.description;
            productSoldCountHTML.innerHTML = producto2.soldCount;
            productCostHTML.innerHTML = producto2.cost;
            productCurrencyHTML.innerHTML = producto2.currency;
            productCategoryHTML.innerHTML = producto2.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(producto2.images)
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