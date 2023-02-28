
$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window)
        .scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window)
        .scrollLeft()) + "px");
    return this;
}

$(".gif").click(function () {
    $("#pokemon").fadeIn().center();
    setTimeout(function () {
        $("#pokemon").fadeOut()
    }, 1000);
})



// code to generate random markers in map

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomizeImg(el, top, down, left, right) {
    el.style.position = "absolute";

    let marker_width_bias = ($('.map-mark').width()) / 2;
    let marker_height_bias = ($('.map-mark').height()) / 2;

    el.style.top = randint(top + marker_height_bias * 3, down - marker_height_bias * 3) + "px";
    el.style.left = randint(left + marker_width_bias * 3, right - marker_width_bias * 3) + "px";
}

var inner_divs = $('.grid-list');
var divs = $('.grid-box');


let img = $('.map-img');
let img_pos = img.position();
let img_left = img_pos.left;
let img_top = img_pos.top;
let img_width = img.width();
let img_height = img.height();


for (let i = 0; i < inner_divs.length; i++) {

    let lis = inner_divs[i].children;
    let row = Math.floor(i / 4);


    // return [(height / 3) + top, left + (width / 4) * row, (left + ((width / 4) * (row + 1)))];



    for (let j = 0; j < lis.length; j++) {
        let top = img_top + (img_height / 3) * row;
        let bottom = top + (img_height / 3);

        let left = img_left + (img_width / 4) * (i % 4);
        let right = left + (img_width / 4);

        randomizeImg(lis[j], top, bottom, left, right);
    }
}


jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
    return this.each(function () {
        var clicks = 0, self = this;
        jQuery(this).click(function (event) {
            clicks++;
            if (clicks == 1) {
                setTimeout(function () {
                    if (clicks == 1) {
                        single_click_callback.call(self, event);
                    } else {
                        double_click_callback.call(self, event);
                    }
                    clicks = 0;
                }, timeout || 300);
            }
        });
    });
}

//  code to put hover effect on marker

function checkPosition() {
    if (window.matchMedia('(max-width: 1000px)').matches) {

        $(".map-mark").single_double_click(function () {
            $('.small-description').toggle();
        }, function () {
            let id = $(this).attr('id');

            let slider = "#slider_" + id;
            console.log(slider);
            $(slider).prop('checked', true);


            $('.map-wrapper').hide();
            $("#pokemon").fadeIn().center();
            setTimeout(function () {
                $("#pokemon").fadeOut()
            }, 1000);
        })

    } else {
        $(".map-mark").hover(function () {
            $('.small-description').text($(this).text());
            $('.small-description').css({ "top": $(this).position().top + 20 + "px", "left": $(this).position().left + 20 + "px" })
            $('.small-description').toggle();
        }, function () {
            $('.small-description').toggle();
        });


        $(".map-mark").click(function () {
            let id = $(this).attr('id');

            let slider = "#slider_" + id;
            // console.log(slider);
            $(slider).prop('checked', true);

            $('.map-wrapper').hide();
            $("#pokemon").fadeIn().center();
            setTimeout(function () {
                $("#pokemon").fadeOut()
            }, 1000);
        });


    }
}

checkPosition();


$('#map-btn').click(function () {
    $('.map-wrapper').toggle();
})



// positioning of slidei using js
function positionSlides() {
    let slides = $('.slider');
    let i = 0;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = `${i * 100}%`;
    }
}

positionSlides();

// slidingEffect();