<template>
<div @click="checkClick" class="invoice-overall flex flex column">

    <form @submit.prevent="submitForm" class="invoice-view">

        <h1>Stwórz fakturę</h1>

        <!--Billing From-->
        <div class="billing-from flex flex-column">
        <h4>Dane</h4>
        <div class="input flex flex-column">
          <label for="numberNIP">NIP</label>
          <input required type="text" id="numberNIP" v-model="numberNIP" />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="City">Miasto</label>
            <input required type="text" id="City" v-model="City" />
          </div>
          <div class="input flex flex-column">
            <label for="invoiceCreationDate">Data Utworzenia </label>
            <input required type="text" id="invoiceCreationDate" v-model="invoiceCreationDate" />
          </div>
          <div class="input flex flex-column">
            <label for="invoiceAcceptDate">Data Akceptacji</label>
            <input required type="text" id="invoiceAcceptDate" v-model="invoiceAcceptDate" />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDate">Data Płatności</label>
            <input required type="text" id="paymentDate" v-model="paymentDate" />
          </div>
        </div>
      </div>
    
        <!--Billing To-->
        <div class="billing-to flex flex-column">
            <h4>Dane Klienta</h4>
            <div>
                <label for="customerName">Nazwa Klienta</label>
                <input required type="text" id="clientName" v-model="clientName" />
            </div>
            <div class="input flex flex-column">
                <label for="clientEmail">Adres E-mail</label>
                 <input required type="text" id="clientEmail" v-model="clientEmail" />
            </div>      
        </div> 
        
        <!--Invoice Details-->
        <div class="input flex flex-column">
          <div class="payment flex"></div>
          </div>
          <div class="input flex flex-column">
            <label for="paymentDays">Czas do zapłaty</label>
            <select required type="text" id="paymentDays" v-model="paymentDays">
                <option value="30"> 30 dni</option>
                <option value="60"> 60 dni</option>
            </select>
        </div>


        
    <!--Save/Exit-->
    <div class="save flex">
        <div class="left">
            <button @click="closeInvoice" class="red">Zamknij</button>
        </div>
        <div class="right flex">
            <button @click="saveDraft" class="dark-purple">Zapisz</button>
            <button @click="publishInvoice" class="green">Utwórz</button>

        </div>
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
                invoiceAcceptDate: null,
                paymentDate: null,

                

            }
        }
    }
</script>

<style>
.invoice-view {
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
    color: black ;
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
    background-color: #1e2139;
    color: #fff (148, 36, 36);
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
  }
  
</style>

