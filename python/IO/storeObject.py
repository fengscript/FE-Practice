import pickle
storePractice='storePractice.data'
shoplist=['apple', 'mango', 'carrot']
f =	open(storePractice,'wb')
pickle.dump(shoplist, f)
f.close()
del	shoplist
f=open(storePractice, 'rb')
storedlist=pickle.load(f)
print(storedlist)
