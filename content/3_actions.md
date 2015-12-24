{
    "template": "page.html",
    "previous": ["2_references.md"],
    "next": ["4_conditionals.md"]
}

# Commands

Commands let you tell BackTalk what to do. In BackTalk, they look sort of like sentences. One of the most commonly used commands in BackTalk is `with $ as $`. Here's an example of how you would use it:

    with $my_dog as $bingo

or you could use it like this:

    with $my_best_friend as $suzy

These two lines each set up a new reference. The first makes the reference `$my_dog` refer to the same thing as the reference `$bingo`. Remember, a reference is a name, so you now have two
names for your dog Bingo. You can refer to Bingo as `$my_dog` or as `$bingo`. When we said `with $ as $` before, this was really a shorthand to tell you that there is a command that starts `with`, followed by a reference of your choosing, followed by `as`, and then another reference of your choosing.

# Other Commands

There can be many commands available to you as you write BackTalk code. In the example below, you can use the commands

 * `with $ as $`
 * `say hi to $`
 * `listen to $`

 Try it out and see what happens!


    {commands_example}
    with $my_dog as $bingo
    say hi to $bingo
    say hi to $my_dog

    listen to $suzy
