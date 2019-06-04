import React, {Component} from 'react'
import {Funnel} from 'c2-canvasjs'

export default class App extends Component {
  state = {
    data: [
      {
        count: 1400,
        label: 'Prospects'
      },
      {
        count: 1212,
        label: 'Qualified Prospects'
      },
      {
        count: 1080,
        label: 'Proposals'
      },
      {
        count: 665,
        label: 'Negotiation'
      },
      {
        count: 578,
        label: 'Final Sales'
      }
    ]
  }

  render () {
    const {data} = this.state
    return (
      <div className='page-container '>
        <Funnel
          data={data}
          dataKey='count'
          dataLabel='label'
        />
      </div>
    )
  }
}
