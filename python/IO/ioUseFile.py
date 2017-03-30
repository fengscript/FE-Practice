# coding=utf-8

poem = '''\
Program runing now
...
Prepare container...
	container prepaer finish
Prepare text...
	text prepaer finish
Start to write text flow
	writing...
DONE!
Open file now.
'''

f = open('poem.txt', 'w')

f.write(poem)

f.close()

print(poem)

f = open('poem.txt')
while True:
	line = f.readline()
	if len(line) == 0:
		break

	print(line, end='')

f.close()
