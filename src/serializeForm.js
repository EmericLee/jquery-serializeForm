/*
 * serializeForm
 * Make an object out of form elements. 
 * Fixed error parse the select el with name as array(somename[]) and multiple values.
 * Forked by emeric.lee
 * https://github.com/EmericLee/jquery-serializeForm
 *
 * Copyright (c) 2012 Dan Heberden  
 * Licensed under the MIT, GPL licenses.
 */
(function( $ ){

	$.fn.serializeForm = function() {
		var _ = {};
		$.map(this.serializeArray(), function(n) {
		  const keys = n.name.match(/[a-zA-Z0-9_]+|(?=\[\])/g);
		  if (keys.length > 1) {
			let tmp = _;
			pop = keys.pop();
			for (let i = 0; i < keys.length, j = keys[i]; i++) {
			  tmp[j] = (!tmp[j] ? (pop == '') ? [] : {} : tmp[j]), tmp = tmp[j];
			}
			if (pop == '') tmp = (!Array.isArray(tmp) ? [] : tmp), tmp.push(n.value);
			else tmp[pop] = n.value;
		  } else _[keys.pop()] = n.value;
		});
		return _;
	}

  }( jQuery ));
