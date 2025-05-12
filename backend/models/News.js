const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    preferences: {
        categories: [{
            type: String,
            enum: ['business', 'technology', 'sports', 'entertainment', 'health', 'science', 'general']
        }],
        sources: [String]
    },
    savedArticles: [{
        title: String,
        description: String,
        url: String,
        imageUrl: String, // used internally for display
        source: String,
        category: String,
        publishedAt: Date,
        savedAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('News', newsSchema);
