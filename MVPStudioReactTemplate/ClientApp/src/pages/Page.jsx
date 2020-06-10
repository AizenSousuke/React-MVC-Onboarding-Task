import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import Api from "../services/Api";
import CustomerModal from "../components/CustomerModal";

export class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "",
			action: "",
			param: "",
			list: [],
			modalCreateOpen: false,
			modalEditOpen: false,
			modalDeleteOpen: false,
			modalOpen: false,
		};

		this.API = new Api();

		// this.FormRef = React.createRef();
		this.ModalRef = React.createRef();
	}

	componentDidMount() {
		this.Init();
	}

	Init() {
		this.setState({ type: this.props.title });
		this.API.GET(this.props.title).then((data) =>
			this.setState({ list: data })
		);
	}

	// handleModalClose(
	// 	modal,
	// 	trueOrFalse,
	// 	accept = false,
	// 	doWhat = null,
	// 	id = null
	// ) {
	// 	if (accept) {
	// 		// On close and accepted, do something here
	// 		trueOrFalse = !trueOrFalse;
	// 		// this.setState({ modalOpen: trueOrFalse });
	// 		// Set state based on the prop passed
	// 		this.setState({ [modal]: trueOrFalse });
	// 		console.log("Accept");
	// 		switch (doWhat) {
	// 			case "EDIT":
	// 				this.API.PUT("CUSTOMERS", id, {
	// 					name: this.FormRef.current.state.name,
	// 					address: this.FormRef.current.state.address,
	// 				}).then((res) => {
	// 					console.log("Edited ", res);
	// 					this.Init();
	// 				});
	// 				break;
	// 			case "DELETE":
	// 				this.API.DELETE("CUSTOMERS", id).then((res) => {
	// 					console.log("Deleted ", res);
	// 					this.Init();
	// 				});
	// 				break;
	// 			default:
	// 				// Example of getting state from child component
	// 				console.log(this.FormRef.current.state);
	// 				this.API.POST("CUSTOMERS", {
	// 					name: this.FormRef.current.state.name,
	// 					address: this.FormRef.current.state.address,
	// 				}).then((res) => {
	// 					console.log(res);
	// 					this.Init();
	// 				});
	// 				break;
	// 		}
	// 		return true;
	// 	}

	// 	// Toggle State
	// 	trueOrFalse = !trueOrFalse;
	// 	// this.setState({ modalOpen: trueOrFalse });
	// 	// Set state based on the prop passed
	// 	console.log(modal);
	// 	this.setState({ [modal]: trueOrFalse });
	// 	return false;
	// }

	// handleDelete(id) {
	//     this.API.DELETE("CUSTOMERS", id).then((res) => {
	//         console.log("Deleted ", res);
	//         this.Init();
	//     })
	// }

	openModal(
		accept = false,
		type = this.state.type,
		action = this.state.action,
		param = this.state.param
	) {
		this.setState({ modalOpen: !this.state.modalOpen });
		if (accept) {
			console.log("Accept", type, action, param);
			// Call API here
			switch (action) {
                case "DELETE":
					this.API.DELETE(type, param.id).then((res) => {
						if (res.status !== 200) {
							console.log(res);
						}
						this.Init();
					});
                    break;
				case "EDIT":
					this.API.PUT(type, param.id, param).then((res) => {
						if (res.status !== 200) {
							console.log(res);
						}
						this.Init();
					});
					break;
				default:
					this.API.POST(type, param).then((res) => {
						if (res.status !== 200) {
							console.log(res);
						}
						this.Init();
					});
					break;
			}

			return true;
		}

		return false;
	}

	setModal(type, action = null, param = null) {
        this.setState({ type: type, action: action, param: param }, () => {
            console.log("Modal State: ", this.state);
            this.openModal(false, type, action, param);
        });
	}

	render() {
		return (
			<Grid celled>
				<CustomerModal
					ref={this.ModalRef}
					open={this.state.modalOpen}
					type={this.state.type}
					action={this.state.action}
					param={this.state.param}
					closeMethod={this.openModal.bind(this)}
				/>
				<Grid.Row color={"black"}>
					<Grid.Column width={12}>
						<h1>{this.props.title}</h1>
					</Grid.Column>
					<Grid.Column width={4}>
						<Button
							primary
							fluid
							onClick={() =>
								this.setModal(this.state.type, "CREATE", { name: "", address: "" })
							}
						>
							Add
						</Button>
						{/* <Modal
                            trigger={<Button onClick={() => this.handleModalClose("modalCreateOpen", false)} fluid primary>Add</Button>}
                            size={"mini"}
                            open={this.state.modalCreateOpen}
                        >
                            <Modal.Header>
                                Create
                            </Modal.Header>
                            <Modal.Content>
                                <ModalForm ref={this.FormRef} closeMethod={this.handleModalClose.bind(this)} />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button negative onClick={() => this.handleModalClose("modalCreateOpen", true)} >Cancel</Button>
                                <Button positive type="submit" form="form">Submit</Button>
                            </Modal.Actions>
                        </Modal> */}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row color={"grey"}>
					<Grid.Column width={2}>Id</Grid.Column>
					<Grid.Column width={5}>Name</Grid.Column>
					<Grid.Column width={5}>Address</Grid.Column>
					<Grid.Column width={2}>Action</Grid.Column>
					<Grid.Column width={2}>Action</Grid.Column>
				</Grid.Row>
				{this.state.list.length > 0 ? (
					this.state.list.map((o) => {
						return (
							<Grid.Row key={o.id}>
								<Grid.Column width={2}>{o.id}</Grid.Column>
								<Grid.Column width={5}>{o.name}</Grid.Column>
								<Grid.Column width={5}>{o.address}</Grid.Column>
								<Grid.Column width={2}>
                                    <Button
                                        primary
                                        fluid
                                        onClick={() =>
                                            this.setModal(this.state.type, "EDIT", { id: o.id, name: o.name, address: o.address })
                                        }
                                    >
                                        Edit
                                    </Button>
									{/* <Modal
                                    trigger={<Button fluid secondary onClick={() => this.handleModalClose("modalEditOpen", false)}>Edit</Button>}
                                    size={"mini"}
                                    open={this.state.modalEditOpen}
                                >
                                    <Modal.Header>
                                        Edit
                                    </Modal.Header>
                                    <Modal.Content>
                                        <ModalForm ref={this.FormRef} id={o.id} action="EDIT" name={o.name} address={o.address} closeMethod={this.handleModalClose.bind(this)} />
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button negative onClick={() => this.handleModalClose("modalEditOpen", true)} >Cancel</Button>
                                        <Button positive type="submit" form="form">Submit</Button>
                                    </Modal.Actions>
                                </Modal> */}
								</Grid.Column>
								<Grid.Column width={2}>
                                    <Button
                                        negative
                                        fluid
                                        onClick={() =>
                                            this.setModal(this.state.type, "DELETE", { id: o.id, name: o.name, address: o.address })
                                        }
                                    >
                                        Delete
                                    </Button>
									{/* <Modal
                                    trigger={<Button fluid negative onClick={() => this.handleModalClose("modalDeleteOpen", false)}>Delete</Button>}
                                    size={"mini"}
                                    open={this.state.modalDeleteOpen}
                                >
                                    <Modal.Header>
                                        Delete
                                    </Modal.Header>
                                    <Modal.Content>
                                        Are you sure?
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button negative onClick={() => this.handleModalClose("modalDeleteOpen", true)} >No</Button>
                                        <Button positive onClick={() => this.handleModalClose("modalDeleteOpen", true, true, "DELETE", o.id)} >Yes</Button>
                                    </Modal.Actions>
                                </Modal> */}
								</Grid.Column>
							</Grid.Row>
						);
					})
				) : (
					<Grid.Row width={16}>
						<Grid.Column width={16} textAlign="center">
							"Nothing to show here"
						</Grid.Column>
					</Grid.Row>
				)}
			</Grid>
		);
	}
}

export default Page;
