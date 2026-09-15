<cfscript>
function formatMiles(required numeric mileage) {
    return numberFormat(arguments.mileage, ",") & " mi";
}
function formatInspectionDate(required string inspectedAt) {
    return dateFormat(parseDateTime(left(arguments.inspectedAt, 10)), "mmm d, yyyy");
}
function severityLabel(required string severity) {
    return uCase(left(arguments.severity, 1)) & mid(arguments.severity, 2, len(arguments.severity));
}
function safeId(required string id) {
    return reFind("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$", arguments.id) > 0;
}
</cfscript>
