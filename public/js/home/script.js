$( function(){
    //Toggle show/hide detail
    // $( ".moredetail, .box-author, .box-name, .box-like-dislike-share" ).click ( function (e) {
    //     if (e.target !== this) {
    //         return;
    //     }
    //     let slug = $(this).data('slug');
    //     $(`.item_inner[data-slug="${slug}"] > .footer`).toggleClass ('footer_show');
    // });

    // $('.footer').click( function (e){
    //     if (e.target !== this) {
    //         return;
    //     }
    //     $(this).toggleClass ('footer_show');
    // });

    //Toggle show/hide clipboard
    $(".colors").hover ( function () {
        console.log('asd');
        $('.myclipboard', this).toggleClass ('clipboard_show');
    });
});
