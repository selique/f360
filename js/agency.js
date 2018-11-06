(function($) {
  "use strict"; // Start of use strict
  /*global jQuery localStorage PhotoSphereViewer video*/

  // loading
  $(window).on("load", function(e) {
    if ($('#loading').length > 0) {
      setTimeout(function() {
        $('#loading').fadeOut('slow', function() { $(this).remove(); });
      }, 4000);
    }
  });

  $(document).ready(function() {
    
    
  // //photo sphere viewer
  // var PSV = new PhotoSphereViewer({
  //   panorama: '../img/cases/claro_optimized.jpg',
  //   container: 'vrview',
  //   loading_img: '../img/focos-360-animation.svg',
  //   default_fov: 50,
  //   mousewheel: false,
  //   rotate: true,
  //   navbar: false,
  // })
  
  
    //init owl-carousel
    $('.owl-carousel').owlCarousel({
      loop: false,
      navigation: false,
      stopOnHover: true,
      margin: 1,
      pagination: false,
      dots: true,
      mouseDrag: false,
      responsive: {
        0: {
          items: 1,
          dots: true
        },
        768: {
          items: 2,
          dots: true,
        },
        978: {
          items: 3,
          dots: false,
        }
      }
    })

    // $('video').get(0).play()
    $('video')[0].play();

    //todo add modernizer on NPM
    //Modernizer detect mobile
    //const isMobile = Modernizr.touch;
    //console.log('isMobile: ', isMobile);

    var alturaMenu = ($(".navbar").outerHeight()) + 'px';
    $("section>div").css('margin-top', alturaMenu);

    $(".navbar-nav li a").click(function(event) {
      $(".navbar-collapse").collapse('hide');
    });

    //fullpage
    $('#fullpage').fullpage({
      //options here
      verticalCentered: true,
      scrollingSpeed: 1000,
      autoScrolling: true,
      fitToSection: true,
      anchors: ['home', 'section2', 'section3', 'footer'],
      menu: '#mainNav',
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
