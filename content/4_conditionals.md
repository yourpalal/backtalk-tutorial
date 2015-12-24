{
    "template": "page.html",
    "previous": ["3_actions.md"]
}

# Conditionals

Sometimes, you want to check on something before deciding what to do. BackTalk can help you do this! There is a command called `when :` that lets you test something, and then run a command if the test passes.

That could look something like this:

    when:
        it is raining
        then:
            take the umbrella
            put on a jacket

        it is sunny
        then:
            put on sunglasses

In this example, if it's raining, we will take an umbrella, and put on a jacket. If it's sunny, we will put on sunglasses. If it's raining and sunny, then we will take the umbrella and put on a jacket, but won't put on sunglasses. `when :` only does the first `then :` that it can. This is probably the most complicated code in the tutorial so far. This is because `when :` does something special with the command body. It alternates between checking something, and (maybe) running a command. Because it alternates in this way, it provides a special `then :` command to let you group together multiple commands (like we did when its raining).


    {conditional_example}

    when:
        $bingo is hungry
        then:
            feed $bingo

        $harry is hungry
        then:
            feed $harry

    when:
        $suzy is bored
        then:
            give $suzy a video game

        $harry is bored
        then:
            give $harry a book
