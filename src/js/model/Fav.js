import {elements} from '../view/base'

export function addFav(fav=[]){
    fav.push(elements.inputStockName.value);
    return fav;
}