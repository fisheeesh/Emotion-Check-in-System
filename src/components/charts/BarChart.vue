<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <div class="card-body pt-5 d-flex flex-column justify-content-center align-items-center">
            <canvas id="myChartt" class="chart-canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
    mounted() {
        const ctx = document.getElementById('myChartt');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Human Resources', 'Customer Support', 'Quality Assurance', 'IT', 'Sales', 'Finance', 'Marketing', 'Public Relations'],
                datasets: [{
                    label: 'OnTime',
                    data: [4, 15, 17, 19, 12, 22, 11, 23],
                    backgroundColor: [
                        'rgb(76, 175, 80, 1)',
                        'rgb(76, 175, 80, 1)',
                        'rgb(76, 175, 80, 1)',
                        'rgb(76, 175, 80, 1)',
                        'rgb(76, 175, 80, 1)',
                        'rgb(76, 175, 80, 1)',
                        'rgb(76, 175, 80, 1)',
                        'rgb(76, 175, 80, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Late',
                    data: [2, 4, 2, 1, 2, 3, 4, 6],
                    backgroundColor: [
                        'rgb(255, 205, 86, 1)',
                        'rgb(255, 205, 86, 1)',
                        'rgb(255, 205, 86, 1)',
                        'rgb(255, 205, 86, 1)',
                        'rgb(255, 205, 86, 1)',
                        'rgb(255, 205, 86, 1)',
                        'rgb(255, 205, 86, 1)',
                        'rgb(255, 205, 86, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Absence',
                    data: [0, 1, 1, 0, 1, 0, 0, 1],
                    backgroundColor: [
                        'rgb(255, 0, 0, 1)',
                        'rgb(255, 0, 0, 1)',
                        'rgb(255, 0, 0, 1)',
                        'rgb(255, 0, 0, 1)',
                        'rgb(255, 0, 0, 1)',
                        'rgb(255, 0, 0, 1)',
                        'rgb(255, 0, 0, 1)',
                        'rgb(255, 0, 0, 1)',
                    ],
                    borderWidth: 1
                }
                ]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Daily Check-in of Each Department',
                        font: {
                            size: 18
                        },
                        padding: {
                            bottom: 20
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Departments'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Number of Employees'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
</script>

<style></style>