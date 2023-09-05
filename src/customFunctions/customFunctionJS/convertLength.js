
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [length, from, to] = data.inside.splits;


function convertLength(length, fromUnit, toUnit) {
  const units = {
    meter: 1,
    millimeter: 0.001,
    centimeter: 0.01,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
    m: 1,  // Abbreviations
    mm: 0.001,
    cm: 0.01,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34,
  };

  if (!(fromUnit in units) || !(toUnit in units)) {
    throw new Error('Invalid units provided.');
  }

  const meters = length / units[toUnit];
  const result = meters * units[fromUnit];

  return result;
}




data.result = convertLength(length, from, to);


  
    return {
        code: d.util.setCode(data),
    };
};
