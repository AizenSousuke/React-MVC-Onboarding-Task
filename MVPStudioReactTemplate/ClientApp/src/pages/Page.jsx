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
								</Grid.Column>
							</Grid.Row>
						);
					})
				) : (
					<Grid.Row width={16}>
						<Grid.Column width={16} textAlign="center">
							"Nothing to show here. Add one!"
						</Grid.Column>
					</Grid.Row>
				)}
			</Grid>
		);
	}
}

export default Page;
