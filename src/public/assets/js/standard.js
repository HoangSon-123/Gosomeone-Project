

$('.card .card-title').on({
    click: function (event) {
        console.log("ha ha ha");
    }
})

$(() => {
    $('.header-white .logo img').attr('src', './assets/logo_b.png');
    $('.header-white .navbar-menu-item a').css({
        "color": "var(--text-dark)"
    });

    $('.header-white').css({
        "box-shadow": "var(--box-shadow)"
    });

    // $('body').addClass('disable-scroll');
})