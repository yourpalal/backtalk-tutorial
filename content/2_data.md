{
    "title": "References",
    "template": "page.html",
    "next": ["3_commands.md"],
    "previous": ["1_what_when_why.md"]
}

There are four basic types of data in BackTalk: numbers, text, booleans, and references.

# Numbers
A number in BackTalk is pretty much what you would expect. For instance, `5` is the number five. You can also do math in BackTalk, and it looks much like you're used to. Try out some math in the example below. Multiplication looks like `2 * 3` and division looks like `9 / 3`.

    {simple_example}

    (2 * 2) + (4 + 8) / 3

# Booleans
There are two booleans: `true`, and `false`. Like numbers, there is a kind of math that you can do with booleans.

 * You can use `!` to negate them. `! true` is the same as `false`. Notice the space after the `!` this is required in BackTalk.
 * You can also use `&` (which is called "and") to check if the first and second booleans are both true. `true & true` is `true`, `true & false` is not.  
 * You can also use `|` (which is called "or") to check if either the first or the second boolean is true. `true | true` is `true`, but `false | false` is not.
 * Finally, you can combine `!`, `&`, and `|` together to make something as complicated as you want! Try it out in the example below.


    {simple_example}

    true &! false | true


# Text
Text is a bunch of letters and numbers and things like that. In BackTalk, text looks like `"this"`. Notice that it begins and ends with quotation marks. Try editing the text in the example below.

    {simple_example}

    "wow!!!"

# References

What is a references? A reference is like a name. A name tells you which thing I'm talking about, but it isn't the thing itself. If I say, "Suzy is an excellent computer programmer," then you know who I'm talking about, because I used Suzy's name. References in BackTalk work the same way. A reference looks like this:

    $suzy

or this

    $my_best_friend

or any other bunch of letters and underscores, as long as it starts with a `$`.


In the following example, you can use a reference to pick a friend to describe. Try switching `$suzy` for `$harry` or `$bingo` in the example below:

    {simple_example}

    $suzy
