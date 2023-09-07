import Home from '../views/home'
import BarChart from '../views/barChart'
import LineChart from '../views/lineChart'
import PieChart from '../views/pieChart'
import MapChart from '../views/mapChart'
import GuageChart from '../views/guageChart'
const routes = [
  {
    path: '/chart/home', component: Home
  },{
    path: '/chart/bar-chart', component: BarChart
  },{
    path: '/chart/map-chart', component: MapChart
  },{
    path: '/chart/guage-chart', component: GuageChart
  },{
    path: '/chart/line-chart', component: LineChart
  },{
    path: '/chart/pie-chart', component: PieChart
  },
]
export default routes 