using Gorrilla_Caps_Backend.Context;
using Microsoft.EntityFrameworkCore;

namespace Gorrilla_Caps_Backend
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                var frontendURLs = new[]
                {
            "http://localhost:4200",
            "http://localhost:4000" // Agrega el puerto 4000 aquí
        };

                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(frontendURLs)
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
                });
            });

            services.AddControllers();
            services.AddDbContext<AppDbContext>(options =>

                options.UseSqlServer(Configuration.GetConnectionString("conexion")));
        }

        public void Configure(IApplicationBuilder app, IHostApplicationLifetime lifetime)
        {
            

            app.UseRouting();

            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
