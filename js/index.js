var item = $("body")[0]
window.addEventListener('wheel', function(e) {
    console.log(e.deltaY)
    if (e.deltaY > 0) item.scrollLeft += 100;
    else item.scrollLeft -= 100;
});
