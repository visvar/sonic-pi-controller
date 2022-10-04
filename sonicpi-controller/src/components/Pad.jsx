import React, { useState } from 'react'
import MUIButton from '@material-ui/core/Button'
import Button from './Button.jsx'
import './Pad.css'

/**
 *
 * @param {object} props
 * @param {object} props.midiOutput
 * @returns
 */
function Pad(props) {
    const maxRows = 6;
    // actual count will be n**2
    const [buttonRows, setButtonRows] = useState(3)
    const [editMode, setEditMode] = useState(false)

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const buttons = new Array(maxRows ** 2).fill().map((d, i) => (
        <Button
            key={i}
            editMode={editMode}
            midiOutput={props.midiOutput}
            midiChannel={3}
            midiNote={i}
        />
    ))

    return (
        <div className='Pad'>
            <div className="grid" style={{ gridTemplateColumns: `repeat(${buttonRows}, 1fr)` }}>
                {buttons.slice(0, buttonRows ** 2)}
            </div>
            <MUIButton onClick={toggleEditMode} color="primary">
                Toggle edit mode
            </MUIButton>
            {editMode && (
                <MUIButton onClick={() => setButtonRows(Math.min(6, buttonRows + 1))} color="primary">
                    More
                </MUIButton>
            )}
            {editMode && (
                <MUIButton onClick={() => setButtonRows(Math.max(2, buttonRows - 1))} color="primary">
                    Less
                </MUIButton>
            )}
        </div>
    )
}

export default Pad
