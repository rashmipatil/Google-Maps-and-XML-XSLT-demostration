<?php
// load XML file into a DOM document
$xmlDoc = new DOMDocument('1.0');
$xmlDoc->formatOutput = true;
$xmlDoc->load("rental.xml");

// load XSL file into a DOM document
$xslDoc = new DomDocument('1.0');
$xslDoc->load("table.xsl");

// create a new XSLT processor object
$proc = new XSLTProcessor;

// load the XSL DOM object into the XSLT processor
$proc->importStyleSheet($xslDoc);

// transform the XML document using the configured XSLT processor
$strXml= $proc->transformToXML($xmlDoc);

// echo the transformed HTML back to the client
echo ($strXml);

?>