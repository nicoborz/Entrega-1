//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productosArray = [];
var contenido;
var minPag;
var maxPag;

function showProductos(array) {
    let contenido = "";

    for(let i = 0; i < array.length; i++){ 
        let producto = array[i];
        contenido += `
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
                    </div>

                </div>
            </div>
        </div>
        `;
        contenido += '<button style="float: right;" onclick="verProducto('+ producto.name + ')">Ver Producto</button>';
        document.getElementById("listado").innerHTML = contenido; 
    }
}

function showProductosFiltro(array) {
    
    let contenido = "";
    
    for(let i = 0; i < array.length; i++){ 
        let producto = array[i];
        
        if (((minPag == undefined) || (minPag != undefined && parseInt(producto.cost) >= minPag)) && 
            ((maxPag == undefined) || (maxPag != undefined && parseInt(producto.cost) <= maxPag))) {
                
                contenido += `
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
                        </div>

                    </div>
                </div>
            </div>
            `;
            contenido += '<button style="float: right;" onclick="verProducto('+ producto.name + ')">Ver Producto</button>';

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
            function(a, b) {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            });
    } 

    return result;
}

function verProducto(name){
    localStorage.setItem("producto",JSON.stringify({productoname: name}));
    window.location =  'verproducto.html'
}

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

        if ((minPag != undefined) && (minPag != "") && (parseInt(minPag)) >=0 ) {
            minPag = parseInt(minPag);
        }
        else {
            minPag = undefined;
        }

        if ((maxPag != undefined) && (maxPag != "") && (parseInt(maxPag)) >=0 ) {
            maxPag = parseInt(maxPag);
        }
        else {
            maxPag = undefined;
        }


        showProductosFiltro(productosArray);
    })

});