<template>
    <div class="container-fluid">
        <div class="container">
            <h3 class="mt-3">Zarejestruj użytkownika</h3>
            <form class="register-form mt-5">
                <div class="mb-3">
                    <label for="exampleInputEmail2" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail2">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label">Hasło:</label>
                    <input type="password" class="form-control" id="exampleInputPassword2">
                </div>
                <div class="mb-3">
                    <label for="exampleSelect2" class="form-label">Disabled select menu</label>
                    <select id="exampleSelect2" class="form-select">
                        <option>Standard</option>
                        <option>Accept</option>
                        <option>Admin</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Zarejestruj</button>
            </form>
            <h3 class="mt-5">Użytkownicy</h3>
            <div v-for="i in users" class="card users-list-item text-dark bg-light mb-3 mt-3">
                <div class="card-body">
                    <p>
                        <span class="email-span">{{ i.email }}</span>
                        <span class="role-span">Rola: {{ i.role }}</span>
                    </p>
                    <button type="button" class="btn btn-danger float-end"><i class="bi bi-x-circle"></i></button>
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
</style>