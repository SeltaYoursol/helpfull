let cart = {
    1: {
        'id': 1,
        "title": 'name1',
        "count": 1,
        'price': '15000'
    },
    2: {
        'id': 2,
        "title": 'name2',
        "count": 1,
        'price': '15000',
    },
};
const totalAmountPrice = Array();
const quantity = Array();
const basketQuantity = document.querySelectorAll('.basket-quality');

document.onclick = event => {
    let item = event.target;
    if (item.classList.contains('plus')) {
        let parent = item.closest('.item_counter');
        let input = parent.querySelector('input');
        plusFunction(item.dataset.id, input)

    }
    if (item.classList.contains('minus')) {
        let parent = item.closest('.item_counter');
        let input = parent.querySelector('input');
        minusFunction(item.dataset.id, input)
    }
    if (item.classList.contains('delete-btn')) {
        deleteFunction(item.dataset.id)

    }

}
const plusFunction = (id, input) => {
    cart[id]['count']++;
    input.setAttribute('value', cart[id]['count'])
    initContent();
}
const minusFunction = (id, input) => {
    if (cart[id]['count'] - 1 === 0) {
        deleteFunction(id);
        return true;
    }
    cart[id]['count']--;
    input.setAttribute('value', cart[id]['count'])
    initContent();
}

const deleteFunction = id => {
    delete cart[id];
    initContent();
}
const renderCart = (id, title, price, fullprice, counter) => {
    return `
	<div class="col-sm-12 basket-item" data-id="${id}">
                            <div class="basket-card">
                                <div class="row">
                                    <div class="col-sm-12 col-md-6 d-flex align-items-center justify-content-md-around justify-content-start">
                                        <div class="item_image ">
                                            <img src="img/basket-item.png" alt="Изображение товара">
                                        </div>
                                         <div class="item_name ">
                                            ${title}
                                        </div>
                                    </div>
                                 
                                    <div class="col-xs-11 col-md-5  d-flex  flex-row justify-content-around">
                                        <div class="item_price align-self-center">${price}</div>
                                        <div class="item_counter-clear mr-2 align-self-center" type="button" >
                                            <img src="img/icons/basket-clear.svg" alt="Очистить">
                                        </div>
                                        <div class="item_counter align-self-center">
                                            <button class="minus" data-id="${id}" >-</button>
                                            <input type="number" class="counter" value="${counter}">
                                            <button class="plus" data-id="${id}">+</button>
                                        </div>
                                        <div class="item_current-price align-self-center">${fullprice}</div>
                                    </div>
                                    <div class="col-xs-1 col-md-1 d-flex ">
                                        <div class="item_delete align-self-center delete">
                                            <button type="button " class="delete-btn"  data-id="${id}">
                                            <img class="delete-btn"   data-id="${id}" src="/img/icons/basket-clear-white.svg" alt="">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
	`;
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const initContent = () => {
    quantity.splice(0, quantity.length);
    totalAmountPrice.splice(0,totalAmountPrice.length);

    let parent = document.querySelector('.basket-list')
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (let key in cart) {
        let item = cart[key];
        let fullprice = item['price'] * item['count'];
        quantity.push(item['count']);
        totalAmountPrice.push(fullprice);
        parent.insertAdjacentHTML('afterbegin', renderCart(item['id'], item['title'], item['price'], fullprice, item['count']));

    }

    if(totalAmountPrice.length){
        document.querySelector('#total-amount-price').textContent = totalAmountPrice.reduce(reducer);
        document.querySelector('.total-amount').classList.add('d-flex');
        document.querySelector('#order-bnt').classList.add('d-block');
        document.querySelector('.empty-basket').classList.add('d-none');

        document.querySelector('.total-amount').classList.remove('d-none');
        document.querySelector('#order-bnt').classList.remove('d-none');
        document.querySelector('.empty-basket').classList.remove('d-block');

    }
    else{
       document.querySelector('.total-amount').classList.add('d-none');
        document.querySelector('#order-bnt').classList.add('d-none');
        document.querySelector('.empty-basket').classList.add('d-block');

        document.querySelector('.total-amount').classList.remove('d-flex');
        document.querySelector('#order-bnt').classList.remove('d-block');
        document.querySelector('.empty-basket').classList.add('d-none');
    }

    if (quantity.length) {

        let totalQuantity = quantity.reduce(reducer);

        basketQuantity.forEach(
            e => {
                e.textContent = totalQuantity;
                if (totalQuantity > 0) {
                    e.classList.add('active');
                } else {
                    e.classList.remove('active');
                }
            }
        )
    } else {
        basketQuantity.forEach(
            e => {
                e.classList.remove('active');
            }
        )
    }

}
initContent(cart);

