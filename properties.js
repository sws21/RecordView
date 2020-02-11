	var vRecordLimit = {
			ref: "prop.recordLimit",
			label: "Record (column) limit displayed",
			type: "number",
			defaultValue:5
	};
	var vFetchLimit = {
			ref: "qHyperCubeDef.qInitialDataFetch.0.qHeight",
			label: "Record limit retrieved",
			type: "number",
			defaultValue: 10
	};
	
	var vSettingsSection = {
		type: "items",
		label:"Settings",
		items: {
			myRecLimit: vRecordLimit,
			myFetchLimit: vFetchLimit
		}
	};


define( [], function ( ) {

	return {
		type: "items",
		component: "accordion",
		items: {
			data: {
				uses: "data",
				min: 0
			},
			//sorting: {
			//	uses: "sorting"
			// },		
			mySettings: vSettingsSection,
			
			settings: {
				uses: "settings"
			}
		}
	};
 
});
