module.exports = {
  name: 'Message Sent Event',
  displayName: 'Message Sent',
  isEvent: true,

  fields: ['Message (Temp Variable Name):'],

  mod(DBM) {
    DBM.Events = DBM.Events || {};
    const { Bot, Actions } = DBM;

    DBM.Events.messageSent = async function messageSent(message) {
      if (!Bot.$evts['Message Sent Event']) return;

      const server = message.guild;

      for (const event of Bot.$evts['Message Sent Event']) {
        const temp = {};

        if (event.temp) temp[event.temp] = {
          content: message.content,
          author: message.author,
          // You can include other properties you need from the message object
        };

        Actions.invokeEvent(event, server, temp);
      }
    };

    const { onReady } = Bot;
    Bot.onReady = function messageSentOnReady(...params) {
      Bot.bot.on('messageCreate', (message) => DBM.Events.messageSent(message));
      onReady.apply(this, ...params);
    };
  },
};
