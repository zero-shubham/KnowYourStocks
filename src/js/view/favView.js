import {elements} from '../view/base'

function getMarkup(item){
    const markup = `<div class="tags" data-ref="${item}">${item}<span class="tags__cross">&Cross;</span></div>`
    return markup;
}

export function renderFavTags(fav){
    if(fav.length){
        elements.containerFavTags.textContent = '';
    }
    fav.forEach(ele => {
        elements.containerFavTags.insertAdjacentHTML('beforeend',getMarkup(ele));
    });
    if(!fav.length)
        elements.containerFavTags.textContent = 'Click on the $ when appears to add stock to favourites!';
}

