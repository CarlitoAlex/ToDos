var yourUserName = "BaLiK_mem";
var yourAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/CandymyloveYasu.png/220px-CandymyloveYasu.png";

var currentMessages; // хранилище всех сообщений, каждое из них хранит ник, аватар отправителя, текст и время отправки

var timerId = setInterval(function () {
    updateMessages()
}, 1000); // обновлять список сообщений каждую сек


$(document).ready(function() {

    $('.message_input').keydown(function(event) {
        // enter has keyCode = 13, change it if you want to use another button
        if (event.keyCode == 13) {
            sendMessage();
        }
    });

});

function updateMessages() {
    $.ajax({ // TODO: axios
        url: "/getMessages/" + window.location.pathname.split("/").pop(), // возвращает инфу про сообщения с бд
        type: "get",
        success: function (result) { // массив пришедших сообщенек
            if (result === "") {
                window.location = "http://localhost:8082/errorPage";
            }
            else {

                if (!currentMessages) { // если пуст, будет первая инициализация
                    currentMessages = result;
                    for (var i = 0; i < currentMessages.length; i++) {
                        addMessage(currentMessages[i]);
                    }
                } else {
                    for (var i = currentMessages.length; i < result.length; i++) { // если придут новые сообщения, они добавятся
                        addMessage(result[i]);
                    }
                    currentMessages = result;
                }
            }
        }
    });
}

function sendMessage() { // отправка сообщения на бд (А ЭТО НОРМ ТЕМА, КОГДА БУДЕТ РАБОТАТЬ, МОЖНО УДАЛИТЬ ВЕРХНЕЕ)

    $.ajax({ // TODO: axios
        url: "/sendMessage/" + window.location.pathname.split("/").pop(),
        type: "post",
        data: {username: yourUserName, text: document.getElementById("textInput").value},
        success: function (result) {
            console.log("doneSend");
        }
    });
    document.getElementById("textInput").value = '';
}

function addMessage(args) { // args = {avatar, text, username, time}
    var $messages = $('.messages');
    var $message = $($('.message_template').clone().html()); // тут крч копируется шаблон сообщения, который внизу в бади торчит
    if (args.username == yourUserName) {
        $message.addClass('right').find('.text').html(args.text);
    } else {
        $message.addClass('left').find('.text').html(args.text);
    }
    if (args.avatar === "/images/avatars/default.jpg")
        $message.find('.avatar')[0].src = ".." + args.avatar;
    else $message.find('.avatar')[0].src = args.avatar;

    $message.find('.username').html(args.username);
    $message.find('.time').html(moment(new Date(args.created)).format("HH:mm:ss"));

    $('.messages').append($message);
    return setTimeout(function () {
        return $message.addClass('appeared');
    }, 0);
}

function loaddd() {
    yourUserName = document.getElementById("session").innerText;
}