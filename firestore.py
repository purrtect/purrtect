from google.cloud import firestore

def get_emissions(type, name):
    name = name.lower()
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
    return db.collection(u'Users').document(username).get().to_dict()