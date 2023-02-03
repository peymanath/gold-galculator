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

	calculte() {
		// call new Update Value
		this.newUpdateValue();

		// call calculate value
		this.calculteValue();

		// push value to DOM
		this.pushValue();
	}

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

	pushValue() {
		// push to price section
		this.getElement("rpSales").innerHTML = parseInt(this.salesPrice).toLocaleString("fa-IR");
		this.getElement("rpGold").innerHTML = parseInt(this.goldPrice).toLocaleString("fa-IR");
		this.getElement("rpGrant").innerHTML = parseInt(this.wagesGold).toLocaleString("fa-IR");
		this.getElement("rpProfit").innerHTML = parseInt(this.profitPrice).toLocaleString("fa-IR");
		this.getElement("rpTax").innerHTML = parseInt(this.taxPrice).toLocaleString("fa-IR");

		// push to subtitle
		this.getElement("cwp").innerHTML = parseInt(this.wagesPercentGold).toLocaleString("fa-IR");
		this.getElement("cwp-toman").innerHTML = parseInt(this.wagesTomanGold).toLocaleString("fa-IR");
		this.getElement("sp").innerHTML = parseInt(this.salesProfitGold).toLocaleString("fa-IR");
		this.getElement("tax").innerHTML = parseInt(this.taxGold).toLocaleString("fa-IR");
	}
}

const gold = new GoldCalculator();
