$(document).ready(function(){

    $('.container02 .faqList .offList .title').on('click',function(){
        $(this).siblings('.sublist').stop().slideToggle();
        $(this).toggleClass('on');
        $(this).parent('.offList').siblings('.offList').find('.sublist').stop().slideUp();
        $(this).parent('.offList').siblings('.offList').find('.title').removeClass('on');
    });



    $(window).scroll( function() {

        if ( $(this).scrollTop() > 500 && $(window).width() < 768 ) {

            $('.mTop').stop().fadeIn();
            $('.mTop').unbind('click');
            $('.mTop').click( function() {
                $('html, body').animate( { scrollTop : 0 }, 400 );
                return false;
            });

        } else{
            $('.mTop').stop().fadeOut();
        }
    });

    //팝업 :: 파티 일정표 :: 주차
    $('.daySelect .click').on('click',function(){
        $('body').addClass('on');
        $(this).siblings('.popupSelect').stop().show();
    });

    $('.popupSelect .popupList').find('button').on('click',function(e){
        e.stopPropagation();
        $('body').removeClass('on');
        $(this).parents('.popupSelect').stop().hide();
    });

    $('.popupSelect .popupList ul > li').on('click',function(){
        $(this).toggleClass('on');
        $(this).siblings('li').removeClass('on');
    });


    //팝업2 :: 상시 확인 팝업
    $('.listsdl.always .click').on('click',function(){
        $('body').addClass('on');
        $(this).siblings('.popupAlways').stop().show();
    });

    $('.listsdl.always .popupAlways .popupList').find('button').on('click',function(e){
        e.stopPropagation();
        $('body').removeClass('on');
        $(this).parents('.popupAlways').stop().hide();
    });

    //팝업3 :: 파티일정표 거주하는 곳 기준 선택유도 안내
    $('.popupChoice').find('button').on('click',function(e){
        $(this).parents('.popupChoice').stop().hide();
    });

    //팝업4 :: 국가별 시간대 검색
    $('.countryMenu .click').on('click',function(){
        $('body').addClass('on');
        $(this).siblings('.popupCountry').stop().show();
    });

    $('.popupCountry .popupList').find('button').on('click',function(e){
        e.stopPropagation();
        $('body').removeClass('on');
        $(this).parents('.popupCountry').stop().hide();
    });

    $('.popupCountry .popupList .conList .title').on('click',function(){
        $(this).siblings('.cityList').stop().slideToggle();
        $(this).parent('.conList').toggleClass('on');
        $(this).parent('.conList').siblings('.conList').find('.cityList').stop().slideUp();
        $(this).parent('.conList').siblings('.conList').removeClass('on').find('.cityList').find('li').removeClass('on');
    });

    $('.cityList').find('li').on('click',function(){
    // $(this).toggleClass('on');
    // $(this).parents('.conList').siblings('.conList').find('.cityList li').removeClass('on');
        if( $(this).parents('.conList').hasClass('on')){
            $(this).toggleClass('on');
            $(this).siblings('li').removeClass('on');

        }
    });

    //푸터 alert창
    $('.email').on('click',function(){
        alert('“이메일 주소가 복사되었습니다”');
    });









});