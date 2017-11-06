yt-url-at-time
==============

Get timestamped URLs for YouTube videos easily.

Installation
------------

This is a userscript so you need a browser extension that can run them:

  * ViolentMonkey | [Firefox][vm_ff] | [Chrome][vm_ch] | [Others][vm] | _Recommended_
  * GreaseMonkey | [Firefox][gm_ff]
  * TamperMonkey | [Firefox][tm_ff] | [Chrome][tm_ch]

Then you need to get the userscript itself. At the moment, it is hosted at [OpenUserJS][openuserjs].

Usage
-----

Clicking the current time on YouTube's video player will modify the URL, adding a timestamp hash to it:

![Click on the current time][click]

begets:

![Timestamped URL][url]

By using:

  * `Alt + click`: you get a precise timestamp, including fractional seconds
  * `Ctrl + click`: the final URL is copied to the clipboard

These keys can be combined, so `Alt + Ctrl + click` will copy a precisely timestamped URL to your system clipboard.

Alternatively, you can use the shortcut:

  * ``Alt + ` ``

Which will do the same as a plain click but with just the keyboard.

_Currently the hotkeys are not configurable, nor is it possible to get a precise timestamp or have it copied to the clipboard using this shortcut._

In case of trouble
------------------

Report bugs in this repository. Comments in other locations are likely to be missed.

[vm]: https://violentmonkey.github.io/get-it/
[gm_ff]: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
[tm_ff]: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
[tm_ch]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
[vm_ff]: https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/
[vm_ch]: https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag
[openuserjs]: https://openuserjs.org/scripts/MechaLynx/yt-url-at-time

[click]: img/click.png "Click on the current time"
[url]: img/url.png "Timestamped URL"