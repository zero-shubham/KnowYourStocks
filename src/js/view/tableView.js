import {elements} from './base';

function getMarkup(row,i){
    const markup = `
    <tr class="row100">
        <td class="column100 column1" data-column="column1">${row['timestamp']}</td>
        <td class="column100 column2" data-column="column2">${row['open']}</td>
        <td class="column100 column3" data-column="column3">${row['high']}</td>
        <td class="column100 column4" data-column="column4">${row['low']}</td>
        <td class="column100 column5" data-column="column5">${row['close']}</td>
        <td class="column100 column6" data-column="column6">${row['volume']}</td>
    </tr>`

    return markup;
}
export function render(rows){
    rows.forEach((row,i) => {
        elements.tableBody.insertAdjacentHTML('beforeend',getMarkup(row,i));
    });
}

export function remove(){
    elements.tableBody.innerHTML = '';
}