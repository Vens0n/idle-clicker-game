var data
var showpres = false;
var clickswithoutbutton = 0;
var autobuyon = false;

document.addEventListener('keyup', event => {
	doclick()
	data.clickswithoutbutton = data.clickswithoutbutton - 1
})

function load() {
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
	document.getElementById("presmenu").style.display = "none";
	document.getElementById("acheivments").style.display = "none";
	if (isNaN(localStorage.getItem("info"))) {
		data = JSON.parse(localStorage.getItem("info"));
	} else {
		reset()
		alert("Welcome new player")
	}
	if (!data) data = {}
	if (!data.autobonus) data.autobonus = 1;
	if (!data.autoclickstart) data.autoclickstart = 0;
	if (!data.clickbonus) data.clickbonus = 1;
	if (!data.prespoints) data.prespoints = 0;
	if (!data.money) data.money = 0;
	if (!data.timeplayed) data.timeplayed = 0;
	if (!data.points) data.points = 0;
	if (!data.boost) data.boost = 1;
	if (!data.clickdam) data.clickdam = 1;
	if (!data.upgrade) data.upgrade = [];
	if (!data.skills) data.skills = [];
	if (!data.ach) data.ach = [];
	if (!data.clicks) data.clicks = 0;
	if (!data.clickswithoutbutton) data.clickswithoutbutton = 0;
	if (!data.autobuy) data.autobuy = false;
	if (!data.startmoney) data.startmoney = 0;
	if (!data.sps) data.sps = 0;
	if (!data.autobuyon) data.autobuyon = false;
	document.getElementById("stats").style.display = "none";

	document.getElementById("tab").innerHTML = data.autobuyon
	document.getElementById("presbonus").innerHTML = data.boost.toFixed(1) + "x";
  
	setInterval(function() {

    if(data.money >= 5000 && !data.ach.includes(1)) {
      data.ach.push(1)
      data.prespoints = data.prespoints + 1
    }
    if(data.boost > 1 && !data.ach.includes(2)) {
      data.ach.push(2)
      data.prespoints = data.prespoints + 1
    }
    if(data.money >= 100000 && !data.ach.includes(3)) {
      data.ach.push(3)
      data.prespoints = data.prespoints + 1
    }
    if(data.prespoints >= 5 && !data.ach.includes(4)) {
      data.ach.push(4)
      data.prespoints = data.prespoints + 2
    }
    if(data.money >= 50000000 && !data.ach.includes(5)) {
      data.ach.push(5)
      data.prespoints = data.prespoints + 2
    }
    if(data.clickswithoutbutton > 1000 && !data.ach.includes(6)) {
      data.ach.push(6)
      data.prespoints = data.prespoints + 4
    }
    if(data.boost >= 10 && !data.ach.includes(7)) {
      data.ach.push(7)
      data.prespoints = data.prespoints + 4
    }
    if(data.money > 50000000000 && !data.ach.includes(8)) {
      data.ach.push(8)
      data.prespoints = data.prespoints + 5
    }
    if(data.clickswithoutbutton >= 10000 && !data.ach.includes(9)) {
      data.ach.push(9)
      data.prespoints = data.prespoints + 6
    }
    if(data.prespoints >= 30 && !data.ach.includes(10)) {
      data.ach.push(10)
      data.prespoints = data.prespoints + 6
    }
    if(data.money >= 500000000000 && !data.ach.includes(11)) {
      data.ach.push(11)
      data.prespoints = data.prespoints + 6
    }
    if(((data.clickdam * data.boost) * data.clickbonus).toFixed(2) >= 500000 && !data.ach.includes(12)) {
      data.ach.push(12)
      data.prespoints = data.prespoints + 6
    }
    if(((data.clickdam * data.bonus) * data.boost) / 99 >= 50000 && !data.ach.includes(13)) {
      data.ach.push(13)
      data.prespoints = data.prespoints + 6
    }
    if(data.playtime >= 432000 && !data.ach.includes(14)) {
      data.ach.push(14)
      data.prespoints = data.prespoints + 7
    }
    if(data.clickswithoutbuttons >= 25000 && !data.ach.includes(15)) {
      data.ach.push(15)
      data.prespoints = data.prespoints + 8
    }
    if(data.playtime >= 1210000 && !data.ach.includes(16)) {
      data.ach.push(16)
      data.prespoints = data.prespoints + 25
    }
    


		document.getElementById("tab").innerHTML = data.autobuyon
		document.getElementById("idfk").innerHTML = data.clickswithoutbutton.toFixed(0);
		document.getElementById("clickdam").innerHTML = abbrNum(((data.clickdam * data.boost) * data.clickbonus).toFixed(2), 2);
		document.getElementById("autoclickdam").innerHTML = abbrNum(((data.autoclickdam * data.autobonus) * data.boost).toFixed(2), 2) + " / Second";
    document.getElementById("showtime").innerHTML = new Date(data.timeplayed * 1000).toISOString().substr(11, 8);
    data.money = data.money + ((data.autoclickdam * data.autobonus) * data.boost) / 99;
		data.prespoints = data.prespoints + (data.sps / 3600000)
		if (showpres) { 

			document.getElementById("money").innerHTML = abbrNumNoMon(data.prespoints.toFixed(), 2) + " Skill Points";
		} else {
			document.getElementById("money").innerHTML = abbrNum(data.money.toFixed(2), 2);
		}
		if (!data.autoclickdam) data.autoclickdam = data.autoclickstart;
		data.points = data.points + (0.0005 / (data.boost / 2))
		document.getElementById("points").style.width = data.points + "%";
		if (data.points >= 100) {
			document.getElementById("points").innerHTML = "PRESTIGE";
			data.points = 100;
		}
		if (data.autobuyon) {
			try {
				eval("upgrade" + (data.upgrade.length + 1) + "();")
			} catch {}
		}
    data.timeplayed = data.timeplayed + 0.01;
		document.getElementById("clickme").innerHTML = abbrNumNoMon(data.clicks, 2) + " Clicks";
		localStorage.setItem("info", JSON.stringify(data));
		data = JSON.parse(localStorage.getItem("info"));
  data.ach.forEach(grade => {
		try {
			document.getElementById("ach" + grade).innerHTML = "CLAIMED"
		} catch {}
	})
    
	}, 10);

	data.upgrade.forEach(grade => {
		try {
			document.getElementById("up" + grade).remove()
		} catch {}
	})
	data.skills.forEach(grade => {
		try {
			document.getElementById("sk" + grade).remove()
		} catch {}
	})

	if (data.money < 10) data.money = data.startmoney
}

