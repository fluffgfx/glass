// THE MODERN JS PROGRAMMER PLEDGE:
// I pledge to NEVER use lodash, underscore.js, jQuery, or
// similar multipurpose, bloated libraries within my JS code,
// because although I may be lazy, it takes one google search
// and a brief stackoverflow answer to find the correct
// solution to my problem, and my program will be infinitely
// faster and smaller for it.

// I just made that up, but seriously
// Let's start moving away from _ and $, people.
// We're in the future. I appreciate what they did, but...
// It's just not necessary.

import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom' // i HATE to use react-dom
import getCaret from 'textarea-caret'
import styles from './styles.json'

// Alright, I take everything in that last comment back.
// React is just the new _ or $. The new multipurpose tool
// that I will abuse to no end. I've skipped straight from
// denial to acceptance. That's just how it is now.

// Before, I was using highlightJS
// I was pretty stuck on that but the performance was
// actually pretty awful so I swapped over to prismjs, which
// scared me away soley on the base of its awful website
// design. Don't put white text on a literal fucking rainbow
// or I'll think you're a bad designer. Because you are.
import { highlight, languages } from 'prismjs'

// Helper for measuring text width (used for detecting wrap)
function getTextWidth (text, font) {
  // Thanks, SO
  // Without you, I'd have to think for myself
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  var context = canvas.getContext('2d')
  context.font = font
  var metrics = context.measureText(text)
  return metrics.width
}

// OK, on the subject of swiss army dollar signs:
// How well is unicode supported in JS? Does anyone know? I
// realize I'm shouting into a void here, but let's think
// about it for a second: In the future, we could be naming
// variables after emojis.
//
// class 🎷 extends Instrument {}
// class ♫ extends ♪ {}
//
// I know there's a language out there ironically designed
// to only use emojis, but what if that just starts mixing
// organically into existing JS? What happens then?
//
// Do we just give up?

class Glass extends Component {
  constructor (props) {
    super(props)
    // Alright, now here's a fun hack:
    // prismjs only wants their code highlighting to be used
    // in <pre> or <code> elements, so all the involved CSS
    // selectors look something like this:
    // pre[class*="language-"]
    // That's nonsense to me, I wish I could just use a
    // single prism class (like the aforementioned language-)
    // on any element and be done with it. To get around that,
    // we get the background color (which is all we really
    // need) by creating a fake <pre> element and checking
    // its CSS.
    let backgroundColor
    if (document && window) {
      let e = document.createElement('pre')
      e.className = 'language-'
      e.style = { opacity: 0 }
      // Listen, kids: do NOT do this at home.
      document.body.insertBefore(e, document.getElementById('root'))
      backgroundColor = window.getComputedStyle(e).getPropertyValue('background-color')
      document.body.removeChild(e)
    }
    this.state = {
      value: props.value ? props.value : props.defaultValue,
      cursor: { top: 0, left: 0 },
      lines: [],
      scroll: 0,
      backgroundColor: backgroundColor || '#000'
    }
  }

  handleChange (ev, el) {
    // Alright, gonna walk you through this one:

    // When dealing with a change in the value of the text
    // area, the first thing we do is we let somebody else
    // handle it. I just listened to a podcast about this -
    // it was called "Intellectual kindness," or something.
    this.props.onChange(ev, el.value, el)

    // After that we clean up their mess.

    // Are we controlled? If not, update the internal state.
    if (!this.props.value) {
      this.setState({
        value: el.value
      })
    }

    // v stands for "I'm too lazy to type out value."
    let v = this.props.value || el.value

    // In my adventures with highlightJS, I came to realize
    // that no matter how many web workers you pass the highlight
    // work off to it will still take twenty years to render.
    // And yet, prismjs Just Works (TM).
    this.setState({
      highlighted: highlight(v, languages[this.props.language])
    })

    // a stands for "Array," because I don't have a computer
    // science degree so none of my variable names are descriptive.
    // College admissions officers, now's your chance to help
    // me out. Class of 2021, looking for offers. Columbia, MIT:
    // lookin at you.
    let a = []
    let w = this.props.lineNumbers ? this.props.width * 0.95 : this.props.width

    // This handles the line numbers. I didn't think this would be
    // such a hassle, but then I remembered that sometimes lines
    // wrap, and other times they wrap more than once. (If you've
    // got a single line of code that wraps multiple times, see a
    // doctor.)
    v.split('\n').forEach((va, i) => {
      a.push(`${i + 1}`)
      let linesExtra = Math.floor(getTextWidth(va, '14px monospace') / w)
      if (linesExtra > 0) {
        for (let i = 0; i < linesExtra; i++) { a.push('') }
      }
    })
    this.setState({ lines: a })
  }

  handleCursorMove (ev, el) {
    // Listen, guy who wrote `textarea-caret`:
    // I love you.
    const cursor = getCaret(el, el.selectionStart)
    this.setState({ cursor: cursor })

    // This handles scrolling.
    // Originally, I attached a scroll listener to the GlassArea,
    // then recalculated the scroll every time anything changed.
    // You can imagine how that turned out.
    if (cursor.top > this.props.height + this.state.scroll) {
      this.setState({ scroll: cursor.top - this.props.height + 14 })
    } else if (cursor.top < this.state.scroll) {
      this.setState({ scroll: cursor.top })
    }
  }

