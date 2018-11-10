let animate_slow = 600;
let animate_fast = 300;

let MUTATIONS = {
	chameleon: "Invisibility when unarmed and standing still",
	bird_bones: "+4 INT, Falling speed slowed, -4 STR",
	eagle_eye: "Critical damage +25%, +4 PER, -4 STR",
	egg_head: "+6 INT, -3 STR, -3 END",
	electrically_charged: "Chance to shock melee attackers",
	empath: "-25% damage to team, +33% damage taken by player",
	grounded: "100% Energy Resistance, -20% Energy damage",
	healing_factor: "+300% Health Regeneration, -55% Chem effects",
	herbivore: "Vegetables gives x2 benefits and no disease, cannot eat meat.",
	carnivore: "Meat gives x2 benefits and no disease, cannot eat vegetables.",
	marsupial: "+20 carry weight and increased jump height, -4 INT",
	scaly_skin: "+50 damage and energy resistance, -25 AP",
	speed_demon: "+20 movement speed and faster reload",
	talons:
		"+25% damage using punching attacks and adds bleed damage, -4 agility",
	twisted_muscles:
		"+25% melee damage, higher chance to cripple limbs, -4 agility",
	herded_mentality: "+2 INT to group, -2 INT if on your own",
	unstoppable_isotope: "Chance to irradiate melee attackers",
	plague_walker: "Poison aura scaling with the player's diseases"
};

// Events will be sent when the boss is damaged or killed.
// Please use event listeners to run functions.
document.addEventListener("bossLoad", function (obj) {
	let data = obj.detail;
	let total_health = data.total_health || 500;
	let current_health = data.current_health || total_health;
	let fill = (current_health / total_health) * 100;

	$("#rad-bar-fill").css("width", `${fill}%`);
});
document.addEventListener("bossDamaged", function (obj) {
	let data = obj.detail;

	attack(data, function (d) {
		let total_health = parseInt(d.boss.total_health, 0) || 500;
		let current_health = d.boss.current_health || total_health;
		let fill = (current_health / total_health) * 100;
		$("#rad-bar-fill").animate(
			{
				width: `${fill}%`
			},
			animate_fast,
			function () {
				// complete
			}
		);
	});
});
// Similarly for for when a boss is killed
document.addEventListener("bossKilled", function (obj) {
	let data = obj.detail;
	attack(data, function (d) {
		$("#rad-bar-fill").animate({ width: "0%" }, animate_fast, function () {
			setTimeout(function () {
				mutation(function () {
					$("#rad-bar-fill").animate({ width: "100%" }, animate_slow, function () {
						// complete
					});
				});
			}, 1000);
		});
	});
	// do a thing to get a mutation or something...
});

function attack(data, cb) {
	if (data.message && data.message.damage && data.message.damage !== "") {
		let val = parseInt(data.message.damage.replace(/\-|\+|\s/, ""), 0);
		$("#rads-attack")
			.data("attack", val)
			.html(val.toString());
		$(".rads-bg").animate({ opacity: 1 }, animate_fast, function () {
			setTimeout(function () {
				$(".rads-bg").animate({ opacity: 0 }, animate_fast, function () { });
			}, 3000);
		});
	}

	if (cb) {
		cb(data);
	}
}

function mutation(cb) {
	$(".hp-bg").css("opacity", 0);
	$(".rads-bg").css("opacity", 0);

	let keys = Object.keys(MUTATIONS);
	let random = Math.floor(Math.random() * keys.length);
	let name = keys[random];
	let description = MUTATIONS[name];
	$(".mutation .title").html(name.replace(/_/g, " "));
	$(".mutation .desc").html(description);
	$(".mutation").animate({
		opacity: 1
	}, animate_fast, function () {
		setTimeout(function () {
			$(".mutation").animate({ opacity: 0 }, animate_fast, function () {
				$(".mutation .title").empty();
				$(".mutation .desc").empty();
				$(".hp-bg").css("opacity", 1);
				$(".rads-bg").css("opacity", 0);
				if (cb) {
					cb();
				}
			});
		}, 5000);
	});
}
