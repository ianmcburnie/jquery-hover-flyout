/**
* @file jQuery plugin that creates the basic interactivity for a flyout that opens on hover of trigger element
* @version 0.0.1
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires jquery-next-id
* @requires jquery-mouse-exit
*/
(function($, window, document, undefined) {
    /**
    * jQuery plugin that creates the basic interactivity for a flyout that opens on hover of trigger element
    *
    * @method "jQuery.fn.hoverFlyout"
    * @param {boolean} [options.overlaySelector] - selector for overlay element (default: '.flyout__overlay')
    * @param {boolean} [options.triggerSelector] - selector for trigger element (default: '.flyout__trigger')
    * @fires {object} flyoutExpand - the flyout has closed
    * @fires {object} flyoutCollapse - the flyout has opened
    * @return {jQuery} chainable jQuery class
    */
    $.fn.hoverFlyout = function hoverFlyout(options) {
        options = $.extend({
            debug: false,
            triggerSelector: '.flyout__trigger',
            overlaySelector: '.flyout__overlay'
        }, options);

        return this.each(function onEach() {
            var $widget = $(this);
            var $trigger = $widget.find(options.triggerSelector).first();
            var $overlay = $widget.find(options.overlaySelector);

            // set state to expanded
            var expandFlyout = function() {
                if ($trigger.attr('aria-expanded') === 'false') {
                    $trigger.attr('aria-expanded', 'true');
                    $overlay.attr('aria-hidden', 'false');
                    $widget.trigger('flyoutExpand');
                }
            };

            // set state to collapsed
            var collapseFlyout = function() {
                if ($trigger.attr('aria-expanded') === 'true') {
                    $trigger.attr('aria-expanded', 'false');
                    $overlay.attr('aria-hidden', 'true');
                    $widget.trigger('flyoutCollapse');
                }
            };

            // assign next id in sequence if one doesn't already exist
            $widget.nextId('flyout');

            // assign id to overlay and hide element
            $overlay
                .prop('id', $widget.prop('id') + '-overlay')
                .attr('aria-hidden', 'true');

            // the input controls the overlay's expanded state
            $trigger
                .attr('aria-controls', $overlay.prop('id'))
                .attr('aria-expanded', 'false');

            // listen for focus on trigger
            $trigger.on('mouseover', expandFlyout);

            // plugin for detecting focus exit
            $widget.mouseExit();

            // listen for focus exiting widget
            $widget.on('mouseExit', collapseFlyout);
        });
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* flyoutOpen event
*
* @event flyoutExpand
* @type {object}
* @property {object} event - event object
*/

/**
* flyoutClose event
*
* @event flyoutCollapse
* @type {object}
* @property {object} event - event object
*/