  render () {
    // This is pretty long and unremarkable. Here's a quick FAQ:

    // Q: Why don't we just pass this.handleChange to onChange?
    //    Why instead pass a new arrow function that achieves
    //    exactly the same thing but looks longer?
    // A: Because if we don't, this.handleChange gets super
    //    philosophical and ceases to acknowledge the existence
    //    of "this" or "self," mere illusions perpetuated by
    //    beings on lower realms.
    return (
      <div
        className='glass'
        style={{
          ...styles.main,
          width: this.props.width,
          height: this.props.height,
          backgroundColor: this.state.backgroundColor,
          ...this.props.style
        }}>
        <GlassArea
          onChange={(ev, el) => this.handleChange(ev, el)}
          onCursorMove={(ev, el) => this.handleCursorMove(ev, el)}
          value={this.state.value}
          lineNumbersEnabled={this.props.lineNumbers}
          height={this.props.height} />
        <GlassDisplay language={this.props.language}
          underline={this.props.underline}
          defaultValue={this.props.defaultValue}
          value={this.state.highlighted}
          cursor={this.state.cursor}
          lineNumbersEnabled={this.props.lineNumbers}
          lineNumbers={this.state.lines}
          scroll={this.state.scroll} />
      </div>
    )
  }
}

// I wonder what these could be.
Glass.defaultProps = {
  onChange: function () { return null },
  language: '',
  // underline: [],
  defaultValue: '',
  width: 600,
  height: 500,
  style: {},
  lineNumbers: true
}

// You know, I should get around to implementing underline.
// Eventually.
Glass.propTypes = {
  onChange: PropTypes.func,
  language: PropTypes.string.isRequired,
  // underline: PropTypes.arrayOf(PropTypes.object),
  defaultValue: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  lineNumbers: PropTypes.bool,
  value: PropTypes.string
}

// Alright, everything under here is just a matter of delegation.
// Not much to be gleaned except how messy my code is. (Even though
// it technically passes eslint, I know it's not up to snuff.)

function GlassArea ({
  onChange,
  onCursorMove,
  onScroll,
  defaultValue,
  lineNumbersEnabled,
  value,
  size,
  height
}) {
  let text
  return (
    <div
      className='glass-text'
      style={styles.areaDiv}>
      <textarea
        onChange={(e) => { onChange(e, text) }}
        onKeyPress={(e) => { onCursorMove(e, text) }}
        onClick={(e) => { onCursorMove(e, text) }}
        onSelect={(e) => { onCursorMove(e, text) }}
        onPaste={(e) => { onCursorMove(e, text) }}
        ref={(t) => {
          if (!t) return
          text = t
        }}
        spellCheck='false'
        style={{
          ...styles.area,
          left: lineNumbersEnabled ? '5%' : 0,
          width: lineNumbersEnabled ? '95%' : '100%',
          minHeight: height,
          height: height
        }}
        defaultValue={defaultValue} value={value} />
    </div>
  )
}

// I had to change this from a stateless component to an ES6 class
// because lifecycle methods. A one liner function. React is cruel
// that way.
class GlassDisplay extends Component {
  componentDidUpdate (prevProps) {
    if (prevProps.scroll !== this.props.scroll) {
      findDOMNode(this).scrollTop = this.props.scroll
    }
  }

  render () {
    return (
      <div className='glass-display'
        tabindex='-1'
        aria-hidden='true'
        style={styles.displayDiv}>
        {this.props.lineNumbersEnabled ? <GlassLineNumbers lines={this.props.lineNumbers} /> : null}
        <pre
          className='language-'
          style={{
            ...styles.display,
            left: this.props.lineNumbersEnabled ? '5%' : 0,
            width: this.props.lineNumbersEnabled ? '95%' : '100%'
          }}
          dangerouslySetInnerHTML={{ __html: this.props.value }} />
        <GlassCursor lineNumbersEnabled={this.props.lineNumbersEnabled} cursor={this.props.cursor} />
      </div>
    )
  }
}

GlassDisplay.propTypes = {
  language: PropTypes.string.isRequired,
  // underline: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  cursor: PropTypes.object.isRequired,
  lineNumbersEnabled: PropTypes.bool.isRequired,
  lineNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number,
  scroll: PropTypes.number
}

// TODO - make width act less weird when at small values (i.e. set a default
// lineNumbers column width)
function GlassLineNumbers ({ lines }) {
  return (
    <div
      className='glass-line-numbers'
      style={styles.lineNumbersDiv}>
      <pre
        style={styles.lineNumbers}>
        {lines.map((l) => `${l} \n`)}
      </pre>
    </div>
  )
}

function GlassCursor ({ cursor, lineNumbersEnabled }) {
  return (
    <div className='glass-cursor'
      style={{
        ...styles.cursorParentDiv,
        top: cursor.top,
        left: lineNumbersEnabled ? '5%' : 0,
        width: lineNumbersEnabled ? '95%' : '100%'
      }}>
      <div style={styles.cursorChildDiv} >
        <span style={{
          ...styles.cursor,
          left: cursor.left - 2.5
        }} >|</span>
      </div>
    </div>
  )
}

export default Glass
