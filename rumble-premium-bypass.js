javascript:(function(){
  // Check if on Rumble.com
  if(!window.location.hostname.includes('rumble.com')){
    alert('ERROR: Not a Rumble.com page.');
    return;
  }

  const urls = [];

  // Intercept fetch requests
  const originalFetch = window.fetch;
  window.fetch = function(...args){
    const url = args[0];
    if(typeof url === 'string' && url.includes('chunklist_DVR.m3u8')){
      urls.push(url);
    }
    return originalFetch.apply(this, args);
  };

  // Intercept XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url){
    if(typeof url === 'string' && url.includes('chunklist_DVR.m3u8')){
      urls.push(url);
    }
    return originalOpen.apply(this, arguments);
  };

  // Wait for requests to complete, then show popup
  setTimeout(() => {
    if(urls.length === 0){
      alert('No live stream URL found.  Try playing the video or reloading.');
      return;
    }

    const text = urls[0];

    // Reuse existing popup if still open
    if(window.dvrPopup && !window.dvrPopup.closed){
      window.dvrPopup.document.getElementById('urls').value = text;
      window.dvrPopup.focus();
      return;
    }

    // Create new popup
    const popup = window.open('', 'Rumble Premium Lockout Bypass', 'width=600,height=240');
    window.dvrPopup = popup;
    popup.document.write('<html><head><title>Rumble Premium Lockout Bypass</title></head><body style="font-family:monospace;padding:10px;"><h2>Live Stream URL found:</h2><input id="urls" type="text" style="width:100%;padding:8px;font-size:12px;" readonly value="'+text+'"><br><br><p style="font-size:12px;line-height:1.5;">Open <a href="https://www.videolan.org/" target="_blank">VLC</a> and paste the URL into Media -&gt; Open Network Stream... — it will continue playing past the Rumble Premium lockout!</p><br><button onclick="document.getElementById(\'urls\').select();document.execCommand(\'copy\');document.getElementById(\'copyMsg\').style.display=\'inline\';setTimeout(()=>{document.getElementById(\'copyMsg\').style.display=\'none\';},2000);" style="padding:8px 16px;font-size:14px;">Copy</button><span id="copyMsg" style="display:none;color:blue;margin-left:10px;">Copied!</span></body></html>');
  }, 2000);
})();
