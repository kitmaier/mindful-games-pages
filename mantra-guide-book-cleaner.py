'''
remove header and footer sections
remove lines with no punctuation
remove newlines and extra spaces
remove special characters [^A-Za-z, ."'!?:;()-]
remove double quotes
split line at end-of-sentence characters [.!?]
remove lines that do not start with a capital letter
remove lines that end with Mr. or Mrs. or Dr. 
remove lines with questionable characters [':;()-]
count words per line
remove lines with less than 5 or more than 15 words
remove lines containing words not recognized from dictionary
remove lines with invalid grammar
'''

# TODO: it's really hard to automatically cut off the entire header and footer, since even in the text of the book there can be a table of contents at the beginning and a bunch of appendices at the end that have no standardized demarcation

import urllib.request
#url = 'http://www.gutenberg.org/cache/epub/20259/pg20259.txt'
#url = 'http://www.gutenberg.org/cache/epub/17094/pg17094.txt'
#url = 'http://www.gutenberg.org/cache/epub/8456/pg8456.txt'
url = 'http://www.gutenberg.org/cache/epub/20588/pg20588.txt'
with urllib.request.urlopen(url) as response:
   page = response.read().decode('utf-8')

import re
page2 = re.sub(r'[^ A-Za-z(){}<>/\\,.;:\'"?!$%_\r\n\t-]', '@', page)
page2 = re.sub(r'[\r]','',page2)
index = page2.find('START OF THE PROJECT GUTENBERG EBOOK')
if index==-1:
    index = page2.find('START OF THIS PROJECT GUTENBERG EBOOK')

page2 = page2[index:]
page2 = re.sub(r'.*START OF TH(E|IS) PROJECT GUTENBERG EBOOK[^\n]*\n', '', page2)
index = page2.find('END OF THE PROJECT GUTENBERG EBOOK')
if index==-1:
    index = page2.find('END OF THIS PROJECT GUTENBERG EBOOK')

page2 = page2[0:index]
page2 = re.sub(r'\n+',' ',page2)
page2 = re.sub(r'\.([^ ]*) +', '.\\1\n', page2)
page2 = re.sub(r'.*[^ A-Za-z,.\'"\n].*','',page2)
page2 = re.sub(r'.*[A-Z][A-Z].*','',page2)
page2 = re.sub(r'.*["].*','',page2)
page2 = re.sub(r'.*[^.]\n','',page2)
page2 = re.sub(r'.*Mr.*','',page2)
page2 = re.sub(r'.*Dr.*','',page2)
page2 = re.sub(r'.*Mt.*','',page2)
page2 = re.sub(r'.*St.*','',page2)

'''
lines = page2.splitlines()
for k in range(len(lines)):
    lines[k] = re.sub(r'.*[^ A-Za-z,.?!\'"\n].*','',lines[k])

page2 = '\n'.join(lines)
'''

page2 = re.sub(r'[\n]+','\n',page2)

with open('tmp.txt','w') as f:
    f.write(page2)

