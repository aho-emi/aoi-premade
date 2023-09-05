 module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  let [year = new Date().getFullYear(),
       month = 'January',
       date = '1',
       time = '00:00:00',
       type = 'R'] = data.inside.splits;

        async function exc(func) {
            let p = await d.interpreter(d.client, {}, [], { code: func }, d.client.db, true);
            return p.code;
        }


  const timeDate = `${year}, ${month}, ${date}, ${time}`;
  const inputDate = new Date(timeDate)
  const timestamp = inputDate.getTime() / 1000;
  const [shorttime, longtime, shortdate, longdate, shortdatetime, longdatetime, relative] = ['t', 'T', 'd', 'D', 'f', 'F', 'R'];
  
  data.result = `<t:${Math.floor(timestamp)}:${eval(type)}>`


    return { code: d.util.setCode(data) };
}
