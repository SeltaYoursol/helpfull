const products = document.querySelectorAll('.catalog__item');
const basketQuantity = document.querySelectorAll('.basket-quality');
let basketContent = Array();

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

products.forEach(el => {
    el.setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let id = self.dataset.id;
       basketContent.push(id);
        basketQuantity.forEach(
            e=>{
                e.textContent = String(basketContent.length);
                if(basketContent.length > 0){
                    e.classList.add('active');
                }
                else{
                    e.classList.remove('active');
                }
            }
        )

    });

});



