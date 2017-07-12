import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';
class EmployeeCreate extends Component {

    onButtonPress(){
        const { name, phone, shift } = this.props;
        this.props.employeeCreate({ name, phone, shift: (shift || 'Monday')});
    }
    onNameChanged(text){
        this.props.employeeUpdate({prop:'name', value:text})
    }

    render() {
        console.log(this.props.employee);
        return (
            <Card>
                <EmployeeForm {...this.props} /> 
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}



const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};
/*
 Ex: import employeeCreate action from employeeActions file 
 then pass it to connect helper. Now comp has acces to this.props.create
 thats how we have it onbuttonpress
*/
// this lets our component get access to 
export default connect(mapStateToProps, { 
    employeeUpdate,
    employeeCreate
}) (EmployeeCreate);

