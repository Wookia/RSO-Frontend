import React from 'react';
import '../App.css'
import { callGetUsers, putUpdatedUser } from '../dockerTest'
import { roleIntToString } from '../tools/roles'

export class Users extends React.Component {
    initialState = {users: []};

    constructor(props) {
      super(props);
      this.updateUser = this.updateUser.bind(this);
      this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({isLoading: true});

        if (!this.props.token){
            this.setState({ error: {message: 'Error: not logged in'}, isLoading: false});
            return;
        }

        callGetUsers(this.props.token)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({users: data, isLoading: false}))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    upgradeRole(item) {
        item.role++;
        this.updateUser(item);
    }

    downgradeRole(item) {
        item.role--;
        this.updateUser(item);
    }

    async updateUser(item) {
        try {
            var updated = await putUpdatedUser(this.props.token, item);
            this.setState((prevState) => {return {users: prevState.users.map(user =>
                user.id === updated.id ?
                user.role = updated.role : // nie wiem dlaczego to działa
                user
            )}});
        } catch(error) {
            this.setState({error});
        }
    }

    render() {
        const { users, isLoading, error } = this.state;

        if (error) {
            return <span className="text-danger">{error.message}</span>
        }

        if (isLoading) {
            return <span>Loading...</span>
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Modified</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.updatedAt}</td>
                            <td>{roleIntToString(item.role)}</td>
                            <UpgradeDowngradePills item={item} 
                                downFunction={() => this.downgradeRole(item)} 
                                upFunction={() => this.upgradeRole(item)} />
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}

function UpgradeDowngradePills(props) {
    var item = props.item;
    const upPill = (<span style={{cursor: 'pointer', marginRight: '0.25em'}} 
                        onClick={props.upFunction} 
                        className={'badge badge-pill badge-primary'}>
                            Upgrade role
                    </span>);

    const downPill = (  <span style={{cursor: 'pointer'}} 
                            onClick={props.downFunction} 
                            className={'badge badge-pill badge-danger'}>
                                Downgrade role
                        </span>);

    if (item.role < 3 && item.role > 0)
        return <td>{upPill}{downPill}</td>
    if (item.role === 3)
        return <td></td>
    else
        return <td>{upPill}</td>
}