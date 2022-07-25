window.addEventListener('scroll', function () {
   const header = document.querySelector('.our-story-header-wrapper');
   const scrolling = window.pageYOffset;
   if (scrolling > 200) {
      header.classList.add('out-fixed');
      btnScrollTop.style.display = 'block';
   } else if (scrolling < 200) {
      // header.classList.toggle('out-fixed');
      header.classList.remove('out-fixed');
      btnScrollTop.style.display = 'none';
   }
});
const btnScrollTop = document.querySelector('.scroll-top');
btnScrollTop.addEventListener('click', () => {
   document.querySelector('.basicLayouts').scrollIntoView({ behavior: 'smooth' });
});
//click menu category
const categories = document.querySelectorAll('.category ul li a');
const getCategories = async () => {
   for (let i = 0; i < categories.length; i++) {
      categories[i].onclick = async () => {
         localStorage.setItem('getCategory', JSON.stringify(categories[i].textContent));
         localStorage.setItem('getTheMoviesYear', JSON.stringify(''));
      };
   }
};
getCategories();
// click menu country
const CountryOfMovies = document.querySelectorAll('.country ul li a');
const getCountryOfMovies = async () => {
   for (let i = 0; i < CountryOfMovies.length; i++) {
      CountryOfMovies[i].onclick = async () => {
         localStorage.setItem('CountryOfMovies', JSON.stringify(CountryOfMovies[i].textContent));
         localStorage.setItem('getCategory', JSON.stringify(''));
      };
   }
};
getCountryOfMovies();
