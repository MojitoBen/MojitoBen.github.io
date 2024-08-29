function showContent(contentId) {
    var targetSection = document.getElementById(contentId);

    if (!targetSection) {
        console.error("Element not found:", contentId);
        return;
    }

    var sections = document.querySelectorAll("section");
    sections.forEach(function(section) {
        if (section === targetSection) {
            fadeIn(section);
        } else {
            section.style.display = "none";
        }
    });
}

function fadeIn(element) {
    element.style.display = "block";
    element.style.opacity = 0;
    
    var start = null;
    var duration = 500;

    function animate(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var opacity = progress / duration;
        
        if (opacity >= 1) {
            element.style.opacity = 1;
        } else {
            element.style.opacity = opacity;
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function updateTime() {
    const timeElement = document.getElementById("time");
    if (!timeElement) {
        console.error("Element not found: time");
        return;
    }
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    timeElement.textContent = "現在時間: " + formattedTime;
}

setInterval(updateTime, 1000);
updateTime();
