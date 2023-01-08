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

    // create trip

    $(document).on('click', '.increase', function (event) {
        const input = $($(this).attr('data-bs-target'));
        const newVal = parseInt(input.val()) + 1;
        input.attr('value', newVal);
    });

    $(document).on('click', '.decrease', function (event) {
        const input = $($(this).attr('data-bs-target'));
        var newVal = parseInt(input.val()) - 1;
        if (newVal < 0) {
            newVal = 0;
        }
        input.attr('value', newVal);
    });

    $(document).on('click', '.input-day .decrease', function(event) {
        $('#total-days').html(parseInt($('#total-days').html()) - 1);
    });

    $(document).on('click', '.input-day .increase', function(event) {
        $('#total-days').html(parseInt($('#total-days').html()) + 1);
    });

    $(document).on('change', '.stop-card .input-stop-img', function (event) {
        if (event.target.files.length > 0) {
            let src = URL.createObjectURL(event.target.files[0]);
            const id = '#' + $(this).parent().parent().parent()
                .parent().attr('id');
            $(`${id} .stop-img`).css('background-image', 'url(' + src + ')');
            $(`${id} .stop-img`).removeClass('d-none');
            $(`${id} .input-stop-img`).parent().parent().parent().addClass('d-none');
        }
    });

    $(document).on('input', '.input-location', function (event) {
        const id = parseInt(event.target.id.split('-')[2]);
        var location = event.target.value;
        if (location == "") {
            location = "Stop " + id;
        }

        $(`#stop-${id} .stop-location`).html(location);
    }
    );

    $('#add-stop').on({
        click: function (event) {
            const id = $('.stop-card').length + 1;
            $('#total-days').html(parseInt($('#total-days').html()) + 1);
            const newStop = `
                <div id="stop-${id}" class="stop-card bg-light rounded container-md p-0">
                    <div class="d-flex justify-content-between align-items-center p-3">
                        <div>
                            <h5 class="fw-bold mb-1">Add image for stop here</h5>
                            <span class="text-secondary fs-7">Make sure to upload relevent, high quality image.</span>
                        </div>
                        <div>
                            <label class="btn btn-outline-dark d-flex align-item-center gap-2">
                                <input id="input-stop-img-${id}" class="d-none input-stop-img" type="file" name="stop_image" required>
                                <i class="fa-regular fa-image fs-4"></i>
                                <span class="fw-bold">ADD</span>
                            </label>
                        </div>
                    </div>
                    <div class="stop-img rounded-top d-none">
                        <div class="w-100 h-100 d-flex align-items-end p-3">
                            <div>
                                <label for="input-stop-img-${id}" class="btn btn-light">
                                    <i class="fa-regular fa-image fs-4"></i>
                                    <span class="fw-bold">Change</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="p-3">
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <h6 class="stop-number">${id}</h6>
                            <h5 class="stop-location" class="fw-bold">Stop ${id}</h5>
                        </div>
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="form-floating flex-fill">
                                <input id="input-location-${id}" type="text" class="input-location form-control">
                                <label>Location</label>
                            </div>
                            <div class="input-day d-flex gap-1 align-items-center">
                                <div class="d-flex flex-column">
                                    <div class="increase text-secondary border btn btn-sm" data-bs-target="#stop-day-${id}">
                                        <i class="fa-solid fa-caret-up"></i>
                                    </div>
                                    <div class="decrease text-secondary border btn btn-sm" data-bs-target="#stop-day-${id}">
                                        <i class="fa-solid fa-caret-down"></i>
                                    </div>
                                </div>
                                <div class="border p-2 px-4 fs-3 fw-bold rounded-1">
                                    <input id="stop-day-${id}" type="number" class="text-center" name="total_days" value="1">
                                    <span class="fw-bold fs-5">day(s)</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-floating mb-1">
                            <textarea name="description" class="form-control h-100" cols="40" rows="5"></textarea>
                            <label>Tell us more</label>
                        </div>
                        <span class="text-secondary fs-7">What do you do / visit in this place</span>
                    </div>
                </div>
            `
            $(`#stop-${id - 1}`).after(newStop);
        }
    });

    $(document).on('change', '#stops input', function (event) {
        const inputed = $('.input-day input');
        var total = 0;
        for (let i = 0; i < inputed.length; i++) {
            total += parseInt(inputed[i].value);
        }
        $('#total-days').html(total);
    });

    $('#input-trip-imgs').on({
        change: function (event) {
            if (event.target.files.length > 0) {
                for (let i = 0; i < event.target.files.length; i++) {
                    let src = URL.createObjectURL(event.target.files[i]);
                    $('#trip-imgs').removeClass('d-none');
                    $('#trip-imgs .carousel-inner').append(`
                        <div class="carousel-item active">
                            <img src="${src}" class="d-block">
                        </div>`
                    );
                }
            }
            else {
                $('#trip-imgs').addClass('d-none');
            }
        }
    });
})