import React from 'react';
import logo from './logo.svg';
import './BCApp.css';

//importing the BlocBuilder
// import BlocBuilder from "bloc-builder-react";
import BlocBuilder from "./BlocBuilder"

//importing our CounterBloc
import CounterBloc from "./bloc/CounterBloc";
import CounterBloc2 from "./bloc/CounterBloc2";


class App extends React.Component {

  constructor(props){
    super(props);
    
    //initializes the CounterBloc
    // this.bloc = new CounterBloc();
    this.bloc = new CounterBloc2();

    
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
      
            //using BlocBuilder to render based always on the latest snapshot emitted by a Subject
            <BlocBuilder
                // subject = {this.bloc.getCounterSubject()}
                // DM changed so that this.bloc is-a BLoC (e.g. a BehaviorSubject) rather than holding one.
                subject = {this.bloc}

                //builder function that will render our JSX when the subject receives a new value
                builder = {(snapshot) => {
                    //if that's not an error, let's render a div with de value of the snapshot
                    if (!snapshot.error)
                        return (<div> The count has the current value of {snapshot.data}</div>);
                    return (<div>Error : <code>{snapshot.error}</code></div>);              
                }
            }
            />

            <div className="App-buttons">
                //setting Bloc functions to the properly buttons
                <button onClick={this.bloc.increment}>Increment</button>
                <button onClick={this.bloc.decrement}>Decrement</button>
                <button onClick={this.bloc.error}>Simulate error</button>
            </div>

          </header>
        </div>
    );
  }
}

export default App;