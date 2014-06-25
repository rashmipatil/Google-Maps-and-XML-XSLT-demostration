<?php

//Get the suburb from javascript
$strSuburb = $_POST['suburb'];

//Set the file path
$xmlFile = "../../data/apartment.xml";

//Check if the file exists
if(file_exists($xmlFile))
{
	//call function to get the addresses
	fnLoadApartments($xmlFile,$strSuburb);
}
else
{
	ECHO "0";
}

function fnLoadApartments($xmlFile,$strSuburb)
{

	$doc = DOMDocument::load($xmlFile);
 	$properties = $doc->getElementsByTagName("property");
	
	//Loop all the properties of the xml
	foreach($properties as $property)
	{
		$Address = $property->getElementsByTagName("address")->item(0)->nodeValue;
		//$Address = $Address->item(0)->nodeValue;
		
		//Check if the address has the suburb 
		if(stripos($Address,$strSuburb) > 0 )
		{
			//Get the price, No of bedrooms of the property
			$price = $property->getElementsByTagName("Price");
			$price = $price->item(0)->nodeValue;

			$Bed = $property->getElementsByTagName("NumberOfBedrooms");
			$Bed = $Bed ->item(0)->nodeValue;

			//Store the price in an array
			$arrPrice[] = $price;
			$arrAddress[] = $Address."~".$Bed."~".$price;

		}		
	}
	
	if(isset($arrPrice))
	{
		//Sort the array based on the price
		array_multisort($arrPrice, $arrAddress);
		$addresses = "";
		if(count($arrPrice) > 2)
		{
			//Get the first 3 addresses	
			for($i=0;$i<=2;$i++)
			{
				if($addresses == "")
				{
					$addresses = $arrAddress[$i];
				}
				else
				{
					$addresses = $addresses."^".$arrAddress[$i];
				}
			}
		}
		else
		{
			//Get the first 3 addresses	
			for($i=0;$i<count($arrPrice);$i++)
			{
				if($addresses == "")
				{
					$addresses = $arrAddress[$i];
				}
				else
				{
					$addresses = $addresses."^".$arrAddress[$i];
				}
			}
		}
		echo $addresses;	
	}
	else
	{
		echo "";
	}
}