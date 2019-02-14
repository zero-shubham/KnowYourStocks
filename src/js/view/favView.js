import {elements} from '../view/base'

function getMarkup(item){
    const markup = `<span class="tags">${item}<span class="tags__cross">&Cross;</span></span>`
    return markup;
}

export function renderFavTags(fav){
    elements.containerFavTags.textContent = '';
    fav.forEach(ele => {
        elements.containerFavTags.insertAdjacentHTML('beforeend',getMarkup(ele));
    });
}