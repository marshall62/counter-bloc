//importing the rxjs library
import * as rxjs from 'rxjs';

class CounterBloc2 extends rxjs.BehaviorSubject {

    constructor(){
        super(0);
    }

    //an increment function that deals with the subject
    increment = () => {
        this.next(this.getValue() + 1);
    };

    //a decrement function that deals with the subject
    decrement = () => {
        this.next(this.getValue() - 1);
    };

    //the error function with deal with sending an error through the subject
    error = () => {
        super.error("An error simulation");
    };


}

export default CounterBloc2;