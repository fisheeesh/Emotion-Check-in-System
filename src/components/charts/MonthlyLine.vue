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
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const data = {
            labels: labels,
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
                        text: 'Mood Data Analytic Statistics (Monthly)',
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
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Count'
                        },
                        beginAtZero: true
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
}
</script>

<style>
</style>