import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "customer",
            items: [],
            name: "",
            address: ""
        }
    }

    componentWillMount() {
        switch (this.state.type) {
            default:
                this.setState({ items: [] });
                break;
        }
    }

    handleFormSubmit(e) {
        console.log("Submit", e);

    }

    render() {
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