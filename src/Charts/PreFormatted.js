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
    return <Chart style={style} options={options} />
  }
}
