#!/usr/bin/env python3
import os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

port = int(os.environ.get("PORT", 3456))
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # silence logs

httpd = HTTPServer(("", port), Handler)
print(f"Serving on port {port}", flush=True)
httpd.serve_forever()
