// validate form
$(document).ready(function() {
	$("#form-registration").submit(function() {
		if(this.username.value==''){
			sweetAlert('Ошибка','Введите Ваше имя!','error');
			return false
		}
		if(this.email.value==''){
			sweetAlert('Ошибка','Введите Ваш email!','error');
			return false
		}
		if(this.phone.value==''){
			sweetAlert('Ошибка','Введите Ваш номер телефона!','error');
			return false
		}
		if(this.password.value==''){
			sweetAlert('Ошибка','Введите Ваш пароль!','error');
			return false
		}
		var phone_val = $("input[name=phone]", this).val();
		var reg1 = new RegExp("[^0-9]*", "g"),
			reg2 = new RegExp("[^0-9-+ ()]", "g");
		var phone_txt = phone_val.replace(reg1, "");
		if (phone_val.search(reg2) != -1) {
			// alert('Номер телефона может содержать только цифры, символы "+", "-", "(", ")" и пробелы');
			sweetAlert('Ошибка','Номер телефона может содержать только цифры, символы "+", "-", "(", ")" и пробелы','error');
			return false;
		}
		if (!phone_txt || phone_txt.length < 7) {
			sweetAlert('Ошибка','В вашем телефоне слишком мало цифр!','error');
			return false;
		}
		return $.ajax({
			type: "POST",
			url: "../mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val(""), swal('Письмо отправлено !', 'Мы обязательно с вами свяжемся!', 'success'), $("#form-registration").trigger("reset")
		}), !1
	})
});