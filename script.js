//VariablesGlobales
var Interval

//Click Function
function Pixel(px, dmg) {
    if (dmg == null) {
        dmg = parseInt($("#Dano").text());
    }

    var ActualHealth = parseInt($(px).text());
    var Health = ActualHealth - dmg;

    if (Health <= 0) {
        $(px).addClass('Ticado');
        $(px).removeClass('Pixel');
        $(px).off('click');
        $(px).text("");

        $("#Pixeles").text(parseInt($("#Pixeles").text()) + 1)

        $('.Cuadrado').attr('property', parseInt($('.Cuadrado').attr('property')) - 1)

        $("#PixelToNextLvl").text($('.Cuadrado').attr('property'));

        if ($('.Cuadrado').attr('property') == "0") {
            $('.Ticado').addClass('Pixel');
            $('.Ticado').removeClass('Ticado');
            $('.Cuadrado').attr('property', 289);
            $("#PixelToNextLvl").text(289);
            $('.Pixel').on('click', function (e) {
                Pixel(this)
            });

            $(".Cuadrado").attr("title", parseInt($(".Cuadrado").attr("title")) + 1)

            var NivelActual = $(".Cuadrado").attr("title");

            $("#Nivel").text(NivelActual);
            $('.Pixel').text(NivelActual);


            if (NivelActual == 5){
                ComenzarPixCoins();
            }

            if (NivelActual > 5){
                AñadirPixCoins(NivelActual / 250 * 1.23);
            }
            
            Guardado()
            return true;
        }
    } else {
        $(px).text(Health);
    }
}



//Click
function ActiveDmg() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#Dano_Cost").text())) {
        DescontarPixeles(parseInt($("#Dano_Cost").text()));
        $("#Dano").text(parseInt($("#Dano").text()) + 1)
        ActualizarPrecio("Dano_Cost",1.12);
    }
}
function ActiveMultiClick() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#ExtraHits_Cost").text())) {
        DescontarPixeles(parseInt($("#ExtraHits_Cost").text()));
        $("#ExtraHits").text(parseInt($("#ExtraHits").text()) + 1)
        ActualizarPrecio("ExtraHits_Cost",1.12);
    }
}



//Hitters
function IdleHitters() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#IdleHitters_Cost").text())) {
        DescontarPixeles(parseInt($("#IdleHitters_Cost").text()));
        $("#IdleHitters").text(parseInt($("#IdleHitters").text()) + 1)
        ActualizarPrecio("IdleHitters_Cost",1.12);
    }
}
function IdleHittersDmg() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#IdleDmg_Cost").text())) {
        DescontarPixeles(parseInt($("#IdleDmg_Cost").text()));
        $("#IdleDmg").text(parseInt($("#IdleDmg").text()) + 1)
        ActualizarPrecio("IdleDmg_Cost",1.25);
    }
}
function IdleHittersCrit() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#IdleCritHit_Cost").text())) {
        DescontarPixeles(parseInt($("#IdleCritHit_Cost").text()));
        $("#IdleCritHit").text(parseInt($("#IdleCritHit").text()) + 1)
        ActualizarPrecio("IdleCritHit_Cost",1.15);
    }
}

//PixCoins
function ComenzarPixCoins() {
    $("#Interrogations").addClass("Ocultar");
    $("#PixCoins").removeClass("Ocultar");
    $("#Btn-ResetGame").removeClass("Ocultar");
}

function AñadirPixCoins(PC) {
    var NextPixCoins = parseFloat($("#NextPixCoins").text()) + PC;
    $("#NextPixCoins").text(NextPixCoins.toFixed(2));
}

function ResetGame(){
    if (confirm("On reset you will get " + $("#NextPixCoins").text() + " PixCoins. This will reset all progres except PixCoins and PixCoins Upgrades. Reset?" )) {
        var NextPixCoins = parseFloat($("#NextPixCoins").text());
        if (NextPixCoins != 0 && NextPixCoins != '' && NextPixCoins != null && NextPixCoins != 'NaN') {
            $("#ActualPixCoins").text(NextPixCoins.toFixed(2));
            $("#PixCoinsUpgrades").removeClass("Ocultar");
            ValoresDefault();
        }
    }
}

