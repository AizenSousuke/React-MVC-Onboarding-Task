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

    checkFormAndCloseModal() {
        this.props.closeMethod();
    }

	render() {
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
								case "EDIT":
									console.log("Edit", this.props.id);
									this.props.closeMethod(
										"modalEditOpen",
										true,
										true,
										this.props.action,
										this.props.id
									);
									break;
								default:
									// this.props.closeMethod(
									// 	"modalCreateOpen",
									// 	true,
									// 	true
                                    // );
                                    this.props.closeMethod();
									break;
							}
						}}
					>
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
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button
						negative
						onClick={() => this.checkFormAndCloseModal()}
					>
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
