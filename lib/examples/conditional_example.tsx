/// <reference path="../typings/tsd.d.ts"/>

import * as React from "react";
import {FriendProps, FriendState, FriendControl} from "./friend_control";
import {Friend} from "../friends";

export interface ConditionalProps {
    friends: Friend[];
    onChange();
}

export interface ConditionalState {

}

export class ConditionalControl extends React.Component<ConditionalProps, ConditionalState> {
    constructor(props: ConditionalProps, context) {
        super(props, context);

        this.state = {
        };
    }

    friendChanged(friend: Friend, value: FriendState) {
        friend.hungry = value.hungry;
        friend.bored = value.bored;

        this.forceUpdate();
        this.props.onChange();
    }

    render() {
        let {friends} = this.props;

        return (<form>{friends.map((friend) =>
            <FriendControl key={friend.name}
                name={friend.name}
                bored={friend.bored}
                hungry={friend.hungry}
                onChange={(value) => this.friendChanged(friend, value)}/>
        )}</form>);
    }
}
