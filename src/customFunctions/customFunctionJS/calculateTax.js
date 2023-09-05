
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    let [amount, taxRate] = data.inside.splits;


  if (isNaN(amount) || isNaN(taxRate)) {
    throw new Error('Subtotal and taxRate must be valid numbers.');
  }

  const taxAmount = amount * (taxRate / 100);
  const total = {
    amount: amount,
    tax: taxAmount,
    amountWithTax: Number(amount) + Number(taxAmount)
  }
  data.result = JSON.stringify(total)
  
  
    return {
        code: d.util.setCode(data),
    };
};
