import React, {Component} from 'react'
import {Funnel, Bar, Pie, PreFormatted} from 'c2-canvasjs'

export default class App extends Component {
  state = {
    data: [
      {
        count: '1400',
        label: 'Prospects',
        sublabel: 'Jake',
        subsublabel: 'Active'
      },
      {
        count: '1212',
        label: 'Qualified Prospects',
        sublabel: 'Mickey',
        subsublabel: 'Active'
      },
      {
        count: '1080',
        label: 'Proposals',
        sublabel: 'Jake',
        subsublabel: 'Active'
      },
      {
        count: '900',
        label: 'Proposals',
        sublabel: 'Mickey',
        subsublabel: 'Active'
      },
      {
        count: '665',
        label: 'Negotiation',
        sublabel: 'Jake',
        subsublabel: 'Active'
      },
      {
        count: '5567',
        label: 'Proposals',
        sublabel: 'Jake',
        subsublabel: 'Closed'
      },
      {
        count: '600',
        label: 'Negotiation',
        sublabel: 'Mickey',
        subsublabel: 'Active'
      },
      {
        count: '578',
        label: 'Final Sales',
        sublabel: 'Jake',
        subsublabel: 'Active'
      },
      {
        count: '500',
        label: 'Final Sales',
        sublabel: 'Mickey',
        subsublabel: 'Active'
      },
      {
        count: '500',
        label: 'Final Sales',
        sublabel: 'Jacy',
        subsublabel: 'Active'
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
    ],
    combo: {
      axisY: {
        title: 'Sends and Opt Outs',
        lineColor: '#369EAD',
        titleFontColor: '#369EAD',
        labelFontColor: '#369EAD'
      },
      axisY2: {
        title: 'Open and Click %',
        lineColor: '#C24642',
        titleFontColor: '#C24642',
        labelFontColor: '#C24642'
      },
      data: [
        {
          type: 'column',
          name: 'Sent',
          dataPoints: [
            {
              label: 'G58 ALLINDUSTRIES \u0022OtherContacts) FL#1',
              y: 2119
            },
            {
              label: 'Gate 58 Non-Responder C2CRM Formletter',
              y: 23013
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email',
              y: 343
            },
            {
              label: '*Gate 58 FL #3 (2nd Ed) Processes for Immediate Efficiency',
              y: 902
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email 2',
              y: 69
            }
          ]
        },
        {
          type: 'column',
          name: 'Opt Outs',
          dataPoints: [
            {
              label: 'G58 ALLINDUSTRIES \u0022OtherContacts) FL#1',
              y: 38
            },
            {
              label: 'Gate 58 Non-Responder C2CRM Formletter',
              y: 408
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email',
              y: 6
            },
            {
              label: '*Gate 58 FL #3 (2nd Ed) Processes for Immediate Efficiency',
              y: 26
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email 2',
              y: 4
            }
          ]
        },
        {
          type: 'spline',
          axisYType: 'secondary',
          yValueFormatString: '#,##0.0\u0022%\u0022',
          name: 'Open %',
          dataPoints: [
            {
              label: 'G58 ALLINDUSTRIES \u0022OtherContacts) FL#1',
              y: 13
            },
            {
              label: 'Gate 58 Non-Responder C2CRM Formletter',
              y: 14
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email',
              y: 28
            },
            {
              label: '*Gate 58 FL #3 (2nd Ed) Processes for Immediate Efficiency',
              y: 19
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email 2',
              y: 33
            }
          ]
        },
        {
          type: 'spline',
          axisYType: 'secondary',
          name: 'Click %',
          color: '#00FF00',
          toolTipContent: '{y}% Click',
          dataPoints: [
            {
              label: 'G58 ALLINDUSTRIES \u0022OtherContacts) FL#1',
              y: 5
            },
            {
              label: 'Gate 58 Non-Responder C2CRM Formletter',
              y: 1
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email',
              y: 9
            },
            {
              label: '*Gate 58 FL #3 (2nd Ed) Processes for Immediate Efficiency',
              y: 6
            },
            {
              label: 'Inside Sales \u0022Follow-up to voicemail\u0022 email 2',
              y: 23
            }
          ]
        }
      ]
    }
  }

  render () {
    const {data, multi, combo} = this.state
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
            dataLabel={['label', 'sublabel', 'subsublabel']}
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
            dataLabel={['label', 'sublabel', 'subsublabel']}
          />
        </div>
        <div className='page-row'>
          <PreFormatted options={combo} />
          <PreFormatted options={combo} />
          <PreFormatted options={combo} />
        </div>
      </div>
    )
  }
}
