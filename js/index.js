$(document).ready(function(){
  var country="";
  var city = "";
  var weather = "";
  var apiKey = "dde4877e16f21e977ed85729b5f59882";
  var api= "https://api.openweathermap.org/data/2.5/weather?q=";
  var temperatureC = 0;
  var temperatureF = 0;
  var celcius = "&#8451";
  var fahrenheit = "&#8457";
  var weatherIcon = "";
  var icon = "";
  var backgroundImg = "";
  var date = "";
  var isCelcius = true;
  var skycons = new Skycons({"color": "white"});
  $.getJSON("https://ipinfo.io", function(response){
    //country = response.country;
    city = response.city;
    //$('.location').html(city + ", " + country);
    getWeather(city);
  });
  function getWeather(cityF){
   $.getJSON(api + cityF + '&APPID=' + apiKey + '&units=metric', function(response){
      temperatureC = parseInt(response.main.temp);
      weather = response.weather[0].main;
      city = response.name;
     country = response.sys.country;
     temperatureF = parseInt(temperatureC * 1.8 + 32);
     icon = response.weather[0].icon;
      getImage(response.weather[0].icon);
     setDetails();
      //$('.weather').html(temperature + celcius + ", " + weather);
    });
  }
  function getImage(iconR){
    switch(iconR){
      case "01d": 
        icon = Skycons.CLEAR_DAY;
        backgroundImg = "http://www.psdgraphics.com/wp-content/uploads/2014/04/sky-sun.jpg";
        break;
      case "02d": icon = Skycons.PARTLY_CLOUDY_DAY;
        backgroundImg = "https://il3.picdn.net/shutterstock/videos/11776709/thumb/1.jpg";
        break;
      case "01n": icon = Skycons.CLEAR_NIGHT;
        backgroundImg = "https://cdn.shutterstock.com/shutterstock/videos/717376/thumb/1.jpg";
        break;
      case "02n": icon = Skycons.PARTLY_CLOUDY_NIGHT;
        backgroundImg = "http://cdn.weatheravenue.com/img/background/background-night.jpg"
        break;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        icon = Skycons.CLOUDY;
        backgroundImg = "http://www.imageafter.com/dbase/images/nature_elements/b11nature_elements015.jpg";
        break;
      case "09d":
      case "09n":
        icon = Skycons.SLEET;
        backgroundImg = "https://i.ytimg.com/vi/Wml0XvPeoJI/maxresdefault.jpg";
        break;
      case "10d":
      case "10n":
        icon= Skycons.RAIN;
        backgroundImg = "https://cdn.shutterstock.com/shutterstock/videos/8539048/thumb/1.jpg";
        break;
      case "11d":
      case "11n":
        icon= Skycons.WIND;
        backgroundImg = "http://randomwallpapers.net/windy-winter-1920x1200-wallpaper430287.jpg";
        break;
      case "13d":
      case "13n":
        icon = Skycons.SNOW;
        backgroundImg= "https://images.designtrends.com/wp-content/uploads/2016/02/28115049/Winter-Snowfall-Background.jpg";
        break;
      case "50d":
      case "50n":
        icon = Skycons.FOG;
        backgroundImg = "http://www.pptback.com/uploads/fog-and-landscapes-backgrounds-powerpoint.jpg";
        break;
               }
  }
  function setDetails(){
    $('.location').html(city + ", " + country);
    $('a').html(temperatureC + celcius);
    $('.weather').html(weather);
    skycons.set("icon", icon);
    skycons.play();
    $('.container-fluid').css('background-image', 'url(' + backgroundImg + ')');
  }
  $('a').on('click', function(){
    if(isCelcius){
      $('a').html(temperatureF + fahrenheit);
      isCelcius = false;
    }
    else{
      $('a').html(temperatureC + celcius);
      isCelcius = true;
    }
  });
  $('button').on('click', function(){
    city=$('input:text').val();
    getWeather(city);
  });
  $('input:text').on('keypress', function(e){
    if(e.keyCode==13){
    city=$('input:text').val();
    getWeather(city);
    }
  });
  
});