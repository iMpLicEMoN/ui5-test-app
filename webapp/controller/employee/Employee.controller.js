sap.ui.define([
	"ui5testapp/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];

	return BaseController.extend("ui5testapp.controller.employee.Employee", {

		onInit: function () {
			var oRouter = this.getRouter();

			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);

			// Hint: we don't want to do it this way
			/*
			 oRouter.attachRouteMatched(function (oEvent){
				 var sRouteName, oArgs, oView;

				 sRouteName = oEvent.getParameter("name");
				 if (sRouteName === "employee"){
				 	this._onRouteMatched(oEvent);
				 }
			 }, this);
			 */
			// var oData = {
			// 	currentTab : "Info"
			// };
			// var oModel = new JSONModel(oData);
			// this.getView().setModel(oModel);
		},

		_onRouteMatched : function (oEvent) {
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
			
			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				this.getRouter().navTo("employee", {
					employeeId : oArgs.employeeId,
					query: {
						tab : _aValidTabKeys[0]
					}
				},true /*no history*/);
			}
		},
		
		onTabSelect : function (oEvent){
			// var oCtx = this.getView().getBindingContext();

			this.getRouter().navTo("employee", {
				employeeId : oCtx.getProperty("EmployeeID"),
				query: {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
			
			//this.getView().getModel("view").setProperty("/selectedTabKey", oEvent.getParameter("selectedKey"));
		},

		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},

		onShowResume : function (oEvent) {
			var oCtx = this.getView().getBindingContext();

			this.getRouter().navTo("employeeResume", {
				employeeId : oCtx.getProperty("EmployeeID")
			});
		}

	});

});