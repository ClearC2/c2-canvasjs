import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Chart from '../index'

export default class PreFormatted extends Component {
  static propTypes = {
    options: PropTypes.object,
    style: PropTypes.object
  }

  static defaultProps = {
    options: {}
  }

  render () {
    const {style, options} = this.props
    if (!options.axisX) options.axisX = {}
    if (!options.axisX.interval) {
      options.axisX.interval = 1
    }
    if (!options.axisX.labelAngle) {
      options.axisX.labelAngle = 0
    }
    console.log(this.props, this.state, options, 'props state in canvasjs preformatted logggggggg')
    return <Chart style={style} options={options} />
  }
}
