namespace LibraryAPI.PubSub.Message
{
    public class PubSubMessage
    {
        public List<string> Topic { get; set; }
        public object? Content { get; set; }

        public PubSubMessage(List<string> topic, object? content)
        {
            this.Topic = topic;
            this.Content = content;
        }
    }
}
