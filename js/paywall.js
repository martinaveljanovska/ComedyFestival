// let packages = ["48884"];
let service_url = "https://services.inplayer.com";

// create item element
function createItemElement(id, img, title) {
	var output = `<div class="package-item"><div class="content" style="background-image:url(${img})"></div><h3 class="item-label">${title}</h3><a href="./item.html?id=${id}" class="overlay-link"></a></div>`;
	return output;
}

$(function () {
	$("#preview-item").html(
		`<div class="inplayer-paywall" id="inplayer-${getParameterByName(
			"id"
		)}"></div>`
	);

	const prependTitleForAsset = (
		activeAssetId,
		assetId,
		assetTitle,
		assetDesc
	) => {
		if (activeAssetId == assetId) {
			$(`.item-title`).html(assetTitle);
			$("#item-description").html(assetDesc);
		}
	};

	// fetch package
	const fetchPackage = (packageId) => {
		$.get(
			`${service_url}/items/packages/${packageId}/items?limit=100`,
			(resp) => {
				let output = "";
				let activeAssetId = getParameterByName("id");

				for (item of resp.collection) {
					let assetId = item.id,
						assetPhoto = item.metahash.paywall_cover_photo,
						assetTitle = item.metahash.preview_title,
						assetDesc = item.metahash.preview_description;

					output += createItemElement(assetId, assetPhoto, assetTitle);

					if (activeAssetId) {
						prependTitleForAsset(activeAssetId, assetId, assetTitle, assetDesc);
					}

					document.getElementById(
						`package-items-${packageId}`
					).innerHTML = output;
				}
			}
		);
	};

	packages.map((packageId) => fetchPackage(packageId));

	$(".inplayer-paywall-logout").hide();

	paywall.on("authenticated", () => {
		$(".inplayer-paywall-login").parent().hide();
		$(".inplayer-paywall-logout").parent().show();
	});

	paywall.on("logout", () => {
		location.reload();
	});

	paywall.on("access", (event, asset) => {
		if (asset.asset.id === 98547 && asset.hasAccess == true) {
			$("body").show();
		} else if (asset.asset.id === 98547 && asset.hasAccess == false) {
			window.location.replace("login.html");
		}
	});
});
