module.exports = async (d) => {
  const data = d.util.aoiFunc(d);

    data.result = d.client.user.avatarURL({
      size: 4096,
      forceStatic: "false" == 'false',
      png: 'png'
    });

    return { code: d.util.setCode(data) };
};