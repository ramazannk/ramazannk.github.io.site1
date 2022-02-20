$(document).ready(function() {
    $('.carousel__inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        eed: 1200,
        adaptiveHeight: true.valueOf,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron left solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron right solid.png"></button>',
    });
    $('ul.catalog__tubs').on('click', 'li:not(.catalog__tub_active)', function() {
        $(this)
            .addClass('catalog__tub_active').siblings().removeClass('catalog__tub_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
            .eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    //modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    // $('.button_btn').on('click', function(){
    //   $('.overlay, #order').fadeIn();
    // });
    $('.button_btn').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "пожалуйста, введите свой имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пажалуйста, введите свой номер телефона",
                email: {
                    required: "пожалуйста, введите свой почту",
                    email: "неправильно введен адрес почты"
                }
            }
        });
    }
    valideForms('#consultation-form');
    valideForms('#consutation form');
    valideForms('#order form');
    $('input[name=phone]').mask("+996(999) 99-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consutation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            const hash = document.getElementById("#up");

            $('html, body').animate({
                scrollTop: $(hash).offset().top+"px"
            }, 400, function() {

                window.location.hash = ('#up');
            });
        }
    });
    new WOW().init();
});