var newChat;//меню создания нового чата


$(document).ready((function () {
    newChat = new Vue({
        el: "#myModal",
        data: {
            name: "",
            seen: false,
            message: "",
            type: "text"
        },
        methods: {
            changeInput: function () {
                this.seen = false;
            },
            createChat: function () {

                if (this.name === "") {
                    this.seen = true;
                    this.message = "You must enter a channel name!";
                }
                else {
                    if (this.type === "radio")
                    {
                        this.seen=true;
                        this.message="This type of channel is not supported!"
                    }
                    else {

                        var user = document.getElementById("username").innerText;

                        var chatData = {
                            owner: user,
                            name: this.name,
                            type: this.type
                        };

                        axios.post('/newChat', chatData)
                            .then(function (result) {
                                console.log(result);
                                if (result.data.generatedUuid) {
                                    if (chatData.type==="text")
                                    window.location = "http://localhost:8082/chat/" + result.data.generatedUuid;
                                    else
                                        window.location = "http://localhost:8082/video/" + result.data.generatedUuid;
                                }
                            })
                            .catch(function (reason) {
                                console.error(reason);
                            });

                    }
                }
            },
            setType: function (type) {
                console.log(type);
                this.type = type;
            }
        }
    });
}));