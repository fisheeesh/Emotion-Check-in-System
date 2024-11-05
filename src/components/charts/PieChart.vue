<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <h4 class="fw-bold">Today Check-in</h4>
            <canvas id="myChart" class="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
export default {
    mounted() {
        const ctx = document.getElementById('myChart');
        const data = {
            labels: [
                'On Time',
                'Absence'
            ],
            datasets: [{
                label: 'Percentage',
                data: [80, 20],
                backgroundColor: [
                    '#BAEDBD',
                    '#FB9F9F'
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const dataset = tooltipItem.dataset;
                                const total = dataset.data.reduce((a, b) => a + b, 0);
                                const currentValue = dataset.data[tooltipItem.dataIndex];
                                const percentage = ((currentValue / total) * 100).toFixed(2);
                                return `${tooltipItem.label}: ${percentage}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}
</script>

<style>
.chartCanvas {
    width: 100%;
    height: 370px !important;
}
</style>