function removeArrayElementByValue(array, value) {
	var index = array.indexOf(value);
	if (index > -1) {
		array.splice(index, 1);
	}
}