<template>
    <div class="card border-0 shadow-sm px-3 rounded-4 bg-light">
        <div class="card-body">
            <canvas id="myChart" class="chart-canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
export default {
    props: {
        title : {
            type: String,
            required: true
        },
        chartDatas : {
            type: Object,
            required: true
        }
    },
    setup(props) {
        onMounted(() => {
            const ctx = document.getElementById('myChart');
            const labels = props.chartDatas.labels
            const data = {
                labels: labels,
                datasets: props.chartDatas.datasets
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
                            text: `Mood Data Analytic Statistics(${props.title})`, 
                            padding: {
                                top: 10,
                                bottom: 10
                            },
                            font: {
                                size: 22,
                                weight: 'bold'
                            },
                            color: '#333'
                        }
                    }
                }
            };

            new Chart(ctx, config);
        })
    },
}
</script>

<style></style>