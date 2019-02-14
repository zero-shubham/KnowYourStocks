const columns= {};
function enter(e){
    if(e.target.matches('.column100')){
       let c = (e.srcElement.dataset.column).toString();
       Array.prototype.slice.call(columns[`${c}`]).forEach(element => {
           element.classList.add('hov-column-ver1');
       });

       document.querySelector(`.head${c[c.length - 1]}`).classList.add('hov-column-head-ver1');
    }
}


function leave(e){
    if(e.target.matches('.column100')){
       let c = (e.srcElement.dataset.column).toString();
       Array.prototype.slice.call(columns[`${c}`]).forEach(element => {
           element.classList.remove('hov-column-ver1');
       });

       document.querySelector(`.head${c[c.length - 1]}`).classList.remove('hov-column-head-ver1');
    }
}

export function startEffect(){
    const colNum = document.querySelector('tbody').childElementCount;
    let i = 1;

    while(i<=colNum){
        columns[`column${i}`] = document.querySelectorAll(`.column${i}`);
        i++;
    }

    document.querySelector('.table100').addEventListener('mouseover', enter);

    document.querySelector('.table100').addEventListener('mouseout', leave);
}

