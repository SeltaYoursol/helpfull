$(document).ready(function () {

    //Мобильное меню
    $('.burger-btn').click(function (event) {
        $('.burger-btn,.burger_menu').toggleClass('active');
        $('body').toggleClass('lock')
    })

    //Мобильное меню
    $('.mobil-category_btn').click(function (event) {
        $('.mobil-category_btn,.catalog-mobil__nav').toggleClass('active');
        $('body').toggleClass('lock')
    })

    //Расчет размеров индикторов слайдера
    let num = document.querySelector('#carousel-indicators').children('li').length;
    let width = 25 * num;
    document.querySelector("#carousel-indicators").css('width', width + 'px');


    //Очищение количества товара
    $('.item_counter-clear').click(function (event) {
        $('.nice-number > input').val(0)
    })

    // Отображение загруженного файла
    $('input[type="file"]').change(function () {
        let value = $("input[type='file']").val();
        $('.js-value').text(value);
    });

    //Выравнивание высот карточек
    function leveler(card) {
        let myBlock = 0;
        card.each(function () {
            let thisHeight = $(this).height();
            if(thisHeight > myBlock){
                myBlock = thisHeight;
            }
        });
        card.height(myBlock);
    }
    leveler($('.catalog__card'))
    leveler($('.card-body'))




});
