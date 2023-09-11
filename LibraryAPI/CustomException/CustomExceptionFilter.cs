using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.CustomException
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is CustomApiException apiException)
            {
                var problemDetails = new ProblemDetails
                {
                    Title = apiException.Message,
                    Status = apiException.StatusCode,
                    Detail = apiException.Detail,
                    Instance = context.HttpContext.Request.Path
                };

                context.Result = new ObjectResult(problemDetails)
                {
                    StatusCode = apiException.StatusCode
                };
                context.ExceptionHandled = true;
            }
        }
    }
}
