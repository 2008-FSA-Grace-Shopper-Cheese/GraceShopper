import React from 'react'

export const AboutUs = props => {
  const us = ['Stephen Huang', 'Vito Siciliano', 'Kirby Chen', 'Eric Fish']
  const newUs = []
  let randomed
  while (us.length) {
    randomed = Math.floor(Math.random() * us.length)
    newUs.push(us.splice(randomed, 1))
  }
  return (
    <h3>
      Authors:{' '}
      {newUs.map(function(element, index) {
        return <p key={index}>{element}</p>
      })}
    </h3>
  )
}
