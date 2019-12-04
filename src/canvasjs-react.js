import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CanvasJS from '../canvasjs/canvasjs.min'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

export {CanvasJS}

const systemFont = window
  .getComputedStyle(document.body, null)
  .getPropertyValue('font-family')

function applyDefaultOptions (options) {
  if (!get(options, 'title.fontFamily')) {
    let fontFamily = systemFont
    if (systemFont[0] === '"' && systemFont[systemFont.length - 1] === '"') {
      fontFamily = fontFamily.slice(1, -1)
    }
    if (!options.title) options.title = {}
    if (!options.title.fontFamily) options.title.fontFamily = {}
    options.title.fontFamily = fontFamily
  }
  return options
}

export default class CanvasJSChart extends Component {
  static _cjsContainerId = 0
  chartContainerId = 'canvasjs-react-chart-container-' + CanvasJSChart._cjsContainerId++

  static propTypes = {
    options: PropTypes.object,
    style: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array])
  }

  static defaultProps = {
    options: {},
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
  }

  state = {
    options: applyDefaultOptions(this.props.options)
  }

  updateOptions = () => {
    this.setState(() => ({options: applyDefaultOptions(this.props.options)}))
  }

  updateChart = () => {
    this.chart.options = this.state.options
    this.chart.render()
  }

  componentDidUpdate (p, s) {
    if (
      !isEqual(this.props.options, p.options) ||
      !isEqual(this.props.style, p.style)
    ) {
      this.updateOptions()
    }
    this.updateChart()
  }

  componentDidMount () {
    this.chart = new CanvasJS.Chart(this.chartContainerId, this.state.options)
    this.chart.render()
  }

  componentWillUnmount () {
    this.chart.destroy()
  }

  render () {
    return (
      <div id={this.chartContainerId} style={{position: 'relative', ...this.props.style}}>
        {this.props.children}
      </div>
    )
  }
}
