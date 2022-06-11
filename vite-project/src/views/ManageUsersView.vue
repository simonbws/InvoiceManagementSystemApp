<template>
    <div class="container-fluid">
        <div class="container register-container">
            <h3 class="mt-3">Zarejestruj użytkownika</h3>
            <form class="register-form mt-5" @submit.prevent="register">
                <div class="mb-3">
                    <label for="exampleInputEmail2" class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" id="exampleInputEmail2">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label">Hasło</label>
                    <input type="password" class="form-control" v-model="password" id="exampleInputPassword2">
                </div>
                <div class="mb-3">
                    <label for="exampleSelect2" class="form-label">Rola</label>
                    <select id="exampleSelect2" class="form-select" v-model="role">
                        <option>standard</option>
                        <option>accept</option>
                        <option>admin</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Zarejestruj</button>
            </form>

            <button id="refreshUsers" @click="refresh" class="btn btn-success mb-3 float-end">Odśwież listę
                użytkowników</button>
            <button @click="DBM.fillDatabase()" type="button" class="btn btn-secondary float-end">Uzupełnij bazę
                danych danymi testowymi</button>
            <h3 class="mt-5">Użytkownicy </h3>
            <div v-for="i in users" class="card users-list-item text-dark bg-light mb-3 mt-3">
                <div class="card-body">
                    <p>
                        <span class="email-span">{{ i.email }}</span>
                        <span class="role-span">Rola: {{ i.role }}</span>
                    </p>
                    <button @click="DBM.deleteUser(i.email)" type="button" class="btn btn-danger float-end"><i
                            class="bi bi-x-circle"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DBM from '../db'
import { ref, reactive } from 'vue'

const users = ref([])
DBM.readUsers(users);


function refresh() {
    console.log("REFRESH")
    users.value = []
    DBM.readUsers(users);
}


</script>

<script>
import { Modal } from 'bootstrap'
import firebase from '../firebaseInit';
import { user } from '../store/user'

export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
            role: 'standard'
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    DBM.addUser(this.email, this.role)
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    },
};
</script>

<style>
.email-span {
    font-size: 1.5rem;
}

.role-span {
    font-size: 1rem;
    margin-left: 30px;
}

.users-list-item p {
    display: inline;
}

.users-list-item button {
    display: inline;
}

.register-container button+button {
    margin-right: 10px;
}
</style>