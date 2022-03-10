let state = [
    {
        'id': 1,
        "title": 'name1',
        "count": 1,
        'price': '15000'
    },
    {
        'id': 2,
        "title": 'name2',
        "count": 1,
        'price': '15000',
    },
    {
        'id': 3,
        "title": 'name2',
        "count": 0,
        'price': '15000',
    },
]
    ;

class CartItemView {
    constructor(id, title, price, fullprice, count) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.fullprice = fullprice;
        this.count = count;
    }

    render() {
        return `
        <div class="col-sm-12 basket-item js-cart-item" data-id="${this.id}" data-price=${this.price}>
            <div class="basket-card">
                <div class="row">
                    <div class="col-sm-12 col-md-6 d-flex align-items-center justify-content-md-around justify-content-start">
                        <div class="item_image ">
                            <img src="img/basket-item.png" alt="Изображение товара">
                        </div>
                        <div class="item_name ">
                            ${this.title}
                        </div>
                    </div>
                    <div class="col-xs-11 col-md-5  d-flex  flex-row justify-content-around">
                        <div class="item_price align-self-center">${this.price}</div>
                        <div class="item_counter-clear mr-2 align-self-center" type="button" >
                            <img src="img/icons/basket-clear.svg" alt="Очистить">
                        </div>
                        <div class="item_counter align-self-center">
                            <button class="minus" data-id="${this.id}" >-</button>
                                <input type="number" class="counter js-counter" value="${this.count}">
                            <button class="plus" data-id="${this.id}">+</button>
                        </div>
                        <div class="item_current-price align-self-center">${this.fullprice}
                        </div>
                    </div>
                    <div class="col-xs-1 col-md-1 d-flex ">
                        <div class="item_delete align-self-center delete">
                            <button type="button " class="delete-btn"  data-id="${this.id}">
                                <img class="delete-btn"   data-id="${this.id}" src="/img/icons/basket-clear-white.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

class CartItemEvents {
    constructor(cartItem) {
        this.item = cartItem;
        this.input = cartItem.querySelector('.js-counter');
        this.price = cartItem.dataset.price;
        this.id = cartItem.dataset.id;
        this.count = this.input.value;
        this.fullprice = this.price * this.count;
    }
    init() {
        this.item.addEventListener('click', (event) => {
            let el = event.target;
            if (el.classList.contains('plus')) {
                this.plusHandler()
            }
            if (el.classList.contains('minus')) {
                this.minusHandler()
            }
            if (el.classList.contains('delete-btn')) {
                this.deleteHandler()
            }
        })
    }

    plusHandler() {
        this.count++;
        this.input.setAttribute('value', this.count)
    }
    minusHandler() {
        if (this.count - 1 <= 0) {
            this.deleteHandler()
        }
        else {
            this.count--
            this.input.setAttribute('value', this.count)
        }
    }

    deleteHandler() {
        this.count = 0;
        document.dispatchEvent(new CustomEvent("delete", { detail: { id: this.id } }));
    }
}

class Cart {
    constructor(state, container) {
        this.state = state;
        this.container = container;
        this.basketQuantity = document.querySelectorAll('.basket-quality');
        this.quantity = [];
        this.totalAmountPrice = [];
        this.renderCartList = [];
    }

    init() {
        document.addEventListener('delete', this.deleteItem.bind(this));
        this.renderCart()
    }

    renderCart() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.renderCartList = []

        let tempList = this.state.filter(item => {
            return item.count > 0
        })

        tempList.forEach(item => {
            this.createListItem(item)
        })

        this.renderCartList.forEach(item => {
            this.container.insertAdjacentHTML('afterbegin', item.render())
        })

        let cartItems = document.querySelectorAll('.js-cart-item');
        cartItems.forEach(item => {
            let currentItem = new CartItemEvents(item);
            currentItem.init()
        })
    }

    createListItem(element) {
        let fullprice = element.price * element.count;
        this.quantity.push(element.count);
        this.totalAmountPrice.push(fullprice);
        let cartItem = new CartItemView(element.id, element.title, element.price, fullprice, element.count)
        this.renderCartList.push(cartItem)
    }

    deleteItem(event) {
        this.state = this.state.filter(el => {
            return el.id != event.detail.id
        })
        console.log(event.detail)
        this.renderCart()
    }
    addItem(id, title, count = 1, price) {
        this.state.push({
            'id': id,
            "title": title,
            "count": count,
            'price': price
        })
    }
}

const cart = new Cart(state, document.querySelector('.basket-list'))

cart.init()