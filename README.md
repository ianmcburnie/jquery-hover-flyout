# jquery-hover-flyout

<p>
    <a href="https://travis-ci.org/ianmcburnie/jquery-hover-flyout"><img src="https://api.travis-ci.org/ianmcburnie/jquery-hover-flyout.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/ianmcburnie/jquery-hover-flyout?branch=master'><img src='https://coveralls.io/repos/ianmcburnie/jquery-hover-flyout/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-hover-flyout"><img src="https://david-dm.org/ianmcburnie/jquery-hover-flyout.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-hover-flyout#info=devDependencies"><img src="https://david-dm.org/ianmcburnie/jquery-hover-flyout/dev-status.svg" alt="devDependency status" /></a>
</p>

jQuery plugin that creates the basic interactivity for a flyout that opens on hover of trigger element

```js
$(selector).hoverFlyout();
```

## Experimental

This plugin is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
npm install jquery-hover-flyout
```

## Example

Markup before plugin:

```html
<div class="flyout">
    <input class="flyout__trigger" />
    <div class="flyout__live-region" aria-live="off">
        <div class="flyout__overlay">
            <!-- flyout content -->
        </div>
    </div>
</div>
```

Execute plugin:

```js
$('.flyout').hoverFlyout();
```

Markup after plugin:

```html
<div class="flyout" id="inputflyout-0">
    <input aria-controls="inputflyout-0-overlay" aria-expanded="false" />
    <div class="flyout__live-region" aria-live="off">
        <div class="flyout__overlay" id="inputflyout-0-overlay">
            <!-- flyout content -->
        </div>
    </div>
</div>
```

'Hover' event on button will now toggle aria-expanded state of button. CSS can use this state to hide/show overlay. For example:

```css
.flyout__overlay {
    display: none;
    position: absolute;
    z-index: 1;
}
.flyout__trigger[aria-expanded=true] ~ .flyout__live-region > .flyout__overlay {
    display: block;
}
```

## Params

* `options.overlaySelector` - selector for overlay element (default: '.flyout__overlay')
* `options.triggerSelector` - selector for trigger element (default: '.flyout__trigger')
* `options.expandedClass` - if present, uses this class instead of aria-expanded (default: null)

## Events

* `flyoutExpand` - the flyout has expanded
* `flyoutCollapse` - the flyout has collapsed

## Development

Useful NPM task runners:

* `npm start` for local browser-sync development.
* `npm test` runs tests & generates reports (see reports section below)
* `npm run tdd` test driven development: watches code and re-tests after any change
* `npm run build` cleans, lints, tests and minifies

Execute `npm run` to view all available CLI scripts.

## Reports

Each test run will generate the following reports:

* `/test_reports/coverage` contains Istanbul code coverage report
* `/test_reports/html` contains HTML test report
* `/test_reports/junit` contains JUnit test report

## CI Build

https://travis-ci.org/ianmcburnie/jquery-hover-flyout

## Code Coverage

https://coveralls.io/github/ianmcburnie/jquery-hover-flyout?branch=master
