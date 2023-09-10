var socket = io();
var textarea = document.querySelector("textarea")

document.querySelector(".btn").addEventListener("click", function(data){
    socket.emit("msg",{username: nameinp.value, value: textarea.value})
    append(`You: ${textarea.value}`, "right");
})

const append = function(message,position){
    var div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(position);
    div.textContent = message;
    document.querySelector(".container").appendChild(div);
    textarea.value = "";
}
var nameinp = document.querySelector("#nameinp");

document.querySelector("#sendname").addEventListener("click",function(){
    if(nameinp.value.trim().length > 0){
        document.querySelector("#username").textContent = nameinp.value;
        document.querySelector("#fixed").style.display = "none";
    }
    socket.emit("sendname", nameinp.value)
})

var clutter = ``

socket.on("sendname",function(data){
    data.forEach(function(elem){
        clutter += `
        <div id="live-user">
            <i class="ri-user-5-fill"></i>
            <h5>${elem}</h5>
        </div>`
    })
    document.querySelector("#live-users").innerHTML = clutter
})


socket.on("live",function(data){
    document.querySelector("#liveuser").textContent = data
})


socket.on("msg",function(data){
    append(`${data.username}: ${data.value}`,"left")
})



// socket.on("disconnect")

socket.on("non-live",function(data){
    console.log(data)
    document.querySelector("#liveuser").textContent = data
})