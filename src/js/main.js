import Table from './model/Table';
import {addFav,removeFav} from './model/Fav';

import {getQuery} from './view/queryView';
import {render,remove} from './view/tableView';
import {renderLoading,removeLoading,removeFavIcon,renderError,renderFavIcon} from './view/outputView';
import {renderFavTags} from './view/favView';

import {elements} from './view/base';
import {startEffect} from './hoverEffect';

let table, fav;
async function retreive(){
    removeFavIcon()
    renderLoading();
    const query = getQuery();
    table = new Table(query);
    await table.getTable();
    if(table['data']){
        removeLoading();
        render(table['data']);
        elements.inputStockName.value = table.query['stock'];
        startEffect();
        renderFavIcon();
    }else{
        removeLoading();
        remove();
        renderError();
    }
    
}

elements.btnRetreive.addEventListener('click',retreive);

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
        retreive();
    }else if(e.target.matches('.tags__cross')){
        let ref = e.target.parentNode.getAttribute('data-ref');
        fav = removeFav(ref,fav);
        window.localStorage.setItem('favs', JSON.stringify({'fav':fav}));
        renderFavTags(fav);
    }
});