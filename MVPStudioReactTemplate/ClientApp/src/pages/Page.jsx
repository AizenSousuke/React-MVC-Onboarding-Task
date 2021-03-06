import React, { Component } from "react";
import {
	Grid,
	Button,
	Icon,
	Pagination,
	Dropdown,
	Responsive,
} from "semantic-ui-react";
import Api from "../services/Api";
import ModalForm from "../components/ModalForm";

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
			showOptions: [
				{ key: 1, text: "5", value: 5 },
				{ key: 2, text: "10", value: 10 },
				{ key: 3, text: "All", value: 999 },
			],
			showOptionsDefault: 10,
		};

		this.API = new Api();
	}

	componentWillMount() {
		// Initialize API data before loading the component
		this.Init();
	}

	Init() {
		this.setState({ type: this.props.title });
		this.API.GET(this.props.title).then((data) => {
			this.setState({ list: data });
			console.log("Loaded: ", data);
			return data;
		});
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
			console.log("Modal State: ", this.state, "Modal Param:", param);
			this.openModal(false, type, action, param);
		});
	}

	render() {
		// Conditional Rendering
		var TableHeader;
		switch (this.props.title) {
			case "Sales":
				TableHeader = (
					<Grid.Row color={"grey"} columns="equal">
						<Grid.Column>Id</Grid.Column>
						<Grid.Column>Name</Grid.Column>
						<Grid.Column>Customer</Grid.Column>
						<Grid.Column>Product</Grid.Column>
						<Grid.Column>Store</Grid.Column>
						<Grid.Column>Action</Grid.Column>
						<Grid.Column>Action</Grid.Column>
					</Grid.Row>
				);
				break;
			default:
				TableHeader = (
					<Grid.Row color={"grey"} columns="equal">
						<Grid.Column>Id</Grid.Column>
						<Grid.Column>Name</Grid.Column>
						<Grid.Column>
							{this.state.type.toLowerCase() === "products"
								? "Price"
								: "Address"}
						</Grid.Column>
						<Grid.Column>Action</Grid.Column>
						<Grid.Column>Action</Grid.Column>
					</Grid.Row>
				);
				break;
		}

		return (
			<Responsive>
				<Grid celled>
					<ModalForm
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
								onClick={() => {
									this.setModal(this.state.type, "CREATE", {
										name: "",
										address: "",
										price: "",
										dateSold:
											new Date().getFullYear() +
											"-" +
											(new Date().getMonth() < 9
												? "0" +
												  (new Date().getMonth() + 1)
												: new Date().getMonth() + 1) +
											"-" +
											(new Date().getDate < 10
												? "0" + new Date().getDate()
												: new Date().getDate()),
									});
								}}
							>
								Add
							</Button>
						</Grid.Column>
					</Grid.Row>
					{TableHeader}
					{this.state.list.length > 0 ? (
						this.state.list.map((o) => {
							return (
								<Grid.Row key={o.id} columns="equal">
									<Grid.Column>{o.id}</Grid.Column>
									<Grid.Column>
										{o.name}
										{o.dateSold}
									</Grid.Column>
									<Grid.Column>
										{o.address}
										{o.price ? "$" + o.price : ""}
										{o.customer != null
											? o.customer.name
											: ""}
									</Grid.Column>
									{o.product ? (
										<Grid.Column>
											{o.product != null
												? o.product.name
												: ""}
										</Grid.Column>
									) : (
										""
									)}
									{o.store ? (
										<Grid.Column>
											{o.store != null
												? o.store.name
												: ""}
										</Grid.Column>
									) : (
										""
									)}
									<Grid.Column>
										<Button
											color={"yellow"}
											fluid
											onClick={() => {
												this.setModal(
													this.state.type,
													"EDIT",
													o
												);
											}}
											icon
											labelPosition="left"
										>
											<Icon name="edit outline" />
											<Responsive minWidth={768}>
												Edit
											</Responsive>
										</Button>
									</Grid.Column>
									<Grid.Column>
										<Button
											negative
											fluid
											onClick={() =>
												this.setModal(
													this.state.type,
													"DELETE",
													o
												)
											}
											icon
											labelPosition="left"
										>
											<Icon name="delete" />
											<Responsive minWidth={768}>
												Delete
											</Responsive>
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
				<Grid stackable>
					<Grid.Row columns="equal">
						<Grid.Column>
							<Dropdown
								compact
								selection
								options={this.state.showOptions}
								defaultValue={this.state.showOptionsDefault}
							/>
						</Grid.Column>
						<Grid.Column className="ui center aligned">
							<Pagination
								defaultActivePage={1}
								totalPages={1}
							></Pagination>
						</Grid.Column>
						<Grid.Column></Grid.Column>
					</Grid.Row>
				</Grid>
			</Responsive>
		);
	}
}

export default Page;
