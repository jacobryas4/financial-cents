export default {
    beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his children
            if (!(el === event.target || el.contains(event.target))) {
                // and if it was, call method provided in attribute value
                binding.value(event);
            }
        };
        document.addEventListener('click', el.clickOutsideEvent, true);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent, true);
    },
};
