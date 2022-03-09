
export default function modalImage(node){
    let mainImageContainer = node;
    let previewItems = mainImageContainer.querySelectorAll('.modal-image__item');
    let mainImage = document.querySelector('#modal-image');
    previewItems.forEach(e=>{
        e.addEventListener('click',function (event) {
            mainImage.innerHTML = '';
            let item = event.target;
            if (item.classList.contains('modal-image__item')){
                let currentImageSrc = item.getAttribute('src');
                let img = document.createElement('img');
                img.setAttribute('src',currentImageSrc);
                mainImage.appendChild(img);
            }
        })
    })
}
