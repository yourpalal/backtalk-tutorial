var gutil = require("gulp-util"),
    path = require("path");

module.exports.filters = {};

module.exports.helpers = {
    linkto: function(chunk, context, bodies, params) {
        var post = params.post || context.current();
        if ("index.md" === path.basename(post.file.path)) {
            ext = ".html"; // just link the HTML output
        } else {
            ext = "/"; // link file/ so that it becomes file/index.html
        }

        return "/" + gutil.replaceExtension(post.file.relative, ext);
    }
};
