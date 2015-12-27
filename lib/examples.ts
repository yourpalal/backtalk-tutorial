import {Library, Scope, StdLib} from "backtalk";

export interface Example {
    name: string;
    prepareScope(scope: Scope);
    refreshScope(scope: Scope);

    showResult: boolean;
    showOutput: boolean;
}

let examples: {
    [name: string]: Example
} = {};

export function getExample(name: string): Example {
    return examples[name];
};

function addExample(ex: Example) {
    examples[ex.name] = ex;
}

addExample({
    name: "simple_example",
    prepareScope: (scope: Scope) => {
        scope.set("suzy", "suzy likes programming");
        scope.set("harry", "harry likes to read");
        scope.set("bingo", "bingo likes going for walks");
    },

    refreshScope: () => null,

    showResult: true,
    showOutput: false,
});


interface FriendMessages {
    greeting: string;

    hungry: string;
    notHungry: string;

    notBored: string;
    getBook: string;
    getVideoGame: string;
}

class Friend {
    public hungry = true;
    public bored = true;

    constructor(public name: string, public messages: FriendMessages)
    {
    }

    toString(): string {
        return JSON.stringify(this);
    }

    getFed(): string {
        if (this.hungry) {
            this.hungry = false;
            return `${this.name}: yum!!`;
        }

        return `${this.name}: I'm not going to eat that.`;
    }

    getBook(): string {
        if (this.bored) {
            this.bored = false;
            return `${this.name}: ${this.messages.getBook}`;
        }
        return `${this.name}: ${this.messages.notBored}`;
    }

    getVideoGame(): string {
        if (this.bored) {
            this.bored = false;
            return `${this.name}: ${this.messages.getVideoGame}`;
        }
        return `${this.name}: ${this.messages.notBored}`;
    }
}

var friendsLib = Library.create()
    .ref("suzy", () => new Friend("Suzy", {
        greeting: "programming is fun!",

        hungry: "yum, thanks!",
        notHungry: "blech",

        notBored: "I don't need that",
        getBook: "oh, thanks I guess",
        getVideoGame: "weee!! pew pew pew"
    }))
    .ref("harry", () => new Friend("Harry", {
        greeting: "reading is fun!",

        hungry: "om nom nom",
        notHungry: "I guess I could eat",

        notBored: "*ignores you*",
        getBook: "WOAH I haven't read that one!",
        getVideoGame: "I hope this has a good story..."
    }))
    .ref("bingo", () => new Friend("doggy", {
        greeting: "woof!",

        hungry: "chomp chomp",
        notHungry: "chomp chomp",

        notBored: "*looks confused*",
        getBook: "bark bark! *rips up book*",
        getVideoGame: "bark bark!"
    }))
    .command("say hi", ["say hi to $:friend"])
        .impl((args, self) => {
            let friend = args.getObject("friend") as any;
            self.scope.env.stdout.write(`you: "Hi ${friend.name}!"`);
        })
    .command("listen", ["listen to $:friend"])
        .impl((args, self) => {
            let friend = args.getObject("friend") as any;
            self.scope.env.stdout.write(`${friend.name}: ${friend.messages.greeting}`);
        })
    .done()
;

var conditionalLib = Library.create()
    .command("bored", ["$:friend is bored"])
        .impl((args) => {
            let friend = args.getObject("friend") as any;
            return friend.bored;
        })
    .command("give gift", ["give $:friend a <book|video game>:toy"])
        .impl((args, self) => {
            let friend = args.getObject("friend") as any;
            let scope = self.scope;
            if (args.getNumber("toy") == 0) {
                scope.env.stdout.write(`you: *gives ${friend.name} a book*`);
                scope.env.stdout.write(friend.getBook());
            } else {
                scope.env.stdout.write(`you: *gives ${friend.name} a video game*`);
                scope.env.stdout.write(friend.getVideoGame());
            }
        })
    .command("hungry", ["$:friend is hungry"])
        .impl((args) => {
            let friend = args.getObject("friend") as any;
            return friend.hungry;
        })
    .command("feed", ["feed $:friend"])
        .impl((args, self) => {
            let friend = args.getObject("friend") as any;
            let scope = self.scope;
            scope.env.stdout.write(`you: *feeds ${friend.name}*`);
            scope.env.stdout.write(friend.getFed());
        })
    .done();

addExample({
    name: "commands_example",
    prepareScope: (scope: Scope) => {
        StdLib.inScope(scope);
        friendsLib.addToScope(scope);
    },

    refreshScope: (scope: Scope) => {
        friendsLib.addToScope(scope);
    },

    showResult: false,
    showOutput: true
});

addExample({
    name: "conditional_example",
    prepareScope: (scope: Scope) => {
        getExample("commands_example").prepareScope(scope);
        conditionalLib.addToScope(scope);
    },

    refreshScope(scope: Scope) {
        getExample("commands_example").refreshScope(scope);
    },

    showResult: false,
    showOutput: true
});
