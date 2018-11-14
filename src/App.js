import React, { Component } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';

const FullScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const Overlay = styled.div`
  background-color: black;
  position: absolute;
  opacity: 0.5;
  height: 100%;
  width: 100%;
`;

const InnerModal = styled.div`
  background-color: white;
  width: 200px;
  padding: 20px;
  border-radius: 4px;
  z-index: 2;
`;



class Modal extends Component {
  render () {
    const { children, show, onClose} = this.props

    return (
      <Transition
        items={show}
        from={{ opacity: 0, transform: 'translate(0, 50px)' }}
        enter={{ opacity: 1, transform: 'translate(0, 0)' }}
        leave={{ opacity: 0, transform: 'translate(0, 50px)' }}>
        {show =>
          show && (({ opacity, transform}) => (
            <FullScreen style={{opacity}}>
              <Overlay onClick={onClose}/>
                <InnerModal style={{transform}}>
                  { children }
                </InnerModal>
            </FullScreen>
          ))
        }
      </Transition>
    )
  }
}

class App extends Component {
// default value
  state = {
    show: false
  }
// function to toggle
  toggleModal = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    // passing in state
    const { show } = this.state
    return (
      <div className="App">
        <button onClick={this.toggleModal}>
          Toggle
        </button>
        <Modal onClose={this.toggleModal} show={show}>
          <div>Custom Modal component</div>
        </Modal>
      </div>
    );
  }
}

export default App;
