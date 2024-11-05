<template>
    <div class="card border-0 shadow-sm px-3 rounded-4 bg-light">
        <div class="card-body d-flex justify-content-center align-items-center">
            <canvas id="myChart" class="chart-canvas"></canvas>
        </div>
    </div>
</template>

<script>
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
            const data = {
                labels: props.chartDatas.labels,
                datasets: props.chartDatas.datasets
            };

            const config = {
                type: 'line',
                data: data,
                options: {
                    plugins: {
                        tooltip: {
                            enabled: true,
                            mode: 'index', // Show tooltip for the nearest x-axis point
                            intersect: false // Show tooltip across the entire vertical line
                        },
                        title: {
                            display: true,
                            text: `Mood Data Analytic Statistics (${props.title})`,
                            padding: {
                                top: 10,
                                bottom: 10
                            },
                            font: {
                                size: 18,
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
                                usePointStyle: true,
                                pointStyle: 'line'
                            }
                        }
                    },
                    elements: {
                        line: {
                            tension: 0.4,
                            borderWidth: 2
                        },
                        point: {
                            radius: 0 // Hide points
                        }
                    },
                    interaction: {
                        mode: 'index', // Ensure that the vertical line shows across the chart on hover
                        intersect: false // Do not limit the hover effect to the points only
                    },
                    scales: {
                        y: {
                            min: -1,
                            max: 1,
                            ticks: {
                                stepSize: 1
                            },
                            grid: {
                                display: false // Hide all y-axis grid lines
                            },
                            border: {
                                display: true,
                                color: '#aaa'
                            }
                        },
                        x: {
                            // grid: {
                            //     display: false // Hide x-axis grid lines
                            // },
                            border: {
                                display: true,
                                color: '#aaa'
                            }
                        }
                    }
                }
            };

            new Chart(ctx, config);
        });
    }
};
</script>

<style></style>