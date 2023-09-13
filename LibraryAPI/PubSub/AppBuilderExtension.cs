using LibraryAPI.PubSub.Config;
using LibraryAPI.PubSub.Hubs;
using LibraryAPI.PubSub.Services;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace LibraryAPI.PubSub
{
    public static class AppBuilderExtension
    {
        public static void AddPubSub(this WebApplicationBuilder builder, Action<PubSubConfig> configure = null)
        {
            if (builder is null)
                throw new ArgumentNullException(nameof(builder));

            builder.Services.TryAddSingleton(_ =>
            {
                var builder = new PubSubConfig();
                if (configure != null)
                {
                    configure.Invoke(builder);
                }

                return builder;
            });

            //builder.Services.TryAddEnumerable(
            //    ServiceDescriptor.Singleton<IPostConfigureOptions<JwtBearerOptions>,
            //        ConfigureJwtBearerOptions>());

            builder.Services.AddSignalR();
            builder.Services.AddSingleton<IPubSubService, PubSubService>();
        }

        public static void MapPubSub(this WebApplication app)
        {
            if (app is null)
                throw new ArgumentNullException(nameof(app));

            app.MapHub<PubSubHub>("/pubsub");
        }
    }
}
