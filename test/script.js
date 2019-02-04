$('.moins').click(function () {
    var nb = $('.number').val();
    nb--;
    $('.number').val(nb)
})

$('.plus').click(function () {
    var nb = $('.number').val();
    nb++;
    $('.number').val(nb)
})
