const allInput = document.getElementsByClassName("input");

const calculatePrice = () => {
	const weightInput = document.getElementById("weight-input").value;
	const goldDailyRateInput = document.getElementById("gold-daily-rate-input").value;
	const salesProfitInput = document.getElementById("sales-profit-input").value;
	const discountInput = document.getElementById("discount-input").value;
	const taxInput = document.getElementById("tax-input").value;
	const constructionWagesInput = document.getElementById("construction-wages-input").value;
	const constructionWagesPercentInput = document.getElementById("construction-wages-percent-input").value;
	const jewelValueInput = document.getElementById("jewel-value-input").value;
	const valueStoneInput = document.getElementById("value-stone-input").value;
	const valueOtherBelongingsInput = document.getElementById("value-other-belongings-input").value;

};

document.addEventListener("DOMContentLoaded", calculatePrice);

[...allInput].forEach(e => {
	e.addEventListener("change", calculatePrice);
	e.addEventListener("keyup", calculatePrice);
});