$('input[name="phone"]').inputmask('+7 (999) 999 99 99');

$('.formSubmit').on('submit', function(e) {
	e.preventDefault();
	var self = $(this);
	if ( validation(self) == 0 ) {
		console.log("form sended"); //заглушка, т.к. бэка нет
	}
	else {
		console.log("error"); //заглушка, т.к. бэка нет
	}
});

function validation(form) {
	var errors = false;
	var required = form.find('.required');
	var email = form.find('input[name="email"]');

	if ( email.length != 0) { //если поле email есть в форме
		if (email.val().length > 0 && !email.hasClass('required')) { //на случай, если email необязательное поле, но все-таки заполнено
			if ( !emailValidate(email.val()) ) {
				email.addClass('error');
				errors = true;
			}
			else {
				email.removeClass('error');
				errors = false;
			}
		}
		else {
			email.removeClass('error');
			errors = false;
		}
	}

	required.each(function() {

		var self = $(this);
		var name = self.attr('name');
		var value = self.val();

		if (value.length == 0) {
			self.addClass('error');
			errors = true;
			return;
		}

		else if (name == 'email') { //проверка на email
			if ( emailValidate(value) ) {
				self.removeClass('error');
			}
			else {
				self.addClass('error');
				errors = true;
				return;
			}
		}

		else if (name == 'phone') { //проверка на телефон, т.к. у нас стоит плагин inputmask
			var index = value.indexOf('_'); //ищем символы "_" в поле телефона, которые говорят нам о том, что телефон не дописан до конца
			if ( index == -1 && value.length > 0) {
				self.removeClass('error');
			}
			else {
				self.addClass('error');
				errors = true;
				return;
			}
		}

		else { //проверка обычных полей на заполненность
			self.removeClass('error');
		}

	});

	return errors;
}

function emailValidate(email) {
	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	return pattern.test(email); //вернет true, если email правильный
}
