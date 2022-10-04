import React, { useState } from 'react'
import Grid from "@material-ui/core/Grid"
import Slider from "@material-ui/core/Slider"
import MUIButton from '@material-ui/core/Button'
import * as d3 from 'd3'
import './Sliders.css'

/**
 * Sliders for controlling Volume/Transposing/Play rates in Sonic Pi
 */
function Sliders(props) {
    const [sliderCount, setSliderCount] = useState(8)
    const [editMode, setEditMode] = useState(false)
    const [sliders, setSliders] = useState(new Array(100).fill(0).map((d, i) => {
        return {
            id: i,
            label: `Slider ${i}`,
            min: 0,
            max: 127,
            step: 1,
            value: 0,
            scale: d3.scaleLinear().domain([0, 127])
        }
    }))

    const handleChange = (slider, newValue) => {
        console.log('Slider', slider, newValue)
        props.midiOutput.playNote(slider.id, 4, { attack: slider.scale(newValue) })
        const newSliders = [...sliders]
        newSliders[slider.id] = {
            ...sliders[slider.id],
            value: newValue
        }
        setSliders(newSliders)
    }

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const updateLabel = (event, slider) => {
        event.stopPropagation()
        const newSliders = [...sliders]
        newSliders[slider.id] = {
            ...slider,
            label: event.target.value
        }
        setSliders(newSliders)
    }

    const updateRange = (event, slider, attribute) => {
        event.stopPropagation()
        const value = +event.target.value
        console.log(value)
        const newSliders = [...sliders]
        let update
        if (attribute === 'min') {
            update = { min: value }
        } else if (attribute === 'max') {
            update = { max: value }
        } else if (attribute === 'step') {
            if (value <= 0) {
                return
            }
            update = { step: value }
        }
        const newSlider = {
            ...slider,
            ...update,
        }
        newSlider.scale = d3.scaleLinear().domain([newSlider.min, newSlider.max])
        newSliders[slider.id] = newSlider
        setSliders(newSliders)
    }

    const blockEvent = (event) => {
        event.stopPropagation()
    }

    const sliderElements = sliders.slice(0, sliderCount).map(d => (
        <div key={d.id}>
            <div className='label'>
                {editMode
                    ? <div className='editForm'>
                        <input
                            type='text'
                            defaultValue={d.label}
                            onInput={(event) => updateLabel(event, d)}
                            onKeyDown={blockEvent}
                        />
                        <label>
                            Min.
                            <input
                                type='number'
                                defaultValue={d.min}
                                onInput={(event) => updateRange(event, d, 'min')}
                            />
                        </label>
                        <label>
                            Max.
                            <input
                                type='number'
                                defaultValue={d.max}
                                onInput={(event) => updateRange(event, d, 'max')}
                            />
                        </label>
                        <label>
                            Step
                            <input
                                type='number'
                                defaultValue={d.step}
                                onInput={(event) => updateRange(event, d, 'step')}
                            />
                        </label>
                    </div>
                    : <div>
                        {d.label}
                        <span className='rangeInfo'>
                            ({d.min} - {d.max}, step {d.step})
                        </span>
                    </div>
                }
            </div>
            <Grid container spaceing={2}>
                <Grid item xs>
                    <Slider
                        onChange={(event, value) => handleChange(d, value)}
                        step={d.step}
                        min={d.min}
                        max={d.max}
                        marks={true}
                    />
                </Grid>
                <Grid item className='currentValue'>
                    {d.value}
                </Grid>
            </Grid>
        </div>
    ))

    return (
        <div className='Sliders'>
            {sliderElements}
            <MUIButton onClick={toggleEditMode} color="primary">
                Toggle edit mode
            </MUIButton>
            {editMode && (
                <MUIButton onClick={() => setSliderCount(Math.min(100, sliderCount + 1))} color="primary">
                    More
                </MUIButton>
            )}
            {editMode && (
                <MUIButton onClick={() => setSliderCount(Math.max(1, sliderCount - 1))} color="primary">
                    Less
                </MUIButton>
            )}
        </div>
    )
}

export default Sliders
