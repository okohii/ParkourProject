function redirectClassic() {
  // window.location.href = "https://www.youtube.com/watch?v=xbqVWZD-sfI&t=57s";
  window.open("https://www.youtube.com/watch?v=xbqVWZD-sfI&t=57s", "_blank");
}

function redirectFreeRunning() {
  // window.location.href = "https://www.youtube.com/watch?v=fqKO5fp4Fcc";
  window.open("https://www.youtube.com/watch?v=fqKO5fp4Fcc", "_blank");
}

function redirectClimbing() {
  // window.location.href = "https://www.youtube.com/watch?v=iKFwn-z9WIM&t=310s";
  window.open("https://www.youtube.com/watch?v=iKFwn-z9WIM&t=310s", "_blank");
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    console.log("Top:", top);
    console.log("Offset:", offset);
    console.log("Height:", height);
    console.log("ID:", id);

    if(top >= offset && top < offset + height) {
      console.log("Section in view:", id);

      navLinks.forEach(links => {
        links.classList.remove('active');
        console.log("Link:", links.getAttribute('href'));
        if (links.getAttribute('href').includes(id)) {
          console.log("Adding active class to link:", links.getAttribute('href'));
          links.classList.add('active');
        }
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var audio = document.getElementById("meuAudio");
  audio.volume = 0.02;
  audio.play();
});