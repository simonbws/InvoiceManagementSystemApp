<template>
    <slot>
        <div class="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading">Menu </div>
            <div class="list-group list-group-flush">
                <router-link :to="{ name: 'InvoicesView' }" custom v-slot="{ navigate }">
                    <div role="link" @click="navigate" class="list-group-item change-view active"
                        change-view="invoices">Faktury
                    </div>
                </router-link>
                <router-link :to="{ name: 'ScheduleView' }" custom v-slot="{ navigate }">
                    <div role="link" @click="navigate" class="list-group-item change-view" change-view="schedule">
                        Harmonogram
                    </div>
                </router-link>
                <router-link :to="{ name: 'ChartsView' }" custom v-slot="{ navigate }">
                    <div role="link" @click="navigate" class="list-group-item change-view" change-view="statistics">
                        Statystyki
                    </div>
                </router-link>
            </div>
        </div>
    </slot>
</template>