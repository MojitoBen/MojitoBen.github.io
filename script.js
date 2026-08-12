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

function showContent(contentId) {
    var targetSection = document.getElementById(contentId);

    if (!targetSection) {
        console.error("Element not found:", contentId);
        return;
    }

    document.querySelectorAll("section").forEach(function (section) {
        if (section === targetSection) {
            section.classList.add("active");
            fadeIn(section);
        } else {
            section.classList.remove("active");
            section.style.display = "none";
        }
    });

    document.querySelectorAll(".nav ul button").forEach(function (button) {
        button.classList.toggle("active", button.dataset.target === contentId);
    });
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

document.addEventListener("DOMContentLoaded", function () {
    // 導覽按鈕
    document.querySelectorAll(".nav ul button").forEach(function (button) {
        button.addEventListener("click", function () {
            showContent(button.dataset.target);
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });

    // 手機版漢堡選單
    var navToggle = document.getElementById("navToggle");
    var navMenu = document.getElementById("navMenu");
    navToggle.addEventListener("click", function () {
        var isOpen = navMenu.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // 回到頂部按鈕
    var backToTopButton = document.getElementById("backToTop");
    window.addEventListener("scroll", function () {
        var scrolled = document.body.scrollTop || document.documentElement.scrollTop;
        backToTopButton.style.display = scrolled > 200 ? "flex" : "none";
    });
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 預設顯示首頁並標記導覽按鈕狀態
    showContent("first-page");
});

setInterval(updateTime, 1000);
updateTime();
