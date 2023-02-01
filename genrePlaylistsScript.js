const playlistCardTemplate = document.querySelector("[data-playlist-template]");
const playlistCardContainer = document.querySelector(".playlist-cards");
const pageGenre = document.querySelector(".pageGenre").textContent;

let playlists = [];

fetch("playlists.json")
  .then(res => res.json())
  .then(data => {

    data.sort(function (a, b) {
      var dateA = new Date(a.uploadDate), dateB = new Date(b.uploadDate);
      return dateB - dateA;
    })

    playlists = data.map(playlist => {

      if (!playlist.playlistGenre.includes(pageGenre))
      {
        return;
      }

      const card = playlistCardTemplate.content.cloneNode(true).children[0];
      const playlistTitle = card.querySelector(".playlist-title");
      const playlistDuration = card.querySelector(".time");
      const uploadDate = card.querySelector(".date");
      const playlistThumbnail = card.querySelector(".playlistThumbnail");
      const playlistLink = card.querySelector(".playlistButtonLink");
      const playlistDescription = card.querySelector(".playlist-description");

      playlistTitle.textContent = playlist.playlistTitle;
      playlistDuration.textContent = playlist.playlistDuration;
      uploadDate.textContent = playlist.uploadDate;
      playlistThumbnail.src = playlist.playlistThumbnail;
      playlistLink.href = playlist.playlistLink;
      playlistDescription.textContent = playlist.playlistDescription;

      playlistCardContainer.append(card);
      return {
        playlistTitle: playlist.playlistTitle, playlistDuration: playlist.playlistDuration, uploadDate: playlist.uploadDate,
        playlistThumbnail: playlist.playlistThumbnail, playlistLink: playlist.playlistLink, playlistDescription: playlist.playlistDescription, element: card
      }
    });
  })