using MailKit.Net.Smtp;
using MimeKit;
using System.Reflection;

namespace LibraryAPI.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        Task SendResetPasswordEmailAsync(string to, string subject, Dictionary<string, string> contentReplacements);
    }

    public class MailService : IEmailService
    {

        private readonly IWebHostEnvironment _webHostEnvironment;

        public MailService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("HUFLIT Library", "l.q.h.bao@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", to));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain") { Text = body };

            using (var client = new SmtpClient())
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await client.ConnectAsync("smtp.gmail.com", 587, false); // Use the correct SMTP server and port
                await client.AuthenticateAsync("l.q.h.bao@gmail.com", "oyea rszt tlma dfpw"); // Use your SMTP server credentials
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }

        public async Task SendResetPasswordEmailAsync(string to, string subject, Dictionary<string, string> contentReplacements)
        {
            string rootPath = _webHostEnvironment.ContentRootPath;
            string fullPath = Path.Combine(rootPath, "Services/MailTemplate/ForgotPassword.html");

            string templatePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), fullPath);
            string emailBody = ParseTemplate(templatePath, contentReplacements);

            var emailMessage = new MimeMessage();
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailBody };
            emailMessage.From.Add(new MailboxAddress("HUFLIT Library", "l.q.h.bao@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", to));
            emailMessage.Subject = subject;

            using (var client = new SmtpClient())
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await client.ConnectAsync("smtp.gmail.com", 587, false); // Use the correct SMTP server and port
                await client.AuthenticateAsync("l.q.h.bao@gmail.com", "oyea rszt tlma dfpw"); // Use your SMTP server credentials
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }

        private string ParseTemplate(string templatePath, Dictionary<string, string> contentReplacements)
        {
            string content = File.ReadAllText(templatePath);
            foreach (var replacement in contentReplacements)
            {
                content = content.Replace($"{{{replacement.Key}}}", replacement.Value);
            }
            return content;
        }
    }
}
