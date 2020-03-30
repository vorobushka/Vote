$(document).ready(function () {

  var isTouchDevice = 'ontouchstart' in document.documentElement;
  $(".star").mouseover(function (event) {
    if (isTouchDevice == false) {
      $(this).children().find('path[type=star]').css({
        'fill': 'rgba(247,217,133, 0.2)'
      });
      $(this).children().find('path[type=back]').css({
        'stroke': 'rgba(247,217,133, 0.2)'
      });
    }
  });
  $(".star").mouseout(function (event) {
    if (isTouchDevice == false) {
      $(this).children().find('path[type=star]').css({
        'fill': 'rgba(255,255,255,0.2)'
      });
      $(this).children().find('path[type=back]').css({
        'stroke': 'black'
      });
    }
  $('.star').on('touchstart', function () {
    if (isTouchDevice) {
      $(this).children().find('path[type=star]').css({
        'fill': 'rgba(247,217,133, 0.2)'
      });
      $(this).children().find('path[type=back]').css({
        'stroke': 'rgba(247,217,133, 0.2)'
      });
    }
  });
  $('.star').on('touchend', function () {
    if (isTouchDevice) {
      $(this).children().find('path[type=star]').css({
        'fill': 'rgba(255,255,255,0.2)'
      });
      $(this).children().find('path[type=back]').css({
        'stroke': 'black'
      });
    }
  });
});
var ratingItem = $(".star");

ratingItem.click(async function () {
  var data = $(this).attr('data-rate');
  const res = await fetch("/", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: data
    })
  })
});

ratingItem.click(function (e) {
  var target = $(e.target).parent().parent()
  if (target.hasClass("star")) {
    $(this).addClass('active')
    $(this).children().find('path[type=star]').css({
      'fill': 'rgba(247,217,133)'
    })
    mouseOverActive(ratingItem)
    ratingItem.unbind('mouseover mouseout')
    $(".star:eq(0)").addClass("slideRight");
    $(".star:eq(1)").addClass("slideRight2");
    $(".star:eq(3)").addClass("slideRight4");
    $(".star:eq(4)").addClass("slideRight5");
    setTimeout(function () {
      $('.vote').css({
        'display': 'none'
      })
      $('.result').css({
        'display': 'block'
      })
    }, 2000)
  }

})

function mouseOverActive(arr) {
  for (let i = 0; i < arr.length; i++) {
    if ($(arr[i]).hasClass('active')) {
      break;
    } else {
      $(arr[i]).children().find('path[type=star]').css({
        'fill': 'rgba(247,217,133)'
      });
      $(arr[i]).children().find('path[type=back]').css({
        'stroke': 'black'
      })
    }
  }
}

});