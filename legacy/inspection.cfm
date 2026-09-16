<cfinclude template="includes/formatting.cfm">
<cfparam name="url.id" default="">
<cfset inspection = safeId(url.id) ? application.records.findInspection(url.id) : {}>
<cfif structIsEmpty(inspection)>
<cfheader statuscode="404">
<p data-testid="record-missing">That inspection was not found.</p>
<cfabort>
</cfif>
<cfset vehicle = application.records.findVehicle(inspection.vehicleId)>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Inspection · Inspection Desk</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
<a href="index.cfm">Inspection Desk</a>
<span>VEHICLE RECORDS</span>
</header>
<main>
<cfoutput>
<section data-testid="inspection-page" data-inspection-id="#inspection.id#">
<a href="index.cfm">Back to search</a>
<p class="eyebrow">Vehicle inspection</p>
<h1 data-testid="vehicle-title">#vehicle.year# #encodeForHTML(vehicle.make)# #encodeForHTML(vehicle.model)#</h1>
<dl class="facts">
<div>
<dt>Stock number</dt>
<dd data-testid="vehicle-stock">#vehicle.stockNumber#</dd>
</div>
<div>
<dt>Mileage</dt>
<dd data-testid="vehicle-mileage">#formatMiles(vehicle.mileage)#</dd>
</div>
<div>
<dt>Color</dt>
<dd data-testid="vehicle-color">#vehicle.exteriorColor#</dd>
</div>
<div>
<dt>Revision</dt>
<dd data-testid="inspection-revision">#inspection.revision#</dd>
</div>
</dl>
<p>Inspected <span data-testid="inspection-date">#formatInspectionDate(inspection.inspectedAt)#</span> by <span data-testid="inspector">#inspection.inspectorLabel#</span>.</p>
<cfset counts = {"major":0,"minor":0,"info":0}>
<cfloop array="#inspection.findings#" index="finding">
<cfset counts[finding.severity]++>
</cfloop>
<div class="summary">Major <strong data-testid="count-major">#counts.major#</strong> &middot; Minor <strong data-testid="count-minor">#counts.minor#</strong> &middot; Info <strong data-testid="count-info">#counts.info#</strong>
<cfif counts.major gte 1 or counts.minor gte 3>
<span class="attention" data-testid="needs-attention">Needs attention</span>
</cfif>
</div>
<h2>Inspection findings</h2>
<cfif !arrayLen(inspection.findings)>
<p data-testid="findings-empty">No findings recorded.</p>
</cfif>
<table>
<thead>
<tr>
<th>Area</th>
<th>Severity</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<cfloop array="#inspection.findings#" index="finding">
<tr data-testid="finding-#finding.id#" data-finding-id="#finding.id#">
<td data-testid="finding-area">#encodeForHTML(finding.area)#</td>
<td data-testid="finding-severity">#severityLabel(finding.severity)#</td>
<td data-testid="finding-description">#encodeForHTML(finding.description)#</td>
</tr>
</cfloop>
</tbody>
</table>
<cfset reportId = "RPT-" & replace(inspection.id, "insp-", "") & "-R" & inspection.revision>
<div class="actions">
<a class="button" href="report.cfm?inspectionId=#inspection.id#">Generate report</a>
<cfif !structIsEmpty(application.records.readRecordedReport(reportId))>
<a href="recorded.cfm?id=#reportId#">Open recorded report</a>
<cfelse>
<p data-testid="no-recorded-report">No recorded report for this inspection.</p>
</cfif>
</div>
</section>
</cfoutput>
<cfinclude template="includes/footer.cfm">
