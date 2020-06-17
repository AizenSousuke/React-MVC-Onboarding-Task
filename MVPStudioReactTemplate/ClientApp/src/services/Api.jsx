export class Api {
	// API_URL = "https://localhost:5001/api/";
	API_URL = "https://reactmvconboardingtask.azurewebsites.net/api/";
	HEADERS = {
		"Accept": "application/json",
		"Content-Type": "application/json",
	};

	constructor() {
		if (window.location.host !== "reactmvconboardingtask.azurewebsites.net") {
			// console.log(window.location.host);
			this.API_URL = "https://localhost:5001/api/";
		}
	}

	APIURL() {
		return this.API_URL;
	}

	GET(obj, param = "") {
		let data;
		data = fetch(this.API_URL + obj + (param !== "" ? "/" + param : ""), {
			method: "GET",
			headers: this.HEADERS,
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return data;
			});

		return data;
	}

	POST(obj, objbody, param = "") {
		let data;
		data = fetch(this.API_URL + obj + (param !== "" ? "/" + param : ""), {
			method: "POST",
			headers: this.HEADERS,
			body: JSON.stringify(objbody),
		})
			.then((res) => {
				return res;
			})
			.then((data) => {
				return data;
			});

		return data;
	}

	PUT(obj, param, objbody) {
		let data;
		data = fetch(this.API_URL + obj + (param !== "" ? "/" + param : ""), {
			method: "PUT",
			headers: this.HEADERS,
			body: JSON.stringify(objbody),
		})
			.then((res) => {
				return res;
			})
			.then((data) => {
				return data;
			});

		return data;
	}

	DELETE(obj, param) {
		let data;
		data = fetch(this.API_URL + obj + (param !== "" ? "/" + param : ""), {
			method: "DELETE",
			headers: this.HEADERS,
		})
			.then((res) => {
				return res;
			})
			.then((data) => {
				return data;
			});

		return data;
	}
}

export default Api;
