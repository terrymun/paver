# Paver
[![Build Status](https://travis-ci.org/terrymun/paver.svg?branch=master)](https://travis-ci.org/terrymun/paver) ![Latest Github release](https://img.shields.io/github/release/terrymun/paver.svg?style=flat)

Replicating the photo viewer/panner seen on the experimental Facebook Pages app. [View demo here](http://terrymun.github.io/paver/).

Paver had been tested in the latest versions of Chrome, Firefox, Safari and iOS Safari.

Special thanks to:

- [jQuery Plugin Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate), which made authoring Paver a lot easier

## Introduction

**Paver** was initially a simple personal project to make panoramas more accessible. After upgrading from an iPhone 4 to a spanking new 6, I unlocked the world of panoramas made by a single, steady wave of the hand. Panoramas are breathtakingly beautiful when used correctly, but I have always been frustrated with how the default screens, in aspect ratios that are largely incompatible with the ultrawide format of panoramas, don't do these work much justice.

There is indeed an extremely lightweight way of displaying panoramas on a page—you simply wrap it within a container which allows content to oveflow along the x-axis. The markup is straightfoward:

```html
<div class="panorama">
    <img src="/path/to/image" alt="" title="" />
</div>
```

&helip;and the CSS (in SASS/SCSS flavour) would look something like this:

```css
.panorama {
	height: 400px;
	overflow-x: scroll;
	overflow-y: hidden;
	img {
		height: 100%;
	}
}
```

However, this requires user to drag the scrollbar in order to pan around the panorama. What if we can exploit mouse movement, and even device orientation/rotation, to enhance the user experience of panorama viewing? That is why Paver was developed.

There are two parts to how Paver works—firstly, it converts a simple markup, which is essentially an image wrapped in a division element, into something that the plugin can further work with. When that is done, it uses JS to listen to several events that will indicate how the user would want the panorama viewport be positioned. It works using the said markup as mentioned above.

Paver is a bit on the heavy side, weighing **10.93kb** for the minified code. However, if you serve the minified code with gzip compression, it only weighs **3.28kb**.

## Features
### Orientation-adjusted motion detection
Paver uses `deviceorientation` to access the gyroscope data from a device, if available. It translates rotation along the x and z axis into panning action. More importantly, Paver intelligently sniffs out the screen orientation in order to perform motion translation properly.

### Mouse as a panning proxy
Paver listens to jQuery's proprietary `mousemove` event, where the cursor position relative to the panorama container is recorded. Paver uses these coordinates to move the inner panorama image using CSS3 transforms.

### Responsive and mobile friendly
Paver reacts to viewport size changes, and is smart enough to determine when panning is no longer necessary in order to view the panorama in its entirety. It also intelligently checks on screen orientation on mobile devices, so it will work flawlessly regardless of your device orientation.

### Graceful degradation
No JS? No problem—with the basic styles in place, your panorama can still be viewed in its all its beauty even when the end-user have JavaScript turned off in their browser. Paver also offers the option to [display failure messages](http://terrymun.github.io/paver/demo/usage-notes.html#config__failure-message) when gyroscopic data is unavailable on mobile, touch-based devices.

----

## Installation
To install Paver, you will have to include the following resources in your page. The JS files should be loaded in the order stipulated below. For the CSS file, you can either incorporate it with your site's stylesheet, or load it externally through the `<link>` element in `<head>`.

| Type | File Name            | Description                                                                                                            |
|------|----------------------|------------------------------------------------------------------------------------------------------------------------|
| JS   | [jQuery 1.x](http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js) | **External Dependency**: The *latest verson* of jQuery 1.x library is needed for Paver functionality. Minimum version requirement: v1.7       |
| JS   | [jQuery Throttle/Debounce plugin](https://github.com/cowboy/jquery-throttle-debounce) by Ben Alman | **External Dependency**: Required to properly debounce certain events that might be computationally heavy for the browser. |
| JS   | `jquery.paver.js` | Confers the main functionality of Paver. Alternatively, you can load the minified version, `jquery.paver.min.js` |
| CSS  | `./css/paver.css`   | Offers styles that are crucial for the correct display of Paver. The appearance will break if this is not included. |

In order to support CSS animation and transformation applied by `paver.css` in browsers that require vendor prefixes, you should consider using [prefixfree.js](http://leaverou.github.com/prefixfree/) as a dependency.

----

## Usage
### Dependencies
Paver requires [jQuery v1.7 and above](http://jquery.com/), as well as Ben Alman's [jQuery Throttle/Debounce plugin](https://github.com/cowboy/jquery-throttle-debounce). For jQuery, you can use the one [hosted by Google API](http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js), or the [stable releases hosted by jQuery CDN](https://code.jquery.com/). For the throttle/debounce plugin, you can use the one [available via cdnjs](http://cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js).

### Basic usage
To implement Paver, make sure you have the following markup:

```html
<div class="panorama">
    <img src="/path/to/image" alt="" title="" />
</div>
```

Simply chain the `.paver()` method to a selector of choice, i.e.

```
$(function() {
	$('div.panorama').paver();
});
```

As per standard jQuery plugins, `.paver()` will return the original object, allowing for further chaining if desired. For configuration options, please refer to [configuration options](http://terrymun.github.io/paver/demo/usage-notes.html#configuration-options).

----

## Resources and documentation
### Usage notes &amp; plugin configuration
For detailed usage notes, please refer to the [Usage Notes](http://terrymun.github.io/paver/demo/usage-notes.html) page. Plugin configuration options are also available in the page. Here is a brief overview of the possible configuration options for Paver:

```js
defaults = {
	// Failure message settings
	failureMessage: 'Scroll left/right to pan through panorama.',
	failureMessageInsert: 'after',
	gracefulFailure: true,

	// Display settings
	meta: false,
	responsive: true,
	startPosition: 0.5,

	// Minimum overflow before panorama gets converted into a Paver instance
	minimumOverflow: 200,

	// Performance
	grain: 3,
	panningThrottle: 100,
	resizeThrottle: 500,

	// For mousemove event
	mouseSmoothingFunction: 'linear',
	
	// For deviceOrientationEvent
	tilt: true,
	tiltSensitivity: 0.2,
	tiltScrollerPersistence: 500,
	tiltSmoothingFunction: 'gaussian',
	tiltThresholdPortrait: 12,
	tiltThresholdLandscape: 24
};
```

### Advanced usage
For examples of advanced usage, please refer to the [Advanced Usage](http://terrymun.github.io/paver/demo/advanced-usage.html) page.

### Custom triggers
Paver supports custom triggers, which allows developers to force recomputation in the event of user-interaction that is not predicted, due to its non-exhaustiveness and limitless possibilities, by the plugin. In addition, Paver will also fire custom events to allow developers to track the initialization progress of the plugin. Please refer to [Custom Triggers & Events](http://terrymun.github.io/paver/demo/custom-triggers-events.html) for more information.

----

## Frequently Asked Questions
1.  **Paver is not working in my installation. Where should I start?**  
Start by checking your browser's console log. What error messages do you see? Also, make sure that you are using the *latest* version of jQuery 1.x (minimum requirement: v1.8 or above) and that the dependencies have been loaded successfully. Also, did you remember reading the [usage precautions](#precautions)? You might have encountered a scenario where Paver is not designed to handle.

2. **The image url isn't being interpretted correctly.**  
Paver fetches the original panorama based on the URL specified in the `src` attribute of the **first occuring** image element (`<img />`). Spacebar characters in image URLs must be escaped properly, as per the [RFC 2396 standard](http://tools.ietf.org/html/rfc2396).

3. **I have a application-specific problem that I need help troubleshooting. Can you help me?**  
*Of course!* I am more than happy to help, but it really depends if you have a clear problem statement and a [minimal, complete and verifiable example (MCVE)](http://stackoverflow.com/help/mcve) that I can play around with&mdash;I strongly encourage you to host your reduced test case(s) with either [JSFiddle](http://jsfiddle.net/), [CodePen](http://codepen.io/) or the likes. Then, [create a new issue](https://github.com/terrymun/Paver/issues). I promise I will get back to you when I have time.

4. **Do you provide private support by email / phone call / Skype call / (insert any other forms of communication)?**  
Since Paver is provided as-is and free-of-charge, I am sorry to inform you that it is so far not possible for me to dedicate so much effort. However, you can follow what is described in step #4.


## Changelog
| Version | Comments |
|---------|----------|
| 1.0.0   | Official release |

