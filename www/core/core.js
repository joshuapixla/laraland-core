var identifiedAddons = []
var addons = []
var activeWidget = null;

class Core {

	constructor() {

	}

	static addIdentifiedAddon(addon, file) {
		if(addon.MainClassFile != undefined) {
			addon.MainClassFile = file.fullPath.replace("/www/", "").replace("specification.json", "") + addon.MainClassFile;
		} 

		if(addon.MainView != undefined) {
			addon.MainView = file.fullPath.replace("/www/", "").replace("specification.json", "") + addon.MainView;
		}
		
		identifiedAddons.push(addon);
	}


	/**
	 * This method loads all the addons that are identified at the application boot.
	 * Identified addons should be considered to be addons that have been verified by the boot code.
	 */
	static loadAllAddons() {
		for(let addon of Core.getIdentifiedAddons()) {
			if(addon.AddonType) {
				$('head').append('<script type=text/javascript" src="'+addon.MainClassFile+'"></script>');
				addons[addon.MainClass] = Function("param", "return new "+addon.MainClass+"(param)");
				
				// Instantiate addon class //
				var adn = new addons[addon.MainClass](addon);

				if(adn.addonType == "Main" && activeWidget == null) {
					activeWidget = adn;

					// Start main addon //
					adn.start();
				}
			}			
		}
	}

	static getIdentifiedAddons() {
		return identifiedAddons;
	}

	static getActiveWidget() {
		return activeWidget;
	}

}