import React from 'react'

const UserCard = ({user} : {user: string}) => {
  return (
    <div style={{border: "1px solid blue", padding: "10px"}}>
      username: {user}
    </div>
  )
}

export default UserCard
