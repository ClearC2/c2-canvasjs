import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CanvasJS from '../canvasjs/canvasjs.min'
import {isEqual} from 'lodash'

class CanvasJSChart extends Component {
  static _cjsContainerId = 0
  static propTypes = {
    options: PropTypes.object,
    style: PropTypes.object
  }

  static defaultProps = {
    options: {
      height: '250px'
    },
    style: {
      width: '100%',
      position: 'relative'
    }
  }

  state = {
    options: this.props.options
  }

  verifyHeight = () => {
    if (!this.state.options.height) {
      this.setState(s => {
        const {options} = s
        if (this.props.style.height) {
          options.height = this.props.style.height
        } else if (this.props.options.height) {
          options.height = this.props.options.height
        } else {
          options.height = '250px'
        }
        if (typeof options.height === 'number') options.height = options.height + 'px'
        return {options}
      })
    }
  }

  chartContainerId = 'canvasjs-react-chart-container-' + CanvasJSChart._cjsContainerId++

  componentDidMount () {
    this.chart = new CanvasJS.Chart(this.chartContainerId, this.state.options)
    this.verifyHeight()
    this.chart.render()
  }

  shouldComponentUpdate (p) {
    return (
      !isEqual(p.options, this.props.options) ||
      !isEqual(p.style, this.props.style)
    )
  }

  componentDidUpdate () {
    this.chart.options = this.state.options
    this.verifyHeight()
    this.chart.render()
  }

  componentWillUnmount () {
    this.chart.destroy()
  }

  render () {
    return <div id={this.chartContainerId} style={this.props.style} />
  }
}

export default {CanvasJSChart, CanvasJS}
