import ReactivePropChart from './reactivePropChart'

import { defineComponent, ref, h, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
  ChartData,
  DefaultDataPoint
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'ReactiveChart',
  components: {
    ReactivePropChart
  },
  setup() {
    const chartData = ref<ChartData<'doughnut'>>({
      datasets: []
    })

    function fillData() {
      const updatedChartData = {
        labels: [
          'January' + getRandomInt(),
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt(),
              getRandomInt()
            ]
          }
        ]
      }

      chartData.value = { ...updatedChartData }
    }

    function getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }

    onMounted(() => {
      fillData()
      setInterval(() => {
        fillData()
      }, 5000)
    })

    return () =>
      h(ReactivePropChart, {
        chartData: chartData.value
      })
  }
})
