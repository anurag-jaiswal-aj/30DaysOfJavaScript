const ImgBox = document.querySelector(".img-box");
const imgWrap = document.querySelector(".img-wrap");
const originalImg = document.getElementById("originalImg");
const line = document.getElementById("line");

originalImg.style.width = ImgBox.offsetWidth + "px";

const leftSpace = ImgBox.offsetLeft;

ImgBox.addEventListener("mousemove", (e) => {
    const boxWidth = (e.pageX - leftSpace) + "px";
    imgWrap.style.width = boxWidth;
    line.style.left = boxWidth;
});
