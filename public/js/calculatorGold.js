/**
 * @author Peyman Nader
 * @version 1.1.0
 * {@link https://github.com/peymanath github}
 */

/**
 * the main class for calculating gold
 */
class GoldCalculator {
	/**
	 * output default value
	 * @type {Number}
	 */
	salesPrice = 0;

	/**
	 * output default value
	 * @type {Number}
	 */
	goldPrice = 0;

	/**
	 * output default value
	 * @type {Number}
	 */
	grantPrice = 0;

	/**
	 * output default value
	 * @type {Number}
	 */
	profitPrice = 0;

	/**
	 * output default value
	 * @type {Number}
	 */
	taxPrice = 0;

	/**
	 * output default value
	 * @type {Number}
	 */
	otherPrice = 0;

	/**
	 * output default value
	 * @type {Number}
	 */
	wagesGold = 0;

	/**
	 * Receive all
	 * @type {Element}
	 */
	allInput = document.getElementsByClassName("input");

	/**
	 * get elemnts from the document
	 * @param {String} id => the id Element
	 * @param {String} mode => the value mode can receive an input value
	 * @returns {Number || Element}
	 */
	getElement(id, mode = "") {
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
	translateNumber(number, language = "fa") {
		if (typeof number !== "string") number = String(number);

		const translate = num => {
			// Persian Translate
			if (language === "fa") return num.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

			// English Translate
			if (language === "en") return num.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
		};

		return translate(number);
	}

	/**
	 * constructor this class
	 * @constructor
	 */
	constructor() {
		document.addEventListener("DOMContentLoaded", () => this.calculte());

		[...this.allInput].forEach(e => {
			e.addEventListener("change", () => this.calculte());
			e.addEventListener("keyup", () => this.calculte());
		});
	}

	/**
	 * manage functions calculate
	 */
	calculte() {
		// call new Update Value
		this.newUpdateValue();

		// call calculate value
		this.calculteValue();

		// push value to DOM
		this.pushValue();
	}

	/**
	 * receive & updata an input value
	 */
	newUpdateValue() {
		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.weightGold = this.getElement("weight-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.goldDailyRateGold = this.getElement("gold-daily-rate-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.salesProfitGold = this.getElement("sales-profit-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.discountGold = this.getElement("discount-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.taxGold = this.getElement("tax-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.wagesTomanGold = this.getElement("construction-wages-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.wagesPercentGold = this.getElement("construction-wages-percent-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.jewelValueGold = this.getElement("jewel-value-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.valueStoneGold = this.getElement("value-stone-input", "value");

		/**
		 * Receive Element
		 * @type {Element}
		 */
		this.valueOtherBelongingsGold = this.getElement("value-other-belongings-input", "value");
	}

	/**
	 * Calculation of various formulas
	 */
	calculteValue() {
		// calculate Other price
		this.otherPrice = this.valueStoneGold + this.jewelValueGold + this.valueOtherBelongingsGold;

		//construction wages Toman
		this.wagesGold = this.wagesTomanGold > 0 ? this.wagesTomanGold : 0;

		//construction wages Toman + Percent
		if (this.wagesPercentGold > 0)
			this.wagesGold += this.goldDailyRateGold * (this.wagesPercentGold / 100);

		// calculate Gold
		this.goldPrice = this.goldDailyRateGold * this.weightGold;

		// calculate grant
		this.grantPrice = this.wagesGold * this.weightGold;

		// calculate profit
		this.profitPrice =
			((this.goldPrice + this.grantPrice + this.otherPrice) * this.salesProfitGold) / 100;

		// calculate tax
		this.taxPrice = (this.profitPrice + this.grantPrice + this.otherPrice) * (this.taxGold / 100);

		// calculate sales
		this.salesPrice =
			this.goldPrice +
			this.profitPrice +
			this.grantPrice +
			this.otherPrice +
			this.taxPrice -
			this.discountGold;
	}

	/**
	 *
	 * @param {String(Number)} number
	 * @returns
	 */
	stringSeparator(number) {
		const num = number.toLocaleString("fa-IR");
		let output = `<span>${num.split("٫")[0]}</span>`;
		if (num.split("٫")[1]) output += `<span class="decimal-output">٫${num.split("٫")[1]}</span>`;
		return output;
	}

	/**
	 * push value to DOM
	 */
	pushValue() {
		// push to price section
		this.getElement("rpSales").innerHTML = this.stringSeparator(this.salesPrice);
		this.getElement("rpGold").innerHTML = this.stringSeparator(this.goldPrice);
		this.getElement("rpGrant").innerHTML = this.stringSeparator(this.wagesGold);
		this.getElement("rpProfit").innerHTML = this.stringSeparator(this.profitPrice);
		this.getElement("rpTax").innerHTML = this.stringSeparator(this.taxPrice);

		// push to subtitle
		this.getElement("cwp").innerHTML = this.stringSeparator(this.wagesPercentGold);
		this.getElement("cwp-toman").innerHTML = this.stringSeparator(this.wagesTomanGold);
		this.getElement("sp").innerHTML = this.stringSeparator(this.salesProfitGold);
		this.getElement("tax").innerHTML = this.stringSeparator(this.taxGold);
	}
}
