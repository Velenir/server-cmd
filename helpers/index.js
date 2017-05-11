export function sendInput(formData) {
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

export function requestUpdate() {
	return fetch("/cmd").then(res => {
		if(res.ok) {
			return res.json();
		}
		
		return Promise.reject({
			status: res.status,
			statusText: res.statusText
		});
	});
}