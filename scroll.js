var app = document.querySelector('.botui-app-container')
var con = document.querySelector('.botui-container')

function debounce(func, wait, immediate) {
    var timeout;
    return function executedFunction() {
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
const doTheScroll = (el) => {
    el.scrollTop = el.scrollHeight - el.offsetHeight
}
let prev_scroll_top = null
const debounced = debounce(doTheScroll, 100, false)
con.addEventListener('scroll', (e) => {
    e.stopPropagation()
    const curr_scroll_top = e.target.scrollTop
    if (!prev_scroll_top) {
        prev_scroll_top = curr_scroll_top
        return
    }
    const diff = curr_scroll_top - prev_scroll_top
    if (diff > 0) {
        debounced(e.target)
    }
    prev_scroll_top = curr_scroll_top
    console.log('diff', diff)
})

var transport_type = null
var hotel_preference = null

const $container = document.querySelector('.botui-container')
const $optionscontainer = document.querySelector(
    '.botui-actions-container',
)