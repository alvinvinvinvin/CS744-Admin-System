
//{"drug_id":1,"drug_name_commercial":"druggg"}

$(document).ready(function() {
	//loadPatient();
	var drug_id = getUrlParameter("drug_id");
	//drug_name = getUrlParameter("drug_name");
	console.log(drug_id);
	getDrugBasicContent(drug_id);
	listeningDeleteButton();
});


function getDrugBasicContent(drug_id) {
	$.ajax({
		type : "GET",
		url : "/EMR_Admin/drug/getDrugById",
		data : "drug_id=" + drug_id,
		success : function(data) {
			//drug_id = data.drug_id;
			var drug_name_commercial = data.drug_name_commercial;
			
			console.log(drug_id+" "+drug_name_commercial);
			fillTextboxes(drug_id, drug_name_commercial);
		},
		dataType : "json",
	});
}
function listeningDeleteButton(){
	console.log("delete_drug");
	$("#delete_drug").on(
			'click',
			function(){
				var drug_id = $("#drug_id").val();
				//var drug_name = $("#drug_name").val();
				console.log("delete_drug button has been clicked");
				$.ajax({
					type: "GET",
					url : "/EMR_Admin/drug/deleteDrug",
					data: "drug_id=" + drug_id,
					success : function(data){
						
						if(data=="s"){
							$('#deletingResult').html("Success!");
							$('#deletingResult').show();
							//loadAllDrug();
							setTimeout(jump,1000);
							
						}
						else if(data=="d"){
							$('#deletingResult').html("Failure! Something is Wrong!");
							$('#deletingResult').show();
						}
					},
						dataType : "text",
				});
			}
	);
}



function jump(){
	location.href ="drugs.html";
}

function fillTextboxes(drug_id, drug_name_commercial){
	$("#drug_id").val(drug_id);
	$("#drug_name_commercial").val(drug_name_commercial);
}


function getUrlParameter(sParam) {

	var sPageURL = window.location.search.substring(1);
	console.log(sPageURL);
	var sURLVariables = sPageURL.split('&');

	for (var i = 0; i < sURLVariables.length; i++) {

		var sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] == sParam) {

			return sParameterName[1];

		}
	}
}