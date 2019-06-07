import React, { Component } from 'react'
import UserItem from './UserItem'
import Spinner from '../Spinner/Spinner'

class Users extends Component {
    render() {
        let users = [];
        if(this.props.users.length > 0){
            this.props.users.map((user)=>(
                users.push(
                    <UserItem key={user.id} user={user} />
                )
            ));
        }
        return (
            <div style={userStyle}>
                {this.props.loading ? <Spinner /> : users}
            </div>
        )
    }
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1em', 

}

export default Users
