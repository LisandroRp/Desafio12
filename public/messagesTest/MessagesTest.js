const socket = io();

socket.on("newMessage", message => {
    $("#messages").append(`<span id="email">${message.author.id} </span><span id="date">[${message.date}]</span><span id="text"> : ${message.text}</span> <img width=50px src="${message.author.avatar}"}/> <br>`);
    $("#dataInput")[0].value = ""
    $(".form-control").value = ""
})
socket.on("error", () => {
    alert("Hubo un error")
})

$("#chatForm").submit( e => {
    e.preventDefault();
    sendMessage()
});

function sendMessage() {
    let message = {
        author: {
            id: $("#email")[0].value,
            firstName: $("#firstName")[0].value,
            lastName: $("#lastName")[0].value,
            age: $("#age")[0].value,
            alias: $("#alias")[0].value,
            avatar: $("#avatar")[0].value
        },
        text: $("#dataInput")[0].value
    }
    socket.emit("newMessage", message);
}
