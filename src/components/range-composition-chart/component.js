import styles from 'components/range-composition-chart/styles'
import * as d3 from 'd3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

const handStrengths = ['Quads', 'Full House', 'Flush', 'Straight', 'Trips', 'Two Pair', 'Pair', 'Overcards']
const data = [0.01, 0.2, 0.4, 0.17, 0.147, 0.75, 0.25, 0.13]

class RangeCompositionChart extends Component {

  constructor(props) {
    super(props)

    this.setChartContainerRef = this.setChartContainerRef.bind(this)
  }

  componentDidMount() {
    const margin = {
      top: 16,
      right: 16,
      bottom: 16,
      left: 64
    }
    const rect = this.chartContainerRef.getBoundingClientRect()
    const height = 400 - (margin.top + margin.bottom)
    const width = rect.width - (margin.left + margin.right)
    const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width])
    const y = d3.scaleBand()
      .domain(handStrengths)
      .range([0, height])  

    this.chart = d3.select(this.chartContainerRef).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.chart.append('g')
      .call(d3.axisLeft(y).tickSize(0))
  }

  render() {
    return (
      <Paper> 
        <Typography variant="h6">
          Range Composition
        </Typography>
        <div className={this.props.classes.chart} ref={this.setChartContainerRef} />
      </Paper>
    ) 
  }

  setChartContainerRef(node) {
    this.chartContainerRef = node
  }
}

export default injectSheet(styles)(RangeCompositionChart)