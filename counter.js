export default function counter(node) {
    let box = node.getBoundingClientRect();
    let top = box.top + pageYOffset;
    let counterItems = node.querySelectorAll('.statistic__counter-item');
    window.addEventListener('scroll', () => {
        if (pageYOffset >= (Math.round(top) - 500)) {
            counterItems.forEach(el => {
                let number = Number(el.dataset.num);
                let displayNumber = Number(el.innerHTML);
                    let interval = setInterval(function () {
                        if (number !== displayNumber) {
                            let change = (number - displayNumber) / 10;
                            change >= 0 ? change = Math.ceil(change) :  change = Math.floor(change);
                            displayNumber = displayNumber + change;
                            el.innerHTML = displayNumber;
                        }
                        else{
                            clearInterval(interval);
                        }
                    }, 150)

                }
            );

        }
    })


}