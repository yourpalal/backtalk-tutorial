/// <reference path="../typings/tsd.d.ts"/>

import * as React from "react";

export interface FriendProps {
    key?: string;

    name: string;
    hungry: boolean;
    bored: boolean;

    onChange(value: FriendState);
}

export interface FriendState {
    hungry?: boolean;
    bored?: boolean;
}

export class FriendControl extends React.Component<FriendProps, FriendState> {
    constructor(props: FriendProps, context) {
        super(props, context);

        this.state = {
            hungry: props.hungry,
            bored: props.bored,
        };

        this.changedHungry = this.changedHungry.bind(this);
        this.changedBored = this.changedBored.bind(this);
    }

    changedHungry(event: React.SyntheticEvent) {
        let value = event.target["checked"];

        this.setState({
            hungry: value
        });

        this.props.onChange({
            bored: this.state.bored,
            hungry: value,
        });
    }

    changedBored(event: React.SyntheticEvent) {
        let value = event.target["checked"];

        this.setState({
            bored: value
        });

        this.props.onChange({
            bored: value,
            hungry: this.state.hungry,
        });
    }

    render() {
        let {name, onChange} = this.props;
        let {hungry, bored} = this.state;

        return (<fieldset className="friend">
            <legend className="name">{name}</legend>
            <label htmlFor="hungry">
                <input name="hungry" type="checkbox" checked={hungry} onChange={this.changedHungry} />
                hungry
            </label>

            <label htmlFor="bored">
                <input name="bored" type="checkbox" checked={bored} onChange={this.changedBored} />
                bored
            </label>
        </fieldset>);
    }
}
