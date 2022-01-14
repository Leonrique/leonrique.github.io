(function () {
	$(document).ready(function () {
		var walkthrough;
		walkthrough = {
			index: 0,
			nextScreen: function nextScreen() {
				if (this.index < this.indexMax()) {
					this.index++;
					return this.updateScreen();
				}
			},
			prevScreen: function prevScreen() {
				if (this.index > 0) {
					this.index--;
					return this.updateScreen();
				}
			},
			updateScreen: function updateScreen() {
				this.reset();
				this.goTo(this.index);
				return this.setBtns();
			},
			setBtns: function setBtns() {
				var $lastBtn, $nextBtn, $prevBtn;
				$nextBtn = $('.next-screen');
				$prevBtn = $('.prev-screen');
				$lastBtn = $('.finish');
				if (walkthrough.index === walkthrough.indexMax()) {
					$nextBtn.prop('disabled', true);
					$prevBtn.prop('disabled', false);
					/** Fim  */
					window.external.RegistrarNovidadeVersaoUsuario();
					return $lastBtn.addClass('active').prop('disabled', false);
				} else if (walkthrough.index === 0) {
					$nextBtn.prop('disabled', false);
					$prevBtn.prop('disabled', true);
					return $lastBtn.removeClass('active').prop('disabled', true);
				} else {
					$nextBtn.prop('disabled', false);
					$prevBtn.prop('disabled', false);
					return $lastBtn.removeClass('active').prop('disabled', true);
				}
			},
			goTo: function goTo(index) {
				$('.screen').eq(index).addClass('active');
				return $('.dot').eq(index).addClass('active');
			},
			reset: function reset() {
				return $('.screen, .dot').removeClass('active');
			},
			indexMax: function indexMax() {
				return $('.screen').length - 1;
			},
			closeModal: function closeModal() {
				var _this = this;

				$('.walkthrough, .shade').removeClass('reveal');
				return setTimeout(function () {
					$('.walkthrough, .shade').removeClass('show');
					_this.index = 0;
					return _this.updateScreen();
				}, 200);
			},
			openModal: function openModal() {
				$('.walkthrough, .shade').addClass('show');
				setTimeout(function () {
					return $('.walkthrough, .shade').addClass('reveal');
				}, 200);
				return this.updateScreen();
			}
		};
		$('.next-screen').click(function () {
			return walkthrough.nextScreen();
		});
		$('.prev-screen').click(function () {
			return walkthrough.prevScreen();
		});
		$('.close').click(function () {
			//return window.open('','_self').close();
			window.external.AbrirLink();
		});
		$('.open-walkthrough').click(function () {
			return walkthrough.openModal();
		});
		walkthrough.openModal();

		// Optionally use arrow keys to navigate walkthrough
		return $(document).keydown(function (e) {
			switch (e.which) {
				case 37:
					// left
					walkthrough.prevScreen();
					break;
				case 38:
					// up
					walkthrough.openModal();
					break;
				case 39:
					// right
					walkthrough.nextScreen();
					break;
				case 40:
					// down
					window.open('', '_self').close();
					break;
				default:
					return;
			}
			e.preventDefault();
		});
	});
}).call(undefined);