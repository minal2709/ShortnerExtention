ACCESS_TOKEN = '' //Add your access token here

var accessToken
var login
var apikey

window.onload = function(){
  chrome.tabs.getSelected(null, function(tab) {
    $.ajax({
      url: 'https://api-ssl.bitly.com/v3/shorten?access_token='+ ACCESS_TOKEN + '&longUrl=' + tab.url,
      success: function (res) {
        if (res.status_code === 200) {
          copyTextToClipboard(res.data.url)
          $('#copy').text("Copied to clipboard");
          $('#result').text(res.data.url);
        } else {
          copyTextToClipboard(tab.url)
          $('#copy').text(res.status_txt);
          $('#result').text(tab.url);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('#copy').text("Error");
        $('#result').text(textStatus);
      }
    })
  });
};

function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}