if (!isNaN(localStorage.getItem("info").money)) {
	localStorage.setItem("info", JSON.stringify(data));
}

function toggleab() {
	if (data.autobuy) {
		data.autobuyon = !data.autobuyon;
		document.getElementById("tab").innerHTML = data.autobuyon
	}
}

function acheivments() {
	if (document.getElementById("acheivments").style.display === "none") {
		document.getElementById("shop").style.display = "none";
		document.getElementById("presmenu").style.display = "none";
		document.getElementById("stats").style.display = "none";
		document.getElementById("acheivments").style.display = "block";
		document.getElementById("skills").style.display = "none";
    document.body.style.overflow = "scroll";
		showpres = false;
	} else {
		document.getElementById("shop").style.display = "block";
		document.getElementById("presmenu").style.display = "none";
		document.getElementById("stats").style.display = "none";
		document.getElementById("acheivments").style.display = "none";
		document.getElementById("skills").style.display = "none";
    document.body.style.overflow = "hidden";
		showpres = false;
	}
}

function showstats() {
	if (document.getElementById("stats").style.display === "none") {
		document.getElementById("shop").style.display = "none";
		document.getElementById("presmenu").style.display = "none";
		document.getElementById("stats").style.display = "block";
		document.getElementById("acheivments").style.display = "none";
		document.getElementById("skills").style.display = "none";
    document.body.style.overflow = "scroll";
		showpres = false;
	} else {
		document.getElementById("shop").style.display = "block";
		document.getElementById("presmenu").style.display = "none";
		document.getElementById("stats").style.display = "none";
		document.getElementById("acheivments").style.display = "none";
		document.getElementById("skills").style.display = "none";
    document.body.style.overflow = "hidden";
		showpres = false;
	}
}

function presmenu() {
	if (document.getElementById("presmenu").style.display === "none") {
		document.getElementById("shop").style.display = "none";
		document.getElementById("presmenu").style.display = "block";
		document.getElementById("stats").style.display = "none";
		document.getElementById("acheivments").style.display = "none";
		document.getElementById("skills").style.display = "none";
    document.body.style.overflow = "scroll";
		showpres = true;
	} else {
		document.getElementById("shop").style.display = "block";
		document.getElementById("presmenu").style.display = "none";
		document.getElementById("stats").style.display = "none";
		document.getElementById("acheivments").style.display = "none";
		document.getElementById("skills").style.display = "none";
    document.body.style.overflow = "hidden";
		showpres = false;
	}
}

