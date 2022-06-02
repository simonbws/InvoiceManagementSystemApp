<script>
import { Modal } from 'bootstrap'
import firebase from '../firebaseInit';
import DBM from '../db'
import { user } from '../store/user'

export default {
    name: 'Login',
    data() {
        return {
            email: 'a@b.cd',
            password: '123456',
        };
    },
    methods: {
        login() {
            console.log(this.email)
            DBM.checkUser(this.email, this.auth, this.notExists)
        },

        notExists() {
            document.getElementById('myAlertText').innerHTML = "Użytkownik nie istnieje!"
            let myModal = new Modal(document.getElementById('myAlert'), {
                keyboard: false
            })
            myModal.show();
            setTimeout(() => {
                myModal.hide();
            }, 500)

        },

        auth() {
            console.log("authh")
            document.getElementById('myAlertText').innerHTML = "Zalogowano"
            let myModal = new Modal(document.getElementById('myAlert'), {
                keyboard: false
            })
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    myModal.show();
                    this.$router.push('/invoices');
                    const user2 = user();
                    user2.setEmail(this.email);
                    DBM.readUserRole()
                    setTimeout(() => {
                        myModal.hide();
                    }, 500)

                })
                .catch(error => {
                    alert(error.message);
                });
        }
    },
};
</script>

<template>
    <div id="login-box">
        <div class="container-sm ">
            <div class="container-fluid">
                <form class="login-form" @submit.prevent="login">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">E-mail</label>
                        <input type="email" class="form-control" v-model="email" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">Użyj swojego służbowego adresu e-mail.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Hasło</label>
                        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <button type="submit" class="btn btn-primary">Zaloguj</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
#login-box {
    background-color: white;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
}

@media (min-width: 768px) {
    #login-box {
        margin-left: -15rem;
        margin-top: -5rem;
    }
}

.login-form {
    width: 300px;
    margin: 30% auto;
    display: block;
}
</style>