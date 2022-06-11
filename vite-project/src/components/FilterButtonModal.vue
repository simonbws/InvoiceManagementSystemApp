<template>
    <button type="button" class="btn btn-primary  mt-3" @click="showFilterModal()"><i class="bi bi-filter"></i>
        Filtruj</button>

    <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="filterModalLabel">Filtruj</h5>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item filter-item" @click="e => e.target.classList.toggle('active')"
                            filter-method="value">
                            <label class="form-label">Kwota faktury</label>
                            <div class="input-group mb-3">
                                <input type="number" min="0" max="9999999999999" class="form-control filter-from"
                                    placeholder="0.0">
                                <span class="input-group-text"><code>&lt;&gt;</code></span>
                                <input type="number" min="0" max="9999999999999" class="form-control filter-to"
                                    placeholder="1500.0">
                            </div>
                            <div class="filter-invalid hidden">
                                Nieprawidłowa wartość.
                            </div>
                        </li>
                        <li class="list-group-item filter-item" @click="e => e.target.classList.toggle('active')"
                            filter-method="date_issue">
                            <label class="form-label">Data wystawienia</label>
                            <div class="input-group date" id="datepicker">
                                <input class="form-control filter-from" type="date" />
                                <span class="input-group-text"><code>&lt;&gt;</code></span>
                                <input class="form-control filter-to" type="date" />
                            </div>
                            <div class="filter-invalid hidden">
                                Nieprawidłowa wartość.
                            </div>
                        </li>
                        <li class="list-group-item filter-item" @click="e => e.target.classList.toggle('active')"
                            filter-method="date_create">
                            <label class="form-label">Data utworzenia</label>
                            <div class="input-group date" id="datepicker2">
                                <input class="form-control filter-from" type="date" />
                                <span class="input-group-text"><code>&lt;&gt;</code></span>
                                <input class="form-control filter-to" type="date" />
                            </div>
                            <div class="filter-invalid hidden">
                                Nieprawidłowa wartość.
                            </div>
                        </li>
                        <li class="list-group-item filter-item" @click="e => e.target.classList.toggle('active')"
                            filter-method="date_pay">
                            <label class="form-label">Data płatności</label>
                            <div class="input-group date" id="datepicker3">
                                <input class="form-control filter-from" type="date" />
                                <span class="input-group-text"><code>&lt;&gt;</code></span>
                                <input class="form-control filter-to" type="date" />
                            </div>
                            <div class="filter-invalid hidden">
                                Nieprawidłowa wartość.
                            </div>
                        </li>
                        <li class="list-group-item filter-item" @click="e => e.target.classList.toggle('active')"
                            filter-method="date_accept">
                            <label class="form-label">Data akceptacji</label>
                            <div class="input-group date" id="datepicker4">
                                <input class="form-control filter-from" type="date" />
                                <span class="input-group-text"><code>&lt;&gt;</code></span>
                                <input class="form-control filter-to" type="date" />
                            </div>
                            <div class="filter-invalid hidden">
                                Nieprawidłowa wartość.
                            </div>
                        </li>
                        <li class="list-group-item filter-item" @click="e => e.target.classList.toggle('active')"
                            filter-method="status">
                            <label class="form-label">Status</label>
                            <div class="input-group date" id="datepicker5">
                                <select id="exampleSelect3" class="form-select">
                                    <option>created</option>
                                    <option>accepted</option>
                                </select>
                            </div>
                            <div class="filter-invalid hidden">
                                Nieprawidłowa wartość.
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" id="submitFilters" @click="submitFilters()"
                        class="btn btn-primary btn-filter">Zastosuj</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DBM from '../db'
import { Modal } from 'bootstrap'
let filterModal;

function submitFilters() {

    const filtervalues = [];
    const filters = document.querySelectorAll(".filter-item.active");
    let v = null;

    for (let f of filters) {
        switch (f.getAttribute('filter-method')) {
            case "value":
                v = validateValue(f);
                if (!v) return;
                else filtervalues.push(v);
                break;
            case "date_issue":
            case "date_accept":
            case "date_create":
            case "date_pay":
                v = validateDate(f);
                if (!v) return;
                else filtervalues.push(v);
                break;
            case "status":
                filtervalues.push({
                    filter: 'status',
                    from: f.getElementsByClassName('form-select')[0].value,
                    to: f.getElementsByClassName('form-select')[0].value
                });
        }
    }

    DBM.setFilters(filtervalues);
    filterModal.hide();
}


function validateValue(elem) {
    elem.getElementsByClassName('filter-invalid')[0].classList.add("hidden");
    let from = parseFloat(elem.getElementsByClassName('filter-from')[0].value);
    let to = parseFloat(elem.getElementsByClassName('filter-to')[0].value);

    if (from > to) {
        elem.getElementsByClassName('filter-invalid')[0].classList.remove("hidden");
        return null;
    }

    // ...other date validation checks

    return {
        filter: elem.getAttribute("filter-method"),
        from: from,
        to: to
    }
}

function validateDate(elem) {
    elem.getElementsByClassName('filter-invalid')[0].classList.add("hidden");
    let from = new Date(elem.getElementsByClassName('filter-from')[0].value);
    let to = new Date(elem.getElementsByClassName('filter-to')[0].value);

    if (from > to) {
        elem.getElementsByClassName('filter-invalid')[0].classList.remove("hidden");
        return null;
    }
    // ...other date validation checks

    return {
        filter: elem.getAttribute("filter-method"),
        from: from,
        to: to
    }
}

function showFilterModal() {
    filterModal = new Modal(document.getElementById('filterModal'), {
        keyboard: false
    })
    filterModal.show()
}

</script>

<style>
</style>