var currentAdmin;
$(document).ready(function() {
	loadAdmin();
	addAdmin();
	showAddingAdminTable();
});

function loadAdmin() {
	$.ajax({
		type : "GET",
		url : "/EMR_Admin/adminList",
		success : function(data) {
			loadAdminData(data);
		},
		dataType : "json",
	});
}

function loadAdminData(admin) {
	var dataSet = [];
	$
			.ajax({
				type : "GET",
				url : "/EMR_Admin/admin/currentAdmin",
				success : function(data) {
					currentAdmin = data.username;
					for (var i = 0; i < admin.length; i++) {
						if (admin[i].adminAccount != currentAdmin) {
							var admins = [];
							admins.push(admin[i].adminAccount);
							var deleteButton = "<a name=\"admin_delete"
									+ "id=\""
									+ admin[i].adminId
									+ "\" class=\"btn btn-danger btn-xs\" href=\"delete_admin.html?admin_id="
									+ admin[i].adminId
									+ "\""
									+ " ><i class=\"fa fa-trash-o fa-lg\"></i> Delete</a>";
							admins.push(deleteButton);
							dataSet.push(admins);
						}
					}

					$('#dataTables-admin').DataTable({
						"responsive" : true,
						"data" : dataSet,
						"columns" : [ {
							"title" : "Admin account",
							"class" : "center"
						}, {
							"title" : "Delete",
							"class" : "center"
						} ]
					});
				},
				dataType : "json",
			});

}

function addAdmin() {
	$('#addAdmin').on('click', function() {
		var account = $('#adminAccount').val();
		var password1 = $('#password1').val();
		var password2 = $('#password2').val();

		if (account.trim() == "") {
			alert("Input admin account please!");
			return;
		}
		if (password1 == "") {
			alert("Input password please!");
			return;
		}

		if (password1 != password2) {
			alert("You input different passwords.");
			return;
		}

		$.ajax({
			type : "GET",
			url : "/EMR_Admin/admin/addAdmin",
			data : 'account=' + account + '&password=' + password1,
			success : function(data) {
				// TODO
				if (data == "s") {
					$('#addingResult').html("Success!");
					$('#addingResult').show();
					location.reload(true);
				} else if (data == "d") {
					$('#addingResult').html("Failure! Duplicated Name!");
					$('#addingResult').show();
				}
			},
			dataType : "text",
		});
	});
}
function showAddingAdminTable() {
	$("#btn-showAddingAdminTable").on('click', function() {
		$("#panelcontent").show("slow");
	});
}