function buildParam(prefix, obj, add) {
	if (Array.isArray(obj)) {
		for (var i = 0, l = obj.length; i < l; ++i) {
			add(prefix + '[]', obj[i]);
		}
	} else if ( obj && typeof obj === "object" ) {
		for (var name in obj) {
			buildParam(prefix + '[' + name + ']', obj[name], add);
		}
	} else {
		add(prefix, obj);
	}
}

const parameterize = (object) => {
	var pairs = []
  var add = function (key, value) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
	};

	for (var name in object) {
		buildParam(name, object[name], add);
	}
	return pairs.join('&');
};

export default parameterize
