import React from 'react'
import states from './states.json'
const StateSelectionDropdown = ({showMenu}) => {
  let stateList
  if(showMenu){
    stateList = states.map(state => {
      return (
        <li key={state.abbreviation}>
          <a href={`/venues?state=${state.abbreviation}`}>{state.name}</a>
        </li>
      )
    })
    return (
      <div className="dropdown-content">
        {stateList}
      </div>
    )
  }else{
    return null
  }
}

export default StateSelectionDropdown