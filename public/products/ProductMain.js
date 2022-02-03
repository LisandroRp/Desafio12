const socket = io();


socket.on("newProduct", product => {
    $("#table").append(`<tr><th scope="row">${product.id}</th><td>${product.name}</td><td>$${product.price}</td><td><img style="width:50px;" src="${product.photo}" alt=""></td></tr>`)
})

socket.on("error", () => {
    alert("Hubo un error")
})

$("#form-product").submit( e => {
    e.preventDefault();
    createProduct()
})

function createProduct() {
    let product = {
        id: 0,
        name: $("#name")[0].value,
        price: $("#price")[0].value,
        photo: $("#photo")[0].value
    }
    socket.emit("newProduct", product);
}
