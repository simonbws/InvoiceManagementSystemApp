<template>
<div @click="checkClick" class="invoice-wrap flex flex column">

    <form @submit.prevent="submitForm" class="invoice-content">

        <h1>Create New Invoice</h1>

        <!--Billing Od-->
        <div class="billing-from flex flex-column">
            <h4>Bill From</h4>
            <div class="input flex flex-column">
                <label for="numberNIP">NIP</label>
                <input required type="text" id="numberNIP" v-model="numberNIP">
            </div>
        </div>
          <div class="bill-from flex flex-column">        
            <div class="input flex flex-column">
                <label for="City">City</label>
                <input required type="text" id="numberNIP" v-model="City">
            </div>
        </div>

          <div class="bill-from flex flex-column">
            <div class="input flex flex-column">
                <label for="billCountry">Bill Country</label>
                <input required type="text" id="numberNIP" v-model="billCountry">
            </div>

        </div>
    
    <!--Billing Do-->
    <div class="billing-to flex flex-column">
        <h4>Billing To</h4>
    </div>

    </form>
</div>
</template>

<script>
    export default {
        name: "invoiceMod",
        data() {
            return {
                invoiceValue: null,
                City: null,
                invoiceDate: null,
                numberNIP: null,
                isPending: null,
                draft: null,
                billCountry: null,  
                customerName: null,
                invoiceCreationDate: null,
                invoiceiAcceptDate: null,
                paymentDate: null,

                

            }
        }
    }
</script>

