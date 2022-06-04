
<script setup>
import DBM from '../db'
import ReactiveChart1 from '../components/ReactiveChart1'
import ReactiveChart2 from '../components/ReactiveChart2'

DBM.getStatisticsAcceptedAndNot()
</script>

<template>

    <div class="container-fluid">
        <div class="container">
            <div class="card text-dark bg-light mt-3">
                <div class="card-header">Wykres #1</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">
                        <reactive-chart-1 />
                    </p>
                </div>
            </div>
            <div class="card text-dark bg-light mt-3">
                <div class="card-header">Wykres #2</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">
                        <reactive-chart-2 />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>