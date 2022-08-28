const videoCardTemplate = document.querySelector("[data-video-template]");
const videoCardContainer = document.querySelector(".video-cards");
const searchInput = document.querySelector("[data-search]");

const dropdowns = document.querySelectorAll('.dropdown');
var mostToLeastRecent = true;

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.dropdown-menu');
  const options = dropdown.querySelectorAll('.dropdown-menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('dropdown-menu-open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('dropdown-menu-open');

      options.forEach(option => {
        option.classList.remove('active');
      })

      option.classList.add('active');

      if (option.textContent == "Most Recent to Least Recent") {
        if (!mostToLeastRecent) 
        {
          while (videoCardContainer.firstChild) {
            videoCardContainer.removeChild(videoCardContainer.firstChild);
          }

          videos.sort(function (a, b) {
            var dateA = new Date(a.uploadDate), dateB = new Date(b.uploadDate);
            return dateB - dateA;
          })

          videos.forEach(video => {
            const card = videoCardTemplate.content.cloneNode(true).children[0];
            const videoTitle = card.querySelector(".video-title");
            const videoDuration = card.querySelector(".time");
            const uploadDate = card.querySelector(".date");
            const videoThumbnail = card.querySelector(".videoThumbnail");
            const videoLink = card.querySelector(".videoButtonLink");
            const videoDescription = card.querySelector(".video-description");

            videoTitle.textContent = video.videoTitle;
            videoDuration.textContent = video.videoDuration;
            uploadDate.textContent = video.uploadDate;
            videoThumbnail.src = video.videoThumbnail;
            videoLink.href = video.videoLink;
            videoDescription.textContent = video.videoDescription;

            video.element = card;
            const value = searchInput.value;
            videos.forEach(video => {
              const isVisible = video.videoTitle.toLowerCase().includes(value);
              video.element.classList.toggle("hide", !isVisible);
            })

            videoCardContainer.append(card);
          })
        }
        mostToLeastRecent = true;
      }
      else
      {
        if (mostToLeastRecent) 
        {
          while (videoCardContainer.firstChild) {
            videoCardContainer.removeChild(videoCardContainer.firstChild);
          }

          videos.sort(function (a, b) {
            var dateA = new Date(a.uploadDate), dateB = new Date(b.uploadDate);
            return dateA - dateB;
          })

          videos.forEach(video => {
            const card = videoCardTemplate.content.cloneNode(true).children[0];
            const videoTitle = card.querySelector(".video-title");
            const videoDuration = card.querySelector(".time");
            const uploadDate = card.querySelector(".date");
            const videoThumbnail = card.querySelector(".videoThumbnail");
            const videoLink = card.querySelector(".videoButtonLink");
            const videoDescription = card.querySelector(".video-description");

            videoTitle.textContent = video.videoTitle;
            videoDuration.textContent = video.videoDuration;
            uploadDate.textContent = video.uploadDate;
            videoThumbnail.src = video.videoThumbnail;
            videoLink.href = video.videoLink;
            videoDescription.textContent = video.videoDescription;

            video.element = card;
            const value = searchInput.value;
            videos.forEach(video => {
              const isVisible = video.videoTitle.toLowerCase().includes(value);
              video.element.classList.toggle("hide", !isVisible);
            })

            videoCardContainer.append(card);
          })
        }
        mostToLeastRecent = false;
      }

    });
  });
});

let videos = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  videos.forEach(video => {
    const isVisible = video.videoTitle.toLowerCase().includes(value);
    video.element.classList.toggle("hide", !isVisible);
  })
  console.log(videos)
})

fetch("videos.json")
  .then(res => res.json())
  .then(data => {

    data.sort(function (a, b) {
      var dateA = new Date(a.uploadDate), dateB = new Date(b.uploadDate);
      return dateB - dateA;
    })

    videos = data.map(video => {
      const card = videoCardTemplate.content.cloneNode(true).children[0];
      const videoTitle = card.querySelector(".video-title");
      const videoDuration = card.querySelector(".time");
      const uploadDate = card.querySelector(".date");
      const videoThumbnail = card.querySelector(".videoThumbnail");
      const videoLink = card.querySelector(".videoButtonLink");
      const videoDescription = card.querySelector(".video-description");

      videoTitle.textContent = video.videoTitle;
      videoDuration.textContent = video.videoDuration;
      uploadDate.textContent = video.uploadDate;
      videoThumbnail.src = video.videoThumbnail;
      videoLink.href = video.videoLink;
      videoDescription.textContent = video.videoDescription;

      videoCardContainer.append(card);
      return {
        videoTitle: video.videoTitle, videoDuration: video.videoDuration, uploadDate: video.uploadDate,
        videoThumbnail: video.videoThumbnail, videoLink: video.videoLink, videoDescription: video.videoDescription, element: card
      }
    });
  })