<script setup>
import { ref, reactive, watch } from 'vue'
import DBM from '../db'
import { user } from '../store/user'
import { storeToRefs } from 'pinia'
const user2 = user();
const { roleCreate } = storeToRefs(user2);
const { roleAdmin } = storeToRefs(user2);
const { roleAccept } = storeToRefs(user2);

const props = defineProps(['id'])

function sumInvoiceItems() {
  let items = document.getElementsByClassName('invoice-item');
  let s = 0;
  for (let i of items) {
    let value = i.getElementsByClassName('invoice-item-value')[0].value;
    s += parseFloat(value);
  }
  return s;
}

let data = ref(DBM.invoice);
DBM.readInvoice(props.id);

function editInvoice() {
  DBM.editInvoice(data.value.id, data.value)
}

</script>
<template>
  <div class="container-fluid">
    <div class="container">

      <form @submit.prevent="" class="invoice-view create-invoice-form mt-3">
        <h4>Edytuj fakturę</h4>
        <div class="billing-from flex flex-column mt-3">
          <div class="input flex flex-column">
            <label class="form-label">Invoice number</label>
            <input required type="text" v-model="data.name" class="form-control" />
          </div>
          <div class="input flex flex-column">
            <label class="form-label">NIP</label>
            <input required type="text" v-model="data.supplier_nip" class="form-control" />
          </div>
          <div class="input flex flex-column">
            <label class="form-label">Nazwa firmy</label>
            <input required type="text" v-model="data.supplier_name" class="form-control" />
          </div>
          <div class="input flex flex-column">
            <label class="form-label">Data wystawienia</label>
            <input required type="date" v-model="data.date_issue" class="form-control" />
          </div>
          <div class="input flex flex-column">
            <label class="form-label">Data utworzenia</label>
            <input required type="date" v-model="data.date_create" class="form-control" />
          </div>
          <div class="input flex flex-column">
            <label class="form-label">Data akceptacji</label>
            <input type="date" v-model="data.date_accept" class="form-control" />
          </div>
          <div class="input flex flex-column">
            <label class="form-label">Termin płatności</label>
            <input required type="date" v-model="data.date_pay" class="form-control" />
          </div>
          <div class="input flex flex-column"></div>
          <label class="form-label">Status</label>
          <div class="input-group date" id="datepicker5">
            <select id="exampleSelect3" class="form-select" v-model="data.status">
              <option :selected="data.status == 'created'">created</option>
              <option :selected="data.status == 'accepted'">accepted</option>
            </select>
          </div>
        </div>

        <h5 class="mt-3 items-header">Edytuj pozycję</h5>

        <div class="invoice-item mt-3" v-for="i in data.items">
          <input required type="text" class="form-control invoice-item-name mt-1" v-model="i.name" />
          <input required v-model="i.value" type="number" v-on:change="data.value = sumInvoiceItems()" min="0"
            step="0.01" class="form-control invoice-item-value mt-1" />
        </div>
        <!-- <button @click="invoice_items_count++" class="btn btn-primary float-end mt-3 add-invoice-item">Dodaj</button> -->

        <h5 class="invoice-value mt-3">Wartość: {{ data.value }}</h5>
        <div class="confirm-container">
          <button @click="editInvoice" class="btn btn-warning float-end mt-5" v-if="roleCreate">Edytuj</button>
          <router-link :to="{ name: 'InvoicesView' }" custom v-slot="{ navigate }">
            <button role="link" @click="navigate" type="button" class="btn btn-secondary float-end  mt-5">
              Powrót </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.create-invoice-form {
  max-width: 500px;
}

.create-invoice-form .confirm-container button+button {
  margin-right: 10px;
}

.create-invoice-form .invoice-item-name {
  width: 80%;
  float: left;
}

.create-invoice-form .invoice-item-value {
  width: 20%;
  float: left;
}

.create-invoice-form .add-invoice-item {
  width: 100%;
}

.create-invoice-form .invoice-value {
  float: left;
  text-align: left;
}
</style>

