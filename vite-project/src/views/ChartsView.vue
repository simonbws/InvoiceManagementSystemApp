<script setup>
import DoughnutChart from '../components/MyChart.ts'
</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <div class="card text-dark bg-light mt-3">
                <div class="card-header">Chart #1</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">
                        <DoughnutChart />
                    </p>
                </div>
            </div>
            <div class="card text-dark bg-light mt-3">
                <div class="card-header">Chart #2</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">
                        <DoughnutChart />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>