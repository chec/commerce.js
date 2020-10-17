<!DOCTYPE html>
<html>
<body>

<h2>JavaScript Scope</h2>

<p>Outside myFunction() carName is undefined.</p>

<p id="demo1"></p>

<p id="demo2"></p>

<script>
myFunction();

function myFunction() {
  var carName = "Volvo";
  document.getElementById("demo1").innerHTML = typeof carName + " " + carName;
}
document.getElementById("demo2").innerHTML = typeof carName;
</script>

</body>
</html>
