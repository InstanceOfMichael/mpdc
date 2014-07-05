//general functions

function mapIndex (x,y){
	return ('t'+x.toString()+'x'+y.toString()).replace(/-/g, "n");
}
var average = function(a){
	var sum = 0;
	for(var i = 0; i < a.length; i++){
		sum += parseFloat(a[i]);
	}
	return sum/a.length;
}