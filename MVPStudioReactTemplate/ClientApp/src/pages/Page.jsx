import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import Api from '../services/Api';

export class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            modalOpen: false,
        }

        this.API = new Api();
        this.Init();
    }

    Init() {
        this.API.GET(this.props.title).then(data => this.setState({ list: data }));
    }

    handleModalClose(trueOrFalse, accept = false) {
        if (accept) {
            // On close and accepted, do something here
            trueOrFalse = !trueOrFalse;
            this.setState({ modalOpen: trueOrFalse });
            console.log("Accept");
            return true;
        };

        // Toggle State
        trueOrFalse = !trueOrFalse;
        this.setState({ modalOpen: trueOrFalse });
        return false;
    }

    render() {
        return (
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <h1>{this.props.title}</h1>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Modal
                            trigger={<Button onClick={() => this.handleModalClose(false)} fluid primary>Add</Button>}
                            size="mini"
                            open={this.state.modalOpen}
                        >
                            <Modal.Header>
                                Confirm action
                            </Modal.Header>
                            <Modal.Content>
                                Are you sure you want to add the item?
                            </Modal.Content>
                            <Modal.Actions>
                                <Button negative onClick={() => this.handleModalClose(true)} >No</Button>
                                <Button positive onClick={() => this.handleModalClose(true, true)} >Yes</Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>
                        Id
                    </Grid.Column>
                    <Grid.Column width={6}>
                        Name
                    </Grid.Column>
                    <Grid.Column width={8}>
                        Address
                    </Grid.Column>
                </Grid.Row>
                {this.state.list.length > 0 ? this.state.list.map(o => {
                    return (
                        <Grid.Row key={o.id}>
                            <Grid.Column width={2}>
                                {o.id}
                            </Grid.Column>
                            <Grid.Column width={6}>
                                {o.name}
                            </Grid.Column>
                            <Grid.Column width={8}>
                                {o.address}
                            </Grid.Column>
                        </Grid.Row>
                    )
                }) : 
                <Grid.Row width={16}>
                    <Grid.Column width={16} textAlign="center">
                        "Nothing to show here"
                    </Grid.Column>
                </Grid.Row>}
            </Grid>
        )
    }
}

export default Page;