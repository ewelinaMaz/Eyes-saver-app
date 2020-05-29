import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
constructor(props){
    super(props)
    this.state = { status: 'off', time: 0, timer: null }
}

formatTime = (Totalseconds) => {
const minutes = Math.floor(Totalseconds / 60);
const seconds = Math.floor(Totalseconds - minutes * 60);

const countDown = `${(minutes < 10 ? `0${minutes}` : minutes)}:${(seconds < 10 ? `0${seconds}` : seconds)}`;
return countDown;
} 

step = () => {
    this.setState({
        time: this.state.time -1});
        if(this.state.time === 0) {
            this.setState({
                status: this.state.status === 'work' ? 'rest' : 'work',
                time: this.state.status === 'work' ? 20 : 40
            });
            this.playBell();
        }
};

playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

startTimer = () => {
    this.setState({
        timer:setInterval( ()=> this.step(), 1000),
        time: 40,
        status: 'work'
    });
};
stopTimer = () => {
    this.setState({
        timer: null,
        time: 0,
        status: 'off'
    });
};
closeApp = () => {
    window.close();
};

componentWillUnmount() {
    clearInterval(this.timeInterval)
};
  render() {
    const {status, time} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {( status === 'off') &&
        <div className="App description">
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {( status === 'work') &&
        <img className='work' src="./images/work.png" />}
        {( status === 'rest') &&
        <img className='rest' src="./images/rest.png" />}
        {( status !== 'off') &&
        <div className="timer">
          {this.formatTime(time)}
        </div>}
        {( status === 'off') &&
        <button onClick={this.startTimer} className="btn">Start</button>}
        {( status !== 'off') &&
        <button onClick={this.stopTimer} className="btn">Stop</button>}
        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
