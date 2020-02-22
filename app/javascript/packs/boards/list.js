'use strict';

{
	// ================================================//
	// 					    マウスドラッグで横スクロール	   			  //
	// ================================================//

	// ================================================//

	// ================================================//
	// 					  List[name]テキストエリアの設定	   			   //
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
				e.preventDefault();
				target.blur();
			}
		});
		// =================================================//
	});

	$('.list-card-composer-textarea').on('input', () => {
		// ===========テキストエリアの幅を行数で変える========//

		// ターゲットのテキストエリア要素を取得する
		const card_create_btn = $('.card-create-btn');
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
				e.preventDefault();
				card_create_btn.click();
				textdelete();
			}
		});
	});
	// =================================================//

	// ================================================//
	//                   リスト追加機能                    //
	// ================================================//
	const list_form = $('.js-list-form');
	const new_list_create = $('#new-list-create');
	const list_add_form = $('#list_add_form');
	const list_name_input = $('#list-name-input');
	const btn = $('#list-add-btn');
	const list_create_cancel = $('.list-create-cancel');

	new_list_create.click(function() {
		list_add_form.removeClass('hidden');
		new_list_create.addClass('hidden');
		list_name_input.focus();
	});

	// カードnameに入力があれば<button>を<primary>にする
	list_name_input.on('input', () => {
		const textarea_value = list_name_input.val();

		if (textarea_value == '') {
			btn.removeClass('primary');
			btn.addClass('disabled');
		} else {
			btn.removeClass('disabled');
			btn.addClass('primary');
		}
	});

	// 開いてるフォーム以外をクリックするとフォームを閉じる&入力があればカード追加
	$(document).on('click touchend', function(event) {
		if (
			!$(event.target).closest(list_add_form).length &&
			!$(event.target).closest(new_list_create).length
		) {
			if (list_name_input.val() != '') {
				list_name_input.val('');
			}
			list_add_form.addClass('hidden');
			new_list_create.removeClass('hidden');
			btn.removeClass('primary');
			btn.addClass('disabled');
		}
	});

	// キャンセル
	list_create_cancel.click(function() {
		// リスト追加のフォームを初期値に
		list_add_form.addClass('hidden');
		new_list_create.removeClass('hidden');
		btn.removeClass('primary');
		btn.addClass('disabled');
		//
	});
	//

	// フォームが空欄ならsubmitさせない
	list_form.submit(function(e) {
		e.preventDefault();

		if (list_name_input.val() == '') {
			return false;
		}
	});
	//

	// ================================================//
	//     カード追加ボタン[disabled,primary切り替え]      //
	// ================================================//

	$('.open-card-composer').click(function() {
		const open_card_composer = $(this);
		const js_card_form = open_card_composer.children('.js-card-form');
		const list_cards = $(this).closest('.list-cards');
		const card_composer = list_cards.find('.card-composer');
		const list_card_composer_textarea = card_composer.find(
			'.list-card-composer-textarea'
		);
		const card_create_btn = card_composer.find('.card-create-btn');

		textdelete();

		// カード追加ボタンを決してフォームを表示
		$('.card-composer').addClass('hidden');
		$('.open-card-composer')
			.parent()
			.removeClass('hidden');
		card_composer.removeClass('hidden');
		$(this)
			.parent()
			.addClass('hidden');
		list_card_composer_textarea.focus().val('');
		//

		// カードnameに入力があれば<button>を<primary>にする
		list_card_composer_textarea.on('input', () => {
			var textarea_value = list_card_composer_textarea.val();
			if (textarea_value == '') {
				card_create_btn.removeClass('primary');
				card_create_btn.addClass('disabled');
			} else {
				card_create_btn.removeClass('disabled');
				card_create_btn.addClass('primary');
			}
		});
		//

		js_card_form.submit(function(e) {
			e.preventDefault();

			if (list_card_composer_textarea.val() == '') {
				return false;
			}
		});
		//
		// 改行不可
		list_card_composer_textarea.on('keydown', e => {
			if (e.keyCode == 13) {
				e.preventDefault();
				console.log('www');
				if (list_card_composer_textarea.val() == '') {
					return false;
				}
			}
		});
	});

	// キャンセル
	const card_create_cancel = $('.card-create-cancel');
	card_create_cancel.click(function() {
		// カード追加フォームを初期値に
		$('.card-composer').addClass('hidden');
		$('.open-card-composer')
			.parent()
			.removeClass('hidden');
		textdelete();
		//
	});
	//
	// =================================================//

	// 開いてるフォーム以外をクリックするとフォームを閉じる&入力があればカード追加
	$(document).on('click touchend', function(event) {
		if (
			!$(event.target).closest('.card-composer').length &&
			!$(event.target).closest('.open-card-composer').length
		) {
			$('.card-composer').addClass('hidden');
			$('.open-card-composer')
				.parent()
				.removeClass('hidden');
			textdelete();
		}
	});

	function textdelete() {
		$('.list-card-composer-textarea').val('');
		$('.card-create-btn').removeClass('primary');
		$('.card-create-btn').addClass('disabled');
	}

	// =================================================//

	// ================================================//
	//                   ボードタイトル変更                 //
	// ================================================//
	const board_header_btn = $('.board-header-btn');
	const board_editing_target = $('.board-editing-target');
	const js_board_name_input = $('.js-board-name-input');

	// ボードタイトルをクリックしたらタイトル変更フォームを表示
	board_editing_target.click(function() {
		js_board_name_input.css('display', 'block');
		js_board_name_input.focus().select();
	});

	// 開いてるフォーム以外をクリックするとフォームを閉じる&入力変更あれば更新
	$(document).on('click touchend', function(event) {
		if (
			!$(event.target).closest(board_editing_target).length &&
			!$(event.target).closest(js_board_name_input).length
		) {
			// ボードタイトルの変更を反映
			input_empty_before_value();
		}
	});

	// ========Enter押したらテキストエリアのfocus外す=======//

	js_board_name_input.on('keydown', e => {
		if (e.keyCode == 13) {
			e.preventDefault();
			input_empty_before_value();
		}
	});
	// =================================================//

	js_board_name_input.on('focus', function() {
		console.log(`見本： ${board_header_btn.width()}`);
		js_board_name_input.css('width', board_editing_target.width());
		console.log(`実際： ${js_board_name_input.width()}`);
	});

	// テキストフォームの幅を文字列の長さになるようにする
	js_board_name_input.on('input', function() {
		var div = `<span class="js_form_width">${js_board_name_input.val()}</span>`;
		js_board_name_input.before(div);
		const form = $('.js_form_width');
		form.css('padding', '0 12px');
		const js_form_width = form.width();

		console.log(js_form_width);
		console.log(`実際： ${js_board_name_input.width()}`);

		js_board_name_input.css('width', `${js_form_width}px`);
		form.remove();
	});

	// ========focus外れたとき、valueが['']だったらもとのタイトルに戻す=======//
	function input_empty_before_value() {
		if (js_board_name_input.val() != '') {
			board_editing_target.text(js_board_name_input.val());
			js_board_name_input.css('display', 'none');
		} else {
			js_board_name_input.val(board_editing_target.text());
			js_board_name_input.css('display', 'none');
		}
	}
	// =================================================

	// ================================================//
	//                     ボードメニュー                  //
	// ================================================//
	const js_show_sidebar = $('.js-show-sidebar');
	const board_menu = $('.board-menu');
	const board_menu_header_close_button = $('.board-menu-header-close-button');

	js_show_sidebar.on('click', () => {
		board_menu.removeClass('hidden');
		setTimeout(function() {
			board_menu.addClass('is-show');
		}, 0);
		// board_menu.addClass('is-show');
	});

	board_menu_header_close_button.on('click', function() {
		board_menu.removeClass('is-show');
		setTimeout(function() {
			board_menu.addClass('hidden');
		}, 100);
	});

	//
}
