<template>
    <button type="button" class="btn btn-primary  mt-3" @click="showSortModal()"><i class="bi bi-sort-up"></i>
        Sort</button>
    <div class="modal fade" id="sortModal" tabindex="-1" aria-labelledby="sortModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sortModalLabel">Filtruj</h5>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item sort-item active sort-exclude-1" sort-method="value asc"
                            aria-current="true">Wartość rosnąco</li>
                        <li class="list-group-item sort-item sort-exclude-1" sort-method="value desc">Wartość malejąco
                        </li>
                        <li class="list-group-item sort-item sort-exclude-2" sort-method="date_issue asc">Data
                            wystawienia
                            rosnąco</li>
                        <li class="list-group-item sort-item sort-exclude-2" sort-method="date_issue desc">Data
                            wystawienia
                            malejąco</li>
                    </ul>
                </div>
                <div class="modal-footer">
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
let sortModal;

function showSortModal() {
    sortModal = new Modal(document.getElementById('sortModal'), {
        keyboard: false
    })
    sortModal.show()
}

function submitSorts() {
    let val = []
    DBM.setSort(sort);
    sortModal.hide();
}
</script>

<style>
</style>