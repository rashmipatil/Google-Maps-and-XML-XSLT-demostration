var xmlhttp = null; 
if (window.XMLHttpRequest) { 
xmlhttp = new XMLHttpRequest(); 
} 
	else if (window.ActiveXObject) { 
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
} 

function sendData() 
{ 
	xmlhttp.abort(); 
	var url = "applicationproxy.php?symbol=" + document.form1.stocksymbol.value; 
	xmlhttp.open("GET", url, true); 
	xmlhttp.onreadystatechange = getData; 
	xmlhttp.send(null); 
} 
function getData() 
{ 
	if ((xmlhttp.readyState == 4) &&( xmlhttp.status == 200)) 
	{ 
		var myXml = xmlhttp.responseXML; 
		var XMLDoc = null; 
		var xmlobject = null; 
		if (window.ActiveXObject) 
		{ 
			XMLDoc = myXml.childNodes[1].firstChild.nodeValue; 
			var xmlobject = new ActiveXObject("Microsoft.XMLDOM"); 
			xmlobject.async="false"; 
			xmlobject.loadXML(XMLDoc); 
		} 
		else 
		{ 
			XMLDoc = myXml.childNodes[0].firstChild.nodeValue; 
			var parser = new DOMParser(); 
			var xmlobject = parser.parseFromString(XMLDoc, "text/xml"); 
		} 
		var table = document.getElementById("table1"); 
		var row = table.insertRow(table.rows.length); 
		var cell1 = row.insertCell(row.cells.length); 
		cell1.appendChild(getText("Name",xmlobject)); 
		var cell2 = row.insertCell(row.cells.length); 
		cell2.appendChild(getText("Last",xmlobject)); 
		var cell3 = row.insertCell(row.cells.length); 
		cell3.appendChild(getText("Date",xmlobject)); 
		table.setAttribute("border", "2"); 
	} 
} 
function getText(tagName, xmlobject) 
{ 
	var tags = xmlobject.getElementsByTagName(tagName); 
	var txtNode = null; 
	if (window.ActiveXObject) 
		txtNode = document.createTextNode(tags[0].firstChild.text); 
	else 
		txtNode = document.createTextNode(tags[0].firstChild.textContent); 
	return txtNode; 
} 
