import React, { Component } from "react";
import { Form, Modal, Button } from "semantic-ui-react";

class CustomerModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			address: "",
		};
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
				});
				break;
			default:
				this.setState({ name: "", address: "" });
				break;
		}
	}

	render() {
		var FormItems;
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
								this.setState({ address: e.target.value })
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
							console.log("Form Submit");
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
										}
									);
									break;
							}
						}}
					>
						{FormItems}
						{/* <Form.Field required>
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
									this.setState({ address: e.target.value })
								}
								placeholder="Address"
								value={this.state.address}
								required
							/>
						</Form.Field> */}
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
