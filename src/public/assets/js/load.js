$('#payment-btn').on({
    click: function(event) {
        console.log($(this).attr('data-value'));
        $.ajax({
            type: "POST",
            url: '/payment',
            data: {
                trip_id: $(this).attr('data-value')
            },
            complete: function(data) {
                console.log(data);
            }
        });

        window.location.href = "/payment-confirm";
    }
})