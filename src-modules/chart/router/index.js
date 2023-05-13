import Home from '../views/home'
import BarChart from '../views/barChart'
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
  },
]
export default routes 