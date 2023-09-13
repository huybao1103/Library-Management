using LibraryAPI.PubSub.Hubs;
using LibraryAPI.PubSub.Message;
using Microsoft.AspNetCore.SignalR;

namespace LibraryAPI.PubSub.Services
{
    public class PubSubService : IPubSubService
    {
        private readonly IHubContext<PubSubHub, IPubSubHub> hub;

        public PubSubService(IHubContext<PubSubHub, IPubSubHub> hubContext)
        {
            this.hub = hubContext;
        }

        public async void SendToAll(List<string> topic, object? arg1) => await hub.Clients.All.PubSub(new PubSubMessage(topic, arg1));
    }
}
