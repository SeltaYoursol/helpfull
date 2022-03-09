(function() {
    let catalogSection = document.querySelector('.catalog');
    let currentCategoryTitle = document.querySelector('.category_name');

    if (catalogSection === null) {
        return;
    }

    let removeChildren = function(item) {
        while (item.firstChild) {
            item.removeChild(item.firstChild);
        }
    };

    let updateChildren = function(item, children) {
        removeChildren(item);
        for (let i = 0; i < children.length; i += 1) {
            item.appendChild(children[i]);
        }
    };

    let catalog = catalogSection.querySelector('.catalog__body');
    let catalogNav = catalogSection.querySelectorAll('.catalog__nav');
    let catalogItems = catalogSection.querySelectorAll('.catalog__item');
    catalogNav.forEach( el=>{
        el.addEventListener('click', function(e) {
            let target = e.target;

            let item = myLib.closestItemByClass(target, 'catalog__nav_btn');

            if (item === null || item.classList.contains('is-active')) {
                return;
            }
            e.preventDefault();

            let activeMobilMenu = catalogSection.querySelector('.catalog-mobil__nav ');
            activeMobilMenu.classList.remove('active')
            document.querySelector('body').classList.remove('lock')

            let filterValue = item.getAttribute('data-filter');

            currentCategoryTitle.textContent = item.textContent;

            let previousBtnActive = el.querySelector('.catalog__nav_btn.is-active');

            previousBtnActive.classList.remove('is-active');
            item.classList.add('is-active');

            if (filterValue === 'all') {
                updateChildren(catalog, catalogItems);
                return;
            }

            let filteredItems = [];
            for (let i = 0; i < catalogItems.length; i += 1) {
                let current = catalogItems[i];
                if (current.getAttribute('data-category') === filterValue) {
                    filteredItems.push(current);
                }
            }

            updateChildren(catalog, filteredItems);
        });
        }
    )
})();
