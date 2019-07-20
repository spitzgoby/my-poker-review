import styles from 'components/range-composition-chart/styles'
import * as d3 from 'd3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'
import {rangeColors} from 'styles/colors'

class RangeCompositionChart extends Component {

  constructor(props) {
    super(props)

    this.handleBarMouseOver = this.handleBarMouseOver.bind(this)
    this.handleBarMouseOut = this.handleBarMouseOut.bind(this)
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
    this.drawChart()
    this.updateChart()
  }

  componentDidUpdate() {
    this.updateChart()
  }

  render() {
    const {
      classes,  
      selectedRange
    } = this.props

    return (
      <Paper className={classes.root}> 
        <Typography className={classes.title} variant="h6">
          Range Composition <span className={classes.rangename}>{selectedRange.name}</span>
        </Typography>
        <div className={classes.chart} ref={this.setChartContainerRef} />
      </Paper>
    ) 
  }

  drawChart() {
    const classes = this.props.classes
    const margin = {
      top: 0,
      right: 16,
      bottom: 16,
      left: 120
    }
    const rect = this.chartContainerRef.getBoundingClientRect()
    const height = 360 - (margin.top + margin.bottom)
    const width = rect.width - (margin.left + margin.right)
    this.x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width])
    this.y = d3.scaleBand()
      .domain(this.props.rangeComposition.map((d) => d.name))
      .range([0, height])  

    this.chart = d3.select(this.chartContainerRef).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.chart.append('g')
      .attr('class', classes.axis)
      .call(d3.axisLeft(this.y).tickSize(0))
      .select('.domain').remove() 
  }

  updateChart() {
    const {
      rangeComposition,
      selectedRange
    } = this.props
    const {x, y} = this
    const bars = this.chart.selectAll('.bar').data(rangeComposition)
    const labels = this.chart.selectAll('.bar-label').data(rangeComposition)

    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', 4)
        .attr('y', (d) => y(d.name) + 10)
        .attr('height', 20)
        .attr('width', (d) => x(d.value))
        .attr('fill', rangeColors[selectedRange.color])
        .on('mouseout', this.handleBarMouseOut)
        .on('mouseover', this.handleBarMouseOver)
    bars.exit().remove()
    bars.transition().duration(200)
        .attr('width', (d) => x(d.value))
        .attr('fill', rangeColors[selectedRange.color])

    labels.enter().append('text')
        .attr('class', 'bar-label')
        .text((d) => `${(100 * d.value).toFixed(1)}%`)
        .attr('x', (d) => x(d.value) + 6)
        .attr('y', (d) => y(d.name) + 25)
    labels.exit().remove()
    labels.transition()
        .duration(200)
        .text((d) => `${(100 * d.value).toFixed(1)}%`)
        .attr('x', (d) => x(d.value) + 6)
  }

  handleBarMouseOver(datum, index) {
    this.highlightBar(index, 'black')
    setTimeout(() => this.highlightCombos(datum.combos), 0)
  }

  handleBarMouseOut(datum, index) {
    this.highlightBar(index, '')
    setTimeout(() => this.highlightCombos([]), 0)
  }

  setChartContainerRef(node) {
    this.chartContainerRef = node
  }

  highlightBar(index, stroke) {
    d3.selectAll('.bar').filter((d, i) => i === index)
      .attr('stroke', stroke)
  }

  highlightCombos(combos) {
    const setHighlightedCombos = this.props.actions.setHighlightedCombos

    if (setHighlightedCombos) {
      setHighlightedCombos(combos)
    }
  }
}

export default injectSheet(styles)(RangeCompositionChart)