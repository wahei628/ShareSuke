import consumer from "./consumer"

document.addEventListener('DOMContentLoaded', () => {
  const eventId = document.getElementById('comments').dataset.eventId;
  consumer.subscriptions.create({ channel: "CommentChannel", event_id: eventId }, {
    connected() {
    },

    disconnected() {
    },

    received(data) {
      const comments = document.getElementById('comments');
      if (data.comment) {
        const html = data.comment;
        comments.insertAdjacentHTML('afterbegin', html);
      }

      if (data.notice || data.alert || data.danger) {
        const flashContainer = document.getElementById('flash-messages-container');
        const flashMessage = document.createElement('div');
        flashMessage.className = 'flash-message pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-[#FFFCF2] shadow-lg ring-2 ring-orange-500 transition transform ease-out';
        flashMessage.innerHTML = `
          <div class="p-4">
            <div class="flex items-center">
              ${data.notice ? `<div class="ml-3 flex-1 pt-0.5"><p class="text-sm font-bold text-green-500 truncate">${data.notice}</p></div>` : ''}
              ${data.alert ? `<div class="ml-3 flex-1 pt-0.5"><p class="text-sm font-bold text-red-500 truncate">${data.alert}</p></div>` : ''}
              ${data.danger ? `<div class="ml-3 flex-1 pt-0.5"><p class="text-sm font-bold text-red-500 truncate">${data.danger}</p></div>` : ''}
              <div class="ml-4 flex flex-shrink-0 items-center">
                <button type="button" class="inline-flex rounded-full bg-orange-100 text-orange-600 hover:text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" aria-label="Close" onclick="this.parentElement.parentElement.parentElement.remove()">
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;
        flashContainer.appendChild(flashMessage);

        setTimeout(() => {
          flashMessage.remove();
        }, 3000);
      }
    }
  });
});
