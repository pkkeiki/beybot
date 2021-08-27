/* Config */
const twitchTvHandle = "pk_keiki";
const PAUSE_DURATION = 30 * 1000; // 30 seconds
const DISPLAY_DURATION = 10 * 1000; // 10 seconds

/* DOM */
const container = document.querySelector(".alerts");
const img = new Image();
const queue = new Queue();
const textContainer = document.querySelector(".text-shadows");

/* Sound Effects */
const pewAudio = new Audio("horn.wav");
const magicChime = new Audio("Magic_Chime.mp3");

/*bgImg*/
const bgImg= "https://github.com/pkkeiki/beybot/blob/gh-pages/playing-norm_gif-tab.png?raw=true";

/* GIFs */
const lurkGif = "https://i.imgur.com/q8kDLPw.gif";
const welcomeGif = "https://i.pinimg.com/originals/44/03/2d/44032df52abb777d335700443dd245c1.gif";
const hugGif = "https://i.imgur.com/FCXa6Gx.gif";
const rageGif = "https://images.squarespace-cdn.com/content/v1/5b23e822f79392038cbd486c/1617858446471-IOMNAG9GUPD9BMTVM3BJ/0f2fc14c5e3e9d653a20cb4c3a4af048.gif";
const panicGif = "https://c.tenor.com/gTcTYGzF9T4AAAAC/wee-woo-patrick-star.gif";

// Resolve promise after duration
const wait = async duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};


// Only for Music purposes
//const pauseSpotify = () => {
  //fetch("https://serve.onegraph.com/graphql?app_id=cdf2ebe1-3ad3-408a-81c0-1ed675d76411", {body: '{"doc_id": "10fccd15-1a55-4a27-877a-a63106b4bd11"}', method: "POST"})
//}


ComfyJS.Init(twitchTvHandle);
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(`!${command} was typed in chat`);

  if (command == "lurk") {
    new gifAlert(user, lurkGif, bgImg, magicChime, command);
  }
   if (command == "rage") {
    new gifAlert(user, rageGif, bgImg, magicChime, command);
  }
  if (command == "welcome") {
    new gifAlert(message, welcomeGif, bgImg, magicChime, command);
  }
  if (command == "hug") {
    new gifAlert(user, hugGif, bgImg, magicChime, command);
  }
  if (command == "panic") {
    new gifAlert(user, panicGif, bgImg, magicChime, command);
  }
  
  // Ok, ready!
  if(command == "music") {
    new gifAlert(user, lurkGif, bg, pewAudio, command);
    // Please don't stop the music
    fetch("https://serve.onegraph.com/graphql?app_id=cdf2ebe1-3ad3-408a-81c0-1ed675d76411", {body: '{"doc_id": "e5e25f29-7862-4f23-8f53-8fb4373a0672"}', method: "POST"})

    const EVADE_THE_DMCA_BAN_LENGTH = 2500;
    setTimeout(() => {
      // Well, stop it after 2.5 seconds...
      // Pause the player
      pauseSpotify();
    }, EVADE_THE_DMCA_BAN_LENGTH)
  }
//Only for Broadcaster only
  //if (flags.broadcaster && command == "pizza") {
    //new gifAlert(message, pizzaGif, magicChime, command);
 // }

  if (flags.broadcaster && command == "pause") {
    // Clear GIF queue and pause for PAUSE_DURATION
    queue.clear();
    queue.pause(PAUSE_DURATION);
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {
  console.log(user + ":", message);
};

const generateTitle = {
  lurk: " is lurking hard!",
  rage: " is raging with keiki",
  welcome: " needs a welcome!",
  hug: " sent keiki a hug!",
  panic: " is panicking with keiki",
  music: " stopped the music!"
};



const isOverflown = ({ clientHeight, scrollHeight }) => scrollHeight > clientHeight

const resizeText = ({ element, elements, minSize = 10, maxSize = 512, step = 1, unit = 'px' }) => {
  (elements || [element]).forEach(el => {
    let i = minSize
    let overflow = false

        const parent = el.parentNode

    while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`
        overflow = isOverflown(parent)

      if (!overflow) i += step
    }

    // revert to last state where no overflow happened
    el.style.fontSize = `${i - step}${unit}`
  })
}
resizeText({
  elements: document.querySelectorAll('.text-shadows'),
  step: 0.5
})



function gifAlert(user, gif, img, audio, type) {
  queue.add(async () => {
    audio.play();
    container.innerHTML = `
       <img class="bgImg bounce-animation" src="${bgImg}" />
      <img class="animated-gif bounce-animation" src="${gif}" />
      <div class="text-parent">
      <div class="text-container">
      <h1 class="text-shadows bounce-animation">${user + generateTitle[type]}</span></h1>
     </div>
    `;
    container.style.opacity = 1;

    await wait(DISPLAY_DURATION);

    if (!queue.isLooping) {
      container.style.opacity = 0;
    }

  });
}
