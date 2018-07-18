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

  $(function() {
    var height = 2;
    $("#map iframe").height($("#map iframe").width() / height);
    $(window).resize(function() {
      $("#map iframe").height($("#map iframe").width() / height);
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
      rgba: {
        main: `rgba(255, 255, 255, 1)`,
        background: `rgba(255, 255, 255, 0.18)`
      },
      setTime: function(params) {
        this.clear();
        this.day.number.textContent = params.days;
        this.day.text.textContent = declOfNum(params.days, "day");
        this.circleDrawing(
          this.day.ctx,
          this.rgba.main,
          { sector: 365, count: 365 - params.days },
          false
        );
        this.hour.number.textContent = params.hours;
        this.hour.text.textContent = declOfNum(params.hours, "hours");
        this.circleDrawing(
          this.hour.ctx,
          this.rgba.main,
          { sector: 24, count: 24 - params.hours },
          false
        );
        this.minute.number.textContent = params.minutes;
        this.minute.text.textContent = declOfNum(params.minutes, "minutes");
        this.circleDrawing(
          this.minute.ctx,
          this.rgba.main,
          { sector: 60, count: 60 - params.minutes },
          false
        );
        this.second.number.textContent = params.seconds;
        this.second.text.textContent = declOfNum(params.seconds, "seconds");
        this.circleDrawing(
          this.second.ctx,
          this.rgba.main,
          { sector: 60, count: 60 - params.seconds },
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
            obj.rgba.background,
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
