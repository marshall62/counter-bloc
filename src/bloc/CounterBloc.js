//importing the rxjs library
import * as rxjs from 'rxjs';

class CounterBloc {

    constructor(){
        //creating our BehaviorSubject with initial value of 0
        this.counterSubject = new rxjs.BehaviorSubject(0);
    }

    //an increment function that deals with the subject
    increment = () => {
        let count = this.counterSubject.getValue() + 1;
        this.counterSubject.next(count);
    };

    //a decrement function that deals with the subject
    decrement = () => {
        let count = this.counterSubject.getValue() - 1;
        this.counterSubject.next(count);
    };

    //the error function with deal with sending an error through the subject
    error = () => {
        this.counterSubject.error("An error simulation");
    };

    //the get function to return the subject. It allows the component to subscribe as Observer.
    getCounterSubject = () => {
        return this.counterSubject;
    };

}

export default CounterBloc;