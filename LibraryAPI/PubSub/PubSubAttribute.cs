using LibraryAPI.PubSub.Config;
using LibraryAPI.PubSub.Services;
using LibraryAPI.RequestModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace LibraryAPI.PubSub
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class PubSubAttribute : ActionFilterAttribute
    {
        private ApiRequest _apiRequest;
        private ActionExecutingContext _context;
        private readonly string rootTopic;
        public string[] paths;

        private static JsonSerializerOptions options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            IgnoreNullValues = true
        };

        public List<string> Topic { get; set; }

        public PubSubAttribute(string rootTopic, params string[] paths)
        {
            this.Topic = new List<string>();
            if (paths == null ||
                paths?.Length == 0)
            {
                this.Topic.Add(rootTopic);
            }
            else
            {
                this.rootTopic = rootTopic;
                this.paths = paths;
            }
        }

        public PubSubAttribute(string rootTopic, string path1, string path2)
        {
            this.Topic = new List<string>();
            this.rootTopic = rootTopic;
            this.paths = new string[] { path1, path2 };
        }

        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            _context = context;
            var req = context.ActionArguments.FirstOrDefault(rep => rep.Value is ApiRequest).Value;
            if (req is ApiRequest apiRequest)
                _apiRequest = apiRequest;
            return base.OnActionExecutionAsync(context, next);
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            var pubSubService = context.HttpContext.RequestServices.GetService(typeof(IPubSubService)) as IPubSubService;
            pubSubService?.SendToAll(this.Topic, context.Result);
        }

        private string GetTopic(string fullPath, IActionResult? result)
        {
            var subId = "";
            string[] pathItems = (fullPath ?? "").Split("/");
            return $"{rootTopic}{subId}";
        }
        private string? GetData(JObject? jobj, string path)
        {
            if (path == ".")
                return jobj.ToString();

            return jobj?.SelectToken(path)?.ToString();
        }
    }
}
