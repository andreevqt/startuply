import './bootstrap';
import 'slick-carousel';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/modal';
import counterUp2 from 'counterup2';
require( 'waypoints/lib/noframework.waypoints.js' );

$(() => {
    $('.hero-slider').slick({
        dots: true,
        autoplay: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        infinite: false,
        arrows: false
    });

    $('.testimonials-slider').slick({
        dots: true,
        autoplay: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        infinite: false,
        arrows: false
    });

    let src = ''

    $('#video-modal-btn').click((e) => {
        src = $(e.currentTarget).data('src');
    });

    $('#video-modal').on('show.bs.modal', (e) => {
        const url = src + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0';
        $('#videoEmbed').attr('src', url);
    });

    $('#video-modal').on('hide.bs.modal', function (e) {
        $("#videoEmbed").attr('src', null);
    })

    const counters = $('.video__counter-value');

    new Waypoint({
        element: document.querySelector('.video__counters'),
        handler: function () {
            counters.each((i, el) => {
                counterUp2(el);
            })
            this.destroy()
        },
        offset: 'bottom-in-view',
    })
});