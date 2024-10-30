<template>
  <div class="container mt-4">
    <div class="row justify-content-start">
      <div class="col-md-8 col-lg-6">
        <div class="card">
          <div class="card-body">
            <canvas id="myChart" class="chart-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  mounted() {
    const ctx = document.getElementById('myChart');
    /**
     * ? Bar Chart
     */
    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.7)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     },
    //     {
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.7)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     maintainAspectRatio: false, // Keeps the chart responsive
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });

    /**
     * ?Pie Chart
     */
    // const data = {
    //   labels: [
    //     'OnTime',
    //     'Late',
    //     'Absence'
    //   ],
    //   datasets: [{
    //     label: 'Percentage',
    //     data: [400, 10, 50],
    //     backgroundColor: [
    //       'rgb(255, 99, 132)',
    //       'rgb(54, 162, 235)',
    //       'rgb(255, 205, 86)'
    //     ],
    //     hoverOffset: 4
    //   }]
    // };

    // new Chart(ctx,{
    //   type: 'pie',
    //   data : data
    // })

    /**
     * ? Line Chart
     */
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config = {
      type: 'line',
      data: data,
      options: {
        plugins: {
          tooltip: { // Enable tooltips on hover
            enabled: true,
            mode: 'nearest',
            intersect: false
          }
        },
        scales: {
          y: {
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
.chart-canvas {
  width: 100%;
  height: 400px !important;
}
</style>