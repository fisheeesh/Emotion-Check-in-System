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
                        <OverviewCard :title="current" positive="95" neutral="4" negative="1"/>
                    </div>
                    <div v-if="current === 'Monthly'">
                        <OverviewCard :title="current" positive="90" neutral="9" negative="1"/>
                    </div>
                    <div v-if="current === 'Yearly'">
                        <OverviewCard :title="current" positive="88" neutral="7" negative="5"/>
                    </div>
                </div>
                <div class="col-md-7">
                    <LineChart />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import MonthlyLine from '@/components/charts/MonthlyLine.vue';
import YearlyLine from '@/components/charts/YearlyLine.vue';
import FilterNav from '@/components/dashboard/FilterNav.vue';
import GreetCard from '@/components/dashboard/GreetCard.vue';
import MonthlyOver from '@/components/dashboard/MonthlyOver.vue';
import OverviewCard from '@/components/dashboard/OverviewCard.vue';
import WarningCard from '@/components/dashboard/WarningCard.vue';
import YearlyOver from '@/components/dashboard/YearlyOver.vue';
import Spinner from '@/components/placeholder/Spinner.vue';
import { onMounted, ref } from 'vue';
export default {
    components: {
        GreetCard,
        WarningCard,
        LineChart,
        OverviewCard,
        FilterNav,
        MonthlyOver,
        YearlyOver,
        MonthlyLine,
        YearlyLine,
        Spinner
    },
    setup() {
        let current = ref('Weekly')
        let loading = ref(true)

        onMounted(() => {
            setTimeout(() => {
                loading.value = false
            }, 800)
        })

        return { current, loading }
    }
}
</script>

<style scoped></style>