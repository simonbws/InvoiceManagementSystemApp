import ReactivePropChart from './reactivePropChart'
import DBM from '../db'

import { defineComponent, ref, h, onMounted, onUpdated } from 'vue'
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
  name: 'ReactiveChart2',
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
          'Zaakceptowane',
          'Oczekujące'
        ],
        datasets: [
          {
            label: 'Statusy',
            backgroundColor: ['#8ac926', '#ffca3a'], // ff595e ffca3a 8ac926 1982c4 6a4c93
            data: DBM.statuses
          }
        ]
      }

      chartData.value = { ...updatedChartData }
    }

    function getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }

    onMounted(() => {
      fillData();
      DBM.getStatisticsAcceptedAndNot(fillData)
    })

    return () =>
      h(ReactivePropChart, {
        chartData: chartData.value
      })
  }
})
