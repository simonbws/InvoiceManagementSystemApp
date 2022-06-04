import ReactiveDoughnutChart from './ReactiveDoughnutChart'
import DBM from '../db'

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
  name: 'ReactiveChart1',
  components: {
    ReactiveDoughnutChart
  },
  setup() {
    const chartData = ref<ChartData<'doughnut'>>({
      datasets: []
    })

    function fillData() {
      const updatedChartData = {
        labels: DBM.divisionLabels,
        datasets: [
          {
            label: 'Dostawcy',
            backgroundColor: ['#1982c4', '#6a4c93', '#8ac926', '#ffca3a', '#ff595e', '#ffca3a', '#8ac926',],
            data: DBM.divisionValues
          }
        ]
      }
      chartData.value = { ...updatedChartData }
    }

    onMounted(() => {
      fillData();
      DBM.getStatisticsDivision('supplier_name', fillData)
    })

    return () =>
      h(ReactiveDoughnutChart, {
        chartData: chartData.value
      })
  }
})
