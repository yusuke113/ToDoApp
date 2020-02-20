'use strict';

{
	const new_board = $('#new-board-create');
	const new_board_form = $('#new_board_form');
	const fade = $('#fade');
	const board_title_field = $('#board-title-field');
	const board_create_btn = $('#board-create-btn');

	// <新しいボードを作成>を押したらフォームを表示
	new_board.click(function() {
		fade.removeClass('hidden');
		new_board_form.removeClass('hidden');
		board_title_field.focus();
	});

	// ボードタイトル記入欄以外をクリックするとフォームをhiddenする
	function cancel() {
		fade.addClass('hidden');
		new_board_form.addClass('hidden');
		board_title_field.val('');
		board_create_btn.removeClass('primary');
		board_create_btn.addClass('disabled');
	};
	$('#window-overlay').click(cancel);
	$('#cancel').click(cancel);

	// ボードタイトルに入力があれば<button>を<primary>にする
	board_title_field.on('input', () => {
		var input_field = board_title_field.val();
		if (input_field === '') {
			board_create_btn.removeClass('primary');
			board_create_btn.addClass('disabled');
		} else {
			board_create_btn.removeClass('disabled');
			board_create_btn.addClass('primary');
		}
	});
}
