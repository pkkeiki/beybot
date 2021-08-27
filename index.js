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
const hugGif = "https://i.pinimg.com/originals/e6/36/47/e636479dafb6be4d4a6c23e2c52a42bf.gif";
const rageGif = "https://thumbs.gfycat.com/WeightyOfficialArgali-size_restricted.gif";

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
  music: " stopped the music!"
};







function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
let el = document.getElementByClassName('.text-shadows');
let fontSize = parseInt(el.style.fontSize);
for (let i = fontSize; i >= 0; i--) {
    let overflow = isOverflown(el);
    if (overflow) {
     fontSize--;
     el.style.fontSize = fontSize + "px";
    }
}





function gifAlert(user, gif, img, audio, type) {
  queue.add(async () => {
    audio.play();
    container.innerHTML = `
       <img class="bgImg bounce-animation" src="${bgImg}" />
      <img class="animated-gif bounce-animation" src="${gif}" />
      <h1 class="text-shadows bounce-animation" id="fittext">${user + generateTitle[type]}</h1>
    `;
    container.style.opacity = 1;

    await wait(DISPLAY_DURATION);

    if (!queue.isLooping) {
      container.style.opacity = 0;
    }

  });
}
