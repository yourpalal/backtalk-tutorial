{
    "template": "page.html",
    "previous": ["2_data.md"],
    "next": ["4_conditionals.md"]
}

# Commands

Commands let you tell BackTalk what to do. In BackTalk, they look sort of like sentences. One of the most commonly used commands in BackTalk is `with $ as $`. Here's an example of how you would use it:

    with $my_dog as $bingo

or you could use it like this:

    with $my_best_friend as $suzy

These two lines each set up a new reference. The first makes the reference `$my_dog` refer to the same thing as the reference `$bingo`. Remember, a reference is a name, so you now have two
names for your dog Bingo. You can refer to Bingo as `$my_dog` or as `$bingo`. When we said `with $ as $` before, this was really a shorthand to tell you that there is a command that starts `with`, followed by a reference of your choosing, followed by `as`, and then another reference of your choosing.

## Other Commands

There can be many commands available to you as you write BackTalk code. In the example below, you can use the commands

 * `with $ as $`
 * `say hi to $`
 * `listen to $`
 * `print $`

 Try it out and see what happens!


    {commands_example}
    print "BackTalk is fun!"

    with $my_dog as $bingo
    say hi to $bingo
    say hi to $my_dog
    say hi to $suzy

    listen to $suzy

## Parameters

In the example above, you may have noticed that you can use more than just references when giving a command. You can use any of the [BackTalk data types](/2_data). Whatever extra information you add to
the command is called a parameter. Check out the example below to
see how we can use `print $` with different parameters.

    {commands_example}
    print "parameters are cool!"
    print 1
    print $suzy
    print true
    print (! true)

    with $x as 4
    print ($x + 4 * 7 - 4)

Sometimes, you may be required to use parentheses `( )` to make it clear what is part of a command and what is a parameter. The best rule to follow is that if the parameter is any sort of calculation (like `3 + 4` or `$x & false`), you should put parentheses around it.


## Command Bodies

Some commands have a form that allows them to include a section of BackTalk code. `with $ as:` is an example of this. It runs all of the
commands it is given, and then sets the reference to whatever the result is. To determine what lines of code belong to a command, BackTalk looks at the number of spaces at the start of the line. Anything with more spaces belongs to the most recent command that ends with `:`.

In the following example, `with $ as:` is used to set the reference $x to the result of a series of computations.

    {commands_example}
    with $me_and_bingo as:
        with $my_height as 160
        with $bingos_height as 30

        $my_height + $bingos_height

    print $me_and_bingo
