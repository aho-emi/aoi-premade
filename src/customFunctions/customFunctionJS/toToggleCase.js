module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);
    const [texts] = data.inside.splits;

    const output = texts
        .split(" ")
        .map(
            (text) =>
                text.addBrackets().slice(0, 1).toLowerCase() +
                text.addBrackets().slice(1).toUpperCase()
        )
        .join(" ");

    data.result = output;
    return {
        code: d.util.setCode(data),
    };
};
