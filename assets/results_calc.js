function get_dict_values(dict) {
    var values = Object.keys(dict).map(function (key) {
        return dict[key];
    });
    return values;
}

function show_cmsg(score) {
    var red_score = Math.ceil(score / 500.0);
    var c_msg = "";
    switch (red_score) {
        case 1:
            c_msg = "Not bad !";
            break;
        case 2:
            c_msg = "Gooood !";
            break;
        case 3:
            c_msg = "Perfect !";
            break;
        case 4:
            c_msg = "Amazing !";
            break;
        case 5:
            c_msg = "Awesome !";
            break;
        case 6:
            c_msg = "Majestic !";
            break;
        case 7:
            c_msg = "Maestro !";
            break;
        case 8:
            c_msg = "Unique !";
            break;
        case 9:
            c_msg = "Expert !";
            break;
        default:
            c_msg = "Perfect !";
    }
    $('#c_msg').html(c_msg);
    $('#c_msg').attr("data-shadow", c_msg)
}

function calc_results(b_vc, b_vd, r_vc, r_vd, score) {

    var l_com_bv = Object.keys(b_vc).filter(value => Object.keys(b_vd).includes(value));
    var l_com_rv = Object.keys(r_vc).filter(value => Object.keys(r_vd).includes(value));
    var rt_bv = [];
    var rt_rv = [];
    var data_hc_bv = [];
    var data_hc_rv = [];

    l_com_bv.forEach(function (item) {
        rt_bv.push((b_vd[item] - b_vc[item]) / 1000.0);
        data_hc_bv.push([item, (b_vd[item] - b_vc[item]) / 1000.0]);
    });
    l_com_rv.forEach(function (item) {
        rt_rv.push((r_vd[item] - r_vc[item]) / 1000.0);
        data_hc_rv.push([item, (r_vd[item] - r_vc[item]) / 1000.0]);
    });
    var all_rt = rt_bv.concat(rt_rv);

    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const arrMin = arr => Math.min(...arr);

    var Min_rt_bv = arrMin(rt_bv);
    var Min_rt_rv = arrMin(rt_rv);
    var abs_min_rt = Math.min(Min_rt_bv, Min_rt_rv);

    var Avg_rt_bv = arrAvg(rt_bv);
    var Avg_rt_rv = arrAvg(rt_rv);
    var Avg_all_rt = arrAvg(all_rt);

    $("#nb_kv").html(all_rt.length.toString());
    $("#art_kv").html(Avg_all_rt.toFixed(2).toString());
    $('#stats_lptrt').html(Object.keys(b_vd).length.toString());
    $('#stats_lptrb').html("/" + Object.keys(b_vc).length.toString());
    $('#stats_lpbrt').html(Object.keys(r_vd).length.toString());
    $('#stats_lpbrb').html("/" + Object.keys(r_vc).length.toString());
    $('#stats_rpt_n').html(Avg_rt_bv.toFixed(2).toString() + "&nbsp;s");
    $('#stats_rpb_n').html(Avg_rt_rv.toFixed(2).toString() + "&nbsp;s");




    Highcharts.chart('rt_plots', {
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderRadius: "20px",
            height: (0.25 * $(window).height()) + "px"

        },
        title: {
            text: 'your reaction time (seconds)',
            style: {
                "color": "#FFFFFF",
                "fontSize": "22px"
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                threshold: null
            }
        },
        xAxis: {
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            visible: false
        },
        yAxis: {
            labels: {
                style: {
                    "color": "#FFFFFF",
                    "fontSize": "16px"
                }
            },
            title: {
                text: null
            },
            gridLineWidth: 0
        },
        colors: ['#113acf', '#f52916'],
        series: [{
            type: 'areaspline',
            name: 'blue reaction times',
            data: data_hc_bv,
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#113acf'],
                    [1, Highcharts.color('#113acf').setOpacity(0).get('rgba')]
                ]
            }
        }, {
            type: 'areaspline',
            name: 'red reaction times',
            data: data_hc_rv,
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#f52916'],
                    [1, Highcharts.color('#f52916').setOpacity(0).get('rgba')]
                ]
            }
        }]
    });
}