sap.ui.define([
	"ui5testapp/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	var _aValidTabKeys = ["tabInfo", "tabProjects", "tabHobbies", "tabNotes"];

	return BaseController.extend("ui5testapp.controller.employee.Employee", {

		onInit: function () {
			var oRouter = this.getRouter();

			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
			

		},

		_onRouteMatched : function (oEvent) {
			//runs on routing and tabbing
			var oArgs, oView, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			
			oView.bindElement({
				path : "/Employees(" + oArgs.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
			
			//setting current tab to query param
			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				//saving current tab into model (for header)
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
				oView.getModel("view").setProperty("/selectedTab", oView.getModel("i18n").getProperty(oQuery.tab));
			} else {
				this.getRouter().navTo("employee", {
					employeeId : oArgs.employeeId,
					query: {
						tab : _aValidTabKeys[0]
					}
				},true);
			}
			
			// var oTable = this.byId("projectsList");
			// oTable.bindElement("/Employees/" + oArgs.employeeId + "");
		},
		
		onTabSelect : function (oEvent){
			var oCtx = this.getView().getBindingContext();

			this.getRouter().navTo("employee", {
				employeeId : oCtx.getProperty("EmployeeID"),
				query: {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true);
			
		},

		_onBindingChange : function (oEvent) {
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}

	});

});