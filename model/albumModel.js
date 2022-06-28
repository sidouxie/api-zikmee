const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    artist: {
      _id_artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    },
    year: Number,
    photo_album: String,
    trackslist: [
      {
        name: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

const ArtistSchema = new mongoose.Schema({
  name: String,
  photo_artist: String,
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
});

const Album = mongoose.model("Album", AlbumSchema);
const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = { Album, Artist };
