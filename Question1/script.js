$(document).ready(function () {
  $("input, select").focus(function () {
    $(this).css("border", "2px solid black");
  }).blur(function () {
    $(this).css("border", "1px solid red");
  });
  const eventInfo = {
    "Coding Marathon": "Compete in a 3-hour coding challenge. Topics include algorithms, data structures, and problem-solving. Prizes worth 10,000!",
    "Robo Race": "Build and race your own robot through an obstacle course. Fastest bot wins!",
    "Paper Presentation": "Present your innovative tech ideas to a panel of judges. Top 3 papers will be published in our symposium proceedings.",
    "Hackathon": "Form a team and build a working prototype in 12 hours. Theme: AI for Good."
  };
  $("#event").on("change", function () {
    var selectedEvent = $(this).val();
    if (selectedEvent && eventInfo[selectedEvent]) {
      $("#eventDetails").html("<h4 class='mb-3'>" + selectedEvent + "</h4><p>" + eventInfo[selectedEvent] + "</p>");
    } else {
      $("#eventDetails").html("<h4 class='mb-3'>Event Details</h4><p>Select an event to see its details here.</p>");
    }
  });
  $("#regForm").on("submit", function (e) {
    e.preventDefault();
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var phone = $("#phone").val().trim();
    var college = $("#college").val().trim();
    var event = $("#event").val();
    if (!name || !email || !phone || !event) {
      alert("Please fill out all required fields!");
      return;
    }
    $("#previewContent").html("<strong>Name:</strong> " + name + "<br><strong>Email:</strong> " + email + "<br><strong>Phone:</strong> " + phone + "<br><strong>College:</strong> " + college + "<br><strong>Event:</strong> " + event);
    $("#preview").removeClass("d-none");
    $("html, body").animate({ scrollTop: $("#preview").offset().top }, "slow");
  });
});

