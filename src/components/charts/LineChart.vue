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
        const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const data = {
            labels: labels,
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
                    title: { // Chart title
                        display: true,
                        text: 'Mood Data Analytic Statistics(Weekly)', // Title text
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        color: '#333' // Title color
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