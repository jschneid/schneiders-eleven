# Schneider's Eleven
Unobtrusive skin for Windows Media Player featuring album art
v1.04
Created by Jonathan Schneider
http://jonschneider.com/

I created this skin to be a small and unobtrusive music player.  It is designed to unobtrusively sit in the corner of the screen, with no distracting scrolling text, animated graphics, or frequently-changing text fields (aside from the display of the time index within the current track).  It always shows the current album, artist, and track name for at-a-glance viewing.  

The play control interface is a reduced-size version of the the standard Windows Media Player 11 play control interface (thus the name "Schneider's Eleven").


## Feature List  

- Small size: 340px wide, 135px high
- Supports audio playback only (no video support)
- Displayed at all times for at-a-glance viewing: Author, Track Title, Album,
    track bitrate, track filesize, track length, track current time index
- Available controls: Play/Pause, Previous Track, Next Track, Stop, Mute on/off,
    Shuffle on/off, Repeat on/off, Track position slider, Volume slider
- Displays album art if available, correctly sized/scaled
- Designed for Windows Media Player 11; also works with Windows Media Player 10

## Known Issues

- In Windows Media Player 10, there's a graphical glitch at the left edge of the volume slider, where that portion of the slider appears to be empty instead of filled.
- The file size displayed for large .wav files is much smaller than it should be. (In particular, one 25.7 MB .wav file in my collection is reported by WMP 11's getItemInfo("FileSize") API as "124306" (bytes); this may be a WMP bug?)
- The "Next Track" button can't be held down to act as a "Fast Forward" button, as it does in the regular Windows Media Player 11 UI.
- There is no thumb graphic on hover for the track position slider, as there is in the regular Windows Media Player 11 UI.

## Credits/Thanks 

- My wife Melissa.  I love you very very much!
- Microsoft, for the free Windows Media Player, the nice Windows Media Player 11 UI, and the equally nice skinning API.  XML, Javascript, and image files -- easy!
- Richard Kohut, aka Reeses2150, who created the "Basic6" skin; the TrackInfo pane of Basic6 was the initial inspiration for the Schneider's Eleven design.  Thanks Richard!


## Version History 

v1.0 -- September 9, 2007
Initial release.

v1.01 -- September 10, 2007
- Fixed a bug where the time/duration text would not fit into the available display
area if the duration of the current track was an hour long (1:00:00) or longer.

v1.02 -- October 6, 2007
- Fixed a bug where for certain albums, the player's UI would sometimes hang for a 
short time when a track finished and another track started playing. 
- Fixed a bug where the Ctrl+T and Ctrl+H shortcut keys were not correctly updating the appearance of the Shuffle and Repeat functions.
- Reduced the number of decimal places displayed for the bitrate to 2 (from 3), and for the file size to 1 (from 2).

v1.03 -- October 8, 2007
- All authors of the current track are now displayed in the Author field.  (Previously, only the first author was displayed.)
- Fixed a bug where the information display for the current track (track name, etc.) wouldn't be updated when using the Back/Forward button to move between tracks while the player was stopped.
- The decimal places for the bitrate are now displayed only if necessary.  (For 
example, "128 kbps" is now displayed instead of "128.00 kbps".)
- Improved the appearance of the "hover" graphics for the Play/Pause button.

v1.04 -- November 11, 2007
- Reduced the size of the player; the width is now 300 pixels (was 340).
- Swapped the positions of the Minimize and Full Mode buttons.
- When a track is being played directly from a CD, "n/a" is now displayed in the 
  File size / bitrate field.  (Previously, size and bitrate values of 0 would be  displayed.)
- If the playing track has no information on the author, but does have information   on the composer, the composer is now displayed.  (Previously, "Unspecified" would be displayed.)
