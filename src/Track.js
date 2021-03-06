function Track(fb_ref, name){
	this._fb_ref = fb_ref;
  	this._key = fb_ref.ref('Track').push({'name': name, 'midi_ids': [0]}).key; // added name to track, do unit test and update where we instanstiate
}

Track.prototype.getKey = function () {
  return this._key
};

Track.prototype.getName = function () {
  return getValues_t(this._fb_ref, this._key, 'name')
};

Track.prototype.add_midi = function (midi_id) {
	var old_midi_ids = getValues_t(this._fb_ref, this._key, 'midi_ids');
	
	old_midi_ids.push(midi_id)

  	this._fb_ref.ref('Track').child(this._key+'/midi_ids').set(old_midi_ids);
};

Track.prototype.midi_ids = function () {
	return getValues_t(this._fb_ref, this._key, 'midi_ids');
};

function getValues_t(ref, key, child_key){
	data = []
	ref.ref('Track').on('value', 
		function(snapshot) {
			var temp_values = snapshot.val()
			data = temp_values[key][child_key]
	});

	return data;
}