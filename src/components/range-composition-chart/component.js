import styles from 'components/range-composition-chart/styles'
import * as d3 from 'd3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeCompositionChart extends Component {

  constructor(props) {
    super(props)

    this.setChartContainerRef = this.setChartContainerRef.bind(this)
  }

  static propTypes = {
    rangeComposition: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    }))
  }

  static defaultProps = {
    rangeComposition: []
  }

  componentDidMount() {
    const {
      classes,
      rangeComposition
    } = this.props
    const margin = {
      top: 16,
      right: 16,
      bottom: 16,
      left: 80
    }
    const rect = this.chartContainerRef.getBoundingClientRect()
    const height = 400 - (margin.top + margin.bottom)
    const width = rect.width - (margin.left + margin.right)
    const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width])
    const y = d3.scaleBand()
      .domain(rangeComposition.map((d) => d.name))
      .range([0, height])  

    this.chart = d3.select(this.chartContainerRef).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.chart.selectAll('.bar').data(rangeComposition)
      .enter().append('rect')
      .attr('class', classes.bar)
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

  drawChart() {

  }

  setChartContainerRef(node) {
    this.chartContainerRef = node
  }
}

export default injectSheet(styles)(RangeCompositionChart)