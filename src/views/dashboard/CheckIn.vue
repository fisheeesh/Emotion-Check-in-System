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
                <div class="col-md-7 mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="fw-bold ms-2">Leaderboards</h4>
                        <div class="dropdown">
                            <button style="width: 140px"
                                class="d-flex justify-content-between align-items-center btn btn-lg btn-primary text-white dropdown-toggle"
                                id="dropdownMenuBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Overall
                            </button>
                            <ul class="dropdown-menu">
                                <li @click="filterDep(d)" v-for="(d, index) in uniqueDep" :key="index"><span
                                        class="dropdown-item" href="#">{{ d
                                        }}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="container p-3 shadow-sm rounded-4 bg-light empCon vstack gap-2">
                        <EmployeeCard v-for="(user, index) in filterDepEmp.slice(0, 5)" :key="index" :name="user.name"
                            :profile-pic="user.profilePic" :score="user.score" :rank="index + 1"
                            :department="user.department" />
                    </div>
                </div>
                <div class="col-md-5 syp">
                    <div class="d-flex justify-content-between align-items-center me-3" style="margin-bottom: 20px">
                        <h4 class="fw-bold mb-3">Check-ins</h4>
                        <h6 class="view hover-text" data-bs-toggle="modal" data-bs-target="#viewAll"
                            style="cursor: pointer; color: grey;">View All</h6>
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
        const allDep = ref([])
        const current = ref('Overall')

        let users = ref([
            // IT Department
            { name: 'Swan Yi Phyo', department: 'IT', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', timestamp: 11, score: 2980 },
            { name: 'Zarni Tun', department: 'IT', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg', timestamp: 19, score: 1800 },
            { name: "Nay Ye' Linn", department: 'IT', profilePic: 'https://randomuser.me/api/portraits/men/21.jpg', timestamp: 20, score: 2000 },
            { name: "Justin", department: 'IT', profilePic: 'https://randomuser.me/api/portraits/men/20.jpg', timestamp: 13, score: 1800 },
            { name: 'Kaung Htut Hlaing', department: 'IT', profilePic: 'https://randomuser.me/api/portraits/men/6.jpg', timestamp: 15, score: 2800 },
            { name: 'Myat Thu Kyaw', department: 'IT', profilePic: 'https://randomuser.me/api/portraits/men/8.jpg', timestamp: 18, score: 2700 },

            // Marketing Department
            { name: 'Viviana', department: 'Marketing', profilePic: 'https://randomuser.me/api/portraits/women/18.jpg', timestamp: 12, score: 2900 },
            { name: 'Lisa Park', department: 'Marketing', profilePic: 'https://randomuser.me/api/portraits/women/21.jpg', timestamp: 10, score: 2600 },
            { name: 'Daniel White', department: 'Marketing', profilePic: 'https://randomuser.me/api/portraits/men/28.jpg', timestamp: 14, score: 2450 },
            { name: 'Emily Rose', department: 'Marketing', profilePic: 'https://randomuser.me/api/portraits/women/26.jpg', timestamp: 18, score: 2800 },
            { name: 'Carlos Perez', department: 'Marketing', profilePic: 'https://randomuser.me/api/portraits/men/24.jpg', timestamp: 17, score: 1900 },
            { name: 'Sofia Laurent', department: 'Marketing', profilePic: 'https://randomuser.me/api/portraits/women/27.jpg', timestamp: 13, score: 2200 },

            // HR Department
            { name: "Rose", department: 'HR', profilePic: 'https://randomuser.me/api/portraits/women/20.jpg', timestamp: 31, score: 1400 },
            { name: "Miss Smith", department: 'HR', profilePic: 'https://randomuser.me/api/portraits/women/22.jpg', timestamp: 17, score: 1600 },
            { name: 'John Miller', department: 'HR', profilePic: 'https://randomuser.me/api/portraits/men/29.jpg', timestamp: 19, score: 1700 },
            { name: 'Jane Doe', department: 'HR', profilePic: 'https://randomuser.me/api/portraits/women/30.jpg', timestamp: 21, score: 2100 },
            { name: 'Sarah Lee', department: 'HR', profilePic: 'https://randomuser.me/api/portraits/women/23.jpg', timestamp: 14, score: 2500 },
            { name: 'Timothy Chang', department: 'HR', profilePic: 'https://randomuser.me/api/portraits/men/31.jpg', timestamp: 23, score: 1800 },

            // Sales Department
            { name: "Phyoe Than Htike", department: 'Sales', profilePic: 'https://randomuser.me/api/portraits/men/22.jpg', timestamp: 15, score: 1500 },
            { name: 'Maria Gonzales', department: 'Sales', profilePic: 'https://randomuser.me/api/portraits/women/25.jpg', timestamp: 18, score: 2200 },
            { name: 'Samuel Brown', department: 'Sales', profilePic: 'https://randomuser.me/api/portraits/men/33.jpg', timestamp: 20, score: 1700 },
            { name: 'Linda Kim', department: 'Sales', profilePic: 'https://randomuser.me/api/portraits/women/24.jpg', timestamp: 11, score: 2400 },
            { name: 'Oliver Smith', department: 'Sales', profilePic: 'https://randomuser.me/api/portraits/men/34.jpg', timestamp: 22, score: 2050 },
            { name: 'Emma Watson', department: 'Sales', profilePic: 'https://randomuser.me/api/portraits/women/29.jpg', timestamp: 19, score: 2100 },

            // Finance Department
            { name: "Aung Ko Hein", department: 'Finance', profilePic: 'https://randomuser.me/api/portraits/men/25.jpg', timestamp: 13, score: 1050 },
            { name: 'Claire Thompson', department: 'Finance', profilePic: 'https://randomuser.me/api/portraits/women/31.jpg', timestamp: 17, score: 1350 },
            { name: 'Michael Lee', department: 'Finance', profilePic: 'https://randomuser.me/api/portraits/men/35.jpg', timestamp: 20, score: 1200 },
            { name: 'Jessica Long', department: 'Finance', profilePic: 'https://randomuser.me/api/portraits/women/32.jpg', timestamp: 15, score: 1550 },
            { name: 'Mark Brown', department: 'Finance', profilePic: 'https://randomuser.me/api/portraits/men/26.jpg', timestamp: 18, score: 1700 },
            { name: 'Susan Green', department: 'Finance', profilePic: 'https://randomuser.me/api/portraits/women/33.jpg', timestamp: 16, score: 1650 },

            // CS Department
            { name: "Phyoe Thuta", department: 'CS', profilePic: 'https://randomuser.me/api/portraits/men/23.jpg', timestamp: 21, score: 2000 },
            { name: 'Hannah Wilson', department: 'CS', profilePic: 'https://randomuser.me/api/portraits/women/34.jpg', timestamp: 19, score: 1800 },
            { name: 'Chris Johnson', department: 'CS', profilePic: 'https://randomuser.me/api/portraits/men/36.jpg', timestamp: 22, score: 1700 },
            { name: 'Jessica Black', department: 'CS', profilePic: 'https://randomuser.me/api/portraits/women/35.jpg', timestamp: 23, score: 1950 },
            { name: 'Daniel Carter', department: 'CS', profilePic: 'https://randomuser.me/api/portraits/men/37.jpg', timestamp: 21, score: 2100 },
            { name: 'Rebecca Scott', department: 'CS', profilePic: 'https://randomuser.me/api/portraits/women/36.jpg', timestamp: 18, score: 2300 },

            // QA Department
            { name: 'Khun Shine Sithu', department: 'QA', profilePic: 'https://randomuser.me/api/portraits/men/7.jpg', timestamp: 20, score: 1000 },
            { name: 'Lucas Hernandez', department: 'QA', profilePic: 'https://randomuser.me/api/portraits/men/38.jpg', timestamp: 23, score: 1500 },
            { name: 'Nina Brown', department: 'QA', profilePic: 'https://randomuser.me/api/portraits/women/37.jpg', timestamp: 18, score: 1700 },
            { name: 'Sophia Garcia', department: 'QA', profilePic: 'https://randomuser.me/api/portraits/women/38.jpg', timestamp: 21, score: 1400 },
            { name: 'Aaron Clark', department: 'QA', profilePic: 'https://randomuser.me/api/portraits/men/39.jpg', timestamp: 19, score: 1350 },
            { name: 'Emily Foster', department: 'QA', profilePic: 'https://randomuser.me/api/portraits/women/39.jpg', timestamp: 20, score: 1600 },

            // PR Department
            { name: "Min Thuta", department: 'PR', profilePic: 'https://randomuser.me/api/portraits/men/31.jpg', timestamp: 20, score: 900 },
            { name: 'Helen Martinez', department: 'PR', profilePic: 'https://randomuser.me/api/portraits/women/40.jpg', timestamp: 17, score: 1300 },
            { name: 'Paul Harris', department: 'PR', profilePic: 'https://randomuser.me/api/portraits/men/41.jpg', timestamp: 22, score: 1200 },
            { name: 'Grace Young', department: 'PR', profilePic: 'https://randomuser.me/api/portraits/women/41.jpg', timestamp: 23, score: 1450 },
            { name: 'Benjamin Cook', department: 'PR', profilePic: 'https://randomuser.me/api/portraits/men/42.jpg', timestamp: 18, score: 1600 },
            { name: 'Amy Foster', department: 'PR', profilePic: 'https://randomuser.me/api/portraits/women/42.jpg', timestamp: 19, score: 1400 },
        ]);

        let rnkUsers = computed(() => [...users.value].sort((a, b) => b.score - a.score))

        const filterDepEmp = computed(() => {
            if (current.value === 'Overall') return rnkUsers.value
            else {
                return users.value.filter(user => {
                    return user.department === current.value
                })
            }
        })

        users.value.forEach(user => {
            allDep.value.push(user.department)
        })

        const uniqueDep = computed(() => {
            return allDep.value.filter((dep, index, array) => {
                return array.indexOf(dep) === index
            })
        })

        const filterDep = (dep) => {
            console.log(dep)
            document.getElementById('dropdownMenuBtn').textContent = dep
            current.value = dep
            console.log(current.value)
            console.log(filterDepEmp.value)
        }

        onMounted(() => {
            setTimeout(() => loading.value = false, 800)
            console.log(allDep.value)
            uniqueDep.value.unshift('Overall')
            console.log(uniqueDep.value)
        })

        return { loading, users, rnkUsers, uniqueDep, filterDep, current, filterDepEmp }
    }
}
</script>

<style>

</style>