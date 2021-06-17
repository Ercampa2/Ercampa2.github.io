var item = $("body")[0]
window.addEventListener('wheel', function(e) {
    console.log(e.deltaY)
    if (e.deltaY > 0) item.scrollLeft += 100;
    else item.scrollLeft -= 100;
});
$('.dados>div').mouseenter((e)=>{
    console.log(e)
    $('.dados>div').css('border-radius','0')
    $(".info-dados").css('background-color',$(e.target).css('background-color'))
    $(".info-dados").css('opacity','1')
    $(".info-dados").text(e.target.dataset.mensagem)
})
$('.info-dados').mouseleave((e)=>{
    console.log(e)
    $(".info-dados").css('opacity','0')
    $('.dados>div:first-child').css('border-bottom-left-radius','10px')
    $('.dados>div:last-child').css('border-bottom-right-radius','10px')
})