import 'dart:convert';
import 'dart:io';

void main() async {
  final url = Uri.parse('https://fal.run/fal-ai/fast-animatediff/text-to-video');
  final response = await HttpClient().postUrl(url);
  response.headers.add('Authorization', 'Key 80b0973b-a813-4417-aafa-710fc4b2dea0:826a4118f7cb24f2a7523621d85fe472');
  response.headers.add('Content-Type', 'application/json');
  response.write(jsonEncode({"prompt": "A professional educational animation about math, 4k"}));
  
  final res = await response.close();
  final body = await res.transform(utf8.decoder).join();
  print('Status: ${res.statusCode}');
  print('Body: $body');
}
