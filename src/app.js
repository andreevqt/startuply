import './bootstrap';
import 'slick-carousel';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/modal';
require('waypoints/lib/noframework.waypoints.js');

$(() => {
  const body = $('body');

  $('.hero-slider').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
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

  const animateCounter = (elem) => {
    const value = elem.data('counter');
    $({ counter: 0 }).animate({
      counter: value,
    }, {
      duration: 2000,
      easing: 'swing',
      step: function () {
        elem.text(Math.ceil(this.counter));
      }
    });
  }

  new Waypoint({
    element: document.querySelector('.video__counters'),
    handler: function () {
      $('.video__counter-value').each((index, elem) => {
        animateCounter($(elem));
      })
      this.destroy()
    },
    offset: '75%',
  });

  $('.mobile-menu__close').click((e) => {
    body.removeClass('mobile-menu-is-shown');
  });

  $('.header__toggle').click((e) => {
    body.toggleClass('mobile-menu-is-shown');
  });

});