function skillmenu() {
	if (document.getElementById("skills").style.display === "none") {
		document.getElementById("shop").style.display = "none";
		document.getElementById("presmenu").style.display = "none";
		document.getElementById("stats").style.display = "none";
		document.getElementById("acheivments").style.display = "none";
		document.getElementById("skills").style.display = "block";
    document.body.style.overflow = "scroll";
		showpres = true;
	} else {
		document.getElementById("shop").style.display = "block";
		document.getElementById("presmenu").style.display = "none";
		document.getElementById("stats").style.display = "none";
		document.getElementById("acheivments").style.display = "none";
		document.getElementById("skills").style.display = "none";
    document.body.style.overflow = "hidden";
		showpres = false;
	}
}

function pristige() {
	if (data.points >= 100) {
		localStorage.setItem("info", JSON.stringify(data = {
			"prespoints": data.prespoints + 1,
			"boost": data.boost + 0.1,
			"autobonus": data.autobonus,
			"autoclickstart": data.autoclickstart,
			"clickbonus": data.clickbonus,
			"skills": data.skills,
			"clicks": data.clicks,
			"startmoney": data.startmoney,
			"autobuy": data.autobuy,
			"autobuyon": data.autobuyon,
			"clickswithoutbutton": data.clickswithoutbutton,
			"sps": data.sps,
			"ach": data.ach
		}));
		location.reload();
	}
}

function reset() {
	localStorage.setItem("info", JSON.stringify(data = {}));
	location.reload();
}

function doclick() {
	data.money = data.money + ((data.clickdam * data.boost) * data.clickbonus);
	data.points = data.points + (0.025 / (data.boost / 2));
	data.clicks++
	data.clickswithoutbutton++
	document.getElementById("shop").style.display = "block";
	document.getElementById("presmenu").style.display = "none";
	document.getElementById("stats").style.display = "none";
	document.getElementById("acheivments").style.display = "none";
  document.body.style.overflow = "hidden";
	showpres = false;
  window.scrollTo(0, 0);
}

function ski1() {
	if (data.prespoints >= 2) {
		data.prespoints = data.prespoints - 2
    for(let i = 0;i < 500; i++) doclick(); data.clickswithoutbutton = data.clickswithoutbutton -1
    skillmenu()
	}
}

function ski2() {
	if (data.prespoints >= 5) {
		data.prespoints = data.prespoints - 5
    for(let i = 0;i < 1400; i++) doclick(); data.clickswithoutbutton = data.clickswithoutbutton -1
    skillmenu()
	}
}

function ski3() {
	if (data.prespoints >= 10) {
		data.prespoints = data.prespoints - 10
    for(let i = 0;i < 3000; i++) doclick(); data.clickswithoutbutton = data.clickswithoutbutton -1
    skillmenu()
	}
}

