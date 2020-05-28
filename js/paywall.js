// let packages = ["48884"];
let service_url = "https://services.inplayer.com";
var paywall = new InplayerPaywall('036d5d1d-7166-4985-9858-2d1d2c039bc8', [{ id: 102596 }]);

$(function () {

	$.ajax({
		url: `${service_url}/items/102596`,
		success: response => {
			$('#item-title').html(response.metahash.preview_title);
			$('#item-description').html(response.metahash.preview_description);
		}
	});

	$(".inplayer-paywall-logout").hide();

	paywall.on("authenticated", () => {
		$(".inplayer-paywall-login").parent().hide();
		$(".inplayer-paywall-logout").parent().show();
	});

	paywall.on("logout", () => {
		location.reload();
	});

});
