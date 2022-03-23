/*!
* Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
var min = '2022-03-22T00:00';
var max = '2022-09-22T00:00';

mobiscroll.datepicker('#demo-booking-single', {
    controls: ['calendar'],
    min: min,
    max: max,
    onPageLoading: function (event, inst) {
        getPrices(event.firstDay, function callback(bookings) {
            inst.setOptions({
                labels: bookings.labels,
                invalid: bookings.invalid
            });
        });
    }
});
                                  
function getPrices(d, callback) {
    var invalid = [],
        labels = [];

    mobiscroll.util.http.getJson(MS.trialUrl + 'getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(), function (bookings) {
        for (var i = 0; i < bookings.length; ++i) {
            var booking = bookings[i],
                d = new Date(booking.d);

            if (booking.price > 0) {
                labels.push({
                    start: d,
                    title: '$' + booking.price,
                    textColor: '#e1528f'
                });
            } else {
                invalid.push(d);
            }
        }
        callback({ labels: labels, invalid: invalid });
    }, 'jsonp');
}
