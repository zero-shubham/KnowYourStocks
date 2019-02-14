import Table from './model/Table';
import {addFav} from './model/Fav';

import {getQuery} from './view/queryView';
import {render,remove} from './view/tableView';
import {renderLoading,removeLoading,renderFav,renderError,removeFav} from './view/outputView';
import {renderFavTags} from './view/favView';

import {elements} from './view/base';
import {startEffect} from './hoverEffect';

let table, fav;
async function retreive(){
    removeFav()
    renderLoading();
    const query = getQuery();
    table = new Table(query);
    await table.getTable();
    if(table['data']){
        removeLoading();
        render(table['data']);
        elements.inputStockName.value = table.query['stock'];
        startEffect();
        renderFav();
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
    console.log(fav);
    window.localStorage.setItem('favs', JSON.stringify({'fav':fav}));
    if(fav)
        renderFavTags(fav);
});

window.addEventListener('load',()=>{
    fav = JSON.parse(window.localStorage.getItem('favs'))['fav'];
    if(fav)
        renderFavTags(fav);

});