var xHRObject = false;

if (window.XMLHttpRequest)
{
    xHRObject = new XMLHttpRequest();
}
 else if (window.ActiveXObject)
{
    xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function change()
{
    xHRObject.open("GET", "transform2.php", true);
    xHRObject.onreadystatechange = getData;
    xHRObject.send(null);
}

function getData()
{
    if ((xHRObject.readyState == 4) &&(xHRObject.status == 200))
    {
      
        var span = document.getElementById("example");
        span.innerHTML= xHRObject.responseText;
        
        
    }
}