$(document).ready(function () {
  $("#aa").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#advisor tr").filter(function () {
      $(this).toggle($(this).text()
        .toLowerCase().indexOf(value) > -1)
    });
  });
});

$(document).ready(function () {
  $("#bb").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#bbb tr").filter(function () {
      $(this).toggle($(this).text()
        .toLowerCase().indexOf(value) > -1)
    });
  });
});
