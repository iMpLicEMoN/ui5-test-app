sap.ui.define([
	"ui5testapp/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("ui5testapp.controller.employee.EmployeeList", {

		onListItemPressed : function(oEvent){
			var oItem, oCtx;

			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();

			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("EmployeeID")
			});

		},
		
		onSearch: function(oEvent) {


		}
		

	});

});