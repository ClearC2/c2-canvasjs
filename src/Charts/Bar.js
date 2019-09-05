import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Chart from '../index'
import {isEqual} from 'lodash'
import ReactTooltip from 'react-tooltip'

export default class Bar extends Component {
  static propTypes = {
    toolTipContent: PropTypes.string,
    indexLabel: PropTypes.string,
    indexLabelPlacement: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    dataKey: PropTypes.string,
    dataLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    dataStackKey: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    horizontal: PropTypes.bool,
    stacked: PropTypes.bool,
    axisX: PropTypes.object,
    axisY: PropTypes.object
  }

  static defaultProps = {
    toolTipContent: '<b>{label}</b>: {y}',
    indexLabel: '{y}',
    indexLabelPlacement: 'outside',
    data: [],
    dataKey: 'count',
    dataStackKey: 'label',
    dataLabel: 'label',
    horizontal: false,
    stacked: false,
    axisX: {},
    axisY: {}
  }

  state = {
    dataSubFilter: [],
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
          type: this.props.horizontal
            ? this.props.stacked ? 'stackedBar' : 'bar'
            : this.props.stacked ? 'stackedColumn' : 'column',
          toolTipContent: this.props.toolTipContent,
          indexLabelPlacement: this.props.indexLabelPlacement,
          indexLabel: this.props.indexLabel,
          dataPoints: []
        }
      ]
    }
  }

  handleSubFilterRemove = i => {
    this.setState(s => {
      const dataSubFilter = [...s.dataSubFilter].slice(0, i)
      return {dataSubFilter}
    })
  }

  handleClick = e => {
    const {onClick = () => null, dataLabel} = this.props
    if (Array.isArray(dataLabel)) {
      const {label} = e.dataPoint
      this.setState(s => {
        const dataSubFilter = [...s.dataSubFilter]
        if (
          dataSubFilter[dataSubFilter.length - 1] !== label &&
          dataSubFilter.length !== (dataLabel.length - 1)
        ) {
          dataSubFilter.push(label)
        }
        return {dataSubFilter}
      })
    }
    onClick(e)
  }

  parseData = data => {
    data = typeof data.toList === 'function' ? data.toList() : data
    data = typeof data.toJS === 'function' ? data.toJS() : data
    if (data && !Array.isArray(data)) {
      console.error('The data provided to this chart is malformed. The data should be an array of data objects, but instead found', data) // eslint-disable-line
    } else {
      const {dataKey, stacked, dataStackKey} = this.props
      const {dataSubFilter} = this.state
      let {dataLabel} = this.props
      if (Array.isArray(dataLabel) && dataSubFilter.length) {
        data = data.filter(item => {
          let match = true
          dataSubFilter.forEach((subVal, i) => {
            if (item[dataLabel[i]] !== subVal) {
              match = false
            }
          })
          return match
        })
      }
      if (Array.isArray(dataLabel)) {
        dataLabel = dataLabel[dataSubFilter.length]
      }
      if (stacked) {
        const datamap = {}
        const sections = []
        const knownBars = []
        data.forEach(item => {
          let label = item[dataLabel]
          knownBars.push(label)
          if (typeof label !== 'undefined' && Array.isArray(item.data)) {
            item.data.forEach((piece, i) => {
              const pieceLable = piece[dataStackKey]
              if (pieceLable) {
                if (!datamap[pieceLable]) {
                  const section = {...this.state.options.data[0]}
                  section.indexLabel = ''
                  section.dataPoints = []
                  section.click = this.handleClick
                  section.dataPoints[knownBars.indexOf(label)] = {label, y: +piece[dataKey] || 1}
                  section.toolTipContent = `<strong>${piece[dataStackKey]}</strong> {y}`
                  datamap[pieceLable] = {i}
                  sections.push(section)
                } else {
                  const dataPoints = sections[datamap[pieceLable].i].dataPoints
                  if (!dataPoints.some(sec => {
                    if (sec.label === label) {
                      sec.y = sec.y + (piece[dataKey] || 1)
                      return true
                    }
                  })) {
                    dataPoints[knownBars.indexOf(label)] = {label, y: +piece[dataKey] || 1}
                  }
                }
              }
            })
          } else {
            console.error('You have specified a stacked bar chart but either a label or data array was not found for this item.', item) // eslint-disable-line
          }
        })
        knownBars.forEach((bar, i) => {
          sections.forEach(section => {
            if (!section.dataPoints[i]) {
              section.dataPoints[i] = {label: bar, y: 0}
            }
          })
        })
        this.setState(s => {
          const {options} = s
          options.data = sections
          return {options}
        })
      } else {
        const datamap = {}
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
          options.data[0].click = this.handleClick
          return {options}
        })
      }
    }
  }

  componentDidMount = () => {
    const {data} = this.props
    this.parseData(data)
  }

  componentDidUpdate (p, s) {
    if (
      !isEqual(p.data, this.props.data) ||
      this.state.dataSubFilter.length !== s.dataSubFilter.length
    ) {
      this.parseData(this.props.data)
    }
  }

  render () {
    const {options, dataSubFilter} = this.state
    const {style} = this.props
    return (
      <Chart style={style} options={options}>
        {dataSubFilter.length > 0 && (
          <div
            style={{
              width: '100%',
              position: 'absolute',
              left: 45,
              top: -10
            }}
          >
            {dataSubFilter.map((value, i) => {
              return (
                <Fragment key={i}>
                  <ReactTooltip />
                  <strong
                    data-tip='Click to remove filter.'
                    style={{
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                    onClick={() => this.handleSubFilterRemove(i)}
                  >
                    {i > 0 && ' > '}{value}
                  </strong>
                </Fragment>
              )
            })}
          </div>
        )}
      </Chart>
    )
  }
}
