var userEntry;
var userList;
var buttonList;

$(document).ready((function () {
    var user = document.getElementById("session").innerText;
    var channel = window.location.pathname.split("/").pop();
    userEntry = {
        data: channel,
        nick: user
    };

    axios.post('/userEntry', userEntry)
        .then(function (result) {
            console.log(result.data.valid);
        })
        .catch(function (reason) {
            console.error(reason);
        });


    buttonList = new Vue({
        el: "#getList",
        methods: {
            click: function () {
                userList.getUserList();
            }
        }
    });

    userList = new Vue({
        el: "#userlist_modal",
        data: {
            users: []
        },
        methods: {
            getUserList: function () {
                this.users = [];
                axios.post('/getUserList', userEntry)
                    .then(function (result) {
                        console.log(result);
                        var array = result.data.userSet;
                        for (var i = 0; i < array.length; i++) {
                            var info = array[i].split(" ");
                            console.log(info);
                            userList.users.push({username: info[0], email: info[1]});
                        }
                    })
                    .catch(function (reason) {
                        console.error(reason);
                    });
                console.log(this.users);
            }

        }
    });


}));

window.onbeforeunload = confirmExit;

function confirmExit() {
    axios.post('/userExit', userEntry)
        .then(function (result) {

        })
        .catch(function (reason) {
            console.error(reason);
        });
};
