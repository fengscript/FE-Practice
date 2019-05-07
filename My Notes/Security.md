## React

```javascript
 componentDidUpdate() {
    if (this.searchResult) {
      this.searchResult.insertAdjacentText("beforeend", this.props.filter);
    }
  }
```
to

```javascript
 componentDidUpdate() {
    if (this.searchResult) {
      this.searchResult.insertAdjacentText("beforeend", this.props.filter);
    }
  }  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      isLoaded: false
    };
    this.searchResult = null;
    this.redListKeyWords = ["script", "embed", "object", "iframe"];
  }

  getSearchMessage = () => {
    const { filter } = this.props;
    return filter ? (
      <div ref={searchResult => (this.searchResult = searchResult)}>
        Search Result for:
      </div>
    ) : null;
  };

  componentDidUpdate() {
    if (this.searchResult) {
      const { filter } = this.props;
      let maliciousStr = this.redListKeyWords.find(tag => {
        return filter.toLowerCase().indexOf(tag) !== -1;
      });

      if (!maliciousStr) {
        this.searchResult.insertAdjacentHTML("beforeend", this.props.filter);
      }
    }
  }
```



1. The best way to fix a DOM based cross-site scripting issue is to use the right output method. The usage of insertAdjacentHTML has been replaced with insertAdjacentText method. As far as insertAdjacentText does not parse the given text as HTML, this is the secure way to remediate DOM Based XSS (also known as “type-0 XSS”) vulnerabilities.


2. The data is being rendered with the React's JSX expression which automatically sanitizes and escapes the malicious code. The 'qs' library is being used to parse from URL as it is always recommended to use well tested libraries to handle data.


3. This will cause XSS vulnerability because the hacker can execute a malicious script by using the `"href"` attribute value by giving it an executable script.
```javascript
  componentDidMount() {
    const { title, text } = this.props;
    this.textRef.innerHTML = sanitizeHtml(text, {
      allowedTags: safeTags,
      allowedAttributes: safeAttributes
    });

    this.titleRef.textContent = sanitizeHtml(title, {
      allowedTags: safeTags,
      allowedAttributes: safeAttributes
    });
  }
  ...
<p
   className="post-tem-short-content"
   ref={text => (this.textRef = text)}
 />
```


- insertAdjacentText
- dangerouslySetInnerHTML