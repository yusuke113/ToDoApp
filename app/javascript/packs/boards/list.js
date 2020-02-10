'use strict';

{
	// ================================================//
	// 					    マウスドラッグで横スクロール	   			  //
	// ================================================//

	// ================================================//

	// ================================================//
	// 					      テキストエリアの設定	      			   //
	// ================================================//
	$('.list-header-name').on('input', () => {
		// ===========テキストエリアの幅を行数で変える========//

		// ターゲットのテキストエリア要素を取得する
		const target = $('.list-header-name:focus');

		// 一旦テキストエリアを小さくしてスクロールバー（縦の長さを取得）
		target.css('height', '20px');
		// 1行の長さを取得する
		var wSclollHeight = parseInt(target.get(0).scrollHeight - 8);
		var wLineH = parseInt(target.css('lineHeight').replace(/px/, ''));
		// 最低1行の表示エリアにする
		if (wSclollHeight < wLineH * 1) {
			wSclollHeight = wLineH * 1;
		}
		// テキストエリアの高さを設定する
		target.css('height', `${wSclollHeight}px`);
		// =================================================//

		// ========Enter押したらテキストエリアのfocus外す=======//

		target.on('keydown', e => {
			if (e.keyCode == 13) {
				target.blur();

				e.preventDefault();
				console.log(target.val());
			}
		});
		// =================================================//
	});

	$('.list-card-composer-textarea').on('input', () => {
		// ===========テキストエリアの幅を行数で変える========//

		// ターゲットのテキストエリア要素を取得する
		const target = $('.list-card-composer-textarea:focus');

		// 一旦テキストエリアを小さくしてスクロールバー（縦の長さを取得）
		target.css('height', '20px');
		// 1行の長さを取得する
		var wSclollHeight = parseInt(target.get(0).scrollHeight - 2);
		var wLineH = parseInt(target.css('lineHeight').replace(/px/, ''));
		// 最低1行の表示エリアにする
		if (wSclollHeight < wLineH * 2) {
			wSclollHeight = wLineH * 2;
		}
		// テキストエリアの高さを設定する
		target.css('height', `${wSclollHeight}px`);
		// =================================================//

		// ========Enter押したらテキストエリアのfocus外す=======//

		target.on('keydown', e => {
			if (e.keyCode == 13) {
				target.blur();

				e.preventDefault();
				console.log(target.val());
			}
		});
	});
	// =================================================//

	// ================================================//
	//     カード追加ボタン[disabled,primary切り替え]      //
	// ================================================//

	$('.open-card-composer').click(function() {
		const list_cards = $(this).closest('.list-cards');
		const card_composer = list_cards.find('.card-composer');
		const list_card_composer_textarea = card_composer.find(
			'.list-card-composer-textarea'
		);
		const card_create_btn = card_composer.find('.card-create-btn');

		// カード追加ボタンを決してフォームを表示
		$('.card-composer').addClass('hidden');
		card_composer.removeClass('hidden');
		$(this).addClass('hidden');
		//

		// カードnameに入力があれば<button>を<primary>にする
		list_card_composer_textarea.on('input', () => {
			var textarea_value = list_card_composer_textarea.val();
			if (textarea_value === '') {
				card_create_btn.removeClass('primary');
				card_create_btn.addClass('disabled');
			} else {
				card_create_btn.removeClass('disabled');
				card_create_btn.addClass('primary');
			}
		});
		//

		// 開いてるフォーム以外をクリックするとフォームを閉じる&入力があればカード追加
		$(document).on('click touchend', function(event) {
			if (
				!$(event.target).closest(card_composer).length &&
				!$(event.target).closest('.open-card-composer').length
			) {
				card_composer.addClass('hidden');
			}
		});
		//
	});
	// =================================================//
}
