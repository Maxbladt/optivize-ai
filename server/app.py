from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    """Handle CTA modal form submission"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'company', 'email', 'companySize']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Extract form data
        name = data.get('name')
        company = data.get('company')
        email = data.get('email')
        company_size = data.get('companySize')
        interests = data.get('interests', [])
        
        # Log submission (in production, save to database)
        submission_data = {
            'name': name,
            'company': company,
            'email': email,
            'company_size': company_size,
            'interests': interests,
            'timestamp': datetime.now().isoformat()
        }
        
        print(f"New form submission: {submission_data}")
        
        # In a real implementation, you would:
        # 1. Save to database
        # 2. Send email with AI strategy guide
        # 3. Add to mailing list
        
        return jsonify({
            'success': True,
            'message': 'Thank you! Your AI Strategy Guide will be sent to your email shortly.'
        }), 200
        
    except Exception as e:
        print(f"Error processing form submission: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/schedule-consultation', methods=['POST'])
def schedule_consultation():
    """Handle consultation scheduling"""
    try:
        data = request.get_json()
        
        # Basic validation
        if not data.get('email'):
            return jsonify({'error': 'Email is required'}), 400
        
        print(f"Consultation request: {data}")
        
        return jsonify({
            'success': True,
            'message': 'Thank you! We will contact you within 24 hours to schedule your consultation.'
        }), 200
        
    except Exception as e:
        print(f"Error processing consultation request: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
