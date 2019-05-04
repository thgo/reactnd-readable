import React, { Component } from 'react'
import Lottie from 'react-lottie'
import * as loadingData from './loading.json'

class Loading extends Component {

  render() {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loadingData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
        <Lottie
          options={defaultOptions}
          height={300}
          width={300}
        />
    )
  }

}

export default Loading