export default function accordion(node)
{
    let accordion = node;
    let activeHeadingClass = 'accordion__heading--active';
    let activeBodyClass = 'accordion__body--active'

    let accordionHeadings = accordion.querySelectorAll('.accordion__heading');
    accordionHeadings.forEach(el => {
        el.addEventListener('click', event => {
            let currentHeading = event.currentTarget
            // remove active state from prev heading
            Array.from(accordionHeadings).find(heading => {
                return heading.classList.contains(activeHeadingClass);
            }).classList.remove(activeHeadingClass);
            // remove active state from prev body
            accordion.querySelector(`.${activeBodyClass}`).classList.remove(activeBodyClass);
            // set active state to new element
            currentHeading.classList.add(activeHeadingClass);
            currentHeading.nextElementSibling.classList.add(activeBodyClass);
        });
    });
}