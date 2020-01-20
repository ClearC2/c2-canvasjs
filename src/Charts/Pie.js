import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Chart from '../index'
import {isEqual} from 'lodash'

export default class Pie extends Component {
  static propTypes = {
    toolTipContent: PropTypes.string,
    indexLabel: PropTypes.string,
    indexLabelPlacement: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    dataKey: PropTypes.string,
    dataLabel: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    doughnut: PropTypes.bool,
    axisX: PropTypes.object,
    axisY: PropTypes.object,
    options: PropTypes.object,
    indexLabelWrap: PropTypes.bool,
    controlled: PropTypes.bool,
    labelFormatter: PropTypes.func
  }

  static defaultProps = {
    toolTipContent: '<b>{label}</b>: {y} <b>({percentage}%)</b>',
    indexLabel: '{label} {y} ({percentage}%)',
    indexLabelPlacement: 'outside',
    indexLabelWrap: false,
    data: [],
    dataKey: 'count',
    dataLabel: 'label',
    doughnut: false,
    axisX: {},
    axisY: {}
  }

  state = {
    options: {
      animationEnabled: true,
      axisX: {
        interval: 1,
        ...this.props.axisX
      },
      axisY: {
        ...this.props.axisY
      },
      data: [
        {
          click: this.props.onClick,
          explodeOnClick: false,
          type: this.props.doughnut ? 'doughnut' : 'pie',
          toolTipContent: this.props.toolTipContent,
          indexLabelPlacement: this.props.indexLabelPlacement,
          indexLabel: this.props.indexLabel,
          indexLabelWrap: this.props.indexLabelWrap,
          indexLabelFormatter: this.props.labelFormatter,
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
      const {dataKey, dataLabel} = this.props
      const datamap = {} // keeping track of order that the data was passed in - JRA 06/04/2019
      let parsed = []
      let total = 0
      data.forEach(item => {
        let count = dataKey === null ? 1 : (+item[dataKey] || 0)
        if (isNaN(count)) count = 0
        let label = item[dataLabel]
        if (typeof label !== 'undefined') {
          total = total + count
          if (datamap[label] >= 0) {
            parsed[datamap[label]].y = parsed[datamap[label]].y + count
          } else {
            datamap[label] = Object.keys(datamap).length
            parsed.push({label, y: count})
          }
        }
      })
      parsed.map(item => {
        item.percentage = ((item.y / total) * 100).toFixed(2)
        return item
      })
      this.setState(s => {
        const {options} = s
        options.data[0].dataPoints = parsed
        return {options}
      })
    }
  }

  componentDidMount = () => {
    if (this.props.controlled) {
      this.setControlledData()
    } else {
      const {data} = this.props
      this.parseData(data)
    }
  }

  componentDidUpdate (p) {
    if (this.props.controlled) {
      if (!isEqual(p.data, this.props.data)) {
        this.setControlledData()
      }
    } else {
      if (!isEqual(p.data, this.props.data)) {
        this.parseData(this.props.data)
      }
    }
  }
  setControlledData = () => {
    this.setState(s => {
      let {options} = s
      options = {...options, ...this.props.options}
      options.data = this.props.data
      return {options}
    })
  }

  render () {
    const {options} = this.state
    const {style} = this.props
    return <Chart style={style} options={options} />
  }
}
