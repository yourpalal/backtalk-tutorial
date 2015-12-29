/// <reference path="../typings/tsd.d.ts"/>

import * as React from "react";
import {Scope, StdLib} from "backtalk";
import * as friends from "../friends";
import {ConditionalControl} from "./conditional_example";


export interface Example {
    name: string;
    prepareScope(scope: Scope);
    refreshScope(scope: Scope);
    makeExtras(rerun: Function): React.ReactElement<{key: string}> | string;

    showResult: boolean;
    showOutput: boolean;
}


export class SimpleExample implements Example {
    name = "SimpleExample";

    showResult = true;
    showOutput = false;

    prepareScope(scope: Scope) {
        scope.set("suzy", "suzy likes programming");
        scope.set("harry", "harry likes to read");
        scope.set("bingo", "bingo likes going for walks");
    }

    makeExtras() {
        return "";
    }

    refreshScope() {
        return;
    }
}


export class CommandsExample implements Example {
    name = "CommandsExample";

    showResult = false;
    showOutput = true;

    prepareScope(scope: Scope) {
        StdLib.inScope(scope);
        friends.friendsLib.addToScope(scope);
    }

    refreshScope(scope: Scope) {
        friends.friendsLib.addToScope(scope);
    }

    makeExtras() {
        return "";
    }
}


export class ConditionalExample implements Example {
    name = "conditional_example";

    showResult = false;
    showOutput = true;

    suzy: friends.Friend = friends.makeSuzy();
    bingo: friends.Friend = friends.makeBingo();
    harry: friends.Friend = friends.makeHarry();

    prepareScope(scope: Scope) {
        StdLib.inScope(scope);
        friends.friendsLib.addToScope(scope);
        friends.conditionalLib.addToScope(scope);
    }

    refreshScope(scope: Scope) {
        friends.friendsLib.addToScope(scope, {}, {
            suzy: Object.create(this.suzy),
            bingo: Object.create(this.bingo),
            harry: Object.create(this.harry),
        });
    }

    makeExtras(rerun) {
        let friends = [this.bingo, this.harry, this.suzy];
        return (<ConditionalControl friends={friends} onChange={rerun} />);
    }
}
