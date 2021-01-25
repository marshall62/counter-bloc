import React from 'react';

class BlocBuilder extends React.Component {

    //-1 waiting
    //0 active
    //1 done

    // two props passed in are subject and builder.
    // subject is an observable object (rxJS Subject)
    // builder is a function to call to render.

    // This class subscribes to the subject.  It updates its internal snapshot each time it gets an event from the subject
    // and it calls the builder function to render the snapshot's data.
    constructor(props){
        super(props);
        this.state = {
            snapshot : {
                data: null,
                connectionState: -1,
                error : null,
            }
        };

        this.subscription = null;
    }

    componentWillMount() {
        if(this.props.initialValue != null  && this.state.snapshot.connectionState === -1){
            this.setState({
                snapshot : {
                    data: this.props.initialValue,
                    connectionState: -1,
                    error : null,
                }
            })
        }
    }

    onSubjectData = (data) => {
        this.setState({
            snapshot:{
                data: data,
                connectionState : 0,
                error : null
            }
        })
    }

    onSubjectError = (error) => {
        this.setState({
            snapshot:{
                data: null,
                connectionState : 1,
                error : error
            }
        })
    }

    onSubjectDefault = () => {
        this.setState({
            snapshot:{
                data: null,
                connectionState : 1,
                error : null
            }
        })
    }

    componentDidMount() {
        this.subscription = this.props.subject.subscribe(
            this.onSubjectData,
            this.onSubjectError,
            this.onSubjectDefault
        );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return(
            this.props.builder(this.state.snapshot)
        );
    }

}

export default BlocBuilder;