function IdleHittersInterval(){
    if (parseFloat($("#ActualPixCoins").text()) >= parseFloat($("#IdleHittersInterval_Cost").text())) {
        DescontarPixCoins(parseFloat($("#IdleHittersInterval_Cost").text()));
        var NextInterval = (parseFloat($("#IdleHittersInterval").text()) - 0.1).toFixed(2);
        $("#IdleHittersInterval").text(NextInterval)
        ActualizarPrecioFloat("IdleHittersInterval_Cost",1.43);

        var ms = NextInterval * 1000;
        ModificarInterval(ms);
    }
}

//Funcionalidades
function DescontarPixeles(value) {
    $("#Pixeles").text(parseInt($("#Pixeles").text()) - value)
}

function ActualizarPrecio(id,porc) {
    $("#" + id).text(Math.round(parseInt($("#" + id).text()) * porc));
}

function ActualizarPrecioFloat(id,porc) {
    $("#" + id).text((parseFloat($("#" + id).text()) * porc).toFixed(2));
}

function DescontarPixCoins(value) {
    var NewValue = (parseFloat($("#ActualPixCoins").text()) - value).toFixed(2);
    $("#ActualPixCoins").text(NewValue)
}

function ModificarInterval(ms) {
    clearInterval(Interval);
    Interval = setInterval(function () {
        var IdleHitters = parseInt($("#IdleHitters").text());
        for (var i = 0; i < IdleHitters; i += 1) {
            var randomIndex = Math.floor(Math.random() * $('.Pixel').length);
            var dmg = parseInt($("#IdleDmg").text());

            var Perc = $("#IdleCritHit").text();
            Perc = parseFloat(parseInt($("#IdleCritHit").text())/100)

            if (Math.random() < Perc) {
                dmg = dmg * 2;
            }

            var Completo = Pixel($('.Pixel')[randomIndex], dmg);

            if (Completo){
                break;
            }
        }
    }, ms);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + window.location.hostname;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function Guardado() {
    var Pixeles = $("#Pixeles").text();
    setCookie("Pixeles", Pixeles, 365);
    var Cuadrado_Title = $(".Cuadrado").attr("title");
    setCookie("Cuadrado_Title", Cuadrado_Title, 365);

    var Dano = $("#Dano").text();
    setCookie("Dano", Dano, 365);
    var Dano_Cost = $("#Dano_Cost").text();
    setCookie("Dano_Cost", Dano_Cost, 365);

    var IdleHitters = $("#IdleHitters").text();
    setCookie("IdleHitters", IdleHitters, 365);
    var IdleHitters_Cost = $("#IdleHitters_Cost").text();
    setCookie("IdleHitters_Cost", IdleHitters_Cost, 365);

    var IdleDmg = $("#IdleDmg").text();
    setCookie("IdleDmg", IdleDmg, 365);
    var IdleDmg_Cost = $("#IdleDmg_Cost").text();
    setCookie("IdleDmg_Cost", IdleDmg_Cost, 365);

    var IdleCritHit = $("#IdleCritHit").text();
    setCookie("IdleCritHit", IdleCritHit, 365);
    var IdleCritHit_Cost = $("#IdleCritHit_Cost").text();
    setCookie("IdleCritHit_Cost", IdleCritHit_Cost, 365);

    var ActualPixCoins = $("#ActualPixCoins").text();
    setCookie("ActualPixCoins", ActualPixCoins, 365);
    var NextPixCoins = $("#NextPixCoins").text();
    setCookie("NextPixCoins", NextPixCoins, 365);

    var IdleHittersInterval = $("#IdleHittersInterval").text();
    setCookie("IdleHittersInterval", IdleHittersInterval, 365);
    var IdleHittersInterval_Cost = $("#IdleHittersInterval_Cost").text();
    setCookie("IdleHittersInterval_Cost", IdleHittersInterval_Cost, 365);

    console.log("Guardado Automatico");
}

function RecuperarGuardado() {

    $("#Pixeles").text(getCookie("Pixeles"));
    $("#Nivel").text(getCookie("Cuadrado_Title"));
    $(".Cuadrado").attr("title", getCookie("Cuadrado_Title"));

    $("#Dano").text(getCookie("Dano"));
    $("#Dano_Cost").text(getCookie("Dano_Cost"));

    $("#IdleHitters").text(getCookie("IdleHitters"));
    $("#IdleHitters_Cost").text(getCookie("IdleHitters_Cost"));

    $("#IdleDmg").text(getCookie("IdleDmg"));
    $("#IdleDmg_Cost").text(getCookie("IdleDmg_Cost"));

    $("#IdleCritHit").text(getCookie("IdleCritHit"));
    $("#IdleCritHit_Cost").text(getCookie("IdleCritHit_Cost"));


    var ActPixCoins = getCookie("ActualPixCoins");
    var NxtPixCoins = getCookie("NextPixCoins");
    if (ActPixCoins != 0) {
        ComenzarPixCoins();
        $("#PixCoinsUpgrades").removeClass("Ocultar");
        $("#ActualPixCoins").text(getCookie("ActualPixCoins"));
    }
    if (NxtPixCoins != 0.1) {
        ComenzarPixCoins();
        $("#NextPixCoins").text(getCookie("NextPixCoins"));
    }

    $("#IdleHittersInterval").text(getCookie("IdleHittersInterval"));
    ModificarInterval($("#IdleHittersInterval").text() * 1000)
    $("#IdleHittersInterval_Cost").text(getCookie("IdleHittersInterval_Cost"));
}

function HardReset() {
    if(confirm("Esta seguro de eliminar todo?")){
        var cookies = document.cookie();
        for(var cookie in cookies) {
        document.removeCookie(cookie);
        }
        location.reload();
    }
}

function ValoresDefault() {
    $("#Pixeles").text(0);
    $("#Nivel").text(1);
    $(".Cuadrado").attr("title", 1);

    $("#Dano").text(1);
    $("#Dano_Cost").text(12);

    $("#IdleHitters").text(1);
    $("#IdleHitters_Cost").text(20);

    $("#IdleDmg").text(1);
    $("#IdleDmg_Cost").text(70);

    $("#IdleCritHit").text(0);
    $("#IdleCritHit_Cost").text(50);

    $('.Ticado').addClass('Pixel');
    $('.Ticado').removeClass('Ticado');
    $('.Cuadrado').attr('property', 289);
    $("#PixelToNextLvl").text(289);
    $('.Pixel').on('click', function (e) {
        Pixel(this)
    });

    $("#NextPixCoins").text('0')

    $("#Nivel").text(1);
    $('.Pixel').text(1);

    Guardado();
}

function RegistrarVisita() {
    $.getJSON("https://jsonip.com?callback=?", function (data) {
        $.ajax({
            url: 'https://intranet2.ventanasbrisa.com/Outside/RegistrarVisita',
            crossDomain: true,
            type: 'POST',
            data: { ip: data.ip, country: data.country,app: 'IncrementalGame_Pixels' }
        });
	});
}

function ObtenerVisitas(){
    $.ajax({
        url: 'https://intranet2.ventanasbrisa.com/Outside/ObtenerVisitasPorApp',
        crossDomain: true,
        type: 'GET',
        data: { app: 'IncrementalGame_Pixels' },
        success: function (data) {
            var Totales = 0;
            
            for (var i = 0; i < data.length; i += 1) {
                Totales += data[i].visitas;
                $("#Visitas").append("<p>" + data[i].country + ": " + data[i].visitas + "</p>")
            }

            $("#Visitas").append("<p>Totals: " + Totales + "</p>")
        }
    });
}