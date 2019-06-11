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
		
		onSearch : function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			
			if (sQuery && sQuery.length > 0) {
				var filter1 = new Filter("EmployeeID", FilterOperator.EQ, sQuery);
				var filter2 = new Filter("FirstName", FilterOperator.Contains, sQuery);
				var filter3 = new Filter("LastName", FilterOperator.Contains, sQuery);
				aFilters = new Filter([filter1, filter2, filter3], false);
			}

			var list = this.getView().byId("employeeList");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
		}
	});
});