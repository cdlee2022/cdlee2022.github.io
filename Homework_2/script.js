$(document).ready(function() {
    // Change image to image_info by hovering mouse
    $("#menu img").mouseenter(function(evt) {
        var imageURL = $(this).attr("id");
        $(this).attr("src", imageURL);

        evt.preventDefault();
    });

    // Revert image after mouse leaves image
    $("#menu img").mouseleave(function(evt) {
        var returnImage = $(this).attr("id");
        var newSrc = returnImage.replace("_info", "");
        $(this).attr("src", newSrc);

        evt.preventDefault();
    });

    var total = 0;
    // Add items to order by clicking image
    $("#menu img").click(function(evt) {
        var imageALT = $(this).attr("alt");
        if (imageALT == "espresso") {           // Add Espresso to Order
            $('#order').append($('<option>',
             {value:"espresso", text:"$1.95 - Espresso"}));
             total = total + 1.95;
        } else if (imageALT == "latte") {       // Add Latte to Order
            $('#order').append($('<option>',
            {value:"latte", text:"$2.95 - Latte"}));
            total = total + 2.95;
        } else if (imageALT == "cappuccino") {  // Add Cappuccino to Order
            $('#order').append($('<option>',
            {value:"cappuccino", text:"$3.45 - Cappuccino"}));
            total = total + 3.45;
        } else if (imageALT == "coffee") {      // Add Coffee to Order
            $('#order').append($('<option>',
            {value:"coffee", text:"$1.75 - Coffee"}));
            total = total + 1.75;
        } else if (imageALT == "biscotti") {    // Add Biscotti to Order
            $('#order').append($('<option>',
            {value:"biscotti", text:"$1.95 - Biscotti"}));
            total = total + 1.95;
        } else if (imageALT == "scone") {       // Add Scone to Order
            $('#order').append($('<option>',
            {value:"scone", text:"$2.95 - Scone"}));
            total = total + 2.95;
        }
        $('#total').text('Total = $ ' + total.toFixed(2))
        evt.preventDefault();
    });

    $("#place_order").click(function(evt) {
        window.location.assign("checkout.html");
        evt.preventDefault();
    });

    $("#clear_order").click(function(evt) {
        $('#order').children().remove();
        $('#total').text('')
    });
}
);
