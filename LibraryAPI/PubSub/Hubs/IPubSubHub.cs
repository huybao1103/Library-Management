using LibraryAPI.PubSub.Message;

namespace LibraryAPI.PubSub.Hubs
{
    public interface IPubSubHub
    {
        Task PubSub(PubSubMessage message);
    }
}
