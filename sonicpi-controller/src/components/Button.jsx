import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import './Button.css'

/**
 *
 * @param {object} props
 * @param {boolean} props.editMode
 * @param {boolean} props.midiOutput
 * @param {boolean} props.midiChannel
 * @param {boolean} props.midiNote
 * @returns
 */
function Button(props) {
  const [color, setColor] = useState('steelblue')
  const [label, setLabel] = useState(`Button ${props.midiNote}`)
  const [active, setActive] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const onClick = () => {
    if (props.editMode) { return }
    console.log(!active ? 'Activate' : 'Deactivate', label, props.midiNote)
    setActive(!active)
    props.midiOutput.playNote(props.midiNote, props.midiChannel, { attack: !active ? 1 : 0 })
  }

  const togglePicker = () => {
    setShowColorPicker(!showColorPicker)
  }

  const updateLabel = (event) => {
    event.stopPropagation()
    setLabel(event.target.value)
  }

  const blockEvent = (event) => {
    event.stopPropagation()
  }

  return (
    <div
      className={`Button ${(active || props.editMode) ? 'active' : ''}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {props.editMode && (
        <div>
          <button
            className='colorPickerBtn'
            onClick={togglePicker}
          >
            Set color
          </button>
          {showColorPicker &&
            <div className='popover'>
              <div className='cover' onClick={togglePicker}>
                <CirclePicker
                  width={550}
                  color={color}
                  circleSize={50}
                  circleSpacing={40}
                  onChangeComplete={(color) => setColor(color.hex)}
                />
              </div>
            </div>
          }
        </div>
      )
      }
      {
        props.editMode && (
          <input
            type="text"
            className="inputButton"
            defaultValue={label}
            onInput={updateLabel}
            onKeyDown={blockEvent}
          />
        )
      }
      {
        !props.editMode && (
          <span className='label'>{label}</span>
        )
      }
    </div >
  )
}

export default Button
