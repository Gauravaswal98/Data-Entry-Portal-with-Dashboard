$(document).ready(function() {
    $("#ext-base").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#ext-basedata  tr").filter(function() {
            $(this).toggle($(this).text()
            .toLowerCase().indexOf(value) > -1)
        });
    });
  });
  