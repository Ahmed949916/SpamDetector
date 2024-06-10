from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  
@app.route('/api', methods=['POST'])
def handle_data():
    if request.is_json:
        data = request.get_json() 
        subjectLine = data.get('subjectLine')
        emailContent = data.get('emailContent')
        print(subjectLine,emailContent)
        return jsonify({
            'message': 'Strings received!',
            'output': "Spam"
        }), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400

if __name__ == '__main__':
    app.run(debug=True)
