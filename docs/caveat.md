1. 在 `express-graphql` 中，将 `class` 映射为 `type` 时，需要注意映射到 `resolver` 的方法参数为 `args`，而不能直接用查询参数的名字。

2. `react-apollo` 中的 `compose` 即为 `redux` 中的 `compose`。

3. 在 `mapDispatchToProps` 中可以通过以下方式使用 `redux-thunk`：

```javascript
const mapDispatchToProps = {
    thunk: () => (dispatch, getState) => {
        const state = getState()
        dispatch(actionCreator())
    }
}
```
