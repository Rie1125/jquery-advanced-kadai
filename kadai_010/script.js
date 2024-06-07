$(function () {
  $('.button-more').on('mouseover', function () {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });

  $('.button-more').on('mouseout', function () {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0,
    }, 100);
  });

  $('.carousel').slick({
     autoplay: true,
     dots: true,
     infinite: true,
     autoplaySpeed: 5000,
     arrows: false, 
  });

// AjaxでSATTIC FORMSにデータを送信する
  $('#submit').on('click', function (event){
    // formタグによる送信をキャンセル
    event.preventDefault();
    // 入力チェック後にエラーの有無を判定
    let result = inputCheck();

     // エラー判定とメッセージを取得
     let error = result.error;
     let message = result.message;

     // エラーが無かったらフォームを送信
     if (error == false) {

      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました。')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信できませんでした。')
        }
      })

      // Ajaxでformを送信
    } else {
      // エラーメッセージを表示
      alert(message);
    }
  });

  // フォーカスが外れた時にフォームのチェック
  $('#name').blur(function () {
    inputCheck();
  });
  $('#furigana').blur(function () {
    inputCheck();
  });
  $('#email').blur(function () {
    inputCheck();
  });
  $('#tel').blur(function () {
    inputCheck();
  });
  $('#message').blur(function () {
    inputCheck();
  });
  $('#prefecture').blur(function () {
    inputCheck();
  });
  $('#agree').blur(function () {
    inputCheck();
  });
  


  // 問い合わせフォームのチェック
  function inputCheck(){
    let result;

    let message = '';

    let error = false;

    // 名前のチェック
    if ($('#name').val() == ''){

      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。\n';

    } else {

      $('name').css('background-color', '#fafafa');

    }

    // ふりがなのチェック
    if ($('#furigana').val() == ''){

      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';

    } else {

      $('furigana').css('background-color', '#fafafa');

    }

    // お問い合わせのチェック
    if ($('#message').val() == '') {
      // エラーあり
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      // エラーなし
      $('#message').css('background-color', '#fafafa');
    }


    // メールアドレスのチェック
    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      // エラーあり
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
      // エラーなし
      $('#email').css('background-color', '#fafafa');
    }

    // 電話番号のチェック
    if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      // エラーあり
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      // エラーなし
      $('#tel').css('background-color', '#fafafa');
    }
    
    // 都道府県のチェック
    if ($('#prefecture').val() == '') {
      $('#prefecture').css('background-color', '#f79999');
      error = true;
      message += '都道府県を選択してください。\n';
    } else {
      $('#prefecture').css('background-color', '#fafafa');
    
    }

    // 個人情報のチェックボックス
    if ($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

     // オブジェクトでエラー判定とメッセージを返す
     result = {
      error: error,
      message: message
    }

    // 戻り値としてエラーがあるかどうか
    return result;

  }
          
});