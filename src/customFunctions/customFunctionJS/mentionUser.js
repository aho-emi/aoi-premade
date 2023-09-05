module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [separator = ' ', ...userIDs] = data.inside.splits;
    
    const mentions = userIDs.map((userID) => `<@${userID}>`);
    const result = mentions.join(separator);
    
    data.result = result;
    return {
        code: d.util.setCode(data),
    };
};

