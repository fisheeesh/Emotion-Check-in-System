<template>
    <section>
        <div v-if="loading" class="d-flex justify-content-center align-items-center mt-8 pt-6">
            <PulseLoader :color="'#3085fe'" />
        </div>
        <div v-else class="container-fluid">
            <FilterNav :current="current" @filterBy="current = $event" />
            <div class="row align-items-stretch">
                <div class="col-md-5 mb-2">
                    <GreetCard />
                </div>
                <div class="col-md-7">
                    <WarningCard />
                </div>
            </div>
            <div class="row my-4 align-items-stretch">
                <div class="col-md-5 mb-2">
                    <div v-if="current === 'Weekly'">
                        <OverviewCard :title="current" positive="95" neutral="4" negative="1" />
                    </div>
                    <div v-if="current === 'Monthly'">
                        <OverviewCard :title="current" positive="90" neutral="9" negative="1" />
                    </div>
                    <div v-if="current === 'Yearly'">
                        <OverviewCard :title="current" positive="88" neutral="7" negative="5" />
                    </div>
                </div>
                <div class="col-md-7">
                    <div v-if="current === 'Weekly'">
                        <LineChart :title="current" :chartDatas="chartDatas[0]" />
                    </div>
                    <div v-if="current === 'Monthly'">
                        <LineChart :title="current" :chartDatas="chartDatas[1]" />
                    </div>
                    <div v-if="current === 'Yearly'">
                        <LineChart :title="current" :chartDatas="chartDatas[2]" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import FilterNav from '@/components/dashboard/FilterNav.vue';
import GreetCard from '@/components/dashboard/GreetCard.vue';
import OverviewCard from '@/components/dashboard/OverviewCard.vue';
import WarningCard from '@/components/dashboard/WarningCard.vue';
import Spinner from '@/components/placeholder/Spinner.vue';
import { onMounted, ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
    components: {
        GreetCard,
        WarningCard,
        LineChart,
        OverviewCard,
        FilterNav,
        Spinner,
        PulseLoader
    },
    setup() {
        let current = ref('Weekly')
        let loading = ref(true)

        let chartDatas = [
            {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [0.1, 0.3, 0.5, 0.4],
                        fill: false,
                        borderColor: '#BAEDBD', // light green for Positive
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Neutral',
                        data: [0, 0, 0, 0],
                        fill: false,
                        borderColor: '#FFBF76', // neutral color
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Negative',
                        data: [-0.2, -0.1, -0.3, -0.2],
                        fill: false,
                        borderColor: '#FB9F9F', // light red for Negative
                        borderWidth: 2,
                        tension: 0.4
                    }
                ]
            },
            {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [0.6, 0.5, 0.7, 0.6, 0.8, 0.7, 0.9, 0.8, 0.7, 0.6],
                        fill: false,
                        borderColor: '#BAEDBD', // light green for Positive
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Neutral',
                        data: [0.2, 0.3, 0.1, 0.2, 0.1, 0.2, 0.1, 0.2, 0.1, 0.3],
                        fill: false,
                        borderColor: '#FFBF76', // neutral color
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Negative',
                        data: [-0.4, -0.2, -0.3, -0.4, -0.2, -0.3, -0.1, -0.2, -0.3, -0.4],
                        fill: false,
                        borderColor: '#FB9F9F', // light red for Negative
                        borderWidth: 2,
                        tension: 0.4
                    }
                ]
            },
            {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [0.6, 0.7, 0.8, 0.7],
                        fill: false,
                        borderColor: '#BAEDBD', // light green for Positive
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Neutral',
                        data: [0.3, 0.1, 0.2, 0.3],
                        fill: false,
                        borderColor: '#FFBF76', // neutral color
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Negative',
                        data: [-0.1, -0.2, -0.1, -0.3],
                        fill: false,
                        borderColor: '#FB9F9F', // light red for Negative
                        borderWidth: 2,
                        tension: 0.4
                    }
                ]
            }
            // Add similar structures for Monthly and Yearly data if needed
        ];

        onMounted(() => {
            setTimeout(() => {
                loading.value = false
            }, 800)
        })

        return { current, loading, chartDatas }
    }
}
</script>

<style scoped></style>