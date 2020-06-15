import React, { Component } from "react";
import { Form, Modal, Button, Message, Dropdown, Icon, Grid } from "semantic-ui-react";
import Api from "../services/Api";

class ModalForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			address: "",
			price: "",
			dateSold: "",
			customer: {},
			customerName: "",
			customerList: [],
			product: {},
			productName: "",
			productList: [],
			store: {},
			storeName: "",
			storeList: [],
			formValidForSubmit: null,
		};

		this.API = new Api();
	}

	componentWillMount() {
		this.updateObjectListsInState();
	}

	updateObjectListsInState() {
		this.API.GET("CUSTOMERS").then((data) => {
			// Convert array to dict
			var dict = [];
			data.forEach((c) => {
				dict.push({
					key: c.id,
					value: c.name + ", " + c.address,
					text: c.name + ", " + c.address,
				});
			});

			this.setState({ customerList: dict });
			// console.log("Customer List: ", dict);
		});
		this.API.GET("PRODUCTS").then((data) => {
			// Convert array to dict
			var dict = [];
			data.forEach((c) => {
				dict.push({
					key: c.id,
					value: c.name + ", " + c.price,
					text: c.name + ", " + c.price,
				});
			});

			this.setState({ productList: dict });
			// console.log("Product List: ", dict);
		});
		this.API.GET("STORES").then((data) => {
			// Convert array to dict
			var dict = [];
			data.forEach((c) => {
				dict.push({
					key: c.id,
					value: c.name + ", " + c.address,
					text: c.name + ", " + c.address,
				});
			});

			this.setState({ storeList: dict });
			// console.log("Store List: ", dict);
		});
	}

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	// console.log("PROPS: ", prevState, nextProps);
	// 	if (prevState !== nextProps) {
	// 		// console.log("Changing props");
	// 		// If edit, set the values
	// 		switch (nextProps.action) {
	// 			case "EDIT":
	// 				console.log("Setting modal values: ", nextProps.action);
	// 				return {
	// 					name: nextProps.param.name,
	// 					address: nextProps.param.address,
	// 				};
	// 		}
	// 	}
	// 	return null;
	// }

	componentWillReceiveProps() {
		// console.log("Setting modal values: ", this.props);
		// If edit, set the values
		switch (this.props.action) {
			case "EDIT":
				this.setState({
					name: this.props.param.name,
					address: this.props.param.address,
					price: this.props.param.price,
					dateSold: this.props.param.dateSold,
					customerName:
						this.props.param.customer == null
							? ""
							: this.props.param.customer.name +
							  ", " +
							  this.props.param.customer.address,
					productName:
						this.props.param.product == null
							? ""
							: this.props.param.product.name +
							  ", " +
							  this.props.param.product.price,
					storeName:
						this.props.param.store == null
							? ""
							: this.props.param.store.name +
							  ", " +
							  this.props.param.store.address,
				});
				break;
			default:
				this.setState({
					name: "",
					address: "",
					price: "",
					dateSold: this.props.param.dateSold,
					customerName: "",
					productName: "",
					storeName: "",
				});
				break;
		}
	}

	priceValidation(e) {
		// console.log("Pattern Mismatch: ", e.target.validity.patternMismatch);
		if (e.target.validity.patternMismatch) {
			console.log(
				"Validation Error: ",
				e.target.value,
				" must match ",
				e.target.pattern
			);
		}
	}

	async convertStringToObjects(type = "", stringToConvert) {
		// console.log("Converting ", stringToConvert);
		var obj;
		// Get object based on the list of objects
		switch (type) {
			case "PRODUCTS":
				obj = await this.API.GET(type).then((data) => {
					// console.log("Product string to convert: ", stringToConvert);
					var name = stringToConvert.split(", ")[0];
					var price = parseFloat(
						stringToConvert.replace(name + ", ", "")
					);
					// console.log(
					// 	"Finding [",
					// 	name,
					// 	"][",
					// 	price,
					// 	"] from ",
					// 	data
					// );
					var foundObject = data.find(
						(c) => c.name === name && c.price === price
					);
					// console.log("Object to transfer to Page: ", foundObject);
					// Can also set the state here

					return foundObject;
				});
				return obj;
			default:
				obj = await this.API.GET(type).then((data) => {
					var name = stringToConvert.split(", ")[0];
					var address = stringToConvert.replace(name + ", ", "");
					// console.log(
					// 	"Finding [",
					// 	name,
					// 	"][",
					// 	address,
					// 	"] from ",
					// 	data
					// );
					var foundObject = data.find(
						(c) => c.name === name && c.address === address
					);
					// console.log("Object to transfer to Page: ", foundObject);
					// Can also set the state here

					return foundObject;
				});
				return obj;
		}
	}

	changeNameToObjectInState() {
		// console.log("Setting Objects");
		this.convertStringToObjects("CUSTOMERS", this.state.customerName).then(
			(data) => {
				this.setState({ customer: data });
			}
		);

		this.convertStringToObjects("PRODUCTS", this.state.productName).then(
			(data) => {
				this.setState({ product: data });
			}
		);

		this.convertStringToObjects("STORES", this.state.storeName).then(
			(data) => {
				this.setState({ store: data });
			}
		);
	}

	render() {
		var FormItems;
		switch (this.props.type) {
			case "Sales":
				if (this.props.action !== "DELETE") {
					FormItems = (
						<div>
							<Form.Field required>
								<label>Date Sold</label>
								<Form.Input
									type="date"
									onChange={(e) => {
										console.log(e.target.value);
										this.setState(
											{
												dateSold: e.target.value,
											},
											() =>
												this.changeNameToObjectInState()
										);
									}}
									value={this.state.dateSold}
								/>
							</Form.Field>
							<Form.Field required>
								<label>Customer</label>
								<Dropdown
									fluid
									selection
									search
									options={this.state.customerList}
									placeholder="Customer Name"
									onChange={(e, { value }) =>
										this.setState(
											{
												customerName: value,
											},
											() =>
												this.changeNameToObjectInState()
										)
									}
									value={this.state.customerName}
								/>
							</Form.Field>
							<Form.Field required>
								<label>Product</label>
								<Dropdown
									fluid
									selection
									search
									options={this.state.productList}
									placeholder="Product Name"
									onChange={(e, { value }) =>
										this.setState(
											{
												productName: value,
											},
											() =>
												this.changeNameToObjectInState()
										)
									}
									value={this.state.productName}
								/>
							</Form.Field>
							<Form.Field required>
								<label>Store</label>
								<Dropdown
									fluid
									selection
									search
									options={this.state.storeList}
									placeholder="Store Name"
									onChange={(e, { value }) =>
										this.setState(
											{
												storeName: value,
											},
											() =>
												this.changeNameToObjectInState()
										)
									}
									value={this.state.storeName}
								/>
							</Form.Field>
						</div>
					);
				} else {
					FormItems = <div>Are you sure?</div>;
				}
				break;
			case "Products":
				if (this.props.action !== "DELETE") {
					FormItems = (
						<div>
							<Form.Field required>
								<label>Name</label>
								<Form.Input
									onChange={(e) =>
										this.setState({ name: e.target.value })
									}
									placeholder="Name"
									value={this.state.name}
									required
								/>
							</Form.Field>
							<Form.Field required>
								<label>Price</label>
								<Form.Input
									onChange={(e) => {
										this.setState({
											price: e.target.value,
										});
										this.priceValidation(e);
									}}
									placeholder="0.00"
									value={this.state.price}
									pattern="([0-9]{1,5})([.]([0-9]{2}))?"
									required
								/>
								<Message content="Please ensure that the price is in the format of 12345.12. Decimals are optional. Max of 99999.99." />
							</Form.Field>
						</div>
					);
				} else {
					FormItems = <div>Are you sure? This will delete <b>ALL</b> related data in Sales Page.</div>;
				}
				break;
			default:
				if (this.props.action !== "DELETE") {
					FormItems = (
						<div>
							<Form.Field required>
								<label>Name</label>
								<Form.Input
									onChange={(e) =>
										this.setState({ name: e.target.value })
									}
									placeholder="Name"
									value={this.state.name}
									required
								/>
							</Form.Field>
							<Form.Field required>
								<label>Address</label>
								<Form.Input
									onChange={(e) =>
										this.setState({
											address: e.target.value,
										})
									}
									placeholder="Address"
									value={this.state.address}
									required
								/>
							</Form.Field>
						</div>
					);
				} else {
					FormItems = <div>Are you sure? This will delete <b>ALL</b> related data in Sales Page.</div>;
				}
				break;
		}

		return (
			<Modal size={"mini"} open={this.props.open}>
				<Modal.Header>
					{this.props.action.charAt(0).toUpperCase() + this.props.action.slice(1).toLowerCase()} {this.props.type}
				</Modal.Header>
				<Modal.Content>
					<Form
						id="form"
						onSubmit={(e) => {
							e.preventDefault();
							// console.log("Form Submit", e.target);
							switch (this.props.action) {
								case "DELETE":
									console.log("Delete", this.props.param.id);
									this.props.closeMethod(
										true,
										this.props.type,
										this.props.action,
										{
											id: this.props.param.id,
											name: this.state.name,
											address: this.state.address,
											price: this.state.price,
											dateSold: this.state.dateSold,
											customer: this.state.customer,
											product: this.state.product,
											store: this.state.store,
										}
									);
									break;
								case "EDIT":
									console.log("Edit", this.props.param.id);
									this.props.closeMethod(
										true,
										this.props.type,
										this.props.action,
										{
											id: this.props.param.id,
											name: this.state.name,
											address: this.state.address,
											price: this.state.price,
											dateSold: this.state.dateSold,
											customer: this.state.customer,
											product: this.state.product,
											store: this.state.store,
										}
									);
									break;
								default:
									this.props.closeMethod(
										true,
										this.props.type,
										this.props.action,
										{
											name: this.state.name,
											address: this.state.address,
											price: this.state.price,
											dateSold: this.state.dateSold,
											customer: this.state.customer,
											product: this.state.product,
											store: this.state.store,
										}
									);
									break;
							}
						}}
					>
						{FormItems}
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Grid columns={"equal"}>
						<Grid.Column>
							<Button icon fluid labelPosition="left" negative onClick={() => this.props.closeMethod()}>
								<Icon name="cancel" />
								Cancel
							</Button>
						</Grid.Column>
						<Grid.Column>
							<Button icon fluid labelPosition="right" positive type="submit" form="form">
								<Icon name="arrow right" />
								Submit
							</Button>
						</Grid.Column>
					</Grid>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default ModalForm;
