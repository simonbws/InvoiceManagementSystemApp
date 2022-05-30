<template>
    <button type="button" class="btn btn-primary  mt-3" @click="showSortModal()"><i class="bi bi-sort-up"></i>
        Sort</button>
    <div class="modal fade" id="sortModal" tabindex="-1" aria-labelledby="sortModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sortModalLabel">Sortuj</h5>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item sort-item active" @click="toggleActiveSort" sort-exclude="1"
                            sort-method="value asc" aria-current="true">Wartość rosnąco</li>
                        <li class="list-group-item sort-item" @click="toggleActiveSort" sort-exclude="1"
                            sort-method="value desc">Wartość malejąco
                        </li>
                        <li class="list-group-item sort-item" @click="toggleActiveSort" sort-exclude="2"
                            sort-method="date_issue asc">Data
                            wystawienia
                            rosnąco</li>
                        <li class="list-group-item sort-item" @click="toggleActiveSort" sort-exclude="2"
                            sort-method="date_issue desc">
                            Data
                            wystawienia
                            malejąco</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <p v-for="i in sortMethods">{{ i.field + ' ' + i.dir }}</p>
                    <button type="button" id="submitsorts" @click="submitSorts()"
                        class="btn btn-primary btn-sort">Zastosuj</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DBM from '../db'
import { Modal } from 'bootstrap'
import { ref } from 'vue'

let sortModal;
let sortMethods = ref([])

function showSortModal() {
    sortModal = new Modal(document.getElementById('sortModal'), {
        keyboard: false
    })
    sortModal.show()
}

function toggleActiveSort(e) {
    let v = e.target.getAttribute("sort-exclude")
    let isActive = e.target.classList.contains("active")
    let t = document.querySelectorAll('li[sort-exclude="' + v + '"]');
    for (let i of t) {
        i.classList.remove("active");
    }
    let c = e.target.getAttribute("sort-method");
    if (sortMethods.value.findIndex((x) => c.includes(x.field)) != -1) {
        sortMethods.value.splice(sortMethods.value.findIndex((x) => c.includes(x.field)), 1);
    }

    if (!isActive) {
        e.target.classList.add("active")
        let t = e.target.getAttribute('sort-method').split(' ')
        sortMethods.value.push({
            field: t[0],
            dir: t[1]
        })
    }
}

function submitSorts() {
    DBM.setSort(sortMethods.value);
    sortModal.hide();
}
</script>

<style>
</style>