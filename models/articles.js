const mongoose = require('../plug/db');

const ArticleSchema = mongoose.Schema({
    id: {type: Number},
    articleName: {
        type: String,
        required:true,
    },
    author: {type: String},
    releaseDate: {type: String},
    content: {type: String},
    articleSerial: {type:String}
})

module.exports = mongoose.model('article', ArticleSchema);