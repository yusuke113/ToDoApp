'use strict';

{
	// ================================================//
	// 					    マウスドラッグで横スクロール	   			  //
	// ================================================//
	const scroll = new ScrollBooster({
		viewport: document.querySelector('#board'),
		content: document.querySelector('.js-scroll-view'),
		scrollMode: 'native',
		direction: 'horizontal',
		emulateScroll: true,
		bounce: false,
		friction: 1
	});

	// $('#board')以外クリック時はスクロールさせない
	$(document).on('mousedown', function(event) {
		if ( $(event.target).closest($('.list')).length ) {
			scroll.updateOptions({ friction: 1 });
		} else {
			scroll.updateOptions({ friction: 0.45 });
		}
	});
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
	//                     リスト編集                     //
	// ================================================//
	const js_open_list_menu = $('.js-open-list-menu');
	const pop_over = $('.pop-over');
	const pop_over_header_close_btn = $('.pop-over-header-close-btn');
	const js_delete_list = $('.js-delete-list');

	js_open_list_menu.click(function() {
		// ターゲットのリストのid取得
		const edit_list_id = $(this).data('list-id');
		// ターゲット操作のurl作成
		const target_list_url = `/lists/${edit_list_id}`;
		// ターゲットのリストの位置を設定する
		const targetList = $(this);
		const targetOffset = targetList.offset();

		// deleteのurlを設定する
		js_delete_list.attr('href', target_list_url);

		if (!pop_over.hasClass('hidden')) {
			pop_over.addClass('hidden');
			console.log('www');
		}
		// リストメニューの位置を設定
		// pop_over.css(targetOffset);
		pop_over.css({
			top: targetOffset.top + 40,
			left: targetOffset.left
		});

		console.log(targetList.offset().top);
		console.log(targetList.offset().left);

		// listの削除のurlを変更する
		js_delete_list.attr('href', target_list_url);
		// リストメニューを表示する
		pop_over.removeClass('hidden');
		console.log('=======================');
		console.log(targetOffset);
		console.log(pop_over.offset());
		console.log(pop_over.offset().top);
	});

	// 編集エリア以外クリックで閉じる
	$(document).on('click touchend', function(event) {
		if (
			!$(event.target).closest(pop_over).length &&
			!$(event.target).closest(js_open_list_menu).length
		) {
			pop_over.addClass('hidden');
		}
	});

	pop_over_header_close_btn.on('click touchend', function() {
		pop_over.addClass('hidden');
	});

	//

	// ================================================//
	//                     カード追加                     //
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

	// ================================================//
	//                     カード編集                     //
	// ================================================//

	const card_edit_btn = $('.card-edit-btn');
	const quick_card_editor = $('.quick-card-editor');
	const quick_card_editor_card = $('.quick-card-editor-card');
	const js_edit_card_title = $('.js-edit-card-title');
	const js_save_edits = $('.js-save-edits');

	card_edit_btn.click(function() {
		const edit_card_id = $(this).data('card-id');
		const edit_card_name = $(this).data('card-name');
		const js_edit_labels = $('.js-edit-labels');
		const target_card_url = `/cards/${edit_card_id}`;
		// ターゲットのカードの位置を取する
		const targetCard = $(this).parents('.list-card-details');
		const targetOffset = targetCard.offset();

		// cardの編集フォームのactionを変更する
		js_save_edits.attr('action', target_card_url);

		// cardの削除のurlを変更する
		js_edit_labels.attr('href', target_card_url);

		// テキストエリアにターゲットカードのnameを表示
		js_edit_card_title.val(edit_card_name);
		quick_card_editor.removeClass('hidden');
		js_edit_card_title.focus().select();

		// カード編集フォームの位置を設定する
		quick_card_editor_card.css(targetOffset);
	});

	// 編集エリア以外クリックで閉じる
	$(document).on('click touchend', function(event) {
		if (
			!$(event.target).closest(quick_card_editor_card).length &&
			!$(event.target).closest(card_edit_btn).length
		) {
			// ボードタイトルの変更を反映
			quick_card_editor.addClass('hidden');
		}
	});
	//

	$('.js-edit-card-title').on('input', () => {
		// ===========テキストエリアの幅を行数で変える========//

		// ターゲットのテキストエリア要素を取得する
		const card_create_btn = $('.js-save-edits');
		const target = $('.js-edit-card-title:focus');

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

	// ==============================================//

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
	});

	board_menu_header_close_button.on('click', function() {
		board_menu.removeClass('is-show');
		setTimeout(function() {
			board_menu.addClass('hidden');
		}, 100);
	});
	//


$(document).on('click touchend', function(event) {
	const www = event.target;
		console.log(www);
});

}
