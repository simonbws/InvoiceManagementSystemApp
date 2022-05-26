<template>
    <slot>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <button id="menu-toggle" class="navbar-toggler shadow-none" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <span class="navbar-brand mb-0 h1">
                <span class="role-display">Roles:</span>
                <span class="role-display" v-if="roleAdmin">admin</span>
                <span class="role-display" v-if="roleCreate">create</span>
                <span class="role-display" v-if="roleAccept">accept</span>
            </span>
        </nav>
    </slot>
</template>

<script setup>
import { user } from '../store/user'
import { storeToRefs } from 'pinia'
const user2 = user();
const { roleAccept } = storeToRefs(user2);
const { roleAdmin } = storeToRefs(user2);
const { roleCreate } = storeToRefs(user2);

</script>

<style>
.role-display {
    font-size: 1rem;
    margin: 0 5px;
}
</style>