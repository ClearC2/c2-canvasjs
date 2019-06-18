import React, {Component} from 'react'
import {Funnel, Bar, Pie} from 'c2-canvasjs'

export default class App extends Component {
  state = {
    data: [
      {
        count: '1400',
        label: 'Prospects'
      },
      {
        count: '1212',
        label: 'Qualified Prospects'
      },
      {
        count: '1080',
        label: 'Proposals'
      },
      {
        count: '665',
        label: 'Negotiation'
      },
      {
        count: '578',
        label: 'Final Sales'
      }
    ]
  }

  render () {
    const {data} = this.state
    return (
      <div className='page-container'>
        <div className='page-row'>
          <Funnel
            data={data}
            dataKey='count'
            dataLabel='label'
          />
          <Bar
            data={data}
            dataKey='count'
            dataLabel='label'
          />
          <Bar
            horizontal
            data={data}
            dataKey='count'
            dataLabel='label'
          />
          <Pie
            data={data}
            dataKey='count'
            dataLabel='label'
          />
          <Pie
            doughnut
            data={data}
            dataKey='count'
            dataLabel='label'
          />
        </div>
      </div>
    )
  }
}
