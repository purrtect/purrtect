### site: Takes in website ('facebook' 'twitter' or 'email')
### subject: email titles (only used  for emails)
### message to Pre-populate (only works for twitter and email)
### Link to Pre-populate
### returns URL
import urllib.parse
def share(site, subject, message, link):
    url = None
    if (site == 'twitter'):
        url = 'https://twitter.com/intent/tweet?text='+urllib.parse.quote(message)+'+'+urllib.parse.quote(link)

    elif(site == 'facebook'):
        url = 'http://www.facebook.com/sharer.php?src=sp&u='+urllib.parse.quote(link)

    elif(site == 'email'):
        url = 'mailto:?subject=' + urllib.parse.quote(subject)+ '&body='+urllib.parse.quote(message)+"%0A%0A"+urllib.parse.quote(link)
    elif(site == 'linkedin'):
        url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + urllib.parse.quote(link)
    return url
if __name__ == '__main__':
    print(share('linkedin', "This is the title", "Hello World!", "https://www.google.com"))
