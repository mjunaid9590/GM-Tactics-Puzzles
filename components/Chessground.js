import {Chessboard} from 'react-chessboard'
// import {Chessground} from 'react-chessground'
import "react-chessground/dist/styles/chessground.css"
import styles from '@/styles/Home.module.css'

import React from 'react'

const ChessboardComponent = () => {
  return (
    <Chessboard className={styles.chessboard} boardWidth={400}></Chessboard>
  )
}

export default ChessboardComponent
