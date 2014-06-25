<?php

 	$xmlDoc = new DOMDocument();
   	$xmlDoc->load("rental.xml");   

	$xslDoc = new DOMDocument();
   	$xslDoc->load("apartment.xsl");

  

   $proc = new XSLTProcessor();
   $proc->importStylesheet($xslDoc);
   
   echo $proc->transformToXML($xmlDoc);

	$hehe = $proc->transformToXML($xmlDoc);
	$xmlFileloc = "../../data/apartment.xml";
	$xmlDoc1 = new DOMDocument();
       $proc = $xmlDoc1->saveXML();
	$xmlDoc1->save($xmlFileloc);
	file_put_contents($xmlFileloc, $hehe);
	  
 
?>