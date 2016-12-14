// SchneidersEleven.js
// Part of the "Schneider's Eleven" skin for Windows Media Player
// Copyright 2007, Jonathan S. Schneider
// http://www.jonschneider.com/
// Version 1.04 (November 17, 2007)

//Refreshes the UI elements on the control that may need to be updated when a new track 
// begins playing: Author, track name, album name, bitrate & file size.
function refreshAll()
{
    //If the player object doesn't exist yet (e.g. when WMP is showing the preview image 
    //for this skin), just return without refreshing the contents of any fields.
    if (player == null)
    {
        return;
    }
 
    //Set the "enabled"/"disabled" state of the Shuffle, Mute, and Repeat buttons.
    repeatEnabledButtonGroup.visible = player.settings.getMode('loop');
    shuffleEnabledButtonGroup.visible = player.settings.getMode('shuffle');
    muteEnabledButtonGroup.visible = player.settings.mute;

    //There could be multiple authors for the current track.  Get the count of authors, 
    //then build a comma-separated string of the authors, and set that as the authorText.
    var authorCount = player.currentMedia.getAttributeCountByType("author", "");
    var authorIndex;
    var authorsString = "  ";
    for (authorIndex = 0; authorIndex < authorCount; authorIndex++)
    {
        authorsString += player.currentMedia.getItemInfoByType("author", "", authorIndex);
        //Add the comma delimiter if this isn't the last item.
        if ((authorIndex + 1) < authorCount)
        {
            authorsString += ", ";
        }
    }
    authorText.value = authorsString;

    //Display the current track's title (name) and album in their respective fields    
    titleText.value = "  " + player.currentMedia.getItemInfo("name");
    albumText.value = "  " + player.currentMedia.getItemInfo("album");

    //If we didn't get text for the album or the artist for the current track, display
    //"Unspecified" in dimmed text color in the corresponding field.
    if (albumText.value == "  ")
    {
        albumText.value = "  Unspecified"; 
        albumText.foregroundColor = "#6f6f6f";
    } 
    else 
    {
        albumText.foregroundColor = "#e0e0e0";
    }
    if (authorText.value == "  ")
    {
		//We have no author; see if we can display a composer instead.
		var composer = player.currentMedia.getItemInfo("WM/Composer");
		if (composer != "")
		{
			authorText.value = "  [Composer] " + composer;
		    authorText.foregroundColor = "#e0e0e0";
		}
		else
		{
	        authorText.value = "  Unspecified"; 
		    authorText.foregroundColor = "#6f6f6f";
		}
    } 
    else 
    {
        authorText.foregroundColor = "#e0e0e0";
    }

    var bitrate = player.currentMedia.getItemInfo("Bitrate");
    var fileSize = player.currentMedia.getItemInfo("FileSize");

	//When playing directly from a CD, the bitrate and filesize will come back as 0.
	//Display "n/a" in the bitrate/filesize field in this case.
	if (bitrate == 0 && fileSize == 0)
	{
		bitrateAndFilesizeText.value = "  n/a";
		bitrateAndFilesizeText.foregroundColor = "#6f6f6f";
	}
	else
	{
		//Build a string with the bitrate of the current track in kpbs.
		//Show up to 2 decimal places, but show as few decimal places as possible.
		//(e.g. the display might be "128 kpbs" or "248.94 kbps")
		var bitrateString = Math.round(bitrate / 10) / 100 + " kbps";
	    
		//Build a string with the filesize in MB of the current track.  Always show a single
		//decimal place (e.g. "6.0 MB").
		var filesizeString = (fileSize / 1048576).toFixed(1) + " MB";
	    
		//Display the bitrate and filesize together in their corresponding field.
		bitrateAndFilesizeText.value = "  " + bitrateString + " / " + filesizeString;
		bitrateAndFilesizeText.foregroundColor = "#e0e0e0";
    }
    
    //If the current track duration is an hour long or more, reduce the font size and adjust the position 
    //of the time/duration field such that the information will fit into the available display area.
    if (player.currentMedia.duration >= 3600)  //3600 seconds == 1 hour
    {
        //It's over an hour long; use the small size.
        positionAndDurationText.fontSize = 6;
        positionAndDurationText.left = 222;
        positionAndDurationText.top = 87;
    }
    else
    {
        //Use the normal size.
        positionAndDurationText.fontSize = 8;
        positionAndDurationText.left = 226;
        positionAndDurationText.top = 85;
    }
    
    //Also refresh the current position and duration information.
    refreshTrackPositionDisplay();
}

//Updates the album art display.
function updateAlbumArt()
{
    //The following are two hacks that get the album art to (1) display, and (2) display at the proper size,
    //in the skin.  One is setting the background image of a subview to "WMPImage_AlbumArtSmall"; this appears
    //to be a "magic" keyword that will get WMP display the album art.  The second hack is to set the 
    //resizeBackgroundImage property of the subview to true, and to set the art to an empty string before 
    //setting it to the actual art.  (This apparently triggers WMP to display the proper album art, at the 
    //proper size.)  Display of album art in this manner appears to be a little-known trick; as of 9/2007,
    //there is only a single Google hit for "WMPImage_AlbumArtSmall" -- a site in Japanese!  Slightly more
    //info can be gleaned by searching for this keyword in Google Groups; that's where I found the 2nd hack,
    //in a post by "Stevie BM":
    // http://groups.google.com/group/microsoft.public.windowsmedia.player.skins/browse_thread/thread/a7089c9c79196ce9/15a067433dbe7d5a?lnk=st&q=wmpimage_albumartsmall&rnum=3&hl=en#15a067433dbe7d5a
    subview_AlbumArt.backgroundImage = '';
    subview_AlbumArt.backgroundImage = 'WMPImage_AlbumArtSmall';
}

//Refreshes the values of the position slider and the positionAndDurationText.
//This method should be called frequently (i.e. every 50ms) while a track is playing
//to keep the position slider and text updated.
function refreshTrackPositionDisplay() 
{
    var currentPositionString = player.controls.currentPositionString;
    if (currentPositionString == "")
    {
        currentPositionString = "-:--";
    }
    var durationString = player.currentmedia.durationString;
    if (durationString == "")
    {
        durationString = "-:--";
    }
    var positionAndDurationString = currentPositionString + " / " + durationString;
	positionAndDurationText.value = positionAndDurationString;
}

//Sets the specified text element to scroll if the text in the field is wider
//than the field itself; otherwise, stops the element from scrolling.  This function
//is intended to be called on the onMouseOver event of text element controls to
//scroll the text in the control while the mouse is over the control; the onMouseOut
//event should stop the control from scrolling.
function scrollIfNecessary(textElement)
{
    if (textElement.textwidth > textElement.width)
    {
        textElement.scrolling = true;
        textElement.scrollingAmount = 2;
    } 
    else 
    {
        textElement.scrolling = false;
    }
}

//Updates the visible enabled/disabled state of the shuffle and repeat buttons.
function updateShuffleRepeat()
{
    if (player.settings.getMode('shuffle')) 
    {
        shuffleEnabledButtonGroup.visible=true;
    }
    else 
    {
        shuffleEnabledButtonGroup.visible=false;
    }

    if (player.settings.getMode('loop')) 
    {
        repeatEnabledButtonGroup.visible=true;
    }
    else 
    {
        repeatEnabledButtonGroup.visible=false;
    }
}
