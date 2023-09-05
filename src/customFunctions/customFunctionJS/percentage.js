// Comment function
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [number,
           second,
           type]= data.inside.splits;


     switch (type) {
       case "%": 
         data.result = Math.floor((Number(number)/100)*Number(second))
         break;
       default: 
         data.result = Math.floor((Number(number)/100)*Number(second))
     }
  
    return {
        code: d.util.setCode(data),
    };
};
