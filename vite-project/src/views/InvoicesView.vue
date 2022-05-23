<script setup>
import { ref, reactive } from 'vue'
import DBM from '../db'

const invoices = ref([])
DBM.readInvoices(invoices);

</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <div v-for="i in invoices" class="card text-dark bg-light mb-3 mt-3">
                <div class="card-header">Faktura</div>
                <div class="card-body">
                    <h5 class="card-title">{{ i.name }}</h5>
                    <p class="card-text">{{ i.date }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>