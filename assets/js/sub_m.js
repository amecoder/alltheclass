$(document).ready(function(){

    //팝업4 :: 국가별 시간대 검색

    $('.subCountry .popupList .conList .title').on('click',function(){
        $(this).siblings('.cityList').stop().slideToggle();
        $(this).parent('.conList').toggleClass('on');
        $(this).parent('.conList').siblings('.conList').find('.cityList').stop().slideUp();
        $(this).parent('.conList').siblings('.conList').removeClass('on').find('.cityList').find('li').removeClass('on');
    });  

    $('subCountry .cityList').find('li').on('click',function(){
        if( $(this).parents('.conList').hasClass('on')){
            $(this).toggleClass('on');
            $(this).siblings('li').removeClass('on');

        }
    });






});