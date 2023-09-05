module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  const [index=0] = data.inside.splits;

  data.result = d.client.prefix[index]
  return {
    code: d.util.setCode(data)
  }
}