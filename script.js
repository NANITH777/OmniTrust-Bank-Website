'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
        console.log(id);

        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    };
})