function skill1() {
	if (data.prespoints >= 2) {
		document.getElementById("sk1").remove()
		data.prespoints = data.prespoints - 2;
		data.autobonus = 2;
		data.skills.push("1")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill2() {
	if (data.prespoints >= 5 && data.skills[0]) {
		document.getElementById("sk2").remove()
		data.prespoints = data.prespoints - 5;
		data.clickbonus = 2;
		data.skills.push("2")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill3() {
	if (data.prespoints >= 7 && data.skills[1]) {
		document.getElementById("sk3").remove()
		data.prespoints = data.prespoints - 7;
		data.startmoney = 1000;
		data.skills.push("3")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill4() {
	if (data.prespoints >= 10 && data.skills[2]) {
		document.getElementById("sk4").remove()
		data.prespoints = data.prespoints - 10;
		data.autobuy = true;
		data.skills.push("4")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill5() {
	if (data.prespoints >= 11 && data.skills[3]) {
		document.getElementById("sk5").remove()
		data.prespoints = data.prespoints - 11;
		data.sps = 10;
		data.skills.push("5")
		data.points = data.points + (5 / (data.boost));
	}
}

function skill6() {
	if (data.prespoints >= 12 && data.skills[4]) {
		document.getElementById("sk6").remove()
		data.prespoints = data.prespoints - 12;
		data.clickbonus = 4;
		data.skills.push("6")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill7() {
	if (data.prespoints >= 14 && data.skills[5]) {
		document.getElementById("sk7").remove()
		data.prespoints = data.prespoints - 14;
		data.autoclickbonus = 10;
		data.skills.push("7")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill8() {
	if (data.prespoints >= 15 && data.skills[6]) {
		document.getElementById("sk8").remove()
		data.prespoints = data.prespoints - 15;
		data.clickbonus = 12;
		data.skills.push("8")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill9() {
	if (data.prespoints >= 15 && data.skills[7]) {
		document.getElementById("sk9").remove()
		data.prespoints = data.prespoints - 15;
		data.startmoney = 10000000;
		data.skills.push("9")
		data.points = data.points + (5 / (data.boost));

	}
}

function skill10() {
	if (data.prespoints >= 20 && data.skills[8]) {
		document.getElementById("sk10").remove()
		data.prespoints = data.prespoints - 20;
		data.sps = 30;
		data.skills.push("10")
		data.points = data.points + (5 / (data.boost));
	}
}

function skill11() {
	if (data.prespoints >= 23 && data.skills[9]) {
		document.getElementById("sk11").remove()
		data.prespoints = data.prespoints - 23;
		data.clickbonus = 20;
		data.skills.push("11")
		data.points = data.points + (5 / (data.boost));
	}
}

function skill12() {
	if (data.prespoints >= 23 && data.skills[10]) {
		document.getElementById("sk12").remove()
		data.prespoints = data.prespoints - 26;
		data.autoclickbonus = 20;
		data.skills.push("12")
		data.points = data.points + (5 / (data.boost));
	}
}
function upgrade1() {
	if (data.money >= 25) {
		document.getElementById("up1").remove()
		data.money = data.money - 25;
		data.clickdam = 2;
		data.upgrade.push("1")
		data.points = data.points + (0.5 / (data.boost));
	}
}

function upgrade2() {
	if (data.money >= 100 && data.upgrade[0]) {
		document.getElementById("up2").remove()
		data.money = data.money - 100;
		data.clickdam = 10;
		data.upgrade.push("2")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade3() {
	if (data.money >= 1000 && data.upgrade[1]) {
		document.getElementById("up3").remove()
		data.money = data.money - 1000;
		data.autoclickdam = 10;
		data.upgrade.push("3")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade4() {
	if (data.money >= 1500 && data.upgrade[2]) {
		document.getElementById("up4").remove()
		data.money = data.money - 1500;
		data.clickdam = 50;
		data.upgrade.push("4")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade5() {
	if (data.money >= 3000 && data.upgrade[3]) {
		document.getElementById("up5").remove()
		data.money = data.money - 3000;
		data.autoclickdam = 30;
		data.upgrade.push("5")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade6() {
	if (data.money >= 10000 && data.upgrade[4]) {
		document.getElementById("up6").remove()
		data.money = data.money - 10000;
		data.autoclickdam = 150;
		data.upgrade.push("6")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade7() {
	if (data.money >= 15000 && data.upgrade[5]) {
		document.getElementById("up7").remove()
		data.money = data.money - 15000;
		data.clickdam = 100;
		data.upgrade.push("7")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade8() {
	if (data.money >= 25000 && data.upgrade[6]) {
		document.getElementById("up8").remove()
		data.money = data.money - 25000;
		data.clickdam = 450;
		data.upgrade.push("8")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade9() {
	if (data.money >= 100000 && data.upgrade[7]) {
		document.getElementById("up9").remove()
		data.money = data.money - 100000;
		data.autoclickdam = 200;
		data.upgrade.push("9")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade10() {
	if (data.money >= 500000 && data.upgrade[8]) {
		document.getElementById("up10").remove()
		data.money = data.money - 500000;
		data.clickdam = 500;
		data.upgrade.push("10")

	}
}

function upgrade11() {
	if (data.money >= 600000 && data.upgrade[9]) {
		document.getElementById("up11").remove()
		data.money = data.money - 600000;
		data.clickdam = 500;
		data.upgrade.push("11")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade12() {
	if (data.money >= 1000000 && data.upgrade[10]) {
		document.getElementById("up12").remove()
		data.money = data.money - 1000000;
		data.clickdam = 700;
		data.upgrade.push("12")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade13() {
	if (data.money >= 1300000 && data.upgrade[11]) {
		document.getElementById("up13").remove()
		data.money = data.money - 1300000;
		data.clickdam = 1000;
		data.upgrade.push("13")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade14() {
	if (data.money >= 1500000 && data.upgrade[12]) {
		document.getElementById("up14").remove()
		data.money = data.money - 1500000;
		data.autoclickdam = 500;
		data.upgrade.push("14")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade15() {
	if (data.money >= 1750000 && data.upgrade[13]) {
		document.getElementById("up15").remove()
		data.money = data.money - 1750000;
		data.clickdam = 1500;
		data.upgrade.push("15")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade16() {
	if (data.money >= 2000000 && data.upgrade[14]) {
		document.getElementById("up16").remove()
		data.money = data.money - 2000000;
		data.clickdam = 2000;
		data.upgrade.push("16")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade17() {
	if (data.money >= 3000000 && data.upgrade[15]) {
		document.getElementById("up17").remove()
		data.money = data.money - 3000000;
		data.autoclickdam = 800;
		data.upgrade.push("17")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade18() {
	if (data.money >= 7000000 && data.upgrade[16]) {
		//Line 420
		document.getElementById("up18").remove()
		data.money = data.money - 7000000;
		data.clickdam = 2500;
		data.upgrade.push("18")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade19() {
	if (data.money >= 15000000 && data.upgrade[17]) {
		document.getElementById("up19").remove()
		data.money = data.money - 15000000;
		data.clickdam = 3000;
		data.upgrade.push("19")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade20() {
	if (data.money >= 17000000 && data.upgrade[18]) {
		document.getElementById("up20").remove()
		data.money = data.money - 17000000;
		data.autoclickdam = 2000;
		data.upgrade.push("20")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade21() {
	if (data.money >= 30000000 && data.upgrade[19]) {
		document.getElementById("up21").remove()
		data.money = data.money - 30000000;
		data.clickdam = 5000;
		data.upgrade.push("21")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade22() {
	if (data.money >= 70000000 && data.upgrade[20]) {
		document.getElementById("up22").remove()
		data.money = data.money - 70000000;
		data.clickdam = 7000;
		data.upgrade.push("22")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade23() {
	if (data.money >= 100000000 && data.upgrade[21]) {
		document.getElementById("up23").remove()
		data.money = data.money - 100000000;
		data.clickdam = 7000;
		data.upgrade.push("23")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade24() {
	if (data.money >= 200000000 && data.upgrade[22]) {
		document.getElementById("up24").remove()
		data.money = data.money - 200000000;
		data.clickdam = 12000;
		data.upgrade.push("24")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade25() {
	if (data.money >= 350000000 && data.upgrade[23]) {
		document.getElementById("up25").remove()
		data.money = data.money - 350000000;
		data.autoclickdam = 8000;
		data.upgrade.push("25")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade26() {
	if (data.money >= 500000000 && data.upgrade[24]) {
		document.getElementById("up26").remove()
		data.money = data.money - 500000000;
		data.clickdam = 17000;
		data.upgrade.push("26")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade27() {
	if (data.money >= 600000000 && data.upgrade[25]) {
		document.getElementById("up27").remove()
		data.money = data.money - 600000000;
		data.autoclickdam = 13000;
		data.upgrade.push("27")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade28() {
	if (data.money >= 999000000 && data.upgrade[26]) {
		document.getElementById("up28").remove()
		data.money = data.money - 999000000;
		data.clickdam = 25000;
		data.upgrade.push("28")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade29() {
	if (data.money >= 1500000000 && data.upgrade[27]) {
		document.getElementById("up29").remove()
		data.money = data.money - 1500000000;
		data.clickdam = 30000;
		data.upgrade.push("29")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade30() {
	if (data.money >= 3000000000 && data.upgrade[28]) {
		document.getElementById("up30").remove()
		data.money = data.money - 3000000000;
		data.clickdam = 40000;
		data.upgrade.push("30")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade31() {
	if (data.money >= 5000000000 && data.upgrade[29]) {
		document.getElementById("up31").remove()
		data.money = data.money - 5000000000;
		data.autoclickdam = 40000;
		data.upgrade.push("31")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade32() {
	if (data.money >= 3000000000 && data.upgrade[30]) {
		document.getElementById("up32").remove()
		data.money = data.money - 3000000000;
		data.clickdam = 70000;
		data.upgrade.push("32")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade33() {
	if (data.money >= 17000000000 && data.upgrade[31]) {
		document.getElementById("up33").remove()
		data.money = data.money - 17000000000;
		data.clickdam = 120000;
		data.upgrade.push("33")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade34() {
	if (data.money >= 25000000000 && data.upgrade[32]) {
		document.getElementById("up34").remove()
		data.money = data.money - 25000000000;
		data.clickdam = 140000;
		data.upgrade.push("34")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade35() {
	if (data.money >= 50000000000 && data.upgrade[33]) {
		document.getElementById("up35").remove()
		data.money = data.money - 50000000000;
		data.autoclickdam = 100000;
		data.upgrade.push("35")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade36() {
	if (data.money >= 66600000000 && data.upgrade[34]) {
		document.getElementById("up36").remove()
		data.money = data.money - 66600000000;
		data.autoclickdam = 110000;
		data.upgrade.push("36")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade37() {
	if (data.money >= 75000000000 && data.upgrade[35]) {
		document.getElementById("up37").remove()
		data.money = data.money - 75000000000;
		data.autoclickdam = 120000;
		data.upgrade.push("37")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade38() {
	if (data.money >= 100000000000 && data.upgrade[36]) {
		document.getElementById("up38").remove()
		data.money = data.money - 100000000000;
		data.clickdam = 200000;
		data.upgrade.push("38")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade39() {
	if (data.money >= 130000000000 && data.upgrade[37]) {
		document.getElementById("up39").remove()
		data.money = data.money - 130000000000;
		data.clickdam = 300000;
		data.upgrade.push("39")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade40() {
	if (data.money >= 150000000000 && data.upgrade[38]) {
		document.getElementById("up40").remove()
		data.money = data.money - 150000000000;
		data.clickdam = 400000;
		data.upgrade.push("40")
		data.points = data.points + (0.5 / (data.boost));

	}
}

function upgrade41() {
	if (data.money >= 200000000000 && data.upgrade[39]) {
		document.getElementById("up41").remove()
		data.money = data.money - 200000000000;
		data.clickdam = 600000;
		data.upgrade.push("41")
		data.points = data.points + (0.5 / (data.boost));

	}
}


function abbrNumNoMon(number, decPlaces) {
	// 2 decimal places => 100, 3 => 1000, etc
	decPlaces = Math.pow(10, decPlaces);
	var num = number
	// Enumerate number abbreviations
	var abbrev = ["K", "M", "B", "T", "Qi", "Qu", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "Uvg", "Bruh", "Wtf", "Omg", "Ok, no way your doing a legit play through, you have to be going into the console and changing your money, either that or your reading this code dirrectly, i don't beleive you got this far in this \"game\""];

	// Go through the array backwards, so we do the largest first
	for (var i = abbrev.length - 1; i >= 0; i--) {

		// Convert array index to "1000", "1000000", etc
		var size = Math.pow(10, (i + 1) * 3);

		// If the number is bigger or equal do the abbreviation
		if (size <= number) {
			// Here, we multiply by decPlaces, round, and then divide by decPlaces.
			// This gives us nice rounding to a particular decimal place.
			number = Math.round(number * decPlaces / size) / decPlaces;

			// Handle special case where we round up to the next abbreviation
			if ((number == 1000) && (i < abbrev.length - 1)) {
				number = 1;
				i++;
			}

			// Add the letter for the abbreviation
			number += abbrev[i];

			// We are done... stop
			break;
		}
	}
	return number;
}

function abbrNum(number, decPlaces) {
	// 2 decimal places => 100, 3 => 1000, etc
	decPlaces = Math.pow(10, decPlaces);
	var num = number
	// Enumerate number abbreviations
	var abbrev = ["K", "M", "B", "T", "Qi", "Qu", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "Uvg", "Bruh", "Wtf", "Omg", "Ok, no way your doing a legit play through, you have to be going into the console and changing your money, either that or your reading this code dirrectly, i don't beleive you got this far in this \"game\""];

	// Go through the array backwards, so we do the largest first
	for (var i = abbrev.length - 1; i >= 0; i--) {

		// Convert array index to "1000", "1000000", etc
		var size = Math.pow(10, (i + 1) * 3);

		// If the number is bigger or equal do the abbreviation
		if (size <= number) {
			// Here, we multiply by decPlaces, round, and then divide by decPlaces.
			// This gives us nice rounding to a particular decimal place.
			number = Math.round(number * decPlaces / size) / decPlaces;

			// Handle special case where we round up to the next abbreviation
			if ((number == 1000) && (i < abbrev.length - 1)) {
				number = 1;
				i++;
			}

			// Add the letter for the abbreviation
			number += abbrev[i];

			// We are done... stop
			break;
		}
	}
	if (num < 1000) number = num + "$"
	return number;
}

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}
