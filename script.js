'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) 
{
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function (e) {
    e.preventDefault();
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smmoth Scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const viewSection1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e)
{
    viewSection1.scrollIntoView({behavior: 'smooth'});
})

// Page Navigation 1st method
/*document.querySelectorAll('.nav__link').forEach(function(elt)
{
    elt.addEventListener('click', function(e)
    {
        e.preventDefault();
        const id = this.getAttribute('href');
        console.log(id);

        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    });
});*/

// Page Navigation 2nd method
document.querySelector('.nav__links').addEventListener('click', function(e)
{
    e.preventDefault();

    if(e.target.classList.contains('nav__link'))
    {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    };
})

//Tabbed Components
tabsContainer.addEventListener('click', function(e)
{
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);
    console.log(clicked.dataset.tab);

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

// Nav fade animation
const navHover = function(e)
{
    if(e.target.classList.contains('nav__link'))
    {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('.nav__logo-container');

        siblings.forEach(elt => {
            if(elt !== link)
            {
                elt.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
};

nav.addEventListener('mouseover', navHover.bind(0.5));

nav.addEventListener('mouseout', navHover.bind(1));


// Sticky Navigation 1st method
const initialCoords = viewSection1.getBoundingClientRect();

/*window.addEventListener('scroll', function()
{
    if(window.scrollY > initialCoords.top)
        nav.classList.add('sticky');
    else
        nav.classList.remove('sticky');
});*/

// Sticky Navigation 2nd method
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) 
{
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) 
{
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
