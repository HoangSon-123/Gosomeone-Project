$(() => {
    $('.header-white .logo img').attr('src', '/assets/images/logo_b.png');
    $('.header-white .navbar-menu-item a').css({
        "color": "var(--text-dark)"
    });

    $('.header-white').css({
        "box-shadow": "var(--box-shadow)"
    });

    $('.input-img input').on({
        change: function (event) {
            if (event.target.files.length > 0) {
                const preview = $(event.target).parent().children('.preview');
                preview.children('img').remove();
                for (let i = 0; i < event.target.files.length; i++) {
                    let src = URL.createObjectURL(event.target.files[i]);
                    preview.append(`<img src=${src}>`);
                }
            }
        }
    });

    $('#input-profile-img input').on({
        change: function(event) {
            if (event.target.files.length > 0) {
                $(event.target).parent().children('.preview').removeClass('d-none');
                $('#input-profile-img img').addClass('img-thumbnail');
                $('#input-profile-img img').addClass('img-thumbnail');
            }
            else {
                $(event.target).children('.preview').addClass('d-none');
            }
        }
    })

    $('#change-ava').on({
        change: function (event) {
            if (event.target.files.length > 0) {
                let src = URL.createObjectURL(event.target.files[0]);
                $('#avatar').attr('src', src);
            }
        }
    });

    $('#input-cover-img').on({
        change: function (event) {
            if (event.target.files.length > 0) {
                let src = URL.createObjectURL(event.target.files[0]);
                $('#coverImg').attr('src', src);
            }
        }
    });

    $('.viewable-img').on({
        click: function(event) {
            $('body').addClass('disable-scroll');
            var doc = document.documentElement;
            var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
            $('.img-view').css({
                top: top,
                left: left
            });
            $('.img-view').removeClass('d-none');
            $('.img-view').append(`
                <img src='${event.target.src}'>
            `)
        }
    });

    $('.img-view .btn-close').on({
        click: function(event) {
            $('body').removeClass('disable-scroll');
            $('.img-view').addClass('d-none');
            $('.img-view img').remove();
        }
    });

    $('.filter-btn').on({
        click: function(event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        }
    });

    $('#price').on({
        input: function(event) {
            $('#price-from').html(event.target.value + '');
        }
    });

    const MONTH = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const date = new Date();
    const year = date.getFullYear();
    for (let i = date.getMonth(); i < date.getMonth() + 5; i++) {
        var m = i;
        var y = year;
        if (i > 12) {
            month = i  % 12;
            y = year + 1;
        }
        $('#dep-month-from').append(`<option value="${MONTH[m - 1]} ${y}">${MONTH[m]} ${y}</option>`);
        $('#dep-month-to').append(`<option value="${MONTH[m - 1]} ${y}">${MONTH[m]} ${y}</option>`);
    }
})