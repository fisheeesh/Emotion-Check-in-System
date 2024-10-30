<template>
    <div class="card h-100"> <!-- Added h-100 class -->
        <div class="card-body">
            <canvas id="myCharttt" class="chart-canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
export default {
    mounted() {
        const ctx = document.getElementById('myCharttt');
        const data = {
            labels: [
                'Red',
                'Green',
                'Yellow',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [11, 16, 7],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)'
                ]
            }]
        };
        const config = {
            type: 'polarArea',
            data: data,
            options: {}
        };
        new Chart(ctx, config);
    }
}
</script>

<style></style>