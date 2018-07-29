var editMail;
var mainForm;
var editUsername;
var editAvatar;

$(document).ready((function () {

    mainForm = new Vue({
        el: "#main_form",
        data: {
            usermessage: "Your e-mail is not confirmed. Password change is forbidden!" +
            " Check your e-mail!",
            code: false,
            nick: "",
            email: "",
            avatar: "",
            seen: false,
            message: "",
            newPassword: "",
            repeatPassword: ""
        },
        created: function () {
            this.nick = document.getElementById("session").innerText;
            var usr = {
                data: null,
                nick: this.nick
            };
            axios.post('/getUser', usr)
                .then(function (result) {
                    console.log(result);
                    mainForm.email = result.data.email;
                    if (result.data.code === null) {
                        mainForm.code = true;
                        mainForm.usermessage = "Your email has been confirmed.";
                    }
                    mainForm.avatar = result.data.avatar;
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        },
        methods:
            {
                error: function (error) {
                    this.message = error;
                    this.seen = true;
                },
                changeInput: function () {
                    this.seen = false;
                },
                editMail: function () {
                    editMail.email = this.email;
                },
                editUsername: function () {
                    editUsername.username = this.nick;
                },
                editAvatar: function () {
                    editAvatar.avatar = this.avatar;
                },
                cancel_pass_change: function () {
                    var editPassContainer = document.getElementById("edit_password_container");
                    var newContainer = document.getElementsByClassName("new_password_container");
                    for (var i = 0; i < newContainer.length; i++) {
                        newContainer[i].style.display = "none";
                    }
                    editPassContainer.style.display = "flex";
                },
                editPassword: function () {
                    var editPassContainer = document.getElementById("edit_password_container");
                    var newContainer = document.getElementsByClassName("new_password_container");
                    editPassContainer.style.display = "none";
                    for (var i = 0; i < newContainer.length; i++) {
                        newContainer[i].style.display = "flex";
                    }

                    this.newPassword = "";
                    this.repeatPassword = "";

                },
                savePassword: function (event) {
                    event.preventDefault();
                    if (this.newPassword === "") {
                        this.error("Enter a new password!");
                    }
                    else if (this.newPassword !== this.repeatPassword) {
                        this.error("Passwords do not match!");
                    }
                    else {
                        var usr = {
                            data: this.newPassword,
                            nick: this.nick
                        };
                        axios.post('/savePassword', usr)
                            .then(function (result) {
                                console.log(result.data.valid);
                            })
                            .catch(function (reason) {
                                console.error(reason);
                            });
                        this.cancel_pass_change();
                    }

                }
            }
    });

    editAvatar = new Vue({
        el: "#edit_avatar_modal",
        data: {
            avatar: "",
            url: "",
            seen: false
        },
        methods: {
            defaultAvatar: function () {
                this.seen = true;
                this.avatar = mainForm.avatar;
            },
            changeInput: function () {
                this.seen = false;
                this.avatar = this.url;
            },
            avatarChange: function () {
                if (!this.seen && this.avatar !== mainForm.avatar) {
                    var usr = {
                        data: this.avatar,
                        nick: mainForm.nick
                    };

                    axios.post("/setAvatar", usr)
                        .then(function (result) {

                        })
                        .catch(function (reason) {
                            editAvatar.seen = true;
                        });
                    mainForm.avatar = this.avatar;
                    $("#edit_avatar_modal").modal('hide');
                }
            }

        }
    });

    editUsername = new Vue({
        el: "#edit_name_modal",
        data: {
            username: "",
            seen: false,
            message: ""
        },
        methods: {
            error: function (error) {
                this.message = error;
                this.seen = true;
            },
            changeInput: function () {
                this.seen = false;
            },
            validateUsername: function (event) {
                event.preventDefault();
                if (this.username === "") {
                    this.error("Enter your username!");
                }
                else if (this.username !== mainForm.nick) {
                    var usr = {
                        data: this.username,
                        nick: mainForm.nick
                    };
                    axios.post('/editUsername', usr)
                        .then(function (result) {
                            if (result.data.valid) {
                                editUsername.error("This username is already taken");
                            }
                            else {
                                window.location = "http://localhost:8082/logout";
                            }
                        })
                        .catch(function (reason) {
                            console.error(reason);
                        });
                }
                else $("#edit_name_modal").modal('hide');

            }
        }
    });

    editMail = new Vue({
        el: "#edit_email_modal",
        data: {
            email: "",
            seen: false,
            message: ""
        },
        methods: {
            error: function (error) {
                this.message = error;
                this.seen = true;
            },
            changeInput: function () {
                this.seen = false;
            },
            validateEmail: function (event) {
                event.preventDefault();
                if (this.email === "") {
                    this.error("Enter your email!");
                } else if (!this.validEmail(this.email)) {
                    this.error("Please enter a valid email address!");
                }
                else this.saveEmail()
            },
            saveEmail: function () {

                if (mainForm.email !== this.email) {

                    var usr = {
                        data: this.email,
                        nick: mainForm.nick
                    };
                    axios.post('/checkMail', usr)
                        .then(function (result) {
                            if (result.data.valid) {
                                editMail.error("This email has already been registered!");
                            }
                            else {
                                window.location = "http://localhost:8082/user_settings";
                            }
                        })
                        .catch(function (reason) {
                            console.error(reason);
                        });
                }
                else {
                    $("#edit_email_modal").modal('hide');
                }

            },
            validEmail: function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

        }

    });
}))
;