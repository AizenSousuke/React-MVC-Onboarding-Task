import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "CUSTOMER",
            action: "CREATE",
            items: [],
            name: "",
            address: ""
        }
    }

    componentWillMount() {
        this.setState({ action: this.props.action ? this.props.action : "CREATE" }, () => {
            switch (this.state.action) {
                case "EDIT":
                    console.log("Setting modal to edit mode.");
                    this.setState({ action: "EDIT" });
                    this.setState({ name: this.props.name, address: this.props.address });
                    break;
                case "DELETE":
                    console.log("Setting modal to delete mode.");
                    break;
                default:
                    console.log("Setting modal to default mode.");
                    break;
            }
        });
    }

    handleFormSubmit(e) {
        console.log("Submit", e);

    }

    render() {
        switch (this.state.type) {
            case "PRODUCTS":
                break;
            default:
                return (
                    <Form id="form" onSubmit={(e) => {
                        e.preventDefault(); 
                        console.log("Form Submit"); 
                        switch (this.state.action) {
                            case "EDIT":
                                console.log("Edit", this.props.id);
                                this.props.closeMethod("modalEditOpen", true, true, this.state.action, this.props.id);
                                break;
                            default:
                                this.props.closeMethod("modalCreateOpen", true, true);
                                break;
                        }
                    }}>
                        <Form.Field required>
                            <label>Name</label>
                            <Form.Input onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" value={this.state.name} required />
                        </Form.Field>
                        <Form.Field required>
                            <label>Address</label>
                            <Form.Input onChange={(e) => this.setState({ address: e.target.value })} placeholder="Address" value={this.state.address} required />
                        </Form.Field>
                    </Form>
                )
        }
    }
}

export default ModalForm;