$(function() {
  $('a[href^="#"]:not(.js-open-modal)').on("click", function(e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top
      },
      500
    );
  });

  $(".navigation__item")
    .on("click", function() {
      $(this)
        .find(".navigation__link")
        .get(0)
        .click();
    })
    .on("click", ".navigation__link", function(e) {
      e.stopPropagation();
    });

  $(window).on("load scroll", function(e) {
    var scroll = $(window).scrollTop();

    $(".section").each(function(i) {
      if ($(this).position().top - 150 <= scroll) {
        $(".navigation__item.active").removeClass("active");
        $(".navigation__item")
          .eq(i)
          .addClass("active");
      }
    });
  });

  $(".js-open-modal").magnificPopup({
    items: {
      src: "#modal-form",
      type: "inline",
      midClick: true,
      mainClass: "mfp-fade"
    }
  });
});
