<template>
    <section>
        <div v-if="loading" class="d-flex justify-content-center align-items-center mt-8">
            <Spinner />
        </div>
        <div v-else class="container-fluid pb-5">
            <div class="row my-4 align-items-stretch">
                <div class="col-md-4 mb-2">
                    <PieChart />
                </div>
                <div class="col-md-8">
                    <BarChart />
                </div>
            </div>
            <div class="row">
                <div class="col-md-7 mb-3">
                    <h4 class="fw-bold mb-3">Leaderboards</h4>
                    <div class="container p-3 shadow-sm rounded-4 bg-light empCon vstack gap-2">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div
                                            class="d-flex align-items-center justify-content-between flex-nowrap gap-4">
                                            <div class="d-flex align-items-center gap-5">
                                                <i class="fas fa-medal fa-2x text-warning"></i>
                                                <img src="https://randomuser.me/api/portraits/men/1.jpg" width="50"
                                                    class="rounded-circle" alt="">
                                            </div>
                                            <h3 class="fw-bold my-0 text-truncate"
                                                style="font-size: clamp(1rem, 1.5vw, 1.25rem);">Swan Yi Phyo
                                            </h3>
                                            <div class="d-flex align-items-center gap-2">
                                                <p class="mb-0 text-truncate"
                                                    style="font-size: clamp(0.875rem, 1vw, 1rem);">2980 Points</p>
                                                <i class="fas fa-fire text-warning fa-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-5">
                    <div class="d-flex justify-content-between align-items-center me-3">
                        <h4 class="fw-bold mb-3">Currently Check-ins</h4>
                        <h6 class="view" data-bs-toggle="modal" data-bs-target="#viewAll">View All</h6>
                    </div>
                    <div class="container p-3 shadow-sm rounded-4 bg-light empCon vstack gap-2">
                        <div class="row">
                            <div class="col-12">
                                <CurrentCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="viewAll" class="modal fade">
            <div class="modal-dialog modal-md">
                <div class="modal-content p-5 bg-light border-0 rounded-5">
                    <div class="modal-header">
                        <h5 class="modal-title">Current Check-in Employees</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div style="max-height: 300px; overflow-y: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BarChart from '@/components/charts/BarChart.vue';
import PieChart from '@/components/charts/PieChart.vue';
import CurrentCard from '@/components/dashboard/CurrentCard.vue';
import EmployeeCard from '@/components/dashboard/EmployeeCard.vue';
import Spinner from '@/components/placeholder/Spinner.vue';
import { onMounted, ref } from 'vue';
export default {
    components: {
        PieChart,
        BarChart,
        EmployeeCard,
        CurrentCard,
        Spinner
    },
    setup() {
        let loading = ref(true)

        onMounted(() => setTimeout(() => loading.value = false, 800))

        return { loading }
    }
}
</script>

<style>
.third {
    color: #CD7F32;
}

.fourth {
    color: #ef7e13;
}

.fifth {
    color: #A9A9A9;
}

.empCon {
    height: 250px;
    overflow-y: scroll;
}

.view {
    cursor: pointer;
    color: gray;
    transition: all 0.3s ease;
}

.view:hover {
    color: #00324E !important;
}

.dep {
    font-size: 14px;
    color: gray;
}
</style>