{
    "template": "page.html",
    "previous": ["3_commands.md"]
}

# Conditionals

Sometimes, you want to check on something before deciding what to do. BackTalk can help you do this! There is a command called `if: ` that lets you test something, and then run a command if the test passes.

That could look something like this:

    if:
        in case (it is raining) then:
            take the umbrella
            put on a jacket

        in case (it is sunny) then:
            put on sunglasses

        otherwise:
            put on layers

In this example, if it's raining, we will take an umbrella, and put on a jacket. If it's sunny, we will put on sunglasses. If it's raining and sunny, then we will take the umbrella and put on a jacket, but won't put on sunglasses. `if:` only does the first `in case $ then:` that it can. `if:` also provides an
`otherwise:` command which will be run only if no cases match. In the example above, we use `otherwise:` to layer up in unrecognized weather.

You can play with `if:` in the example below. Try adding an `otherwise: ` in where you can!


    {ConditionalExample}

    if:
        in case ($bingo is hungry) then:
            feed $bingo

        in case ($harry is hungry) then:
            feed $harry

        in case ($suzy is hungry) then:
            feed $suzy

        otherwise:
            print "no hungry friends!"

    if:
        in case ($suzy is bored) then:
            give $suzy a video game

        in case ($harry is bored) then:
            give $harry a book


`if:` can even be used to calculate a value. We could change the
first `if:` statement in the example above to use `with $ as:` like so:

    {ConditionalExample}

    with $hungry_friend as:
        if:
            in case ($bingo is hungry) then:
                $bingo
            in case ($harry is hungry) then:
                $harry
            in case ($suzy is hungry) then:
                $suzy

    if:
        in case $hungry_friend then:
            feed $hungry_friend
        otherwise:
            print "no hungry friends!"

Notice that `$hungry_friend` is set to the result of the `if:` command, which is determined by which friend is hungry. If no
friend is hungry, then `$hungry_friend` will not refer to anything,
meaning the command body of `in case $hungry_friend then:` will not be run.

You may also have noticed that we are only feeding one of our friends. This works well for the examples, because it lets
us explore conditional commands, but it's not very nice. Could you
modify the example above to feed each friend, but only when they're
hungry?
