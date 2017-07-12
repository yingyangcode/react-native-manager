import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
/**
 * Need ListView
 * For ListView we Need a DataSource obj
 * We need to give a method to the Datasource obj
 * that will say here is how you render an individual row
 */
class EmployeeList extends Component {
    componentWillMount(){
         /**
            * first time component mounts we have no employees available
            * fetching employees is async so it takes some time
            * When user navigates away, this component gets unmounted
        */
        this.props.employeesFetch();
        this.createDataSource(this.props);
        console.log('compWillMount');
        console.log('compWillMount: '+this.dataSource );



    }
    componentWillReceiveProps(nextProps){
       
        /**
         * nextProps are the next set of props that this component will be rendered with
         * this.props is still old set of props
         * Assume user logs into app, we show employeelist Comp
         * If user navigatest to employee create and comes back this function runs
         */
        this.createDataSource(nextProps); 
        console.log('compWillReceiveProps');
        console.log('compWillReceiveProps: '+this.dataSource );
    }

    createDataSource({ employees }){

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        //first time around this.props.employees will be empty
        //Any time any state updates the connect helper runs
        //mapStateToProps and comp gets some new no. of props
        //so this.props.employees will eventually have value
        //can get handle on that value with componentWillReceiveProps
        this.dataSource = ds.cloneWithRows(this.props.employees);
        //cloneWithRows can only deal with arrays and not object
        //so we have to convert obj to arr
        console.log('createDataSource: '+ {employees});
    }

    renderRow(employee){
        console.log('renderRow: '+ employee);
        return(
            <ListItem employee={employee}/>
        );
    }
    render() {
        console.log('render function: '+this.props);
        return (
            <ListView 
                enableEmptySections
                dataSource= {this.dataSource}
                renderRow={this.renderRow}
            />
        );
    };
}

const mapStateToProps = (state) => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid }; // { shift:'Monday', name:'S', id:''12j3j}
        //map puts this obj into employees array
    });
    console.log('MapStateToProps: '+ employees);
    return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);