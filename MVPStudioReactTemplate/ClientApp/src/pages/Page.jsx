import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Api from '../services/Api';

export class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

        this.API = new Api();
        this.Init();
    }

    Init() {
        this.API.GET(this.props.title).then(data => this.setState({ list: data }));
    }

    render() {
        return (
            <Grid container>
                <Grid.Row>
                    <h1>{this.props.title}</h1>
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
                }) : "Nothing to show here"}
            </Grid>
        )
    }
}

export default Page;