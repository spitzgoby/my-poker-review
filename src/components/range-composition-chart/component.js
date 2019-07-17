import styles from 'components/range-composition-chart/styles'
import * as d3 from 'd3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

const data = [{
  name: 'Quads',
  value: 0.01
}, {
  name: 'Full House',
  value: 0.2
}, {
  name: 'Flush',
  value: 0.4
}, { 
  name: 'Straight',
  value: 0.17
}, {
  name: 'Trips',
  value: 0.147
}, {
  name: 'Two Pair',
  value: 0.75
}, {
  name: 'Pair',
  value: 0.25
}, {
  name: 'Overcards',
  value: 0.13
}]

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
      .domain(data.map((d) => d.name))
      .range([0, height])  

    this.chart = d3.select(this.chartContainerRef).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.chart.selectAll('.bar').data(data)
      .enter().append('rect')
      .attr('class', this.props.classes.bar)
      .attr('y', (d) => y(d.name) + 13)
      .attr('width', (d) => x(d.value))

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