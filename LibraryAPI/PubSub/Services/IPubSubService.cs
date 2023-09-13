namespace LibraryAPI.PubSub.Services
{
    public interface IPubSubService
    {
        void SendToAll(List<string> topic, object? arg1);
    }
}
