var datasetDiv = $('#dataset');
$('#ajaxloading').hide();
//var root='https://restcountries.eu/rest/v2/name/'
$("#restSearch").autocomplete({
    minLength: 0,
    source: function(request, response) {
        $.ajax({
            url: 'http://localhost:19000/search.groovy?term=' + request.term,
            beforeSend: function() {
                $('#ajaxloading').show();
            },
            complete: function() {
                $('#ajaxloading').hide();
            },
            dataType: "json",
            success: function(data) {
                
                response($.map(data, function(item) {
                    //console.log(item)
                    return {
                        label: "<div style='padding-bottom: 20px'><b>" + item[0] + "</b></div>"
                        
                    }
                }));
            }
        });
    },
    select: function(event, element) {
        window.location.replace("search.html?term=" + $("#restSearch").val());
    }
}).autocomplete("instance")._renderItem = function(ul, item) {
    return $("<li>")
        .append(item.label)
        .appendTo(ul);
};
$("#restSearch").keydown(function(event) {
    if (event.keyCode == 13) {
        if ($("#restSearch").val().length == 0) {
            event.preventDefault();
            return false;
        } else {

            window.location.replace("search.html?term=" + $("#restSearch").val());
        }
    }
});