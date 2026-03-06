# Rumble Premium Bypass

A simple JavaScript bookmarklet that extracts the live stream URL from Rumble.com live streams, allowing you to bypass the paywall lockout by playing the stream directly in VLC.

## How It Works

When you run this bookmarklet on a Rumble.com live stream page, it intercepts the network requests and captures the HLS stream URL. You can then paste this URL directly into VLC's "Open Network Stream" dialog, which will play the stream, and continue past the paywall lockout.

## Installation

### Quick Install (Drag & Drop)

The easiest way to install this bookmarklet is to visit the link below and drag the bookmarklet link to your browser's bookmark bar:

[Install Rumble Premium Bypass Bookmarklet](https://htmlpreview.github.io/?https://github.com/AltSpiral/Rumble-Premium-Bypass/blob/main/bookmarklet.html)

### Manual Installation

If drag-and-drop doesn't work, you can manually create a bookmark:

1. **Create a new bookmark** in your browser (Ctrl+D or Cmd+D)
2. **Name it:** `Rumble - Premium Bypass`
3. **Paste the code below** into the URL field:

```javascript
javascript:(function(){if(!window.location.hostname.includes('rumble.com')){alert('ERROR: Not a Rumble.com page.');return;}const urls=[];const originalFetch=window.fetch;window.fetch=function(...args){const url=args[0];if(typeof url==='string'&&url.includes('chunklist\_DVR.m3u8')){urls.push(url);}return originalFetch.apply(this,args);};const originalOpen=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(method,url){if(typeof url==='string'&&url.includes('chunklist\_DVR.m3u8')){urls.push(url);}return originalOpen.apply(this,arguments);};setTimeout(()=>{if(urls.length===0){alert('No live stream URL found.  Try playing the video or reloading.');return;}const text=urls[0];if(window.dvrPopup&&!window.dvrPopup.closed){window.dvrPopup.document.getElementById('urls').value=text;window.dvrPopup.focus();return;}const popup=window.open('','Rumble Premium Lockout Bypass','width=600,height=240');window.dvrPopup=popup;popup.document.write('<html><head><title>Rumble Premium Lockout Bypass</title></head><body style="font-family:monospace;padding:10px;"><h2>Live Stream URL found:</h2><input id="urls" type="text" style="width:100%;padding:8px;font-size:12px;" readonly value="'+text+'"><br><br><p style="font-size:12px;line-height:1.5;">Open <a href="https://www.videolan.org/" target="\_blank">VLC</a> and paste the URL into Media -&gt; Open Network Stream... — it will continue playing past the Rumble Premium lockout!</p><br><button onclick="document.getElementById(\'urls\').select();document.execCommand(\'copy\');document.getElementById(\'copyMsg\').style.display=\'inline\';setTimeout(()=>{document.getElementById(\'copyMsg\').style.display=\'none\';},2000);" style="padding:8px 16px;font-size:14px;">Copy</button><span id="copyMsg" style="display:none;color:blue;margin-left:10px;">Copied!</span></body></html>');},2000);})();
```

4. Save the bookmark

## Usage

1.  **Navigate to a Rumble.com live stream**  that requires a premium subscription
2.  **Click the bookmarklet**  in your bookmark bar
3.  **Play the video**  (the bookmarklet needs to capture the network request)
4.  **A popup window will appear**  with the extracted stream URL
5.  **Click "Copy"**  to copy the URL to your clipboard
6.  **Open VLC**  and go to  **Media → Open Network Stream...**
7.  **Paste the URL**  and click Play
8.  The stream will play without the premium paywall!

## Requirements

-   A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
-   [VLC Media Player](https://www.videolan.org/)  installed
-   A Rumble.com premium stream to extract from

## How It Works (Technical Details)

The bookmarklet works by:

1.  **Checking**  that you're on a Rumble.com page
2.  **Intercepting**  all  `fetch()`  and  `XMLHttpRequest`  calls
3.  **Capturing**  any URLs that contain  `chunklist_DVR.m3u8`  (the HLS playlist file)
4.  **Displaying**  the captured URL in a popup window with a copy button
5.  **Allowing**  you to paste it into VLC for playback

The stream URL is a direct link to the HLS (HTTP Live Streaming) playlist, which VLC can play directly, bypassing Rumble's premium authentication.

## Disclaimer

This tool is provided for educational purposes. Use responsibly and in accordance with applicable laws and Rumble's terms of service. The author is not responsible for misuse.

## License
MIT License - Feel free to use, modify, and distribute as needed.