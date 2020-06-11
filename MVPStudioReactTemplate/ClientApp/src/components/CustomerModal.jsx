import React, { Component } from "react";
import { Form, Modal, Button, Message, Select } from "semantic-ui-react";
import Api from "../services/Api";

class CustomerModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			address: "",
			price: "",
			dateSold: "",
			customerName: "",
			productName: "",
			storeName: "",
		};

		this.API = new Api();
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
		// If edit, set the values
		switch (this.props.action) {
			case "EDIT":
				// console.log("Setting modal values: ", this.props.action);
				this.setState({
					name: this.props.param.name,
					address: this.props.param.address,
					price: this.props.param.price,
					dateSold: this.props.param.date,
				});
				break;
			default:
				this.setState({ name: "", address: "", price: "", dateSold: "" });
				break;
		}
	}

	priceValidation(e) {
		console.log("Pattern Mismatch: ", e.target.validity.patternMismatch);
		if (e.target.validity.patternMismatch) {
			console.log(
				"Validation Error: ",
				e.target.value,
				" must match ",
				e.target.pattern
			);
		}
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
										this.setState({ dateSold: e.target.value });
									}}
								/>
							</Form.Field>
							<Form.Field required>
								<label>Name</label>
								<Form.Input
									onChange={(e) =>
										this.setState({ customerName: e.target.value })
									}
									placeholder="Customer Name"
									value={this.state.customerName}
									required
								/>
							</Form.Field>
							<Form.Field required>
								<label>Product</label>
								<Form.Input
									onChange={(e) =>
										this.setState({ productName: e.target.value })
									}
									placeholder="Product Name"
									value={this.state.productName}
									required
								/>
							</Form.Field>
							<Form.Field required>
								<label>Store</label>
								<Form.Input
									onChange={(e) =>
										this.setState({ storeName: e.target.value })
									}
									placeholder="Store Name"
									value={this.state.storeName}
									required
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
					FormItems = <div>Are you sure?</div>;
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
					FormItems = <div>Are you sure?</div>;
				}
				break;
		}

		return (
			<Modal size={"mini"} open={this.props.open}>
				<Modal.Header>
					{this.props.type} {this.props.action}
				</Modal.Header>
				<Modal.Content>
					<Form
						id="form"
						onSubmit={(e) => {
							e.preventDefault();
							console.log("Form Submit", e);
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
					<Button negative onClick={() => this.props.closeMethod()}>
						Cancel
					</Button>
					<Button positive type="submit" form="form">
						Submit
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default CustomerModal;
