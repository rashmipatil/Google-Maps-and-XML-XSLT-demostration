<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"> 

<xsl:output method="xml" indent="yes" version="1.0"  standalone="yes" /> 

<xsl:template match="/rentalProperties"> 
<rentalproperty>
<xsl:for-each select="/rentalProperties/property[@available = 'yes'] [type ='Unit' or type = 'Apartment'] [numberOfBedrooms &gt; 1]">

<xsl:element name="property"> <xsl:attribute name="contact" > <xsl:value-of select="@contact"/> </xsl:attribute> 

<xsl:element name="Type"> <xsl:value-of select="type"/> </xsl:element>

<xsl:element name="Price"> <xsl:value-of select="price"/> </xsl:element>

<xsl:element name="address"> <xsl:value-of select="address/streetNo"/> <xsl:value-of select="address/street"/>,<xsl:value-of select="address/suburb"/>,<xsl:value-of select="address/state"/>,<xsl:value-of select="address/zipcode"/>, Australia </xsl:element>

<xsl:element name="NumberOfBedrooms"> <xsl:value-of select="numberOfBedrooms"/> </xsl:element>

<xsl:element name="numberOfBathrooms"> <xsl:value-of select="numberOfBathrooms"/> </xsl:element>

<xsl:element name="garage"> <xsl:value-of select="garage"/> </xsl:element>

<xsl:element name="description"> <xsl:value-of select="description"/> </xsl:element>
</xsl:element>
</xsl:for-each>
</rentalproperty>
</xsl:template> 

</xsl:stylesheet> 
