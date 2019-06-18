import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Chart from '../index'
import {isEqual} from 'lodash'

export default class Funnel extends Component {
  static propTypes = {
    toolTipContent: PropTypes.string,
    indexLabel: PropTypes.string,
    indexLabelPlacement: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    dataKey: PropTypes.string,
    dataLabel: PropTypes.string,
    percentType: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
  }

  static defaultProps = {
    toolTipContent: '<b>{label}</b>: {y} <b>({percentage}%)</b>',
    indexLabel: '{label} {y} ({percentage}%)',
    indexLabelPlacement: 'outside',
    data: [],
    dataKey: 'count',
    dataLabel: 'label',
    percentType: 'exclusive'
  }

  state = {
    options: {
      animationEnabled: true,
      data: [
        {
          click: this.props.onClick,
          explodeOnClick: false,
          type: 'funnel',
          toolTipContent: this.props.toolTipContent,
          indexLabelPlacement: this.props.indexLabelPlacement,
          indexLabel: this.props.indexLabel,
          dataPoints: []
        }
      ]
    }
  }

  parseData = data => {
    data = typeof data.toList === 'function' ? data.toList() : data
    data = typeof data.toJS === 'function' ? data.toJS() : data
    if (data && !Array.isArray(data)) {
      console.error('The data provided to this chart is malformed. The data should be an array of data objects, but instead found', data) // eslint-disable-line
    } else {
      const {dataKey, dataLabel, percentType} = this.props
      const datamap = {} // keeping track of order that the data was passed in - JRA 06/04/2019
      let parsed = []
      let total = 0
      data.forEach((item, i) => {
        let count = dataKey === null ? 1 : (+item[dataKey] || 0)
        if (isNaN(count)) count = 0
        const label = item[dataLabel] || null
        if (label) {
          total = total + count
          if (datamap[label] >= 0) {
            parsed[datamap[label]].y = parsed[datamap[label]].y + count
          } else {
            datamap[label] = i
            parsed.push({label, y: count})
          }
        }
      })
      if (percentType === 'inclusive') {
        let left = total
        parsed.map(item => {
          item.percentage = ((left / total) * 100).toFixed(2)
          left = left - item.y
          return item
        })
      } else {
        parsed.map(item => {
          item.percentage = ((item.y / total) * 100).toFixed(2)
          return item
        })
      }
      this.setState(s => {
        const {options} = s
        options.data[0].dataPoints = parsed
        return {options}
      })
    }
  }

  verifyPercentType = percentType => {
    if (percentType && percentType !== 'exclusive' && percentType !== 'inclusive') {
      console.warn(`The percentType of ${percentType} is not supported. Falling back to 'exclusive' (percentages calculated independently).`) // eslint-disable-line
    }
  }

  componentDidMount = () => {
    const {data, percentType} = this.props
    this.parseData(data)
    this.verifyPercentType(percentType)
  }

  componentDidUpdate (p) {
    if (!isEqual(p.data, this.props.data)) {
      this.parseData(this.props.data)
    }
  }

  render () {
    const {options} = this.state
    const {style} = this.props
    return <Chart style={style} options={options} />
  }
}
