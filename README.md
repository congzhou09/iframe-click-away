[![npm version](https://badge.fury.io/js/iframe-click-away.svg)](https://badge.fury.io/js/iframe-click-away)

## iframe-click-away

◇ Most tooltip and popup tools has a "click away" feature, which allows users to close a tooltip, popup, or modal by clicking anywhere outside of it.

◇ When there's a iframe in page, "click away" won't work between regions in outer page and in inner iframe.

◇ This tool is used to let "click away" work in the above scenario, with less codes.

◇ Mechanism: when a click occurs on one side, a mimetic click will be triggered on the other side at (clientX, clientY), which defaults to (2,2).

## usage

◆ Install this npm dependency.

◆ On the outer side:

```
import { Outer } from 'iframe-click-away';

// get iframe window
const iframeWindow = iframe.contentWindow;

// provide info about inner iframe and outer page, and outer optional mimetic click position.
const outer = new Outer(iframeWindow, window /*,clientX, clientY*/);

// init
outer.init();

// invoke deinit() when destroying process is needed
outer.deinit();

```

◆ On the inner side:

```
import { Inner } from 'iframe-click-away';

// get outer page's window
const outerWindow = window.parent;

// provide info about inner iframe and outer page, and inner optional mimetic click position.
const inner = new Inner(window, outerWindow /*,clientX, clientY*/);

// init
inner.init();

// invoke deinit() when destroying process is needed
inner.deinit();

```
