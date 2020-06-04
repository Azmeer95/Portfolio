// On the load of the page, when the page is loading
$(window).on("load", function () {
  // fades out after 500ms
  $(".loader .inner").fadeOut(500, function () {
    // after 500ms, this will happen
    $(".loader").fadeOut(750);
  });

  // Images in portfolio section will no longer overlap
  // Called when the page loads
  $(".items").isotope({
    // * means it is applied to all
    filter: "*",
    animationOptions: {
      duration: 1500,
      // smoothness of the direction of animation
      easing: "linear",
      // needs to be added
      queue: false,
    },
  });
});

// The function will execute when the document(page) is ready
$(document).ready(function () {
  $("#slides").superslides({
    // enables fade effect to transition animation
    animation: "fade",
    // After every 5000ms the image will change automatically
    play: 2500,
    // Removes the 3 dots at the bottom to prevent manual change pf slides
    pagination: false,
  });

  // takes two params - selector and function to perform
  var typed = new Typed(".typed", {
    strings: [
      "Wanderlust.",
      "Music Enthusiast.",
      "Programmer.",
      "Anime Lover.",
    ],
    typeSpeed: 70,
    loop: true,
    startDelay: 1000,
    showCursor: false,
  });

  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      938: {
        items: 4,
      },
    },
  });

  // stores the position(.offset() gives both the hor/ver pos.) of the skills section(jQuery Object)
  var skillsTopOffSet = $(".skills-section").offset().top;
  var statsTopOffSet = $(".stats-section").offset().top;
  var countUpFinished = false;

  // When the window is scrolled, func. is executed
  $(window).scroll(function () {
    // If the scroll position is > then stored position - height of window of the skills section(+200 is the delay in px)
    if (window.pageYOffset > skillsTopOffSet - $(window).height() + 200) {
      $(".chart").easyPieChart({
        // Smooth transition of arc
        easing: "easeInOut",
        barColor: "#fff",
        // The part thats not filled in
        trackColor: false,
        // removes scale marks
        scaleColor: false,
        lineWidth: 4,
        size: 152,
        // Animation for the number filling up
        onStep: function (from, to, percent) {
          // this.el - referring to .percent element. Finds the class .percent and sets its value on chart
          $(this.el).find(".percent").text(Math.round(percent));
        },
      });
    }

    // For stats section position
    if (
      !countUpFinished &&
      window.pageYOffset > statsTopOffSet - $(window).height() + 200
    ) {
      // for each one of the elements with this class, execute the function
      $(".counter").each(function () {
        var element = $(this);
        var endVal = parseInt(element.text());

        element.countup(endVal);
      });

      countUpFinished = true;
    }
  });

  $("[data-fancybox]").fancybox();

  // click event
  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    // 'this' refers to the object on which the click event was called on
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");

    // Called when clicked on element
    $(".items").isotope({
      // * means it is applied to all
      filter: selector,
      animationOptions: {
        duration: 1500,
        // smoothness of the direction of animation
        easing: "linear",
        // needs to be added
        queue: false,
      },
    });
    // Stop doing normal default actions, dont want to go to any link
    return false;
  });

  $("#navigation li a").click(function (e) {
    // Don't do after event e
    e.preventDefault();

    // this - a tag
    var targetElement = $(this).attr("href");
    // stores jquery object of id inside param.
    var targetPosition = $(targetElement).offset().top;
    // -50 to make sure its a little bit further up
    $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
  });

  const nav = $("#navigation");
  // stores the position of navbar
  const navTop = nav.offset().top;
  // When the window is scrolled, call the function
  $(window).on("scroll", stickyNavigation);

  function stickyNavigation() {
    var body = $("body");

    if ($(window).scrollTop() >= navTop) {
      // need the outer height and add it once it goes down
      body.css("padding-top", nav.outerHeight() + "px");
      body.addClass("fixedNav");
    } else {
      body.css("padding-top", 0);
      body.removeClass("fixedNav");
    }
  }
});
