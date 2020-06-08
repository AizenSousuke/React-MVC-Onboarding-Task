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
        fetch(this.API.API_URL + "customers")
            .then(res => {return res.json()})
            .then(data => {this.setState({customers: data})});
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