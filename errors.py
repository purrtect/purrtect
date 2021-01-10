from flask import jsonify

class InvalidAPICall(Exception):
    def __init__(self, message, status):
        Exception.__init__(self)
        self.message = message
        self.status = status

    def to_dict(self):
        return {
            'message': self.message,
            'status': self.status,
            'success': False
        }

class AuthenticationError(Exception):
    def __init__(self, message = 'Error: User not logged in', status = 401):
        Exception.__init__(self)
        self.message = message
        self.status = status
    
    def to_dict(self):
        return{
            'message': self.message,
            'status': self.status,
            'success': False
        }
