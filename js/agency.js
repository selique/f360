(function($) {
  "use strict"; // Start of use strict
  /*global jQuery localStorage PhotoSphereViewer*/
  // loading
  $(window).on("load", function(e) {
    localStorage.loaded = "yes";
    if ($('#loading').length > 0) {
      $('#loading').fadeOut('slow', function() { $(this).remove(); })
    }
  });
  //remove loader when localstorage create cache
  if (localStorage.loaded == "yes") {
    $('#loading').remove()
    //or any other method of not showing the spinner
  }

  //photo sphere viewer
  var PSV = new PhotoSphereViewer({
    panorama: 'https://cdn.rawgit.com/mistic100/Photo-Sphere-Viewer/3.1.0/example/Bryce-Canyon-National-Park-Mark-Doliner.jpg',
    container: 'photosphere',
    loading_img: 'https://i.stack.imgur.com/MnyxU.gif',
    navbar: ['autorotate', 'zoom', 'fullscreen','gyroscope'],
    caption: 'Bryce Canyon National Park <b>&copy; Mark Doliner</b>',
    default_fov: 65,
    mousewheel: false
  })

  $(document).ready(function() {
    //init owl-carousel
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    })



    //todo add modernizer on NPM
    //Modernizer detect mobile
    //const isMobile = Modernizr.touch;
    //console.log('isMobile: ', isMobile);

    //fullpage
    $('#fullpage').fullpage({
      //options here
      verticalCentered: true,
      scrollingSpeed: 1000,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 2000,
      menu: '#mainNav',
      onLeave: function(index, nextIndex, direction) {
        if (direction == "up") {
          $(".section").removeClass("down")
          $(".section").removeClass("next")
          $(".section").removeClass("prev")
          $("#fullpage .section:nth-child(" + nextIndex + ")").addClass("up")
          $("#fullpage .section:nth-child(" + nextIndex + ")").next().addClass("next up")
          $("#fullpage .section:nth-child(" + nextIndex + ")").prev().addClass("prev up")
        }
        else {
          $(".section").removeClass("up")
          $(".section").removeClass("next")
          $(".section").removeClass("prev")
          $("#fullpage .section:nth-child(" + nextIndex + ")").addClass("down")
          $("#fullpage .section:nth-child(" + nextIndex + ")").next().addClass("next down")
          $("#fullpage .section:nth-child(" + nextIndex + ")").prev().addClass("prev down")
        }
        console.log(direction + nextIndex)
      }
    })

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 56
    });

    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      }
      else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Hide navbar when modals trigger
    $('.portfolio-modal').on('show.bs.modal', function(e) {
      $('.navbar').addClass('d-none');
    })
    $('.portfolio-modal').on('hidden.bs.modal', function(e) {
      $('.navbar').removeClass('d-none');
    })
  })
})(jQuery); // End of use strict
