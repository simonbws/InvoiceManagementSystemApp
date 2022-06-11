<script setup>
import { ref, reactive } from 'vue'
import DBM from '../db'
import { user } from '../store/user'
import { storeToRefs } from 'pinia'
const user2 = user();
const { roleCreate } = storeToRefs(user2);
const { roleAdmin } = storeToRefs(user2);
const { roleAccept } = storeToRefs(user2);

const invoice_items_count = ref(1);
const invoice_value = ref(0);

function sumInvoiceItems() {
  let items = document.getElementsByClassName('invoice-item');
  let s = 0;
  for (let i of items) {
    let value = i.getElementsByClassName('invoice-item-value')[0].value;
    s += parseFloat(value);
  }
  return s;
}


const data = reactive(
  {
    name: null,
    supplier_name: null,
    supplier_nip: null,
    date_issue: new Date().toISOString().replace(/T.+/, ''),
    date_pay: new Date().toISOString().replace(/T.+/, ''),
    invoice_items: [],
    invoice_value: null
  })

function createInvoice() {
  let items = document.getElementsByClassName('invoice-item');
  let items_objects = []
  for (let i of items) {
    let name = i.getElementsByClassName('invoice-item-name')[0].value;
    let value = i.getElementsByClassName('invoice-item-value')[0].value;
    items_objects.push({ name: name, value: value })
  }

  data.invoice_items = items_objects;
  data.invoice_value = invoice_value.value;

  DBM.createInvoice(data)

  invoice_value.value = 0;
  invoice_items_count.value = 0;
}

</script>
<template>
  <div class="container-fluid">
    <div class="container">

      <form @submit.prevent="" class="invoice-view create-invoice-form mt-3">
        <h4>Dodaj fakturę</h4>
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
            <label class="form-label">Termin płatności</label>
            <input required type="date" v-model="data.date_pay" class="form-control" />
          </div>
        </div>
        <h5 class="mt-3 items-header">Dodaj pozycję</h5>

        <div class="invoice-item mt-3" v-for="i in invoice_items_count">
          <input required type="text" class="form-control invoice-item-name mt-1" />
          <input required type="number" v-on:change="invoice_value = sumInvoiceItems()" min="0" value="0" step="0.01"
            class="form-control invoice-item-value mt-1" />
        </div>
        <button @click="invoice_items_count++" class="btn btn-primary float-end mt-3 add-invoice-item">Dodaj</button>

        <h5 class="invoice-value mt-3">Wartość: {{ invoice_value }}</h5>
        <div class="confirm-container">
          <button @click="createInvoice" class="btn btn-success float-end mt-5" v-if="roleCreate">Utwórz</button>
          <router-link :to="{ name: 'InvoicesView' }" custom v-slot="{ navigate }">
            <button role="link" @click="navigate" type="button" class="btn btn-secondary float-end  mt-5">
              Anuluj </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* .invoice-view {
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 58px;
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  color: black;
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

}

h1 {
  margin-bottom: 46px;
  color: black;
}

h3 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #777f98;
}

h4 {
  color: black;
  font-size: 24px;
  margin-bottom: 24px;
}

.button {
  color: #fff(31, 7, 7, 0.023);
  background-color: #fff;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.save {
  margin-top: 60px;
}

.input {
  margin-bottom: 24px;

}

label {
  font-size: 12px;
  margin-bottom: 6px;
}

input,
select {
  width: 100%;
  border-radius: 4px;
  padding: 12px 4px;
  border: none;
} */

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

