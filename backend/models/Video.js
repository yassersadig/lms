const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    author: {
        type: String,
        required: [true, 'Please enter an author'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Please enter a thumbnail'],
    },
    videoUrl: {
        type: String,
        required: [true, 'Please enter a video url'],
    },
    rating: {
        type: Number,
        default: 0,
    },
});

const Video = mongoose.model('video', videoSchema);

module.exports = Video;