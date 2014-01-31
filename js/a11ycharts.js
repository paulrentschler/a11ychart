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
            // express a single node as a jQuery object
            var $t = $(this);

            switch (params.type)
            {
                case "horizontal-bar":
                    if ($t.is("ul")) {
                        var $chart = $t;
                    } else {
                        var $chart = $("<ul></ul>");
                        $t.append($chart);
                    }

                    $chart.addClass("a11ychart horizontal-bar");
                    var total = 0;
                    $.each(params.data, function(key, value) {
                        total += value;
                    });
                    $.each(params.data, function(key, value) {
                        var ratio = parseInt((value / total) * 100);
                        $chart.append(
                            $("<li></li>").append(
                                $("<span />").addClass("label").text(key)
                            ).append(
                                $("<span />").addClass("count").text(value)
                            ).append(
                                $("<span />").addClass("ratio").css(
                                    "width",
                                    ratio + "%"
                                ).text("(" + ratio + "%)")
                            )
                        );
                    });
                    break;

                case "timeline":
                    break;

                case "sparklines":
                    break;
            }
        });

        // allow jQuery chaining
        return this;
    };
})(jQuery);