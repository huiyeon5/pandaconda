import os

from app import create_app
from app.views import * 

config_name = os.getenv('FLASK_CONFIG')
app = create_app(config_name)
UserClass(app)

if __name__ == '__main__':
    app.run(DEBUG=True)