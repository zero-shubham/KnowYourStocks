import Table from './model/Table';
import {addFav,removeFav} from './model/Fav';

import {getQuery} from './view/queryView';
import {render,remove} from './view/tableView';
import {renderLoading,
    removeLoading,
    removeFavIcon,
    renderError,
    renderFavIcon,
    renderPagination,
    removePagination
} from './view/outputView';
import {renderFavTags} from './view/favView';

import {elements} from './view/base';
import {startEffect} from './hoverEffect';

import "../css/style.css";

let table, fav;
async function retrieve(){
    remove(); //if there is already data in the table remove everything
    removeFavIcon();
    removePagination();
    renderLoading();
    const query = getQuery();
    table = new Table(query);
    await table.getTable();

    if(table['data']){
        removeLoading();
        render(table['data'][0]);
        renderPagination(table.pages);
        elements.inputStockName.value = table.query['stock'];
        startEffect();
        renderFavIcon();

        //adding pagination support
        if(document.querySelector(".container__output-pagination-page")){
            let allPages = document.querySelectorAll(".container__output-pagination-page");
            
            allPages.forEach(page => {
                page.addEventListener('click', (e) => {
                    remove();
                    render(table['data'][parseInt(page.innerHTML)-1]); 
                })
            });
        }
    }else{
        removeLoading();
        remove();
        renderError();
    }
    
}

elements.btnRetreive.addEventListener('click',retrieve);

elements.containerOutputWarn.addEventListener('click', e=>{
    if(e.target === elements.favBtn)
        fav = addFav(fav);
    window.localStorage.setItem('favs', JSON.stringify({'fav':fav}));
    if(fav)
        renderFavTags(fav);
});

window.addEventListener('load',()=>{
    fav = JSON.parse(window.localStorage.getItem('favs'))['fav'];
    if(fav)
        renderFavTags(fav);

});

elements.containerFavTags.addEventListener('click',e =>{
    if(e.target.matches('.tags')){
        let ref = e.srcElement.getAttribute('data-ref');
        elements.inputStockName.value = ref;
        retrieve();
    }else if(e.target.matches('.tags__cross')){
        let ref = e.target.parentNode.getAttribute('data-ref');
        fav = removeFav(ref,fav);
        window.localStorage.setItem('favs', JSON.stringify({'fav':fav}));
        renderFavTags(fav);
    }
});

