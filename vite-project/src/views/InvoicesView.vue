<script setup>
import { ref, reactive } from 'vue'
import DBM from '../db'

let checkall = ref(false);

const invoices = ref([])
DBM.readInvoices(invoices);
</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <div class="button-line">
                <button type="button" class="btn btn-primary  mt-3"><i class="bi bi-filter"></i> Filtruj</button>
                <button type="button" class="btn btn-primary  mt-3"><i class="bi bi-sort-up"></i> Sortuj</button>
                <button id="check-all" @click="checkall = !checkall" type="button" class="btn btn-primary  mt-3"><i
                        class="bi bi-check2-all"></i>
                    Zaznacz</button>
                <button type="button" class="btn btn-success btn-new-invoice float-end  mt-3">
                    Utwórz <i class="bi bi-plus-lg"></i></button>
            </div>
            <div v-for="i in invoices" class="card invoice-list-item text-dark bg-light mb-3 mt-3">
                <div class="card-header">Faktura</div>
                <div class="card-body">
                    <input class="form-check-input" type="checkbox" value="" :checked="checkall">
                    <div>
                        <h5 class="card-title">{{ i.name }}</h5>
                        <p class="card-text">{{ i.date }}</p>
                    </div>
                </div>
                <div class="card-footer">

                    <button type="button" class="btn btn-danger float-end"><i class="bi bi-x-circle"></i></button>
                    <button type="button" class="btn btn-secondary float-end"><i
                            class="bi bi-pencil-square"></i></button>
                    <div class="alert alert-warning float-end" role="alert">
                        Oczekiwanie na akceptację
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.invoice-list-item .alert {
    padding: 0.375rem 0.75rem;
    margin: 0;
    margin-right: 15px;
    border-color: gray;
}

.invoice-list-item .card-body {
    display: flex;
}

.invoice-list-item .form-check-input[type="checkbox"] {
    width: 25px;
    height: 25px;
    margin: 0;
    padding: 0;
    margin-top: 15px;
    margin-right: 25px;
    outline: none !important;
    box-shadow: none;
}

.button-line {
    width: 100%;
    display: inline-block;
}

.button-line button+button {
    margin-left: 15px;
    display: inline-block;
}

.btn:focus,
.btn:active {
    outline: none !important;
    box-shadow: none;
}

.card-footer button+button {
    margin-right: 15px;
}
</style>