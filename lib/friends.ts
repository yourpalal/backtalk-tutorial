import {Library, Scope} from "backtalk";

export interface FriendMessages {
    description: string;
    greeting: string;

    hungry: string;
    notHungry: string;

    notBored: string;
    getBook: string;
    getVideoGame: string;
}

export class Friend {
    public hungry = true;
    public bored = true;

    constructor(public name: string, public messages: FriendMessages)
    {
    }

    toString(): string {
        return this.messages.description;
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
            return `${this.name}: "${this.messages.getBook}"`;
        }
        return `${this.name}: "${this.messages.notBored}"`;
    }

    getVideoGame(): string {
        if (this.bored) {
            this.bored = false;
            return `${this.name}: "${this.messages.getVideoGame}`;
        }
        return `${this.name}: "${this.messages.notBored}"`;
    }
}

export var makeSuzy = () => new Friend("Suzy", {
    description: "suzy likes programming",
    greeting: "programming is fun!",

    hungry: "yum, thanks!",
    notHungry: "blech",

    notBored: "I don't need that",
    getBook: "oh, thanks I guess",
    getVideoGame: "weee!! pew pew pew"
});

export var makeHarry = () => new Friend("Harry", {
    description: "harry likes to read",
    greeting: "reading is fun!",

    hungry: "om nom nom",
    notHungry: "I guess I could eat",

    notBored: "*ignores you*",
    getBook: "WOAH I haven't read that one!",
    getVideoGame: "I hope this has a good story..."
});

export var makeBingo = () => new Friend("Bingo", {
    description: "bingo likes going for walks",
    greeting: "woof!",

    hungry: "chomp chomp",
    notHungry: "chomp chomp",

    notBored: "*looks confused*",
    getBook: "bark bark! *rips up book*",
    getVideoGame: "bark bark!"
});

// simple library that provides friend objects and basic commands
export var friendsLib = Library.create()
    .ref("suzy", makeSuzy)
    .ref("harry", makeHarry)
    .ref("bingo", makeBingo)
    .command("say hi", ["say hi to $:friend"])
        .impl((args, self) => {
            let friend = args.getObject("friend") as any;
            self.scope.env.stdout.write(`you: "Hi ${friend.name}!"`);
        })
    .command("listen", ["listen to $:friend"])
        .impl((args, self) => {
            let friend = args.getObject("friend") as any;
            self.scope.env.stdout.write(`${friend.name}: "${friend.messages.greeting}"`);
        })
    .done()
;

// more advanced library that includes friendsLib and more commands
// that can be useful for exploring conditional execution
export var conditionalLib = Library.create()
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
