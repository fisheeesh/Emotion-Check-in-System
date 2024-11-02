<template>
    <section>
        <div v-if="loading" class="d-flex justify-content-center align-items-center mt-8">
            <Spinner />
        </div>
        <div v-else class="container-fluid pb-5 gg">
            <div class="row my-4 align-items-stretch">
                <div class="col-md-4 mb-2">
                    <PieChart />
                </div>
                <div class="col-md-8">
                    <BarChart />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <h4 class="fw-bold mb-3">Leaderboards</h4>
                    <div class="container p-3 shadow-sm rounded-4 bg-light empCon vstack gap-2">
                        <EmployeeCard v-for="(user, index) in rnkUsers.slice(0, 5)" :key="index" :name="user.name"
                            :profile-pic="user.profilePic" :score="user.score" :rank="index + 1" />
                    </div>
                </div>
                <div class="col-md-6 hover">
                    <div class="d-flex justify-content-between align-items-center me-3">
                        <h4 class="fw-bold mb-3">Check-ins</h4>
                        <h6 clas="view" data-bs-toggle="modal" data-bs-target="#viewAll">View All</h6>
                    </div>
                    <div class="container p-3 shadow-sm rounded-4 bg-light empCon vstack gap-2">
                        <div class="row">
                            <div class="col-12">
                                <CurrentCard v-for="(user, index) in users.slice(0, 6)" :key="index" :name="user.name"
                                    :department="user.department" :profilePic="user.profilePic"
                                    :timestamp="user.timestamp" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div id="viewAll" class="modal fade">
            <div class="modal-dialog modal-md">
                <div class="modal-content p-5 bg-light border-0 rounded-5">
                    <div class="modal-header">
                        <h5 class="modal-title">Current Check-in Employees</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div style="max-height: 300px; overflow-y: auto;">
                            <CurrentCard v-for="(user, index) in users" :key="index" :name="user.name"
                                :department="user.department" :profilePic="user.profilePic"
                                :timestamp="user.timestamp" />
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
import CurrentCard from '@/components/check-in/CurrentCard.vue';
import EmployeeCard from '@/components/check-in/EmployeeCard.vue';
import Spinner from '@/components/placeholder/Spinner.vue';
import { computed, onMounted, ref } from 'vue';
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

        let users = ref([
            {
                name: 'Swan Yi Phyo',
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
                timestamp: 11,
                score: 2980
            },
            {
                name: 'Viviana',
                department: 'Marketing',
                profilePic: 'https://randomuser.me/api/portraits/women/18.jpg',
                timestamp: 12,
                score: 2900
            },
            {
                name: 'Zarni Tun',
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
                timestamp: 19,
                score: 1800
            },
            {
                name: "Nay Ye' Linn",
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/21.jpg',
                timestamp: 20,
                score: 2000
            },
            {
                name: "Min Thuta",
                department: 'PR',
                profilePic: 'https://randomuser.me/api/portraits/men/31.jpg',
                timestamp: 20,
                score: 900
            },
            {
                name: "Phyoe Than Htike",
                department: 'Sales',
                profilePic: 'https://randomuser.me/api/portraits/men/22.jpg',
                timestamp: 15,
                score: 1500
            },
            {
                name: "Phyoe Thuta",
                department: 'CS',
                profilePic: 'https://randomuser.me/api/portraits/men/23.jpg',
                timestamp: 21,
                score: 2000
            },
            {
                name: "Justin",
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/20.jpg',
                timestamp: 13,
                score: 1800
            },
            {
                name: "Aung Ko Hein",
                department: 'Finance',
                profilePic: 'https://randomuser.me/api/portraits/men/25.jpg',
                timestamp: 13,
                score: 1050
            },
            {
                name: "Rose",
                department: 'HR',
                profilePic: 'https://randomuser.me/api/portraits/women/20.jpg',
                timestamp: 31,
                score: 1400
            },
            {
                name: "Carelo",
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/19.jpg',
                timestamp: 30,
                score: 1200
            },
            {
                name: "John Doe",
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/15.jpg',
                timestamp: 22,
                score: 1100
            },
            {
                name: "Miss Smith",
                department: 'HR',
                profilePic: 'https://randomuser.me/api/portraits/women/20.jpg',
                timestamp: 17,
                score: 1600
            },
            {
                name: 'Kaung Htut Hlaing',
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/6.jpg',
                timestamp: 15,
                score: 2800
            },
            {
                name: 'Khun Shine Sithu',
                department: 'QA',
                profilePic: 'https://randomuser.me/api/portraits/men/7.jpg',
                timestamp: 20,
                score: 1000
            },
            {
                name: 'Win Myint Kyaw',
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/9.jpg',
                timestamp: 20,
                score: 2600
            },
            {
                name: 'Myat Thu Kyaw',
                department: 'IT',
                profilePic: 'https://randomuser.me/api/portraits/men/8.jpg',
                timestamp: 18,
                score: 2700
            }
        ])

        let rnkUsers = computed(() => [...users.value].sort((a, b) => b.score - a.score))

        onMounted(() => setTimeout(() => loading.value = false, 800))

        return { loading, users, rnkUsers }
    }
}
</script>

<style>
</style>