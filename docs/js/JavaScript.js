onload = function(params) {
  $("#invitation-more-button").click(function() {
    $(".invitation-more").slideToggle(500);
    // $("html, body").animate(
    //   { scrollTop: $(".invitation-more").offset().top },
    //   600,
    //   function() {}
    // );
  });

  $("#checkbox").change(() => {
    if ($("#checkbox").attr("checked")) {
      $("#plusOne").css("display", "flex");
    } else {
      $("#plusOne").css("display", "none");
    }
  });

  $(function() {
    var height = 1.7;
    $(".galleria").height($(".galleria").width() / height);
    $(window).resize(function() {
      $(".galleria").height($(".galleria").width() / height);
    });
  });

  (function galleria(params) {
    var data = [
      { image: "photo/maria_latonina-1027.jpg" },
      { image: "photo/maria_latonina-1058.jpg" },
      { image: "photo/maria_latonina-1066.jpg" }
    ];
    Galleria.loadTheme("galleria/themes/classic/galleria.classic.min.js");
    Galleria.run(".galleria", {
      autoplay: 5000,
      // clicknext: true
      dataSource: data,
      fullscreenDoubleTap: true,
      transition: "flash",
      transitionSpeed: 500
    });
  })();

  // Galleria.ready(function (options) {

  //   this.enterFullscreen(() => { })
  // });

  // var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");
  // ctx.beginPath();
  // ctx.arc(150, 100, 50, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2) / 60 * 30, false);
  // ctx.stroke();

  (function() {
    var canvas = {
      day: {
        getElement: document.getElementById("day"),
        ctx: document.getElementById("day").getContext("2d"),
        number: document.getElementById("spanDay"),
        text: document.getElementById("spanDayText")
      },
      hour: {
        getElement: document.getElementById("hour"),
        ctx: document.getElementById("hour").getContext("2d"),
        number: document.getElementById("spanHour"),
        text: document.getElementById("spanHourText")
      },
      minute: {
        getElement: document.getElementById("minute"),
        ctx: document.getElementById("minute").getContext("2d"),
        number: document.getElementById("spanMinute"),
        text: document.getElementById("spanMinuteText")
      },
      second: {
        getElement: document.getElementById("second"),
        ctx: document.getElementById("second").getContext("2d"),
        number: document.getElementById("spanSecond"),
        text: document.getElementById("spanSecondText")
      },
      clear: function() {
        this.day.ctx.clearRect(
          0,
          0,
          this.day.getElement.width,
          this.day.getElement.height
        );
        this.hour.ctx.clearRect(
          0,
          0,
          this.hour.getElement.width,
          this.hour.getElement.height
        );
        this.minute.ctx.clearRect(
          0,
          0,
          this.minute.getElement.width,
          this.minute.getElement.height
        );
        this.second.ctx.clearRect(
          0,
          0,
          this.second.getElement.width,
          this.second.getElement.height
        );
        this.init();
      },
      setTime: function(param, flag) {
        this.clear();
        this.day.number.textContent = param.days;
        this.day.text.textContent = declOfNum(param.days, "day");
        this.circleDrawing(
          this.day.ctx,
          "rgba(255, 255, 255, 1)",
          { sector: 365, count: 365 - param.days },
          false
        );
        this.hour.number.textContent = param.hours;
        this.hour.text.textContent = declOfNum(param.hours, "hours");
        this.circleDrawing(
          this.hour.ctx,
          "rgba(255, 255, 255, 1)",
          { sector: 24, count: 24 - param.hours },
          false
        );
        this.minute.number.textContent = param.minutes;
        this.minute.text.textContent = declOfNum(param.minutes, "minutes");
        this.circleDrawing(
          this.minute.ctx,
          "rgba(255, 255, 255, 1)",
          { sector: 60, count: 60 - param.minutes },
          false
        );
        this.second.number.textContent = param.seconds;
        this.second.text.textContent = declOfNum(param.seconds, "seconds");
        this.circleDrawing(
          this.second.ctx,
          "rgba(255, 255, 255, 1)",
          { sector: 60, count: 60 - param.seconds },
          false
        );
      },
      init: function() {
        _init(this, this.day.ctx);
        _init(this, this.hour.ctx);
        _init(this, this.minute.ctx);
        _init(this, this.second.ctx);

        function _init(obj, ctx) {
          ctx.lineWidth = 5;
          obj.circleDrawing(
            ctx,
            "rgba(255, 255, 255, 0.18)",
            { sector: 60, count: 60 },
            false
          );
        }
      },
      x: 37.5,
      y: 37.5,
      radius: 33,
      circleDrawing: function(ctx, color, params, flag) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(
          this.x,
          this.y,
          this.radius,
          flag
            ? -Math.PI / 2 +
              ((Math.PI * 2) / params.sector) * (params.count - 1)
            : -Math.PI / 2,
          -Math.PI / 2 + ((Math.PI * 2) / params.sector) * params.count,
          false
        );
        ctx.stroke();
      }
    };
    canvas.init();
    (function go() {
      var date = getTimeRemaining("2018.08.18 15:45:00");
      canvas.setTime(date);
      setTimeout(go, 1000);
    })();

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }

    function declOfNum(n, timeUnits) {
      var titles = {
        day: ["день", "дня", "дней"],
        hours: ["час", "часа", "часов"],
        minutes: ["минута", "минуты", "минут"],
        seconds: ["секунда", "секунды", "секунд"]
      };
      return titles[timeUnits][
        n % 10 === 1 && n % 100 !== 11
          ? 0
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
      ];
    }
  })();
};

(function initFirebase() {
  var config = {
    apiKey: "AIzaSyBpkzjJMdl_DvAGltY7fn-FkFAcveOLiUA",
    authDomain: "landingpage-3b330.firebaseapp.com",
    databaseURL: "https://landingpage-3b330.firebaseio.com",
    projectId: "landingpage-3b330",
    storageBucket: "landingpage-3b330.appspot.com",
    messagingSenderId: "781723110833"
  };
  firebase.initializeApp(config);
})();

function confirm(data) {
  var $that = $(data);
  var formData = new FormData($that.get(0));
  var data = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    comment: formData.get("comment"),
    plusOne:
      formData.get("checkbox") == null
        ? false
        : {
            name: formData.get("plusOneName"),
            surname: formData.get("plusOneSurname")
          }
  };
  var insertData = firebase
    .database()
    .ref("/guests")
    .push(data);
  $that.html(
    '<p style="color: white; text-align: center; width: 100%">Подтверждение отправлено</p>'
  );
}

// function test() {
//   var postData = {
//     author: "asdas",
//     uid: "asdasd"
//   };
//   //   var newPostKey = firebase
//   //     .database()
//   //     .ref()
//   //     .child("/guests")
//   //     .push().key;
//   //   firebase
//   //     .database()
//   //     .ref("guests/X1nH66Nb4L8FTQhRXKSf")
//   //     .set({
//   //       username: "asdasd"
//   //     });
//   var insertData = firebase
//     .database()
//     .ref("/guests")
//     .push(postData);
//   console.log(insertData);
// }

// function lol(params) {
//   //"/guests/X1nH66Nb4L8FTQhRXKSf/test"
//   var starCountRef = firebase.database().ref("guests/");
//   starCountRef.on("value", function(snapshot) {
//     console.log(snapshot.val());
//   });
// }
