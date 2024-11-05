<template>
    <div class="card border-0 shadow-sm rounded-4 bg-light">
        <div style="padding-bottom: 20px;"
            class="card-body pt-5 d-flex flex-column justify-content-center align-items-center">
            <canvas id="myChartt" class="chartCanvas"></canvas>
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
                datasets: [
                    {
                        label: 'OnTime',
                        data: [3, 15, 17, 19, 12, 22, 11, 23],
                        backgroundColor: '#BAEDBD',
                        borderRadius: 5,      // Apply rounded corners
                        borderSkipped: false  // Enable rounded corners on all sides
                    },
                    {
                        label: 'Absence',
                        data: [0, 2, 2, 0, 2, 0, 0, 3],
                        backgroundColor: '#FB9F9F',
                        borderRadius: 5,      // Apply rounded corners
                        borderSkipped: false  // Enable rounded corners on all sides
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                        }
                    },
                    title: {
                        display: true,
                        text: 'Daily Check-in of Each Department',
                        font: {
                            size: 24
                        },
                        padding: {
                            bottom: 20
                        },
                        color: '#000000'
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false // Hide all x-axis grid lines
                        },
                        title: {
                            display: true,
                            text: 'Departments',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        border: {
                            display: false, // Hide x-axis line
                            color: 'transparent'
                        }
                    },
                    y: {
                        // grid: {
                        //     display: false // Hide all y-axis grid lines
                        // },
                        title: {
                            display: true,
                            text: 'Number of Employees',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: {
                                bottom: 10
                            }
                        },
                        beginAtZero: true,
                        border: {
                            display: false, // Hide y-axis line
                            color: 'transparent'
                        }
                    }
                }
            }
        });
    }
}
</script>

<style></style>