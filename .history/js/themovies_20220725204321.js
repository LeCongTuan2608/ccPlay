import { urlPage, urlMovie } from './exports.js';
import { showLoading, hideLoading } from './exports.js';
import { renderListMovie } from './exports.js';
import { getMovie } from './exports.js';
let getCategory = JSON.parse(localStorage.getItem('getCategory'));
let getTheMoviesYear = JSON.parse(localStorage.getItem('getTheMoviesYear'));
console.log(getCategory);
console.log(getTheMoviesYear);
//render title thể loại
const renderTitle = async () => {
   const titleCategory = document.querySelector('.title');
   if (!titleCategory) {
      console.error("List movie doesn't exit...");
      return;
   }
   if (getCategory !== '') {
      let htmls = `<h2>Thể loại: ${getCategory}</h2>`;
      return titleCategory.insertAdjacentHTML('beforeend', htmls);
   } else {
      let htmls = `<h2>Quốc gia: ${getTheMoviesYear}</h2>`;
      return titleCategory.insertAdjacentHTML('beforeend', htmls);
   }
};
renderTitle();
//lọc thể loại
async function filterTheMovies(listMovie, listSelector) {
   const arrayListMovie = [];
   const lengthMovie = listMovie.length;
   console.log(listMovie);
   if (getCategory !== '') {
      for (let i = 0; i < lengthMovie; i++) {
         const cate = listMovie[i].movie.category;
         const cateLength = cate.length;
         if (getCategory == 'Hoạt Hình' && listMovie[i].movie.type == 'hoathinh') {
            arrayListMovie.push(listMovie[i]);
         }
         for (let j = 0; j < cateLength; j++) {
            if (cate[j].name == getCategory && listMovie[i].movie.type !== 'hoathinh') {
               arrayListMovie.push(listMovie[i]);
            }
         }
      }
   } else {
      for (let i = 0; i < lengthMovie; i++) {
         const MoviesYear = listMovie[i].movie.year;
         const MoviesLength = MoviesYear.length;
         if (getCategory == 'Hoạt Hình' && listMovie[i].movie.type == 'hoathinh') {
            arrayListMovie.push(listMovie[i]);
         }
         for (let j = 0; j < cateLength; j++) {
            if (cate[j].name == getCategory && listMovie[i].movie.type !== 'hoathinh') {
               arrayListMovie.push(listMovie[i]);
            }
         }
      }
   }
   await renderListMovie(arrayListMovie, listSelector);
}
//call api lần 2
const arrayList = [];
async function getMovieInforFromApi(movie) {
   try {
      const lengthMovie = movie.length;
      for (let i = 0; i < lengthMovie; i++) {
         const response = await fetch(`${urlMovie + movie[i].slug}`);
         const data_movie = await response.json();
         arrayList.push(data_movie); //thêm items vào array
      }
      await filterTheMovies(arrayList, '.category-movie');
   } catch (error) {
      console.error({ error });
   }
}
//call api lần 1
async function getMoviePageFromApi(page) {
   try {
      const response = await fetch(`${urlPage + page}`);
      const data = await response.json();
      await getMovieInforFromApi(data.items);
   } catch (error) {
      console.error({ error });
   }
}
const getTheMovies = async () => {
   await showLoading();
   for (let i = 0; i <= 10; i++) {
      await getMoviePageFromApi(i);
   }
   const TheMovies = document.querySelectorAll('.movie-swiper-slider');
   await getMovie(TheMovies);
   await hideLoading();
};
getTheMovies();
