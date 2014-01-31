/**
 * Builds accessible charts in the DOM based on JSON formatted data
 *
 * @author     Paul Rentschler <paul@rentschler.ws>
 * @since      31 January 2014
 */

(function($) {
    $.fn.a11yChart = function(params)
    {
        // merge default and user parameters
        params = $.extend({
            type: "horizontal-bar",
            data: {}
        }, params);

        this.each(function() {
            // code goes here to generate the charts


        });

        // allow jQuery chaining
        return this;
    };
})(jQuery);