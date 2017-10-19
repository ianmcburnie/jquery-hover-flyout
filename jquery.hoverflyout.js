/**
* @file jQuery plugin that creates the basic interactivity for a flyout that opens on hover of trigger element
* @version 0.0.5
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires jquery-next-id
* @requires jquery-mouse-exit
*/
(function($, window, document, undefined) { // eslint-disable-line no-unused-vars
    /**
    * jQuery plugin that creates the basic interactivity for a flyout that opens on hover of trigger element
    *
    * @method "jQuery.fn.hoverFlyout"
    * @param {string} [options.overlaySelector] - selector for overlay element (default: '.flyout__overlay')
    * @param {string} [options.triggerSelector] - selector for trigger element (default: '.flyout__trigger')
    * @param {string} [options.expandedClass] - if present, uses this class instead of aria-expanded (default: null)
    * @fires {object} flyoutExpand - the flyout has closed
    * @fires {object} flyoutCollapse - the flyout has opened
    * @return {jQuery} chainable jQuery class
    */
    $.fn.hoverFlyout = function hoverFlyout(options) {
        options = $.extend({
            debug: false,
            triggerSelector: '.flyout__trigger',
            overlaySelector: '.flyout__overlay',
            expandedClass: null
        }, options);

        return this.each(function onEach() {
            var $widget = $(this);
            var $trigger = $widget.find(options.triggerSelector).first();
            var $overlay = $widget.find(options.overlaySelector);

            var hasExpandedClass = function() {
                return options.expandedClass !== null;
            };

            // get expanded state
            var isExpanded = function() {
                return hasExpandedClass() ?
                    $widget.hasClass(options.expandedClass) : $trigger.attr('aria-expanded') === 'true';
            };

            // set state to expanded
            var setExpanded = function() {
                return hasExpandedClass() ?
                    $widget.addClass(options.expandedClass) : $trigger.attr('aria-expanded', 'true');
            };

            // set state to collapsed
            var setCollapsed = function() {
                return hasExpandedClass() ?
                    $widget.removeClass(options.expandedClass) : $trigger.attr('aria-expanded', 'false');
            };

            // expand the overlay
            var expandFlyout = function() {
                if (!isExpanded()) {
                    setExpanded();
                    $widget.trigger('flyoutExpand');
                }
            };

            // collapse the overlay
            var collapseFlyout = function() {
                if (isExpanded()) {
                    setCollapsed();
                    $widget.trigger('flyoutCollapse');
                }
            };

            // assign next id in sequence if one doesn't already exist
            $widget.nextId('flyout');

            // ensure overlay has an ID
            if ($overlay.prop('id') === '') {
                $overlay.prop('id', $widget.prop('id') + '-overlay');
            }

            // the input controls the overlay's expanded state
            $trigger.attr('aria-controls', $overlay.prop('id'));

            // begin in a collapsed state
            setCollapsed();

            // listen for focus on trigger
            $trigger.on('mouseover', expandFlyout);

            // plugin for detecting focus exit
            $widget.mouseExit();

            // listen for focus exiting widget
            $widget.on('mouseExit', collapseFlyout);

            // add class to signify that js is available
            $widget.addClass('flyout--js');
        });
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* flyoutExpand event
*
* @event flyoutExpand
* @type {object}
* @property {object} event - event object
*/

/**
* flyoutCollapse event
*
* @event flyoutCollapse
* @type {object}
* @property {object} event - event object
*/
