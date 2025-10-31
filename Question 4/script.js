$(document).ready(function(){
  var featured = $("#featuredWrapper .featured-card");
  var idx = 0;
  function cycleFeatured() {
    featured.eq(idx).fadeOut(400, function(){
      idx = (idx + 1) % featured.length;
      featured.eq(idx).fadeIn(400);
    });
  }
  featured.hide();
  featured.eq(0).show();
  var cycleTimer = setInterval(cycleFeatured, 4000);
  $("#showFeaturedBtn").on("click", function(){
    $("#featured").slideToggle(300);
  });
  $(document).on("click", ".enroll-btn", function(){
    var title = $(this).closest(".card").find(".card-title").text();
    $(this).text("Enrolled").prop("disabled", true);
    var notice = $("<div class='alert alert-success mt-3'>You have enrolled in " + title + ".</div>");
    $("main").prepend(notice);
    notice.slideDown().delay(1400).slideUp(400, function(){ $(this).remove(); });
  });
  $("#loginForm").on("submit", function(e){
    e.preventDefault();
    var u = $("#username").val().trim();
    var p = $("#password").val().trim();
    var err = $("#loginError");
    err.addClass("d-none").text("");
    if (!u || !p) {
      err.removeClass("d-none").text("Please enter username and password.");
      return;
    }
    var modalEl = document.getElementById('loginModal');
    var modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    var welcome = $("<div class='alert alert-success mt-3'>Welcome, " + u + "!</div>");
    $("main").prepend(welcome);
    welcome.delay(1500).slideUp(400, function(){ $(this).remove(); });
    $("#loginForm")[0].reset();
  });

  $("#loginModal").on("shown.bs.modal", function(){
    $("#username").trigger("focus");
  });
});

