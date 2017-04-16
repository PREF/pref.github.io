var SLIDE_CAPTIONS = [ "Slide 1", "Slide 2", "Slide 3", "Slide 4" ];
var SLIDE_COUNT = 4;
var currentSlide = 1;

function plusSlides(i) {
  showSlide(currentSlide += i);
}

function addSlide(slideshow, i, image) {
    var slide = document.createElement("div");
    slide.className = "slide fade";
    slide.style.textAlign = "center";

    var slideimg = document.createElement("img");
    slideimg.src = image + "/" + i.toString() + ".png";
    slideimg.style.maxWidth = "90%";
    slideimg.style.height = "auto";

    var slidecaption = document.createElement("div");
    slidecaption.className = "slide_caption";

    if(i <= SLIDE_CAPTIONS)
        slidecaption.innerHTML = SLIDE_CAPTIONS[i - 1];
    
    slide.appendChild(slideimg);
    slide.appendChild(slidecaption);
    slideshow.appendChild(slide);
    addDot();
}

function addButtons(slideshow) {
    var prevbtn = document.createElement("a");
    prevbtn.className = "previous";
    prevbtn.innerHTML = "&#10094;";
    prevbtn.onclick = function() { plusSlides(-1); };

    var nextbtn = document.createElement("a");
    nextbtn.className = "next";
    nextbtn.innerHTML = "&#10095;";
    nextbtn.onclick = function() { plusSlides(1); };

    slideshow.appendChild(prevbtn);
    slideshow.appendChild(nextbtn);
}

function addDot() {
    var dots = document.getElementById("dots");

    var dot = document.createElement("span");
    dot.className = "dot";
    dot.setAttribute("slide-index", dots.childElementCount);
    dot.onclick = function(e) { showSlide(parseInt(e.target.getAttribute("slide-index"))); };
    
    dots.appendChild(dot);
}

function showSlide(idx) {
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");

    if(idx > slides.length)
        idx = 1;
    else if(idx < 1)
        idx = slides.length;

    for(var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace("active", "");
    }

    slides[idx - 1].style.display = "block";
    dots[idx - 1].className += " active";
}

function completeSlideshow(slideshow) {
    slideshow.style.padding = "10px 0 0 0";
    slideshow.style.backgroundColor = "black";

    var dots = document.createElement("div");
    dots.id = "dots";
    dots.style.textAlign = "center";
    slideshow.parentNode.appendChild(dots);

    dots.style.padding = "0 0 10px 0";
    dots.style.backgroundColor = "black";
}

function slideshow(slides) {
    var slideshow = document.getElementById("slideshow_container");

    if(slideshow === null) {
        console.error("Slideshow element not found");
        return;
    }

    completeSlideshow(slideshow);

    if(SLIDE_COUNT <= 0)
    {
        console.warn("No slides");
        return;
    }

    for(var i = 1; i <= SLIDE_COUNT; i++)
        addSlide(slideshow, i, slides);

    addButtons(slideshow);
    showSlide(currentSlide);
}