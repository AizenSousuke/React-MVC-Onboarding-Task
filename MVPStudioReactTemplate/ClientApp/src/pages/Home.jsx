import React, { Component } from "react";
import { Api } from "../services/Api";
import { Grid, Menu } from "semantic-ui-react";
import { Route, Link } from 'react-router-dom';
import { Page } from './Page';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.API = new Api();
		this.state = {
            activeMenu: window.location.pathname.slice(1),
			customers: [],
        };

		// this.Init();
	}

	Init() {

		// this.API.GET("CUSTOMERS").then((data) =>
		// 	this.setState({ customers: data })
		// );

		// Sample API call
		// this.API.GET("CUSTOMERS").then(c => console.log(c));
		// this.API.POST("CUSTOMERS","", {"name": "Timmy", "address": "Japan"}).then(c => console.log(c));
		// this.API.PUT("CUSTOMERS", "1", {"name": "Peter", "address": "France"}).then(c => console.log(c));
		// this.API.GET("CUSTOMERS", "1").then(c => console.log(c));
		// this.API.DELETE("CUSTOMERS", "9").then(c => console.log(c));
    }
    
    handleMenuClick = (e, { name }) => this.setState({ activeMenu: name });

	render() {
		return (
            <Grid container>
                <Grid.Column>
                    <Grid.Row>
                        <Menu fluid compact>
                            <Menu.Item as={"h3"} header>React</Menu.Item>
                            <Menu.Item
                                as={ Link }
                                to='/'
                                name="sales"
                                active={ this.state.activeMenu === 'sales'}
                                onClick={this.handleMenuClick}
                            >
                                Sales
                            </Menu.Item>
                            <Menu.Item
                                as={ Link }
                                to='/stores'
                                name="stores"
                                active={ this.state.activeMenu === 'stores'}
                                onClick={this.handleMenuClick}
                            >
                                Stores
                            </Menu.Item>
                            <Menu.Item
                                as={ Link }
                                to='/customers'
                                name="customers"
                                active={ this.state.activeMenu === 'customers'}
                                onClick={this.handleMenuClick}
                            >
                                Customers
                            </Menu.Item>
                            <Menu.Item
                                as={ Link }
                                to='/products'
                                name="products"
                                active={ this.state.activeMenu === 'products'}
                                onClick={this.handleMenuClick}
                            >
                                Products
                            </Menu.Item>
                        </Menu>
                    </Grid.Row>
                    <Grid.Row>
                        <Route exact path="/" render={() => {return <Page title="Sales" />}} />
                        <Route exact path="/sales" render={() => {return <Page title="Sales" />}} />
                        <Route exact path="/stores" render={() => {return <Page title="Stores" />}} />
                        <Route exact path="/customers" render={() => {return <Page title="Customers" />}} />
                        <Route exact path="/products" render={() => {return <Page title="Products" />}} />
                    </Grid.Row>
                    <Grid.Row>
                        © 2020 - Nik
                    </Grid.Row>
                </Grid.Column>
            </Grid>
		);
	}
}

export default Home;
