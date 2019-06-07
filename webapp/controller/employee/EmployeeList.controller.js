sap.ui.define([
	"ui5testapp/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("ui5testapp.controller.employee.EmployeeList", {

		onListItemPressed : function(oEvent){
			var oItem, oCtx;

			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();

			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("EmployeeID")
			});

		}
	});

});