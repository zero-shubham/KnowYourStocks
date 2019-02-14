import {elements} from './base';

export function getQuery(){
    const query = {
        interval: elements.inputDataInterval.value,
        stock: (elements.inputStockName.value).toUpperCase(),
    }
    elements.inputDataInterval.selectedIndex = 0; 
    elements.inputStockName.value = '';
    return query;
}