// JavaScript Document
var map = null;
var geocoder = null;

var xmlhttp = null;
if (window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function load() 
{
	if (GBrowserIsCompatible()) 
	{
		map = new GMap2(document.getElementById("map"));
		map.addControl(new GSmallMapControl());
		map.addControl(new GMapTypeControl());
		map.addControl(new GScaleControl());		
		placeMarkers();
   }
}

function getData()
{

	
	var suburb = document.getElementById("suburb").value;
	var bodyofrequest = "suburb=" + encodeURIComponent(suburb);

	//xmlhttp.open("POST", "Address.php", true); //Async
	xmlhttp.open("POST", "Address.php", false); //Sync
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function()
	{	
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    		{
        		var serverText = xmlhttp.responseText;
			if(serverText == "")
			{
				alert("No properties found for " + suburb  + " suburb");
			}
			else
			{
				DisplayMaps(serverText);
			}
		}
	}
	xmlhttp.send(bodyofrequest);
	
}

function DisplayMaps(serverText)
{
	var arrAddresses = serverText.split("^");
	var i = 0;
	for(i=0 ; i < arrAddresses.length ; i++)
	{
		var propDetails = arrAddresses[i];
		
		var arrPropDetails = propDetails.split("~");		

		//propDetails1 = propDetails1.replace("`","<br/>");

		var address = arrPropDetails[0];
 		var bed = arrPropDetails[1];
		var price = arrPropDetails[2];
		
		var detailedAddress = address+"<br/> Bedrooms: "+bed+"<br/>Price per week: $"+price;
		addMarker_Mod(address,bed,price);
	}
}


function addMarker_Mod(address,bed,price){	
	geocoder = new GClientGeocoder();
	geocoder.getLatLng(address, function(point) {
		if (!point) {
			alert(address + " not found");
		} 
		else{			
			map.setCenter(point, 12);
			map.addOverlay(createMarker(point, address,bed,price));
			saveMarker(point, address);

		}
	});
	
}


function addMarker(){	
	var address = document.getElementById("address").value + document.getElementById("suburb").value;
	geocoder = new GClientGeocoder();
	geocoder.getLatLng(address, function(point) {
		if (!point) {
			alert(address + " not found");
		} 
		else{			
			map.setCenter(point, 12);
			map.addOverlay(createMarker(point, address));
			saveMarker(point, address);

		}
	});
}


function createMarker(point,address,bed,price) {  
	var detailedAddress = address+"<br/> Bedrooms: "+bed+"<br/>Price per week: $"+price;
	var marker = new GMarker(point); 
	GEvent.addListener(marker, "click", function() {
		marker.openInfoWindowHtml(detailedAddress);  });  
	return marker;
}

function saveMarker(point, address){
	var lat = point.y;
	var lng = point.x;
	var url = "saveMarkers.php?lat=" + lat + "&lng=" + lng + "&address=" + address;

	if (xmlhttp.overrideMimeType) {
		xmlhttp.overrideMimeType("text/xml");
	}

	xmlhttp.open("GET", url, true); 
	xmlhttp.onreadystatechange = getConfirm;  //no response required 
	//xmlhttp.setRequestHeader("Content-Type", "text/xml" );
	xmlhttp.send(null); 
	
}

function getConfirm(){
	if ((xmlhttp.readyState == 4) &&(xmlhttp.status == 200))
    {
        var markerAddConfirm = xmlhttp.responseText;
		var spantag = document.getElementById("markerConfirm");
        spantag.innerHTML = markerAddConfirm;
    }
}
function placeMarkers()
{
	GDownloadUrl("../../htdocs/Assignment3/apartment.xml", function(data, responseCode) {
		if(responseCode == 200){
			var xml = GXml.parse(data);  //warning: will get from cache if not cleared
			var markers = xml.documentElement.getElementsByTagName("suburb");
			for (var i = 0; i < markers.length; i++) {
				var point = new GLatLng(parseFloat(markers[i].getAttribute("lat")),
										parseFloat(markers[i].getAttribute("lng")));
				map.setCenter(point, 12);   //fails if this not used
				map.addOverlay(createMarker(point, markers[i].getAttribute("address")));
			}
		}
		else if(responseCode == -1) {
		    alert("Data request timed out. Please try later.");
  		}
		else { 
    		geocoder = new GClientGeocoder();
			geocoder.getLatLng("Melbourne", function(point){map.setCenter(point, 13)}); 
  		}

	});
}



