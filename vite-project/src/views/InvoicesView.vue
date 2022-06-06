<script setup>
import { ref, reactive } from 'vue'
import { Tooltip } from 'bootstrap'
import DBM from '../db'
import { user } from '../store/user'
import { storeToRefs } from 'pinia'
import FilterButtonModal from '../components/FilterButtonModal.vue'
import SortButtonModal from '../components/SortButtonModal.vue'
const user2 = user();
const { roleCreate } = storeToRefs(user2);
const { roleAdmin } = storeToRefs(user2);
const { roleAccept } = storeToRefs(user2);

let checkall = ref(false);
let invoiceChecked = ref(false);

const invoices = ref(DBM.invoices)
DBM.readInvoices();

window.onload = function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl)
    })
};

function deleteInvoice(id) {
    DBM.deleteInvoice(id)
    DBM.readInvoices();
}

function isInvoiceChecked() {
    let c = document.getElementsByClassName('invoice-checkbox')
    if (c)
        for (let i of c) {
            if (i.checked)
                return true
        }
    return false
}

window.onclick = function () {
    invoiceChecked.value = isInvoiceChecked()
}

</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <div class="button-line">
                <FilterButtonModal></FilterButtonModal>
                <SortButtonModal></SortButtonModal>
                <button id="check-all" @click="checkall = !checkall" type="button" class="btn btn-primary  mt-3"><i
                        class="bi bi-check2-all"></i>
                    Zaznacz</button>
                <button id="check-all" v-if="invoiceChecked" type="button" class="btn btn-primary  mt-3"><i
                        class="bi bi-check-square"></i>
                    Akceptuj zaznaczone</button>
                <router-link :to="{ name: 'NewInvoiceView' }" custom v-slot="{ navigate }">
                    <button role="link" @click="navigate" type="button" v-if="roleCreate"
                        class="btn btn-success btn-new-invoice float-end  mt-3">
                        Utwórz <i class="bi bi-plus-lg"></i></button>
                </router-link>
            </div>
            <div v-for="i in invoices" class="card invoice-list-item text-dark bg-light mb-3 mt-3">
                <div class="card-header">
                    <h5 class="card-title">{{ i.name }}</h5>
                    <button type="button" class="btn btn-secondary float-end" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Szczegóły faktury"><i class="bi bi-three-dots"></i></button>
                </div>
                <div class="card-body">
                    <input class="form-check-input invoice-checkbox" type="checkbox" value="" :checked="checkall">
                    <div>
                        <p class="card-text">
                            <span class="invoice-info" v-if="i.supplier_name">
                                Dostawca: {{ i.supplier_name }} NIP: {{ i.supplier_nip }}
                            </span>
                            <span class="invoice-info" v-else>Dostawca: X NIP: X</span>
                            <span class="invoice-value" v-if="i.value">
                                {{ i.value }} zł
                            </span>
                            <span class="invoice-date" v-if="i.date_issue">Wystawienie: {{ i.date_issue }}</span>
                            <span class="invoice-date" v-else>Wystawienie: X</span>
                            <span class="invoice-date" v-if="i.date_create">Utworzenie: {{ i.date_create }}</span>
                            <span class="invoice-date" v-else>Utworzenie: X</span>
                            <span class="invoice-date" v-if="i.date_accept">Akceptacja: {{ i.date_accept }}</span>
                            <span class="invoice-date" v-else>Akceptacja: X</span>
                            <span class="invoice-date" v-if="i.date_pay">Płatność: {{ i.date_pay }}</span>
                            <span class="invoice-date" v-else>Płatność: X</span>
                        </p>
                    </div>
                </div>
                <div class="card-footer">
                    <button type="button" @click="deleteInvoice(i.id)" class="btn btn-danger float-end"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Usuń fakturę"><i
                            class="bi bi-x-circle"></i></button>
                    <button type="button" class="btn btn-secondary float-end" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Edytuj fakturę"><i class="bi bi-pencil-square"></i></button>
                    <button type="button" v-if="roleAccept" class="btn btn-primary float-end" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Akceptuj fakturę"><i class="bi bi-check-square"></i></button>
                    <div class="alert alert-warning float-end" role="alert" data-bs-toggle="tooltip"
                        v-if="i.status == 'created'" data-bs-placement="top" title="Status faktury">
                        Oczekiwanie na akceptację
                    </div>
                    <div class="alert alert-success float-end" role="alert" data-bs-toggle="tooltip"
                        v-if="i.status == 'accepted'" data-bs-placement="top" title="Status faktury">
                        Zaakceptowano
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.invoice-info {
    float: right;
    text-align: right;
    width: 100%;
    display: inline-block;
    font-weight: bold;
    margin-bottom: 10px;
}

.invoice-value {
    float: right;
    text-align: right;
    width: 100%;
    display: inline-block;
    font-weight: bold;
    margin-bottom: 10px;
}


.card-text .invoice-date {
    float: right;
    text-align: right;
    width: 300px;
    display: inline-block;
}

.card-title {
    padding: 0;
    margin: 0;
    display: inline;
    line-height: 180%;
}

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
    top: calc(50% - 12px);
    outline: none !important;
    box-shadow: none;
    display: block;
    position: absolute;
    cursor: pointer;
}

.button-line {
    width: 100%;
    display: inline-block;
}

.button-line button {
    margin-left: 15px;
    display: inline-block;
}

.button-line button:first-child {
    margin-left: 0px;
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