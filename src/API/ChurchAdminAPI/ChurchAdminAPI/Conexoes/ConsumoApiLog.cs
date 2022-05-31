using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;

namespace ChurchAdminAPI.Conexoes
{
    public class ConsumoApiLog
    {
        public static readonly HttpClient _client = new HttpClient();

        public static T LogErro<T>(string url, object logEntrada)
        {
            string json = JsonConvert.SerializeObject(logEntrada);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var request = _client.PostAsync(url, content).Result;

            if (request.StatusCode != System.Net.HttpStatusCode.OK && (request.StatusCode != System.Net.HttpStatusCode.Created))
                throw new Exception("Erro na Api: " + request.Content.ReadAsStringAsync().Result);

            return JsonConvert.DeserializeObject<T>(request.Content.ReadAsStringAsync().Result);
        }
    }
}
