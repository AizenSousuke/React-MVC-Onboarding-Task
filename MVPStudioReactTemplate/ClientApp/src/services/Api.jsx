

export class Api {
    API_URL = "https://localhost:5001/api/";
    
    getAPIURL() {
        return this.API_URL;
    }

    GET(obj) {
        switch (obj) {
            case "CUSTOMERS":
                break;
        }
    }
}

export default Api;
