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

            if (currentPath !== "/") {
                window.location.href = `/#${targetId}`;
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

// const newsData = {
//     2024: [
//         {date: "May 4, 2024", title: "First Quarter Earnings 2024"},
//         {date: "May 1, 2024", title: "Annual Meeting and First Quarter Earnings Release Information"},
//         {date: "February 24, 2024", title: "Fourth Quarter Earnings 2023"},
//         {date: "February 20, 2024", title: "Annual Report Release Information"},
//         {date: "January 16, 2024", title: "Berkshire Hathaway Completes Acquisition of Remaining Interest in Pilot Travel Centers LLC"},
//         {date: "January 7, 2024", title: "Berkshire Hathaway Reaches Settlement with Pilot Corporation"},
//     ],
//     2023: [
//         {date: "November 28, 2023", title: "News Release"},
//         {date: "November 21, 2023", title: "News Release"},
//         {date: "November 4, 2023", title: "Third Quarter Earnings 2023"},
//         {date: "November 2, 2023", title: "Information Regarding Third Quarter Earnings Release"},
//         {date: "August 5, 2023", title: "Second Quarter Earnings 2023"},
//         {date: "August 3, 2023", title: "Information Regarding Second Quarter Earnings Release"},
//         {date: "June 21, 2023", title: "News Release"},
//         {date: "June 19, 2023", title: "News Release"},
//         {date: "May 15, 2023", title: "News Release"},
//         {date: "May 6, 2023", title: "First Quarter Earnings 2023"},
//         {date: "May 3, 2023", title: "Annual Meeting and First Quarter Earnings Release Information"},
//         {date: "April 27, 2023", title: "News Release"},
//         {date: "February 25, 2023", title: "Fourth Quarter Earnings 2022"},
//         {date: "February 21, 2023", title: "Annual Report Release Information"},
//     ],
//     2022: [
//         {date: "December 19, 2022", title: "News Release"},
//         {date: "November 18, 2022", title: "News Release"},
//         {date: "November 5, 2022", title: "Third Quarter Earnings 2022"},
//         {date: "November 3, 2022", title: "Information Regarding Third Quarter Earnings Release"},
//         {date: "October 19, 2022", title: "Berkshire Hathaway Completes Acquisition of Alleghany Corporation"},
//         {date: "October 14, 2022", title: "Alleghany Acquisition Expected to Close on October 19, 2022"},
//         {date: "August 6, 2022", title: "Second Quarter Earnings 2022"},
//         {date: "August 4, 2022", title: "Information Regarding Second Quarter Earnings Release"},
//         {date: "June 14, 2022", title: "News Release"},
//         {date: "April 30, 2022", title: "First Quarter Earnings 2022"},
//         {date: "April 26, 2022", title: "Annual Meeting and First Quarter Earnings Release Information"},
//         {date: "March 21, 2022", title: "Berkshire Hathaway to Acquire Alleghany Corporation"},
//         {date: "February 26, 2022", title: "Corrected Fourth Quarter 2021 Earnings Release"},
//         {date: "February 23, 2022", title: "Annual Report Release Information"},
//         {date: "February 14, 2022", title: "News Release"},
//         {date: "January 27, 2022", title: "Annual Meeting Information - Updated"},
//         {date: "January 25, 2022", title: "Annual Meeting Information"},
//     ],
//     2021: [
//         {date: "November 6, 2021", title: "Third Quarter Earnings 2021"},
//         {date: "November 4, 2021", title: "Information Regarding Third Quarter Earnings Release"},
//         {date: "October 20, 2021", title: "Susan Buffett and Christopher Davis Elected to Board of Directors"},
//         {date: "August 7, 2021", title: "Second Quarter Earnings 2021"},
//         {date: "August 5, 2021", title: "Information Regarding Second Quarter Earnings Release"},
//         {date: "June 23, 2021", title: "Comments by Warren E. Buffett in conjunction with his annual contribution of Berkshire Hathaway shares to five foundations"},
//         {date: "May 1, 2021", title: "First Quarter Earnings 2021"},
//         {date: "April 27, 2021", title: "Annual Meeting and First Quarter Earnings Release Information"},
//         {date: "March 15, 2021", title: "2021 Berkshire Hathaway Bracket Contest"},
//         {date: "February 27, 2021", title: "Fourth Quarter Earnings 2020"},
//         {date: "February 24, 2021", title: "Annual Report Release Information"},
//     ],
//     2020: [
//         {date: "December 3, 2020", title: "2021 Annual Meeting of Shareholders"},
//         {date: "November 7, 2020", title: "Third Quarter Earnings 2020"},
//         {date: "August 31, 2020", title: "Berkshire Hathaway acquires 5% passive stakes in each of five leading Japanese trading companies"},
//         {date: "August 8, 2020", title: "Second Quarter Earnings 2020"},
//         {date: "August 6, 2020", title: "Information Regarding Second Quarter Earnings Release"},
//         {date: "July 8, 2020", title: "News Release"},
//         {date: "May 2, 2020", title: "First Quarter Earnings 2020"},
//         {date: "April 27, 2020", title: "Annual Meeting and First Quarter Earnings Release Information"},
//         {date: "March 13, 2020", title: "News Release"},
//         {date: "March 4, 2020", title: "News Release"},
//         {date: "February 22, 2020", title: "Fourth Quarter Earnings 2019"},
//         {date: "February 20, 2020", title: "Annual Report Release Information"},
//     ],
//     2019: [
//         {date: "November 2, 2019", title: "Third Quarter Earnings Release"},
//         {date: "November 1, 2019", title: "Information Regarding Third Quarter Earnings Release"},
//         {date: "August 3, 2019", title: "Second Quarter Earnings 2019"},
//         {date: "August 1, 2019", title: "Information Regarding Second Quarter Earnings Release"},
//         {date: "July 1, 2019", title: "News Release"},
//         {date: "May 4, 2019", title: "First Quarter Earnings 2019"},
//         {date: "May 1, 2019", title: "News Release"},
//         {date: "February 23, 2019", title: "Fourth Quarter Earnings 2018"},
//         {date: "February 21, 2019", title: "Annual Report Release Information"},
//         {date: "February 11, 2019", title: "Big News for Small Business from Berkshire Hathaway"},
//     ],
//     2018: [
//         {date: "November 3, 2018", title: "Third Quarter Earnings 2018"},
//         {date: "August 13, 2018", title: "News Release"},
//         {date: "August 4, 2018", title: "Second Quarter Earnings 2018"},
//         {date: "August 2, 2018", title: "Information Regarding Second Quarter Earnings Release"},
//         {date: "July 17, 2018", title: "Berkshire Hathaway Amends Share Repurchase Program"},
//         {date: "July 16, 2018", title: "News Release"},
//         {
//             date: "June 20, 2018",
//             title: "Amazon, Berkshire Hathaway and JPMorgan Chase appoint Dr. Atul Gawande as Chief Executive Officer of their newly-formed company to address U.S. employee healthcare",
//         },
//         {date: "May 5, 2018", title: "First Quarter Earnings 2018"},
//         {date: "May 1, 2018", title: "First Quarter Earnings 2018"},
//         {date: "February 24, 2018", title: "Fourth Quarter Earnings 2017"},
//         {date: "February 22, 2018", title: "Annual Report Release Information"},
//         {date: "February 14, 2018", title: "Phillips 66 and Berkshire Hathaway Announce Share Repurchase Agreement"},
//         {date: "January 30, 2018", title: "Amazon, Berkshire Hathaway and JPMorgan Chase & Co. to partner on U.S. employee healthcare"},
//         {date: "January 10, 2018", title: "Greg Abel and Ajit Jain Elected to Board of Directors"},
//     ],
//     2017: [
//         {date: "November 3, 2017", title: "Third Quarter Earnings 2017"},
//         {date: "October 3, 2017", title: "Berkshire Hathaway Invests in Pilot Flying J"},
//         {date: "August 4, 2017", title: "Second Quarter Earnings 2017"},
//         {date: "July 10, 2017", title: "News Release"},
//         {date: "June 30, 2017", title: "News Release"},
//         {date: "May 5, 2017", title: "First Quarter Earnings 2017"},
//         {date: "May 4, 2017", title: "2017 Annual Meeting Information"},
//         {date: "April 12, 2017", title: "Information Pertaining to Wells Fargo Common Stock"},
//         {date: "March 20, 2017", title: "2017 Berkshire Hathaway Bracket Contest"},
//         {date: "February 25, 2017", title: "Fourth Quarter Earnings 2016"},
//         {date: "February 23, 2017", title: "Annual Report Release Information"},
//     ],
//     2016: [
//         {date: "November 4, 2016", title: "Third Quarter Earnings 2016"},
//         {date: "August 15, 2016", title: "News Release"},
//         {date: "August 5, 2016", title: "Second Quarter Earnings 2016"},
//         {date: "May 6, 2016", title: "News Release"},
//         {date: "April 30, 2016", title: "News Release"},
//         {date: "April 28, 2016", title: "Information Regarding 2016 Annual Shareholders Meeting"},
//         {date: "February 27, 2016", title: "News Release"},
//         {date: "February 25, 2016", title: "News Release"},
//         {date: "February 16, 2016", title: "Berkshire Hathaway 2016 Annual Shareholders Meeting to be Webcast"},
//         {date: "January 29, 2016", title: "Berkshire Hathaway Completes Acquisition of Precision Castparts"},
//         {date: "January 25, 2016", title: "Berkshire Hathaway Acquisition of Precision Castparts to Close on Friday, January 29, 2016"},
//     ],
//     2015: [
//         {date: "November 6, 2015", title: "Third Quarter Earnings 2015"},
//         {date: "August 10, 2015", title: "Berkshire Hathaway Inc. to Acquire Precision Castparts Corp."},
//         {date: "August 7, 2015", title: "Second Quarter Earnings 2015"},
//         {date: "July 6, 2015", title: "News Release"},
//         {date: "May 1, 2015", title: "First Quarter Earnings 2015"},
//         {date: "March 10, 2015", title: "News Release"},
//         {date: "February 28, 2015", title: "News Release"},
//         {date: "February 26, 2015", title: "Annual Report Release Information"},
//     ],
//     2014: [
//         {date: "December 12, 2014", title: "Berkshire Hathaway Completes Investment in Restaurant Brands International Inc."},
//         {date: "December 12, 2014", title: "Berkshire Hathaway acquires Charter Brokerage"},
//         {date: "November 13, 2014", title: "Berkshire Hathaway to acquire the Duracell battery business from Procter & Gamble"},
//         {date: "November 7, 2014", title: "Third Quarter Earnings 2014"},
//         {date: "October 2, 2014", title: "Berkshire Hathaway to acquire Van Tuyl Group"},
//         {date: "September 5, 2014", title: "News Release"},
//         {date: "August 20, 2014", title: "Statement by Warren E. Buffett"},
//         {date: "August 1, 2014", title: "Second Quarter Earnings 2014"},
//         {date: "July 1, 2014", title: "Berkshire Completes Acquisition of WPLG-TV from Graham Holdings"},
//         {date: "May 2, 2014", title: "First Quarter Earnings 2014"},
//         {date: "April 11, 2014", title: "Agreement Signed to Acquire WPLG-TV from Graham Holdings"},
//         {date: "March 12, 2014", title: "Agreement Reached to Acquire WPLG-TV from Graham Holdings"},
//         {date: "March 1, 2014", title: "News Release"},
//         {date: "February 27, 2014", title: "Annual Report Release Information"},
//     ],
//     2013: [
//         {date: "December 30, 2013", title: "Berkshire Hathaway to Acquire Flow Improver Business from Phillips 66"},
//         {date: "November 1, 2013", title: "Third Quarter Earnings 2013"},
//         {date: "October 31, 2013", title: "News Release"},
//         {date: "August 2, 2013", title: "Second Quarter Earnings 2013"},
//         {date: "July 8, 2013", title: "News Release"},
//         {date: "June 13, 2013", title: "Berkshire Hathaway Introduces Berkshire Hathaway Specialty Insurance"},
//         {date: "May 3, 2013", title: "First Quarter Earnings 2013"},
//         {date: "May 1, 2013", title: "Berkshire Hathaway to Acquire Balance of IMC International Metalworking Companies"},
//         {date: "March 1, 2013", title: "News Release"},
//         {date: "February 27, 2013", title: "Annual Report Release Information"},
//         {date: "February 14, 2013", title: "H.J. Heinz Company Enters Into Agreement to Be Acquired by Berkshire Hathaway and 3G Capital"},
//     ],
//     2012: [
//         {date: "December 12, 2012", title: "News Release"},
//         {date: "November 2, 2012", title: "Third Quarter Earnings 2012"},
//         {date: "November 2, 2012", title: "Berkshire Hathaway to Acquire Oriental Trading Company"},
//         {date: "August 30, 2012", title: "Warren Buffett Pledges an Additional $3 Billion of Berkshire Hathaway Stock to His Three Children’s Foundations"},
//         {date: "August 3, 2012", title: "Second Quarter Earnings 2012"},
//         {date: "May 4, 2012", title: "First Quarter Earnings 2012"},
//         {date: "April 17, 2012", title: "Press Release"},
//         {date: "February 23, 2012", title: "Press Release"},
//     ],
//     2011: [
//         {date: "November 30, 2011", title: "Berkshire Hathaway to Acquire Omaha World-Herald Company"},
//         {date: "November 4, 2011", title: "Third Quarter Earnings 2011"},
//         {date: "September 26, 2011", title: "Berkshire Hathaway Authorizes Repurchase Program"},
//         {date: "September 16, 2011", title: "Berkshire Hathaway Completes Acquisition of Lubrizol"},
//         {date: "September 14, 2011", title: "Berkshire Hathaway Acquisition of Lubrizol Scheduled to Close on Friday, September 16, 2011"},
//         {date: "September 12, 2011", title: "Berkshire Hathaway to Add Second Investment Manager"},
//         {date: "August 30, 2011", title: "Press Release"},
//         {date: "August 5, 2011", title: "Second Quarter Earnings 2011"},
//         {date: "June 24, 2011", title: "Wesco Merger Closing"},
//         {date: "June 23, 2011", title: "Wesco Merger Consideration"},
//         {date: "May 6, 2011", title: "First Quarter Earnings 2011"},
//         {date: "April 30, 2011", title: "Preliminary First Quarter Earnings Information"},
//         {date: "March 30, 2011", title: "Berkshire Hathaway Announces the Resignation of David L. Sokol"},
//         {date: "March 14, 2011", title: "Berkshire Hathaway to Acquire Lubrizol"},
//         {date: "February 23, 2011", title: "Press Release"},
//         {date: "February 7, 2011", title: "Berkshire Hathaway Inc. to Acquire Outstanding Common Stock of Wesco Financial Corporation Not Presently Owned"},
//     ],
//     2010: [
//         {date: "November 5, 2010", title: "Third Quarter Earnings 2010"},
//         {date: "October 25, 2010", title: "Todd Combs to Join Berkshire Hathaway"},
//         {date: "August 6, 2010", title: "Second Quarter Earnings 2010"},
//         {date: "May 7, 2010", title: "First Quarter Earnings 2010"},
//         {date: "May 1, 2010", title: "Preliminary First Quarter After-Tax Earnings Information"},
//         {date: "April 23, 2010", title: "McLane Company Completes Acquisition of Kahn Ventures, Inc."},
//         {date: "March 22, 2010", title: "McLane Company To Acquire Kahn Ventures, Inc."},
//         {date: "February 24, 2010", title: "2009 Annual Report Release Information"},
//         {date: "February 12, 2010", title: "Berkshire And BNSF Close Merger And Berkshire Reports Final Election Results"},
//         {date: "February 11, 2010", title: "Shareholders Approve BNSF Transaction with Berkshire Hathaway"},
//         {date: "February 11, 2010", title: "BNSF Preliminary Election Results"},
//         {date: "February 10, 2010", title: "BNSF Merger Consideration Election Deadline Expires"},
//         {date: "February 4, 2010", title: "BNSF Election Deadline Announcement"},
//         {date: "January 28, 2010", title: "Press Release"},
//         {date: "January 20, 2010", title: "Berkshire Hathaway Inc. Shareholders Approve 50-for-1 Split of Its Class B Common Stock"},
//         {date: "January 5, 2010", title: "Press Release"},
//     ],
//     2009: [
//         {date: "December 22, 2009", title: "Stephen Burke Elected to Board of Directors"},
//         {date: "December 7, 2009", title: "FTC Clearance Received for Burlington Northern Santa Fe Acquisition"},
//         {date: "November 6, 2009", title: "Third Quarter Earnings 2009"},
//         {date: "November 3, 2009", title: "Berkshire Hathaway To Acquire Burlington Northern Santa Fe Corporation"},
//         {date: "November 3, 2009", title: "Berkshire Hathaway Board Approves 50-for-1 Class B Common Stock Split"},
//         {date: "August 24, 2009", title: "Registered Exchange Offer Extended to August 28th, 2009"},
//         {date: "August 17, 2009", title: "Registered Exchange Offer Extended"},
//         {date: "August 7, 2009", title: "Second Quarter Earnings 2009"},
//         {date: "July 17, 2009", title: "Registered Exchange Offers Commenced"},
//         {date: "May 8, 2009", title: "First Quarter Earnings 2009"},
//         {date: "April 29, 2009", title: "First Quarter 2009 Interim Report Release Information"},
//         {date: "April 6, 2009", title: "News Release"},
//         {date: "February 25, 2009", title: "2008 Annual Report Release Information"},
//     ],
//     2008: [
//         {date: "November 24, 2008", title: "Registered Exchange Offer Extended"},
//         {date: "November 7, 2008", title: "Third Quarter Earnings 2008"},
//         {date: "October 23, 2008", title: "Registered Exchange Offer Commenced"},
//         {date: "August 8, 2008", title: "Second Quarter Earnings 2008"},
//         {date: "May 28, 2008", title: "Registered Exchange Offer Extended"},
//         {date: "May 2, 2008", title: "First Quarter Earnings 2008"},
//         {date: "April 28, 2008", title: "Registered Exchange Offer Commenced"},
//         {date: "April 14, 2008", title: "News Release"},
//         {date: "March 18, 2008", title: "Acquisition of 60% of Marmon Holdings, Inc. Completed"},
//         {date: "February 29, 2008", title: "Year End Earnings 2007"},
//         {date: "February 27, 2008", title: "2007 Annual Report Release Information"},
//         {date: "February 5, 2008", title: "Registered Exchange Offer Commenced"},
//     ],
//     2007: [
//         {date: "December 25, 2007", title: "Marmon Holdings, Inc. to be Acquired"},
//         {date: "November 2, 2007", title: "Third Quarter Earnings 2007"},
//         {date: "September 12, 2007", title: "Registered Exchange Offer Extended"},
//         {date: "August 14, 2007", title: "Registered Exchange Offer Commenced"},
//         {date: "August 3, 2007", title: "Second Quarter Earnings 2007"},
//         {date: "July 9, 2007", title: "News Release"},
//         {date: "May 18, 2007", title: "Bel-Oro International and Aurafin to be Acquired"},
//         {date: "May 4, 2007", title: "First Quarter Earnings 2007"},
//         {date: "May 4, 2007", title: "Information Regarding the Remarketing of 3% Senior Notes due 2007"},
//         {date: "March 1, 2007", title: "Year End Earnings 2006"},
//         {date: "February 26, 2007", title: "2006 Annual Report Release Information"},
//     ],
//     2006: [
//         {date: "December 22, 2006", title: "TTI, Inc. to be Acquired"},
//         {date: "November 3, 2006", title: "Third Quarter Earnings 2006"},
//         {date: "November 2, 2006", title: "Third Quarter 2006 Interim Report Release Information"},
//         {date: "October 20, 2006", title: "Equitas to Acquire up to $7 Billion of Additional Reinsurance Protection from National Indemnity Company"},
//         {date: "August 3, 2006", title: "Second Quarter 2006 Interim Report Release Information"},
//         {date: "July 5, 2006", title: "Iscar Metalworking Companies Acquisition Completed"},
//         {date: "June 25, 2006", title: "Pledges of Warren Buffett to Make Gifts of Berkshire Stock"},
//         {date: "June 1, 2006", title: "Termination of Hart-Scott-Rodino Waiting Period for Russell Corporation Acquisition"},
//         {date: "May 22, 2006", title: "Applied Underwriters Acquisition Completed"},
//         {date: "May 5, 2006", title: "Iscar Metalworking Companies to be Acquired"},
//         {date: "May 4, 2006", title: "First Quarter 2006 Interim Report Release Information"},
//         {date: "April 17, 2006", title: "Russell Corporation to be Acquired"},
//         {date: "March 1, 2006", title: "Business Wire Acquisition Completed"},
//         {date: "February 27, 2006", title: "2005 Annual Report Release Information"},
//         {date: "February 8, 2006", title: "Applied Underwriters Inc. to be Acquired"},
//         {date: "January 17, 2006", title: "Business Wire to be Acquired"},
//     ],
//     2005: [
//         {date: "November 3, 2005", title: "Third Quarter 2005 Interim Report Release Information"},
//         {date: "October 7, 2005", title: "Press Release"},
//         {date: "September 19, 2005", title: "Impact from Hurricane Katrina"},
//         {date: "September 9, 2005", title: "Press Release"},
//         {date: "September 9, 2005", title: "Press Release"},
//         {date: "August 26, 2005", title: "Registered Exchange Offers Commence"},
//         {date: "August 8, 2005", title: "Press Release Regarding Second Quarter 2005 10-Q"},
//         {date: "August 4, 2005", title: "Second Quarter 2005 Interim Report Release Information"},
//         {date: "July 20, 2005", title: "Forest River to be Acquired"},
//         {date: "July 1, 2005", title: "Medical Protective Corporation Acquisition Completed"},
//         {date: "June 20, 2005", title: "Registered Exchange Offers Extended"},
//         {date: "June 10, 2005", title: "Press Release"},
//         {date: "June 6, 2005", title: "Press Release"},
//         {date: "May 23, 2005", title: "Registered Exchange Offers Commence"},
//         {date: "May 20, 2005", title: "Press Release"},
//         {date: "May 6, 2005", title: "Medical Protective Corporation to be Acquired from GE"},
//         {date: "May 5, 2005", title: "First Quarter 2005 Interim Report Release Information"},
//         {date: "March 29, 2005", title: "Press Release"},
//         {date: "March 3, 2005", title: "2004 Annual Report Release Information"},
//         {date: "February 7, 2005", title: "Registered Exchange Offers Extended"},
//         {date: "January 7, 2005", title: "Registered Exchange Offers Commence"},
//         {date: "January 6, 2005", title: "General Re Receives Subpoena from New York State Attorney General"},
//     ],
//     2004: [
//         {date: "December 30, 2004", title: "General Re Receives Information Request from SEC"},
//         {date: "December 14, 2004", title: "Bill Gates Elected as Director of Berkshire Hathaway"},
//         {date: "November 5, 2004", title: "Third Quarter Earnings 2004"},
//         {date: "October 16, 2004", title: "Registered Exchange Offer Extended"},
//         {date: "September 17, 2004", title: "Registered Exchange Offers Commence"},
//         {date: "September 13, 2004", title: "Write-off of MidAmerican's Zinc Recovery Project"},
//         {date: "August 9, 2004", title: "SEC Form 8-K Regarding the Estate of Susan T. Buffett"},
//         {date: "August 6, 2004", title: "Second Quarter Earnings 2004"},
//         {date: "July 29, 2004", title: "Press Release"},
//         {date: "July 29, 2004", title: "Press Release"},
//         {date: "May 6, 2004", title: "First Quarter 2004 Interim Report Release Information"},
//         {date: "April 23, 2004", title: "Registered Exchange Offer Extended"},
//         {date: "April 6, 2004", title: "Registered Exchange Offer Commences"},
//         {date: "March 26, 2004", title: "Registered Exchange Offers Commence"},
//         {date: "March 4, 2004", title: "2003 Annual Report Release Information"},
//     ],
//     2003: [
//         {date: "November 7, 2003", title: "Third Quarter Earnings 2003"},
//         {date: "November 3, 2003", title: "Board of Directors Increased to Eleven"},
//         {date: "August 8, 2003", title: "Second Quarter Earnings 2003"},
//         {date: "August 7, 2003", title: "Clayton Homes, Inc. Acquisition Completed"},
//         {date: "July 15, 2003", title: "Information Regarding Pending Acquisition of Clayton Homes, Inc."},
//         {date: "July 3, 2003", title: "Shareholder-Designated Contributions Program Terminated"},
//         {date: "May 8, 2003", title: "First Quarter 2003 Interim Report Release Information"},
//         {date: "May 8, 2003", title: "Board of Directors Increased to Nine"},
//         {date: "May 4, 2003", title: "2003 Annual Meeting Information"},
//         {date: "May 2, 2003", title: "McLane Company to be Acquired"},
//         {date: "April 1, 2003", title: "Clayton Homes, Inc. to be Acquired"},
//         {date: "March 6, 2003", title: "2002 Annual Report Release Information"},
//         {date: "February 11, 2003", title: "Burlington Industries to be Acquired"},
//     ],
//     2002: [
//         {date: "November 8, 2002", title: "Third Quarter Earnings 2002"},
//         {date: "October 31, 2002", title: "Pampered Chef and CTB International Corp. Acquisitions Completed"},
//         {date: "September 23, 2002", title: "Pampered Chef to be Acquired"},
//         {date: "September 4, 2002", title: "Garan, Incorporated Acquisition Completed"},
//         {date: "August 19, 2002", title: "CTB International Corp. to be Acquired"},
//         {date: "August 15, 2002", title: "Berkshire Hathaway Files Registration Statement on Form S-3"},
//         {date: "August 9, 2002", title: "Second Quarter Earnings 2002"},
//         {date: "July 2, 2002", title: "Garan, Incorporated To Be Acquired"},
//         {date: "May 22, 2002", title: "Berkshire Hathaway Issues First Ever Negative Coupon Security"},
//         {date: "May 21, 2002", title: "Berkshire Hathaway to Issue First Ever Negative Coupon Security"},
//         {date: "May 10, 2002", title: "First Quarter Earnings 2002"},
//         {date: "May 6, 2002", title: "2002 Annual Meeting Information"},
//         {date: "April 30, 2002", title: "Acquisition of Fruit of the Loom Apparel Business Completed"},
//         {date: "March 7, 2002", title: "2001 Annual Report Release Information"},
//         {date: "February 8, 2002", title: "Albecca Acquisition Completed"},
//         {date: "February 5, 2002", title: "Press Release"},
//         {date: "January 21, 2002", title: "Berkshire Acquires Additional 12.7% Interest in Shaw Industries, Inc."},
//     ],
//     2001: [
//         {date: "December 17, 2001", title: "Albecca to be Acquired"},
//         {date: "November 9, 2001", title: "Fruit of the Loom's Apparel Business to be Acquired"},
//         {date: "September 20, 2001", title: "XTRA Corporation Acquisition Completed"},
//         {date: "September 20, 2001", title: "Press Release"},
//         {date: "September 18, 2001", title: "Press Release"},
//         {date: "September 17, 2001", title: "Termination of Tender Offer for Finova Group Notes"},
//         {date: "September 17, 2001", title: "Cash Tender Offer for XTRA Corporation Successfully Completed"},
//         {date: "September 12, 2001", title: "Press Release"},
//         {date: "September 11, 2001", title: "XTRA Corporation Tender Offer Extended"},
//         {date: "August 10, 2001", title: "Second Quarter Earnings 2001"},
//         {date: "July 31, 2001", title: "XTRA Corporation to be Acquired"},
//         {date: "June 12, 2001", title: "Acquisition of MiTek Inc."},
//         {date: "May 11, 2001", title: "First Quarter Earnings 2001"},
//         {date: "March 7, 2001", title: "2000 Annual Report Release Information"},
//         {date: "February 27, 2001", title: "Johns Manville Acquisition Completed"},
//         {date: "February 27, 2001", title: "FINOVA Group Inc. Announces Agreement with Berkshire Hathaway Inc. and Leucadia National Corporation"},
//         {date: "February 24, 2001", title: "Cash Tender Offer for Johns Manville Successfully Completed"},
//         {date: "February 14, 2001", title: "Johns Manville Tender Offer Extended"},
//         {date: "January 29, 2001", title: "Johns Manville Tender Offer Extended"},
//         {date: "January 2, 2001", title: "Benjamin Moore & Co. Acquisition Completed"},
//     ],
// };7

// const pre2001News = [
//     {date: "December 20, 2000", title: "Johns Manville to be Acquired"},
//     {date: "December 18, 2000", title: "Cash Tender Offer for Benjamin Moore Successfully Completed"},
//     {date: "December 7, 2000", title: "FTC and Canadian Competition Bureau Clearance for Benjamin Moore Acquisition"},
//     {date: "November 10, 2000", title: "Third Quarter Earnings 2000"},
//     {date: "November 8, 2000", title: "Benjamin Moore To Be Acquired"},
//     {date: "October 20, 2000", title: "Shaw Industries Merger Agreement"},
//     {date: "September 6, 2000", title: "Shaw Industries Purchase Offer"},
//     {date: "August 11, 2000", title: "Second Quarter Earnings 2000"},
//     {date: "August 1, 2000", title: "Justin Industries Acquisition Completed"},
//     {date: "July 26, 2000", title: "Cash Tender Offer for Justin Industries Successfully Completed"},
//     {date: "July 25, 2000", title: "Press release"},
//     {date: "June 21, 2000", title: "Press release"},
//     {date: "June 20, 2000", title: "Justin Industries To Be Acquired"},
//     {date: "May 18, 2000", title: "Acquisition of Ben Bridge Jeweler"},
//     {date: "May 12, 2000", title: "First Quarter Earnings 2000"},
//     {date: "March 8, 2000", title: "1999 Annual Report Release Information"},
//     {date: "March 3, 2000", title: "Wesco Financial Corporation Completes Acquisition of CORT Business Services Corporation"},
//     {date: "February 18, 2000", title: "Wesco Financial Corporation Subsidiary Completes Tender Offer For CORT Business Services Corporation"},
//     {date: "February 10, 2000", title: "Press Release"},
//     {date: "January 21, 2000", title: "Wesco Financial Corporation Subsidiary Commences Tender Offer For CORT Business Services Corporation"},
//     {date: "January 14, 2000", title: "Wesco Financial Corporation to Acquire CORT Business Services Corporation"},
//     {date: "December 27, 1999", title: "Donation of Class A Common Stock by Warren and Susan Buffett"},
//     {date: "November 12, 1999", title: "Third Quarter Earnings 1999"},
//     {date: "October 25, 1999", title: "Berkshire Hathaway, Walter Scott and David Sokol to Acquire MidAmerican Energy Holdings"},
//     {date: "October 11, 1999", title: "Acquisition of Jordan's Furniture"},
//     {date: "August 13, 1999", title: "Second Quarter Earnings 1999"},
//     {date: "May 14, 1999", title: "First Quarter Earnings 1999"},
//     {date: "March 9, 1999", title: "Year End Earnings 1998"},
//     {date: "December 23, 1998", title: "Clarification of General Re Election Procedures"},
//     {date: "December 21, 1998", title: "Berkshire and General Re Close Merger"},
//     {date: "December 17, 1998", title: "Berkshire and General Re to Close Merger"},
//     {date: "November 12, 1998", title: "Third Quarter Earnings 1998"},
//     {date: "August 3, 1998", title: "Second Quarter Earnings 1998"},
//     {date: "July 23, 1998", title: "Executive Jet, Inc. Acquired"},
//     {date: "June 19, 1998", title: "General Re Corporation Merger"},
//     {date: "May 14, 1998", title: "First Quarter Earnings 1998"},
//     {date: "March 14, 1998", title: "CORRECTION: 1997 Chairman's Letter Update"},
//     {date: "March 11, 1998", title: "Year End Earnings 1997"},
//     {date: "February 3, 1998", title: "Investment in US Airways Series H Preferred Stock"},
//     {date: "February 3, 1998", title: "Investment In Silver"},
//     {date: "January 5, 1998", title: "International Dairy Queen, Inc. Acquired"},
//     {date: "November 14, 1997", title: "Third Quarter Earnings 1997"},
//     {date: "October 21, 1997", title: "International Dairy Queen, Inc. Merger"},
//     {date: "August 14, 1997", title: "Second Quarter Earnings 1997"},
//     {date: "August 5, 1997", title: "Board of Directors Increased to Seven"},
//     {date: "June 24, 1997", title: "Star Furniture Co. Merger"},
//     {date: "May 14, 1997", title: "First Quarter Earnings 1997"},
//     {date: "May 8, 1997", title: "US Airways Announcement"},
//     {date: "March 6, 1997", title: "Year End Earnings 1996"},
//     {date: "November 11, 1996", title: "Third Quarter Earnings 1996"},
//     {date: "August 14, 1996", title: "Second Quarter Earnings 1996"},
//     {date: "May 15, 1996", title: "First Quarter Earnings 1996"},
// ];

// // Function to get news data for a specific year
// function getNewsDataForYear(year) {
//     return newsData[year] || [];
// }

// function displayNews() {
//     const yearDropdown = document.getElementById("year-dropdown");
//     const selectedYear = parseInt(yearDropdown.value);

//     let newsList = document.getElementById("news-list");
//     newsList.innerHTML = ""; // Clear previous news

//     let newsArray = [];

//     if (selectedYear === 2000) {
//         newsArray = pre2001News;
//     } else {
//         newsArray = newsData[selectedYear] || [];
//     }

//     newsArray.forEach((news) => {
//         let listItem = document.createElement("li");
//         listItem.textContent = `${news.date}: ${news.title}`;
//         newsList.appendChild(listItem);
//     });
// }

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
