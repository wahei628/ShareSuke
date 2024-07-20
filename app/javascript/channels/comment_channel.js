import consumer from "./consumer"

document.addEventListener('DOMContentLoaded', () => {
  const eventId = document.getElementById('comments').dataset.eventId;
  consumer.subscriptions.create({ channel: "CommentChannel", event_id: eventId }, {
    connected() {
    },

    disconnected() {
    },

    received(data) {
      const html = data.comment;
      const comments = document.getElementById('comments');
      comments.insertAdjacentHTML('beforeend', html);
    }
  });
});