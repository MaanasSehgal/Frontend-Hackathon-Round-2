function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.set(".active-home", {
        display: "none",
    });

    tl.to(".loading-screen", {
        duration: 0.5,
        bottom: "15vh",
        ease: "Power4.easeIn",
        // markers: true,
    });

    tl.to(".loading-screen", {
        duration: 1,
        // height: "100vh",
        bottom: "200vh",
        borderRadius: "50%",
        ease: "Power4.easeIn",
        delay: 0.1,
    });

    // tl.to(".loading-screen", {
    //   duration: 1,
    //   height: "100%",
    //   bottom: "100%",
    //   ease: "Expo.easeInOut",
    //   // delay: 0.3,
    // });
    tl.set(".loading-screen", {
        bottom: "-100vh",
        borderRadius: "50%",
    });
}

function contentAnimation() {
    var tl = gsap.timeline();
    tl.from(".animate-this", {duration: 0.5, y: 5, opacity: 0, stagger: 0.4, delay: 0.2});
}

// barba.hooks.beforeEnter((data) => {
//     // JS functions here
//     const newScript = document.createElement("script");
//     newScript.src = "../js/scroll.js";
//     newScript.async = true;
//     document.head.append(newScript);

//     let namespace = data.next.namespace;
//     console.log(href);
//     switch (namespace) {
//         case "Diversity":
//         case "privacy-policy":
//             const newStyle = document.createElement("link");
//             newStyle.setAttribute("rel", "stylesheet");
//             newStyle.setAttribute("href", "../css/Privacy.css");
//             newScript.async = true;
//             document.head.append(newStyle);
//             break;
//     }
// });

$(function () {
    barba.init({
        sync: true,

        transitions: [
            {
                async beforeLeave(data) {
                    const done = this.async();
                    pageTransition();
                    await delay(1000);
                    done();
                },

                async enter(data) {
                    await delay(200);
                    location.reload();
                    // gsap.timeline().set(".active", {
                    //   display: "block",
                    // })
                    // contentAnimation();
                },

                async once(data) {
                    // contentAnimation();
                },
            },
        ],
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.utils.toArray(".page").forEach((page) => {
//         gsap.from(page, {
//             scrollTrigger: {
//                 trigger: page,
//                 start: "top 80%",
//                 end: "bottom 60%",
//                 toggleActions: "play none none reverse",
//             },
//             duration: 1,
//             opacity: 0,
//             y: 50,
//             ease: "power3.out",
//         });
//     });
// }); gsap.registerPlugin(ScrollTrigger);

gsap.from(".category", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".category",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        once: true,
    },
});

gsap.from(".styled-link", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".links",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        once: true,
    },
});
document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector("[data-barba='container']");
    const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    document.querySelectorAll("a[data-scroll-to]").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("data-scroll-to");
            const currentPath = window.location.pathname;

            if (currentPath !== "/Frontend-Hackathon-Round-2/") {
                window.location.href = `/Frontend-Hackathon-Round-2/#${targetId}`;
            } else {
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const targetPosition = targetSection.getBoundingClientRect().top;
                    const scrollContainerPosition = scrollContainer.getBoundingClientRect().top;
                    const offset = targetPosition - scrollContainerPosition - (window.innerHeight / 2 - targetSection.offsetHeight / 2);

                    locoScroll.scrollTo(offset);
                }
            }
        });
    });

    // Handle deep linking when arriving on the home page with a hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            locoScroll.scrollTo(targetSection);
        }
    }
});

const sidebarLinks = document.querySelectorAll(".sidebar-link");
const newsYears = document.querySelectorAll(".news-year");

sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const year = event.target.dataset.year;
        sidebarLinks.forEach((link) => link.classList.remove("active"));
        event.target.classList.add("active");

        newsYears.forEach((newsYear) => {
            if (newsYear.id === `news-${year}`) {
                newsYear.style.display = "block";
            } else {
                newsYear.style.display = "none";
            }
        });
    });
});
