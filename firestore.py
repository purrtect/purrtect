from google.cloud import firestore
from cat import Cat

def get_emissions(type, name):
    if type is None:
        return None
    else:
        type = type.lower()
    type = u'Products' if type == u'product' else u'Categories' if type == u'category' else None
    if not type == u'Products' and not type == u'Categories':
        return None
    db = firestore.Client()
    doc = db.collection(u'CarbonEmissions').document(type).get().to_dict()
    if not name in doc.keys():
        return None 
    else:
        return doc[name]

def get_user(username):
    username = str(username).lower()
    db = firestore.Client()
    user = db.collection(u'Users').document(username).get()
    if user.exists:
        return user.to_dict()
    else:
        return False

def make_user(username, hash, salt):
    username = str(username).lower()
    
    data = {
        'username': username,
        'password': hash,
        'salt': salt,
        'trophies': [False, False, False],
        'purchase_history': []
    }
    db = firestore.Client()
    if db.collection(u'Users').document(username).get().exists:
        return False
    db.collection(u'Users').document(username).set(data)
    return True

def make_cat(username, cat_name, hp = 20, skin = 0, dead = False):
    cat_name = str(cat_name).lower()
    cat = Cat(cat_name, skin, hp, dead)
    data = {
        'cat': cat.to_array()
    }
    db = firestore.Client()
    db.collection(u'Users').document(username).set(data, merge=True)
    return cat

def update_cat(username, cat):
    data = {
        'cat': cat.to_array()
    }
    db = firestore.Client()
    db.collection(u'Users').document(username).set(data, merge=True)
    return True

def get_cat(username):
    user = get_user(username)
    if user and 'cat' in user.keys():
        cat_name = user['cat'][0]
        hp = user['cat'][1]
        skin = user['cat'][2]
        dead = user['cat'][3]
        return Cat(cat_name, skin, hp, dead)
    else:
        return False

def new_product(product, emissions, zip = None, weight = None):
    db = firestore.Client()

    arr = [float(emissions)]
    if zip is not None:
        arr.append(str(zip))
    else:
        arr.append(None)
    arr.append(weight)
    data = {
        product: arr
    }
    db.collection(u'CarbonEmissions').document('Products').set(data, merge=True)


def purchase(username, product, price, emissions):
    db = firestore.Client()
    user = db.collection(u'Users').document(username)
    user_info = user.get()
    if user_info.exists:
        user_dict = user_info.to_dict()
        purchase_history = user_dict['purchase_history'] if 'purchase_history' in user_dict.keys() else None
        if purchase_history is not None:
            purchase_history.append(f'{product};{price};{emissions[0]}')
        else:
            purchase_history = [f'{product};{price};{emissions[0]}']
        data = {
            'purchase_history': purchase_history
        }
        user.set(data, merge=True)
        return True
    return False
    
if __name__ == '__main__':
    make_cat('sf1', 'steve', 5, 1, False)