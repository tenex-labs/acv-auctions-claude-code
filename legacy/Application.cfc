component {
    this.name = "InspectionDeskLegacy20260915";
    this.sessionManagement = false;
    this.setClientCookies = false;
    this.serialization = { preserveCaseForStructKey: true };
    public boolean function onApplicationStart() {
        application.records = new components.Records();
        application.records.readVehicles();
        application.records.readInspections();
        return true;
    }
    public boolean function onRequestStart(required string targetPage) {
        setting showDebugOutput=false;
        var pageName = listLast(arguments.targetPage, "/");
        if (!listFindNoCase("index.cfm,inspection.cfm,report.cfm,recorded.cfm,health.cfm", pageName)) {
            header statuscode=404;
            writeOutput("Page not found.");
            return false;
        }
        return true;
    }
    public void function onError(required any exception, required string eventName) {
        header statuscode=500;
        writeLog(type="error", file="inspection-desk", text=arguments.exception.message);
        writeOutput("The inspection desk could not open this record.");
    }
}
