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
    ],
    multi: [
      {
        owner: 'Chantaye Patton',
        data: [
          {
            status: 'Initial Contact',
            revenue: '3046000.00'
          },
          {
            status: 'Proposal Submitted',
            revenue: '391209.01'
          },
          {
            status: 'Revision',
            revenue: '25000.00'
          },
          {
            status: 'Final Contract',
            revenue: '10000.00'
          }
        ]
      },
      {
        owner: 'Charlie Spaneas',
        data: [
          {
            status: 'Initial Contact',
            revenue: '27000.00'
          },
          {
            status: 'Revision',
            revenue: '14090.00'
          },
          {
            status: 'Negotiations',
            revenue: '75000.00'
          },
          {
            status: 'Pricing Approval',
            revenue: '874000.00'
          },
          {
            status: 'Final Contract',
            revenue: '15000.00'
          }
        ]
      }
    ]
  }

  render () {
    const {data, multi} = this.state
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
            dataKey={null}
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
        <div className='page-row'>
          <Bar
            stacked
            data={multi}
            dataKey='revenue'
            dataStackKey='status'
            dataLabel='owner'
          />
          <Bar
            horizontal
            stacked
            data={multi}
            dataKey='revenue'
            dataStackKey='status'
            dataLabel='owner'
          />
          <Bar
            horizontal
            data={data}
            dataKey='count'
            dataLabel='label'
          />
        </div>
      </div>
    )
  }
}
