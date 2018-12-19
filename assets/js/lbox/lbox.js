// Скрипт отправки формы методом AJAX 
// В форме есть radio buttons, checboks и текстовый input и input для ввода номера телефона
// Требуется дать согласие на обработку персональных данных

/* Функция-обработчик события SUBBMIT */

function clickSubmit(elem) {
  
		var inputChoice1 = $('#lbox input[type="radio"]#choice1');
 		var inputChoice2 = $('#lbox input[type="radio"]#choice2');

    var inputName = $('#lbox input[type="text"]');
    var name = inputName.val();
   
    var inputTel = $('#lbox input[type="tel"]');
  	var tel = inputTel.val() ;
   	
  	var inputPolicy = $('#lbox input[type="checkbox"].policy-input-checkbox');
    var policy =  inputPolicy.prop('checked'); 
  
  	var info = $('#lbox .sending-info');
  
  // проверка выбора количества мешочкеов
  	var choice = 'Не выбрано количество мешочков';
    if( inputChoice1.prop('checked') ) {
      choice = 'Купить 3 штуки по цене 790 рублей за каждый';
    }
    if( inputChoice2.prop('checked') ) {
      choice = 'Купить 1 штуку за 990 рублей';
    }
  	console.log('Сколько купить : ',choice); 
  
  // Проверка ввода имени и телефона Заказчика
    if( !name  ) {
    inputName.addClass('error');
    // alert('Как к Вам обращаться?' );
    info.text('Как к Вам обращаться?').fadeIn(1000, "swing" );
    return false;
  	} 
   else {
    inputName.removeClass('error');
    inputName.addClass('success');
   }
   console.log('Имя : ',name); 
  
    if( !tel ) {
    inputTel.addClass('error');
    info.text('Введите номер телефона').fadeIn(1000, "swing" );
    return false;
  	} 
   else {
    inputTel.removeClass('error');
    inputTel.addClass('success');
   }
   console.log('Телефон : ',tel); 

    // Проверка принятия политики конфеденциальности
    if( !policy) {
     inputPolicy.addClass('error');
     info.text('Нет согласия на обработку персональных данных').fadeIn(1000, "swing" );
    return false;
  	} 
   console.log('Согласие с политикой конфеденицальностиелефон : ',policy);
  
    try {
      $.ajax({
        url: 'http://ad.lekua.in.ua/mails/mail-doughbag.php',
        type: 'get',
        data: { 
        				site: 'Zapros from Вough Bag',
                name: name,
                tel: tel,
          	    choice: choice
               },
        success: function( data ){ 
         info.text( 'Поздравляем! Ваша заявка отправлен! Наш менеджер сейчас свяжется с вами' ).fadeIn( 200 );
         info.delay( 4000 ).fadeOut( 200 );          
         $('#lbox form').trigger('reset');  // очищаем поля формы
         console.log( 'Сообщение отправлено.' );
         location.replace( 'index.html' );
        }
      });
    }
    catch (e) {
     console.log(e);
    }
		/* 
  }  // endelse
		*/
  return false;
} ; //end clickSubmit


/* Привязка события click к кнопке SUBBMIT формы */

$('#lbox .submit').click( function(e) { 
  e.preventDefault();
	var elem = $(this);
	console.log('element #lbox .submit has been clicked : ' + elem);
	clickSubmit(elem);
});