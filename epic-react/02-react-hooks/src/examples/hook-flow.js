// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

// PLEASE NOTE: there was a subtle change in the order of cleanup functions
// getting called in React 17:
// https://github.com/kentcdodds/react-hooks/issues/90

import * as React from 'react'

console.log('First. App starts mounting')
console.log('When you click the checkbox, App will update but Child will mount')
console.log('=======')

function Child() {
  console.log('    001. Child Component is running its render function')

  const [count, setCount] = React.useState(() => {
    console.log(
      '    002. Child Component is running lazy initializer - useState(() => 0)',
    )
    return 0
  })

  React.useEffect(() => {
    console.log(
      '    006. Child component runs their first effect - useEffect(() => {})',
    )
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}) cleanup 🧹',
        'color: LightCoral',
      )
    }
  })

  React.useEffect(() => {
    console.log(
      '    007. Child component runs their second effect - useEffect(() => {}, [])',
    )
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}, []) cleanup 🧹',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%c    Child: useEffect(() => {}, [count])', 'color: HotPink')
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}, [count]) cleanup 🧹',
        'color: HotPink',
      )
    }
  }, [count])

  const element = (
    <button onClick={() => setCount(previousCount => previousCount + 1)}>
      {count}
    </button>
  )

  console.log('    003. Child component is finishing rendering')

  return element
}

function App() {
  console.log('01. App Component is running its render function')

  const [showChild, setShowChild] = React.useState(() => {
    console.log(
      '02. App Component is running lazy initializer - useState(() => false)',
    )
    return false
  })

  React.useEffect(() => {
    console.log(
      '04. App Component runs the first effect in the order it was created - useEffect(() => {})',
    )
    return () => {
      console.log(
        '004. App component cleans their effect - useEffect(() => {})',
      )
    }
  })

  React.useEffect(() => {
    console.log(
      '05. App Component runs the second effect in the order it was created - useEffect(() => {}, [])',
    )
    return () => {
      console.log('App: useEffect(() => {}, []) cleanup 🧹')
    }
  }, [])

  React.useEffect(() => {
    console.log(
      '06. App Component runs the last effect in the order it was created - finishing mounting - useEffect(() => {}, [showChild])',
    )
    return () => {
      console.log(
        '005. App component cleans their other effect - useEffect(() => {}, [showChild])',
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: 'solid',
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  )

  console.log('03. App Component is finishing rendering')

  return element
}

export default App
