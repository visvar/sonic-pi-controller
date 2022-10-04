import React, { useState } from 'react'
import MUIButton from '@material-ui/core/Button'
import './Keyboard.css'

/**
 * Keyboard SVG playing notes when key gets clicked
 *
 * @param {object} props
 * @param {object} props.midiOutput
 */
export default function Keyboard (props) {

    const [minPitch, setMinPitch] = useState(36)
    const octWidth = 212
    // TODO: only updates on page reload currently
    const numOctaves = Math.floor((window.innerWidth * 0.9) / octWidth)
    const xWhite = 15
    const xBlack = 9
    const yWhite = 145
    const yBlack = 100

    function clickButton (note) {
        props.midiOutput.playNote(note, 2)
        console.log(`Playing key ${note}`)
    }

    function transposeDown () {
        setMinPitch(Math.max(minPitch - 12, 0))
    }

    function transposeUp () {
        // Check if highest note would be higher than 127
        if (minPitch + numOctaves * 12 + 12 > 127) {
            return
        }
        setMinPitch(minPitch + 12)
    }

    return (
        <div className="Keyboard">
            <svg width={octWidth * numOctaves}>
                {new Array(numOctaves).fill().map((_, octave) => {
                    const octaveOffset = minPitch + 12 * octave
                    const octName = octave + (minPitch - 12) / 12
                    return (
                        <svg key={`${octave} ${minPitch}`} x={octWidth * octave}>
                            <svg x="0">
                                <rect className='whiteKey' onClick={() => clickButton(octaveOffset + 0)} />
                                <text x={xWhite} y={yWhite}>C {octName}</text>
                            </svg>
                            <svg x="30">
                                <rect className='whiteKey' onClick={() => clickButton(octaveOffset + 2)} />
                                <text x={xWhite} y={yWhite}>D</text>
                            </svg>
                            <svg x="60">
                                <rect className='whiteKey' onClick={() => clickButton(octaveOffset + 4)} />
                                <text x={xWhite} y={yWhite}>E</text>
                            </svg>
                            <svg x="90">
                                <rect className='whiteKey' onClick={() => clickButton(octaveOffset + 5)} />
                                <text x={xWhite} y={yWhite}>F</text>
                            </svg>
                            <svg x="120">
                                <rect className='whiteKey' onClick={() => clickButton(octaveOffset + 7)} />
                                <text x={xWhite} y={yWhite}>G</text>
                            </svg>
                            <svg x="150">
                                <rect className='whiteKey' onClick={() => clickButton(octaveOffset + 9)} />
                                <text x={xWhite} y={yWhite}>A</text>
                            </svg>
                            <svg x="180">
                                <rect className='whiteKey' onClick={() => clickButton(octaveOffset + 11)} />
                                <text x={xWhite} y={yWhite}>B</text>
                            </svg>
                            <svg x="21">
                                <rect className='blackKey' onClick={() => clickButton(octaveOffset + 1)} />
                                <text className='blackKeyText' x={xBlack} y={yBlack}>C#</text>
                            </svg>
                            <svg x="51">
                                <rect className='blackKey' onClick={() => clickButton(octaveOffset + 3)} />
                                <text className='blackKeyText' x={xBlack} y={yBlack}>D#</text>
                            </svg>
                            <svg x="111">
                                <rect className='blackKey' onClick={() => clickButton(octaveOffset + 6)} />
                                <text className='blackKeyText' x={xBlack} y={yBlack}>F#</text>
                            </svg>
                            <svg x="141">
                                <rect className='blackKey' onClick={() => clickButton(octaveOffset + 8)} />
                                <text className='blackKeyText' x={xBlack} y={yBlack}>G#</text>
                            </svg>
                            <svg x="171">
                                <rect className='blackKey' onClick={() => clickButton(octaveOffset + 10)} />
                                <text className='blackKeyText' x={xBlack} y={yBlack}>A#</text>
                            </svg>
                        </svg >
                    )
                })}
            </svg>
            <div>
                <MUIButton onClick={transposeDown} color="primary">
                    One octave down
                </MUIButton>
                <MUIButton onClick={transposeUp} color="primary">
                    One octave up
                </MUIButton>
            </div>
        </div>
    )
}
