import React, { Component } from 'react';
import { Api } from '../services/Api';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.API = new Api();
        this.state = {
            customers: []
        };
    }

    componentWillMount() {
        this.Init();
    }

    Init() {
        // fetch(this.API.API_URL + "customers")
        //     .then(res => {return res.json()})
        //     .then(data => {this.setState({customers: data})});

        // Sample API call
        // this.API.GET("CUSTOMERS").then(c => console.log(c));
        // this.API.POST("CUSTOMERS","", {"name": "Timmy", "address": "Japan"}).then(c => console.log(c));
        // this.API.PUT("CUSTOMERS", "1", {"name": "Peter", "address": "France"}).then(c => console.log(c));
        // this.API.GET("CUSTOMERS", "1").then(c => console.log(c));
        // this.API.DELETE("CUSTOMERS", "9").then(c => console.log(c));

    }

    render() {
        return (
            <div>
                Customers GET: {this.state.customers.map(c => 
                    <li key={c.id}>{c.name.toString()}</li>
                )}
            </div>
        )
    }
}

export default Home;