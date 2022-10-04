import React from 'react'
import './Drums.css'

/**
 * Drum kit SVG with interactive drum pads
 *
 * @param {object} props
 * @param {object} props.midiOutput
 */
function DrumKit(props) {

   /**Play corresponding note/sample when pad is clicked */
   function sendMidi(note) {
      console.log('drum', note)
      props.midiOutput.playNote(note, 1)
   }

   //link key code to clickButton
   function handleKeyDown({ key }) {
      if (key === 'e') {
         sendMidi(0)
         console.log("Playing crash cymbal")
      }
      else if (key === 'd') {
         console.log("Playing snare")
         sendMidi(1)
      }
      else if (key === 'h') {
         sendMidi(2)
         console.log("Playing floor tom")
      }
      else if (key === 'f') {
         sendMidi(3)
         console.log("Playing tomtom 1")
      }
      else if (key === 'v') {
         sendMidi(4)
         console.log("Playing bass drum")
      }
      else if (key === 'g') {
         sendMidi(5)
         console.log("Playing tomtom 2")
      }
      else if (key === 'z') {
         sendMidi(6)
         console.log("Playing ride cymbal")
      }
   };
   //event listener for down key press TODO: upHandler when key is not pressed anymore
   //no upHandler makes the playing log twice when played over keys
   window.addEventListener('keydown', handleKeyDown)

   return (
      <div className='DrumKit'>
         <svg width="500" viewBox="21 17 143 80">
            <g>
               <ellipse
                  fill="#b3b3b3"
                  cx="41.791733"
                  cy="35.823589"
                  rx="18.106289"
                  ry="9.6908455" />

               <ellipse //crash
                  fill="#4d4d4d"
                  cx="41.818958"
                  cy="34.572224"
                  rx="17.86124"
                  ry="10.12737"
                  onClick={() => { sendMidi(0) }} />
               <text
                  x="34"
                  y="35"
               >
                  [E] crash
               </text>


               <ellipse
                  fill="#b3b3b3"
                  cx="44.859859"
                  cy="80.297295"
                  rx="16.081741"
                  ry="8.5034695" />
               <path
                  fill="#b3b3b3"
                  d="m 28.746078,68.531797 c 0.150339,11.272499 0.200452,11.398549 0.200452,11.398549 l 31.855185,0.540213 0.100227,-12.208871 z"
                  id="path330" />

               <ellipse //snare
                  fill="#4d4d4d"
                  cx="44.801991"
                  cy="68.364"
                  rx="16.175888"
                  ry="10.698539"
                  onClick={() => { sendMidi(1) }} />
               <ellipse
                  fill="#b3b3b3"
                  cx="131.98262"
                  cy="86.315323"
                  rx="16.128988"
                  ry="8.633399" />
               <path
                  fill="#b3b3b3"
                  d="m 115.84522,69.534586 c 0.15034,16.400213 0.20045,16.583602 0.20045,16.583602 l 31.85518,0.785949 0.10023,-17.762529 z"
                  id="path330-3" />

               <ellipse //floor tom
                  fill="#4d4d4d"
                  cx="131.90112"
                  cy="69.565285"
                  rx="16.175888"
                  ry="10.698539"
                  onClick={() => { sendMidi(2) }} />
               <ellipse
                  fill="#b3b3b3"
                  cx="73.158928"
                  cy="53.93399"
                  rx="12.896032"
                  ry="6.0889473" />
               <path
                  fill="#b3b3b3"
                  d="m 60.237193,45.509255 c 0.120538,8.071725 0.160748,8.161983 0.160748,8.161983 l 25.544841,0.386822 0.08032,-8.742217 z"
               />

               <ellipse //tomtom1
                  fill="#4d4d4d"
                  cx="73.112518"
                  cy="45.619221"
                  rx="12.971529"
                  ry="7.6607366"
                  onClick={() => { sendMidi(3) }} />
               <ellipse
                  fill="#b3b3b3"
                  cx="86.862587"
                  cy="62.240383"
                  rx="23.801891"
                  ry="9.9282455" />
               <path
                  fill="#b3b3b3"
                  d="m 62.892482,71.845114 c 0.201855,-9.587322 0.168213,-9.587322 0.168213,-9.587322 l 47.604265,0.128173 0.10096,9.048999 z"
                  id="path1315" />

               <ellipse //bassdrum
                  fill="#4d4d4d"
                  stroke="#4d4d4d"
                  cx="86.862595"
                  cy="73.933426"
                  rx="24.132072"
                  ry="15.111725"
                  onClick={() => { sendMidi(4) }} />
               <ellipse
                  fill="#b3b3b3"
                  cx="103.69244"
                  cy="54.227646"
                  rx="14.396043"
                  ry="6.2171845" />
               <path
                  fill="#b3b3b3"
                  d="m 89.267691,45.625485 c 0.134559,8.241721 0.179446,8.33388 0.179446,8.33388 l 28.516103,0.394968 0.0896,-8.926334 z"
               />

               <ellipse //tomtom2
                  fill="#4d4d4d"
                  cx="103.64059"
                  cy="45.737762"
                  rx="14.480321"
                  ry="7.8220763"
                  onClick={() => { sendMidi(5) }} />
               <ellipse
                  fill="#b3b3b3"
                  cx="139.6386"
                  cy="35.694893"
                  rx="19.405582"
                  ry="14.716391" />

               <ellipse //ride
                  fill="#4d4d4d"
                  cx="139.64432"
                  cy="34.299831"
                  rx="19.259468"
                  ry="15.305227"
                  onClick={() => { sendMidi(6) }} />


               <text
                  x="135"
                  y="35"
               >
                  [Z] ride
               </text>

               <text
                  x="66"
                  y="46"
               >
                  [F] tom 1
               </text>

               <text
                  x="95"
                  y="46"
               >
                  [G] tom 2
               </text>

               <text
                  x="81"
                  y="75"
               >
                  [V] bass
               </text>

               <text
                  x="37"
                  y="69"
               >
                  [D] snare
               </text>

               <text
                  x="123"
                  y="69"
               >

                  [H] tom 3
               </text>
            </g>
         </svg>
      </div>
   )
}

export default DrumKit
