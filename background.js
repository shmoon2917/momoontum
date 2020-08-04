const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImage() {

}

function paintImage(imgNum) {
  const image = new Image();
  image.src = `images/${imgNum + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
  //image.addEventListener("loadend", handleImage);
  
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNum = genRandom();
  paintImage(randomNum);
}

init();