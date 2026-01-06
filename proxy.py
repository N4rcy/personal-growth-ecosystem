from http.server import HTTPServer, BaseHTTPRequestHandler
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv('.env.local')

API_KEY = os.getenv('VITE_DEEPSEEK_API_KEY')
API_URL = 'https://tb.api.mkeai.com/v1/chat/completions'

class ProxyHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/chat':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Forward to Taobao API
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {API_KEY}'
                }
                
                response = requests.post(API_URL, headers=headers, data=post_data, timeout=30)
                
                self.send_response(response.status_code)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(response.content)
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_msg = json.dumps({'error': str(e)})
                self.wfile.write(error_msg.encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server = HTTPServer(('localhost', 3001), ProxyHandler)
    print('🚀 Proxy server running on http://localhost:3001')
    print('📡 Forwarding to Taobao API...')
    server.serve_forever()
