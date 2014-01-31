/**
 * a11yChart jQuery Plugin
 *
 * Builds accessible charts in the DOM based on JSON formatted data
 *
 *
 * Copyright 2014 Paul Rentschler
 * Released under the MIT license
 *
 * Date: 2014-01-31
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

            function setupChart ()
            {
                var $chart = $t;
                if (!($t.is("ul") || $t.is("ol"))) {
                    var $chart = $("<ul />");
                    $t.append($chart);
                }
                var typeClass = params.type;
                if (params.type == "sparklines") {
                    typeClass = "sparklist";
                }
                $chart.addClass("a11ychart").addClass(typeClass);
                return $chart;
            }

            switch (params.type)
            {
                case "horizontal-bar":
                    var $chart = setupChart();
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
                    var $chart = setupChart();
                    var max = 0;
                    $.each(params.data, function(key, value) {
                        if (value > max) {
                            max = value;
                        }
                    });
                    $.each(params.data, function(key, value) {
                        var ratio = parseInt((value / max) * 100);
                        var label = new Date(Date.parse(key)).getUTCDate();
                        var title = new Date(Date.parse(key)).toUTCString()
                            + ": " + value;
                        $chart.append(
                            $("<li></li>").append(
                                $("<span />").addClass("entry").attr(
                                    "title",
                                    title
                                ).append(
                                    $("<span />").addClass("label").text(label)
                                ).append(
                                    $("<span />").addClass("count").css(
                                        "height",
                                        ratio + "%"
                                    ).text("(" + value + ")")
                                )
                            )
                        );
                    });
                    break;

                case "sparklines":
                    var $chart = setupChart();
                    var max = 0;
                    $.each(params.data, function(key, values) {
                        $.each(values, function(index, value) {
                            if (value > max) {
                                max = value;
                            }
                        });
                    });

                    $.each(params.data, function(key, values) {
                        var $sparkChart = $("<span />").addClass("sparkline");
                        $.each(values, function(index, value) {
                            var ratio = parseInt((value / max) * 100);
                            var label = value + ", ";
                            if (index == 0) { label = "(" + value + ", "; }
                            else if (index == values.length - 1) {
                                label = value + ")";
                            }
                            $sparkChart.append(
                                $("<span />").addClass("index").append(
                                    $("<span />").addClass("count").css(
                                        "height",
                                        ratio + "%"
                                    ).text(label)
                                )
                            );
                        });

                        $chart.append(
                            $("<li></li>").append($sparkChart).append(
                                $("<span />").addClass("label").text(key)
                            )
                        );
                    });
                    break;
            }
        });

        // allow jQuery chaining
        return this;
    };
})(jQuery);
