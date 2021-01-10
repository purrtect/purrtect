### Takes in website ('facebook' or 'twitter')
### Subject for email titles (only used  for emails)
### Message to Pre-populate
### Link toPre-populate
### returns URL
import urllib.parse
def share(site, subject, message, link):
    url = None
    if (site == 'twitter'):
        url = 'https://twitter.com/intent/tweet?text='+urllib.parse.quote(message)+'+'+urllib.parse.quote(link)
        #print(url)
    elif(site == 'facebook'):
        url = 'http://www.facebook.com/sharer.php?src=sp&u='+urllib.parse.quote(link)
        #print(url)
    elif(site == 'email'):
        url = 'mailto:?subject=' + urllib.parse.quote(subject)+ '&body='+urllib.parse.quote(message)+"%0A%0A"+urllib.parse.quote(link)
        #print(url)
    return url
if __name__ == '__main__':
    print(share('email', "This is the title", "Hello World!", "https://www.google.com"))
