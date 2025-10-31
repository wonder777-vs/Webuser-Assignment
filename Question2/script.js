$(document).ready(function () {
  $("#themeToggle").on("click", function () {
    $("body").toggleClass("dark-theme");
  });

  $("#deptFilter").on("change", function () {
    var selected = $(this).val();
    $(".employee-card").each(function () {
      var dept = $(this).data("dept");
      if (selected === "all" || selected === dept) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $(".toggle-btn").on("click", function () {
    var cardBody = $(this).closest(".card").find(".card-body");
    cardBody.slideToggle();
    $(this).text($(this).text() === "-" ? "+" : "-");
  });
});

