'use strict'
import React from 'react'

const styles = {
  root: {
    position: 'fixed',
    top: '10px',
    right: '10px'
  },
  panel: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    opacity: '0',
    width: '30%',
    borderRadius: '10px',
    background: 'white none repeat scroll 0% 0%',
    color: 'black',
    fontFamily: 'sans-serif',
    padding: '10px',
    fontSize: '12px',
    zIndex: '100',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  target: {
    width: '42px',
    height: '42px',
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: '200'
  }
}

class ContextWarning extends React.Component {
  state = {}

  mouseOver = () => {
    this.setState({ hover: true })
  }

  mouseOut = () => {
    this.setState({ hover: false })
  }

  render() {
    if (!this.props.show) {
      return <div style={styles.root} />
    }

    let panelStyle = styles.panel
    if (this.state.hover) {
      panelStyle = Object.assign({}, panelStyle, { opacity: '0.82' })
    }
    return (
      <div style={styles.root}>
        <div
          style={styles.target}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
        />
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkTBycASqaPwgAAA39JREFUWMPNmMtLFVEcxz8zXrX0OvaUClpYLbJFZI/pgVoYiWSBlUVFD8KetCiyRdQmkloWSYvAvyBwUdEiWkUowVm2aRcVFRFUdDQxRW3RTxummblnZq63+4WB4cyZc77z+/5eZyxSQitw3Ol7CyiTR6OOy6R/TlJkyBO0YjawA9gKWMALrXjmuAznY30rj0RPAD1AVoaGgYtAb1prAth5IlkLnPWQBKgAzgHL87GHnQeStkgeZLd6oFUrSv4bUa2mbxcANyOm3pI53nf+i/TXpoiEwAG6IV3kW2lSklZsAEzt1Oi49CdNVVZK33wq/mmC50CL4zKWhKydwjf3AI0xXt0MdBRa+izwBGiKucYA0Oa4/ChUMLUDaxN86BpgX0EsqhXzgYdAg+/REDDiGysHqnxjL4F2x+XLjBGVpqMT6PU9egVcB7RHpQmpTjfEkl6cB+47LhMz1ZTMA64GjH8EHgVtrBWnA4heAfrA3Kp2zEjvAmoDppSJ9YI6qvKA+UuFrHG1sk1ISnJfAZyMUKYs5ANKQ945rhV1snY6or7E3AUsDJlaGkE0E+FGl6dKay6yptKvBw5FTElCFOCAVmxJLb3Hmt1AdY6gDJK4PEJ6pH+9YdKw2LkCSCv2Q86vTuKjU9ioFUdyBZadI4AqgDPSqpFA+lIDolmgUyucKF+1c0h+WA5rJLRouWGubpK9Ql0gSvolUoVMNioJqXKWPDOJlU6tWGpcmTwpqR3YZFg4qoGVWvHeI/UYsAqYY7jGemAvcDeoX7VCfHOxNMWrDTeZlKZkNED6yhg9xWtprj/4ydohvtkRg+TUB1cB831XNmbjUwccDPJVK8CaNcAbsYQpJqTBGPKsOSlEa2L2vb+AZY7LJ69VMwHWvBOTJMA34BLwzOej24F7EaWXkEzRA3T8I70nubeIQ8fFT+Cd4/LVcfks11fgLTCYYL1dWrHby832JfcuYFbCk0JJjLRlYtUL3iJge8zbFiMdFQKucMJx/0pfAxw1KJVR6SnoWDGegmgVcEwrFgFk5By0RRw/KbJAvVYMeVxgHFjn+8MXF9uARq3os7SiEngMNKeU6rtc3vQ0V6406Ad2ZsSSzXnwqXyQCkID0GpHnIOKCadsOYsXOwZtqQIjRUxyFLid4c//zePSuFZLEBQDLFH7ATBg+f4plRWbNaUUp/uvXihoBb8Bx1Ly7KxNBTUAAAAASUVORK5CYII=" />

        <div style={panelStyle}>
          <p>The audio context is not running. This can be caused by:</p>
          <ul>
            <li>Your browser does not support web audio</li>
            <li>The operating system has no audio output</li>
            <li>
              The audio context is actually running, but does not report it
              correctly (seen in some versions of Edge)
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ContextWarning
