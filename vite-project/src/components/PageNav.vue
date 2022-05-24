<template>
    <slot>
        <div class="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading">Menu </div>
            <div class="list-group list-group-flush">
                <router-link :to="{ name: 'InvoicesView' }" custom v-slot="{ navigate }">
                    <div role="link" @click="navigate" class="list-group-item change-view active"
                        change-view="invoices">Faktury
                    </div>
                </router-link>
                <router-link :to="{ name: 'ScheduleView' }" custom v-slot="{ navigate }">
                    <div role="link" @click="navigate" class="list-group-item change-view" change-view="schedule">
                        Harmonogram
                    </div>
                </router-link>
                <router-link :to="{ name: 'ChartsView' }" custom v-slot="{ navigate }">
                    <div role="link" @click="navigate" class="list-group-item change-view" change-view="statistics">
                        Statystyki
                    </div>
                </router-link>
                <div role="link" class="list-group-item change-view logout" @click="logout">
                    Wyloguj
                </div>
            </div>
        </div>
    </slot>
</template>

<script>
import firebase from '../firebaseInit'
import { Modal } from 'bootstrap'

export default {
    name: 'Login',
    data() {
        return {
            email: 'a@b.cd',
            password: '123456',
        };
    },
    methods: {
        logout() {
            document.getElementById('myAlertText').innerHTML = "Wylogowano"
            let myModal = new Modal(document.getElementById('myAlert'), {
                keyboard: false
            })
            firebase
                .auth()
                .signOut()
                .then(() => {
                    myModal.show();
                    setTimeout(() => {
                        this.$router.push('/')
                        setTimeout(() => {
                            myModal.hide();
                        }, 1000);
                    }, 500);
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        }
    },
};
</script>