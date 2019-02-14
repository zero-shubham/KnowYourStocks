import {elements} from './base';

export function renderFav(){
    elements.favBtn.style.display = 'block';
    elements.favBtn.style.opacity = '1';
    elements.favBtn.classList.add('active');
}

function renderMsg(){
    elements.containerOutputWarnMsg.style.display = 'block';
}

export function renderError(){
    elements.containerOutputWarnMsg.textContent = 'Something went wrong! Make sure you entered valid NASDAQ enlisted stock.';
    renderMsg();
}

export function renderLoading(){
    removeMsg();
    elements.loadingEffect.style.display = 'block';
    elements.loadingEffect.style.opacity = '1';
}

export function removeLoading(){
    removeMsg();
    elements.loadingEffect.style.display = 'none';
    elements.loadingEffect.style.opacity = '0';
}

function removeMsg(){
    elements.containerOutputWarnMsg.style.display = 'none';
}


export function removeFav(){
    elements.favBtn.style.display = 'none';
    elements.favBtn.style.opacity = '0';
    elements.favBtn.classList.remove('active');
}