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

def get_cat(username):
    user = get_user(username)
    if user:
        cat_name = user['cat'][0]
        hp = user['cat'][1]
        skin = user['cat'][2]
        dead = user['cat'][3]
        return Cat(cat_name, skin, hp, dead)
    else:
        return False
        
        

def new_product(product, emissions, zip = None):
    db = firestore.Client()

    data = {
        product: [float(emissions), str(zip)] if zip is not None else [float(emissions)]
    }
    db.collection(u'CarbonEmissions').document('Products').set(data, merge=True)

if __name__ == '__main__':
    make_cat('sf1', 'steve', 5, 1, False)