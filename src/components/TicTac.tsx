import React from 'react'

const TicTac: React.FC = ({ children }): React.ReactElement => (
  <div style={{
    paddingLeft: 20,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    height: 30,
    marginTop: 3,
    marginLeft: 10,
  }}>
    {children}
  </div>
)

export default TicTac
