export default function menuScroll(node){
    window.addEventListener('scroll', function() {
        if (scrollY > 100) {
            node.classList.add('header__scroll');
        }
        else{
            node.classList.remove('header__scroll');
        }
    });
};
