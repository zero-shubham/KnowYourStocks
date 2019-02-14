import {elements} from '../view/base'

export function addFav(fav=[]){
    if(!fav.includes(elements.inputStockName.value))
        fav.push(elements.inputStockName.value);
    return fav;
}

export function removeFav(ref,fav){
    let ind = fav.indexOf(ref);
    if(ind> -1)
        fav.splice(ind,1)
    return fav;
}