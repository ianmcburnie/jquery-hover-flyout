describe("jquery.hoverflyout.js", function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

    var dummyEventTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL / 2;

    var dom = '<div class="flyout">'
                + '<button class="flyout__trigger">Trigger</button>'
                + '<div class="flyout__live-region">'
                    + '<div class="flyout__overlay">'
                        + '<h2>Flyout Title</h2>'
                        + '<p>Flyout Content</p>'
                        + '<button id="inner_button">Inner Button</button>'
                    + '</div>'
                + '</div>'
            + '</div>'
            + '<button id="outer_button">Outer Button</button>';

    var $widget, $button, $overlay;

    var dummyEventHandlers = {
        onButtonFocus : function(e) {},
        onFlyoutCollapse : function(e) {}
    };

    beforeEach(function() {
        $('body').empty().append($(dom));
        $widget = $('.flyout');
        $trigger = $('.flyout__trigger');
        $overlay = $('.flyout__overlay');
        $innerButton = $overlay.find('#inner_button');
        $outerButton = $('#outer_button');
    });

    it("should ensure id on container", function() {
        $widget.hoverFlyout();
        expect($widget.prop('id')).not.toBe(undefined);
    });

    it("should ensure id on overlay", function() {
        $widget.hoverFlyout();
        expect($overlay.prop('id')).not.toBe(undefined);;
    });

    it("should add aria-controls property to trigger", function() {
        $widget.hoverFlyout();
        expect($trigger.attr('aria-controls')).not.toBe(undefined);
    });

    it("should add aria-expanded state to trigger", function() {
        $widget.hoverFlyout();
        expect($trigger.attr('aria-expanded')).not.toBe(undefined);
    });

});
