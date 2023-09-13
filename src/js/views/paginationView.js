import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generatePreviousButtonMarkup() {
    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <span>Page ${this._data.page - 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
      </button>
    `;
  }

  _generateNextButtonMarkup() {
    return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextButtonMarkup();
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePreviousButtonMarkup();
    }

    // Other pages
    if (curPage < numPages) {
      return `
        ${this._generatePreviousButtonMarkup()}
        ${this._generateNextButtonMarkup()}
      `;
    }

    // Page 1, and there is NO other pages
    return;
  }
}

export default new PaginationView();
