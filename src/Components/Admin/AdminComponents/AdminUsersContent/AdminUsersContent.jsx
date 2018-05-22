import React, {Component} from 'react';
import AdminUserSearch from '../AdminUserSearch/AdminUserSearch';
import AdminUsersList from '../AdminUsersList/AdminUsersList';
const URL = 'https://api.github.com/users';

class AdminUsersContent extends Component {
    state = {
        users: [],
        filteredUsers: [],
        isLoading: true,
        error: null
    }

    componentDidMount() {
        fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            })
            .then(data => this.setState({users: data, filteredUsers: data, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}))
    }

    render() {
        const {isLoading, error} = this.state
        if (isLoading) {
            return <p>Loading ...</p>
        }
        
        if (error) {
            return <p>{error.message}</p>;
        }

        return(
            <div>
                <AdminUserSearch findUser={this.findUser} />
                <AdminUsersList users={this.state.filteredUsers} loading={this.state.isLoading} /> 
            </div>
        )
    }

    findUser = (email) => {
        if(!email) {
             fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            })
            .then(data => this.setState({filteredUsers: data}))
            .catch(error => this.setState({error}))
        } else {
            const {users} = this.state
            this.setState({
                filteredUsers: users.filter((item) => {
                    return item.login.includes(email)
                })
            })
        }
    }
}
export default AdminUsersContent;

