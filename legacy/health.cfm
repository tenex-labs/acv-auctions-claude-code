<cfcontent type="application/json; charset=utf-8">
<cfoutput>#serializeJSON({"status":"ok","engine":"Lucee","version":server.lucee.version,"vehicles":arrayLen(application.records.readVehicles())})#</cfoutput>
