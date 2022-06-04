<script setup>
import DBM from '../db'
import { ref, reactive, computed } from 'vue'

DBM.activeFilters = []
DBM.activeSort = []
DBM.readInvoices();


const past = ref(DBM.invoices.value.filter(function (a) {
    if (a['status'] == 'accepted') return false;
    let d = new Date(a['date_pay'])
    d.setHours(0, 0, 0, 0)
    let d2 = new Date()
    d2.setHours(0, 0, 0, 0)
    if (d >= d2) return false;
    return true;
}));
const today = ref(DBM.invoices.value.filter(function (a) {
    if (a['status'] == 'accepted') return false;
    let d = new Date(a['date_pay'])
    d.setHours(0, 0, 0, 0)
    let d2 = new Date()
    d2.setHours(0, 0, 0, 0)
    if (d.getTime() != d2.getTime()) return false;
    return true;
}));
const future = ref(DBM.invoices.value.filter(function (a) {
    if (a['status'] == 'accepted') return false;
    let d = new Date(a['date_pay'])
    d.setHours(0, 0, 0, 0)
    let d2 = new Date()
    d2.setHours(0, 0, 0, 0)
    if (d <= d2) return false;
    return true;
}));

const props = defineProps(['which'])

</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <ul class="nav nav-tabs mt-3">
                <li class="nav-item">
                    <router-link :to="{ name: 'ScheduleView', params: { which: 'past' } }" class="nav-link"
                        :class="{ active: props.which == 'past' }">
                        Zaległe
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'ScheduleView', params: { which: 'today' } }" class="nav-link"
                        :class="{ active: props.which == 'today' }">
                        Dzisiaj
                    </router-link>
                </li>
                <li class=" nav-item">
                    <router-link :to="{ name: 'ScheduleView', params: { which: 'future' } }" class="nav-link"
                        :class="{ active: props.which == 'future' }">
                        Przyszłe
                    </router-link>
                </li>
            </ul>
            <ul class=" list-group mt-3" v-if="props.which == 'past'">
                <li v-for="i in past" class="list-group-item">{{ i.name }}, Data płatności: {{ i.date_pay }}</li>
            </ul>
            <ul class="list-group mt-3" v-if="props.which == 'today'">
                <li v-for="i in today" class="list-group-item">{{ i.name }}, Data płatności: {{ i.date_pay }}</li>
            </ul>
            <ul class="list-group mt-3" v-if="props.which == 'future'">
                <li v-for="i in future" class="list-group-item">{{ i.name }}, Data płatności: {{ i.date_pay }}</li>
            </ul>
        </div>
    </div>
</template>

<style>
</style>