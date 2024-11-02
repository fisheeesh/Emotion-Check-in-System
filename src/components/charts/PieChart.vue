<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <h5 class="fw-bold">Today Check-in</h5>
            <canvas id="myChart" class="chart-canvas"></canvas>
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
                    'rgb(76, 175, 80)',
                    'rgb(255, 0,0)'
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                plugins: {
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

<style></style>