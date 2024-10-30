<template>
    <div class="card border-0 shadow-sm px-3 rounded-4 bg-light">
        <div class="card-body">
            <canvas id="myChart" class="chart-canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
export default {
    mounted() {
        const ctx = document.getElementById('myChart');
        const labels = ['2020', '2021', '2022', '2023', '2024'];
        const data = {
            labels: labels,
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
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    tooltip: {
                        enabled: true,
                        mode: 'nearest',
                        intersect: false
                    },
                    title: {
                        display: true,
                        text: 'Mood Data Analytic Statistics (Yearly)',
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        color: '#333'
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
}
</script>

<style>
.chart-canvas {
    width: 100%;
    height: 300px !important;
}
</style>