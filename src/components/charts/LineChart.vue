<template>
    <div class="card border-0 shadow-sm px-3 rounded-4 bg-light">
        <div class="card-body d-flex justify-content-center align-items-center">
            <canvas id="myChart" class="chart-canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { Margin } from '@syncfusion/ej2-vue-charts';
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        chartDatas: {
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
                            text: `Mood Data Analytic Statistics (${props.title})`,
                            padding: {
                                top: 10,
                                bottom: 10
                            },
                            font: {
                                size: 24,
                                weight: 'bold'
                            },
                            color: '#333'
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                usePointStyle: true, // Use line instead of a rectangle in the legend
                                pointStyle: 'line' // Sets the legend symbol to a line
                            }
                        }
                    },
                    elements: {
                        line: {
                            tension: 0, // Set this if you want straight lines
                            borderWidth: 2 // This will set the thickness of the line in the legend
                        }
                    }
                }
            };

            // Ensure each dataset has a defined border width in chartDatas:
            props.chartDatas.datasets.forEach(dataset => {
                dataset.borderWidth = 3; // Adjust to desired thickness
            });

            new Chart(ctx, config);
        })
    },
}
</script>

<style></style>