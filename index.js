import { render } from 'react-dom'
import React, { Component } from 'react'
import Slider from 'rc-slider'
import Glass from '../build/glass.js'

const sliderStyle = {
  width: '100%',
  marginTop: 30,
  marginBottom: 30,
  textAlign: 'center',
  display: 'inline-block'
}

class GlassDemo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      language: 'javascript',
      width: 600,
      height: 500,
      lineNumbers: true,
      autoSize: true
    }
  }

  render () {
    return (
      <div className='pink-demo' style={{
        textAlign: 'center',
        width: '80vw',
        marginLeft: '10vw',
        marginRight: '10vw'
      }} >
        <h1 className='tk-lust-script'>Glass</h1>
        <Glass {...this.state} style={{
          display: 'inline-block'
        }} />
        <div className='row'>
          <div className='column'>
            <h3>Language</h3>
              <input type='text' style={{
                ...sliderStyle,
                width: 100
              }} onChange={(e) => {
                this.setState({ language: e.target.value })
              }} value={this.state.language} /><br />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <h3>Width</h3>
            <div style={sliderStyle}><Slider onChange={(e) => {
              this.setState({ width: parseInt(e, 10) })
            }} value={this.state.width} min={200} max={800} /></div><br />
          </div>
          <div className='column'>
            <h3>Height</h3>
            <div style={sliderStyle}><Slider onChange={(e) => {
              this.setState({ height: parseInt(e, 10) })
            }} value={this.state.height} min={200} max={800} /></div><br />
          </div>
        </div>
      </div>
    )
  }
}

render(<GlassDemo />, document.getElementById('root'))
