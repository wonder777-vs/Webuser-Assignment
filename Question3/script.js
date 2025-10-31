var destinations = [
  { id: 1, name: "Goa", category: "beach", price: 9000, rating: 4.6, desc: "Sandy beaches, nightlife, water-sports.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60", tag: "Popular" },
  { id: 2, name: "Manali", category: "mountain", price: 7000, rating: 4.5, desc: "Snowy peaks, trekking, river rafting.", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60", tag: "Scenic" },
  { id: 3, name: "Jaipur", category: "city", price: 5000, rating: 4.3, desc: "Historic palaces, forts and culture.", img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200&q=60", tag: "Heritage" },
  { id: 4, name: "Rishikesh", category: "adventure", price: 6000, rating: 4.4, desc: "White-water rafting, yoga retreats.", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=60", tag: "Adventure" },
  { id: 5, name: "Andaman", category: "beach", price: 20000, rating: 4.8, desc: "Crystal waters, scuba diving.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60", tag: "Exclusive" }
];
function renderDatalist() {
  var dl = $("#destList");
  dl.empty();
  destinations.forEach(function(d){ dl.append('<option value="'+d.name+'">'); });
}
function renderDestinations(list) {
  var container = $("#destSection");
  container.empty();
  if (!list.length) {
    container.append('<div class="col-12"><div class="p-4 text-center text-muted">No destinations found</div></div>');
    return;
  }
  list.forEach(function(d){
    var col = $('<div class="col-12 col-sm-6 col-lg-4"></div>');
    var card = $('<div class="card-dest card"></div>');
    var img = $('<img class="dest-img">').attr('src', d.img).attr('alt', d.name);
    var badge = $('<div class="dest-badge"><span class="badge bg-warning text-dark">'+d.tag+'</span></div>');
    var overlay = $('<div class="dest-overlay"></div>').append('<h5 class="mb-1">'+d.name+' <span class="badge bg-info ms-2">'+d.rating+'</span></h5>').append('<p class="small mb-2">'+d.desc+'</p>');
    var body = $('<div class="card-body"></div>');
    body.append('<div class="d-flex justify-content-between align-items-center mb-2"><div class="fw-bold">'+d.price+'</div><div class="small text-muted">Avg price</div></div>');
    body.append('<div class="d-flex gap-2"><button class="btn btn-sm btn-primary w-100 book-btn" data-id="'+d.id+'">Book Now</button><button class="btn btn-sm btn-outline-secondary w-100 view-btn" data-id="'+d.id+'">View</button></div>');
    card.append(img, badge, overlay, body);
    col.append(card);
    container.append(col);
  });
}
function filterByCategory(cat) {
  if (cat === "all") renderDestinations(destinations);
  else renderDestinations(destinations.filter(function(d){ return d.category === cat; }));
}
function filterBySearch(term, budget) {
  var t = term.trim().toLowerCase();
  var out = destinations.filter(function(d){
    var matches = !t || d.name.toLowerCase().indexOf(t) !== -1 || d.desc.toLowerCase().indexOf(t) !== -1;
    var withinBudget = d.price <= budget;
    return matches && withinBudget;
  });
  renderDestinations(out);
}
function setMinDates() {
  var today = new Date().toISOString().split('T')[0];
  $("#dateDepart, #dateReturn, #bookDepart, #bookReturn").attr('min', today);
}
$(document).ready(function(){
  renderDatalist();
  renderDestinations(destinations);
  setMinDates();
  $("#budgetRange").on("input change", function(){
    $("#budgetValue").text("" + $(this).val());
  });
  $(".filter-btn").on("click", function(){
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    var cat = $(this).data("cat");
    filterByCategory(cat);
    $('html,body').animate({ scrollTop: $("#destSection").offset().top - 80 }, 400);
  });
  $("#searchForm").on("submit", function(e){
    e.preventDefault();
    var term = $("#searchDest").val();
    var budget = Number($("#budgetRange").val());
    filterBySearch(term, budget);
    $('html,body').animate({ scrollTop: $("#destSection").offset().top - 80 }, 400);
  });
  $(document).on("click", ".book-btn", function(){
    var id = Number($(this).data("id"));
    var d = destinations.find(function(x){ return x.id === id; });
    $("#bookDest").val(d.name);
    $("#modalTitle").text("Book: " + d.name);
    var today = new Date().toISOString().split('T')[0];
    $("#bookDepart").val(today);
    $("#bookReturn").val("");
    $("#bookingAlert").removeClass("alert-success alert-danger").addClass("d-none").text("");
    $("#bookingForm")[0].reset();
    $("#bookDest").val(d.name);
    var modal = new bootstrap.Modal(document.getElementById('bookModal'));
    modal.show();
  });
  $(document).on("click", ".view-btn", function(){
    var id = Number($(this).data("id"));
    var d = destinations.find(function(x){ return x.id === id; });
    var html = '<div class="p-2"><h5>'+d.name+' <span class="badge bg-info ms-2">'+d.rating+'</span></h5><p>'+d.desc+'</p><p class="fw-bold">Avg price: '+d.price+'</p></div>';
    $('html,body').animate({ scrollTop: $("#destSection").offset().top - 80 }, 400);
    var overlay = $('<div class="toast align-items-center text-bg-light border-0 position-fixed top-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true"><div class="d-flex"><div class="toast-body"></div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>');
    overlay.find('.toast-body').html(html);
    $("body").append(overlay);
    var t = new bootstrap.Toast(overlay[0], { delay: 4500 });
    t.show();
    setTimeout(function(){ overlay.remove(); }, 5000);
  });
  $("#bookingForm").on("submit", function(e){
    e.preventDefault();
    var name = $("#bookName").val().trim();
    var email = $("#bookEmail").val().trim();
    var depart = $("#bookDepart").val();
    var ret = $("#bookReturn").val();
    var pax = Number($("#bookPax").val()) || 1;
    var alertBox = $("#bookingAlert");
    if (!name) { alertBox.removeClass('d-none').addClass('alert-danger').text('Name is required.'); return; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { alertBox.removeClass('d-none').addClass('alert-danger').text('Valid email is required.'); return; }
    if (!depart) { alertBox.removeClass('d-none').addClass('alert-danger').text('Departure date required.'); return; }
    if (!ret) { alertBox.removeClass('d-none').addClass('alert-danger').text('Return date required.'); return; }
    if (new Date(ret) < new Date(depart)) { alertBox.removeClass('d-none').addClass('alert-danger').text('Return date must be after departure.'); return; }
    alertBox.removeClass('d-none').removeClass('alert-danger').addClass('alert-success').text('Booking confirmed! A confirmation email will be sent to ' + email + '.');
    setTimeout(function(){
      var modalEl = document.getElementById('bookModal');
      var modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }, 1500);
  });
  $(document).on("input", "#searchDest", function(){
    var t = $(this).val().toLowerCase();
    var budget = Number($("#budgetRange").val());
    var filtered = destinations.filter(function(d){
      return (d.name.toLowerCase().indexOf(t) !== -1 || d.desc.toLowerCase().indexOf(t) !== -1) && d.price <= budget;
    });
    renderDestinations(filtered);
  });

});

