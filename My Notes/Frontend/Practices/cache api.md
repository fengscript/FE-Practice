# V1

```js
let cache = {};

const getUser = name => {
  if(cache[name]){
    return Promise.resolve(cache[name]);
  }
  
  return new Promise(resolve => {
    fetch('https://randomuser.me/api/').then(response => {
      return response.json()
    }).then(data => {
      cache[name] = data;
      resolve(data);
    })
  })
}

setInterval(async () => {
	getUser('test').then(data => {
    console.log(data)
  })
}, 1000)
```



# V2 Async

```js
let cache = {};

const getUser = async name => {
  getUser.cache[name] = getUser.cache[name] || await (await fetch('').json());
  
  return getUser.cache[name]
}

setInterval(async () => {
	const data = await getUser('test');
  console.log(data)
}, 1000)
```

# V3 improvement with property

```js
const getUser = async name => {
  getUser.cache = getUser.cache || {};
  getUser.cache[name] = getUser.cache[name] || await (await fetch('').json());
  
  return getUser.cache[name]
}

setInterval(async () => {
	const data = await getUser('test');
  console.log(data)
}, 1000)
```



# V4 Closore

```js
const getUser = name => {
  let cache = {};
  return async () => {
    cache[name] = cache[name] || await (await fetch('').json());
    return cache[name]
  }

  
  return getUser.cache[name]
}
const user = getUser('test');
setInterval(async () => {
	const data = user();
  console.log(data)
}, 1000)
```



# V5 expire time

```js
const getUser = (name, url, expireTime) => {
  let cache = {};
  let start = (new Date()).getTime();
  return async () => {
    let end = (new Date()).getTime();
    if(expireTime && (end - start) > expireTime * 1000 ){
      cache[name] = await (await fetch(url).json());
      start = (new Date()).getTime();
    }
    cache[name] = cache[name] || await (await fetch(url).json());
    return cache[name]
  }

  
  return getUser.cache[name]
}
const user = getUser('test', 'https://randomuser.me/api/', 10000);
setInterval(async () => {
	const data = user();
  console.log(data)
}, 10000)
```

