

v2.9

Error: "Messages must be statically evaluate-able for extraction."

[Error: "Messages must be statically evaluate-able for extraction." · Issue #119 · formatjs/babel-plugin-react-intl](https://github.com/formatjs/babel-plugin-react-intl/issues/119)

```tsx
这样子就可以给 FormattedMessage 往进动态传值了

function FormattedMessageFixed(props) {
  return <FormattedMessage {...props} />;
}

<FormattedMessageFixed
          id={`nav.${item?.name}`}
          description={item.name}
          defaultMessage={item.name}
        />
```

iterating over messages

```tsx
const messages = defineMessages({
  foo: {
    id: 'foo',
    defaultMessage: 'Foo',
  },
  bar: {
    id: 'bar',
    defaultMessage: 'Bar',
  },
});

const messageElements = Object.keys(messages).map(key => (
  <FormattedMessage
    key={key}
    {...messages[key]}
  />
));
```