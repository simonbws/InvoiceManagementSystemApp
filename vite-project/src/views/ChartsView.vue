<script>
import ReactivePropPage from '../components/reactivePropPage'

import ReactivePropPage2 from '../components/reactivePropPage2'

export default {
    name: 'App',
    components: {
        ReactivePropPage,
        ReactivePropPage2
    }
}

</script>

<script setup>
import DBM from '../db'
DBM.getStatisticsAcceptedAndNot()
</script>

<template>

    <div class="container-fluid">
        <div class="container">
            <div class="card text-dark bg-light mt-3">
                <div class="card-header">Chart #1</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">
                        <reactive-prop-page />
                    </p>
                </div>
            </div>
            <div class="card text-dark bg-light mt-3">
                <div class="card-header">Chart #2</div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">
                        <reactive-prop-page2 />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>