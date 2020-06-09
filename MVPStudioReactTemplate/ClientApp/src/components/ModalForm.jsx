import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "CUSTOMER",
            items: [],
            name: "",
            address: ""
        }
    }

    componentWillMount() {
        this.setState({ type: this.props.type }, () => {
            switch (this.state.type) {
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
            case "DELETE":
            default:
                return (
                    <Form>
                        <Form.Field required>
                            <label>Name</label>
                            <input onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" />
                        </Form.Field>
                        <Form.Field required>
                            <label>Address</label>
                            <input onChange={(e) => this.setState({ address: e.target.value })} placeholder="Address" />
                        </Form.Field>
                        {/* { this.props.items.length > 0 && this.props.items.map((data) => {return <h3>{data}</h3>}) } */}
                    </Form>
                )
        }
        return (
            <Form>
                <Form.Field required>
                    <label>Name</label>
                    <input onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" />
                </Form.Field>
                <Form.Field required>
                    <label>Address</label>
                    <input onChange={(e) => this.setState({ address: e.target.value })} placeholder="Address" />
                </Form.Field>
                {/* { this.props.items.length > 0 && this.props.items.map((data) => {return <h3>{data}</h3>}) } */}
            </Form>
        )
    }
}

export default ModalForm;