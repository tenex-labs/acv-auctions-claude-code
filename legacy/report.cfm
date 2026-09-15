<cfinclude template="includes/formatting.cfm">
<cfparam name="url.inspectionId" default="">
<cfset inspection = safeId(url.inspectionId) ? application.records.findInspection(url.inspectionId) : {}>
<cfif structIsEmpty(inspection)>
<cfheader statuscode="404">
<p data-testid="record-missing">That inspection was not found.</p>
<cfabort>
</cfif>
<cfscript>
vehicle = application.records.findVehicle(inspection.vehicleId);
counts = {"major":0,"minor":0,"info":0};
for (finding in inspection.findings) counts[finding.severity]++;
findings = duplicate(inspection.findings);
rank = {major:0,minor:1,info:2};
arraySort(findings, function(a,b) { var order = rank[a.severity] - rank[b.severity]; return order != 0 ? order : compare(a.id,b.id); });
report = {"id":"RPT-" & replace(inspection.id,"insp-","") & "-R" & inspection.revision,
"inspectionId":inspection.id,"inspectionRevision":inspection.revision,"vehicle":vehicle,
"inspectedAt":inspection.inspectedAt,"inspectorLabel":inspection.inspectorLabel,"findings":findings,
"severityCounts":counts,"needsAttention":counts.major gte 1 or counts.minor gte 3};
</cfscript>

<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vehicle condition report · Inspection Desk</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
<a href="index.cfm">Inspection Desk</a>
<span>VEHICLE RECORDS</span>
</header>
<main>
<cfoutput>
<section data-testid="report-page" data-report-id="#report.id#" data-report-source="generated">
<a href="inspection.cfm?id=#report.inspectionId#">Back to inspection</a>
<p class="eyebrow">Generated report</p>
<h1>Vehicle condition report <span data-testid="report-id">#report.id#</span>
</h1>
<h2 data-testid="report-vehicle">#report.vehicle.year# #encodeForHTML(report.vehicle.make)# #encodeForHTML(report.vehicle.model)#</h2>
<dl class="facts">
<div>
<dt>Stock number</dt>
<dd data-testid="report-stock">#report.vehicle.stockNumber#</dd>
</div>
<div>
<dt>Mileage</dt>
<dd data-testid="report-mileage">#formatMiles(report.vehicle.mileage)#</dd>
</div>
<div>
<dt>Color</dt>
<dd data-testid="report-color">#report.vehicle.exteriorColor#</dd>
</div>
<div>
<dt>Revision</dt>
<dd data-testid="report-revision">#report.inspectionRevision#</dd>
</div>
</dl>
<p>Inspected <span data-testid="report-date">#formatInspectionDate(report.inspectedAt)#</span> by <span data-testid="report-inspector">#report.inspectorLabel#</span>.</p>
<div class="summary">Major <strong data-testid="report-count-major">#report.severityCounts.major#</strong> &middot; Minor <strong data-testid="report-count-minor">#report.severityCounts.minor#</strong> &middot; Info <strong data-testid="report-count-info">#report.severityCounts.info#</strong>
<cfif report.needsAttention>
<span class="attention" data-testid="report-needs-attention">Needs attention</span>
</cfif>
</div>
<h2>Findings</h2>
<cfif !arrayLen(report.findings)>
<p data-testid="report-findings-empty">No findings recorded.</p>
</cfif>
<ol class="report-findings">
<cfloop array="#report.findings#" index="finding">
<li data-testid="report-finding-#finding.id#">
<strong data-testid="finding-area">#encodeForHTML(finding.area)#</strong> · <span data-testid="finding-severity">#severityLabel(finding.severity)#</span>
<p data-testid="finding-description">#encodeForHTML(finding.description)#</p>
</li>
</cfloop>
</ol>
<h2>Report data (JSON)</h2>
<pre data-testid="report-json">#encodeForHTML(serializeJSON(report))#</pre>
</section>
</cfoutput>
<cfinclude template="includes/footer.cfm">
