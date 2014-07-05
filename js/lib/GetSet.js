//http://davidwalsh.name/get-set

// Turns "thisPropertyName" into "ThisPropertyName"
function getFunctionName(key, getSet) {
	return "_" + getSet + key.charAt(0).toUpperCase() + key.slice(1) + "Attr";
}

// Implement the getter / setter
GetSet = new Class({
	// A custom getter that looks for _get
	get: function(key) {
		var fn = this[getFunctionName(key, "get")];
		return (fn && fn.call(this, key)) || this[key];
	},
	set: function(key, value) {
		var fn = this[getFunctionName(key, "set")];
		if(fn) {
			fn.call(this, value);
		}
		else {
			this[key] = value;
		}
		// Returning "this" to allow chaining
		return this;
	},
	initializeDefaults: function (){
		// do nothing
	},
	initialize: function (keys){
		this.initializeDefaults(keys);
		for (var k in keys){
			if (keys.hasOwnProperty(k)) {
				this.set(k,keys[k]);
				 //alert("Key is " + k + ", value is" + target[k]);
			}
		}
	},
});
