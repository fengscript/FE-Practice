f = open('poem.txt','r')
content = f.readlines()
for line in content:
	print(line)
f.close()
