<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes" version="4.0"/>

<xsl:template match="/">

<table border="1">

<tr>
<th>Suburb</th>
<th>Street_Address</th>
<th>Price</th>
<th>Type</th>
<th>Bedrooms</th>
<th>Bathrooms</th>
<th>Garage</th>
<th>Contact</th>
</tr>

<xsl:for-each select="/rentalProperties/property[price &lt; 401 ]">
<tr>
<td><xsl:value-of select="address/suburb"/></td>
<td><xsl:value-of select="concat(address/streetNo , address/street)"/></td>
<td><xsl:value-of select="price" /></td>
<td><xsl:value-of select="type" /></td> 
<td><xsl:value-of select="numberOfBedrooms" /> </td>
<td><xsl:value-of select="numberOfBathrooms" /> </td>
<td><xsl:value-of select="garage" /> </td>
<td><xsl:value-of select="@contact" /> </td>	
</tr>
</xsl:for-each>
</table>
Total number of properties: <xsl:value-of select="count(/rentalProperties/property)" />  <br/>
Sum : <xsl:value-of select="sum(/rentalProperties/property/price)" /> <br/>
Average Price : <xsl:value-of select="(sum(/rentalProperties/property/price)) div (count(/rentalProperties/property[price &lt; 401]))"/> <br/>
Total number of properties with cheap rental price :  <xsl:value-of select="count(/rentalProperties/property[price &lt; 401])" />  <br/>
</xsl:template>
</xsl:stylesheet>
