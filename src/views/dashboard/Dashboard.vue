<template>
    <section>
        <div v-if="loading" class="d-flex justify-content-center align-items-center mt-8">
            <Spinner />
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
export default {
    components: {
        GreetCard,
        WarningCard,
        LineChart,
        OverviewCard,
        FilterNav,
        Spinner
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
                        data: [350, 800, 1150, 1800, 2500],
                        fill: false,
                        borderColor: 'rgb(76, 175, 80, 1)',
                        tension: 0
                    },
                    {
                        label: 'Neutral',
                        data: [100, 130, 400, 500, 600],
                        fill: false,
                        borderColor: '#FFEB9E',
                        tension: 0
                    },
                    {
                        label: 'Negative',
                        data: [50, 70, 110, 150, 180],
                        fill: false,
                        borderColor: '#FF3B30',
                        tension: 0
                    }
                ]
            },
            {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [1000, 1200, 1500, 2000, 2500, 3000, 3200, 3500, 3700, 4000],
                        fill: false,
                        borderColor: 'rgb(76, 175, 80, 1)',
                        tension: 0
                    },
                    {
                        label: 'Neutral',
                        data: [300, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000],
                        fill: false,
                        borderColor: '#FFCE3F',
                        tension: 0
                    },
                    {
                        label: 'Negative',
                        data: [150, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                        fill: false,
                        borderColor: '#FF3B30',
                        tension: 0
                    }
                ]
            },
            {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [4000, 5000, 5200, 5600],
                        fill: false,
                        borderColor: 'rgb(76, 175, 80, 1)',
                        tension: 0
                    },
                    {
                        label: 'Neutral',
                        data: [1200, 1300, 1400, 1500],
                        fill: false,
                        borderColor: '#FFCE3F',
                        tension: 0
                    },
                    {
                        label: 'Negative',
                        data: [600, 550, 500, 450],
                        fill: false,
                        borderColor: '#FF3B30',
                        tension: 0
                    }
                ]
            }
        ]

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