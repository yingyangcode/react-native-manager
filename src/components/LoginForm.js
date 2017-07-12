import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component{
//event handler calls action creator with new text
    onEmailChanged(text){
        this.props.emailChanged(text);
    }

    onPasswordChanged(text){
        this.props.passwordChanged(text);
    }

    onButtonPress(){
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render(){
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChanged.bind(this)}
                        value= {this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={ this.onPasswordChanged.bind(this) }
                        value = {this.props.password}
                    />
                </CardSection>

                <Text style={ styles.errorTextStyle }>
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
        //specifically auth since that is what weassigned in comnbined reducer
        //and our reducer produces the email property
};

//sends to all reducers
export default connect(mapStateToProps, {
    emailChanged, 
    passwordChanged,
    loginUser
})(LoginForm);