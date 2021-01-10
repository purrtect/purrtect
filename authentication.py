from firestore import get_user, make_user
import bcrypt

def create_user(username, password):
    
    pass

def login(username, password):
    user = get_user(username)
    # return user

    # get salt + hash
    salt = user['salt']
    pass_hash = user['password']

    # encode for bcrypt
    salt = salt.encode()
    pass_hash = pass_hash.encode()
    password = password.encode()

    # compare salt + hash
    local_hash = bcrypt.hashpw(password, salt)
    if local_hash == pass_hash:
        return True
    else:
        return False

def signup(username, password):
    salt = bcrypt.gensalt()
    password = password.encode()
    pass_hash = bcrypt.hashpw(password, salt)

    # insert hash and salt into database
    return make_user(username,pass_hash.decode(),salt.decode())