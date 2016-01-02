var gutil = require("gulp-util"),
    path = require("path");

function postDest(post) {
    if ("index.md" === path.basename(post.file.path)) {
        // link the folder above index.md
        return path.dirname(post.file.relative);
    }

    // link file/ so that it becomes file/index.html
    return gutil.replaceExtension(post.file.relative, "");
}

module.exports.filters = {};

module.exports.helpers = {
    linkto: function(chunk, context, bodies, params) {
        var post = params.post || context.current();
        var target = postDest(post);

        var base = params.from;
        if (!base) {
            return target;
        }

        return path.relative(postDest(base), target);
    },

    resource: function(chunk, context, bodies, params) {
        var url = path.relative("/", params.url);
            // remove leading "/";

        var post = params.from || context.get("post");
        var postLocation = path.dirname(postDest(post));

        return path.relative(postLocation, url);
    }
};
