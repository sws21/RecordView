// Type:   		Qlik Sense extension
// Name: 		RecordView
// Purpose: 	Provides a simple vertical list of fields (data) across record columns
// Written:    2020-02-11  Stephen Skinner
// Revision history:
//	v.03	2020-02-12 SSkinner; 
//    v.01	2020-02-11 SSkinner; thanks to www examples and articles

define( ["qlik", "text!./css.css","./properties"],
    function (qlik, cssContent, properties) {
        'use strict';
		$( "<style>" ).html( cssContent ).appendTo( "head" );
        return {

			// following from sample code, need figure out what it does (if anything), fix it
            initialProperties: {
                qHyperCubeDef: {
                    // qDimensions: [],
                    // qMeasures: [],
                    qInitialDataFetch: [
                        {
                            qWidth: 10,  // this set'able in the properties (I think it works)
                            qHeight: 50
                        }
                    ]
                }
            },
		definition : properties,
			support : { snapshot: true,  export: true, exportData : true },
			
        paint: function ( $element, layout ) {
				// console.log('rv_019 starting...');
                var hc = layout.qHyperCube;
                // console.log( 'rv_Data returned: ', hc );
				
				$element.empty(); // clear the body
				var vHTML = '<table>';  // create the table, append columns, rows to this
				// collect the labels (titles); they are into two arrays (would not do that if I could figure it out)
				let vLabels=new Array();
				 for (var i = 0; i < hc.qDimensionInfo.length; i++) {
							vLabels.push(hc.qDimensionInfo[i].qFallbackTitle);
                 }
                 for (var i = 0; i < hc.qMeasureInfo.length; i++) {
							vLabels.push(hc.qMeasureInfo[i].qFallbackTitle);
                 }
				// we want a row for each dimension-measure (vLabels at the moment) and a column for each record (loop below)
				for (var i = 0; i < vLabels.length; i++) {
					    vHTML += '<tr>';
						// set the first column as the dim-measure label
						vHTML +='<td class="label">' + vLabels[i]+ '</td>'; // set the row label
						// loop through the data, creating columns (as td) 
								for (var vRecord = 0; vRecord < hc.qDataPages[0].qMatrix.length && vRecord < layout.prop.recordLimit; vRecord++) {
									vHTML +='<td ';
									if(i==0) {
										vHTML +='class="topData"';
									}
									vHTML += '>' + hc.qDataPages[0].qMatrix[vRecord][i].qText + '</td>';
								} // end of record looping
						vHTML += '</tr>';  // close the row
				} // end of column lopping
				vHTML += '</table>'; // close the table
				$element.append(vHTML); // render the display
            } // end of paint
        }; // end of return
    } ); // end of function