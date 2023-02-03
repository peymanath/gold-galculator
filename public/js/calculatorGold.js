/**
 * @author Peyman Nader
 * @version 1.1.0
 * {@link https://github.com/peymanath github}
 */
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

/**
 * the main class for calculating gold
 */
class GoldCalculator {
	/**
	 * get elemnts from the document
	 * @param {String} id => the id Element
	 * @param {String} mode => the value mode can receive an input value
	 * @returns {Number || Element}
	 */
	getElement(id, mode) {
		// recive Element
		let elementItem = document.getElementById(id);

		// receive value to element
		if (mode === "value") elementItem = this.toNumber(elementItem.value);

		// return result
		return elementItem;
	}

	/**
	 * convert price & string to number
	 * @param {Number} number
	 * @returns {Number}
	 */
	toNumber(number) {
		return typeof number == "undefined" || number == ""
			? 0
			: parseFloat(this.translateNumber(number.replace(/\,/g, ""), "en"));
	}

	/**
	 *
	 * @param {String} number
	 * @param {String} language => Language List {'fa', 'en'}
	 * @returns
	 */
	translateNumber = (number, language) => {
		if (typeof number != "string") return new Error("not defined string").message;
		if (language === "fa") number = number.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
		if (language === "en") number = number.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
		return number;
	};
}

const gold = new GoldCalculator();

console.log(gold.getElement("gold-daily-rate-input", "value"));
console.log(gold.getElement("sales-profit-input", "value"));
console.log(gold.toNumber("13,45,18.45", "fa"));
