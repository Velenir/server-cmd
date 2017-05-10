export function sendInput(formData) {
	console.log("sending", [...formData.values()]);
	return fetch("/cmd", {
		method: "POST",
		body: formData
	}).then(res => {
		if(res.ok) {
			return res.json();
		}
		
		return Promise.reject({
			status: res.status,
			statusText: res.statusText
		});
	});
}