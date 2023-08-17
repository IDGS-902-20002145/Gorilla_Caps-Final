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
                var frontendURL = Configuration.GetValue<string>("frontend_url");
                options.AddDefaultPolicy(builder =>
                {
                    //Añadimos la cabecera para que no nos marque error CORS
                    builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
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
