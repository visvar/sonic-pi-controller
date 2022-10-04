#####################################################
#    _____             _         ____  _            #
#   / ___/____  ____  (_)____   / __ \(_)           ä
#   \__ \/ __ \/ __ \/ / ___/  / /_/ / /            #
#  ___/ / /_/ / / / / / /__   / ____/ /             #
# /____/\____/_/ /_/_/\___/  /_/   /_/              #
#                                                   #
#    ______            __             ____          #
#   / ____/___  ____  / /__________  / / /__  _____ #
#  / /   / __ \/ __ \/ __/ ___/ __ \/ / / _ \/ ___/ #
# / /___/ /_/ / / / / /_/ /  / /_/ / / /  __/ /     #
# \____/\____/_/ /_/\__/_/   \____/_/_/\___/_/      #
#                                                   #
#     Font: http://www.network-science.de/ascii/    #
#####################################################

#####################################################
#                                                   #
#                                                   #
# Configuration you might need to adapt             #
#                                                   #
# You can see where MIDI messages arrive in the     #
# Cues panel of Sonic Pi.                           #
#####################################################

midi_port = "/midi:loopmidi_port_0"

# Define slider ranges here after changing them inside
# the controller frontend
slider_ranges = [
  Hash["min" => 0, "max" => 127, "step" => 1], # slider 0
  Hash["min" => 0, "max" => 127, "step" => 1], # slider 1
  Hash["min" => 0, "max" => 127, "step" => 1], # slider 2
  Hash["min" => 0, "max" => 127, "step" => 1], # slider 3
  Hash["min" => 0, "max" => 127, "step" => 1], # slider 4
  Hash["min" => 0, "max" => 127, "step" => 1], # slider 5
  Hash["min" => 0, "max" => 127, "step" => 1]  # slider 6
]

# If you want to use samples, e.g., for the drums,
# configure their path here
samples = "\\path\\to\\drum-samples\\"

bass  = samples + "bassdrum.wav"
snare = samples + "Snare.wav"
crash = samples + "crash_cymbal.wav"
tom1  = samples + "tomtom1.wav"
tom2  = samples + "tomtom2.wav"
tom3  = samples + "floortom.wav"
ride  = samples + "ride_cymbal.wav"

#####################################################
# End of configuration                              #
#####################################################

drums_channel    = "1"
keyboard_channel = "2"
button_channel   = "3"
slider_channel   = "4"

button_midi   = midi_port + ":" + button_channel   + "/note_on"
slider_midi   = midi_port + ":" + slider_channel   + "/note_on"
drums_midi    = midi_port + ":" + drums_channel    + "/note_on"
keyboard_midi = midi_port + ":" + keyboard_channel + "/note_on"

# Initial values of slider and button values
sliders = Array.new(100, 0)
buttons = Array.new(36, false)

# Scales a value from [0, 127] to [min, max] and
# rounds to next valid step
def scale_linear(min, max, step, value)
  scaled = min + (value / 127.0) * (max - min)
  stepped = scaled / step
  rounded = stepped.round * step
end

# Update loops that keep slider and button states up-to-date
live_loop :button_update do
  note, velocity = sync button_midi
  if velocity > 0
    buttons[note] = true
  else
    buttons[note] = false
  end
  puts "Received button update", note, velocity, buttons[note]
end

live_loop :slider_update do
  note, velocity = sync slider_midi
  puts "Received slider update", note, velocity
  # Scale, if range is defined
  scaled = velocity
  if note < slider_ranges.size
    r = slider_ranges[note]
    scaled = scale_linear r["min"], r["max"], r["step"], velocity
  end
  puts "Scaled slider value to #{scaled}"
  sliders[note] = scaled
end

# Live loops for instruments
live_loop :keyboard do
  use_real_time
  use_synth :piano
  note, velocity = sync keyboard_midi
  puts "Received keyboard note", note, velocity
  play note
  sleep 0.1
end

live_loop :drum do
  use_real_time
  note, velocity, channel = sync drums_midi
  puts "Received drum hit", note, velocity
  if note == 0
    sample crash, amp: 50
  elsif note == 1
    sample snare, amp: 50
  elsif note == 2
    sample tom3, amp: 50
  elsif note == 3
    sample tom1, amp: 50
  elsif note == 4
    sample bass, amp: 50
  elsif note == 5
    sample tom2, amp: 50
  elsif note == 6
    sample ride, amp: 50
  end
  sleep 0.01
end

#####################################################
# End of Sonic Pi Controller boilerplate            #
#####################################################


# Example for using a button
live_loop :example_loop do
  use_synth :piano
  if buttons[0]
    # Do anything here
    play 60
    sleep 1
  end
end

# Example for using a slider
live_loop :example_loop do
  use_synth :piano
  # Use slider values as parameter
  play 60, amp: sliders[0]
  sleep 1
end
