$(document).ready(function(){
    // slider
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png" alt="right"></button>'
    });


    // tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    // catalog-item
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__back-side').eq(i).toggleClass('catalog-item__back-side_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    // modal
    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    $('.modal__close').on('click', function() {
        $('.overlay, .modal').fadeOut('slow');
    });


    // validation of forms
    function validateForms(form) {
        $(form).validate( {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');


    // masked input
    $('input[name=phone]').mask("+7 (999) 999-99-99");


    // mail sending
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('#thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });


    // pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1000) {
           $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });


    // smooth scroll
    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    // wow.js
    new WOW().init();
});