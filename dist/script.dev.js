"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var themeToggleButton = document.getElementById('theme-toggle-btn');
  var startTestNavBtn = document.getElementById('nav-btn');
  var startTestHeroBtn = document.getElementById('hero-btn');
  var startTestCtaBtn = document.getElementById('cta-btn');
  var body = document.body;
  var icon = themeToggleButton.querySelector('i');
  var searchInput = document.getElementById('searchInput');
  var cardContainer = document.getElementById('cardContainer');
  var statisticsSection = document.getElementById('statistics-section');
  var testsSection = document.getElementById('tests-section');
  var footerSection = document.getElementById('footer-section');
  var savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light-mode') {
    body.classList.add('light-mode');
    icon.classList.remove('bi-moon');
    icon.classList.add('bi-sun');
  } // Mobil menyuni ochish/yopish logikasi (script.js ichiga)
  // script.js ichida:


  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileNavContainer = document.getElementById('mobile-nav-container');

  if (hamburgerBtn && mobileNavContainer) {
    hamburgerBtn.addEventListener('click', function () {
      mobileNavContainer.classList.toggle('active'); // --- MUAMMOLARNI HAL QILUVCHI QISM ---

      var icon = hamburgerBtn.querySelector('i');
      icon.classList.toggle('bi-list'); // bi-list ni o'chiradi

      icon.classList.toggle('bi-x'); // bi-x ni qo'shadi (yoki aksincha)
      // -------------------------------------
    });
  } //////////////////////////////////// 


  var allStartButtons = [startTestNavBtn, startTestHeroBtn, startTestCtaBtn];
  allStartButtons.forEach(function (button) {
    if (button && testsSection) {
      button.addEventListener('click', function () {
        testsSection.scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  }); //////////////////////////////////////////////

  document.querySelectorAll('nav a').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var linkText = this.textContent.trim();
      var targetElement = null;

      if (linkText === 'Asosiy') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else if (linkText === 'Testlar' && testsSection) {
        e.preventDefault();
        targetElement = testsSection;
      } else if (linkText === 'Natijalar' && statisticsSection) {
        e.preventDefault();
        targetElement = statisticsSection;
      } else if (linkText === 'Bog\'lanish' && footerSection) {
        e.preventDefault();
        targetElement = footerSection;
      }

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }

      if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
    });
  });
  document.querySelectorAll('footer a').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();
        var targetId = href.substring(1);
        var targetElement = null;

        if (targetId === 'home') {
          targetElement = document.documentElement;
        } else if (targetId === 'tests' && testsSection) {
          targetElement = testsSection;
        } else if (targetId === 'statistics' && statisticsSection) {
          targetElement = statisticsSection;
        } else if (targetId === 'about' && footerSection) {
          targetElement = footerSection;
        }

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  }); ///////////////////////////////////////////////

  themeToggleButton.addEventListener('click', function () {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-sun');
      localStorage.setItem('theme', 'light-mode');
    } else {
      icon.classList.remove('bi-sun');
      icon.classList.add('bi-moon');
      localStorage.setItem('theme', 'dark-mode');
    }
  }); //////////////////////////////////////////////

  var testsData = [{
    title: "So'z boyligi",
    description: "O'zbek tili lug'ati va so'z ma'nolari bo'yicha test.",
    iconClass: "fa-solid fa-book-open",
    url: "test1.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ma'nodosh So'zlar",
    description: "Sinonimlarni nutqda to'g'ri qo'llash qobiliyatini tekshiring.",
    iconClass: "fa-solid fa-rotate",
    url: "test2.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Shakldosh So'zlar",
    description: "Shakli bir xil, ma'nosi har xil so'zlarni aniqlash.",
    iconClass: "fa-solid fa-hand-holding-hand",
    url: "test3.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Yondosh Tushunchalar",
    description: "Omofonlar va omograflar bo'yicha mahoratingizni sinovdan o'tkazing.",
    iconClass: "bi bi-intersect",
    url: "test4.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Qarama-qarshi ma'no",
    description: "Antonimlar va paronimlarni farqlash bo'yicha amaliy test.",
    iconClass: "fa-solid fa-right-left",
    url: "test5.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ma'no darajalanishi",
    description: "Giponimiya va graduonimiya bo'yicha bilimingizni sinab ko'ring.",
    iconClass: "fa-solid fa-arrow-up-short-wide",
    url: "test6.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Qism-Butun Munosabat",
    description: "Partonimik so'zlarning o'zaro bog'liqligini sinovdan o'tkazing.",
    iconClass: "fa-solid fa-network-wired",
    url: "test7.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ma'no Turlari",
    description: "So'z ma'nolarining tiplari va o'zgarishini tushunish testi.",
    iconClass: "fa-solid fa-shuffle",
    url: "test8.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Bir/Ko'p Ma'nolilik",
    description: "Monosemik va polisemik so'zlarni ajratish bo'yicha test.",
    iconClass: "fa-solid fa-layer-group",
    url: "test9.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Vaqtinchalik Ma'no",
    description: "Uzual va okkazional ma'nolar farqini bilish testi.",
    iconClass: "fa-solid fa-business-time",
    url: "test10.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Iboralar Dunyosi",
    description: "O'zbek tili frazeologik birliklari bo'yicha bilimlaringizni tekshiring.",
    iconClass: "fa-solid fa-puzzle-piece",
    url: "test11.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Iboralar Ma'nosi",
    description: "Frazemalarning bir/ko'p ma'noli ekanligini aniqlash testi.",
    iconClass: "fa-solid fa-book-atlas",
    url: "test12.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Iboralar Tuzilishi",
    description: "Frazemalarning shakl va ma'no jihatidan munosabatini o'rganing.",
    iconClass: "bi bi-diagram-3-fill",
    url: "test13.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Iboralar Qo'llanishi",
    description: "Frazemalarning nutqda ishlatilish doirasi va zamonaviyligi.",
    iconClass: "fa-solid fa-comment-nodes",
    url: "test14.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "O'xshash Iboralar",
    description: "Frazeologik omonimlar va paronimlarni farqlash bo'yicha test.",
    iconClass: "fa-solid fa-scale-balanced",
    url: "test15.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Lug'atshunoslik",
    description: "Leksikografiya fanining asosiy tushunchalari bo'yicha test.",
    iconClass: "fa-solid fa-spell-check",
    url: "test16.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Lug'at Turlari",
    description: "Lug'at va uning turlari bo'yicha bilimlaringizni sinang.",
    iconClass: "fa-solid fa-clipboard-list",
    url: "test17.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Lug'at Qoidalari",
    description: "Lug'at tuzishning asosiy me'yorlari va qoidalarini o'rganing.",
    iconClass: "fa-solid fa-file-pen",
    url: "test18.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "So'z Yasalishi",
    description: "So'z yasalish usullari bo'yicha amaliy test.",
    iconClass: "fa-solid fa-cubes",
    url: "test19.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Tilshunoslik Bo'limi",
    description: "So'z yasalishining tilshunoslikdagi o'rnini tushunish testi.",
    iconClass: "fa-solid fa-graduation-cap",
    url: "test20.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Derivatsiya Qoliplari",
    description: "So'z yasash (derivatsiya) qoliplarini aniqlash bo'yicha test.",
    iconClass: "fa-solid fa-hexagon-nodes",
    url: "test21.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "So'z Rivoji",
    description: "Yasama so'zlarning lisoniy sathga ko'tarilish jarayoni.",
    iconClass: "fa-solid fa-chart-line",
    url: "test22.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Farqli Jihatlar",
    description: "Derivatsiya va relyatsiya tushunchalari farqini bilish testi.",
    iconClass: "fa-solid fa-not-equal",
    url: "test23.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Vaqt Bo'yicha Tahlil",
    description: "Tarixiy va sinxron derivatsiya turlarini farqlash testi.",
    iconClass: "bi bi-clock-history",
    url: "test24.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "So'z Turlari",
    description: "Yasama va yasalgan so'zlarning farqli xususiyatlarini o'rganing.",
    iconClass: "fa-solid fa-book-open-reader",
    url: "test25.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ma'no Strukturasi",
    description: "Leksemaning semantik strukturasi – sememasi bo'yicha test.",
    iconClass: "fa-solid fa-code-branch",
    url: "test26.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ma'no Ko'chishi",
    description: "Leksik maʼnoning oʻzgarish usullarini aniqlash testi.",
    iconClass: "fa-solid fa-seedling",
    url: "test27.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Polisemiya",
    description: "Bir maʼnoli va koʻp maʼnoli soʻzlarni ajratish boʻyicha test.",
    iconClass: "fa-solid fa-sliders",
    url: "test28.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ma'no Tahlili",
    description: "Maʼno koʻchish usullari yuzasidan chuqur tahlil testi.",
    iconClass: "fa-solid fa-list-check",
    url: "test29.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Leksik Hodisalar",
    description: "Omonimiya, antonimiya, paronimiya hodisalari bo'yicha test.",
    iconClass: "fas fa-sort-amount-down-alt",
    url: "test30.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "O'zlashgan So'zlar",
    description: "Oʻz va oʻzlashgan qatlamga oid soʻzlarni farqlash testi.",
    iconClass: "fa-solid fa-language",
    url: "test31.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "So'z Bo'yoqlari",
    description: "Emotsional-ekspressiv boʻyoqdor soʻzlarni aniqlash testi.",
    iconClass: "fa-solid fa-masks-theater",
    url: "test32.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Eski/Yangi So'zlar",
    description: "Tarixiy, arxaik va yangi soʻzlar boʻyicha bilimlaringizni tekshiring.",
    iconClass: "fa-solid fa-hourglass-half",
    url: "test33.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Qo'llanish Doirasi",
    description: "Leksemalarning nutqda ishlatilish doirasi bo'yicha test.",
    iconClass: "fa-solid fa-globe",
    url: "test34.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Sheva/Atamalar",
    description: "Dialektizmlar va kasb-hunar leksikasi boʻyicha test.",
    iconClass: "fa-solid fa-map-location-dot",
    url: "test35.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Jargon So'zlar",
    description: "Jargon va vulgar so'zlar bo'yicha bilimlaringizni tekshiring.",
    iconClass: "fa-solid fa-comments",
    url: "test36.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Iboraviy Birliklar",
    description: "Frazeologik birliklarning tushunchasi va turlari bo'yicha test.",
    iconClass: "fa-solid fa-quote-right",
    url: "test37.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Bir Ma'noli Iboralar",
    description: "Monosemantik frazemalarni aniqlash bo'yicha amaliy test.",
    iconClass: "fa-solid fa-comment",
    url: "test38.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ko'p Ma'noli Iboralar",
    description: "Polisemantik iboralar ma'no tahlili yuzasidan test.",
    iconClass: "fa-solid fa-sitemap",
    url: "test39.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ma'nodosh Iboralar",
    description: "Sinonimik munosabatdagi frazemalarni o'rganish testi.",
    iconClass: "fa-solid fa-brain",
    url: "test40.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Omonim Iboralar",
    description: "Omonimik frazeologik birliklar bo'yicha bilimlaringizni sinang.",
    iconClass: "fa-solid fa-diamond",
    url: "test41.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Zid Ma'noli Iboralar",
    description: "Antonimik munosabatdagi frazemalarni aniqlash testi.",
    iconClass: "fa-solid fa-arrows-split-up-and-left",
    url: "test42.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Lug'atlar",
    description: "Lug'atlarning turlari va tuzilishi bo'yicha test.",
    iconClass: "fa-solid fa-swatchbook",
    url: "test43.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Fe'l Kategoriyalari",
    description: "O'zbek tili fe'l kategoriyalari bo'yicha bilimlaringizni sinang.",
    iconClass: "fa-solid fa-list",
    url: "test44.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Ot So'z Turukumi",
    description: "Ot so'z turkumi belgilari va turlari bo'yicha test.",
    iconClass: "fa-solid fa-users",
    url: "test45.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Sifat So'z Turukumi",
    description: "Sifat so'z turkumi belgilari va darajalari bo'yicha test.",
    iconClass: "fa-solid fa-chart-column",
    url: "test46.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Fe'l Shakllari",
    description: "Fe'lning vazifa shakllari bo'yicha bilimlaringizni sinang.",
    iconClass: "fa-solid fa-yin-yang",
    url: "test47.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "So'z Tarkibi",
    description: "So'zning tarkibi, morfemalar bo'yicha amaliy test.",
    iconClass: "fa-solid fa-house-chimney",
    url: "test48.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "So'z Kelib Chiqishi",
    description: "Etimologiya va atamashunoslik asoslari bo'yicha test.",
    iconClass: "fa-solid fa-file-circle-question",
    url: "test49.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Jahon Tillari",
    description: "Dunyo tillari oilalari bo'yicha bilimlaringizni tekshiring.",
    iconClass: "fa-solid fa-book-atlas",
    url: "test50.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }, {
    title: "Til Geografiyasi",
    description: "Tillarning tarqalish hududlari, areal lingvistika bo'yicha test.",
    iconClass: "fa-solid fa-magnifying-glass-location",
    url: "test51.html",
    duration: "25 daqiqa",
    questions: "50 savol"
  }]; //////////////////////////////////////////

  function createAndAppendCards() {
    testsData.forEach(function (test) {
      var cardLink = document.createElement('a');
      cardLink.href = 'test_page.html';
      cardLink.classList.add('card-link');

      cardLink.onclick = function () {
        localStorage.setItem('selectedTestUrl', test.url);
        localStorage.setItem('selectedTestTitle', test.title);
        localStorage.setItem('selectedTestDescription', test.description);
        localStorage.setItem('selectedTestIconClass', test.iconClass);
      };

      cardLink.innerHTML = "\n                <div class=\"test-card\">\n                    <div class=\"icon\">\n                        <i class=\"".concat(test.iconClass, "\"></i>\n                    </div>\n                    <h2>").concat(test.title, "</h2>\n                    <p>").concat(test.description, "</p>\n                    <div class=\"test-meta\">\n                        <span><i class=\"bi bi-clock\"></i> ").concat(test.duration, "</span>\n                        <span><i class=\"bi bi-question-circle\"></i> ").concat(test.questions, "</span>\n                    </div>\n                </div>\n            ");
      cardContainer.appendChild(cardLink);
    });
  }

  createAndAppendCards(); ////////////////////////////////////////

  if (searchInput && cardContainer) {
    var cards = cardContainer.querySelectorAll('.test-card');
    searchInput.addEventListener('input', function () {
      var searchQuery = searchInput.value.toLowerCase();
      cardContainer.innerHTML = '';
      var filteredTests = testsData.filter(function (test) {
        var title = test.title.toLowerCase();
        var description = test.description.toLowerCase();
        return title.includes(searchQuery) || description.includes(searchQuery);
      });
      filteredTests.forEach(function (test) {
        var cardLink = document.createElement('a');
        cardLink.classList.add('card-link');
        cardLink.href = "test_page.html?testUrl=".concat(encodeURIComponent(test.url));
        cardLink.innerHTML = "\n                    <div class=\"test-card\">\n                        <div class=\"icon\">\n                            <i class=\"".concat(test.iconClass, "\"></i>\n                        </div>\n                        <h2>").concat(test.title, "</h2>\n                        <p>").concat(test.description, "</p>\n                        <div class=\"test-meta\">\n                            <span><i class=\"bi bi-clock\"></i> ").concat(test.duration, "</span>\n                            <span><i class=\"bi bi-question-circle\"></i> ").concat(test.questions, "</span>\n                        </div>\n                    </div>\n                ");
        cardContainer.appendChild(cardLink);
      });
    });
  } else {
    console.error("Qidiruv elementlari topilmadi, iltimos IDlarni tekshiring!");
  }
});