import React, { useState } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
	},
	{
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
	},
 ];

function App() {
  const [techStack, setTechStack] = useState(list)
  const [searchTerm, setSearchTerm] = useState('')

  function onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedTechStack = techStack.filter(isNotId)
    setTechStack(updatedTechStack)
  }

  function onSearchChange(event) {
    setSearchTerm(event.target.value)
  }

  function isSearched(searchTerm) {
    return function (item) {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
  }

  return (
    <div className="App">
      <Search
        value={searchTerm}
        onChange={onSearchChange}
      >
        Search
      </Search>

      <Table
        list={techStack}
        pattern={searchTerm}
        onDismiss={onDismiss}
        isSearched={isSearched}
      />
    </div>
  )
}

function Search({ value, onChange, children}){
  return(
    <form>
      {children}<input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  )
}

function Table({ list, pattern, onDismiss, isSearched }) {
  return(
    <div>
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <Button
              onClick={() => onDismiss(item.objectID)}
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>
  )
}

function Button(props) {
  const {onClick, className = '', children} = props

  return(
    <button
      onClick={onClick}
      className={className}
      type='button'
    >
      {children}
    </button>
  )
}

export default App
