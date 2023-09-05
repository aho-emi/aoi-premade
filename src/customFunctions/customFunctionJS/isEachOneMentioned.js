module.exports = async (d) => {
  const data = d.util.aoiFunc(d);
  const [...userIds] = data.inside.splits;

  function areAllUsersMentioned(message, userIds) {
    const mentionedUserIds = message.mentions.users.map((user) => user.id);

    for (const userId of userIds) {
      if (!mentionedUserIds.includes(userId)) {
        return false;
      }
    }

    return true;
  }

  data.result = areAllUsersMentioned(d.message, userIds);

  return {
    code: d.util.setCode(data),
  };
};
