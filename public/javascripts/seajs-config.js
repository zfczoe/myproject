seajs.config({
	// Enable plugins
	plugins : ['shim'],
	
	// Configure alias
	alias : {
		'jquery' : {
			src : 'jquery-1.10.2.min.js',
			exports : 'jQuery'
		}
	}
});
