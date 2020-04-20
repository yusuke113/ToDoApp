{
	// ================================================//
	//                     ボードメニュー                  //
	// ================================================//
	const js_show_user_editer = $('.user-edit-icon');
	const user_menu = $('.user-menu');
	const user_menu_header_close_button = $('.user-menu-header-close-button');

	js_show_user_editer.on('click', () => {
		user_menu.toggleClass('hidden');
	});

	user_menu_header_close_button.on('click', function () {
		user_menu.addClass('hidden');
	});
	//

	// 開いてるフォーム以外をクリックするとフォームを閉じる&入力があればカード追加
	$(document).on('click touchend', function (event) {
		if (
			!$(event.target).closest(js_show_user_editer).length &&
			!$(event.target).closest(user_menu).length
		) {
			$(user_menu).addClass('hidden');
		}
	});
}
