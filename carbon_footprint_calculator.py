import urllib.request
import json
import googlemaps

api_key_google= 'AIzaSyCXkcgLEtAP8pKulgO3SGqotjR9wd8bNaY'

## Weight, category, Zip1,Zip2
## Category: one of 9 category will have different carbon footprint per g
## Distance: distance from manufacture to consumer
## weight --> if doesn't exist, use default
def carbon_footprint(category, distance):



    pass

def distance_calculator(zip1, zip2):
    zip1 = zip1.replace(' ','')
    zip2 = zip2.replace(' ', '')
    def_google_url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + zip1 + "&destinations=" + zip2 + "&mode=car&sensor=false&key=" + api_key_google
    try:
        response = urllib.request.urlopen(def_google_url).read()
        data = json.loads(response.decode())
        result = data["rows"][0]["elements"][0]["distance"]
        #print(data)
        distance = float(result['text'].replace(',','')[:-3])
        print(distance)
    except:
        #default distance to 1000
        print("Invalid zipcodes, using default distance: 1000km")
        distance = 1000.0
    return distance



if __name__ =='__main__':
    zipcode1 = '91748'
    zipcode2 = 'L4C0P8'
    distance = distance_calculator(zipcode1, zipcode2)
    str = '2,085 km'
