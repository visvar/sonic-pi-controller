import "./App.css"
import React, { Component } from "react"
import { WebMidi } from "webmidi"
import Drums from "./components/Drums.jsx"
import Pad from "./components/Pad"
import Keyboard from "./components/Keyboard"
import Sliders from "./components/Sliders.jsx"

/**
 * App component brings all the sub-components together
 */
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      webmidi: null,
      midiOutput: null
    }
  }

  componentDidMount() {
    WebMidi.enable((err) => {
      if (err) {
        console.log("WebMidi could not be enabled.", err)
        return
      }
      console.log("WebMidi enabled!", WebMidi)
      let input = WebMidi.inputs[0]
      console.log(input)
      // log whenever SonicPi sends out a note (over channel 4)
      if (input) {
        input.addListener("noteon", 4, (e) => {
          console.log(
            "Received 'noteon' message from Sonic Pi:" +
            e.note.name +
            e.note.octave
          )
        })
      }
      this.setState({
        webmidi: WebMidi,
        midiOutput: WebMidi.outputs[0]
      })
    })
  }

  render() {
    const { midiOutput } = this.state
    return (
      <div className="App">
        <header>
          <h1>Sonic Pi Controller </h1>
        </header>
        {this.state.webmidi
          ?
          <div className="viewGrid">
            <Pad midiOutput={midiOutput} />
            <Sliders midiOutput={midiOutput} />
            <Keyboard midiOutput={midiOutput} />
            <Drums midiOutput={midiOutput} />
          </div>
          : <div style={{ textAlign: 'center' }}>
            Your browser might not support <a href="https://caniuse.com/midi" target="_blank">Web MIDI</a>
          </div>
        }
      </div>
    )
  }
}
