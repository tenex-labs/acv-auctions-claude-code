component {
    variables.root = getDirectoryFromPath(getCurrentTemplatePath()) & "../data/";
    public array function readVehicles() {
        if (!structKeyExists(variables, "vehicles")) variables.vehicles = deserializeJSON(fileRead(variables.root & "vehicles.json"));
        return variables.vehicles;
    }
    public array function readInspections() {
        if (!structKeyExists(variables, "inspections")) variables.inspections = deserializeJSON(fileRead(variables.root & "inspections.json"));
        return variables.inspections;
    }
    public struct function findVehicle(required string id) {
        for (var vehicle in readVehicles()) if (vehicle.id == arguments.id) return vehicle;
        return {};
    }
    public struct function findInspection(required string id) {
        for (var inspection in readInspections()) if (inspection.id == arguments.id) return inspection;
        return {};
    }
    public struct function inspectionForVehicle(required string vehicleId) {
        for (var inspection in readInspections()) if (inspection.vehicleId == arguments.vehicleId) return inspection;
        return {};
    }
    public struct function readRecordedReport(required string id) {
        if (!reFind("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$", arguments.id)) return {};
        var file = variables.root & "reports/" & arguments.id & ".json";
        return fileExists(file) ? deserializeJSON(fileRead(file)) : {};
    }
}
