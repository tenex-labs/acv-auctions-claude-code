<cfinclude template="includes/formatting.cfm">
<cfscript>
param name="url.q" default="";
param name="url.sort" default="";
q = trim(url.q);
rows = [];
vehicles = application.records.readVehicles();
for (vehicle in vehicles) {
    // DF-01: stock numbers are searched with find(), which is case-sensitive.
    if (!len(q) || findNoCase(q, vehicle.make) || findNoCase(q, vehicle.model) || find(q, vehicle.stockNumber)) arrayAppend(rows, vehicle);
}
if (url.sort == "asc" || url.sort == "desc") {
    arraySort(rows, function(a, b) { return a.mileage - b.mileage; });
    if (url.sort == "desc") rows = arrayReverse(rows);
}
</cfscript>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vehicle search · Inspection Desk</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
<a href="index.cfm">Inspection Desk</a>
<span>VEHICLE RECORDS</span>
</header>
<main>
<section data-testid="search-page">
<p class="eyebrow">Vehicle inventory</p>
<h1>Find a vehicle</h1>
<p>Search by make, model or stock number to open its inspection.</p>
<cfoutput>
<form method="get" action="index.cfm" role="search">
<input type="search" name="q" aria-label="Search vehicles" data-testid="search-input" value="#encodeForHTMLAttribute(q)#">
<button type="submit">Search</button>
</form>
<div class="toolbar">
<p data-testid="results-count">Showing #arrayLen(rows)# of #arrayLen(vehicles)# vehicles</p>
<nav>
<a data-testid="sort-asc" aria-label="Sort by mileage, lowest first" href="index.cfm?q=#encodeForURL(q)#&amp;sort=asc">Mileage: lowest</a> <a data-testid="sort-desc" aria-label="Sort by mileage, highest first" href="index.cfm?q=#encodeForURL(q)#&amp;sort=desc">Highest</a>
</nav>
</div>
<cfif !arrayLen(rows)>
<p data-testid="results-empty">No vehicles match "#encodeForHTML(q)#".</p>
</cfif>
<div class="table-wrap">
<table>
<thead>
<tr>
<th>Vehicle</th>
<th>Stock number</th>
<th>Mileage</th>
<th>Color</th>
<th>Inspection</th>
</tr>
</thead>
<tbody>
<cfloop array="#rows#" index="vehicle">
<cfset inspection = application.records.inspectionForVehicle(vehicle.id)>
<tr data-testid="vehicle-row-#vehicle.id#" data-vehicle-id="#vehicle.id#">
<td data-testid="vehicle-name">#vehicle.year# #encodeForHTML(vehicle.make)# #encodeForHTML(vehicle.model)#</td>
<td data-testid="vehicle-stock">#vehicle.stockNumber#</td>
<td data-testid="vehicle-mileage">#numberFormat(vehicle.mileage, ',')# mi</td>
<td data-testid="vehicle-color">#vehicle.exteriorColor#</td>
<td>
<cfif !structIsEmpty(inspection)>
<a href="inspection.cfm?id=#inspection.id#">Open inspection</a>
<cfelse>
<span data-testid="vehicle-no-inspection">No inspection recorded</span>
</cfif>
</td>
</tr>
</cfloop>
</tbody>
</table>
</div>
</cfoutput>
</section>
<cfinclude template="includes/footer.cfm">
