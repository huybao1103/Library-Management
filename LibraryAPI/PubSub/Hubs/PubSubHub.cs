using LibraryAPI.PubSub.Message;
using Microsoft.AspNetCore.SignalR;

namespace LibraryAPI.PubSub.Hubs
{
    public class PubSubHub : Hub<IPubSubHub>, IPubSubHub
    {
        public Task PubSub(PubSubMessage message) => Clients.All.PubSub(message);
    }
}
