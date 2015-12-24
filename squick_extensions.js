var gutil = require("gulp-util");

module.exports.filters = {};

module.exports.helpers = {
    linkto: function(chunk, context, bodies, params) {
        var post = params.post || context.current();
        var ext;
        if ("index.md" === post.file.basename) {
            ext = ".html"; // just link the HTML output
        } else {
            ext = "/"; // link file/ so that it becomes file/index.html
        }

        return "/" + gutil.replaceExtension(post.file.relative, ext);
    }
};
