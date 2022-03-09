let mainImageContainer = document.querySelector('.main-image')
let mainImage = mainImageContainer.querySelector('img')
let previewItems = document.querySelectorAll('.preview-img__item')


previewItems.forEach(e=>{
    e.addEventListener('click',function (event) {
        let item = event.target;
        if (item.classList.contains('preview-img__item_img')){
            let currentImageSrc = item.getAttribute('src');
            let id = item.dataset.id;
            mainImage.setAttribute('src', currentImageSrc);
        }

    })
})