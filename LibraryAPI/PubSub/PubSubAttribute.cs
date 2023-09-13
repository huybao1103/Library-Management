using LibraryAPI.PubSub.Config;
using LibraryAPI.PubSub.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LibraryAPI.PubSub
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class PubSubAttribute : ActionFilterAttribute
    {
        //private ApiRequest _apiRequest;
        private ActionExecutingContext _context;
        private readonly string rootTopic;
        public string[] paths;

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

        //public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        //{
        //    _context = context;
        //    var req = context.ActionArguments.FirstOrDefault(rep => rep.Value is ApiRequest).Value;
        //    if (req is ApiRequest apiRequest)
        //        _apiRequest = apiRequest;
        //    return base.OnActionExecutionAsync(context, next);
        //}

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            if (this.paths != null && this.paths.Length > 0)
            {
                var result = context.Result;
                List<string> m_topics = new List<string>();

                //foreach (var item in this.paths)
                //{
                //    if (item == ".")
                //    {
                //        m_topics.Add(this.rootTopic);
                //        continue;
                //    }

                //    var subTopic = GetTopic(item, result);
                //    if (!string.IsNullOrEmpty(subTopic))
                //        m_topics.Add(subTopic);
                //}

                if (m_topics.Any())
                {
                    var pubSubService = context.HttpContext.RequestServices.GetService(typeof(IPubSubService)) as IPubSubService;
                    pubSubService?.SendToAll(m_topics, "changed");
                }
            }
            else if (Topic.Any())
            {
                var pubSubService = context.HttpContext.RequestServices.GetService(typeof(IPubSubService)) as IPubSubService;
                pubSubService?.SendToAll(this.Topic, "changed");
            }
        }

        //private string GetTopic(string fullPath, IActionResult? result)
        //{
        //    var subId = "";
        //    string[] pathItems = (fullPath ?? "").Split("/");
        //    if (pathItems.Length > 0)
        //    {
        //        if (!string.IsNullOrEmpty(rootTopic))
        //        {

        //            ObjectResult? objectResult = null;
        //            if (result != null && result is ObjectResult s) objectResult = s;

        //            JObject? jResultdata = objectResult?.Value != null ? SerializeToJObject(objectResult.Value) : null;
        //            foreach (var path in pathItems)
        //            {
        //                var _s = GetDataBypath(jResultdata, path);
        //                if (!string.IsNullOrEmpty(_s))
        //                    subId += $"/{_s}";
        //            }
        //            jResultdata = null;
        //        }
        //    }
        //    return $"{rootTopic}{subId}";
        //}

        //public static JObject? SerializeToJObject(object obj)
        //{
        //    return (JObject)JsonConvert.DeserializeObject(obj.SerializeObject());
        //}

        //private string GetDataBypath(JObject? jResultdata, string path)
        //{
        //    string result = "";
        //    var paths = (path ?? "").Split(".");
        //    if (paths.Length > 0)
        //    {
        //        if (paths[0] == PubSubConst.QUERY)
        //        {
        //            if (_context.ActionArguments.ContainsKey(paths[1]))
        //            {
        //                return _context.ActionArguments[paths[1]]?.ToString() ?? "";
        //            }
        //        }

        //        JObject? jdata = paths[0] == PubSubConst.REQUEST ? SerializeToJObject(_apiRequest) : jResultdata;

        //        if (jdata == null) return result;

        //        result = GetData(jdata, string.Join(".", paths.Skip(1).Select(f => f.ToCamelCase()))) ?? "";
        //        jdata = null;
        //    }

        //    return result;
        //}
    }
}
