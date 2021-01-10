import urllib.request
import json
import re

api_key_google= ''

#shipping pollution
#source: https://www.sourcinghub.io/air-freight-vs-sea-freight-carbon-footprint/#:~:text=air%20shipping%20carbon%20footprint%20%E2%80%93%20which,grams%20of%20CO2%20per%20kilometer.

AirFreight = 0.0005
Truck = 0.00011
Train = 0.00007



## Weight, category, Zip1,Zip2
## Category: Amazon category emission, kg carbon co2 per kg product weight (in float)
## Zip1, zip2, zip code of the orgin and destination (in string)
## weight --> mass of the product, either in g, or kg (in string)

## Returns:
## Total Carbon footprint, Shipping Carbon footprint, Product Carbon footprint, loc1 of zip1, loc2 of zip2
def carbon_footprint(IsPrime, category, zip1, zip2, weight):
    distance, loc1, loc2 = distance_calculator(zip1, zip2)
    numPattern = r'\d+\.?\d*'

    if (weight != None and len(re.findall(numPattern, weight)) != 0):
        weight = weight_calculator(weight)
    else:
        print("weight is invalid, assume 1kg")
        weight = 1 #assume weight is 1kg

    #get product category
    product_emission = weight * float(category)
    shipping_emission = 0
    if (distance == None):
        distance = 1000

    if (distance < 100): #less than 100 km
        shipping_emission = weight * Truck * distance
    elif (IsPrime):
        shipping_emission = weight * (Truck * distance * 0.2 + AirFreight * distance * 0.8)
    else:
        shipping_emission = weight * (Truck * distance * 0.2 + Train * distance * 0.8)

    #print("Shipping emission %f, Product emission %f" % (shipping_emission, product_emission))
    return shipping_emission + product_emission, shipping_emission, product_emission, loc1, loc2



def distance_calculator(zip1, zip2):
    f = open("gmap_api.txt", "r")
    api_key_google = f.read()

    zip1 = zip1.replace(' ','')
    zip2 = zip2.replace(' ', '')
    def_google_url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + zip1 + "&destinations=" + zip2 + "&mode=car&sensor=false&key=" + api_key_google
    try:
        response = urllib.request.urlopen(def_google_url).read()
        data = json.loads(response.decode())
        loc2 = data['destination_addresses']
        loc1 = data['origin_addresses']
        result = data["rows"][0]["elements"][0]["distance"]
        #print(data)
        distance = float(result['text'].replace(',','')[:-3])
        #print(distance)
    except:
        #default distance to 1000
        print("Invalid zipcodes, using default distance: 1000km")
        loc1 = None
        loc2 = None
        distance = 1000.0
    return distance, loc1, loc2

#takes in weight of the product in g, gram, kg, kilogram
#returns weight in kg
def weight_calculator(weight):
    numPattern = r'\d+\.?\d*'
    try:
        num = float(re.findall(numPattern, weight)[0])
    except:
        print("no num found")
        num = 1
    patternKG = '(?:kg|kilo)'
    patternLb = '(?:lb|pound)'

    if(len(re.findall(patternLb, weight.lower()))!=0): #in pound
        num *= 0.453592 #convert to kg
    elif(len(re.findall(patternKG, weight.lower()))==0): #in grams
        num /=1000 #convert to kg

    return num


if __name__ =='__main__':
    zipcode1 = '91748'
    zipcode2 = 'L4C0P8'
    weight = '1002 lb'
    category = 0.1
    isPrime = True
    print(carbon_footprint(isPrime,category,zipcode1, zipcode2, weight))
