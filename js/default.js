function autoScrollVertical(div){
    div.bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function (evt) {
        if (evt.type === 'DOMMouseScroll' || evt.type === 'keyup' || evt.type === 'mousewheel') {

        }
        if (evt.originalEvent.detail < 0 || (evt.originalEvent.wheelDelta && evt.originalEvent.wheelDelta > 0)) {
            clearInterval(scrollbit);
        }
        if (evt.originalEvent.detail > 0 || (evt.originalEvent.wheelDelta && evt.originalEvent.wheelDelta < 0)) {
            clearInterval(scrollbit);
        }
    });

    var scrollbit = setInterval(function () {
        var pos = div.scrollTop();
        if ((div.scrollTop() + div.innerHeight()) >= div[0].scrollHeight) {
            clearInterval(scrollbit);
        }
        div.scrollTop(pos + 1);
    }, 250);
}
function slideSidebar(dir){
    switch(dir){
        case 'up': $('#sidemenu').slideUp();
                    break;
        case 'down': $('#sidemenu').slideDown();
                    break;
        case 'rightin': $('#sidemenu').animate({ right: "0" }, 500)
                         break;
        case 'rightout': $('#sidemenu').animate({ right: "-1000px" }, 500)
                         break;
        case 'leftin': $('#sidemenu').animate({ left: "0" }, 500)
                         break;
        case 'leftout': $('#sidemenu').animate({ left: "-1000px" }, 500)
                         break;                 
        default: break;
    }
}
function resizeBGImageParents(){
    $('.bg').each(function(){
        var imageSrc = $(this).css('background-image'),
            image_url = imageSrc.match(/^url\("?(.+?)"?\)$/),
            $self = $(this);

        if (image_url[1]) {
            image_url = image_url[1];
            image = new Image();
            image.src = image_url;

            $(image).load(function () {
                var aspectRatio = this.width/this.height,
                    initialHeight = $self.outerHeight(),
                    newHeight = ($self.outerWidth() / aspectRatio) + 'px';

                $self.css('height', newHeight);
                console.log('height ('+ initialHeight + ') changed to: ' + newHeight)
            });
        }
    });
}

$(function(){
    resizeBGImageParents(); 
    $('#sidemenu').hide();

    $(document).click(function (event) {
        if (!$(event.target).closest('#sidemenu').length && !($(event.target).is('.hamburger'))
            && $('#sidemenu').is(":visible")){
                $('.hamburger').removeClass('active');
                slideSidebar('up')
        }
    });
    $('.hamburger').click(function () {
        var $self = $(this);

        if($self.hasClass('active'))
            slideSidebar('up')
        else
            slideSidebar('down')
        $self.toggleClass('active');
    });
     $(window).on('resize orientationchange', function () {
       resizeBGImageParents(); 
    });
})