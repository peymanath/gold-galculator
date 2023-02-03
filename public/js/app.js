const allInput = document.getElementsByClassName("input");
function str_replace(search, replace, subject, countObj) {
	var i = 0;
	var j = 0;
	var temp = "";
	var repl = "";
	var sl = 0;
	var fl = 0;
	var f = [].concat(search);
	var r = [].concat(replace);
	var s = subject;
	var ra = Object.prototype.toString.call(r) === "[object Array]";
	var sa = Object.prototype.toString.call(s) === "[object Array]";
	s = [].concat(s);

	var $global = typeof window !== "undefined" ? window : global;
	$global.$locutus = $global.$locutus || {};
	var $locutus = $global.$locutus;
	$locutus.php = $locutus.php || {};

	if (typeof search === "object" && typeof replace === "string") {
		temp = replace;
		replace = [];
		for (i = 0; i < search.length; i += 1) {
			replace[i] = temp;
		}
		temp = "";
		r = [].concat(replace);
		ra = Object.prototype.toString.call(r) === "[object Array]";
	}

	if (typeof countObj !== "undefined") {
		countObj.value = 0;
	}

	for (i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === "") {
			continue;
		}
		for (j = 0, fl = f.length; j < fl; j++) {
			temp = s[i] + "";
			repl = ra ? (r[j] !== undefined ? r[j] : "") : r[0];
			s[i] = temp.split(f[j]).join(repl);
			if (typeof countObj !== "undefined") {
				countObj.value += temp.split(f[j]).length - 1;
			}
		}
	}
	return sa ? s : s[0];
}
function numToLatin($string) {
	//arrays of persian and latin numbers
	var $persian_num = new Array("۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹");
	var $latin_num = new Array(0, 1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9);
	$string = str_replace($persian_num, $latin_num, $string);
	return $string;
}
function getNumberVal(e) {
	if (typeof e == "undefined" || e == "") return 0;
	e = str_replace(",", "", e);
	e = numToLatin(e);
	return parseFloat(e);
}
function getPrice($string) {
	if (typeof $string == "undefined" || $string == "") return 0;
	var $number = str_replace(",", "", $string);
	var $val = numToLatin($number);
	return parseFloat($val);
}

const calculatePrice = () => {
	let rpSales = 0;
	let rpGold = 0;
	let rpGrant = 0;
	let rpProfit = 0;
	let rpTax = 0;
	let rpOther = 0;

	const weightInput = getNumberVal(document.getElementById("weight-input").value);
	const goldDailyRateInput = getPrice(document.getElementById("gold-daily-rate-input").value);
	const salesProfitInput = getNumberVal(document.getElementById("sales-profit-input").value);
	const discountInput = getPrice(document.getElementById("discount-input").value);
	const taxInput = getNumberVal(document.getElementById("tax-input").value);
	const constructionWagesInput = getPrice(document.getElementById("construction-wages-input").value);
	const constructionWagesPercentInput = getNumberVal(document.getElementById("construction-wages-percent-input").value);
	const jewelValueInput = getPrice(document.getElementById("jewel-value-input").value);
	const valueStoneInput = getPrice(document.getElementById("value-stone-input").value);
	const valueOtherBelongingsInput = getPrice(document.getElementById("value-other-belongings-input").value);

	// calculate Other price
	rpOther = valueStoneInput + jewelValueInput + valueOtherBelongingsInput;
	let rpGrantTotal = constructionWagesInput > 0 ? constructionWagesInput : 0;
	if (constructionWagesPercentInput > 0) rpGrantTotal += goldDailyRateInput * (constructionWagesPercentInput / 100);

	// calculate Gold
	rpGold = goldDailyRateInput * weightInput;

	// calculate grant
	rpGrant = rpGrantTotal * weightInput;

	// calculate profit
	rpProfit = ((rpGold + rpGrant + rpOther) * salesProfitInput) / 100;

	// calculate tax
	rpTax = (rpProfit + rpGrant + rpOther) * (taxInput / 100);

	// calculate sales
	rpSales = rpGold + rpGrant + rpProfit + rpTax + rpOther - discountInput;

	document.getElementById("rpSales").innerHTML = parseInt(rpSales).toLocaleString("fa-IR");
	document.getElementById("rpGold").innerHTML = parseInt(rpGold).toLocaleString("fa-IR");
	document.getElementById("rpGrant").innerHTML = parseInt(rpGrant).toLocaleString("fa-IR");
	document.getElementById("rpProfit").innerHTML = parseInt(rpProfit).toLocaleString("fa-IR");
	document.getElementById("rpTax").innerHTML = parseInt(rpTax).toLocaleString("fa-IR");

	document.getElementById("cwp").innerHTML = parseInt(constructionWagesPercentInput).toLocaleString("fa-IR");
	document.getElementById("cwp-toman").innerHTML = parseInt(constructionWagesInput).toLocaleString("fa-IR");
	document.getElementById("sp").innerHTML = parseInt(salesProfitInput).toLocaleString("fa-IR");
	document.getElementById("tax").innerHTML = parseInt(taxInput).toLocaleString("fa-IR");
};

document.addEventListener("DOMContentLoaded", calculatePrice);

[...allInput].forEach(e => {
	e.addEventListener("change", calculatePrice);
	e.addEventListener("keyup", calculatePrice);
});