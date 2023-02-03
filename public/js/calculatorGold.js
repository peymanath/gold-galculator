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
	 * Receive Element
	 * @type {Element}
	 */
	weightInput = this.getElement("weight-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	goldDailyRateInput = this.getElement("gold-daily-rate-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	salesProfitInput = this.getElement("sales-profit-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	discountInput = this.getElement("discount-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	taxInput = this.getElement("tax-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	constructionWagesInput = this.getElement("construction-wages-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	constructionWagesPercentInput = this.getElement("construction-wages-percent-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	jewelValueInput = this.getElement("jewel-value-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	valueStoneInput = this.getElement("value-stone-input", "value");

	/**
	 * Receive Element
	 * @type {Element}
	 */
	valueOtherBelongingsInput = this.getElement("value-other-belongings-input", "value");

	constructor() {
		
	}

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
	translateNumber(number, language = 'fa') {
		if (typeof number !== "string") number = String(number);

		const translate = num => {
            // Persian Translate
			if (language === "fa") return num.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
            
            // English Translate
			if (language === "en") return num.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
		};

		return translate(number);
	}
}

const gold = new GoldCalculator();